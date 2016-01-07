import Renderer from './helpers/renderer';
import routes from '../client/routes';
import apiRouter from './api';
import auth from './controllers/auth';
import passport from './helpers/passport';
import UserController from './controllers/user';

let webapp = new Renderer({routes});

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
// Main AppRouter
let appRouter = (server)=>{
  server.use('/logout', auth.logout);
  server.post('/login', passport.authenticate('local'), (req, res)=>{
    res.status(200).json({ status: 'OK', result: req.user });
  });
  server.post('/register', UserController.create);

  server.use('/api', apiRouter);

  //server.get('/profile', userProfile);
  server.get('*', indexPage);
}

export default appRouter;
