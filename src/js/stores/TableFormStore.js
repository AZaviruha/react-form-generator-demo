'use strict';

var I              = require( 'immutable' );
var Marty          = require( 'marty' );
var faker          = require('faker');
var TableConstants = require( '../constants/TableFormConstants' );

var ROWS_NUMBER   = 100;

module.exports = Marty.createStore({
    id: 'TableFormStore',
    
    handlers: {
        changePage : TableConstants.CHANGE_TABLE_PAGE,
        editRow    : TableConstants.EDIT_TABLE_ROW
    },
    
    
    getInitialState: function () { 
        var PAGE_SIZE = 10;
        return I.Map({
            paging: I.Map({
                total   : Math.ceil( this.__rows.count() / PAGE_SIZE ),
                current : 0,
                size    : PAGE_SIZE
            }),
            
            isVisible: true
        }); 
    },


    /* ====================================================== */
    /* ====================== ACTIONS ====================== */
    /* ====================================================== */
    changePage: function ( pageNum ) {
        var oldPaging = this.state.get( 'paging' );
        var newPaging = oldPaging.set( 'current', pageNum );

        this.state = this.state.set( 'paging', newPaging );
        this.hasChanged();
    },
    

    editRow: function ( row ) {
        this.state = this.state.set( 'isVisible', false );
        this.hasChanged();
    },

    /* ====================================================== */
    /* ====================== GETTERS ======================= */
    /* ====================================================== */

    getRows: function () {
        var paging = this.getPaging();
        var start  = paging.get( 'current' ) * paging.get( 'size' );
        var end    = start + paging.get( 'size' );
        return this.__rows.slice( start, end );
    },
    
    getPaging: function () {
        return this.state.get( 'paging' );
    },


    /* ====================================================== */
    /* ====================== HELPERS ======================= */
    /* ====================================================== */
    __rows: createRows( ROWS_NUMBER )
});


function createRows ( size ) {
    return I.Range( 0, size ).map(function ( idx ) { 
        return I.Map({
            id     : 'request_' + idx,
            author : faker.name.findName(),
            title  : faker.lorem.sentence()
        });
    });
}


