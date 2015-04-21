'use strict';

var I                = require( 'immutable' );
var Marty            = require( 'marty' );
var faker            = require('faker');
var FormGenerator    = require( 'react-form-generator' );
var t                = FormGenerator.tools;
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
    
    
    getInitialState: function () { 
        this.__route = t.buildRouter(
            'btnCancel:click', [ closeForm ],
            'btnSave:click',   [ saveForm ],
            /.+:blur/,         [ validateForm ]
        );
        
        var formValue = t.evalDefaults( DetailsMeta );

        return I.Map({
            formMeta    : I.Map( DetailsMeta ),
            formValue   : I.Map( formValue ),
            formErrors  : I.Map(),
            isVisible   : false,
            lastChanged : null
        }); 
        

        function closeForm ( dfd ) {
            log.debug( 'DataFormStore.closeForm :: ', dfd );
            this.state = this.state.set( 'isVisible', false );
            dfd.resolve( null );
        }

        function saveForm ( dfd ) {
            var formValue = this.state.get( 'formValue' );
            log.debug( 'DataFormStore.updateRow :: ', formValue );
            this.state = this.state.set( 'isVisible', false );
            dfd.resolve( formValue );
        }
        
        function validateForm ( __, path ) {
            log.debug( '-------------- ', arguments );
            var fieldName   = path.split( SEP )[0];
            var formValue   = this.state.get( 'formValue' );
            var formErrors  = this.state.get( 'formErrors' );
            var lastChanged = this.state.get( 'lastChanged' );
            
            log.debug( 'DataFormStore.validateForm :: fieldName ::',
                       fieldName );
            log.debug( 'DataFormStore.validateForm :: lastChanged ::',
                       lastChanged );
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

    
    updateForm: function ( newFormValue, path ) {
        log.debug( 'DetailsFormStore.updateForm :: ', path );
        var st = this.state;
        this.state = st.set( 'formValue', I.Map( newFormValue ) )
                       .set( 'lastChanged', path );
        this.hasChanged();
    },


    handleFormEvent: function ( path, e, dfd, prom ) {
        log.debug( 'DetailsFormStore.handleFormEvent :: ', path );
        this.__route.call( this, path, dfd, path );
        this.hasChanged();
    }
    

    /* ====================================================== */
    /* ====================== GETTERS ======================= */
    /* ====================================================== */



    /* ====================================================== */
    /* ====================== HELPERS ======================= */
    /* ====================================================== */
    
});


