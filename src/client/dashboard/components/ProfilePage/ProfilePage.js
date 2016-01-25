import React, { PropTypes } from 'react';
import styles from './ProfilePage.styl';
import withStyles from '../../../decorators/withStyles';
import request from 'superagent';
import {Link} from 'react-router'
import router from '../../router';


class NotificationImage extends React.Component{
    render(){
    return(
            <div>
                <img src={this.props.image}></img>
            </div>
            );
    }
}

class FileSelector extends React.Component{
    render(){
        return(
                <div>
                    <div>
                        <label>Upload Image</label>
                    </div>
                    <div>
                        <label><font color="red">{this.props.err_msg}</font></label>
                    </div>
                    <form id="uploadForm"
                          encType="multipart/form-data"
                          action="/dashboard/image/upload"
                          method="post">
                      <input type="file" name="userPhoto"></input>
                      <input type="submit" value="Upload Image" name="submit" ></input>
                      <span id = "status"></span>
                    </form>
                </div>
            );
    }
}

class Details extends React.Component{
    render(){
    var user = this.props.user;
    return (
            <div>
                <h2> Profile </h2>
                <h5><strong>username</strong>: {user.username}</h5>
                <h5><strong>website</strong>: {user.website} </h5>
                <h4><a href="/dashboard/permission/send"> send permission request </a></h4>
                <h4><a href="/dashboard/notification/send"> send notification </a></h4>
                <h4><a href="/dashboard/groups/create"> create group</a></h4>
                <h4><a href="/dashboard/groups/view"> view groups</a></h4>
                <h4><a href="/dashboard/analytics/notification"> notification analytics</a></h4>
                <h4><a href="/dashboard/analytics/permission"> permission analytics</a></h4>
                <h4><a href="/logout">logout</a></h4>
            </div>
        );
    }
}

class ProfilePage extends React.Component {
  render() {
    return (
      <div className="ProfilePage">
        <Details user={this.props.data.user} />
        <NotificationImage image={this.props.data.image} />
        <FileSelector err_msg={this.props.data.err_msg} />
      </div>
    );
  };
}

export default ProfilePage;
