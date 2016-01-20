import React, { PropTypes } from 'react';
import styles from './NotificationAnalyticsPage.styl';
import withStyles from '../../../decorators/withStyles';
import request from 'superagent';
import {Link} from 'react-router'
import router from '../../router';
import Griddle from 'griddle-react';


class NotificationAnalyticsPage extends React.Component {
  render() {
    return(
        <Griddle results={this.props.data.notifications} 
            tableClassName="table" 
            showFilter={true}
            showSettings={true} 
            columns={["title", "group", "target_url", "timestamp", "accept", "reject"]}
            resultsPerPage={20} 
        />  
    );
  };
}

export default NotificationAnalyticsPage;
