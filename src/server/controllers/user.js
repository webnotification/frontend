import mongoose from 'mongoose';
import config from './../config/dashboard_config';
import request from 'request';
let User = mongoose.model('User');

let createOne = (req, res, next)=>{
    request({url: config.generate_client_id_url}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
                var data = {
                    client_id: JSON.parse(body).client_id,
                    username: req.body.username,
                    website: req.body.website,
                    is_verified: true,
                    created_at: (new Date()).toISOString()
                };

                console.log('Registering new user', data);
                console.log('Has Password: ', req.body.password);
                
                User.register(data, req.body.password, function(err){
                    if (err){
                      console.log('Registration:Failed: ', err)
                      res.status(400).json({
                        status: 'error',
                        result: err
                      });
                    }
                    else{
                            var params = {'client_id': data.client_id,
                                          'website': data.website            
                            };

                            request({url: config.save_client_url, qs: params}, function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                        console.log('client_saved');
                                    }
                            });
                            
                            console.log('Registration:Success')
                            res.json({
                            status: 'OK',
                            registered: true,
                            result: data
                            })
                    }
                });
            }
    });
}

var getCurrent = function(req, res, next){
  if (req.isAuthenticated())
  {
    var data = {
        user : req.user,
        image : config.NOTIFICATION_IMAGE_BASE_PATH + req.user.client_id,
    };
    res.json({ status: 'ok' , result: data});
  }
  else
    res.sendStatus(403);
}


export default {
  create: createOne,
  me: getCurrent
}
