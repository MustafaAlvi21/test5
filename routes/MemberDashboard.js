const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const MemberDataModel = require('../modules/Member_signUp'); 
const DoctorDataModel = require('../modules/Doctors');
const { MemberRoleAuth } = require('../config/memberRoleCheck')
const { ensureAuthenticated } = require('../config/auth')




// router.get('/', MemberRoleAuth, function(req, res){
//   console.log('----------------------------------')
//   console.log('--     Dashboard - Get route    --')
//   console.log('----------------------------------')
//   console.log('dashboard id => '  + req.user)
//   const id = req.user.Username
//   console.log(req.user.Username)
//   console.log(req.user._id)
//   console.log(req.user.email)
//     MemberDataModel.aggregate([
//    {
//      $lookup:
//      {  from: "doctors",  localField: "Username",  foreignField: "belongsTo",  as: "inventory_docs"  }
//    } ],function(err, data){

//   console.log('print data' +  data)
//   if (data){
//     data.forEach(singalRecord => {
//       // console.log('matched id  => ' + singalRecord._id )
//       // console.log( id )
//       if(singalRecord.Username === req.user.Username){
//         console.log('Yes')
//       }else{
//         // console.log('No')
//       }
//     });
//       res.render('MemberDashboard', {title : 'PHIC-Dashboard ' , data: data, id123 : 'req.useUsernamer._id', pageId: id, msg : '', loginUser: req.user.Username,  layout: 'layout2' })
//   }
//   })
// })

router.get('/', ensureAuthenticated, MemberRoleAuth, async (req, res) => {
  let query = DoctorDataModel.find({belongsTo: req.user.Username})
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
      msg:'',
      layout: 'layout2',
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

  let book = MemberDataModel.findByIdAndUpdate(req.user._id,
    {
      Username : req.user.Username,
      // reportType : req.body.reportType, 
    });
console.log('1')
// const book = MemberDataModel.findByIdAndUpdate(req.user._id,{
//   Username: req.user.Username
// })
console.log('2')

saveCover(book, req.body.cover)

try {
  console.log('3')
  const newBook = await book.save()
  // res.redirect(`books/${newBook.id}`)
  res.redirect('/member-dashboard')
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






module.exports = router;
