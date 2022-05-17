const express = require('express');
//import { Select } from 'react-select';
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Bring in Models & Helpers
const Regulator = require('../../models/regulator');
const User = require('../../models/user');
const Framework = require('../../models/framework');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const mailgun = require('../../services/mailgun');

router.post('/regulator-request', async (req, res) => {
  try {
    const name = req.body.name;
    const business = req.body.business;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const framework = req.body.framework;

    if (!name || !email) {
      return res
        .status(400)
        .json({ error: 'You must enter your name and email.' });
    }

    if (!business) {
      return res
        .status(400)
        .json({ error: 'You must enter a business description.' });
    }

    if (!phoneNumber || !email) {
      return res
        .status(400)
        .json({ error: 'You must enter a phone number and an email address.' });
    }

    const existingRegulator = await Regulator.findOne({ email });

    if (existingRegulator) {
      return res
        .status(400)
        .json({ error: 'That email address is already in use.' });
    }

    const regulator = new Regulator({
      name,
      email,
      phoneNumber,
      framework
    });

    const regulatorDoc = await regulator.save();

    await mailgun.sendEmail(email, 'regulator-application');

    res.status(200).json({
      success: true,
      message: `We received your request! we will reach you on your phone number ${phoneNumber}!`,
      regulator: regulatorDoc
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch all regulator api
router.get(
  '/list',
  auth,
  role.checkRole(role.ROLES.Admin),
  async (req, res) => {
    try {
      const regulators = await Regulator.find({}).sort('-created');

      res.status(200).json({
        regulators
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);



router.get(
  '/regulatorFrameworks',
  auth,
  role.checkRole(role.ROLES.Regulator),
  async (req, res) => {

    let rFrameworks = null;

    rFrameworks = await Regulator.find(req.user.regulator).populate({
        path:'framework',
        model:Framework,
        select:'name description'
    });
      // For the registered regulator, filter frameworks
      // Handle result
        res.status(200).json({
          rFrameworks
    });
  }
);

// approve regulators
router.put('/approve/:regulatorId', auth, async (req, res) => {
  try {
    const regulatorId = req.params.regulatorId;

    const query = { _id: regulatorId };
    const update = {
      status: 'Approved',
      isActive: true
    };

    const regulatorDoc = await Regulator.findOneAndUpdate(query, update, {
      new: true
    });

    await createRegulatorUser(
      regulatorDoc.email,
      regulatorDoc.name,
      regulatorId,
      req.headers.host
    );

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// reject regulator
router.put('/reject/:regulatorId', auth, async (req, res) => {
  try {
    const regulatorId = req.params.regulatorId;

    const query = { _id: regulatorId };
    const update = {
      status: 'Rejected'
    };

    await Regulator.findOneAndUpdate(query, update, {
      new: true
    });

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.post('/signup/:token', async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ error: 'You must enter an email address.' });
    }

    if (!firstName || !lastName) {
      return res.status(400).json({ error: 'You must enter your full name.' });
    }

    if (!password) {
      return res.status(400).json({ error: 'You must enter a password.' });
    }

    const userDoc = await User.findOne({
      email,
      resetPasswordToken: req.params.token
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const query = { _id: userDoc._id };
    const update = {
      email,
      firstName,
      lastName,
      password: hash,
      resetPasswordToken: undefined
    };

    await User.findOneAndUpdate(query, update, {
      new: true
    });

    const regulatorDoc = await Regulator.findOne({
      email
    });

    await createRegulatorFramework(regulatorDoc);

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.delete(
  '/delete/:id',
  auth,
  role.checkRole(role.ROLES.Admin),
  async (req, res) => {
    try {
      const regulator = await Regulator.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: `Regulator has been deleted successfully!`,
        regulator
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

const createRegulatorFramework = async ({ _id, framework, business }) => {
  const newFramework = new Framework({
    name: framework,
    description: business,
    regulator: _id,
    isActive: false
  });

  return await newFramework.save();
};

const createRegulatorUser = async (email, name, regulator, host) => {
  const firstName = name;
  const lastName = '';

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const query = { _id: existingUser._id };
    const update = {
      regulator,
      role: role.ROLES.Regulator
    };

    const regulatorDoc = await Regulator.findOne({
      email
    });

    await createRegulatorFramework(regulatorDoc);

    await mailgun.sendEmail(email, 'regulator-welcome', null, name);

    return await User.findOneAndUpdate(query, update, {
      new: true
    });
  } else {
    const buffer = await crypto.randomBytes(48);
    const resetToken = buffer.toString('hex');
    const resetPasswordToken = resetToken;

    const user = new User({
      email,
      firstName,
      lastName,
      resetPasswordToken,
      regulator,
      role: role.ROLES.Regulator
    });

    await mailgun.sendEmail(email, 'regulator-signup', host, {
      resetToken,
      email
    });

    return await user.save();
  }
};

module.exports = router;