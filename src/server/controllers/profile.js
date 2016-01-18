import request from 'request';
import config from './../config/dashboard_config';

import React from 'react';
import ProfilePage from './../../client/dashboard/components/ProfilePage/ProfilePage';
import ReactDOMServer from 'react-dom/server';

var ReactApp = React.createFactory(ProfilePage);

function profile(req, res, next){
    var err_msg = '';
    var data = {
        user : req.user,
        image : config.NOTIFICATION_IMAGE_BASE_PATH + req.user.id,
        err_msg : err_msg
    };
    var reactHtml = ReactDOMServer.renderToString(<ProfilePage data={data} />);
    res.render('dashboard/index', {reactOutput: reactHtml});
}

let stuff = {
    profile: profile
};

export default stuff;
