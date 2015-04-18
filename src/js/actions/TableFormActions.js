'use strict';

var Marty = require( 'marty' );
var Constants = require( '../constants/TableFormConstants' );


module.exports = Marty.createActionCreators({
    id: 'TableFormActions',

    changePage: function ( pageNum ) {
        this.dispatch( Constants.CHANGE_TABLE_PAGE, pageNum );
    }
});
