import {Route, DefaultRoute, Redirect} from 'react-router';
import App from './components/App';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import PermissionPage from './components/PermissionPage';
import NotificationPage from './components/NotificationPage';
import CreateGroupsPage from './components/CreateGroupsPage';
import ViewGroupsPage from './components/ViewGroupsPage';
import NotificationAnalyticsPage from './components/NotificationAnalyticsPage';

const routes = (
  <Route name='dashboard' path='/dashboard/' handler={App}>
  	<Route path='profile' name='profile' handler={ProfilePage}/>
  	<Route path='permission/send' name='permission' handler={PermissionPage}/>
  	<Route path='notification/send' name='notification' handler={NotificationPage}/>
  	<Route path='groups/create' name='create group' handler={CreateGroupsPage}/>
  	<Route path='groups/view' name='view group' handler={ViewGroupsPage}/>
  	<Route path='analytics/notification' name='notification analytics' handler={NotificationAnalyticsPage}/>
    <Route path='/logout' name="logout"/>
    <DefaultRoute name='home' handler={HomePage}/>
  </Route>
);

export default routes;
