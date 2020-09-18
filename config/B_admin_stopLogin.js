module.exports = {
    //      stop members and patients to access page only B-Admin can access
        B_Admin_RoleAuth: function(req, res, next) {
            // console.log('check  ' + req.user)
            if (req.user){
                if (req.user.role == 'patient') {
                    req.flash('error_msg', 'Please log in through valid portal');
                    return res.redirect('/');
                }
            
                if (req.user.role == 'member') {
                    req.flash('error_msg', 'Please log in through valid portal');
                    return res.redirect('/member-dashboard');
                }
            }
                    return next();
            
          }
        }