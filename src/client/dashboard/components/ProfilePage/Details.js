import {Link} from 'react-router'

class Details extends React.Component{
    render(){
            var user = this.props.user;
            return (
                    <div>
                        <h2> Profile </h2>
                        <h5><strong>username</strong>: {user.username}</h5>
                        <h5><strong>website</strong>: {user.website} </h5>
                    </div>
            );
    };
}


export default Details;
