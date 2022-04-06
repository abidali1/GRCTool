const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// control Schema 
const ControlSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true
  },
  mainControl: {
    type: String
  },
 subControl: [
  {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'SubControl'
  }
  ],
  controlDescription: {
    type: String,
    trim: true
  },
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
   default: 'ROLE_ADMIN',
   enum: ['ROLE_ADMIN', 'ROLE_CLIENT' , 'ROLE_REGULATOR']
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
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Control', ControlSchema);