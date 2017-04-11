import React from 'react'
import Pager from '../common/Pager'
import {connect} from 'react-redux'
import './OfflineActivityDetail.scss'
import NavigationBar from '../common/NavigationBar'
import {Input, Icon, Radio} from 'antd'
import BoolTextCell from '../common/BoolTextCell'
import Loading from '../common/Loading'
import address from '../../../channel/address'
import HttpChannel from '../../../channel'
import OrderCell from '../common/OrderCell'
const {Table, Column, Cell} = require('fixed-data-table')
const RadioGroup = Radio.Group;

class OfflineActivityDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [],
            tableWidth: 1120,
            tableHeight: 300,
            totalPages: 0,
            currentPage: 1,
            pageSize: 25,
            loading: false,
            columnsWidth: [50, 50, 50, 50, 50, 50, 50, 50, 50]
        }
        this.searchKey = ''
        this.pageSize = 25
        this.ascendingKey = ''
        this.descendingKey = ''
        this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isFold != this.props.isFold) {
            this._setTableLayout(nextProps.isFold)
        }
    }

    componentDidMount() {
        this._setTableLayout()
        this._searchItemsWithPageIndex(1)
    }

    _setTableLayout(isFold) {
        const self = this
        let tableWidth = window.screen.width - 200 - 70
        if (isFold) {
            tableWidth = tableWidth + 150
        }
        const tableHeight = $('.offlineActivityDetail-content-table').height()
        const columnsWidth = [
            tableWidth * 55 / 1120, /*索引*/
            tableWidth * (150 - 55) / 1120, /*姓名*/
            tableWidth * (270 - 150) / 1120, /*电话*/
            tableWidth * (410 - 270) / 1120, /*预先意向*/
            tableWidth * (540 - 410) / 1120, /*签到状态*/
            tableWidth * (630 - 540) / 1120, /*年龄*/
            tableWidth * (710 - 630) / 1120, /*性别*/
            tableWidth * (845 - 710) / 1120, /*微信号*/
            tableWidth * (1120 - 845) / 1120 /*地址*/
        ]
        self.setState({
            tableWidth: tableWidth,
            tableHeight: tableHeight,
            columnsWidth: columnsWidth
        })
    }

    _searchItemsWithPageIndex(pageIndex) {
        const self = this
        pageIndex = pageIndex || this.state.currentPage
        self.setState({loading: true})
        HttpChannel.offlineActivityDetail({
            id: self.props.model.id,
            pageSize: self.pageSize,
            pageIndex: (pageIndex - 1),
            ascendingKey: this.ascendingKey,
            descendingKey: this.descendingKey,
            searchKey: self.searchKey
        }).then(function (searchResult) {
            self.setState({
                loading: false,
                totalPages: searchResult.totalPages,
                items: searchResult.items
            })
        })
    }

    _onColumnResizeEndCallback(newColumnWidth, columnKey) {
        this.setState(({columnWidths}) => ({
            columnsWidth: {
                ...columnWidths,
                [columnKey]: newColumnWidth,
            }
        }))
    }

    handleSearchEvent(e) {
        this.searchKey = e.target.value
        this._searchItemsWithPageIndex()
    }

    handlePageSizeChangeEvent(event) {
        this.pageSize = event.target.value
        this.setState({pageSize: event.target.value, currentPage: 1}, () => this._searchItemsWithPageIndex())
    }

    handleOrderClick(columnName, direction) {
        if (direction == 1) {
            this.ascendingKey = columnName
            this.descendingKey = ''
        } else if (direction == -1) {
            this.ascendingKey = ''
            this.descendingKey = columnName
        } else {
            this.ascendingKey = ''
            this.descendingKey = ''
        }
        this._searchItemsWithPageIndex()
    }

    _initializeDirections() {
        let directions = ['willCome', 'signed']
        for (var i = 0; i < directions.length; i++) {
            if (directions[i] === this.ascendingKey) {
                directions[i] = 1
            } else if (directions[i] === this.descendingKey) {
                directions[i] = -1
            } else {
                directions[i] = 0
            }
        }
        return directions
    }

    render() {
        const {closeEventHandler, model} = this.props
        const title = model.limits > 0 ? `${model.title} 报名详情 (${model.enrolls}/${model.limits})` : `${model.title} 报名详情`
        const directions = this._initializeDirections()
        return (
            <div className="offlineActivityDetail">
                {this.state.loading && (<Loading/>)}
                <div className="offlineActivityDetail-bar">
                    <NavigationBar parentTitles={['线下活动项']}
                                   title={title}
                                   closeEventHandler={closeEventHandler}
                                   buttons={[
                                       {"title": "导出", "eventHandler": () => this.handleExportExcelEvent()}
                                   ]}/>
                </div>
                <div className="offlineActivityDetail-content">
                    <div className="offlineActivityDetail-content-top">
                        <div className="offlineActivityDetail-content-top-left">
                            <span>单页显示行数</span>
                            <RadioGroup onChange={(event) => this.handlePageSizeChangeEvent(event)}
                                        value={this.state.pageSize}>
                                <Radio value={25}>25行</Radio>
                                <Radio value={50}>50行</Radio>
                                <Radio value={100}>100行</Radio>
                            </RadioGroup>
                        </div>
                        <div className="offlineActivityDetail-content-top-right">
                            <Input style={{width: '350px'}}
                                   ref="searchKey"
                                   placeholder="输入搜索关键字"
                                   onPressEnter={(e) => this.handleSearchEvent(e)}
                                   prefix={<Icon type="search"/>}/>
                        </div>
                    </div>
                    <div className="offlineActivityDetail-content-table">
                        <Table
                            rowsCount={this.state.items.length}
                            rowHeight={35}
                            onColumnResizeEndCallback={this._onColumnResizeEndCallback}
                            headerHeight={35}
                            width={this.state.tableWidth}
                            height={this.state.tableHeight}>
                            <Column
                                header={<Cell>序号</Cell>}
                                fixed={true}
                                align="center"
                                cell={props => (
                                    <Cell {...props}>
                                        {(props.rowIndex + 1) + this.pageSize * (this.state.currentPage - 1)}
                                    </Cell>
                                )}
                                width={this.state.columnsWidth[0]}
                            />
                            <Column
                                header={<Cell>姓名</Cell>}
                                fixed={true}
                                align="center"
                                cell={props => (
                                    <Cell {...props}>
                                        {this.state.items[props.rowIndex].name}
                                    </Cell>
                                )}
                                width={this.state.columnsWidth[1]}
                            />
                            <Column
                                header={<Cell>电话</Cell>}
                                align="center"
                                cell={props => (
                                    <Cell {...props}>
                                        {this.state.items[props.rowIndex].phone}
                                    </Cell>
                                )}
                                width={this.state.columnsWidth[2]}
                            />
                            <Column
                                header={<OrderCell title="预到意向" direction={directions[0]}
                                                   triggerOrderHandler={(direction) => this.handleOrderClick('willCome', direction)}/>}
                                align="center"
                                cell={<BoolTextCell type="text" data={this.state.items} field="willCome"/>}
                                width={this.state.columnsWidth[3]}
                            />
                            <Column
                                header={<OrderCell title="签到状态" direction={directions[1]}
                                                   triggerOrderHandler={(direction) => this.handleOrderClick('signed', direction)}/>}
                                align="center"
                                cell={<BoolTextCell type="checked" data={this.state.items} field="signed"/>}
                                width={this.state.columnsWidth[4]}
                            />
                            <Column
                                header={<Cell>年龄</Cell>}
                                align="center"
                                cell={props => (
                                    <Cell {...props}>
                                        {this.state.items[props.rowIndex].age}
                                    </Cell>
                                )}
                                width={this.state.columnsWidth[5]}
                            />
                            <Column
                                header={<Cell>性别</Cell>}
                                align="center"
                                cell={props => (
                                    <Cell {...props}>
                                        {this.state.items[props.rowIndex].sex}
                                    </Cell>
                                )}
                                width={this.state.columnsWidth[6]}
                            />
                            <Column
                                header={<Cell>微信号</Cell>}
                                align="center"
                                cell={props => (
                                    <Cell {...props}>
                                        {this.state.items[props.rowIndex].wx}
                                    </Cell>
                                )}
                                width={this.state.columnsWidth[7]}
                            />
                            <Column
                                header={<Cell>地址</Cell>}
                                align="center"
                                flexGrow={1}
                                cell={props => (
                                    <Cell {...props}>
                                        {this.state.items[props.rowIndex].address}
                                    </Cell>
                                )}
                                width={this.state.columnsWidth[8]}
                            />
                            <Column
                                header={<Cell>工作单位</Cell>}
                                align="center"
                                flexGrow={1}
                                cell={props => (
                                    <Cell {...props}>
                                        {this.state.items[props.rowIndex].company}
                                    </Cell>
                                )}
                                width={this.state.columnsWidth[8]}
                            />
                            <Column
                                header={<Cell>职位</Cell>}
                                align="center"
                                flexGrow={1}
                                cell={props => (
                                    <Cell {...props}>
                                        {this.state.items[props.rowIndex].job}
                                    </Cell>
                                )}
                                width={this.state.columnsWidth[3]}
                            />
                            <Column
                                header={<Cell>学历</Cell>}
                                align="center"
                                flexGrow={1}
                                cell={props => (
                                    <Cell {...props}>
                                        {this.state.items[props.rowIndex].education}
                                    </Cell>
                                )}
                                width={this.state.columnsWidth[3]}
                            />
                            <Column
                                header={<Cell>疾病记录</Cell>}
                                align="center"
                                flexGrow={1}
                                cell={props => (
                                    <Cell {...props}>
                                        {this.state.items[props.rowIndex].ill}
                                    </Cell>
                                )}
                                width={this.state.columnsWidth[8]}
                            />
                            <Column
                                header={<Cell>茶道课程</Cell>}
                                align="center"
                                flexGrow={1}
                                cell={<BoolTextCell type="text" data={this.state.items} field="teaism"/>}
                                width={this.state.columnsWidth[3]}
                            />
                            <Column
                                header={<Cell>喜悦活动</Cell>}
                                align="center"
                                flexGrow={1}
                                cell={<BoolTextCell type="text" data={this.state.items} field="activity"/>}
                                width={this.state.columnsWidth[3]}
                            />
                        </Table>
                    </div>
                    <div className="offlineActivityDetail-content-bottom">
                        <div className="offlineActivityDetail-content-bottom-line"></div>
                        <Pager current={this.state.currentPage} total={this.state.totalPages}
                               switchPageToIndex={(pageIndex) => this.handleSwitchPageToIndex(pageIndex)}/>
                    </div>
                </div>
            </div>
        )
    }

    handleSwitchPageToIndex(pageIndex) {
        this.setState({currentPage: pageIndex})
        this._searchItemsWithPageIndex(pageIndex)
    }

    handleExportExcelEvent() {
        // HttpChannel.exportExcel({exportType: 2, id: this.props.model.id, isFile: true}).then(function (response) {
        //     console.log('会员列表导出成功:', response)
        // }, function (error) {
        //     console.log('活动详情导出失败：', error)
        // })
        var params = `key=${encodeURIComponent(JSON.stringify({exportType: 2, id: this.props.model.id}))}`
        params = params.replace(/%20/g, '+')
        // require("downloadjs")(`${address.exportExcel}?${params}`)
        window.location.href = `${address.exportExcel}?${params}`
    }

}

const mapStatesToProps = (state) => {
    return {
        isFold: state.application.isFold
    }
}

export default connect(mapStatesToProps)(OfflineActivityDetail)