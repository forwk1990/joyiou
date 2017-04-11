import React from 'react'
import './EnergyRules.scss'
import Pager from '../common/Pager'
import {connect} from 'react-redux'
import TitleBar from '../common/TitleBar'
import {Input, InputNumber, Radio, Select, Form} from 'antd'
import EditModal from '../common/EditModal'
import Loading from '../common/Loading'
import actions from '../../../actions'
import HttpChannel from '../../../channel'
import ButtonGroupCell from './ButtonGroupCell'
const {Table, Column, Cell} = require('fixed-data-table')
import {Message} from '../../../utils/utils'
const RadioGroup = Radio.Group;
import {unstable_batchedUpdates} from 'react-dom'
const Option = Select.Option;
const FormItem = Form.Item


class EnergyRules extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            items: props.energyRules,
            tableWidth: 1120,
            tableHeight: 300,
            loading: false,
            energyProjects: [],
            isEditBoxShow: false,
            currentEnergyRule: '', /*当前规则*/
            currentEnergyProject: '', /*当前项目*/
            columnsWidth: [50, 50, 50]
        }
    }

    componentWillReceiveProps(nextProps) {
        const self = this
        unstable_batchedUpdates(() => {
            self.setState({items: nextProps.energyRules})
            if (nextProps.isFold != self.props.isFold) {
                self._setTableLayout(nextProps.isFold)
            }
        })
    }

    componentDidMount() {
        this._setTableLayout()
        this._serachEnergyProjects()
        this._searchItems()
    }

    _setTableLayout(isFold) {
        const self = this
        let tableWidth = window.screen.width - 200 - 70
        if (isFold) {
            tableWidth = tableWidth + 150
        }
        const tableHeight = $('.energy-rules-content-table').height()
        const columnsWidth = [
            tableWidth / 4, /*项目*/
            tableWidth / 2, /*能量规则*/
            tableWidth / 4 /*开启状态*/
        ]
        self.setState({
            tableWidth: tableWidth,
            tableHeight: tableHeight,
            columnsWidth: columnsWidth
        })
    }

    _serachEnergyProjects() {
        const self = this
        HttpChannel.energyProjects({}).then(function (energyProjects) {
            if (!energyProjects || energyProjects.length == 0) return
            self.setState({
                energyProjects: energyProjects,
                currentEnergyProject: ''
            })
        }, function () {

        })
    }

    _searchItems() {
        const self = this
        self.setState({loading: true})
        self.props.dispatch(actions.getEnergyRules()).then(function () {
            self.setState({loading: false})
        }, function () {
            self.setState({loading: false})
        })
    }

    handleCloseEditBoxEvent() {
        this.setState({
            isEditBoxShow: false,
            currentEnergyRule: '',
            currentEnergyProject: ''
        })
    }

    handleUpdateEnergyRule() {
        const self = this
        const {getFieldValue}  = this.props.form
        const energyProject = getFieldValue('energyProject').split('|')
        const energyProjectId = energyProject[0]
        const energyProjectName = energyProject[1]
        const energyValue = getFieldValue('energyValue')
        const parameters = {
            id: this.state.currentEnergyRule ? this.state.currentEnergyRule.id : null,
            projectId: energyProjectId,
            projectName: energyProjectName,
            value: energyValue,
            isActive: 0
        }
        this.props.dispatch(actions.updateEnergyRule(parameters)).then(function () {
            self.handleCloseEditBoxEvent()
        }, function () {
            self.handleCloseEditBoxEvent()
        })
    }

    handleDeleteEnergyRule(indexOfList) {
        if (indexOfList >= this.state.items.length) return
        const self = this
        const userId = self.props.userId
        const id = self.state.items[indexOfList].id
        Message.confirm('确定删除此能量规则吗？', function () {
            setTimeout(function () {
                self.props.dispatch(actions.deleteEnergyRule(id, userId, indexOfList))
            }, 300)
        })
    }

    handleEnergyRuleReleaseChange(isActive, indexOfList) {
        if (indexOfList >= this.state.items.length) return
        const self = this
        const currentEnergy = this.state.items[indexOfList]
        const parameters = {
            id: currentEnergy.id,
            projectId: currentEnergy.projectId,
            projectName: currentEnergy.projectName,
            value: currentEnergy.value,
            isActive: isActive ? 1 : 0
        }
        this.props.dispatch(actions.updateEnergyRule(parameters))
            .then(function () {
                self.handleCloseEditBoxEvent()
            }, function () {
                self.handleCloseEditBoxEvent()
            })
    }

    handleEditEnergyRule(indexOfList) {
        const currentEnergyRule = this.state.items[indexOfList]
        const currentEnergyProjectId = currentEnergyRule.projectId
        const currentEnergyProjectName = currentEnergyRule.projectName
        this.setState({
            isEditBoxShow: true,
            currentEnergyRule: currentEnergyRule,
            currentEnergyProject: `${currentEnergyProjectId}|${currentEnergyProjectName}`
        })
    }

    handleNewEnergyRule() {
        this.setState({isEditBoxShow: true, currentEnergyRule: null})
    }

    render() {
        const {getFieldDecorator} = this.props.form
        const buttons = this.props.editable ? [
                {"title": "新建规则", "eventHandler": () => this.handleNewEnergyRule()}
            ] : []
        return this.state.loading ? (<Loading/>) : (
                <div className="energy-rules">
                    <div className="energy-rules-bar">
                        <TitleBar title="能量规则" buttons={buttons}/>
                    </div>
                    <div className="energy-rules-content">
                        <div className="energy-rules-content-table">
                            <Table
                                rowsCount={this.state.items.length}
                                rowHeight={40}
                                headerHeight={40}
                                width={this.state.tableWidth}
                                height={this.state.tableHeight}>
                                <Column
                                    header={<Cell>项目</Cell>}
                                    align="center"
                                    cell={props => (
                                        <Cell {...props}>
                                            {this.state.items[props.rowIndex].projectName}
                                        </Cell>
                                    )}
                                    width={this.state.columnsWidth[0]}
                                />
                                <Column
                                    header={<Cell>能量规则</Cell>}

                                    align="center"
                                    cell={props => (
                                        <Cell {...props}>
                                            <span
                                                className="energy-value">{this.state.items[props.rowIndex].value}</span>点能量/次
                                        </Cell>
                                    )}
                                    width={this.state.columnsWidth[1]}
                                />
                                <Column
                                    header={<Cell>开启状态</Cell>}
                                    align="center"
                                    cell={props => (
                                        <ButtonGroupCell value={this.state.items[props.rowIndex].isActive}
                                                         editable={!!this.props.editable}
                                                         onEdit={() => this.handleEditEnergyRule(props.rowIndex)}
                                                         onDelete={() => this.handleDeleteEnergyRule(props.rowIndex)}
                                                         valueChange={(value) => this.handleEnergyRuleReleaseChange(value, props.rowIndex)}/>
                                    )}
                                    width={this.state.columnsWidth[2]}
                                />
                            </Table>
                        </div>
                    </div>
                    {
                        this.state.isEditBoxShow && (<div className="energy-rules-content-edit">
                                <EditModal
                                    buttons={[
                                        {"title": "保存", "eventHandler": () => this.handleUpdateEnergyRule()}
                                    ]}
                                    onCloseHandler={() => {
                                        this.handleCloseEditBoxEvent()
                                    }}>
                                    <div className="energy-rules-content-edit-wrapper">
                                        <Form>
                                            <FormItem
                                                label="项目"
                                                labelCol={{span: 8}}
                                                wrapperCol={{span: 16}}>
                                                {getFieldDecorator("energyProject", {
                                                    initialValue: this.state.currentEnergyProject,
                                                    rules: [{required: true, type: 'string'}],
                                                })(
                                                    <Select size="large" style={{width: 300}} disabled={!!this.state.currentEnergyRule}>
                                                        {
                                                            this.state.energyProjects.map(function (energyProject, index) {
                                                                return (<Option key={index}
                                                                                value={`${energyProject.id}|${energyProject.name}`}>{energyProject.name}</Option>)
                                                            })
                                                        }
                                                    </Select>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                label="能量规则"
                                                labelCol={{span: 8}}
                                                wrapperCol={{span: 16}}>
                                                {getFieldDecorator("energyValue", {
                                                    initialValue: this.state.currentEnergyRule ? this.state.currentEnergyRule.value : 1,
                                                    rules: [{required: true, type: 'number'}],
                                                })(
                                                    <InputNumber min={1} style={{width: "300px"}}/>
                                                )}
                                            </FormItem>
                                        </Form>
                                    </div>
                                </EditModal></div>
                        )
                    }

                </div>
            )
    }


}

const mapStateToProps = (state) => {
    return {
        energyRules: state.energyRule.list,
        userId: state.user.id,
        isFold: state.application.isFold
    }
}

export default connect(mapStateToProps)(Form.create()(EnergyRules))