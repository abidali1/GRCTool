const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Framework = require('../../models/framework');
const Control = require('../../models/control');
const Domain = require('../../models/domain');
const SubControl = require('../../models/subControl');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const store = require('../../helpers/store');
const mongoose = require('mongoose');

router.post(
  '/add',
  auth,
  role.checkRole(role.ROLES.Admin), async (req, res) => {
    try {

     const framework = new Framework({...req.body}); //take all framework's input + id of the domain
     const frameworkDoc = await framework.save(); //save the framework + domain's ID 


       res.status(200).json({
         success: true,
         message: `Framework has been added successfully!`,
         framework: frameworkDoc
       });
    } catch (error) {
      res.status(400).json({
        error
        // error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);
// fetch store brands api
router.get('/list', async (req, res) => {
  try {
    const frameworks = await Framework.find({
      isActive: true
    }).populate('regulator', 'name');

    res.status(200).json({
      frameworks
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch brands api
router.get(
  '/',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Client,role.ROLES.Regulator),
  async (req, res) => {
    try {
      let frameworks = null;

      if (req.user.Client) {
        frameworks = await Framework.find({}).populate('regulator', 'name');
        // frameworks = await Framework.find({
        //   regulator: req.user.regulator
        // }).populate('regulator', 'name');
      } else {
        frameworks = await Framework.find({}).populate('regulator', 'name');
      }

      res.status(200).json({
        frameworks
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.get('/:id', async (req, res) => {
  try {
    const frameworkId = req.params.id;
    const frameworkDoc = await Framework.findOne({ _id: frameworkId });
    // const domainDoc=await Domain.find({_id:frameworkDoc.domains._id});
    // const controlDoc=({_id:domainDoc.controls._id});
    if (!frameworkDoc) {
      res.status(404).json({
        message: `Cannot find framework with the id: ${frameworkId}.`
      });
    }

    res.status(200).json({
      framework: frameworkDoc,
      // domain:domainDoc,
      // control:controlDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.get(
  '/list/select',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Regulator),
  async (req, res) => {
    try {
      let frameworks = null;

      if (req.user.regulator) {
        frameworks = await Framework.find(
          {
            regulator: req.user.regulator
          },
          'name'
        );
      } else {
        frameworks = await Framework.find({}, 'name');
      }

      res.status(200).json({
        frameworks
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.put(
  '/:id',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Regulator),
  async (req, res) => {
    try {
      const frameworkId = req.params.id;
      const update = req.body.framework;
      const query = { _id: frameworkId };

      await Framework.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'Framework has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.put(
  '/:id/active',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Regulator),
  async (req, res) => {
    try {
      const frameworkId = req.params.id;
      const update = req.body.framework;
      const query = { _id: frameworkId };

      // disable brand(brandId) products
      if (!update.isActive) {
        const controls = await Control.find({ framework: frameworkId });
        store.disableProducts(controls);
      }

      await Framework.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'Framework has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.delete(
  '/delete/:id',
  auth,
  role.checkRole(role.ROLES.Admin),
  async (req, res) => {
    try {
      const framework = await Framework.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: `Framework has been deleted successfully!`,
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

   //Solution 1
//     const subControl = new SubControl({...req.body}); 
//     const subControlDoc = await subControl.save();
    
//     const control = new Control({...req.body});  // take the control data
//     control.subControl.push(subControlDoc._id); // take the subControl and push the ID into the control
//     const controlDoc = await control.save();

// //make the subcontrol pushed into control
// // make control pushed in domain

//     const domain = new Domain({...req.body}); 
//     domain.control.push(controlDoc._id); // take the subControl and push the ID into the control
//     const domainDoc = await domain.save();


//     const framework = new Framework({...req.body}); //take all framework's input 
//     framework.domain.push(domainDoc._id); // take the subControl and push the ID into the control
//     const frameworkDoc = await framework.save(); //save the framework + domain's ID 


    //  const subControl = new SubControl({...req.body}); 
    //  const subControlDoc = await subControl.save();
    //  const control = new Control({...req.body, subControl: subControlDoc._id}); 
    //  const controlDoc = await control.save();
    //  const domain = new Domain({...req.body, control: controlDoc._id}); 
    //  const domainDoc = await domain.save(); //save the domain's info

        // Solution 2 
    //
    //  let control = new Control({
    //   _id: new mongoose.Types.ObjectId(),
    //   mControlNo: req.body.control.mControlNo,
    //   sControlNo: req.body.control.sControlNo,
    //   name: req.body.control.name,
    //   description: req.body.control.description,
    //   isApplicable: req.body.control.isApplicable
    // });

    // control
    // .save()
    //   .then(() => {
    //    let framework = new Framework({
    //     _id: new mongoose.Types.ObjectId(),
    //     name: req.body.name,
    //     description: req.body.description,
    //     isActive: req.body.isActive,
    //     control: control._id
    //   });

    //    framework
    //      .save()
    //      .then((result) => {
    //         console.log(result);
    //         res.status(201).json({
    //         message: "Framework created",
    //         framework: result
    //       });
    //     }).catch(err => {
    //         console.log(err);
    //         res.status(500).json({
    //           error: err
    //         });
    //       });

    //   });