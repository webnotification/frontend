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
server.use(express.static(__dirname +'./public'));

// Attach Router
// require('./router')(server);



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
