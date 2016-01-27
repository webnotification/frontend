import _ from 'lodash';
import {omit} from 'lodash';
import {Router} from 'express';
import mongoose from 'mongoose';
import passport from '../helpers/passport';
import config from './../config/dashboard_config';

var router = new Router();
var User = mongoose.model('User');


var secured = ['password', '_id', 'id', 'hash', 'salt'];
var userProps = _.difference(_.keys(User.schema.tree), secured);

var extractUser = function(obj){
  var props = _.chain(obj)
    .pick(userProps)
    .map(decodeURIComponent)
    .value();
  return props;
};

var toSafeUser = (obj)=> {
  return _.pick(obj, userProps);
}

var toResponse = function(res, next){ return function(err, data){
  if (err) { return next(err) }

  var result;
  if (_.isArray(data))
    result = data.map( model=> { return toSafeUser(model.toJSON()) });
  else
    result = data.toJSON ? toSafeUser(data.toJSON()) : data;

  res.json({
    status: 'ok',
    result: result
  });

}};


var listUsers = function(req, res, next){
  User.find(null, toResponse(res, next));
};

var getUser = function(req, res, next){
  var query = {_id: req.params.id};
  User.findOne(query, toResponse(res, next));
};

var editUser = function(req, res, next){
  var moreData = _.pick(req.body, _.keys(User.schema.tree))
  User.findOne({ _id: req.params.id }, function(err, user){
    if (err) return next(err);

    _.extend(user, moreData);
    user.save(function(err, save, asave){
      console.log('User saved: ', user._id, user.username)
      res.json({
        status: 'ok',
        result: [save, asave]
      })
    })
  })
};

var createOne = function(req, res, next){
  var data = {
    username: req.body.username,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email
  };

  User.register(data, req.body.password, function(err, savedData){
    if (err) return next(err)
    res.json({
      status: 'ok',
      result: savedData
    })
  });
}

// var createUser = function(req, res, next){
//  var data = require('./samples');
//  console.log('Registering new user', data.length);

//  data.map(function(user){
//    User.register(user, 'test123', function(err){
//      if(err)
//        console.log('error',err)
//      console.log('Done')
//    })
//  })
//  res.send('Registering all')
// }

var deleteUser = function(req, res, next){
  User.remove({ _id: req.params.id }, function(err, changedCount, raw){
    if (err) return next(err)
    res.json({
      status: 'ok',
      changed: changedCount,
      result: raw
    })
  })
};


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

router.get('/list',  listUsers);
// router.get('/setup', createUser);
router.get('/me', getCurrent);
router.post('/', createOne);
router.get('/:id', getUser);
router.put('/:id', editUser);
router.delete('/:id', deleteUser);


export default router;
