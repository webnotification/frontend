/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import {FlatButton, FontIcon} from 'material-ui';

import {Link} from 'react-router';


import withStyles from '../../../decorators/withStyles';
import styles from './Navigation.styl';

@withStyles(styles)
class Navigation extends React.Component{

  static propTypes = {
    className: PropTypes.string
  };

  render() {
    return (
      <div className={`Navigation ${this.props.className}`}>
        <Link to='register' className='Navigation-Link'> Register </Link>
        <Link to='login' className='Navigation-Link'>
          <FontIcon className="material-icons">home</FontIcon>
        </Link>
      </div>
    );
  };
}

export default Navigation;
