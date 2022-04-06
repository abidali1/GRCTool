const Mongoose = require('mongoose');

const { Schema } = Mongoose;

// User Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: () => {
      return this.provider !== 'email' ? false : true;
    }
  },
  phoneNumber: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  password: {
    type: String
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    default: null
  },
  regulator: {
    type: Schema.Types.ObjectId,
    ref: 'Regulator',
    default: null
  },
  implementer: {
    type: Schema.Types.ObjectId,
    ref: 'Implementer',
    default: null
  },
  internalauditor: {
    type: Schema.Types.ObjectId,
    ref: 'InternalAuditor',
    default: null
  },
  externalauditor: {
    type: Schema.Types.ObjectId,
    ref: 'ExternalAuditor',
    default: null
  },
  provider: {
    type: String,
    required: true,
    default: 'email'
  },
  googleId: {
    type: String
  },
  facebookId: {
    type: String
  },
  avatar: {
    type: String
  },
  role: {
    type: String,
    default: 'ROLE_MEMBER',
    enum: ['ROLE_MEMBER', 'ROLE_ADMIN', 'ROLE_CLIENT' , 'ROLE_REGULATOR' , 'ROLE_INTERNALAUDITOR', 'ROLE_EXTERNALAUDITOR' , 'ROLE_IMPLEMENTER']
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('User', UserSchema);
