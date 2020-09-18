const express = require ('express');
const router = express.Router();
const donationRequestDataModel = require ('../modules/DB_req_donation')
const { userRoleAuth } = require('../config/userRoleCheck')


  router.get('/', userRoleAuth, function(req, res){
     donationRequestDataModel.find({Status : "Accepted"}).exec(function(err, result){
      // console.log(result[0].Status)
        if (err) throw err;

        if (req.user == undefined) {
          console.log('not login')
          return  res.render('B-donor', {  title: 'Blood Stock', data: result, } )
        }
    
        res.render('B-donor', {  title: 'Blood Stock', data: result, loginUser: 'loginUser' } )
      })
    })


    module.exports = router; 
