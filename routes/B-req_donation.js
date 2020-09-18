const express = require ('express');
const router = express.Router();
const donationRequestDataModel = require ('../modules/DB_req_donation')
const { ensureAuthenticated } = require('../config/auth')
const { userRoleAuth } = require('../config/userRoleCheck')

  
  router.get('/donationRequest', ensureAuthenticated, userRoleAuth, function(req, res, next){
    res.render('B-donationRequest', { title: 'Donation Request',  msg: "",  loginUser: req.user.Username } )
  });


  router.post('/donationRequest', ensureAuthenticated, userRoleAuth, function(req, res, next) {
       const UserId = req.user._id;   
       const Username = req.user.Username;
       const Status = 'Pending';
       const Blood_Group =  req.body.Blood_Group;
       const Blood_Cell = req.body.Blood_Cell;
       const Weight =  req.body.Weight;
       const Height =  req.body.Height;
       
       const donationRequest = new donationRequestDataModel({
        UserId: UserId,
        Username : Username,
        Status : Status,
        Blood_Group : Blood_Group,
        Blood_Cell : Blood_Cell,
        Weight : Weight,
        Height : Height,
      });
      donationRequest.save((err, data) => {
        if(err) throw err;
        res.render('B-donationRequest', { title: 'Donation Request', msg: 'Your request has been send to Admin, please wait for admin response, thank you!!!', loginUser: req.user.Username });      
      });
  });


  
module.exports = router; 