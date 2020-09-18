const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const MemberDataModule = require('../modules/Member_signUp');
const { m_loginPage } = require('../config/M_stopLogin')
const bcrypt = require('bcrypt');
const saltRound = 10;




router.get('/', m_loginPage, function(req, res){
  res.render('Member_forgetPassword', {title : 'PHIC - Member Forget Password', })
})

router.post('/', function(req, res){
    const email = req.body.email;

    MemberDataModule.findOne({email: email }).exec(function(err, data){
        if (err) throw err;
        if (data){
    
    // code sender
        
    require('dotenv').config();
    "use strict";
    const nodemailer = require("nodemailer");
    async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
            port: 465,
            secure: true,
        auth: {
          user: 'qwopa08@gmail.com', // generated ethereal user
          pass: 'xcusqmdudishelgk', // generated ethereal password
        },   
        });
    const userId = data._id;
    const url = 'https://phic.herokuapp.com/member-forget-password/new'
    // const url = 'http://localhost:3000/member-forget-password/new'
    // send mail with defined transport object
    let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: req.body.email, // list of receivers
    subject: "Member Forget Password Link ", // Subject line
    text: "Hello world 123?", // plain text body
    html: "<h3>Account Verification link: </h3> "+ `${url}`+"/"+`${userId}`, // html body
    });
    
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    
    main().catch(console.error);
    // ====================================
    
    return res.render('member_login', { title: 'PHIC - Member Login', warning:'Reset password link is emailed...', })
        }
    })
})


router.get('/new/:id', m_loginPage, function(req, res){
    const id = req.params.id;
    // console.log('id: ' + id)
    res.render('Member_forgetPassword_new', {title : 'PHIC - Member New Password',  id: id, })
   })
   

router.post('/new', function(req, res){
  let userId = req.body.id;
  let enteredPassword = req.body.password
  console.log(userId + ' ' + enteredPassword)
  bcrypt.hash(enteredPassword, saltRound, function(err, hash){
    MemberDataModule.findByIdAndUpdate(userId, {encryptedPassword: hash}, function(err, data){
      if (err) console.log(err)
      if (data) {
        console.log(data)
        return res.render('member_login', { title: 'PHIC - Member Login', success_msg: 'Password is updated successfully.', })
      }
    })
  })
})





module.exports = router