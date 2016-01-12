import request from 'request';
import config from './../config/dashboard_config';


function send_notification(req, res, next){
    let params = {'client_id': req.user.client_id}
    request({url: config.get_groups_url, qs: params}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
                let groups = JSON.parse(body)['groups'];
                res.render('dashboard/send_notification', { title: 'Send', website: req.user.website, groups: groups });
        }
        else{
                res.redirect('../profile/profile');
        }
    });
}

let stuff = {
    send_notification: send_notification 
};

export default stuff;
