const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const DataModule = require('../modules/Member_signUp');
const { u_loginPage } = require('../config/U_stopLogin')
const bcrypt = require('bcrypt');
const saltRound = 10;

router.get('/', u_loginPage, function(req, res){
  res.render('forgetPassword', {title : 'PHIC-Forget Password', })
})

router.post('/', function(req, res){
  const email = req.body.email;
  DataModule.findOne({email: email }).exec(function(err, data){
  if (err) throw err;
    if (data){
    const nodemailer = require("nodemailer");
    async function main() {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'qwopa08@gmail.com', // generated ethereal user
        pass: 'xcusqmdudishelgk', //  generated ethereal password
      },   
    });
    const userId = data._id;
    const url = 'https://phic.herokuapp.com/forget-password/new'
    // const url = 'http://localhost:3000/forget-password/new'
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: req.body.email, // list of receivers
      subject: "Please confirm your Email account", // Subject line
      text: "Hello world 123?", // plain text body
      html: "<h3>Account Verification link: </h3> "+ `${url}`+"/"+`${userId}`, // html body
    });  
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  
    main().catch(console.error);
    // ====================================
    
    return res.render('login', { title: 'PHIC-Login', warning:'Reset password link is emailed...', })
    }
  })
})


router.get('/new/:id', u_loginPage, function(req, res){
  const id = req.params.id;
  console.log('id: ' + id)
  res.render('forgetPassword_new', {title : 'PHIC-New password', id: id, })
})
   

router.post('/new', function(req, res){
  let userId = req.body.id;
  let enteredPassword = req.body.password
  console.log(userId + ' ' + enteredPassword)
  bcrypt.hash(enteredPassword, saltRound, function(err, hash){
      DataModule.findByIdAndUpdate(userId, {encryptedPassword: hash}, function(err, data){
          if (err) console.log(err)
          if (data) {
              console.log(data)
              return res.render('login', { title: 'PHIC-Login', success_msg: 'Password is updated successfully.', })
          }
        })
  })  
})





module.exports = router