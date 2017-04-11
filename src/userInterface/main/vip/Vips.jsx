import React from 'react'
import Pager from '../common/Pager'
import './Vips.scss'
import TitleBar from '../common/TitleBar'
import Loading from '../common/Loading'
import FilePicker from '../common/FilePicker'
import HttpChannel from '../../../channel'
import {Input, Icon, Radio} from 'antd'
const RadioGroup = Radio.Group;
import address from '../../../channel/address'
import {connect} from 'react-redux'
import {Message} from '../../../utils/utils'
const {Table, Column, Cell} = require('fixed-data-table')

class Vips extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            rows: [],
            tableWidth: 1120,
            tableHeight: 300,
            totalPages: 0,
            currentPage: 1,
            pageSize: 25,
            loading: false,
            columnWidths: []
        }
        this.searchKey = ''
        this.pageSize = 25
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
        let tableWidth = window.screen.width - 200 - 70
        if (isFold) {
            tableWidth = tableWidth + 150
        }
        const tableHeight = $('.vips-content-table').height()
        this.setState({tableWidth: tableWidth, tableHeight: tableHeight})
    }

    _searchItemsWithPageIndex(pageIndex) {
        const self = this
        pageIndex = pageIndex || this.state.currentPage
        self.setState({loading: true})
        HttpChannel.vips({
            pageSize: self.pageSize,
            pageIndex: (pageIndex - 1),
            searchKey: self.searchKey
        }).then(function (searchResult) {
            self.setState({
                loading: false, /**/
                totalPages: searchResult.totalPages,
                columnWidths: searchResult.totalPages > 0 ? self._generateArray(searchResult.rows[0], 120) : [],
                rows: searchResult.rows
            })
        }, function () {
            Message.error('服务器貌似没有开机，请稍后再试')
        })
    }

    _generateArray(row, value) {
        if (typeof row !== 'Array' && row.length <= 0)
            throw new Error('row must be array')
        let columnWidths = {}
        for (let i = 0; i < row.length; i++) {
            const column = row[i]
            columnWidths[column.key] = value
        }
        return columnWidths
    }

    _onColumnResizeEndCallback(newColumnWidth, columnKey) {
        this.setState(({columnWidths}) => ({
            columnWidths: {
                ...columnWidths,
                [columnKey]: newColumnWidth,
            }
        }))
    }

    handlePageSizeChangeEvent(event) {
        this.pageSize = event.target.value
        this.setState({pageSize: event.target.value, currentPage: 1}, () => this._searchItemsWithPageIndex())
    }

    handleSearchEvent(e) {
        this.searchKey = e.target.value
        this._searchItemsWithPageIndex()
    }

    render() {
        const self = this
        return (
            <div className="vips">
                {this.state.loading && (<Loading/>)}
                <div className="vips-bar">
                    <TitleBar title="会员管理项" buttons={[
                        {"title": "导出", "eventHandler": () => this.handleExportExcelEvent()}
                    ]}/>
                </div>
                <div className="vips-hidden">
                    <FilePicker title="添加活动图片"
                                accept="xls|xlsx"
                                action={address.importExcel}
                                formatErrorText="文件后缀应为xls或xlsx"
                                mime="excel"
                                showProgress={true}
                                progressText="文件上传中解析中"
                                onComplete={(data) => {
                                    console.log('上传文件成功：开始请求数据')
                                    if (data['status'] == 0) self._searchItemsWithPageIndex()
                                }}>
                        <div id="filePicker-event-proxy"></div>
                    </FilePicker>
                </div>
                <div className="vips-content">
                    <div className="vips-content-top">
                        <div className="vips-content-top-left">
                            <span>单页显示行数</span>
                            <RadioGroup onChange={(event) => this.handlePageSizeChangeEvent(event)}
                                        value={this.state.pageSize}>
                                <Radio value={25}>25行</Radio>
                                <Radio value={50}>50行</Radio>
                                <Radio value={100}>100行</Radio>
                            </RadioGroup>
                        </div>
                        <div className="vips-content-top-right">
                            <Input style={{width: '350px'}}
                                   placeholder="输入搜索关键字"
                                   onPressEnter={(e) => this.handleSearchEvent(e)}
                                   prefix={<Icon type="search"/>}
                            />
                        </div>
                    </div>
                    <div className="vips-content-table">
                        <Table
                            onColumnResizeEndCallback={this._onColumnResizeEndCallback}
                            isColumnResizing={false}
                            rowsCount={this.state.totalPages > 0 ? this.state.rows.length : 0}
                            rowHeight={35}
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
                                width={50}
                            />
                            {
                                this.state.totalPages > 0 && this.state.rows[0].map(function (column, columnIndex) {
                                    return (
                                        <Column header={<Cell>{column.name}</Cell>}
                                                align="center"
                                                columnKey={column.key}
                                                key={`${columnIndex}`}
                                                flexGrow={1}
                                                isResizable={true}
                                                cell={props => (
                                                    <Cell {...props}>
                                                        {
                                                            self.state.rows[props.rowIndex][columnIndex].value
                                                        }
                                                    </Cell>
                                                )}
                                                minWidth={70}
                                                width={self.state.columnWidths[column.key]}
                                        />
                                    )
                                })
                            }
                        </Table>
                    </div>
                    <div className="vips-content-bottom">
                        <div className="vips-content-bottom-line"></div>
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

    handleImportExcelEvent() {
        document.getElementById('filePicker-event-proxy').click()
    }

    handleExportExcelEvent() {
        // 下载
        // require("downloadjs")('http://joyiou.oss-cn-shanghai.aliyuncs.com/userimage/拾穗行动一对一结对学生信息表(结对用).xlsx')
        // HttpChannel.exportExcel({exportType: 1,isFile:true}).then(function (response) {
        //     console.log('会员列表导出成功:',response)
        // }, function (error) {
        //     console.log('会员列表导出失败:', error)
        // })
        var params = `key=${encodeURIComponent(JSON.stringify({exportType: 1}))}`
        params = params.replace(/%20/g, '+')
        // require("downloadjs")(`${address.exportExcel}?${params}`)

        window.location.href = `${address.exportExcel}?${params}`
    }
}

const mapStateToProps = (state) => {
    return {
        isFold: state.application.isFold
    }
}

export default connect(mapStateToProps)(Vips)