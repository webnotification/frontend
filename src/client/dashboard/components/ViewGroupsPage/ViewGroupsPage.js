import React, { PropTypes } from 'react';
import styles from './ViewGroupsPage.styl';
import withStyles from '../../../decorators/withStyles';
import request from 'superagent';
import {Link} from 'react-router'
import router from '../../router';


class ViewGroupsPage extends React.Component {
  render() {
    
    var group_names = this.props.data.groups.map(function(group){
        return <li> {group.name} </li>;
    });

    return(
        <div>
            <h3> Website:  {this.props.data.website} </h3>
            <label>Groups</label>
            <ol>
                {group_names}
            </ol>
            <form action="/dashboard/profile" method="get">
                <button>Profile</button>
            </form>
        </div>
        );
  };
}

export default ViewGroupsPage;
