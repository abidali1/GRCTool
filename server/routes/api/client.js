const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Bring in Models & Helpers
const Client = require('../../models/client');
const User = require('../../models/user');
const Framework = require('../../models/framework');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const mailgun = require('../../services/mailgun');

router.post('/seller-request', async (req, res) => {
  try {
    
    const business = req.body.business;
    // const email = req.body.email;
    // const framework = req.body.framework;
    const arabicname=  req.body.arabicname;
    const englishname= req.body.englishname;
    const accountsupervisorenglishname=req.body.accountsupervisorenglishname;
    const  accountsupervisorarabicname=req.body.accountsupervisorarabicname;
    const  accountsupervisorid=req.body.accountsupervisorid;
    const  accountsupervisoremail=req.body.accountsupervisoremail;
    const  accountsupervisorphoneNumber=req.body.accountsupervisoremail;
    const  accountsupervisortelephoneNumber=req.body.accountsupervisortelephoneNumber;
    const csoenglishname= req.body.csoenglishname;
    const csoarabicname= req.body.csoarabicname;
    const csoid= req.body.csoid;
    const csoemail= req.body.csoemail;
    const csophoneNumber= req.body.csophoneNumber;
    const csotelephoneNumber= req.body.csotelephoneNumber;
    const deputyenglishname= req.body.deputyenglishname;
    const deputyarabicname= req.body.deputyarabicname;
    const deputyid= req.body.deputyid;
    const deputyemail= req.body.deputyemail;
    const deputyphoneNumber=req.body.deputyphoneNumber;
    const sector=req.body.sector;
    const deputytelephoneNumber=req.body.deputytelephoneNumber;
    const branchnumber=req.body.branchnumber;
    const website=req.body.website;
    const officialemployee=req.body.officialemployee;
    const contractoremployee=req.body.contractoremployee;
    const city=req.body.city;
    const address=req.body.address;
    const numdatacenter=req.body.numdatacenter;
    const datacenterlocation= req.body.datacenterlocation;
    const appconnected= req.body.appconnected;
    const appinternal= req.body.appinternal;
    const devicenum= req.body.devicenum;


    if (!accountsupervisorenglishname || !accountsupervisoremail) {
      return res
        .status(400)
        .json({ error: 'You must enter your name and email.' });
    }


    const existingClient = await Client.findOne({ accountsupervisoremail });

    if (existingClient) {
      return res
        .status(400)
        .json({ error: 'That email address is already in use.' });
    }

    const client = new Client({
      business,
      arabicname,
      englishname,
      accountsupervisorenglishname,
      accountsupervisorarabicname,
      accountsupervisorid,
      accountsupervisoremail,
      accountsupervisorphoneNumber,
      accountsupervisortelephoneNumber,
      csoenglishname,
      csoarabicname,
      csoid,
      csoemail,
      csophoneNumber,
      csotelephoneNumber,
      deputyenglishname,
      deputyarabicname,
      deputyid,
      deputyemail,
      deputyphoneNumber,
      deputytelephoneNumber,
      sector,
      branchnumber,
      website,
      officialemployee,
      contractoremployee,
      city,
      address,
      numdatacenter,
      datacenterlocation,
      appconnected,
      appinternal,
      devicenum,
    });

    const clientDoc = await client.save();

    await mailgun.sendEmail(accountsupervisoremail, 'client-application');

    res.status(200).json({
      success: true,
      message: `We received your request! we will reach you on your phone number ${phoneNumber}!`,
      client: clientDoc
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch all clients api
router.get(
  '/list',
  auth,
  role.checkRole(role.ROLES.Admin),
  async (req, res) => {
    try {
      const clients = await Client.find({}).sort('-created');
      res.status(200).json({
        clients
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// approve client
router.put('/approve/:clientId', auth, async (req, res) => {
  try {
    const clientId = req.params.clientId;

    const query = { _id: clientId };
    const update = {
      status: 'Approved',
      isActive: true
    };

    const clientDoc = await Client.findOneAndUpdate(query, update, {
      new: true
    });

    await createClientUser(
      clientDoc.accountsupervisoremail,
      clientDoc.accountsupervisorenglishname,
      clientId,
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

// reject client
router.put('/reject/:clientId', auth, async (req, res) => {
  try {
    const clientId = req.params.clientId;

    const query = { _id: clientId };
    const update = {
      status: 'Rejected'
    };

    await Client.findOneAndUpdate(query, update, {
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

    const clientDoc = await Client.findOne({
      email
    });

    // await createClientFramework(clientDoc);

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
      const client = await Client.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: `Client has been deleted successfully!`,
        client
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

const createClientFramework = async ({ _id, framework, business }) => {
  const newFramework = new Framework({
    name: framework,
    description: business,
    client: _id,
    isActive: false
  });

  return await newFramework.save();
};

const createClientUser = async (accountsupervisoremail, accountsupervisorenglishname, client, host) => {
  const firstName = accountsupervisorenglishname;
  const email= accountsupervisoremail;
  const lastName = '';

  const existingUser = await User.findOne({ accountsupervisoremail });

  if (existingUser) {
    const query = { _id: existingUser._id };
    const update = {
      client,
      role: role.ROLES.Client
    };
    const clientDoc = await Client.findOne({
      accountsupervisoremail
    });
    
    await createClientFramework(clientDoc);

    await mailgun.sendEmail(accountsupervisoremail, 'client-welcome', null, accountsupervisorenglishname);

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
      client,
      role: role.ROLES.Client
    });

    await mailgun.sendEmail(email, 'client-signup', host, {
      resetToken,
      email
    });

    return await user.save();
  }
};

module.exports = router;