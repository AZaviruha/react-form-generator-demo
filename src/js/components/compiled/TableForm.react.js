'use strict';

var React          = require( 'react' );
var Marty          = require( 'marty' );

var RB             = require( 'react-bootstrap' );
var Grid           = RB.Grid;
var Row            = RB.Row;
var Col            = RB.Col;
var Button         = RB.Button;

Object.assign = Object.assign || require( 'object-assign' );
var FixedDataTable = require( 'fixed-data-table' );
var Table          = FixedDataTable.Table;
var Column         = FixedDataTable.Column;
var Pager          = require( 'react-pager' );

var TableFormStore = require( '../../stores/TableFormStore' );
var Actions        = require( '../../actions/TableFormActions' );



var TableForm = React.createClass({
    displayName: 'TableForm',
    
    /* ====================================================== */
    /* ====================== ACTIONS ====================== */
    /* ====================================================== */
    addNewRequest: function () {
        log.debug( 'TableForm.addNewRequest' );
    },
    

    editRequest: function ( row ) {
        log.debug( 'TableForm.editRequest :: ', row.toJS() );
    },
    

    changePage: function ( newPage ) {
        log.debug( 'TableForm.changePage :: ', newPage );
        Actions.changePage( newPage );
    },
    
    
    /* ====================================================== */
    /* ====================== HELPERS ======================= */
    /* ====================================================== */
    getRow: function ( idx ) {
        return this.props.rows[ idx ];
    },
    
    getCell: function ( cellId, row ) {
        return row.get( cellId );
    },


    /* ====================================================== */
    /* ====================== RENDERERS ===================== */
    /* ====================================================== */
    
    renderLink: function ( txt, cell, row ) {
        log.debug( 'TableForm.renderLink  :: ', arguments );
        var self = this;
        return (React.createElement(Button, {
                    onClick: handler, 
                    bsStyle: "link"}, txt));
        
        function handler () { self.editRequest( row ); }
    },

    

    render: function () {
        log.debug( 'TableForm.render :: ', this.props );
        var props  = this.props;
        var paging = props.paging;

        return (
            React.createElement(Row, null, 
                React.createElement(Col, {sm: 12, xs: 12, md: 12}, 
                    React.createElement("h3", null, "react-form-generator demo")
                ), 
                React.createElement(Col, {sm: 12, xs: 12, md: 12}, 
                    React.createElement(Button, {
                        sm: 12, xs: 4, md: 2, 
                        onClick: this.addNewRequest
                        }, "New")
                ), 

                React.createElement(Col, {sm: 12, xs: 12, md: 12}, 
                    React.createElement(Table, {
                        rowHeight: 50, 
                        rowGetter: this.getRow, 
                        rowsCount: this.props.rows.length, 
                        width: 600, 
                        height: 400, 
                        headerHeight: 50}, 

                        React.createElement(Column, {
                            label: "ID", 
                            width: 100, 
                            cellRenderer: this.renderLink, 
                            cellDataGetter: this.getCell, 
                            dataKey: "id"}), 

                        React.createElement(Column, {
                            label: "Author", 
                            width: 200, 
                            cellDataGetter: this.getCell, 
                            dataKey: "author"}), 

                        React.createElement(Column, {
                            label: "Title", 
                            width: 300, 
                            cellDataGetter: this.getCell, 
                            dataKey: "title"})

                    )
                ), 
                

                React.createElement(Col, {xs: 12, sm: 12, md: 12}, 
                    React.createElement(Pager, {
                        total: paging.total, 
                        current: paging.current, 
                        visiblePages: 5, 
                        onPageChanged: this.changePage})
                )
            )
        );
    }
});


module.exports = Marty.createContainer( TableForm, {
    listenTo: TableFormStore,

    fetch: {
        rows: function () {
            return TableFormStore.for( this ).getRows().toArray();
        },
        
        paging: function () {
            return TableFormStore.for( this ).getPaging().toObject();
        }
    }
});
