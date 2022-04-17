const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Bring in Models & Helpers
const Implementer = require('../../models/implementer');
const User = require('../../models/user');
const Framework = require('../../models/framework');
const ImplementedFramework = require('../../models/implementedframework')
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const mailgun = require('../../services/mailgun');


router.put(
    '/assignimplementiontask',
    auth,
    role.checkRole(role.ROLES.Client), async (req, res) => {
      try {
    
        const implementerId = req.body.implementer;
        const framework=req.body.framework;
        const query = { _id: implementerId };
        const update = {
          framework: framework
        };
    
        await Implementer.findOneAndUpdate(query, update, {
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

module.exports = router;

// router.post(
//   '/implementation/:frameworkId',
//   auth,
//   role.checkRole(role.ROLES.Client), async (req, res) => {
//     try {
//       const impFrameworkDoc = await ImplementedFramework.findOne({
      
//         _id: req.params.frameworkId
//       });
//       // const domains= 
//       const query = { _id: impFrameworkDoc._id };
//       const update = {
//         domains:[{...req.body.domains}]
        
//       };
  
//       await ImplementedFramework.findOneAndUpdate(query, update, {
//         new: true
//       });
//     //  const impFramework = new ImplementedFramework({...req.body}); //take all framework's input + id of the domain

//     //  const impFrameworkDoc = await impFramework.save(); //save the framework + domain's ID 


//        res.status(200).json({
//          success: true,
//          message: `Framework has been updated successfully!`,
//          impframework: impFrameworkDoc
//        });
//     } catch (error) {
//       res.status(400).json({
//         error
//         // error: 'Your request could not be processed. Please try again.'
//       });
//     }
//   }
// );
// module.exports = router;