if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require ('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const expressPartials = require('express-partials');
const path = require('path');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();
const flash = require('connect-flash');
const session = require ('express-session');
const passport = require('passport')
const GridFsStorage = require("multer-gridfs-storage");
// const favicon = require('serve-favicon');
var favicon = require('serve-favicon');

//   passport config
// const checkUserType = function(req, res, next){
    // const userType = req.originalUrl;
    require('./config/passport')(passport);
    // next();
// }

// app.use(checkUserType);
// console.log('url => ' + req.originalUrl)


/*  ---------------------------------------------  */
/*                      Mongo DB                   */
/*  ---------------------------------------------  */

console.log('process.env.DATABASE_URL ' + process.env.DATABASE_URL)
const mongoose = require ('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false })
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open',()  => console.log('Connected Mongo'))
// mongodb://127.0.0.1:27017/Password_Management_System
// live DATABASE_URL in .env is :  mongodb://127.0.0.1:27017/Password_Management_System, {useNewUrlParser: true}||

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/Password_Management_System', {useNewUrlParser: true, useCreateIndex: true});
// mongoose.connect( process.env.MONGO_URI || 'mongodb+srv://passwordManagementSystem:pms123@cluster0-objod.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true});
// var db = mongoose.connection;


/*  ---------------------------------------------  */
/*            App Use And Set Methods              */
/*  ---------------------------------------------  */

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views') );
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
// app.use(expressPartials);
app.use(express.static ('public') );
// app.use(bodyParser.json({limit: "50mb"}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(favicon(path.join(__dirname , 'public', 'images', 'favicon.ico')));
// app.use(favicon(__dirname + '/public/images/logo.PNG'));
//   E x p r e s s    S e s s i o n      
app.use(session({
  secret: 'mubi',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 600000 * 3 },  // 30 minutes session
}))    
      

//   P a s s p o r t    m i d d l e w a r e   
app.use(passport.initialize());
app.use(passport.session());

//   C o n n e c t   F l a s h      
app.use(flash());
      
//   Global Variables for flash Messages
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next();
})
/*  ---------------------------------------------  */
/*                      U s e r                    */
/*  ---------------------------------------------  */

const homeRouter = require('./routes/home')
const signupRouter = require('./routes/signup')
const loginRouter = require('./routes/login')
const logoutRouter = require('./routes/logout')
const VERIFICATION = require('./routes/accountVerification')
const forget = require('./routes/forgetpassword')
const newPassword = require('./routes/forgetpassword')
const profile = require('./routes/userProfile')
const appointment = require('./routes/appointment')
const ViewlabReport = require('./routes/ViewlabReport')
const online_consult = require('./routes/onlineConsult')
const deases = require('./routes/deases')


app.use( ('/'), homeRouter );
app.use( ('/signup'), signupRouter );
app.use( ('/login'), loginRouter );
app.use( ('/'), logoutRouter );
app.use( ('/verify'), VERIFICATION );
app.use( ('/forget-password'), forget );
app.use( ('/forget-password'), newPassword );
// app.use( ('/profile'), profile );   
app.use( ('/appointment'), appointment );   
app.use( ('/lab-report'), ViewlabReport );   
app.use( ('/lab-report/search'), ViewlabReport );   
app.use( ('/online-consult'), online_consult );   
app.use( ('/all-disase'), deases );   


/*  -----------------------------------------------------  */
/*                      Member Routes                   */
/*  ---------------------------------------------------  */

const H_signupRouter = require('./routes/Member_signUp.js')
const MemberloginRouter = require('./routes/MemberloginRouter')
const Memberforget = require('./routes/Member_forgetpassword')
const Member_newPassword = require('./routes/Member_forgetpassword')
const MemberDashboard = require('./routes/MemberDashboard')
const MemberDashboard_Add = require('./routes/Member.doctor.add')
const MemberDashboard_edit = require('./routes/Member.doctor.edit')
const MemberDashboard_delete = require('./routes/Member.doctor.delete')
const MemberDashboard_Appointments = require('./routes/MemberDashboardAppointments')
const MemberUploadLabReport = require('./routes/MemberUploadLabReport')

const All_hospitals = require('./routes/All_hospitals')
const All_doctors = require('./routes/All_doctors')
const hospital_view = require('./routes/hospitalView')
const doctor_view = require('./routes/doctorView')


app.use( ('/member-signup'), H_signupRouter );
app.use( ('/member-login'), MemberloginRouter );
app.use( ('/member-forget-password'), Memberforget );
app.use( ('/member-forget-password'), Member_newPassword );
app.use( ('/member-dashboard'), MemberDashboard );
app.use( ('/member-dashboard'), MemberDashboard_Add );
app.use( ('/member-dashboard'), MemberDashboard_edit );
app.use( ('/member-dashboard'), MemberDashboard_delete );
app.use( ('/member-dashboard'), MemberDashboard_Appointments );
app.use( ('/member-dashboard'), MemberUploadLabReport );

app.use( ('/all-hospitals'), All_hospitals );
app.use( ('/all-doctors'), All_doctors );
app.use( ('/view-hospital'), hospital_view );
app.use( ('/view-doctor'), doctor_view );


/*  ---------------------------------------------  */
/*              b l o o d   b a n k                */
/*  ---------------------------------------------  */
const bloodStock = require('./routes/B-bloodStock')
app.use( ('/blood-stock'), bloodStock );

const needblood = require('./routes/B-blood_request')
app.use( ('/'), needblood );

const accept = require('./routes/B-accepter')
app.use( ('/blood-accepter'), accept );

const donationRequest = require('./routes/B-req_donation')
app.use( ('/'), donationRequest );

const donate = require('./routes/B-donor')
app.use( ('/blood-donor'), donate );


const admin_home = require('./routes/B-admin.home')
app.use( ('/blood-admin/'), admin_home );

const admin_viewAccepter = require('./routes/B-admin.viewAccepter')
app.use( ('/blood-admin/'), admin_viewAccepter );

const admin_viewDonor = require('./routes/B-admin.viewDonor')
app.use( ('/blood-admin/'), admin_viewDonor );


/*  ---------------------------------------------  */
/*                A d m i n   b r o                */
/*  ---------------------------------------------  */
// const adminRouter = require('./routes/adminBro.router')

// app.use( ('/admin'), adminRouter );


/*  ---------------------------------------------  */
/*                     T R Y                       */
/*  ---------------------------------------------  */
// app.get('/delete', function(req, res){
//     const fs =require('fs')

//     const image = '1598639851639IARJSET 3.pdf'
// //     delete file named
// fs.unlink('./public/upload/'+image, function (err) {
//     if (err) throw err;
// // if no error, file has been deleted successfully
//     console.log('File deleted!');
//     res.send('deleted')
// }) 
// });


/*  ---------------------------------------------  */
/*                  M u l t e r                    */
/*  ---------------------------------------------  */  
const download = require('./routes/download')

app.use( ('/download'), download );


/*  ---------------------------------------------  */
/*                  listening Port                 */
/*  ---------------------------------------------  */  
const port1 = 3000
app.listen(process.env.PORT || port1);