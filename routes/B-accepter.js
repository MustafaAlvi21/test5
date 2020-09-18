const express = require ('express');
const router = express.Router();
const bloodRequestDataModel = require ('../modules/DB_blood_request')
const path = require('path');
const { ensureAuthenticated } = require('../config/auth')
const { userRoleAuth } = require('../config/userRoleCheck')



  router.get('/', userRoleAuth, function(req, res){
     bloodRequestDataModel.find({Status : "Accepted"}).exec(function(err, result){
        console.log('result: ' + result)
        // if (err) throw err;

        if (req.user == undefined) {
          console.log('not login')
          return res.render('B-Accepter', {  title: 'Blood Stock', data: result, } )
        }
        res.render('B-Accepter', {  title: 'Blood Stock', data: result, loginUser: req.user.Username, } )
      })
    })


    module.exports = router; 
