const Mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const { Schema } = Mongoose;

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120
};

Mongoose.plugin(slug, options);
// Merchant Schema
const RegulatorSchema = new Schema({
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
  framework: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Framework',
      default: null
    }
  ],
  isActive: {
    type: Boolean,
    default: false
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

module.exports = Mongoose.model('Regulator', RegulatorSchema);
