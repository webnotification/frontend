import React, { PropTypes } from 'react';
import styles from './NotificationPage.styl';
import withStyles from '../../../decorators/withStyles';
import request from 'superagent';
import {Link} from 'react-router'
import router from '../../router';


class NotificationPage extends React.Component {
  render() {
    var group_options = this.props.data.groups.map(function(group){
        return <option value= {group.id} > {group.name}({group.percentage}) </option>;
    });
    
    return (
    <div>
        <h2> Send Message </h2>
        <form name="send_message" action="/api/notification/send"  method="post">
            <div>
                <label>Website</label>
                <input name="website" type="text" value={this.props.data.website}></input>
            </div>
            <div>
                <label>Group</label>
                <select name="group_id">{group_options}</select> 
            </div>
            <div> 
                <label>Title</label>
                <input name="title"  type="text"  width="400px"></input>
            </div>
            <div>
                <label>Message</label>
                <textarea name="message" type="description"></textarea>
            </div>
            <div>
                <label>Target URL</label>
                <input name="target_url" type="text"></input>
            </div>
            <div>
                <label>Date</label>
                <input type="date" name="date"></input>
            </div>
            <div>
                <label>Time</label>
                <input type="time" name="time"></input>
            </div>
            <div>
                <input type="submit" value="Send"></input>
            </div>
        </form>
        <form action="javascript:history.back()" method="get">
            <button>Back</button>
        </form>
    </div>
    )
  };
}

export default NotificationPage;
