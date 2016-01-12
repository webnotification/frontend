var React = require('react');
var ReactDOM = require('react-dom');

var Details = React.createClass({
    render: function(){
    
    var group_names = this.props.groups.map(function(group){
        return <li> {group.name} </li>;
    });

    return(
        <div>
            <h3> Website:  {this.props.website} </h3>
            <label>Groups</label>
            <ol>
                {group_names}
            </ol>
            <form action="/profile" method="get">
                <button>Profile</button>
            </form>
        </div>
        );
    }
});


ReactDOM.render(
       <div> 
           <Details website={website} groups={groups}/>
       </div>,
document.getElementById('main'));
