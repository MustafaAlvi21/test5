const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const MemberDataModule = require('../modules/Member_signUp');
const { m_loginPage } = require('../config/M_stopLogin')



  
function isVerified(req, res, next){
  const email = req.body.email_1;
  MemberDataModule.findOne({email: email, verified: 'false', }).exec(function(err, data){
    if (err) throw err;
    console.log(data)
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
          pass: 'xcusqmdudishelgk', // generated ethereal password
        },   
      });
      const userId = data._id;
      // const url = 'https://phic.herokuapp.com/verify'
      const url = 'http://localhost:3000/verify'
      // send mail with defined transport object
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

      return res.render('member_login', { title: 'PHIC - login', error:'Email not verified, email is send...', })
    }
  next();
  })
}


router.get('/', m_loginPage, (req,res) => {
    res.render('member_login', { title: 'PHIC - Member Login', })
})

router.post('/', isVerified, (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/member-dashboard',
    failureRedirect: '/member-login',
    failureFlash: true,
  })(req, res, next)
})

// router.post('/', isVerified, (req, res) => {
//     var userToken = localStorage.getItem('userToken');
//     if(userToken){
//         res.render('MemberDashboard', {title: 'PHIC - Dashboard', loginUser: localStorage.getItem('loginUser'), userToken: localStorage.getItem('userToken'), });
//       } else {
//           const enteredemail = req.body.email;
//           const password = req.body.password123;
//           console.log(enteredemail )
//           console.log( password)
//           var checkUser = MemberDataModule.find({email : enteredemail,});
//           checkUser.exec(function (err, data) {
//               console.log('data 123: ' + data)

//               if (data == null || data == ''){
//                   res.render('member_login', { title: 'PHIC-Member Login', msg: '', verify_msg:'Incorrect email or password', loginUser: localStorage.getItem('loginUser'), userToken: localStorage.getItem('userToken'), });
//               } else {
//                   if (err) throw err;
//                      var getPasswordFromDB = data[0].encryptedPassword;
//                      console.log('getPasswordFromDB : ' + getPasswordFromDB)
//                      var getUserId = data._id;
//                      if (password == getPasswordFromDB){
//                         console.log('password match 1')
//                         let token = jwt.sign({ username: data[0].Username }, 'loginToken');

//                         localStorage.setItem('userToken', token);
//                         localStorage.setItem('loginUser', data[0].Username);
//                         localStorage.setItem('loginUser_id', data[0]._id);
//                         localStorage.setItem('loginRole', data[0].role);

//                         res.redirect('/member-dashboard')                 
//                      } else {
//                         console.log('password not match ')
//                         res.render('member_login', { title: 'PHIC-Member Login', msg:'', verify_msg:'Incorrect email or password ', loginUser: localStorage.getItem('loginUser'), userToken: localStorage.getItem('userToken'), });
//                       }
//               }
//           });
//       }
// })


module.exports = router; 
