const mongoose = require('mongoose');

var userSchema  = new mongoose.Schema(
    {
        Username : { type: String, } ,
        email : { type: String,   } ,
        encryptedPassword : { type: String,   } ,
        cnic : { type: String ,  max: 13, } ,
        phone : { type: String,  } ,
        emeregency_phone : { type: String  } ,
        role: { type: String , },
        verified: { type: String, default: 'false'},
        // profileImage : { type: String , required: true } ,
        gender : { type: String, } ,
        city : { type: String  } ,
        dataOfbirth: { type: String  },

        coverImage: {
            type: Buffer,
            
          },
          coverImageType: {
            type: String,
            
          },

      }    
  );

  userSchema.virtual('coverImagePath').get(function() {
    if (this.coverImage != null && this.coverImageType != null) {
      return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
  });

  
  var memberDataModule = mongoose.model('member', userSchema);
  module.exports =  memberDataModule;