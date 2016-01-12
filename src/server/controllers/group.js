import request from 'request';
import config from './../config/dashboard_config';


var template_path = './../templates/dashboard/';
var client_id ='568cf1896185571f9e3c071a';
var test_user = {id: client_id, email: 'test email', website: 'test_website'};
var test_image = 'image';

function fetchAll(req, res, next){
    var params = {'client_id': client_id};
    request({url: config.get_groups_url, qs: params}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
                var groups = JSON.parse(body)['groups'];
                res.render(template_path + 'view_groups.jade', { website: req.user.website, groups: groups});
        }
        else{
                res.render(template_path + 'profile.jade', {user: test_user, image: test_image, err_msg: ''});
        }
    });
}

let stuff = {
  list:fetchAll 
};

export default stuff;
