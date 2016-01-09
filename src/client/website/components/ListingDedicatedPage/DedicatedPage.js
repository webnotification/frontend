import React from 'react';

class DedicatedPage extends React.Component {
	render(){
		return (
			<div> Setting Stuff for listing {this.props.params.id} </div>
		)
	}
}

export default DedicatedPage;