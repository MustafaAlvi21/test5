const mongoose = require('mongoose');

var profileModel  = new mongoose.Schema(
    {
        image : { type: String , required: true } ,
        gender : { type: String , required: true } ,
        city : { type: String , required: true } ,
        age: { type: String, required: true  },
        // verificationCode: { type: String,},
        // verified: { type: String, default: 'false'},
    }
  );

  var profileModel = mongoose.model('profile1', profileModel); 
  module.exports =  profileModel;


