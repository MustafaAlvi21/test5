const express = require ('express');
const router = express.Router();
const MemberDataModel = require('../modules/Member_signUp');
const DoctorDataModel = require('../modules/Doctors');
const { userRoleAuth } = require('../config/userRoleCheck')


router.get('/:_id', userRoleAuth, function(req, res){
    console.log(req.params._id)
    const id = req.params._id;
    let loginUser = req.user;

  //  const hospital =
   MemberDataModel.find({_id: id}, (err, data1)=>  {     
          console.log('Hospital => '+ data1[0].Username)

          // const doctors =
           DoctorDataModel.find({belongsTo: data1[0].Username}, (err, data2)=>  {     
            console.log('doctor => ' +  data2)

                if (loginUser == undefined){
      res.render('hospital_view', {title : 'PHIC - ' + data1[0].Username , data1: data1, data2: data2, pageId: id, msg : '', })
    } else {
      res.render('hospital_view', {title : 'PHIC - ' + data1[0].Username , data1: data1, data2: data2, pageId: id, msg : '',  loginUser: req.user.Username , })
    } 

          })
      })
  })


//     MemberDataModel.aggregate([
//    {
//      $lookup:
//      {
//       from: "doctors",
//       localField: "Username",
//       foreignField: "belongsTo",
//       as: "inventory_docs"
//     }
//   }
// ],function(err, data){
// //   console.log(data[0].inventory_docs[0].gender)
//   console.log(data)
//   if (data){
//     if (loginUser == undefined){
//       res.render('hospital_view', {title : 'PHIC - ' + data[0].Username , data: data, pageId: id, msg : '', })
//     } else {
//       res.render('hospital_view', {title : 'PHIC - ' + data[0].Username , data: data, pageId: id, msg : '',  loginUser: req.user.Username , })
//     } 
//   } 
// })



module.exports = router;