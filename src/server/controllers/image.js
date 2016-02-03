import request from 'request';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import config from './../config/dashboard_config';
import ViewGroupsPage from './../../client/dashboard/components/ViewGroupsPage/ViewGroupsPage';
import CreateGroupsPage from './../../client/dashboard/components/CreateGroupsPage/CreateGroupsPage';
import multer from 'multer';
import fs from 'fs';
import AWS from 'aws-sdk';

AWS.config.loadFromPath('./credentials.json');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/../uploads');
  },
  filename: function (req, file, cb) {
    cb(null, req.user.client_id);
  }
});

var multer_upload = multer({ storage: storage }).single('userPhoto');

function upload(req, res, next){
    multer_upload(req, res, function(err){
        if(err){
            console.log(err); 
        }
        else{
            if(req.file.size < config.IMAGE_SIZE_THRESHOLD){
                var bodyStream = fs.createReadStream(req.file.path);
                var s3 = new AWS.S3(); 
                s3.createBucket({Bucket: config.s3_bucket_name}, function() {
                    var params = {Bucket: config.s3_bucket_name, Key: req.user.client_id, Body: bodyStream};
                    s3.putObject(params, function(err, data) {
                      if (err)
                          console.log(err);     
                      else
                          console.log("Successfully uploaded data to myBucket/myKey");   
                      res.redirect('/dashboard/profile');
                    });
                });
            }
            else{
                //req.flash('err_msg', config.IMAGE_SIZE_MESSAGE);
                res.redirect('/dashboard/profile');
            }
        }
    });
};

let stuff = {
    upload: upload
};

export default stuff;
