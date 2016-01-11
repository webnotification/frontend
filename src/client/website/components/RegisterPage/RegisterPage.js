import React, { PropTypes } from 'react';
import styles from './RegisterPage.styl';
import withStyles from '../../../decorators/withStyles';
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
class RegisterPage extends React.Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  state = {
    loading: false,
    error: false
  };

  post_register(err, res){
    this.setState({
      error: err ? (err.message || res.body.result) : false,
      loading: false
    });

    if (!err){
      router.transitionTo('login');
    }
  };

  submit_register(){
    this.setState({loading: true});
    request
      .post('/register')
      .accept('json')
      .send({
        name : this.refs.name.getValue(),
        company: this.refs.company.getValue(),
        email: this.refs.email.getValue(),
        website: this.refs.website.getValue(),
        password: this.refs.password.getValue()
      })
      .end(this.post_register.bind(this));
  };

  render() {
    let title = 'Log In';
    this.context.onSetTitle(title);

    let registerButton = (
      this.state.loading
      ? <CircularProgress className='form-loading' mode='indeterminate'/>
      : <RaisedButton ref='submit' className='form-button' label='Submit' secondary={true} onClick={this.submit_register.bind(this)}/>
    );

    let banner = (
      this.state.error
      ? <pre className='form-banner banner-error'> {this.state.error} </pre>
      : null
    );

    return (
      <div className="RegisterPage">
        <Paper className="RegisterPage-container form-container">
          { banner }
          <TextField ref='name' className='form-field login-name' hintText='Fullname'/>
          <TextField ref='company' className='form-field login-company' hintText='Company'/>
          <TextField ref='email'    className='form-field login-email'    hintText='Email' />
          <TextField ref='website'    className='form-field login-website'    hintText='Website' />
          <TextField ref='password' className='form-field login-password' hintText='Password' type='password'/>
          {registerButton}
          <Link className='link-register' to='register'> Register </Link>
        </Paper>
      </div>
    );
  };

}

export default RegisterPage;
