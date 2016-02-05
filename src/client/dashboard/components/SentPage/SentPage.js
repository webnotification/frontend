import React, { PropTypes } from 'react';
import styles from './SentPage.styl';
import withStyles from '../../../decorators/withStyles';
import request from 'superagent';
import {Link} from 'react-router'
import router from '../../router';
import {RaisedButton} from 'material-ui';

//@withStyles(styles)
class SentPage extends React.Component {
    constructor(props) {
        super(props);
    };
    
    componentDidMount() {
    };

    render() {
        var redirect_button = <div></div>;
        if(this.props.redirect_message)
            var redirect_button = <RaisedButton label={this.props.redirect_message} 
                                                secondary={true} 
                                                onMouseDown={this.props.handleSendAnother}/>;

        return (
          <div className="SentPage">
                <h3>{this.props.info_message}</h3>
                {redirect_button}
          </div>
        );
    }
}

export default SentPage;
