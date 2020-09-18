const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userDataModule = require('../modules/patient');


/* Checking db existing username. */ 
  function checkExistingEmailFromDB(req, res, next){
    var enteredEmail = req.body.email;
    var checkExistingEmailFromDB = userDataModule.findOne({email : enteredUsername});
    console.log('checkExistingEmailFromDB : ' + checkExistingEmailFromDB)
    
    checkExistingEmailFromDB.exec((err, data) => {
      if (err) throw err; 
      if (data){
        return   res.render('signup', { title: 'P H I C', msg:"Email is already taken...", loginUser: '', usernameMsg: 'Username exist in our data', emailMsg: '', });
      }
      next();
    });
  };
  
  module.exports = checkExistingEmailFromDB;