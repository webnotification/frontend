import request from 'request';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import config from './../config/dashboard_config';
import ViewGroupsPage from './../../client/dashboard/components/ViewGroupsPage/ViewGroupsPage';
import CreateGroupsPage from './../../client/dashboard/components/CreateGroupsPage/CreateGroupsPage';

function list(req, res, next){
    var params = {'client_id': req.user.client_id};
    request({url: config.get_groups_url, qs: params}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
                var groups = JSON.parse(body)['groups'];
                var data = {website: req.user.website, groups:groups};
                res.send(data);
                //var reactHtml = ReactDOMServer.renderToString(<ViewGroupsPage data={data} />);
                //res.render('dashboard/index', {reactOutput: reactHtml});
        }
        //else{
                //res.redirect('../profile');
        //}
    });
};

function create(req, res, next){
    var data = {website: req.user.website, err_msg:''};
    var reactHtml = ReactDOMServer.renderToString(<CreateGroupsPage data={data} />);
    res.render('dashboard/index', {reactOutput: reactHtml});
};

function createOnBackend(req, res, next){
    let params = req.body;
    params['client_id'] = req.user.client_id;
    request({url: config.generate_group_url, qs: params}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if(JSON.parse(body).error == 'IntegrityError'){
                res.send('Group name already exists');
            }
            else{
                res.send('Group Created');
            }
        }
    });
};

let stuff = {
  list: list,
  create: create,
  createOnBackend: createOnBackend  
};

export default stuff;
