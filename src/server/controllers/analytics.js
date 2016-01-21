import request from 'request';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import config from './../config/dashboard_config';
import NotificationAnalyticsPage from './../../client/dashboard/components/NotificationAnalyticsPage/NotificationAnalyticsPage';
import PermissionAnalyticsPage from './../../client/dashboard/components/PermissionAnalyticsPage/PermissionAnalyticsPage';

function notification(req, res, next){
        let params = {'client_id': req.user.client_id};
        console.log(config.get_notification_analytics_url);
        console.log(params);
        request({url: config.get_notification_analytics_url, qs: params}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                    var data = JSON.parse(body);
                    var reactHtml = ReactDOMServer.renderToString(<NotificationAnalyticsPage data={data} />);
                    res.render('dashboard/index', {reactOutput: reactHtml});
                }
        });
}

function permission(req, res, next){
        let params = {'client_id': req.user.client_id}
        request({url: config.get_permission_analytics_url, qs: params}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                    var data = JSON.parse(body);
                    var reactHtml = ReactDOMServer.renderToString(<PermissionAnalyticsPage data={data} />);
                    res.render('dashboard/index', {reactOutput: reactHtml});
                }
        });
}

let stuff = {
  notification: notification,
  permission: permission   
};

export default stuff;
