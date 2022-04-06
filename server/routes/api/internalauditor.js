const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Bring in Models & Helpers
const InternalAuditor = require('../../models/internalauditor');
const User = require('../../models/user');
const Client = require('../../models/client');
const Framework = require('../../models/framework');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const mailgun = require('../../services/mailgun');

router.post('/internalauditor-request', auth,async (req, res) => {
  try {
    const user = req.user._id;
    const name = req.body.name;
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

    const existingInternalAuditor = await InternalAuditor.findOne({ email });

    if (existingInternalAuditor) {
      return res
        .status(400)
        .json({ error: 'That email address is already in use.' });
    }

    const internalauditor = new InternalAuditor({
      name,
      email,
      phoneNumber,
      framework,
      client:user
    });

    const InternalAuditorDoc = await internalauditor.save();

    await mailgun.sendEmail(email, 'implementer-application');

    res.status(200).json({
      success: true,
      message: `We received your request! we will reach you on your phone number ${phoneNumber}!`,
      internalauditor: InternalAuditorDoc
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
      const internalauditors = await InternalAuditor.find({}).sort('-created');
      res.status(200).json({
        internalauditors
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// approve regulators
router.put('/approve/:internalauditorId', auth, async (req, res) => {
  try {
    const internalauditorId = req.params.internalauditorId;

    const query = { _id: internalauditorId };
    const update = {
      status: 'Approved',
      isActive: true
    };

    const InternalAuditorDoc = await InternalAuditor.findOneAndUpdate(query, update, {
      new: true
    });

;
    
      
    // // prepare async calls
    // const asyncCalls = [];

    // asyncCalls.push(   
       await createInternalAuditorUser(
      InternalAuditorDoc.email,
      InternalAuditorDoc.name,
      internalauditorId,
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
router.put('/reject/:internalauditorId', auth, async (req, res) => {
  try {
    
    const internalauditorId = req.params.internalauditorId;
    const query = { _id: internalauditorId };
    const update = {
      status: 'Rejected'
    };

    await InternalAuditor.findOneAndUpdate(query, update, {
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

    const InternalAuditorDoc = await InternalAuditor.findOne({
      email
    });

    await createImplementerFramework(InternalAuditorDoc);

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
      const internalauditor = await InternalAuditor.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: `Implementer has been deleted successfully!`,
        internalauditor
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

const createInternalAuditorFramework = async ({ _id, framework, business }) => {
  const newFramework = new Framework({
    name: framework,
    description: business,
    // regulator: _id,
    isActive: false
  });

  return await newFramework.save();
};

const createInternalAuditorUser = async (email, fullname, internalauditor, host) => {
  const firstName = fullname;
  const lastName = '';

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const query = { _id: existingUser._id };
    const update = {
      internalauditor,
      role: role.ROLES.InternalAuditor
    };

    const InternalAuditorDoc = await InternalAuditor.findOne({
      email
    });

    await createInternalAuditorFramework(InternalAuditorDoc);

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
      internalauditor,
      role: role.ROLES.InternalAuditor
    });

    await mailgun.sendEmail(email, 'implementer-signup', host, {
      resetToken,
      email
    });

    return await user.save();
  }
};

// const createInterClient = async ({_id,email, name}) => {
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