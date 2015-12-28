import React, { Component, PropTypes } from 'react';
import styles from './LoginPage.styl';
import withStyles from '../../decorators/withStyles';
import request from 'superagent';
import {Link} from 'react-router'

import router from '../../router';


import {
  Paper,
  TextField,
  FontIcon,
  RaisedButton,
  CircularProgress,
  FlatButton
} from 'material-ui';

@withStyles(styles)
class LoginPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  state = {
    loading: false,
    error: false
  }

  post_login(err, res){
    this.setState({
      error: err ? err.message : false,
      loading: false
    });

    if (!err){
      router.transitionTo('home', {
        user: res.body.result
      });
    }
  }

  submit_login(){
    this.setState({loading: true});
    request
      .post('/login')
      .accept('json')
      .send({
        email: this.refs.email.getValue(),
        password: this.refs.password.getValue()
      })
      .end(this.post_login.bind(this));
  }

  render() {
    let title = 'Log In';
    this.context.onSetTitle(title);

    let loginButton = (
      this.state.loading
      ? <CircularProgress className='form-loading' mode='indeterminate'/>
      : <RaisedButton ref='submit' className='form-button' label='Submit' secondary={true} onClick={this.submit_login.bind(this)}/>
    );

    let banner = (
      this.state.error
      ? <pre className='form-banner banner-error'> {this.state.error} </pre>
      : null
    );

    return (
      <div className="LoginPage">
        <Paper className="LoginPage-container form-container">
          { banner }
          <TextField ref='email' className='form-field login-email' hintText='Username' floatingLabelText='Your Email'/>
          <TextField ref='password' className='form-field login-password' hintText='Password' floatingLabelText='Password' type='password'/>
          {loginButton}
          <Link className='link-register' to='register'> Register </Link>
        </Paper>
      </div>
    );
  }

}

export default LoginPage;
