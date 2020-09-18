const express = require ('express');
const router = express.Router();
const dononrRequestDataModel = require ('../modules/DB_req_donation')
const { B_Admin_RoleAuth} = require('../config/B_admin_stopLogin')
const { ensureAuthenticated } = require('../config/auth')


/*          V i e w   D o n o r    R e q    P a g e           */

router.get('/donors', B_Admin_RoleAuth, ensureAuthenticated, function(req, res, next){
    dononrRequestDataModel.find({Status : "Pending"}).exec(function(err, result){
        if (err) throw err;
        res.render('B-adminView', {  title: 'Admin', data: result, loginUser: req.user.Username,  layout: 'B_admin_layout', })
    });
});

/*         E d i t   D o n o r     R e q u e s t        */
router.get('/donors/edit/:id', B_Admin_RoleAuth, ensureAuthenticated, function(req, res, next){
    const id= req.params.id;
    console.log('id is ----  : ' + id)
    dononrRequestDataModel.findById(id).exec (function  (err, data){
        if (err) throw err;
        // res.send(data)
        res.render('B-admindonorEdit', { title: 'Admin Donor Edit', msg: '', data: data, loginUser: req.user.Username ,  layout: 'B_admin_layout',});
    });
});

router.post('/donors/edit', B_Admin_RoleAuth, ensureAuthenticated, function(req, res, next){
    const id = req.body.id;
    const Status = req.body.Status;
    dononrRequestDataModel.findByIdAndUpdate(id,
        {
            Status: Status
        }).exec(function(err, data){
       if (err) throw err;
       res.redirect('/blood-admin/donors')
     });       
});

router.get('/donors/remove/:id', B_Admin_RoleAuth, ensureAuthenticated, function(req, res, next){
    const id = req.params.id;
    dononrRequestDataModel.findByIdAndDelete(id).exec(function (err){
        if (err) throw err;
        res.redirect('/blood-admin/donors')
    })
    })






module.exports = router;