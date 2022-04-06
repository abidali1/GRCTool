const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Cart Item Schema
const ImplementedControlSchema = new Schema({
  control: {
    type: Schema.Types.ObjectId,
    ref: 'Control'
  },

 subControl: [
  {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'SubControl'
  }
  ],
//   controlDescription: {
//     type: String,
//     trim: true
//   },
  controlStatus: {
    type: String,
    default: 'Not Started',
    enum: ['Not Started', 'Started']
  },
  mControlProgress: {
     type: String,
     default: 'Implemented',
     enum: ['Implemented', 'Partially Implemented', 'Not Applicable']
   },
   sControlProgress: {
     type: String,
     default: 'Implemented',
     enum: ['Implemented', 'Partially Implemented', 'Not Applicable']
   },
  comments: {
    type: String,
    trim: true
  },//should take the id of the user change 
  actionOwner: {
   type: String,
   default: 'ROLE_INTERNALAUDITOR',
   enum: ['ROLE_INTERNALAUDITOR', 'ROLE_EXTERNALAUDITOR' , 'ROLE_IMPLEMENTER']
  },
  missingFiles: {
    type: String,
    trim: true
  },
  recommendations: {
    type: String,
    trim: true
  },
  uploadEvidence: {
    data: Buffer,
    contentType: String
  },
});

module.exports = Mongoose.model('ImplementedControl', ImplementedControlSchema);

// Cart Schema
const ImplementedFrameworkSchema = new Schema({
  framework:{
    type:Schema.Types.ObjectId,
    ref:'Framework'
  },
  implementedcontrols: [ImplementedControlSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('ImplementedFramework', ImplementedFrameworkSchema);
