'use strict';

var I              = require( 'immutable' );
var Marty          = require( 'marty' );
var faker          = require('faker');
var TableConstants = require( '../constants/TableFormConstants' );

var ROWS_NUMBER   = 100;

module.exports = Marty.createStore({
    id: 'TableFormStore',
    
    handlers: {
        changePage: TableConstants.CHANGE_TABLE_PAGE
    },
    
    
    getInitialState: function () { 
        var PAGE_SIZE = 10;
        return I.Map({
            paging: I.Map({
                total   : Math.ceil( this.__rows.count() / PAGE_SIZE ),
                current : 0,
                size    : PAGE_SIZE
            })
        }); 
    },


    /* ====================================================== */
    /* ====================== ACTIONS ====================== */
    /* ====================================================== */
    changePage: function ( pageNum ) {
        var paging = this.state.get( 'paging' );
        this.state = this.state.set( 
            'paging', paging.set( 'current', pageNum ) );

        // this.state.paging.current = pageNum;
        
        this.hasChanged();
    },
    

    /* ====================================================== */
    /* ====================== GETTERS ======================= */
    /* ====================================================== */

    getRows: function () {
        log.debug( 'TableFormStore.getRows' );

        var paging = this.getPaging();
        var start  = paging.get( 'current' ) * paging.get( 'size' );
        log.debug( 'TableFormStore.getRows :: start ', start );
        var end    = start + paging.get( 'size' );
        log.debug( 'TableFormStore.getRows :: size ', paging.get( 'size' ) );
        log.debug( 'TableFormStore.getRows :: end ', end );
        return this.__rows.slice( start, end );
    },
    
    getPaging: function () {
        log.debug( 'TableFormStore.getPaging :: ', 
                   this.state.get( 'paging' ) );

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


