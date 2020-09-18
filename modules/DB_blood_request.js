const mongoose = require('mongoose');

  var bloodRequest  = new mongoose.Schema(
    {
        UserId : { type: String , required: true } ,
        Username : { type: String , required: true } ,
        Status : { type: String , required: true } ,
        Blood_Group : { type: String , required: true } ,
        Blood_Cell : { type: Number , required: true } ,
        Weight : { type: Number , required: true } ,
        Height : { type: Number , required: true } ,
    }
  );
  

  var bloodRequestDataModel = mongoose.model('bloodRequest', bloodRequest);
  module.exports =  bloodRequestDataModel;