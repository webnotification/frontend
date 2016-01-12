import request from 'request';
import config from './../config/dashboard_config';


function send_notification(req, res, next){
    params = {'client_id': req.user.id}
    request({url: config.get_groups_url, qs: params}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
                groups = JSON.parse(body)['groups'];
                res.render('send_notification.ejs', { title: 'Send', website: req.user.local.website, groups: groups });
            }
        else{
                res.render('profile.ejs');
        }
    });
}

let stuff = {
    send_notification: send_notification 
};

export default stuff;
