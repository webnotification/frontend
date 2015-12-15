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
server.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/public/" + "index.html" );
})

server.get('/', function (req, res) {
   res.send("Hello world" );
})

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
  var str = req.body['subs'];
  var register_id = str.split('/');
  register_id_coll.insert({"id": register_id[register_id.length-1],
  "website": req.body['website']});
  /* TO DO*/
  res.send({});
})

server.post('/send_client_data', function(req, res){
  console.log('format', req.body);
  notification_coll.insert(req.body);
  console.log('test1');
  // var all_ids = register_id_coll.find({'website': req.body['website']});
  console.log(req.body['website']);
  var all_ids = register_id_coll.find({'website': req.body['website']});
  console.log('test2');
  for (i = 0; i < all_ids.length; i++){
    console.log('test3');
    website_key = project_key_coll.find({'website': req.body['website']})['key'];
    // TODO get auth key
    console.log('test4');
    website_key = 'key='.concat(website_key)
    console.log('test5');
    $.ajax({
      type: "POST",
        url: "https://gcm-http.googleapis.com/gcm/send",
        headers: {'Authorization': website_key,
        'Content-Type': 'application/json'},
        to: all_ids[i]['id'],
        notification: {
            'title': req.body['title'],
            'text': req.body['message']
        }
        // data:{'subs':end}
    }).done(function() {
        console.log("--- success ---");

    });
  }
  res.send({});
})

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