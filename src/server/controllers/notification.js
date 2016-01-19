import request from 'request';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import config from './../config/dashboard_config';
import NotificationPage from './../../client/dashboard/components/NotificationPage/NotificationPage';


function send(req, res, next){
    let params = {'client_id': req.user.client_id}
    request({url: config.get_groups_url, qs: params}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
                let groups = JSON.parse(body)['groups'];
                //res.render('dashboard/send_notification', { title: 'Send', website: req.user.website, groups: groups });
                var data = {website: req.user.website, groups:groups};
                var reactHtml = ReactDOMServer.renderToString(<NotificationPage data={data} />);
                res.render('dashboard/index', {reactOutput: reactHtml});
        }
        else{
                res.redirect('../profile');
        }
    });
}

let stuff = {
    send: send 
};

export default stuff;
