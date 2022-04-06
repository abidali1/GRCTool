const Mongoose = require('mongoose');
const { Schema } = Mongoose;


// domain Schema 
const DomainSchema = new Schema({
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
  framework: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Framework'
  },
 control: [
  {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Control'
  }
  ],
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Domain', DomainSchema);