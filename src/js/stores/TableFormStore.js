'use strict';

var I                = require( 'immutable' );
var Marty            = require( 'marty' );
var faker            = require('faker');
var FormGenerator    = require( 'react-form-generator' );
var t                = FormGenerator.tools;
var TableConstants   = require( '../constants/TableFormConstants' );
var DetailsConstants = require( '../constants/DetailsFormConstants' );
// var DetailsFormStore = require( './DetailsFormStore' );

var ROWS_NUMBER   = 100;

module.exports = Marty.createStore({
    id: 'TableFormStore',
    
    handlers: {
        changePage      : TableConstants.CHANGE_TABLE_PAGE,
        editRow         : TableConstants.EDIT_TABLE_ROW,
        handleFormEvent : DetailsConstants.HANDLE_FORM_EVENT
    },
    
    
    getInitialState: function () { 
        var PAGE_SIZE = 10;

        this.__route = t.buildRouter(
            'btnCancel:click', [ openForm ],
            'btnSave:click',   [ openForm ]
        );

        return I.Map({
            paging: I.Map({
                total   : Math.ceil( this.__rows.count() / PAGE_SIZE ),
                current : 0,
                size    : PAGE_SIZE
            }),
            
            isVisible: true
        }); 
        

        function openForm ( prom ) {
            var self = this;

            prom.then(function ( val ) {
                if ( val ) {
                    var idx = self.__rows.findIndex(function ( el ) {
                        return el.get( 'id' ) === val.get( 'id' );
                    });
                    self.__rows = self.__rows.splice( idx, 1, val );
                }
                
                self.state = self.state.set( 'isVisible', true );

                /* Well, it's a kind of workaround
                   I'm working on this */
                self.action = null;

                self.hasChanged();
            });
        }
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
    

    handleFormEvent: function ( path, e, __, prom ) {
        // log.debug( 'TableFormStore.handleFormEvent :: ', prom );
        // this.waitFor( DetailsFormStore );
        this.__route.call( this, path, prom );
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
    }).toList();
}


