'use strict';

window.log    = require( 'front-log' );

var React     = require( 'react' );
var Marty     = require( 'marty' );
var TableForm = require( './TableForm.react' );

var RB        = require( 'react-bootstrap' );
var Grid      = RB.Grid;
var Row       = RB.Row;
var Col       = RB.Col;

module.exports = React.createClass({
    displayName: 'Application',

    render: function() {
        return (
            <Grid>
                <TableForm />
            </Grid>
        );
    }
});
