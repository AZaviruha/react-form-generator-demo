'use strict';

var Marty = require( 'marty' );
var Constants = require( '../constants/TableFormConstants' );


module.exports = Marty.createActionCreators({
    id: 'TableFormActions',

    changePage: function ( pageNum ) {
        this.dispatch( Constants.CHANGE_TABLE_PAGE, pageNum );
    },

    addTableRow: function () {
        this.dispatch( Constants.ADD_TABLE_ROW );
    },

    editTableRow: function ( row ) {
        this.dispatch( Constants.EDIT_TABLE_ROW, row );
    }
});
