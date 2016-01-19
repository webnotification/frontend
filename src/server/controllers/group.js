import request from 'request';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import config from './../config/dashboard_config';
import GroupsPage from './../../client/dashboard/components/GroupsPage/GroupsPage';

function fetchAll(req, res, next){
    var params = {'client_id': req.user.client_id};
    request({url: config.get_groups_url, qs: params}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
                var groups = JSON.parse(body)['groups'];
                var data = {website: req.user.website, groups:groups};
                var reactHtml = ReactDOMServer.renderToString(<GroupsPage data={data} />);
                res.render('dashboard/index', {reactOutput: reactHtml});
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
