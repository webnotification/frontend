import React, { PropTypes } from 'react';
import styles from './ProfilePage.styl';
import withStyles from '../../../decorators/withStyles';
import request from 'superagent';
import {Link} from 'react-router'
import router from '../../router';
import Details from './Details';
import NotificationImage from './NotificationImage';
import FileSelector from './FileSelector';


@withStyles(styles)
class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: null };
    };
    
    componentDidMount() {
        request.get('/api/user/me').end(function(err, res){
            console.log(JSON.parse(res.text).result);
            var data = JSON.parse(res.text).result;
            this.setState({data:data});
        }.bind(this));
    };

    render() {
        if(this.state.data){
            return (
              <div className="ProfilePage">
                <Details user={this.state.data.user}/>
                <NotificationImage image={this.state.data.image}/>
                <FileSelector />
              </div>
            );
        }
        return <div>Loading...</div>;
    }
}

export default ProfilePage;
