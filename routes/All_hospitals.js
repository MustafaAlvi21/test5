const express = require ('express');
const router = express.Router();
const MemberDataModel = require('../modules/Member_signUp');
const DoctorDataModel = require('../modules/Doctors');
const { userRoleAuth } = require('../config/userRoleCheck')

  
router.get('/', userRoleAuth, function(req, res){
    let loginUser = req.user;
    MemberDataModel.find({role: 'member'}, (err, data)=>  {
        if (err) throw err;
        if (data){
        if (loginUser == undefined){
            res.render('All_hospitals', {title : 'PHIC-Hospitals', data: data,})
        } else {
            res.render('All_hospitals', {title : 'PHIC-Hospitals', data: data, loginUser: req.user.Username})
        }
        }
    })
   })
   
   
   
   router.post('/', userRoleAuth, function(req, res){
    let loginUser = req.user;
    let search = req.body.searchText;
    MemberDataModel.find({ Username: { $regex: search, $options: "i" } , role:"member" }, function(err, data) {
        console.log("Partial Search Begins");
        console.log(data);
        if (err) throw err;
        if (data){
        if (loginUser == undefined){
            res.render('All_hospitals', {title : 'PHIC-Hospitals', data: data,})
        } else {
            res.render('All_hospitals', {title : 'PHIC-Hospitals', data: data, loginUser: req.user.Username})
        }
        }
    })   
   });
   


module.exports = router;