const express = require ('express');
const router = express.Router();
const partials = require('express-partials');
const bcrypt = require('bcrypt');
const userDataModule = require('../modules/Member_signUp');
const { u_loginPage } = require('../config/U_stopLogin')



  
  router.get('/', u_loginPage, (req, res) => {
    res.render('signUp', { title : 'PHIC-SignUp', })
  })


router.post('/', (req, res) => {
        console.log('req.body.Username : ' + req.body.Username)
        const Username = req.body.Username;
        const Email =  req.body.Email;
        const password = req.body.password;
        const nic =  req.body.nic;
        const phone =  req.body.phone;
        const gender = req.body.gender;
        
        let errors = [];

        if ( !Username || !Email || !password || !nic || !phone || !gender ){
          errors.push({ msg: 'Please fill in all fields'});
        }
        
        if ( password.length < 6 ){
          errors.push({ msg: 'Password should be atleast 6 characters'});
        }

        if ( nic.length !== 13 ){
          errors.push({ msg: 'NIC should be 13 digits'});
        }

        if ( phone.length !== 11 ){
          errors.push({ msg: 'Phone should be 11 digits'});
        }

        if(errors.length > 0) {
          res.render('signUp', { title : 'PHIC-SignUp', errors, Username, Email, password, nic, phone } )
        } else {
          userDataModule.findOne({email : Email}).then( data => {
            if (data) {
//          U s e r   o r   E m a i l   i s   e x i s t 
            errors.push({ msg : 'Email is already registered'});
            res.render('signUp', { title : 'PHIC-SignUp', errors, Username, Email, password, nic, phone } )              
            } else {
              const createUser = new userDataModule ({
                Username : Username,
                email : Email,
                encryptedPassword : password,
                cnic : nic,
                phone : phone,
                gender : gender,
                role : "patient"
              });

//            H a s h   P a s s w o r d               
              bcrypt.genSalt(10, (err, salt) =>  
                bcrypt.hash(createUser.encryptedPassword, salt, (err, hash) => {
                  if (err) throw err;
//            S e t   p a s s w o r d   t o   h a s h e d               
                  createUser.encryptedPassword = hash;
//            S a v e   u s e r   o r   c r e a t e   u s e r  
                  createUser.save().then( user => {
                    // console.log('user -- ' + user)
                    req.flash('success_msg', 'Registered successfully.')
                    res.redirect('/login');
                  })               
                  .catch(err => console.log(err) );
                }) )
            }
          })
        }
})    //  End of post router


module.exports = router; 
