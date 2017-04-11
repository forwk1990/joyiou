import React from 'react'
import './UserUpdate.scss'
import NavigationBar from '../common/NavigationBar'
import TrueFalseBox from '../common/TrueFalseBox'
import FilePicker from '../common/FilePicker'
import TagEditor from '../common/TagEditor'
import {connect} from 'react-redux'
import actions from '../../../actions'
import address from '../../../channel/address'
import {Message, Validator} from '../../../utils/utils'
import HttpChannel from '../../../channel'
import {Form, Input, Select}from 'antd'
const Option = Select.Option;
const FormItem = Form.Item
import moment from 'moment'


/*
 * 活动更新组件，更新包含新建和编辑。
 * */
class UserUpdate extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modules: props.model ? [...props.model.modules] : props.modules
        }
    }

    componentWillReceiveProps(nextProps) {
        //this.setState({modules: nextProps.model ? nextProps.model.modules : nextProps.modules})
    }

    componentDidMount() {

    }

    changeAllowVisitValue(value, index) {
        let modules = this.state.modules
        modules[index].allowVisit = value ? 1 : 0
        this.setState({modules: [...modules]})
    }

    changePermissionValue(value, index) {
        let modules = this.state.modules
        modules[index].permission = value
        this.setState({modules: [...modules]})
    }


    handleSaveUserEvent() {
        const self = this

        self.props.form.validateFields((error, values) => {
            let isError = !!error;
            if (isError) {
                Message.warning('您的信息未填写正确，请检查')
                return
            }
            if (self.state.modules.filter(module => module.allowVisit).length === 0) {
                Message.error('请至少选择一项模块')
                return
            }
            let parameters = {...values}
            for (var key in values) if (key.indexOf('identity') === 0) delete parameters[key]
            parameters['modules'] = self.state.modules
            parameters['wxVerify'] = parameters['wxVerify'] ? 1 : 0
            parameters['rankName'] = parameters['rankId'] == 1 ? '管理员' : '员工'
            parameters['username'] = parameters['_username']
            parameters['password'] = self.props.model == parameters['_password'] ? parameters['_password'] : md5(parameters['_password'])
            parameters['id'] = self.props.model ? self.props.model.id : null

            delete parameters['_username']
            delete parameters['_password']

            self.props.dispatch(actions.updateUser(parameters)).then(function () {
                self.props.closeEventHandler()
            }, function () {
                Message.error('对不起，服务器暂时无法处理，请稍后再试')
            })
        })

    }

    render() {
        const self = this
        const {model, closeEventHandler} = this.props
        const {getFieldDecorator} = this.props.form
        const title = model ? '编辑' : '新建'
        return (
            <div className="cnt-wrapper">
                <div className="cnt-wrapper-bar">
                    <NavigationBar parentTitles={['职级管理项']}
                                   title={title}
                                   closeEventHandler={closeEventHandler}
                                   buttons={[
                                       {"title": "保存", "eventHandler": () => this.handleSaveUserEvent()}
                                   ]}/>
                </div>
                <div className="cnt-wrapper-cnt">
                    <div className="user-update-form">
                        <Form>
                            <FormItem
                                label="职级类别"
                                labelCol={{span: 4}}
                                wrapperCol={{span: 16}}>
                                {getFieldDecorator("rankId", {
                                    initialValue: model ? model.rankId : '1',
                                    rules: [{required: true, type: 'string'}],
                                })(
                                    <Select size="large" style={{width: '100%'}}>
                                        <Option value={'1'}>管理员</Option>
                                        <Option value={'2'}>员工</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label="登陆账号"
                                labelCol={{span: 4}}
                                wrapperCol={{span: 16}}>
                                {getFieldDecorator("_username", {
                                    initialValue: model ? model.username : '',
                                    rules: [{required: true, type: 'string'}],
                                })(
                                    <Input placeholder="请输入登陆账号" autocomplete="false"/>
                                )}
                            </FormItem>
                            <FormItem
                                label="登陆密码"
                                labelCol={{span: 4}}
                                wrapperCol={{span: 16}}>
                                {getFieldDecorator("_password", {
                                    initialValue: model ? model.password : '',
                                    rules: [{required: true, type: 'string'}],
                                })(
                                    <Input placeholder="请输入密码" type="password" autocomplete="false"/>
                                )}
                            </FormItem>
                            <FormItem
                                label="联系电话"
                                labelCol={{span: 4}}
                                wrapperCol={{span: 16}}>
                                {getFieldDecorator("phone", {
                                    initialValue: model ? model.phone : '',
                                    rules: [{
                                        pattern: /^1[34578]\d{9}$/,
                                        required: true,
                                        type: 'string',
                                        message: '手机号格式不正确'
                                    }],
                                })(
                                    <Input placeholder="请输入联系电话" id="phone"/>
                                )}
                            </FormItem>
                            <FormItem
                                label="开启微信验证"
                                labelCol={{span: 4}}
                                wrapperCol={{span: 16}}>
                                {
                                    getFieldDecorator('wxVerify', {initialValue: model ? model.wxVerify : false})(
                                        <TrueFalseBox onChange={(value) => {
                                        }}/>
                                    )
                                }
                            </FormItem>
                            <FormItem
                                label="权限模块"
                                labelCol={{span: 4}}
                                wrapperCol={{span: 16}}>
                                <div className="user-identity-list">
                                    {
                                        this.state.modules.map(function (identity, index) {
                                            const allowVisit = identity.allowVisit
                                            const value = identity.permission
                                            const isSelectDisabled = !allowVisit
                                            return (
                                                <div className="user-identity-list-item" key={index}>
                                                    {
                                                        getFieldDecorator(`identity-${identity.id}`, {initialValue: allowVisit})(
                                                            <TrueFalseBox onChange={(value) => {
                                                                self.changeAllowVisitValue(value, index)
                                                            }}/>
                                                        )
                                                    }
                                                    <span>{identity.name}</span>
                                                    {
                                                        getFieldDecorator(`identity-value-${identity.id}`, {
                                                            initialValue: value,
                                                            rules: [{required: true, type: 'string'}],
                                                        })(
                                                            <Select size="large" style={{width: 306}}
                                                                    onChange={(value) => {
                                                                        self.changePermissionValue(value, index)
                                                                    }}
                                                                    disabled={isSelectDisabled}>
                                                                <Option value={'1'}>仅查看</Option>
                                                                <Option value={'2'}>可编辑</Option>
                                                            </Select>
                                                        )
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }


}

export default connect()(Form.create()(UserUpdate))