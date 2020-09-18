const mongoose = require('mongoose');

var DoctorSchema  = new mongoose.Schema(
    {
        belongsTo: {type: String, required: true},
        name : { type: String  } ,
        gender : { type: String } ,
        description: { type: String  },
        field: { type: String  },
        startTime: { type: String  },
        endTime: { type: String  },
        createdAt: { type: String},
        updatedAt: { type: String},
        // image: {type: String, required: true  },
        coverImage: {
            type: Buffer,
            required: true
          },
          coverImageType: {
            type: String,
            required: true
          },
    }
  );

  DoctorSchema.virtual('coverImagePath').get(function() {
    if (this.coverImage != null && this.coverImageType != null) {
      return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
  });


  var userDataModel = mongoose.model('doctors', DoctorSchema); 
  module.exports =  userDataModel;


