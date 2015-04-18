'use strict';


var React = require( 'react' );
var Marty = require( 'marty' );

var App = React.createClass({displayName: "App",
    render: function() {
        return (
            React.createElement("div", null, "Hello, world")
        );
    }
});


module.exports = App;
