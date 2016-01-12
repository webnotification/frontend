import request from 'request';
import config from './../config/dashboard_config';


function profile(req, res, next){
    var err_msg = '';
    //flash_msg = req.flash('err_msg');
    //if (flash_msg.length > 0)
        //err_msg = flash_msg[0];
    res.render('dashboard/profile', {
        user : req.user, // get the user out of session and pass to template
        image : config.NOTIFICATION_IMAGE_BASE_PATH + req.user.id,
        err_msg : err_msg
    });
}

let stuff = {
    profile: profile
};

export default stuff;
