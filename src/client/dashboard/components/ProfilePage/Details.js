
class Details extends React.Component{
    render(){
            var user = this.props.user;
            return (
                    <div>
                        <h2> Profile </h2>
                        <h5><strong>username</strong>: {user.username}</h5>
                        <h5><strong>website</strong>: {user.website} </h5>
                        <h4><a href="/dashboard/permission/send"> send permission request </a></h4>
                        <h4><a href="/dashboard/notification/send"> send notification </a></h4>
                        <h4><a href="/dashboard/groups/create"> create group</a></h4>
                        <h4><a href="/dashboard/groups/view"> view groups</a></h4>
                        <h4><a href="/dashboard/analytics/notification"> notification analytics</a></h4>
                        <h4><a href="/dashboard/analytics/permission"> permission analytics</a></h4>
                    </div>
            );
    };
}


export default Details;
