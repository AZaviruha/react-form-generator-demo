'use strict';

var Marty     = require( 'marty' );
var Constants = require( '../constants/DetailsFormConstants' );
var vow       = require( 'vow' );


module.exports = Marty.createActionCreators({
    id: 'DetailsFormActions',


    closeDetails: function ( pageNum ) {
        this.dispatch( Constants.CLOSE_DETAILS );
    },

    
    updateDetails: function ( newVal ) {
        this.dispatch( Constants.UPDATE_DETAILS, newVal );
    },


    handleFormEvent: function ( path, e ) {
        var dfd  = vow.defer();
        var prom = dfd.promise();
        this.dispatch( Constants.HANDLE_FORM_EVENT, 
                       path, e, dfd, prom );
    }
});
