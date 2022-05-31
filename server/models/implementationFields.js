const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// control Schema 
const ImplementationFields = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true
  },
 framework: [
  {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Framework'
  }
  ],
   mControlStatus: {
    type: String,
    default: 'Not Started',
    enum: ['Not Started', 'Started']
  },  
   sControlStatus: {
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
  remarks: {
    type: String,
    trim: true
  },
  actionOwner: {
   type: String,
   default: 'ROLE_IMPLEMENTER',
   enum: ['ROLE_EXTERNALAUDITOR', 'ROLE_INTERNALAUDITOR' , 'ROLE_IMPLEMENTER']
  },
  missingFiles: {
    type: String,
    trim: true
  },
  mControlTimeline: {
    type: String,
    default: 'LONG_TERM',
    enum: ['LONG_TERM', 'SHORT_TERM']
  },
  sControlTimeline: {
    type: String,
    default: 'LONG_TERM',
    enum: ['LONG_TERM', 'SHORT_TERM']
  },
  mCorrectiveProcedures: {
    type: String,
    trim: true
  },
  sCorrectiveProcedures: {
    type: String,
    trim: true
  },
  mReasonForModification: {
    type: String,
    trim: true
  },
  sReasonForModification: {
    type: String,
    trim: true
  },
  mUploadEvidence: {
    data: Buffer,
    contentType: String
  },
  sUploadEvidence: {
    data: Buffer,
    contentType: String
  },
  mEvidenceDateReceived: {
    data: Buffer,
    contentType: String
  },
  sEvidenceDateReceived: {
    data: Buffer,
    contentType: String
  },
  mEvidenceStatus: {
    type: String,
    default: 'NOT_RECEIVED',
    enum: ['NOT_RECEIVED', 'RECEIVED']
  },
  sEvidenceStatus: {
    type: String,
    default: 'NOT_RECEIVED',
    enum: ['NOT_RECEIVED', 'RECEIVED']
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});
module.exports = Mongoose.model('ImplementationFields', ImplementationFields);