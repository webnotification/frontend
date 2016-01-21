import request from 'request';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import config from './../config/dashboard_config';
import PermissionPage from './../../client/dashboard/components/PermissionPage/PermissionPage';


function send(req, res, next){
    let params = {'client_id': req.user.client_id}
    request({url: config.get_groups_url, qs: params}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
                let groups = JSON.parse(body)['groups'];
                var data = {website: req.user.website, groups:groups};
                var reactHtml = ReactDOMServer.renderToString(<PermissionPage data={data} />);
                res.render('dashboard/index', {reactOutput: reactHtml});
        }
        else{
                res.redirect('../profile');
        }
    });
}

function sendToBackend(req, res, next){
    let params = req.body;
    params['client_id'] = req.user.client_id;
    request.post(
        config.send_permission_url,
        { form: params },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    );
    res.send('Permission Sent');
}

let stuff = {
    send: send,
    sendToBackend: sendToBackend 
};

export default stuff;