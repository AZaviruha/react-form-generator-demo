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
        Actions.editTableRow( row );
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
        // log.debug( 'TableForm.renderLink  :: ', arguments );
        var self = this;
        return (<Button 
                    onClick={handler}
                    bsStyle="link">{txt}</Button>);
        
        function handler () { self.editRequest( row ); }
    },

    

    render: function () {
        // log.debug( 'TableForm.render :: ', this.props );
        var props  = this.props;
        var paging = props.paging;

        if ( !props.isVisible ) return null;

        return (
            <Row>
                <Col sm={12} xs={12} md={12}>
                    <Button 
                        sm={12} xs={4} md={2}
                        onClick={this.addNewRequest}
                        >New</Button>
                </Col>

                <Col sm={12} xs={12} md={12}>
                    <Table 
                        rowHeight={50} 
                        rowGetter={this.getRow} 
                        rowsCount={this.props.rows.length} 
                        width={600} 
                        height={400} 
                        headerHeight={50}>

                        <Column 
                            label="ID" 
                            width={100} 
                            cellRenderer={this.renderLink}
                            cellDataGetter={this.getCell} 
                            dataKey="id" />

                        <Column 
                            label="Author" 
                            width={200} 
                            cellDataGetter={this.getCell} 
                            dataKey="author" />

                        <Column 
                            label="Title" 
                            width={300} 
                            cellDataGetter={this.getCell} 
                            dataKey="title" />

                    </Table>
                </Col>
                

                <Col xs={12} sm={12} md={12}>
                    <Pager 
                        total={paging.total}
                        current={paging.current}
                        visiblePages={5}
                        onPageChanged={this.changePage} />
                </Col>
            </Row>
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
        },

        isVisible: function () {
            var state = TableFormStore.for( this ).getState();
            return state.get( 'isVisible' );
        }
    }
});
