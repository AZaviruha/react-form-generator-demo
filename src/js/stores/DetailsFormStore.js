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
        openForm        : TableConstants.EDIT_TABLE_ROW,
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

        return I.Map({
            formMeta   : I.Map( DetailsMeta ),
            formValue  : I.Map( formValue ),
            formErrors : I.Map(),
            isVisible  : false
        }); 
        

        function closeForm ( dfd ) {
            log.debug( 'DataFormStore.closeForm :: ', dfd );
            this.state = this.state.set( 'isVisible', false );
            dfd.resolve( null );
        }

        function saveForm ( dfd ) {
            var formValue  = this.state.get( 'formValue' ).toObject();
            var formMeta   = this.state.get( 'formMeta' ).toObject();
            var formErrors = validateForm( formMeta, formValue );
            var s          = this.state;

            if ( isFormValid( formErrors ) ) {
                this.state = s.set( 'isVisible', false );
                dfd.resolve( formValue );
            }
            else {
                this.state = s.set( 'formErrors', I.Map( formErrors ) );
                dfd.reject( formErrors );
            }
            
            function isFormValid ( formErrors ) {
                return t.reduce(function ( acc, val, key ) {
                    return acc && !(val && val.length);
                }, true, formErrors );
            }

        }
    },


    /* ====================================================== */
    /* ====================== ACTIONS ====================== */
    /* ====================================================== */

    openForm: function ( request ) {
        log.debug( 'DetailsFormStore.openForm :: ', request );
        this.state = this.state.set( 'isVisible', true );
        this.state = this.state.set( 'formValue', request );
        this.hasChanged();
    },

    
    updateForm: function ( newFormValue, errs ) {
        log.debug( 'DetailsFormStore.updateForm :: ', errs );
        var s  = this.state.set( 'formValue', I.Map( newFormValue ) );
        var er = s.get( 'formErrors' ).merge( errs );
        this.state = s.set( 'formErrors', er );
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


