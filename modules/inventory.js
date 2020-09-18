const mongoose = require('mongoose');


var file_images  = new mongoose.Schema(
    {
        // _id: {type: Number},
        // sku : { type: String  } ,
        // description : { type: String } ,
        // instock : { type: Number } ,
        title: {
          type: String,
          required: true
        },
        userId: {
          type: String,
          required: true
        },
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

  file_images.virtual('coverImagePath').get(function() {
    if (this.coverImage != null && this.coverImageType != null) {
      return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
  });
  
  var userDataModel = mongoose.model('inventory', file_images); 
  module.exports =  userDataModel;


