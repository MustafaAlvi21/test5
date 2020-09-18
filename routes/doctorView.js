const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const doctorDataModel = require('../modules/Doctors');
const AppointmentDataModel = require('../modules/appointment');
const { ensureAuthenticated } = require('../config/auth')
const { userRoleAuth } = require('../config/userRoleCheck')


  //  function userAccess(req, res, next){
  //   var userToken = localStorage.getItem('userToken');
  //   var loginRole = localStorage.getItem('loginRole');
  //   var loginUser_id = localStorage.getItem('loginUser_id');
  //   if(userToken && loginRole == 'patient'){
  //     next()
  //   } else {
  //     res.render('login', { title : 'PHIC-Login', verify_msg : 'Sign In required', msg:"",  loginUser: localStorage.getItem('loginUser'), userToken: localStorage.getItem('userToken'), })
  //   }
  //    };

     
router.get('/:doctorId', userRoleAuth, function(req, res){
    const doctorId = req.params.doctorId;
    console.log('doctorId : ' + doctorId)
    doctorDataModel.findById(doctorId, function(err, data){
        if (err) res.sendStatus(404);
        if(data){

          if (req.user == undefined) {
            return  res.render('doctorView', { title: 'PHIC-Doctor', data : data, doctor: doctorId, msg: '', loginUser: undefined })
          }
          res.render('doctorView', { title: 'PHIC-Doctor', data : data, doctor: doctorId, msg: '', loginUser: req.user.Username })
        }
    })
})


//    C r e a t i n g    A p p o i n t m e n t    

router.post('/:doctorId', ensureAuthenticated, function(req, res){
    let timing = req.body.date;
    // let patientName = localStorage.getItem('loginUser')    
    // let patientId = localStorage.getItem('loginUser_id')    
    console.log('P O S T  doctorId : ' + req.params.doctorId)
    console.log('timing : ' + timing)
    console.log('P O S T   user : ' + req.user)
    // console.log('patientId : ' + patientId)

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
  doctorDataModel.findById(req.params.doctorId, function(err, data){
        if (err) res.sendStatus(404);
        if(data){
            console.log('data : ' + data)
            const create = new AppointmentDataModel({
                belongsTo: data.belongsTo,
                doctor: data.name,
                doctorId: req.params.doctorId,
                patientName: req.user.Username,
                patientId: req.user._id,
                patientRole: 'patient',
                field: data.field,
                appointmentDate: timing,
                createdAt: dateTime,                
                // appointmentStatus: data.  ,
            })

            console.log('AppointmentDataModel  -  ' + create)
            create.save( function (err, data2){
                if (err) throw err;
                if (data2){
                    console.log('appointment complete : ' + data2)
                    res.render('doctorView', { title: 'PHIC-Doctor', data : data, doctor: req.params.doctorId, msg: 'Thanks for appointment.', loginUser: req.user.Username, })
                }
            })

            // res.render('doctorView', { title: 'PHIC-Doctor', data : data, doctor: req.params.doctorId, msg: '', loginUser: req.user.Username })

        }
    })
})





module.exports = router