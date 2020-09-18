const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userDataModule = require('../modules/Member_signUp');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth')
const { u_loginPage } = require('../config/U_stopLogin')


function isVerified(req, res, next){
  const email = req.body.email;
  userDataModule.findOne({email: email, verified: 'false', }).exec(function(err, data){
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
          pass: 'xcusqmdudishelgk', // generated ethereal password
        },   
      });
      const userId = data._id;
      const url = 'https://phic.herokuapp.com/verify'
      // const url = 'http://localhost:3000/verify'
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

      return res.render('login', { title: 'PHIC-Login', error: 'Verify your email, we have send you verification email.' })
    }
  next();
  })
}




  router.get('/', u_loginPage, (req,res) => {
         res.render('login', { title : 'PHIC-Login',  })
  })

router.post('/', isVerified, (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next)
})






module.exports = router; 
