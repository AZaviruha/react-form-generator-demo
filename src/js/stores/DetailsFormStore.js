'use strict';

var I                = require( 'immutable' );
var Marty            = require( 'marty' );
var faker            = require('faker');
// var DetailsConstants = require( '../constants/DetailsFormConstants' );
var TableConstants   = require( '../constants/TableFormConstants' );
var DetailsMeta      = require( '../meta/DetailsForm.json' );


module.exports = Marty.createStore({
    id: 'DetailsFormStore',
    
    handlers: {
        openRequest : TableConstants.EDIT_TABLE_ROW
    },
    
    
    getInitialState: function () { 
        return I.Map({
            formMeta   : I.Map( DetailsMeta ),
            formValue  : I.Map(),
            formErrors : I.Map(),
            isVisible  : false
        }); 
    },


    /* ====================================================== */
    /* ====================== ACTIONS ====================== */
    /* ====================================================== */
    openRequest: function ( request ) {
        log.debug( 'DetailsFormStore.openRequest :: ', request );
        this.state = this.state.set( 'isVisible', true );
        this.state = this.state.set( 'formValue', request );
        this.hasChanged();
    }
    

    /* ====================================================== */
    /* ====================== GETTERS ======================= */
    /* ====================================================== */



    /* ====================================================== */
    /* ====================== HELPERS ======================= */
    /* ====================================================== */
});


