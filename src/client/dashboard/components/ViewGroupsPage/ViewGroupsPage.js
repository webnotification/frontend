import React, { PropTypes } from 'react';
import styles from './ViewGroupsPage.styl';
import withStyles from '../../../decorators/withStyles';
import request from 'superagent';
import {Link} from 'react-router'
import router from '../../router';


class ViewGroupsPage extends React.Component {
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
        var group_names = this.state.data.groups.map(function(group){
            return <li> {group.name} </li>;
        });

        return(
            <div>
                <h3> Website:  {this.state.data.website} </h3>
                <label>Groups</label>
                <ol>
                    {group_names}
                </ol>
                <form action="/dashboard/profile" method="get">
                    <button>Profile</button>
                </form>
            </div>
        );
    }
    return <div>Loading...</div>;
  };
}

export default ViewGroupsPage;
