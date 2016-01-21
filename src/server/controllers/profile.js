import request from 'request';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import config from './../config/dashboard_config';
import ProfilePage from './../../client/dashboard/components/ProfilePage/ProfilePage';

function profile(req, res, next){
    var err_msg = '';
    var data = {
        user : req.user,
        image : config.NOTIFICATION_IMAGE_BASE_PATH + req.user.client_id,
        err_msg : err_msg
    };
    var reactHtml = ReactDOMServer.renderToString(<ProfilePage data={data} />);
    res.render('dashboard/index', {reactOutput: reactHtml});
}

let stuff = {
    profile: profile
};

export default stuff;
