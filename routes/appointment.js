const express = require ('express');
const router = express.Router();
const appointmentDataModel = require('../modules/appointment');
const { ensureAuthenticated } = require('../config/auth')
const { userRoleAuth } = require('../config/userRoleCheck')


  

  router.get('/', ensureAuthenticated, userRoleAuth, (req, res) => {
    // console.log('loginUser_id : ' + req.user.Username + ' ----- ' +  req.user._id)
    try {
      appointmentDataModel.find({ patientId: req.user._id } , function(err, data){
        if(data){
          console.log('asdsada:  '+ data)
          res.render('All_appointment', { title: 'PHIC-Appointments', data: data, msg: 'yes', loginUser: req.user.Username  } );
        } else {
          console.log('no data found')
          res.render('All_appointment', { title: 'PHIC-Appointments', data: '', msg: 'No',  loginUser: req.user.Username } );
        }
        
      })
    } catch (error) {
      res.sendStatus(404);
    }
  })



module.exports = router; 