const mongoose = require('mongoose');

var appointmentSchema  = new mongoose.Schema(
    {
        belongsTo: {type: String, required: true},
        doctor: { type: String, required: true},
        doctorId: { type: String, required: true},
        patientName : { type: String,  required: true } ,
        patientId : { type: String,  required: true } ,
        patientRole : { type: String,  required: true } ,
        field: { type: String  ,  required: true },
        appointmentDate: {type: String, required: true },
        appointmentStatus: {type: String, required: true, default: 'not visited' },
        createdAt: { type: String ,  required: true},
       
        fileName : { type: String , } ,
        fileType : { type: String , } ,
        reportType : { type: String , } ,
    }
  );

  var appointmentDataModel = mongoose.model('appointment', appointmentSchema); 
  module.exports =  appointmentDataModel;

