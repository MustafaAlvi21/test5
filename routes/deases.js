const express = require ('express');
const router = express.Router();
const { userRoleAuth } = require('../config/userRoleCheck')


router.get('/' , userRoleAuth , function(req, res){
    res.render('disase', {title: 'PHIC - Disase',})
})


module.exports = router;