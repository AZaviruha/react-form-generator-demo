'use strict';

var I                = require( 'immutable' );
var Marty            = require( 'marty' );
var faker            = require('faker');
var FormGenerator    = require( 'react-form-generator' );
var t                = FormGenerator.tools;
var GeneratedForm    = FormGenerator({});
var validateForm     = GeneratedForm.validateForm;
var isFormValid      = GeneratedForm.isFormValid;
var DetailsConstants = require( '../constants/DetailsFormConstants' );
var TableConstants   = require( '../constants/TableFormConstants' );
var DetailsMeta      = require( '../meta/DetailsForm.json' );

var SEP = ':';

module.exports = Marty.createStore({
    id: 'DetailsFormStore',
    
    handlers: {
        addRow          : TableConstants.ADD_TABLE_ROW,
        editRow         : TableConstants.EDIT_TABLE_ROW,
        updateForm      : DetailsConstants.UPDATE_DETAILS,
        handleFormEvent : DetailsConstants.HANDLE_FORM_EVENT
    },
    
    
    /* ====================================================== */
    /* ====================== GETTERS ======================= */
    /* ====================================================== */

    getInitialState: function () { 
        this.__route = t.buildRouter(
            'btnCancel:click', [ closeForm ],
            'btnSave:click',   [ saveForm ]
        );
        
        var formValue = t.evalDefaults( DetailsMeta );

        return I.fromJS({
            formMeta   : DetailsMeta,
            formValue  : formValue,
            formErrors : {},
            isVisible  : false
        }); 
        

        function closeForm ( dfd ) {
            log.debug( 'DataFormStore.closeForm :: ', dfd );
            this.state = this.state.set( 'isVisible', false );
            dfd.resolve( null );
        }


        function saveForm ( dfd ) {
            var s          = this.state;
            var formValue  = s.get( 'formValue' ).toJS();
            var formMeta   = s.get( 'formMeta' ).toJS();
            var formErrors = validateForm( formMeta, formValue );

            if ( isFormValid( formErrors ) ) {
                log.debug( 'DataFormStore.saveForm :: isValid' );
                this.state = s.set( 'isVisible', false );
                dfd.resolve( this.state.get( 'formValue' ) );
            }
            else {
                log.debug( 'DataFormStore.saveForm :: !isValid' );
                this.state = s.set( 'formErrors', I.Map( formErrors ) );
                dfd.reject( formErrors );
            }
        }
    },


    /* ====================================================== */
    /* ====================== ACTIONS ====================== */
    /* ====================================================== */

    addRow: function () {
        this.state = this.state
            .set( 'isVisible', true ) 
            .set( 'formValue', I.Map({}) ) 
            .mergeIn([ 'formMeta', 'fields', 'id' ], 
                     { isHidden: true });

        log.debug( 'DetailsFormStore.addRow :: ', 
                   this.state.toJS() );
        this.hasChanged();
    },


    editRow: function ( request ) {
        log.debug( 'DetailsFormStore.editRow :: ', request );

        this.state = this.state
            .set( 'isVisible', true ) 
            .set( 'formValue', request )
            .mergeIn([ 'formMeta', 'fields', 'id' ], 
                     { isHidden: false });
        this.hasChanged();
    },

    
    updateForm: function ( newFormValue, errs ) {
        log.debug( 'DetailsFormStore.updateForm :: ', errs );

        var s = this.state;
        this.state = s.set( 'formValue' , I.fromJS( newFormValue ) ) 
                      .set( 'formErrors', I.fromJS( errs ) );
        this.hasChanged();
    },


    handleFormEvent: function ( path, e, dfd, prom ) {
        log.debug( 'DetailsFormStore.handleFormEvent :: ', path );
        this.__route.call( this, path, dfd, path );
        this.hasChanged();
    }
    

    /* ====================================================== */
    /* ====================== HELPERS ======================= */
    /* ====================================================== */
    
});


