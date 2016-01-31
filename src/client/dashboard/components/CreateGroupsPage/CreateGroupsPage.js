import React, { PropTypes } from 'react';
import styles from './CreateGroupsPage.styl';
import withStyles from '../../../decorators/withStyles';
import request from 'superagent';
import {Link} from 'react-router'
import router from '../../router';
import {Paper, TextField, RaisedButton, SelectField, MenuItem} from 'material-ui';


@withStyles(styles)
class CreateGroupsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { website: "" };
    };
    
    componentDidMount() {
        request.get('/api/user/me').end(function(err, res){
            var data = JSON.parse(res.text).result.user;
            this.setState({website: data.website});
        }.bind(this));
    };
    
    handleSend(){
        request.post('/api/group/create')
            .set('Content-Type', 'application/json')
            .send({ website: this.state.website, 
                    group_name: this.refs.group_name.getValue(), 
                    percentage: this.refs.percentage.getValue()
            })
            .end();
    };

    render() {
        if(true){
            return( 
                <div>
                    <Paper>
                        <h2> Create Group </h2>
                        <label>Website: {this.state.website}</label>
                        <br/>
                        <TextField ref="group_name" hintText="Group Name" />
                        <br/>
                        <TextField ref="percentage" hintText="Percentage" />
                        <br/>
                        <RaisedButton label="Send" secondary={true} onMouseDown={this.handleSend.bind(this)}/>
                    </Paper>
                </div>
            );
        }
        return <div>Loading...</div>;
  };
}

export default CreateGroupsPage;
