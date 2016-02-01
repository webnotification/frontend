import React from 'react';
import {LeftNav}   from 'material-ui';
import { Link } from 'react-router';
import {MenuItem, FlatButton}  from  'material-ui';


class Sidebar extends React.Component{
  render(){
    return (
      <LeftNav docked={this.props.isDocked}>
        <FlatButton label="close" onTouchTap={this.props.handleClick} />
        <MenuItem linkButton={true} containerElement={<Link to="/dashboard/permission/send" />} primaryText="Send Permission" />
        <MenuItem linkButton={true} containerElement={<Link to="/dashboard/notification/send" />} primaryText="Send Notification" />
        <MenuItem linkButton={true} containerElement={<Link to="/dashboard/groups/create" />} primaryText="Create Groups" />
        <MenuItem linkButton={true} containerElement={<Link to="/dashboard/groups/view" />} primaryText="View Groups" />
        <MenuItem linkButton={true} containerElement={<Link to="/dashboard/analytics/notification" />} primaryText="Notification Analytics" />
        <MenuItem linkButton={true} containerElement={<Link to="/dashboard/analytics/permission" />} primaryText="Permission Analytics" />
      </LeftNav>
    );
  };
}

export default Sidebar;
