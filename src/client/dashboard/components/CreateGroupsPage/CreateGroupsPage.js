import React, { PropTypes } from 'react';
import styles from './CreateGroupsPage.styl';
import withStyles from '../../../decorators/withStyles';
import request from 'superagent';
import {Link} from 'react-router'
import router from '../../router';


class CreateGroupsPage extends React.Component {
  render() {
     return( 
        <div>
            <h2> Send Message </h2>
            <form name="send_message" action="/api/groups/create"  method="post">
                <div>
                    <label>Website</label>
                    <input name="website" type="text" value={this.props.data.website} readOnly></input>
                </div>
                <div> 
                    <label>Group Name</label>
                    <input name="group_name"  type="text"  width="400px"></input>
                    <label><font color="red">{this.props.data.err_msg}</font></label>
                </div>
                <div>
                    <label>Percentage of total users</label>
                    <input name="percentage" type="text"></input>
                </div>
                <div>
                    <input type="submit" value="Send"></input>
                </div>
            </form>
            <form action="javascript:history.back()" method="get">
                <button>Back</button>
            </form>
        </div>
    );
  };
}

export default CreateGroupsPage;
