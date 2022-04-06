const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// sub control Schema 
const SubControlSchema = new Schema({
   _id: {
     type: Schema.ObjectId,
     auto: true
   },
   subControlNo: {
     type: String
   },

  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('SubControl', SubControlSchema);
