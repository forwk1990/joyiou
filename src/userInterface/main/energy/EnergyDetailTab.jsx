import React from 'react'
import './EnergyDetailTab.scss'
import {connect} from 'react-redux'
import {Icon} from 'antd'
const {Table, Column, Cell} = require('fixed-data-table')
import HttpChannel from '../../../channel'


class EnergyDetailTab extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [],
            uniqueId: Math.random(),
            tableWidth: 1120,
            tableHeight: 300,
            columnsWidth: new Array(props.columnKeyValues.length),
            columnKeyValues: props.columnKeyValues,
            loading: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isFold != this.props.isFold) {
            this._setTableLayout(nextProps.isFold)
        }
    }

    componentDidMount() {
        this._setTableLayout()
        this._getItems()
    }

    _setTableLayout(isFold) {
        const self = this
        let tableWidth = $(window).width() - 200 - 131 - 20
        if (isFold) {
            tableWidth = tableWidth + 150
        }
        const tableHeight = $(document.getElementById(this.state.uniqueId)).height()
        const divideCount = self.state.columnKeyValues.length;

        self.setState({
            tableWidth: tableWidth,
            tableHeight: tableHeight,
            columnsWidth: [tableWidth / divideCount, tableWidth / divideCount, tableWidth / divideCount]
        })
    }

    _getItems() {
        const self = this
        this.setState({loading: true})
        HttpChannel.sendRequest(self.props.action, self.props.parameters).then(function (responseEnergyItems) {
            self.setState({items: responseEnergyItems, loading: false})
        }, function () {
            self.setState({loading: false})
        })
    }

    render() {
        const self = this
        return this.state.loading ? (<div className="energy-detail-tab-loading"><Icon type="loading"/><span>数据加载中...</span></div>) : (
                <div className="energy-detail-tab" id={this.state.uniqueId}>
                    {
                        this.state.items.length > 0 ? (
                                <Table
                                    rowsCount={this.state.items.length}
                                    rowHeight={35}
                                    isColumnResizing={false}
                                    headerHeight={35}
                                    allowCellsRecycling={true}
                                    width={this.state.tableWidth}
                                    height={this.state.tableHeight}>
                                    {
                                        this.state.columnKeyValues.map(function (columnKeyValue, index) {
                                            console.log('column key value : ', columnKeyValue, 'index:', index)
                                            return (
                                                <Column
                                                    header={<Cell>{columnKeyValue.label}</Cell>}
                                                    align="center"
                                                    columnKey='range'
                                                    key={columnKeyValue.name}
                                                    isResizable={true}
                                                    cell={props => (
                                                        <Cell {...props}>
                                                            {self.state.items[props.rowIndex][columnKeyValue.name]}
                                                        </Cell>
                                                    )}
                                                    width={self.state.columnsWidth[index]}
                                                />
                                            )
                                        })
                                    }
                                </Table>
                            ) : (<div className="energy-detail-tab-nothing"><span>暂无数据</span></div>)
                    }
                </div>
            )
    }

}


const mapStateToProps = (state) => {
    return {
        isFold: state.application.isFold
    }
}

export default connect(mapStateToProps)(EnergyDetailTab)