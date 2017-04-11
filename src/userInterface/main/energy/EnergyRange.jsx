import React from 'react'
import './EnergyRange.scss'
import Pager from '../common/Pager'
import {connect} from 'react-redux'
import TitleBar from '../common/TitleBar'
import {Input, Icon, Radio} from 'antd'
import BoolTextCell from '../common/BoolTextCell'
import Loading from '../common/Loading'
import OrderCell from '../common/OrderCell'
import address from '../../../channel/address'
import EnergyDetail from './EnergyDetail'
import HttpChannel from '../../../channel'
const {Table, Column, Cell} = require('fixed-data-table')
const RadioGroup = Radio.Group;
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

/*{
 userId: Mock.Random.guid(), /!*用户ID*!/
 range: 1, /!*能量排名*!/
 nickname: '会飞的哈士奇',
 'name|1': ['','helloworld'],
 phone: '18674031166',
 trainEnergy: 10, /!*训练能量*!/
 activityEnergy: 20, /!*活动能量*!/
 lifeNumberEnergy: 15, /!*生命数字*!/
 donateEnergy: 50,
 totalEnergy:95,
 userLevel: 1
 }*/

function ModalContent(props) {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
}

const UserLevelCell = (props) => {
    let levelName = '普通会员'
    if (props.value === 2) {
        levelName = '高级会员'
    } else if (props.value === 3) {
        levelName = '堂主'
    }
    return (
        <Cell style={{textAlign: 'center', width: '100%'}}>
            {levelName}
        </Cell>
    )
}

class EnergyRange extends React.Component {

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
            currentEnergy: null,
            isEnergyDetailVisible: false,
            columnsWidth: {
                range: 50,
                nickname: 50,
                phone: 50,
                trainEnergy: 50,
                activityEnergy: 50,
                lifeNumberEnergy: 50,
                donateEnergy: 50,
                totalEnergy: 50,
                userLevel: 50,
                detail: 50
            }
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
        const tableHeight = $('.energy-range-content-table').height()
        const columnsWidth = {
            range: tableWidth * 65 / 1220, /*排名*/
            nickname: tableWidth * (245 - 65) / 1220, /*姓名*/
            phone: tableWidth * (385 - 250) / 1220, /*电话*/
            trainEnergy: tableWidth * (500 - 385) / 1220, /*训练能量*/
            activityEnergy: tableWidth * (635 - 500) / 1220, /*活动能量*/
            lifeNumberEnergy: tableWidth * (750 - 635) / 1220, /*生命数字能量*/
            donateEnergy: tableWidth * (890 - 750) / 1220, /*捐赠能量*/
            totalEnergy: tableWidth * (1000 - 890) / 1220, /*总能量*/
            userLevel: tableWidth * (1125 - 1000) / 1220, /*身份等级*/
            detail: tableWidth * (1220 - 1125) / 1220
        }
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
        HttpChannel.energyRange({
            pageSize: self.pageSize,
            pageIndex: (pageIndex - 1),
            searchKey: self.searchKey,
            ascendingKey: this.ascendingKey,
            descendingKey: this.descendingKey
        }).then(function (searchResult) {
            self.setState({
                loading: false,
                totalPages: searchResult.totalPages,
                items: searchResult.rows
            })
        }, function () {
            self.setState({loading: false})
        })
    }

    _onColumnResizeEndCallback(newColumnWidth, columnKey) {
        console.log('resize callback ', newColumnWidth, columnKey)
        this.setState(({columnsWidth}) => ({
            columnsWidth: {
                ...columnsWidth,
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

    handleSwitchPageToIndex(pageIndex) {
        this.setState({currentPage: pageIndex})
        this._searchItemsWithPageIndex(pageIndex)
    }

    handleViewDetail(rowIndex) {
        const currentEnergy = this.state.items[rowIndex]
        this.setState({currentEnergy: currentEnergy, isEnergyDetailVisible: true})
    }

    /*
     * 处理排序
     * */
    handleOrderClick(columnName, direction) {
        debugger
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

    /*
     * 导出能量排名
     * */
    handleExportEvent() {
        var params = `key=${encodeURIComponent(JSON.stringify({exportType: 3}))}`
        params = params.replace(/%20/g, '+')
        window.location.href = `${address.exportExcel}?${params}`
    }

    _initializeDirections() {
        let directions = ['trainEnergy', 'activityEnergy', 'lifeNumberEnergy', 'donateEnergy', 'totalEnergy']
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
        const directions = this._initializeDirections()
        return (
            <div className="energy-range">
                {this.state.loading && (<Loading/>)}
                <div className="energy-range-bar">
                    <TitleBar title="能量排名" buttons={[
                        {"title": "导出", "eventHandler": () => this.handleExportEvent()}
                    ]}/>
                </div>
                <div className="energy-range-content">
                    <div className="energy-range-content-top">
                        <div className="energy-range-content-top-left">
                            <span>单页显示行数</span>
                            <RadioGroup onChange={(event) => this.handlePageSizeChangeEvent(event)}
                                        value={this.state.pageSize}>
                                <Radio value={25}>25行</Radio>
                                <Radio value={50}>50行</Radio>
                                <Radio value={100}>100行</Radio>
                            </RadioGroup>
                        </div>
                        <div className="energy-range-content-top-right">
                            <Input style={{width: '350px'}}
                                   ref="searchKey"
                                   placeholder="输入搜索关键字"
                                   onPressEnter={(e) => this.handleSearchEvent(e)}
                                   prefix={<Icon type="search"/>}/>
                        </div>
                    </div>
                    <div className="energy-range-content-table">
                        <Table
                            rowsCount={this.state.items.length}
                            rowHeight={35}
                            isColumnResizing={false}
                            onColumnResizeEndCallback={this._onColumnResizeEndCallback}
                            headerHeight={35}
                            allowCellsRecycling={true}
                            width={this.state.tableWidth}
                            height={this.state.tableHeight}>
                            <Column
                                header={<Cell>总名次</Cell>}
                                align="center"
                                columnKey='range'
                                isResizable={true}
                                cell={props => (
                                    <Cell {...props}>
                                        {this.state.items[props.rowIndex].range}
                                    </Cell>
                                )}
                                width={this.state.columnsWidth["range"]}
                            />
                            <Column
                                header={<Cell>昵称(姓名)</Cell>}
                                flexGrow={1}
                                columnKey='nickname'
                                isResizable={true}
                                align="center"
                                cell={props => (
                                    <Cell {...props}>
                                        {
                                            this.state.items[props.rowIndex].nickname
                                        }
                                        ({this.state.items[props.rowIndex].name || '--'})
                                    </Cell>
                                )}
                                width={this.state.columnsWidth['nickname']}
                            />
                            <Column
                                header={<Cell>电话</Cell>}
                                align="center"
                                columnKey='phone'
                                isResizable={true}
                                cell={props => (
                                    <Cell {...props}>
                                        {this.state.items[props.rowIndex].phone}
                                    </Cell>
                                )}
                                width={this.state.columnsWidth['phone']}
                            />
                            <Column
                                header={<OrderCell title="正念训练能量" direction={directions[0]}
                                                   triggerOrderHandler={(direction) => this.handleOrderClick('trainEnergy', direction)}/>}
                                align="center"
                                isResizable={true}
                                columnKey='trainEnergy'
                                cell={
                                    props => (
                                        <Cell {...props}>
                                            {this.state.items[props.rowIndex].trainEnergy}
                                        </Cell>
                                    )
                                }
                                width={this.state.columnsWidth['trainEnergy']}
                            />
                            <Column
                                header={<OrderCell direction={directions[1]}
                                                   title="喜悦活动能量"
                                                   triggerOrderHandler={(direction) => this.handleOrderClick('activityEnergy', direction)}/>}
                                align="center"
                                columnKey='activityEnergy'
                                isResizable={true}
                                cell={
                                    props => (
                                        <Cell {...props}>
                                            {this.state.items[props.rowIndex].activityEnergy}
                                        </Cell>
                                    )
                                }
                                width={this.state.columnsWidth['activityEnergy']}
                            />
                            <Column
                                header={<OrderCell direction={directions[2]}
                                                   title="生命数字能量"
                                                   triggerOrderHandler={(direction) => this.handleOrderClick('lifeNumberEnergy', direction)}/>}
                                align="center"
                                isResizable={false}
                                columnKey='lifeNumberEnergy'
                                cell={props => (
                                    <Cell {...props}>
                                        {this.state.items[props.rowIndex].lifeNumberEnergy}
                                    </Cell>
                                )}
                                width={this.state.columnsWidth['lifeNumberEnergy']}
                            />
                            <Column
                                header={<OrderCell direction={directions[3]}
                                                   title="捐赠能量"
                                                   triggerOrderHandler={(direction) => this.handleOrderClick('donateEnergy', direction)}/>}
                                align="center"
                                columnKey='donateEnergy'
                                isResizable={false}
                                cell={props => (
                                    <Cell {...props}>
                                        {this.state.items[props.rowIndex].donateEnergy}
                                    </Cell>
                                )}
                                width={this.state.columnsWidth['donateEnergy']}
                            />
                            <Column
                                header={<OrderCell direction={directions[4]}
                                                   title="能量总额"
                                                   triggerOrderHandler={(direction) => this.handleOrderClick('totalEnergy', direction)}/>}
                                align="center"
                                columnKey='totalEnergy'
                                isResizable={false}
                                cell={props => (
                                    <Cell {...props}>
                                        {this.state.items[props.rowIndex].totalEnergy}
                                    </Cell>
                                )}
                                width={this.state.columnsWidth['totalEnergy']}
                            />
                            <Column
                                header={<Cell>身份等级</Cell>}
                                align="center"
                                columnKey='userLevel'
                                isResizable={true}
                                cell={props => (
                                    <UserLevelCell value={this.state.items[props.rowIndex].userLevel}/>
                                )}
                                width={this.state.columnsWidth['userLevel']}
                            />
                            <Column
                                header={<Cell>详情</Cell>}
                                align="center"
                                columnKey='detail'
                                isResizable={true}
                                cell={props => (<span className="energy-detail-span"
                                                      onClick={() => this.handleViewDetail(props.rowIndex)}>详情</span>)
                                }
                                width={this.state.columnsWidth['detail']}/>
                        </Table>
                    </div>
                    <div className="energy-range-content-bottom">
                        <div className="energy-range-content-bottom-line"></div>
                        <Pager current={this.state.currentPage} total={this.state.totalPages}
                               switchPageToIndex={(pageIndex) => this.handleSwitchPageToIndex(pageIndex)}/>
                    </div>
                </div>
                {
                    this.state.isEnergyDetailVisible && (
                        <div className="energy-pop-wrapper">
                            <ReactCSSTransitionGroup
                                transitionEnter={false}
                                transitionLeave={true} transitionLeaveTimeout={800}
                                transitionAppear={true} transitionAppearTimeout={800}
                                transitionName={{
                                    leave: 'energy-pop-leave',
                                    leaveActive: 'energy-pop-leave-active',
                                    appear: 'energy-pop-appear',
                                    appearActive: 'energy-pop-appear-active'
                                }} component={ModalContent}>
                                <EnergyDetail model={this.state.currentEnergy}
                                              closeEventHandler={() => this.setState({isEnergyDetailVisible: false})}/>
                            </ReactCSSTransitionGroup>
                        </div>
                    )
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

export default connect(mapStateToProps)(EnergyRange)