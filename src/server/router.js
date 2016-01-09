import Renderer from './helpers/renderer';
// import website_routes from '../client/routes';
import website_routes from '../client/website/routes';
import dashboard_routes from '../client/dashboard/routes';
import apiRouter from './api';
import auth from './controllers/auth';
import passport from './helpers/passport';
import UserController from './controllers/user';

let webapp = new Renderer({website_routes});
let dashboard_app = new Renderer({dashboard_routes});

let indexPage = (req, res, next)=>{
  if (req.query.nobackend == 1){
    res.render('index', {});
  }
  else {
    webapp.render(req.path)
      .then( data => { res.render('index', data) })
      .catch( err => { next(err) });
  }
};

let dashboardPage = (req, res, next)=>{
  auth.ensure(req, res, next);
  if (req.query.nobackend == 1){
    res.render('dashboard/index', {});
  }
  else {
    dashboard_app.render(req.path)
      .then( data => { res.render('dashboard/index', data) })
      .catch( err => { next(err) });
  }
};

// Main AppRouter
let appRouter = (server)=>{
  server.use('/logout', auth.logout);
  // server.post('/login', passport.authenticate('local'), auth.login);
  server.post('/login', passport.authenticate('local'), (req, res)=>{
    let url = req.query.redirect_to || '/';
    res.status(200).json({ status: 'OK', data: {user:req.user, redirect_url: url} });
  });
  server.post('/register', UserController.create);

  server.use('/api', apiRouter);

  //server.get('/profile', userProfile);
  server.get('/dashboard/*', dashboardPage)
  server.get('*', indexPage);
}

export default appRouter;
