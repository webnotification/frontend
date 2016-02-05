
class NotificationImage extends React.Component{
    render(){
        return(
            <div>
                <img src={this.props.image} height="70" width="70"></img>
            </div>
        );
    }
}

export default NotificationImage;
