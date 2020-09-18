//  N o t     W o r k i n g  

const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


/* Stopping user to access pages without login.  */
function userAccess(req, res, next){
    var userToken = localStorage.getItem('userToken');
    try {
       var decode = jwt.verify(userToken, 'loginToken');
       console.log('access')
    } catch (error) {
        console.log('DENIED')
        res.redirect('/login')
    }
     next()
   };

   
   module.exports = router;

