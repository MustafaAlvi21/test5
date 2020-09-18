const express = require ('express');
const router = express.Router();
const bloodRequestDataModel = require ('../modules/DB_blood_request')
const { B_Admin_RoleAuth} = require('../config/B_admin_stopLogin')
const { ensureAuthenticated } = require('../config/auth')

/*          V i e w   A c c e p t e r    R e q    P a g e           */
router.get('/accepters', B_Admin_RoleAuth, ensureAuthenticated, function(req, res, next){
    bloodRequestDataModel.find({Status : "Pending"}).exec(function(err, result){
        if (err) throw err;
        res.render('B-adminAccepterView', {  title: 'Admin', data: result, loginUser: req.user.Username,  layout: 'B_admin_layout', })
    });
});

/*         E d i t   A c c e p t e r     R e q u e s t        */
router.get('/accepters/edit/:id', B_Admin_RoleAuth, ensureAuthenticated, function(req, res, next){
    const id= req.params.id;
    console.log('id is ----  : ' + id)
    bloodRequestDataModel.findById(id).exec (function  (err, data){
        if (err) throw err;
        res.render('B-AdminAccepterEdit', { title: 'Admin Accepters Edit', msg: '', data: data, loginUser: req.user.Username ,  layout: 'B_admin_layout',  });
    });
});

router.post('/accepters/edit', B_Admin_RoleAuth, ensureAuthenticated, function(req, res, next){
    const id = req.body.id;
    console.log('post ID    => ' + id)
    const Status = req.body.Status;
    bloodRequestDataModel.findOneAndUpdate({_id: id},
        {
            Status: Status
        }).exec(function(err, data){
       if (err) throw err;
       res.redirect('/blood-admin/accepters')
     });       
});

router.get('/accepters/remove/:id', B_Admin_RoleAuth, ensureAuthenticated, function(req, res, next){
    const id = req.params.id;
    bloodRequestDataModel.findByIdAndDelete(id).exec(function (err){
        if (err) throw err;
        res.redirect('/blood-admin/accepters')
    })
    })





module.exports = router;