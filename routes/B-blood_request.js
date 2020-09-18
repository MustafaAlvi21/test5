const express = require ('express');
const router = express.Router();
const bloodRequestDataModel = require ('../modules/DB_blood_request')
const { ensureAuthenticated } = require('../config/auth')
const { userRoleAuth } = require('../config/userRoleCheck')



  router.get('/need-blood', ensureAuthenticated, userRoleAuth, function(req, res, next){
    res.render('B-needBlood', { title: 'Need Blood', msg:'', loginUser: req.user.Username})
  });


   router.post('/need-blood', ensureAuthenticated, userRoleAuth, function(req, res, next) {
       const UserId = req.user._id;
       const Username = req.user.Username;
       const Status = 'Pending'
       const Blood_Group =  req.body.Blood_Group
       const Blood_Cell = req.body.Blood_Cell
       const Weight =  req.body.Weight
       const Height =  req.body.Height

       
       const bloodRequest = new bloodRequestDataModel({
        UserId : UserId,
        Username : Username,
        Status : Status,
        Blood_Group : Blood_Group,
        Blood_Cell : Blood_Cell,
        Weight : Weight,
        Height : Height,
      });
      bloodRequest.save((err, data) => {
        if(err) throw err;
        res.render('B-needBlood', { title: 'Need Request', msg: 'Your request has been sended to Admin', loginUser: req.user.Username, });
    });
    });


  
module.exports = router; 