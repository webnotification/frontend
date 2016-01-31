import React, { PropTypes } from 'react';
import styles from './PermissionPage.styl';
import withStyles from '../../../decorators/withStyles';
import request from 'superagent';
import {Link} from 'react-router'
import router from '../../router';
import {Paper, TextField, RaisedButton, SelectField, MenuItem} from 'material-ui';

@withStyles(styles)
class PermissionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { website: "", groups: [], selected_group_id: 0 };
    };
    
    componentDidMount() {
        request.get('/api/group/list').end(function(err, res){
            var data = JSON.parse(res.text);
            this.setState({website: data.website, groups: data.groups, selected_group_id: data.groups[0].id});
        }.bind(this));
    };
    
    handleChange(event, index, value){
        this.setState({selected_group_id: value}); 
    };

    handleSend(){
        request.post('/api/permission/send')
            .set('Content-Type', 'application/json')
            .send({website: this.state.website, group_id: this.state.selected_group_id})
            .end();
    };

    render() {
        return(
            <div>
                <Paper>
                    <h2> Send Permission Request </h2>
                    <div>
                        <label>Website: </label>
                        <label>{this.state.website}</label>
                    </div>
                    <div>
                        <label>Group: </label>
                        <SelectField value={this.state.selected_group_id} onChange={this.handleChange.bind(this)}>
                            {this.state.groups.map(
                                 group => (<MenuItem key={group.id} value={group.id} primaryText={group.name}> </MenuItem>)
                            )}
                        </SelectField>
                    </div>
                    <div>
                        <RaisedButton label="Send" secondary={true} onMouseDown={this.handleSend.bind(this)}/>
                    </div>
                </Paper>
            </div>
        );
    };
}

export default PermissionPage;
