import React, {PropTypes, Component} from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './HomePage.styl';

import backdrop_url from './bg.jpg';

@withStyles(styles)
class HomePage extends Component {
  static childContextTypes = {
    muiTheme: PropTypes.object
  }
  render(){

    let imgStyles = { backgroundImage: `url('${backdrop_url}')` };
    let items = [
      {payload: '1', text: 'Gym'},
      {payload: '2', text: 'Yoga'},
      {payload: '3', text: 'Sports'}
    ];
    return (
      <div className='HomePage'>
        <div className='main-backdrop' style={imgStyles}/>
      </div>
    )
  }
}

export default HomePage;
