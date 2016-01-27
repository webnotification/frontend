import React, { PropTypes } from 'react';
import styles from './PermissionPage.styl';
import withStyles from '../../../decorators/withStyles';
import request from 'superagent';
import {Link} from 'react-router'
import router from '../../router';


class PermissionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: null };
    };
    
    componentDidMount() {
        request.get('/api/group/list').end(function(err, res){
            console.log(JSON.parse(res.text));
            var data = JSON.parse(res.text);
            this.setState({data:data});
        }.bind(this));
    };

    render() {
        if(this.state.data){
            var group_options = this.state.data.groups.map(function(group){
                return <option value= {group.id} > {group.name}({group.percentage}) </option>;
            });

            return(
                <div>
                    <h2> Send Permission Request </h2>
                    <form name="send_permission_request" action="/dashboard/permission/send"  method="post">
                        <div>
                            <label>Website</label>
                            <input name="website" type="text" value={this.state.data.website} readOnly></input>
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
        }
        return <div>Loading...</div>;
    };
}

export default PermissionPage;
