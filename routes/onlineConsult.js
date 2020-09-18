const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { ensureAuthenticated } = require('../config/auth')


router.get('/', ensureAuthenticated, function(req, res){
    res.render('onlineConsult')
})


module.exports = router