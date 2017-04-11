import React from 'react'
import './Users.scss'
import Pager from '../common/Pager'
import {connect} from 'react-redux'
import TitleBar from '../common/TitleBar'
import {Input, InputNumber, Radio, Select, Form} from 'antd'
import IdentitiesCell from './IdentitiesCell'
import Loading from '../common/Loading'
import actions from '../../../actions'
import HttpChannel from '../../../channel'
import ButtonGroupCell from './ButtonGroupCell'
const {Table, Column, Cell} = require('fixed-data-table')
import UserUpdate from './UserUpdate'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {Message} from '../../../utils/utils'

function ModalContent(props) {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
}

class Users extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            items: props.users || [],
            tableWidth: 1120,
            tableHeight: 300,
            loading: false,
            isUpdateComponentVisible: false,
            currentUser: null,
            modules: [],
            columnsWidth: [50, 50, 50, 50, 50]
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({items: nextProps.users})
        if (nextProps.isFold != this.props.isFold) {
            this._setTableLayout(nextProps.isFold)
        }
    }

    componentDidMount() {
        this._setTableLayout()
        this._searchItems()
    }

    _setTableLayout(isFold) {
        const self = this
        let tableWidth = window.screen.width - 200 - 70
        if (isFold) {
            tableWidth = tableWidth + 150
        }
        const tableHeight = $('.user-list-content-table').height() - 35
        const columnsWidth = [
            tableWidth * 140 / 1120, /*级别*/
            tableWidth * (270 - 140) / 1120, /*登陆账号*/
            tableWidth * (410 - 270) / 1120, /*电话*/
            tableWidth * (1020 - 410) / 1120, /*权限模块*/
            tableWidth * (1115 - 1020) / 1120, /*操作*/
        ]
        self.setState({
            tableWidth: tableWidth,
            tableHeight: tableHeight,
            columnsWidth: columnsWidth
        })
    }

    _getAllModules() {
        if (this.state.items.length === 0) return []
        if (this.state.modules.length > 0) {
            return this.state.modules.map(function (module) {
                return {...module, permission: '1', allowVisit: 0}
            })
        }
        let modules = this.state.items[0].modules
        return modules.map(function (identity) {
            return {...identity, permission: '1', allowVisit: 0}
        })
    }

    _searchItems() {
        const self = this
        self.setState({loading: true})
        self.props.dispatch(actions.getUsers()).then(function () {
            self.setState({loading: false})
        }, function () {
            self.setState({loading: false})
        })
    }

    handleNewUser() {
        this.setState({isUpdateComponentVisible: true, currentUser: null, modules: this._getAllModules()})
    }

    handleEditUser(indexOfList) {
        const currentUser = this.state.items[indexOfList]
        this.setState({isUpdateComponentVisible: true, currentUser: currentUser})
    }

    handleDeleteUser(indexOfList) {
        const self = this
        Message.confirm('确定删除此用户吗？', function () {
            setTimeout(function () {
                const currentUser = self.state.items[indexOfList]
                self.props.dispatch(actions.deleteUser(currentUser.id, currentUser.id, indexOfList))
            }, 300)
        })
    }

    render() {
        const buttons = this.props.editable ? [
                {"title": "新建职位", "eventHandler": () => this.handleNewUser()}
            ] : []
        return this.state.loading ? (<Loading/>) : (
                <div className="user-list">
                    <div className="user-list-bar">
                        <TitleBar title="职级管理项" buttons={buttons}/>
                    </div>
                    <div className="user-list-content">
                        <div className="user-list-content-table">
                            <Table
                                rowsCount={this.state.items.length}
                                rowHeight={60}
                                headerHeight={40}
                                minWidth={1200}
                                width={this.state.tableWidth}
                                height={this.state.tableHeight}>
                                <Column
                                    header={<Cell>级别</Cell>}
                                    align="center"
                                    cell={props => (
                                        <Cell {...props}>
                                            {
                                                this.state.items[props.rowIndex].rankName
                                            }
                                        </Cell>
                                    )}
                                    width={this.state.columnsWidth[0]}
                                />
                                <Column
                                    header={<Cell>登陆账号</Cell>}
                                    align="center"
                                    cell={props => (
                                        <Cell {...props}>
                                            {this.state.items[props.rowIndex].username}
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
                                    header={<Cell>权限模块</Cell>}
                                    align="center"
                                    cell={props => (
                                        <IdentitiesCell modules={this.state.items[props.rowIndex].modules}>
                                        </IdentitiesCell>
                                    )}
                                    width={this.state.columnsWidth[3]}
                                />
                                <Column
                                    header={<Cell>操作</Cell>}
                                    align="center"
                                    cell={props => (
                                        <ButtonGroupCell
                                            disabled={this.state.items[props.rowIndex].id == 'SYS_ADMIN' || !this.props.editable}
                                            onEdit={() => this.handleEditUser(props.rowIndex)}
                                            onDelete={() => this.handleDeleteUser(props.rowIndex)}/>
                                    )}
                                    width={this.state.columnsWidth[4]}
                                />
                            </Table>
                        </div>
                    </div>
                    {
                        this.state.isUpdateComponentVisible && (
                            <div className="user-list-pop-wrapper">
                                <ReactCSSTransitionGroup
                                    transitionEnter={false}
                                    transitionLeave={true} transitionLeaveTimeout={800}
                                    transitionAppear={true} transitionAppearTimeout={800}
                                    transitionName={{
                                        leave: 'user-pop-leave',
                                        leaveActive: 'user-pop-leave-active',
                                        appear: 'user-pop-appear',
                                        appearActive: 'user-pop-appear-active'
                                    }} component={ModalContent}>
                                    <UserUpdate model={this.state.currentUser}
                                                modules={this.state.modules}
                                                closeEventHandler={() => this.setState({isUpdateComponentVisible: false})}/>
                                </ReactCSSTransitionGroup>
                            </div>
                        )}
                </div>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.user.list,
        isFold: state.application.isFold
    }
}

export default connect(mapStateToProps)(Users)