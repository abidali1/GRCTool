const Mongoose = require('mongoose');

const { Schema } = Mongoose;



// Client Schema

const ExternalAuditorSchema = new Schema({

  name: {
    type: String,
    trim: true
  },
  email: {
    type: String
  },

  phoneNumber: {
    type: String
  },
  framework: {
    type: String
  },

  isActive: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'Waiting Approval',
    enum: ['Waiting Approval', 'Rejected', 'Approved']

  },
  client:{
    type: Schema.Types.ObjectId,
    ref: 'Client',
    default: null
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }

});

module.exports = Mongoose.model('ExternalAuditor', ExternalAuditorSchema);