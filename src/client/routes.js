import {Route, NotFoundRoute, DefaultRoute, Redirect} from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';

const routes = (
  <Route name='app' path='/' handler={App}>
    // <Route path='/contact'   name='contact'    handler={ContactPage}/>
    // <Route path='/login'     name='login'      handler={LoginPage}/>
    // <Route path='/register'  name='register'   handler={RegisterPage}/>
    // <Route path='/getlisted' name='getlisted'  handler={GetListedPage}/>
    // <Route path='/apps'      name='apps'       handler={AppDownload}/>
    // <Route path='/listings'  name='listings'   handler={ListingsPage}/>
    // <Route path='/listings/:id'   handler={ListingDedicatedPage}/>
    //
    // <Redirect from='/listings/' to='listings'/>

    <DefaultRoute name='home' handler={HomePage}/>
    <NotFoundRoute handler={NotFoundPage}/>
  </Route>
);

export default routes;
