'use strict';

window.log      = require( 'front-log' );

var React       = require( 'react' );
var Marty       = require( 'marty' );
var TableForm   = require( './TableForm.react' );
var DetailsForm = require( './DetailsForm.react' );

var RB          = require( 'react-bootstrap' );
var Grid        = RB.Grid;
var Row         = RB.Row;
var Col         = RB.Col;

module.exports = React.createClass({
    displayName: 'Application',

    render: function() {
        return (
            <Grid>
                <Row>
                    <Col sm={12} xs={12} md={12}
                         className="demo-header">
                        <h3>react-form-generator demo</h3>
                    </Col>
                </Row>

                <TableForm />

                <DetailsForm />
            </Grid>
        );
    }
});
