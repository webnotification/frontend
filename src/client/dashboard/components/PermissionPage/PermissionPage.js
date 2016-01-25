import React, { PropTypes } from 'react';
import styles from './PermissionPage.styl';
import withStyles from '../../../decorators/withStyles';
import request from 'superagent';
import {Link} from 'react-router'
import router from '../../router';


class PermissionPage extends React.Component {
    render() {
        var group_options = this.props.data.groups.map(function(group){
            return <option value= {group.id} > {group.name}({group.percentage}) </option>;
        });

        return(
            <div>
                <h2> Send Permission Request </h2>
                <form name="send_permission_request" action="/dashboard/permission/send"  method="post">
                    <div>
                        <label>Website</label>
                        <input name="website" type="text" value={this.props.data.website} readOnly></input>
                    </div>
                    <div>
                        <label>Group</label>
                        <select name="group_id">
                            {group_options}
                        </select>
                    </div>
                    <div>
                        <input type="submit" value="Send"></input>
                    </div>
                </form>
                <form action="/dashboard/profile" method="get">
                    <button>Profile</button>
                </form>
            </div>
        );
    };
}

export default PermissionPage;
