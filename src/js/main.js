'use strict';

require('es5-shim' );
require('es5-shim/es5-sham' );

window.log = require( 'front-log' );
console.log( '======================================' );
console.log( '===== react-form-generator demo ======' );
console.log( '======================================' );
console.log( 'type "log.setLevel( log.LEVELS.DEBUG );" to see logs' );

var React = require( 'react' );
var App   = require( './components/compiled/App.react' );

React.render(
    <App />,
    document.getElementById( 'app' )
);
