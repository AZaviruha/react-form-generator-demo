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
var Actions          = require( '../../actions/DetailsFormActions' );



var DetailsForm = React.createClass({
    displayName: 'DetailsForm',
    
    /* ====================================================== */
    /* ====================== ACTIONS ====================== */
    /* ====================================================== */

    updateFormValue: function ( newVal, change, errs ) {
        Actions.updateDetails( newVal, errs );
    },
    

    handleFormEvent: function ( fldName, eName, eVal ) {
        Actions.handleFormEvent( fldName + ':' + eName, eVal );
    },
    
    /* ====================================================== */
    /* ====================== HELPERS ======================= */
    /* ====================================================== */


    /* ====================================================== */
    /* ====================== RENDERERS ===================== */
    /* ====================================================== */
    
    render: function () {
        // log.debug( 'DetailsForm.render :: ', this.props );
        var props = this.props;
        
        if ( !props.isVisible ) return null;

        return (
            <Row>
                <Col sm={12} xs={12} md={12}>
                    <GeneratedForm 
                        meta={props.formMeta}
                        value={props.formValue}
                        errors={props.formErrors}
                        onChange={this.updateFormValue}
                        onEvent={this.handleFormEvent}/>
                </Col>
            </Row>
        );
    }
});


module.exports = Marty.createContainer( DetailsForm, {
    listenTo: DetailsFormStore,

    fetch: {
        formMeta: function () {
            var state = DetailsFormStore.for( this ).getState();
            return state.get( 'formMeta' ).toObject();
        },
        
        formValue: function () {
            var state = DetailsFormStore.for( this ).getState();
            return state.get( 'formValue' ).toJS();
        },
        
        formErrors: function () {
            var state = DetailsFormStore.for( this ).getState();
            return state.get( 'formErrors' ).toJS();
        },

        isVisible: function () {
            var state = DetailsFormStore.for( this ).getState();
            return state.get( 'isVisible' );
        }
    }
});
