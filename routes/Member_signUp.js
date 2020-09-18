const express = require ('express');
const router = express.Router();
const partials = require('express-partials');
const bcrypt = require('bcrypt');
const MemberDataModule = require('../modules/Member_signUp');
const { m_loginPage } = require('../config/M_stopLogin')
var multer  = require('multer');


// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/upload/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now()+file.originalname)
//   }
// })

// const fileFilter=(req, file, cb)=>{
//  if(file){
//      cb(null,true);
//  }else{
//      cb(null, false);
//  } 
// }

// var upload = multer({ 
//   storage:storage,
//   limits:{
//       fileSize: 1024 * 1024 * 5
//   },
//   fileFilter:fileFilter
// });

  router.get('/', m_loginPage, (req, res) => {
    res.render('Member_signUp', { title : 'PHIC-SignUp', })
  })


//   var Storage= multer.diskStorage({
//     destination:"./public/uploads/",
//     filename:(req,file,cb)=>{
//       cb(null,file.fieldname+"_"+Date.now()+file.originalname);
//     }
//   });
  
//   var upload = multer({
//     storage:Storage
//   }).single('file');
  


// router.post('/',  upload, (req, res) => {
//         console.log('req.body.Username : ' + req.body.Username)
//         const Username = req.body.Username;
//         const Email =  req.body.Email;
//         const password = req.body.password;
//         const phone =  req.body.phone;
//         var imageFile=req.file.filename;
        
//         let errors = [];

//         if ( !Username || !Email || !password || !phone ){
//           errors.push({ msg: 'Please fill in all fields'});
//         }
        
//         if ( password.length < 6 ){
//           errors.push({ msg: 'Password should be atleast 6 characters'});
//         }


//         if ( phone.length !== 11 ){
//           errors.push({ msg: 'Phone should be 11 digits'});
//         }

//         if(errors.length > 0) {
//           res.render('signUp', { title : 'PHIC-SignUp', errors, Username, Email, password, phone } )
//         } else {
//           MemberDataModule.findOne({email : Email}).then( data => {
//             if (data) {
// //          U s e r   o r   E m a i l   i s   e x i s t 
//             errors.push({ msg : 'Email is already registered'});
//             res.render('signUp', { title : 'PHIC-SignUp', errors, Username, Email, password, phone } )              
//             } else {
//               const createUser = new MemberDataModule ({
//                 Username : Username,
//                 email : Email,
//                 encryptedPassword : password,
//                 phone : phone,
//                 role : 'member',
//                 profileImage : imageFile
//               });

// //            H a s h   P a s s w o r d               
//               bcrypt.genSalt(10, (err, salt) =>  
//                 bcrypt.hash(createUser.encryptedPassword, salt, (err, hash) => {
//                   if (err) throw err;
// //            S e t   p a s s w o r d   t o   h a s h e d               
//                   createUser.encryptedPassword = hash;
// //            S a v e   u s e r   o r   c r e a t e   u s e r  
//                   createUser.save().then( user => {
//                     // console.log('user -- ' + user)
//                     req.flash('success_msg', 'Member Registered successfully.')
//                     res.redirect('/login');
//                   })               
//                   .catch(err => console.log(err) );
//                 }) )
//             }
//           })
//         }
// })    //  End of post router



//   var Storage= multer.diskStorage({
//     destination:"./public/uploads/",
//     filename:(req,file,cb)=>{
//       cb(null,file.fieldname+"_"+Date.now()+file.originalname);
//     }
//   });
  
//   var upload = multer({
//     storage:Storage
//   }).single('file');
  


router.post('/', (req, res) => {
        console.log('req.body.Username : ' + req.body.Username)
        const Username = req.body.Username;
        const Email =  req.body.Email;
        const password = req.body.password;
        const phone =  req.body.phone;
        // var imageFile=req.file.filename;
        
        let errors = [];

        if ( !Username || !Email || !password || !phone ){
          errors.push({ msg: 'Please fill in all fields'});
        }
        
        if ( phone.length !== 11 ){
          errors.push({ msg: 'Phone should be 11 digits'});
        }
        
        if ( password.length < 6 ){
          errors.push({ msg: 'Password should be atleast 6 characters'});
        }


        if(errors.length > 0) {
          res.render('Member_signUp', { title : 'PHIC-SignUp', errors, Username, Email, password, phone } )
        } else {
          MemberDataModule.findOne({email : Email}).then( data => {
            if (data) {
//          U s e r   o r   E m a i l   i s   e x i s t 
            errors.push({ msg : 'Email is already registered'});
            res.render('Member_signUp', { title : 'PHIC-SignUp', errors, Username, Email, password, phone } )              
            } else {
              const createUser = new MemberDataModule ({
                Username : Username,
                email : Email,
                encryptedPassword : password,
                phone : phone,
                role : 'member',
                // profileImage : imageFile
              });

//            H a s h   P a s s w o r d               
              bcrypt.genSalt(10, (err, salt) =>  
                bcrypt.hash(createUser.encryptedPassword, salt, async (err, hash) => {
                  if (err) throw err;
//            S e t   p a s s w o r d   t o   h a s h e d               
                  createUser.encryptedPassword = hash;
//            S a v e   u s e r   o r   c r e a t e   u s e r  
                  // createUser.save().then( user => {
                    // console.log('user -- ' + user)

//                F i l e p o n d    S t a r t  


saveCover(createUser, req.body.cover)

try {
  const newBook = await createUser.save()
  // res.redirect(`signUpDetailss/${newBook.id}`)
    req.flash('success_msg', 'Member Registered successfully.')
    res.redirect('/login');
} catch {
  // renderNewPage(res, signUpDetails, true)
  return res.send('error')
}

function saveCover(createUser, coverEncoded) {
  if (coverEncoded == null) return
  const cover = JSON.parse(coverEncoded)
  if (cover != null ) {
    createUser.coverImage = new Buffer.from(cover.data, 'base64')
    createUser.coverImageType = cover.type
  }
}


//                F i l e p o n d      E n d    


                    // req.flash('success_msg', 'Member Registered successfully.')
                    // res.redirect('/login');
                  // })               
                  // .catch(err => console.log(err) );
                }) )
            }
          })
        }
})    //  End of post router

module.exports = router; 