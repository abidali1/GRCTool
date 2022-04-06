const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in Models & Helpers
const Domain= require('../../models/domain');
const Framework= require('../../models/framework');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const store = require('../../helpers/store');

router.post('/add', auth, role.checkRole(role.ROLES.Admin), async (req, res) => {

  const domain = new Domain(req.body.domain); 
  const domainDoc = await domain.save();
  const frameworks = req.body._id;
  const query = { _id: req.params.frameworks };

  await Framework.updateOne(query, { $push: { frameworks: frameworks } }).exec();

  domain.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      message: `Domain has been added successfully!`,
      domain: data
    });
  });
});

// fetch store categories api
router.get('/list', (req, res) => {
  Domain.find({ isActive: true }, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      domains: data
    });
  });
});

// fetch categories api
router.get('/', async (req, res) => {
  try {
    const domains = await Domain.find({});
    res.status(200).json({
      domains
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch category api
router.get('/:id', async (req, res) => {
  try {
    const domainId = req.params.id;

    const DomainDoc = await Domain.findOne({ _id: domainId }).populate({
      path: 'frameworks',
      select: 'name'
    });

    if (!DomainDoc) {
      return res.status(404).json({
        message: 'No Category found.'
      });
    }

    res.status(200).json({
      domain: DomainDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put('/:id', auth, role.checkRole(role.ROLES.Admin), async (req, res) => {
  try {
    const domainId = req.params.id;
    const update = req.body.domain;
    const query = { _id: domainId };

    await Domain.findOneAndUpdate(query, update, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: 'Domain has been updated successfully!'
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put(
  '/:id/active',
  auth,
  role.checkRole(role.ROLES.Admin),
  async (req, res) => {
    try {
      const domainId = req.params.id;
      const update = req.body.domain;
      const query = { _id: domainId };

      // disable category(categoryId) products
      if (!update.isActive) {
        const domainDoc = await Domain.findOne(
          { _id: domainId, isActive: true },
          'frameworks -_id'
        ).populate('frameworks');

        store.disableControls(frameworkDoc.frameworks);
      }

      await Domain.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'Category has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.get('/list/select', auth, async (req, res) => {
  try {
    const domains = await Domain.find({}, 'name');

    res.status(200).json({
      domains
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
      const framework = await Domain.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: `Domain has been deleted successfully!`,
        framework
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

module.exports = router;