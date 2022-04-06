const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Bring in Models & Helpers
const ExternalAuditor = require('../../models/externalauditor');
const User = require('../../models/user');
const Client = require('../../models/client');
const Framework = require('../../models/framework');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const mailgun = require('../../services/mailgun');

router.post('/externalauditor-request', auth,async (req, res) => {
  try {
    const user = req.user._id;
    const name = req.body.name;
    // const business = req.body.business;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const framework = req.body.framework;

    if (!name || !email) {
      return res
        .status(400)
        .json({ error: 'You must enter your name and email.' });
    }

    if (!phoneNumber || !email) {
      return res
        .status(400)
        .json({ error: 'You must enter a phone number and an email address.' });
    }

    const existingExternalAuditor = await ExternalAuditor.findOne({ email });

    if (existingExternalAuditor) {
      return res
        .status(400)
        .json({ error: 'That email address is already in use.' });
    }

    const externalauditor = new ExternalAuditor({
      name,
      email,
      phoneNumber,
      framework,
      client:user
    });

    const externalauditorDoc = await externalauditor.save();

    await mailgun.sendEmail(email, 'implementer-application');

    res.status(200).json({
      success: true,
      message: `We received your request! we will reach you on your phone number ${phoneNumber}!`,
      externalauditor: externalauditorDoc
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch all implementer api
router.get(
  '/list',
  auth,
  role.checkRole(role.ROLES.Client ),
  async (req, res) => {
    try {
      const externalauditors = await ExternalAuditor.find({}).sort('-created');
      res.status(200).json({
        externalauditors
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// approve regulators
router.put('/approve/:externalauditorId', auth, async (req, res) => {
  try {
    const externalauditorId = req.params.externalauditorId;

    const query = { _id: externalauditorId };
    const update = {
      status: 'Approved',
      isActive: true
    };

    const externalauditorDoc = await ExternalAuditor.findOneAndUpdate(query, update, {
      new: true
    });

;
 
       await createExternalAuditorUser(
      externalauditorDoc.email,
      externalauditorDoc.name,
      externalauditorId,
      req.headers.host
    )

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
router.put('/reject/:externalauditorId', auth, async (req, res) => {
  try {
    
    const externalauditorId = req.params.externalauditorId;
    const query = { _id: externalauditorId };
    const update = {
      status: 'Rejected'
    };

    await ExternalAuditor.findOneAndUpdate(query, update, {
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

    const externalauditorDoc = await ExternalAuditor.findOne({
      email
    });

    await createExternalAuditorFramework(externalauditorDoc);

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
  role.checkRole(role.ROLES.Client),
  async (req, res) => {
    try {
      const externalauditor = await ExternalAuditor.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: `Implementer has been deleted successfully!`,
        externalauditor
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

const createExternalAuditorFramework = async ({ _id, framework, business }) => {
  const newFramework = new Framework({
    name: framework,
    description: business,
    // regulator: _id,
    isActive: false
  });

  return await newFramework.save();
};

const createExternalAuditorUser = async (email, fullname, externalauditor, host) => {
  const firstName = fullname;
  const lastName = '';

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const query = { _id: existingUser._id };
    const update = {
      externalauditor,
      role: role.ROLES.ExternalAuditor
    };

    const externalauditorDoc = await ExternalAuditor.findOne({
      email
    });

    await createExternalAuditorFramework(externalauditorDoc);

    await mailgun.sendEmail(email, 'implementer-welcome', null, name);

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
      externalauditor,
      role: role.ROLES.ExternalAuditor
    });

    await mailgun.sendEmail(email, 'implementer-signup', host, {
      resetToken,
      email
    });

    return await user.save();
  }
};

// const createExternalAuditorClient = async ({_id,email, name}) => {
//   const newClient = new Client({
//     name: name,
//     email: email,
//     phoneNumber:phoneNumber,
//     implementer: _id,
//     isActive: true
//   });

//   return await newClient.save();
    
//   };
module.exports = router;