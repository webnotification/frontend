var React = require('react');
var ReactDOM = require('react-dom');

var Details = React.createClass({
    render: function(){
    
    var group_options = groups.map(function(group){
        return <li> {group.name} </li>;
    });

    return(
        <div>
            <h3> Website:  {website} </h3>
            <label>Groups</label>
            <ol>
                {group_options}
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
           <Details />
       </div>,
document.getElementById('main'));
