'use strict';

var React            = require( 'react' );
var Marty            = require( 'marty' );

var RB               = require( 'react-bootstrap' );
var Grid             = RB.Grid;
var Row              = RB.Row;
var Col              = RB.Col;
var Button           = RB.Button;

var GeneratedForm    = require( 'react-form-generator' )();
var DetailsFormStore = require( '../../stores/DetailsFormStore' );
// var Actions         = require( '../../actions/DetaisFormActions' );



var DetailsForm = React.createClass({
    displayName: 'DetailsForm',
    
    /* ====================================================== */
    /* ====================== ACTIONS ====================== */
    /* ====================================================== */
    updateFormValue: function ( newValue, change ) {
        log.debug( 'DetailsForm.updateFormValue' );
    },
    
    
    /* ====================================================== */
    /* ====================== HELPERS ======================= */
    /* ====================================================== */


    /* ====================================================== */
    /* ====================== RENDERERS ===================== */
    /* ====================================================== */
    
    render: function () {
        log.debug( 'DetailsForm.render :: ', this.props );
        var props = this.props;
        
        if ( !props.isVisible ) return null;

        return (
            <Row>
                <Col sm={12} xs={12} md={12}>
                    <GeneratedForm 
                        meta={props.formMeta}
                        value={props.formValue}
                        errors={props.formErrors}
                        onChange={this.updateFormValue}/>
                </Col>
            </Row>
        );
    }
});


module.exports = Marty.createContainer( DetailsForm, {
    listenTo: DetailsFormStore,

    fetch: {
        formMeta: function () {
            return DetailsFormStore.for( this ).getState()
                .get( 'formMeta' ).toObject();
        },
        
        formValue: function () {
            return DetailsFormStore
                .for( this )
                .getState()
                .get( 'formValue' )
                .toJS();
        },
        
        formErrors: function () {
            return DetailsFormStore
                .for( this )
                .getState()
                .get( 'formErrors' )
                .toJS();
        },

        isVisible: function () {
            return DetailsFormStore.for( this ).getState()
                .get( 'isVisible' );
        }
    }
});
