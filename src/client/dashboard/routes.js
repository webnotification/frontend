import {Route, DefaultRoute, Redirect} from 'react-router';
import App from './components/App';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';

const routes = (
  <Route name='dashboard' path='/dashboard' handler={App}>
  	<Route path='profile' name='profile' handler={ProfilePage}/>
    <Route path='/logout' name="logout"/>
    <DefaultRoute name='home' handler={HomePage}/>
  </Route>
);

export default routes;
