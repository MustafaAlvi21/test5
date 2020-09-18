var express = require('express');
var router = express.Router();
var multer  = require('multer');
const AppointmentDataModel = require('../modules/appointment'); 
const { MemberRoleAuth } = require('../config/memberRoleCheck')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/upload/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
 
  const fileFilter=(req, file, cb)=>{
   if(file){
       cb(null,true);
   }else{
       cb(null, false);
   } 
  }
 
var upload = multer({ 
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:fileFilter
 });
 
 //         U p l o a d   R e p o r t 
 router.get('/doctor-appointments/:doctorId/upload/:appointmentId', MemberRoleAuth, function(req,res){
  // res.sendFile(__dirname + '/index.html');
  console.log('----------------------------------')
  console.log('-     File Upload - Get route    -')
  console.log('----------------------------------')
  const loginUser = req.user.Username;
  const doctorId = req.params.doctorId;
  const appointmentId = req.params.appointmentId;
  console.log('upload report page get method => '+ doctorId)
  res.render('upload', { title: 'Upload Diagnosis', doctorId: doctorId, appointmentId: appointmentId, loginUser: loginUser, layout: 'layout2'})
});

router.post("/doctor-appointments/:doctorId", upload.single('image'),  MemberRoleAuth, function(req,res,next){
  const loginUser = req.user.Username;
  const doctorId = req.body.doctorId;
  const appointmentId = req.body.appointmentId;
  console.log('post upload loginUser =>> ' + loginUser );
  console.log('post upload doctorId =>> ' + doctorId );
  console.log('post upload appointmentId =>> ' + appointmentId );  
  console.log('post upload req.body.fileType =>> ' + req.body.fileType );  

  let update = AppointmentDataModel.findByIdAndUpdate(appointmentId,
    {
      fileName : req.file.filename,
      fileType : req.body.fileType, 
      // reportType : req.body.reportType, 
    });
    update.exec(function(err, data){
   if (err) res.sendStatus(err);
   console.log('q111111111qqqqqqq   :  ' + data)
    AppointmentDataModel.find( {  doctorId : doctorId }, function(err, data1){
      if(data1){
          console.log('asdsada:  '+ data1)
          res.render('MemberDashboard_Appointments', { title: 'Appointments Dashboard', data: data1, msg: data1[0].patientName + ' lab report is added', doctorId: doctorId, loginUser: loginUser, layout: 'layout2', } );
        } else {
          console.log('no data found')
          res.render('MemberDashboard_Appointments', { title: 'Appointments Dashboard', data: '', msg: 'Cancelled => ' + data1.patientName , doctorId: doctorId, loginUser: loginUser, layout: 'layout2', } );
        }  
   })
  
  });
  // res.send('uploaded')
});
 

//        R e p o r t   D e l e t e 
router.get('/doctor-appointments/:doctorId/delete/:appointmentId',function(req,res){
  const loginUser = req.user.Username;
  const doctorId = req.params.doctorId;
  const appointmentId = req.params.appointmentId;
  console.log(doctorId)


  AppointmentDataModel.find( {  doctorId : doctorId }, function(err, data1){
    if (err) res.sendStatus(err)
    if(data1){
        console.log('asdsada:  '+ data1)

        const fs =require('fs')
        const file = data1[0].fileName;
        //     delete file named
        fs.unlink('./public/upload/'+file, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log('File deleted!');
        }) 
      }
}) 

      
  let update = AppointmentDataModel.findByIdAndUpdate(appointmentId,
    {
      fileName : '',
      fileType : '', 
      // reportType : '', 
    });
    update.exec(function(err, data){
   if (err) res.sendStatus(err);
   console.log('q111111111qqqqqqq   :  ' + data)
    AppointmentDataModel.find( {  doctorId : doctorId }, function(err, data1){
      if (err) res.sendStatus(err);
      if(data1){
          console.log('asdsada:  '+ data1)


          res.render('MemberDashboard_Appointments', { title: 'Appointments Dashboard', data: data1, msg: data1[0].patientName + ' lab report is added', doctorId: doctorId, loginUser: loginUser, layout: 'layout2', } );
        } else {
          console.log('no data found')
          res.render('MemberDashboard_Appointments', { title: 'Appointments Dashboard', data: '', msg: 'Cancelled => ' + data1.patientName , doctorId: doctorId, loginUser: loginUser, layout: 'layout2', } );
        }  
   })
  });
});


 
module.exports=router
