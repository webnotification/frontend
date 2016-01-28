import React, { PropTypes } from 'react';
import styles from './CreateGroupsPage.styl';
import withStyles from '../../../decorators/withStyles';
import request from 'superagent';
import {Link} from 'react-router'
import router from '../../router';


class CreateGroupsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: null };
    };
    
    componentDidMount() {
        request.get('/api/user/me').end(function(err, res){
            var data = JSON.parse(res.text).result.user;
            this.setState({data:data});
        }.bind(this));
    };

    render() {
        if(this.state.data){
            return( 
                <div>
                    <h2> Send Message </h2>
                    <form name="send_message" action="/api/group/create"  method="post">
                        <div>
                            <label>Website</label>
                            <input name="website" type="text" value={this.state.data.website} readOnly></input>
                        </div>
                        <div> 
                            <label>Group Name</label>
                            <input name="group_name"  type="text"  width="400px"></input>
                            <label><font color="red">{this.state.data.err_msg}</font></label>
                        </div>
                        <div>
                            <label>Percentage of total users</label>
                            <input name="percentage" type="text"></input>
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

export default CreateGroupsPage;
