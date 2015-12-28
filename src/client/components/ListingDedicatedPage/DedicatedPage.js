import {Component} from 'react';

class DedicatedPage extends Component {
	render(){
		return (
			<div> Setting Stuff for listing {this.props.params.id} </div>
		)
	}
}

export default DedicatedPage;