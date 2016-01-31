import {Link} from 'react-router'

class Details extends React.Component{
    render(){
            var user = this.props.user;
            return (
                    <div>
                        <h2> Profile </h2>
                        <h5><strong>username</strong>: {user.username}</h5>
                        <h5><strong>website</strong>: {user.website} </h5>
                        <h4><Link to="/dashboard/permission/send"> send permission request </Link></h4>
                        <h4><Link to="/dashboard/notification/send"> send notification </Link></h4>
                        <h4><Link to="/dashboard/groups/create"> create group</Link></h4>
                        <h4><Link to="/dashboard/groups/view"> view groups</Link></h4>
                        <h4><Link to="/dashboard/analytics/notification"> notification analytics</Link></h4>
                        <h4><Link to="/dashboard/analytics/permission"> permission analytics</Link></h4>
                    </div>
            );
    };
}


export default Details;
