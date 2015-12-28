import React, {PropTypes, Component} from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './HomePage.styl';

import backdrop_url from './backdrop.jpg';

import { DropDownMenu, TextField, FontIcon, RaisedButton } from 'material-ui';

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
        <div className='search-wrap'>
          <div className='search-inner'>
            <DropDownMenu
              className='search-dropdown'
              menuItems={items}/>
            <TextField
              className='search-text'
              hintText="Location"
              floatingLabelText="Search a Location"/>
            <RaisedButton
              className='search-button'
              label='Search' labelPosition='after'>
              <FontIcon className="material-icons">search</FontIcon>
            </RaisedButton>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage;