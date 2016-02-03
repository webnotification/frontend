import React, { PropTypes } from 'react';
import styles from './NotificationPage.styl';
import withStyles from '../../../decorators/withStyles';
import request from 'superagent';
import {Link} from 'react-router'
import router from '../../router';
import {Paper, TextField, RaisedButton, SelectField, MenuItem, DatePicker, TimePicker, Snackbar} from 'material-ui';


class NotificationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { website: "", 
                       groups: [], 
                       selected_group_id: 0,
                       notification_status: "",
                       snackbar_open: false
        };
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
    
    handleStatus(err, res){
        if(!err && JSON.parse(res.text).success === true )
            this.setState({notification_status: 'Notification Sent', snackbar_open: true});
        else
            this.setState({notification_status: 'An error occured while sending Notification', snackbar_open: true});
    };

    handleSend(){
        if(this.refs.title.getValue() === ''){
            this.setState({notification_status: 'Title is mandatory.', snackbar_open: true});
        }
        else{
            request.post('/api/notification/send')
                .set('Content-Type', 'application/json')
                .send({website: this.state.website,
                        group_id: this.state.selected_group_id,
                        title: this.refs.title.getValue(),
                        message: this.refs.message.getValue(),        
                        target_url: 'http://' + this.refs.target_url.getValue(),
                        date: this.refs.notification_date.getDate().toDateString(),
                        time: this.refs.notification_time.getTime().toTimeString()
                })
                .end(this.handleStatus.bind(this));
        }
};
    
    handleRequestClose(){
        this.setState({snackbar_open: false});
    };

    render() {
        return (
            <div>
                <h2> Send Notification </h2>
                <Paper>
                    <div>
                        <label>Website: </label>
                        <label>{this.state.website}</label>
                    </div>
                    <div>
                        <label>Group: </label>
                        <br/>
                        <SelectField value={this.state.selected_group_id} onChange={this.handleChange.bind(this)}>
                            {this.state.groups.map(
                                 group => (<MenuItem key={group.id} value={group.id} primaryText={group.name}> </MenuItem>)
                            )}
                        </SelectField>
                    </div>
                    <TextField ref="title" hintText="Title"/>
                    <br/>
                    <TextField ref="message" hintText="Message"/>
                    <br/>
                    <label>http://</label>
                    <TextField ref="target_url" hintText="Target URL"/>
                    <br/>
                    <DatePicker ref="notification_date" defaultDate={new Date()}/>
                    <TimePicker ref="notification_time" defaultTime={new Date()}/>
                    <RaisedButton label="Send" secondary={true} onMouseDown={this.handleSend.bind(this)}/>
                    <Snackbar
                      open={this.state.snackbar_open}
                      message={this.state.notification_status}
                      autoHideDuration={2000}
                      onRequestClose={this.handleRequestClose.bind(this)}
                    />
                </Paper>
            </div>
        );
    }
}

export default NotificationPage;
