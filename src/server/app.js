import fs    from 'fs';
import path  from 'path';
import express  from 'express';
import favicon  from 'serve-favicon';
import compress from 'compression';
import cookieParser  from 'cookie-parser';
import bodyParser    from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';
import PrettyError from 'pretty-error';
import config from './config/server';
import mongoose from 'mongoose';


var gcm = require('node-gcm');

var http = require('http');
var request = require('request');
var MongoClient = require('mongodb').MongoClient;
var register_id_coll;
var notification_coll;
var project_key_coll;
MongoClient.connect("mongodb://localhost:27017/users", function(err, db) {
  if(err) { return console.dir(err); };
  register_id_coll = db.collection('register_id');
  notification_coll = db.collection('notification');
  project_key_coll = db.collection('project_key');
  console.log("--- DB successfully connected ---");
});

/**
 * Constants
 */

const isProduction = process.env.NODE_ENV === 'production' ? true : false;
// const errorlog = require('./helpers/logger')({
//   errorFile : path.resolve(__dirname, './logs/error.log'),
//   accessFile: path.resolve(__dirname, './logs/access.log')
// });
const pe = new PrettyError();

// Pretty Error Options
pe.skipNodeFiles();
pe.skipPackage('express', 'react');
pe.withoutColors();






/**
 * Server Setup
 */

let server = express();
server.use(express.static(__dirname + '/public'));
server.set('env', isProduction ? 'production': 'development');

// Dev Mode
if (!isProduction) {
  server.locals.pretty = true;
}

server.enable('trust proxy');
server.set('views', path.join(__dirname, './views'));
server.set('view engine', 'jade');

server.use(compress());
server.use(favicon(__dirname + '/../public/images/favicon.ico'));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(morgan('dev'));

/**
 * Session
 */
server.use(session({
  secret: config.session.secret,
  saveUninitialized: true,
  resave: false
}));


/**
 * Serving
 */

// Static Assets

// Attach Router
// require('./router')(server);
server.get('/hello', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Origin', 'http://www.flashnotifier.com/');
   res.send("Hello world" );
   
});

server.get('/get_message', function (req, res) {
  var data;
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  notification_coll.findOne({}, function(err, document) {
    data = {
      'title': document['title'],
      'message': document['message'],
      'target_url': document['target url'],
    }
    res.end(JSON.stringify(data));
    console.log(document); 
  });
  // console.log(data);
  // res.end(JSON.stringify(data));
 });   


// server.get('/index.html', function (req, res) {
//    res.sendFile( __dirname + "/public/" + "index.html" );
// });



server.get('/process_get', function (req, res) {

   // Prepare output in JSON format
   console.log({
       first_name:req.query.first_name,
       last_name:req.query.last_name
   });
   res.end(JSON.stringify({
       first_name:req.query.first_name,
       last_name:req.query.last_name
   }));
})

server.post('/userid', function(req, res){
  console.log("--- subscription --", req.body);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Origin', 'http://www.flashnotifier.com');
  var str = req.body['subs'];
  var register_id = str.split('/');
  console.log(register_id[register_id.length-1], req.body['website'])
  register_id_coll.insert({"id": register_id[register_id.length-1],
  "website": req.body['website']});
  /* TO DO*/
  res.send({});
})

server.post('/send_client_data', function(req, res){
  console.log('start');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Origin', 'http://www.flashnotifier.com');
  // notification_coll.insert(req.body);
  // var all_ids = register_id_coll.find({'website': req.body['website']});
  console.log('here0');
  // var all_ids = register_id_coll.find({});
  var website_key1 = 'AIzaSyDuYIh8i3e63Wyag2XHwDPrFYTPITZvIQY';
  // var req_data = req;
  console.log('here4');


        var message = new gcm.Message();
        message.addData('key1', 'msg1');
        message.addNotification('title', 'Alert!!!');
        message.addNotification('body', 'Abnormal data access');
        console.log('here');
        var sender = new gcm.Sender(website_key1);
        var registrationTokens = [];

        registrationTokens.push('eNdvQwUjjI0:APA91bFLdqkp590owfCazQJJfnvGu-PFIN0y4kyyUBsofaS5Tr_6_3r9e6Dluc4FtFbUa4kFnchS03MN8Bq84uh6TJ4-Wm5TNZ5837tPVPxHgq-YHMgVX5LMB4nmv241M1KknLVzjCwS');
      console.log('here1');
      sender.send(message, { registrationTokens: registrationTokens }, function(err, response) {
        if(err) console.error(err);
      else    console.log(response);
      });

   res.send({});
});


    //       $.ajax({
    //   type: "POST",
    //     url: "https://gcm-http.googleapis.com/gcm/send",
    //     headers: {'Authorization': website_key1,
    //     'Content-Type': 'application/json',
    //     },
    //     to: doc['id'],
    //     notification: {
    //         'title': req.body['title'],
    //         'text': req.body['message']
    //     }
    //     // data:{'subs':end}
    // }).done(function() {
    //     console.log("--- success ---");
    // });
    // }


  // console.log('test2', id_count);
  // for (i = 0; i < id_count; i++){
  //   console.log('test3');
  //   website_key = project_key_coll.find({'website': req.body['website']})['key'];
  //   // TODO get auth key
  //   console.log('test4');
  //   website_key = 'key='.concat(website_key)
  //   console.log('test5');
  //   $.ajax({
  //     type: "POST",
  //       url: "https://gcm-http.googleapis.com/gcm/send",
  //       headers: {'Authorization': website_key,
  //       'Content-Type': 'application/json',
  //       },
  //       to: all_ids[i]['id'],
  //       notification: {
  //           'title': req.body['title'],
  //           'text': req.body['message']
  //       }
  //       // data:{'subs':end}
  //   }).done(function() {
  //       console.log("--- success ---");

  //   });
  // }


/**
 * 404
 */
server.use((req, res, next)=>{
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});


/**
 * Error Handler
 */
server.use((err, req, res, next)=> {
  var _err = pe.render(err);
  res.status(err.status || 500);
  // errorlog.error(_err);
  if ( /\/api\//.test(req.originalUrl) ){
    return res.json({
      status: "error",
      message: _err.message,
      error: isProduction ? {} : _err
    });
  }
  res.format({
    html: function() {
      res.render('error', {
        message: _err.message,
        error: isProduction ? {} : _err
      });
    },
    text: function() {
      res.send("error: " + _err.message);
    }
  });
});

// Launch the server
server.set('port', (process.env.PORT || 3000));
server.listen(server.get('port'), ()=> {
  if (process.send){ process.send('online') };
  console.log('The server is running at http://localhost:' + server.get('port'));
});