const express = require ('express');
const router = express.Router();
const MemberDataModule = require('../modules/Member_signUp');
const { u_loginPage } = require('../config/U_stopLogin')
const { m_loginPage } = require('../config/M_stopLogin')


router.get('/:id', u_loginPage, function(req, res){
  let id = req.params.id;
  MemberDataModule.findByIdAndUpdate( id, {verified: 'true'}, function(err, data){
    return res.render('login', {
        title: 'PHIC-Verify',
        success_msg: 'Account verified!!!',
    })
  })
})


router.get('/member/:id', m_loginPage, function(req, res){
  let id = req.params.id;
  MemberDataModule.findByIdAndUpdate( id, {verified: 'true'}, function(err, data){
    return res.render('member_login', {
      title: 'Member',
      success_msg: 'Account verified!!!',
    })
  })
})

module.exports = router; 