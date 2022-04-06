const Mongoose = require('mongoose');
const { Schema } = Mongoose;

//Nested sub document subControl
const SubControlSchema = new Schema({
   subControlNo: {
     type: String
   },
   subControlDescription: {
    type: String,
    trim: true
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

//Nested sub document control
const ControlSubSchema = new Schema({

  mainControl: {
    type: String
  },
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
  subControls: [SubControlSchema],
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

//Nested sub document domain
const DomainSubSchema = new Schema({
   _id: {
     type: Schema.ObjectId,
     auto: true
   },
   domainNo: {
     type: String,
    trim: true
   },
   domainName: {
    type: String,
    trim: true
   },
  domainDescription: {
    type: String,
    trim: true
  },
  controls: [ControlSubSchema],
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

// framework Schema
const FrameworkSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  // regulator: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Regulator',
  //   default: null
  // },
  // client: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Client',
  //   default: null
  // },
  domains: [DomainSubSchema],
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Framework', FrameworkSchema);
