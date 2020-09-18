const express = require ('express');
const router = express.Router();
var DoctorDataModule = require('../modules/Doctors');
var MemberDataModel = require('../modules/Member_signUp');
const { MemberRoleAuth } = require('../config/memberRoleCheck')
const { ensureAuthenticated } = require('../config/auth')



// delete Password Categories.
router.get('/remove/:doctorId', ensureAuthenticated, MemberRoleAuth, function(req, res, next){
    let doctorId = req.params.doctorId;
    console.log('doctorId remove: ' + doctorId)
    let deleteDoctor = DoctorDataModule.findByIdAndDelete(doctorId);
    deleteDoctor.exec(async function (err, data1){
      if (err) throw err;
      if(data1){
        
    const id = req.user._id;
    // console.log('id remove page hospital id =>> '  +  id)
      
//         MemberDataModel.aggregate([
//        {
//          $lookup:
//          {
//           from: "doctors",
//           localField: "Username",
//           foreignField: "belongsTo",
//           as: "inventory_docs"
//         }
//       }
//     ],function(err, data){
//     //   console.log(data[0].inventory_docs[0].gender)
//       // console.log(data)
//       if (data){
//         // console.log(data1.name)
//         //   res.json(data)
//           res.render('MemberDashboard', {title : 'PHIC - ' + data[0].Username , data: data, pageId: req.user.Username, loginUser: req.user.Username ,msg : "User '"  + data1.name + "' is deleted successfully",  layout: 'layout2' })
//       }
//     })
let query = DoctorDataModule.find({belongsTo: req.user.Username})
console.log('query => ' + query.belongsTo)

if (req.query.name != null && req.query.name != '') {
  query = query.regex('name', new RegExp(req.query.name, 'i'))
}
try {
  const books = await query.exec()
  console.log('books => ' + books)
  res.render('MemberDashboard', {
    books: books,
    searchOptions: req.query,
    title: 'PHIC-Dashboard',
    loginUser: req.user.Username,
    msg:"User '"  + data1.name + "' is deleted successfully",
    layout: 'layout2',
  })
} catch {
  res.redirect('/')
}



   }
 });


 });

module.exports = router