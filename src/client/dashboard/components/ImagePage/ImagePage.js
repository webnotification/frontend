import React, { PropTypes } from 'react';
import styles from './ImagePage.styl';
import withStyles from '../../../decorators/withStyles';
import request from 'superagent';
import {Link} from 'react-router'
import router from '../../router';
import NotificationImage from './NotificationImage';
import FileSelector from './FileSelector';


//@withStyles(styles)
class ImagePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { image: null };
    };
    
    onImageUpload(){
        request.get('/api/user/me').end(function(err, res){
            var data = JSON.parse(res.text).result;
            var image = data.image + '?q=' + new Date().getTime();
            this.setState({image: image});
        }.bind(this));
    };
    
    componentDidMount() {
        this.onImageUpload();
    };

    render() {
        if(this.state.image){
            return (
              <div className="ImagePage">
                <NotificationImage image={this.state.image}/>
                <br/>
                <FileSelector onImageUpload={this.onImageUpload.bind(this)}/>
              </div>
            );
        }
        return <div>Loading...</div>;
    }
}

export default ImagePage;
