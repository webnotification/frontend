import React from 'react';
import PureSidebar from './PureSidebar';

class Sidebar extends React.Component {
	render() {
        if(this.props.state === "visible")
        {
            return (
                <PureSidebar handleClick={this.props.handleClick}/>
            );
        }
        return <div></div>;
	}
}

export default Sidebar;
