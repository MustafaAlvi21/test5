const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const AppointmentDataModel = require('../modules/appointment'); 
const { ensureAuthenticated } = require('../config/auth')
const { MemberRoleAuth } = require('../config/memberRoleCheck')

// settingUp local-storage
// if(typeof localStorage === 'undefined' || localStorage === null){
//     var localStorage = require('node-localstorage').LocalStorage;
//     localStorage = new localStorage('./scratch');
//   }

  /* Stopping user to access pages without login.  */
// function userAccess(req, res, next){
//     var userToken = localStorage.getItem('userToken');
//     try {
//        var decode = jwt.verify(userToken, 'loginToken');
//        console.log('access')
//     } catch (error) {
//         console.log('DENIED')
//         res.redirect('/member-login')
//     }
//      next()
//    };
  
   router.get('/doctor-appointments/:doctorId', ensureAuthenticated, MemberRoleAuth, function(req, res){
    console.log('----------------------------------')
    console.log('-     Appointment - Get route    -')
    console.log('----------------------------------')
  
    const doctorId = req.params.doctorId;
    console.log(doctorId)
     try {
        AppointmentDataModel.find( {  doctorId : doctorId }, function(err, data){
            if(data){
                console.log('asdsada:  '+ data)
                res.render('MemberDashboard_Appointments', { title: 'Appointments Dashboard', msg: '', data: data, doctorId: doctorId, loginUser: req.user.Username, layout: 'layout2', } );
              } else {
                console.log('no data found')
                res.render('MemberDashboard_Appointments', { title: 'Appointments Dashboard',msg: '',  data: '', doctorId: doctorId, loginUser: req.user.Username, layout: 'layout2', } );
              }  
         })    
     } catch (error) {
        res.sendStatus(404);
     }
   })


//          V I S I T    R O U T E       
   router.get('/doctor-appointments/:doctorId/visit/:appointmentId', ensureAuthenticated, function(req, res){
    const doctorId = req.params.doctorId;
    const appointmentId = req.params.appointmentId;
    const loginUser = req.user.Username
      console.log(doctorId)
      console.log(appointmentId)
  try {
  //                 data update from not visited to visited
       AppointmentDataModel.findOneAndUpdate( {doctorId : doctorId, _id: appointmentId}, {
        appointmentStatus: "visited",
        }).exec(function(err, data1){
           if(data1){  console.log('visited:  '+ data1.patientName)} else { console.log('not visited') }  
        
  //                 finding data and render  
        AppointmentDataModel.find( {  doctorId : doctorId }, function(err, data){
          if(data){
              console.log('asdsada:  '+ data)
              res.render('MemberDashboard_Appointments', { title: 'Appointments Dashboard', data: data, msg: data1.patientName + ' appointment is visited' , doctorId: doctorId, loginUser: loginUser, layout: 'layout2', } );
            } else {
              console.log('no data found')
              res.render('MemberDashboard_Appointments', { title: 'Appointments Dashboard', data: '', msg: 'Appointment Visited=> ' + data1.patientName , doctorId: doctorId, loginUser: loginUser, layout: 'layout2', } );
            }  
       })  
      });  
    } catch (error) {
       res.sendStatus(404);
    }
  })


//          N O T    V I S I T    R O U T E       
router.get('/doctor-appointments/:doctorId/not-visit/:appointmentId', ensureAuthenticated, function(req, res){
  const doctorId = req.params.doctorId;
  const appointmentId = req.params.appointmentId;
  const loginUser = req.user.Username;
 console.log(doctorId)
 console.log(appointmentId)
  try {
//                 data update from visited to not visited
     AppointmentDataModel.findOneAndUpdate( {doctorId : doctorId, _id: appointmentId}, {
      appointmentStatus: "not visited",
      }).exec(function(err, data1){
         if(data1){  console.log('visited:  '+ data1)} else { console.log('not visited') }  
      
//                 finding data and render  
      AppointmentDataModel.find( {  doctorId : doctorId }, function(err, data){
        if(data){
            console.log('asdsada:  '+ data)
            res.render('MemberDashboard_Appointments', { title: 'Appointments Dashboard', data: data, msg: data1.patientName + ' appointment is not visited' , doctorId: doctorId, loginUser: loginUser, layout: 'layout2', } );
          } else {
            console.log('no data found')
            res.render('MemberDashboard_Appointments', { title: 'Appointments Dashboard', data: '', msg: 'Appointment Not Visited => ' + data1.patientName , doctorId: doctorId, loginUser: loginUser, layout: 'layout2', } );
          }  
     })  
    });  
  } catch (error) {
     res.sendStatus(404);
  }
})



//              C A N C E L L E D    R O U T E       
router.get('/doctor-appointments/:doctorId/cancelled/:appointmentId', ensureAuthenticated, function(req, res){
  const doctorId = req.params.doctorId;
  const appointmentId = req.params.appointmentId;
  const loginUser = req.user.Username;
 console.log(doctorId)
 console.log(appointmentId)
  try {
//                 data update from not visited to visited
     AppointmentDataModel.findOneAndUpdate( {doctorId : doctorId, _id: appointmentId}, {
      appointmentStatus: "cancelled",
      }).exec(function(err, data1){
         if(data1){  console.log('visited:  '+ data1)} else { console.log('not visited') }  
     
//                 finding data and render  
      AppointmentDataModel.find( {  doctorId : doctorId }, function(err, data){
        if(data){
            console.log('asdsada:  '+ data)
            res.render('MemberDashboard_Appointments', { title: 'Appointments Dashboard', data: data, msg: data1.patientName + ' appointment is cancelled', doctorId: doctorId, loginUser: loginUser, layout: 'layout2', } );
          } else {
            console.log('no data found')
            res.render('MemberDashboard_Appointments', { title: 'Appointments Dashboard', data: '', msg: 'Cancelled => ' + data1.patientName , doctorId: doctorId, loginUser: loginUser, layout: 'layout2', } );
          }  
     }) 
     });   
  } catch (error) {
     res.sendStatus(404);
  }
})



   module.exports = router;