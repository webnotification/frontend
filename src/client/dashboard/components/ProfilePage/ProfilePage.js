import React, {PropTypes} from 'react';
import withStyles from '../../../decorators/withStyles';
import styles from './ProfilePage.styl';


@withStyles(styles)
class ProfilePage extends React.Component {
  static childContextTypes = {
    muiTheme: PropTypes.object
  }
  render(){
    return (
      <div className='ProfilePage'>
        <div className='main-backdrop'>
          <div className="demo-button-wrap">
            <h1>Hello there</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfilePage;
