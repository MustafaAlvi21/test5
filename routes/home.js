const express = require ('express');
const router = express.Router();
const path = require('path');
const { ensureAuthenticated } = require('../config/auth')
const { userRoleAuth } = require('../config/userRoleCheck')


  /*          H o m e   p a g e       */

router.get('/', userRoleAuth, (req, res) => {
  if (req.user == undefined) {
      console.log('not login')
      return  res.render('home', { title: 'PHIC-Home', });
    }
    res.render('home', { title: 'PHIC-Home', loginUser: req.user.Username });
})




module.exports = router; 