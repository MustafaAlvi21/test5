module.exports = {
//      stop members to access page pnly patients can access
    userRoleAuth: function(req, res, next) {
        // console.log('check  ' + req.user)
        if (req.user){
            if (req.user.role == 'member') {
                req.flash('error_msg', 'Please log in through valid portal');
                return res.redirect('/member-dashboard');
            }
            
            if (req.user.role == 'B-Admin') {
                req.flash('error_msg', 'Please log in through valid portal');
                return res.redirect('/blood-admin');
            }

        }
                return next();
      }
    }