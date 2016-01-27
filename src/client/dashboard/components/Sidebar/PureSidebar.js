import React from 'react';
import {LeftNav}   from 'material-ui';
import { Link } from 'react-router';
import MenuItem  from  'material-ui/lib/menus/menu-item';


class Sidebar extends React.Component{
  render(){
    return (
      <LeftNav docked={this.props.isDocked}>
        <MenuItem linkButton={true} containerElement={<Link to="/dashboard/" />} primaryText="Dashboard" />
        <MenuItem linkButton={true} containerElement={<Link to="/dashboard/analytics" />} primaryText="Analytics" />
        <MenuItem linkButton={true} containerElement={<Link to="/dashboard/profile" />} primaryText="Profile" />
      </LeftNav>
    );
  };
}

export default Sidebar;
