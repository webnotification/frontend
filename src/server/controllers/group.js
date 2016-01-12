import request from 'request';
import config from './../config/dashboard_config';


function fetchAll(req, res, next){
    var params = {'client_id': req.user.client_id};
    request({url: config.get_groups_url, qs: params}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
                var groups = JSON.parse(body)['groups'];
                res.render('dashboard/view_groups', { website: req.user.website, groups: groups});
        }
        else{
                res.redirect('../profile');
        }
    });
}

let stuff = {
  list:fetchAll 
};

export default stuff;
