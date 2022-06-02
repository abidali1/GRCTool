const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const CopySubControlSchema = new Schema({
  CopySubControlNo: {
    type: String
  },
  CopySubControlDescription: {
   type: String,
   trim: true
 },
 sControlStatus: {
  type: String,
  default: 'Not Started',
  enum: ['Not Started', 'Started']
},
 sControlProgress: {
   type: String,
   default: 'Implemented',
   enum: ['Implemented', 'Partially Implemented', 'Not Applicable']
 },
sControlTimeline: {
  type: String,
  default: 'LONG_TERM',
  enum: ['LONG_TERM', 'SHORT_TERM']
},
sCorrectiveProcedures: {
  type: String,
  trim: true
},
sReasonForModification: {
  type: String,
  trim: true
},
sUploadEvidence: {
  data: Buffer,
  contentType: String
},
sEvidenceDateReceived: {
  data: Buffer,
  contentType: String
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

//Nested sub document control
const CopyControlSubSchema = new Schema({

  CopyMainControl: {
   type: String
 },
 CopyControlDescription: {
   type: String,
   trim: true
 },
 mControlStatus: {
  type: String,
  default: 'Not Started',
  enum: ['Not Started', 'Started']
},
mControlProgress: {
  type: String,
  default: 'Implemented',
  enum: ['Implemented', 'Partially Implemented', 'Not Applicable']
},
mControlTimeline: {
  type: String,
  default: 'LONG_TERM',
  enum: ['LONG_TERM', 'SHORT_TERM']
},
mCorrectiveProcedures: {
  type: String,
  trim: true
},
mReasonForModification: {
  type: String,
  trim: true
},
mUploadEvidence: {
  data: Buffer,
  contentType: String
},
mEvidenceDateReceived: {
  data: Buffer,
  contentType: String
},
mEvidenceStatus: {
  type: String,
  default: 'NOT_RECEIVED',
  enum: ['NOT_RECEIVED', 'RECEIVED']
},
 CopySubControls: [CopySubControlSchema],
 updated: Date,
 created: {
   type: Date,
   default: Date.now
 }
});

//Nested sub document domain
const CopyDomainSubSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true
  },
  CopyDomainNo: {
    type: String,
   trim: true
  },
  CopyDomainName: {
   type: String,
   trim: true
  },
 CopyDomainDescription: {
   type: String,
   trim: true
 },
 CopyControls: [CopyControlSubSchema],
 updated: Date,
 created: {
   type: Date,
   default: Date.now
 }
});

// framework Schema
const CopyFrameworkSchema = new Schema({
 CopyName: {
   type: String,
   trim: true
 },
 CopyDescription: {
   type: String,
   trim: true
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
 CopyDomains: [CopyDomainSubSchema],
 updated: Date,
 created: {
   type: Date,
   default: Date.now
 }
});

module.exports = Mongoose.model('CopyFramework', CopyFrameworkSchema);