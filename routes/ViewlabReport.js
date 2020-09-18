const express = require('express');
const router = express.Router();
const AppointmentDataModel = require('../modules/appointment'); 
const userDataModel = require('../modules/inventory'); 
const { ensureAuthenticated } = require('../config/auth')
const { userRoleAuth } = require('../config/userRoleCheck')
// const imageMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', ];

// router.get('/', ensureAuthenticated, userRoleAuth, function(req, res){
//     AppointmentDataModel.find({patientId: req.user._id}, function(err, data1){
//         if (err) res.sendStatus(err)
//         if(data1){
//             console.log('asdsada:  '+ data1)
//             res.render('ViewlabReport', { title: 'PHIC-lab Reports', data: data1, loginUser: req.user.Username  } );
//           } else {
//             console.log('no data found')
//             res.render('ViewlabReport', { title: 'PHIC-lab Reports', data: '', loginUser: req.user.Username  } );
//           }  
  
//     })
// })

router.get('/', ensureAuthenticated, userRoleAuth, async (req, res) => {
  let query = userDataModel.find({userId: req.user._id})
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'))
  }

  const data =  AppointmentDataModel.find({patientId: req.user._id}, function(err, asd){
    if(asd){
      // console.log('data' + asd[0])
      
    }
  })
  try {
    const books = await query.exec();
    const data1 = await data.exec();
console.log(data1)
    res.render('ViewlabReport', {
      data1: data1,
      books: books,
      searchOptions: req.query,
      title: 'PHIC-lab Reports',
      loginUser: req.user.Username,
    })
  } catch {
    res.redirect('/')
  }
})


router.post('/', ensureAuthenticated, async function(req, res){
  // const upload =  new userDataModel({
  //   coverImage : req.body.cover
  // })
  // .save(function (req, res) {
  // })
console.log('1')
const book = new userDataModel({
  title: req.body.title,
  userId: req.user._id
})
console.log('2')

saveCover(book, req.body.cover)

try {
  console.log('3')
  const newBook = await book.save()
  // res.redirect(`books/${newBook.id}`)
  res.redirect('/lab-report')
} catch(error) {
  console.log('9')
  // renderNewPage(res, book, true)
  return res.send(error)
}



function saveCover(book, coverEncoded) {
  console.log('4')
  if (coverEncoded == null) return
  const cover = JSON.parse(coverEncoded)
  console.log('5')
  if (cover != null ) {
    console.log('6')
    book.coverImage = new Buffer.from(cover.data, 'base64')
    console.log('7')
    book.coverImageType = cover.type
    console.log('8')
    }
  }
})


// ------------    Searching  ----------------

router.post('/search', ensureAuthenticated, function(req, res){
  let loginUser = req.user;
  let search = req.body.searchText;
  userDataModel.find({ title: { $regex: search, $options: "i" } ,userId: req.user._id }, function(err, data) {
      console.log("Partial Search Begins");
      console.log(data);
      if (err) throw err;
      if (data){
          if (loginUser == undefined){
              res.render('ViewlabReport', {title : 'PHIC-lab Reports', books: data, data1:''})
          } else  {
              res.render('ViewlabReport', {title : 'PHIC-lab Reports', books: data, data1:'', loginUser: req.user.Username, })
          }
      }
  })   
  })
module.exports=router
