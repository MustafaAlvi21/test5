const express = require ('express');
const router = express.Router();
var DoctorDataModule = require('../modules/Doctors');
const MemberDataModel = require('../modules/Member_signUp'); 
const { MemberRoleAuth } = require('../config/memberRoleCheck')
const { ensureAuthenticated } = require('../config/auth')

//   //    M u l t e r  S e t U p   

//   var multer  = require('multer');
 
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/upload/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now()+file.originalname)
//     }
//   })
 
//   const fileFilter=(req, file, cb)=>{
//    if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
//        cb(null,true);
//    }else{
//        cb(null, false);
//    } 
//   }
 
// var upload = multer({ 
//     storage:storage,
//     limits:{
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter:fileFilter
//  });
 
//  ------------------------------------------------------------------


router.get('/update-doctor/:doctorId', ensureAuthenticated, MemberRoleAuth, function(req, res, next){
  const doctorId = req.params.doctorId;
  // console.log('doctorId: ' + doctorId)
  // console.log('url=> ' + req.originalUrl.split('/')[3])

  DoctorDataModule.findById(doctorId, (err, data) => {
      if (err) throw err;
      if (data) {
          // res.json(data)
            res.render('MemberDashboard_edit', { title: 'Admin Donor Edit', msg: '', data: data, doctorId: doctorId, layout: 'layout2', loginUser: req.user.Username });
        }
      })
  });

//   /member-dashboard-update
  router.post('/update-doctor/', MemberRoleAuth, function(req, res){  // dashboard ka url is liay use kia hay takay form post kerne pay dashboard pay leke jai  
        // const doctorId = req.originalUrl.split('/')[3];

        // console.log('P O S T  doctorId : ' + doctorId)
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var currentDate = date+' '+time;
        console.log(req.body.gender)

        const doctorId = req.body.doctorId;
        const name = req.body.name;
        const gender =  req.body.gender;
        const description = req.body.description;
        const field =  req.body.field;
        const updatedAt = currentDate;
        console.log('Post - doctorId => ' + doctorId)
        console.log('Post - name => ' + name)
        console.log('Post - gender => ' + gender)
        console.log('1')
        console.log('Post - description => ' + description)
        console.log('Post - field => ' + field)
        console.log('Post - updatedAt => ' + updatedAt)
let update = DoctorDataModule.findByIdAndUpdate(doctorId,
  {
    name : name,
    gender : gender,
    description : description,
    field : field,
    updatedAt : updatedAt,
  });
  console.log('2')
  update.exec(function(err, data){
    console.log('3')
    if (err) throw err;
    console.log('4')
    if (data){
      console.log('5')
      res.redirect('/member-dashboard')
    
      //       const id = req.user._id;
      //       console.log('id : '  +  id)
  
      //           MemberDataModel.aggregate([
      //          {
      //            $lookup:
      //            {
      //             from: "doctors",
      //             localField: "Username",
      //             foreignField: "belongsTo",
      //             as: "inventory_docs"
      //           }
      //         }
      //       ],function(err, data){
      //       //   console.log(data[0].inventory_docs[0].gender)
      //         if (data){      
      //             res.render('MemberDashboard', {title : 'PHIC - ' + data[0].Username , books: data, pageId: req.user.Username, msg : name + ' details updated successfully',  layout: 'layout2', loginUser: req.user.Username })
      //         }
      //       })
    
          }
        });
        // let query = DoctorDataModule.find({belongsTo: req.user.Username})
        // console.log('query => ' + query.belongsTo)
      
        // if (req.query.name != null && req.query.name != '') {
        //   query = query.regex('name', new RegExp(req.query.name, 'i'))
        // }
        // try {
        //   const books = await query.exec()
        //   console.log('books => ' + books)
        //   res.render('MemberDashboard', {
        //     books: books,
        //     searchOptions: req.query,
        //     title: 'PHIC-Dashboard',
        //     loginUser: req.user.Username,
        //     msg: name + ' details updated successfully',
        //     layout: 'layout2'
        //   })
        // } catch {
        //   res.redirect('/')
        // }
      
  });




module.exports = router;