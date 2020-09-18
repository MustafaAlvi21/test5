var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const { userRoleAuth } = require('../config/userRoleCheck')

  
    //  function userAccess(req, res, next){
     
    //   if(userToken && loginRole == 'patient'){
    //     next()
    //   } else {
    //     res.render('login', { title : 'PHIC-Login', verify_msg : 'Sign In required', msg:"",  loginUser: req.user.Username,  })
    //   }
    //    };
  
router.get('/:fileName', ensureAuthenticated, userRoleAuth, function(req, res){
    const filename = req.params.fileName
    console.log('download => > ' + filename)
    res.render('download_lab_report', { title: 'PHIC-Download Lab Report ', filename: filename , loginUser: req.user.Username})
    // res.download(__dirname + '../1598801444046DHQ.jpg', '1598803950222Assignment #1.docx');
    // res.send("download : " + a )

})




module.exports=router