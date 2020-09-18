const express = require ('express');
const router = express.Router();
var DoctorDataModule = require('../modules/Doctors'); 
const jwt = require('jsonwebtoken');
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

  
  router.get('/add-doctor', ensureAuthenticated, MemberRoleAuth, (req, res) => {
    res.render('MemberDashboard_add', { title : 'PHIC-Dashboard-Add', msg : '', layout: 'layout2', loginUser: req.user.Username, })
  })


  router.post("/add-doctor", ensureAuthenticated, MemberRoleAuth, async function(req,res,next){

      var d = Date(Date.now()); 
      const currentDate = d.toString();
      
        const belongsTo = req.user.Username;
        const name = req.body.name;
        const gender =  req.body.gender;
        const description = req.body.description;
        const field =  req.body.field;
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;
        const createdAt =  currentDate;
        const updatedAt = '--/--/----';
        // const image =  req.file.filename;

        const book = new DoctorDataModule({
            belongsTo : belongsTo, 
            name : name, 
            gender : gender,
            description : description,
            field : field,
            startTime: startTime,
            endTime: endTime,
            createdAt : createdAt,
            updatedAt : updatedAt,            
            // image : image,  
        });  

        saveCover(book, req.body.cover)

        try {
          const newBook = await book.save()
          // res.redirect(`signUpDetailss/${newBook.id}`)
          res.render('MemberDashboard_add', { title: 'PHIC-Dashboard-Add ', msg:"Doctor added successfully.",  layout: 'layout2', loginUser: req.user.Username, });        
        } catch {
          // renderNewPage(res, signUpDetails, true)
          return res.send('error')
        }

        function saveCover(book, coverEncoded) {
          if (coverEncoded == null) return
          const cover = JSON.parse(coverEncoded)
          if (cover != null ) {
            book.coverImage = new Buffer.from(cover.data, 'base64')
            book.coverImageType = cover.type
          }
        }
      }) 
      
        
        // saveCover(signUpDetails, req.body.cover)
        //   signUpDetails.save((err, data) => {
        //     if(err) throw err;
        //     res.render('MemberDashboard_add', { title: 'PHIC-Dashboard-Add ', msg:"Doctor added successfully.",  layout: 'layout2', loginUser: req.user.Username, });
        //   });



module.exports = router; 


// // settingUp local-storage
// if(typeof localStorage === 'undefined' || localStorage === null){
//     var localStorage = require('node-localstorage').LocalStorage;
//     localStorage = new localStorage('./scratch');
//   }

// router.post('/add-doctor', upload.single('image'),function(req,res,next){

//     var d = Date(Date.now()); 
//     const currentDate = d.toString();

//     const belongsTo = localStorage.getItem('loginUser')
//     const name = req.body.name;
//     const gender =  req.body.gender;
//     const description = req.body.description;
//     const field =  req.body.field;
//     const createdAt =  currentDate;
//     const updatedAt = '--/--/----';
//     const image =  req.file.filename;

//     const created = new DoctorDataModule({
//         belongsTo : belongsTo,
//         name : name,
//         gender : gender,
//         description : description,
//         field : field,
//         createdAt : createdAt,
//         updatedAt : updatedAt,
//         image : image,

//     }).save((err, data) => {
//         if(err) throw err;
//         if(data){
//             console.log('data: ' + data)
//            res.render('MemberDashboard_add', {title: 'PHIC-Ad doctor' , msg: 'Added successfully'})
//         }
//     })
// })

  

// module.exports = router;