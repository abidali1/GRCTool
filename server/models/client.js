const Mongoose = require('mongoose');

const { Schema } = Mongoose;



// Client Schema

const ClientSchema = new Schema({
  arabicname:{
    type:String,
    trim:true
  },
  englishname:{
    type:String,
    trim:true
  },
  accountsupervisorenglishname: {
    type: String,
    trim: true
  },
  accountsupervisorarabicname: {
    type: String,
    trim: true
  },
  accountsupervisorid: {
    type: String
  },
  
  accountsupervisoremail: {
    type: String
  },

  accountsupervisorphoneNumber: {
    type: String
  },
  accountsupervisortelephoneNumber: {
    type: String
  },
  csoenglishname: {
    type: String,
    trim: true
  },
  csoarabicname: {
    type: String,
    trim: true
  },
  csoid: {
    type: String
  },
  
  csoemail: {
    type: String
  },

  csophoneNumber: {
    type: String
  },
  csotelephoneNumber: {
    type: String
  },
  deputyenglishname: {
    type: String,
    trim: true
  },
  deputyarabicname: {
    type: String,
    trim: true
  },
  deputyid: {
    type: String
  },
  
  deputyemail: {
    type: String
  },

  deputyphoneNumber: {
    type: String
  },
  deputytelephoneNumber: {
    type: String
  },
  sector:{
    type:String,
  },
  branchnumber:{
    type:Number
  },
  website:{
    type:String
  },
  officialemployee:{
    type:String
  },
  contractoremployee:{
    type:Number
  },
  city:{
    type:String
  },
  address:{
    type:String
  },
  numdatacenter:{
    type:Number
  },
  datacenterlocation:{
    type:String
  },
  appconnected:{
    type:Number
  },
  appinternal:{
    type:Number
  },
  devicenum:{
    type:Number
  }
  ,
  framework: {
    type: String
  },
  business:{
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
  
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }

});

module.exports = Mongoose.model('Client', ClientSchema);