import React, { PropTypes } from 'react';
import styles from './PermissionAnalyticsPage.styl';
import withStyles from '../../../decorators/withStyles';
import request from 'superagent';
import {Link} from 'react-router'
import router from '../../router';
import Griddle from 'griddle-react';


class PermissionAnalyticsPage extends React.Component {
  render() {
    return(
            <Griddle results={this.props.data.permissions} 
                tableClassName="table" 
                showFilter={true}
                showSettings={true} 
                columns={["title", "group", "target_url", "timestamp", "accept", "reject"]}
                resultsPerPage={20} 
            />  
        );
  };
}

export default PermissionAnalyticsPage;
