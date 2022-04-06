const Mongoose = require('mongoose');

const { Schema } = Mongoose;



// Client Schema

const InternalAuditorSchema = new Schema({

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
  client:{
    type: Schema.Types.ObjectId,
    ref: 'Client',
    default: null
  },
  status: {
    type: String,
    default: 'Waiting Approval',
    enum: ['Waiting Approval', 'Rejected', 'Approved']

  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }

});

module.exports = Mongoose.model('InternalAuditor', InternalAuditorSchema);