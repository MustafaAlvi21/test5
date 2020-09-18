const express = require ('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const { userRoleAuth } = require('../config/userRoleCheck')


/* Comment due to Heroku Errors */

// const multer = require("multer");
// const GridFsStorage = require("multer-gridfs-storage");

// const path = require('path');
// router.use(express.static(path.join(__dirname, '../public/upload')));

// var Storage = multer.diskStorage({
//   destination: "../public/upload/",
//   filename: (req, file, cb) => {
//       cb(null, file.filename+"_"+Date.now()+path.extname(file.originalname));
//   }
// })

// var upload = multer({
//   storage: Storage
// }).single('file');
//const multer = require("multer");
//const GridFsStorage = require("multer-gridfs-storage");

//const path = require('path');
//router.use(express.static(path.join(__dirname, '../public/upload')));


//var Storage = multer.diskStorage({
  //destination: "../public/upload/",
  //filename: (req, file, cb) => {
    //  cb(null, file.filename+"_"+Date.now()+path.extname(file.originalname));
  //}
//})

//var upload = multer({
  //storage: Storage
//}).single('file');





router.get('/', ensureAuthenticated, userRoleAuth, (req, res) => {
  userDataModel.findOne({_id: req.user._id }).exec(function(err, data){
    try {
      if (data)
      console.log(data)
      console.log(data.phone)
      res.render('profile', { title : 'P H I C - profile', data: data, msg : '', })
    } catch (error) {
      console.log(err)
      res.sendStatus(404)
    }
  })
})


router.post('/', (req, res) => {
//  var filename, image1;
//  image1 = filename;
//   if(image1 == undefined){
//     console.log('IF : ' + image1)
//   }  else {
//     image1 = ''; 
//     console.log('else : ' + req.file.filename)
//   }
      console.log('req.user : ' + req.user)
        const city =  req.body.city;
        const age = req.body.age;
        const emeregency_phone = req.body.emeregency_phone;
  router.get('/', (req, res) => {
    userDataModel.findOne({_id: req.user._id }).exec(function(err, data){
      try {
        if (data)
        console.log(data)
        console.log(data.phone)
        res.render('profile', { title : 'P H I C - profile', data: data, msg : '', loginUser: req.user.Username, })
      } catch (error) {
        console.log(err)
        res.sendStatus(404)
      }
    })    
})


router.post('/',  (req, res) => {
 
    // console.log('req.body.gender : ' + req.body.gender)
        const city =  req.body.city;
        const age = req.body.age;
        const emeregency_phone = req.body.emeregency_phone;
        const image = "image1";
      
        const Username = req.body.Username;
        const email =  req.body.email;
        const cnic =  req.body.nic;
        const phone =  req.body.phone;
        
        console.log("city ---"  +  city)
        console.log("age ---"  +  age)
        console.log("emeregency_phone ---"  +  emeregency_phone)
        console.log("Username ---"  +  Username)
        console.log("email ---"  +  email)
        console.log("cnic ---"  +  cnic)
        console.log("phone ---"  +  phone)

         userDataModel.findOneAndUpdate({_id: req.user._id},{
            city : city,
            dataOfbirth : age,
            emeregency_phone: emeregency_phone,

            Username : Username,
            email : email,
            cnic : cnic,
            phone : phone,
          }).exec((err, data) => {
            if(err) throw err;
            res.redirect('/')
            // res.render('profile', { title: '', data: false, msg:"profile save.", loginUser : '', usernameMsg : '', emailMsg : ''});
          });
})
})


module.exports = router; 
