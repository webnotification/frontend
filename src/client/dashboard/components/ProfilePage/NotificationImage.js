
class NotificationImage extends React.Component{
    render(){
        return(
            <div>
                <img src={this.props.image} height="50" width="50"></img>
            </div>
        );
    }
}

export default NotificationImage;
