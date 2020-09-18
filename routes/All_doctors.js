const express = require ('express');
const router = express.Router();
const DoctorDataModel = require('../modules/Doctors');
const { userRoleAuth } = require('../config/userRoleCheck')
  
  
router.get('/', userRoleAuth, function(req, res){
    let loginUser = req.user
    DoctorDataModel.find({}, (err, data)=>  {
        if (err) throw err;
        if (data){
            console.log(data)
            console.log(data.image)
            if (loginUser == undefined){
                res.render('All_doctors', {title : 'PHIC-Doctors', data: data, })
            } else  {
                res.render('All_doctors', {title : 'PHIC-Doctors', data: data, loginUser: req.user.Username, })
            }
        }
    })
})
   
router.get('/:name', userRoleAuth, function(req, res){
    let name = req.params.name;
    let loginUser = req.user
    DoctorDataModel.find({field: name}, (err, data)=>  {
        if (err) throw err;
        if (data){
            console.log(data)
            console.log(data.image)
            if (loginUser == undefined){
                res.render('All_doctors', {title : 'PHIC-Doctors', data: data, })
            } else  {
                res.render('All_doctors', {title : 'PHIC-Doctors', data: data, loginUser: req.user.Username, })
            }
        }
    })
})
   
router.post('/', userRoleAuth, function(req, res){
    let loginUser = req.user;
    let search = req.body.searchText;
    DoctorDataModel.find({ name: { $regex: search, $options: "i" } , }, function(err, data) {
        console.log("Partial Search Begins");
        console.log(data);
        if (err) throw err;
        if (data){
            if (loginUser == undefined){
                res.render('All_doctors', {title : 'PHIC-Doctors', data: data, })
            } else  {
                res.render('All_doctors', {title : 'PHIC-Doctors', data: data, loginUser: req.user.Username, })
            }
        }
    })   
   });




module.exports = router;