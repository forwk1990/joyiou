import React from 'react'
import './ActivityUpdate.scss'
import NavigationBar from '../common/NavigationBar'
import TrueFalseBox from '../common/TrueFalseBox'
import FilePicker from '../common/FilePicker'
import TagEditor from '../common/TagEditor'
import {connect} from 'react-redux'
import actions from '../../../actions'
import address from '../../../channel/address'
import {Message} from '../../../utils/utils'
import {Form, Input, DatePicker, TimePicker, InputNumber, Col}from 'antd'

const FormItem = Form.Item
import moment from 'moment'


/*
 * 活动更新组件，更新包含新建和编辑。
 * */
class ActivityUpdate extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            limitDisabled: !!props.model ? (!props.model.limits) : true,
            willComeDisabled: !!props.model ? (!props.model.willComeDate) : true,
            address: props.model ? props.model.address : ''
        }

        this.title = props.model ? props.model.title : ''
        this.link = props.model ? props.model.link : ''
        this.startDate = props.model ? props.model.startDate : ''
        this.endDate = props.model ? props.model.endDate : ''
        this.enrollDate = props.model ? props.model.enrollDate : ''
        this.willComeDate = (props.model ? props.model.willComeDate : '') || ''
        this.lng = !!props.model ? props.model.lng : null
        this.lat = !!props.model ? props.model.lat : null
        this.activityImageUrl = props.model ? props.model.activityImageUrl : null
        this.qrcodeImageUrl = props.model ? props.model.qrcodeImageUrl : null
        this.tags = props.model ? (!!props.model.tags ? props.model.tags.split('|') : []) : []
        this.limits = props.model ? props.model.limits : 1
        this.limits = this.limits == 0 ? 1 : this.limits

        this.editor = null
        this.map = null
        this.geocoder = null
        this.marker = null
        this.id = props.model ? props.model.id : null
    }

    handleSaveActivityEvent() {
        const self = this

        if (!this.activityImageUrl) {
            Message.warning('请添加活动图片')
            return
        }

        this.props.form.validateFields((error, values) => {
            var isError = false
            !!error && Object.keys(error).map(function (errorKey) {
                if (error[errorKey].errors.length > 0) isError = true
            })
            if (isError) {
                Message.warning('您的信息未填写正确，请检查')
                return
            }

            const title = values.title

            /*
             * 报名时间 < 预到时间 < 活动开始时间 < 活动结束时间
             * */
            // 活动开始时间
            const startDate = `${values.startDate.format('YYYY-MM-DD')} ${values.startTime.format('HH:mm')}`
            // 活动结束时间
            const endDate = `${values.endDate.format('YYYY-MM-DD')} ${values.endTime.format('HH:mm')}`
            // 报名时间
            const enrollDate = values.enrollDate.format('YYYY-MM-DD')

            /*
             * 活动结束时间应该大于活动开始时间
             * */
            if (Date.parse(startDate) > Date.parse(endDate)) {
                Message.warning('活动结束时间应大于活动开始时间')
                return
            }

            /*活动开始时间应大于报名时间*/
            if (Date.parse(startDate) < Date.parse(enrollDate)) {
                Message.warning('活动开始时间应大于报名时间')
                return
            }

            const link = values.link
            const address = values.address
            const activityImageUrl = this.activityImageUrl
            const qrcodeImageUrl = this.qrcodeImageUrl == 'null' || !this.qrcodeImageUrl ? null : this.qrcodeImageUrl
            const limits = self.state.limitDisabled ? 0 : values.limits
            let parameters = {
                title,
                startDate,
                endDate,
                enrollDate,
                link,
                address,
                activityImageUrl,
                qrcodeImageUrl,
                limits,
                tags: !this.tags || this.tags.length === 0 ? '' : this.tags.join('|')
            }
            if (!self.state.willComeDisabled) {
                const willComeDate = `${values.willComeDate.format('YYYY-MM-DD')} ${values.willComeTime.format('HH:mm')}`

                /*预到时间应该大于报名时间*/
                if (Date.parse(willComeDate) <= Date.parse(enrollDate)) {
                    Message.warning('预到时间应该大于报名时间')
                    return
                }

                /*预到时间应该小于活动开始间*/
                if (Date.parse(willComeDate) >= Date.parse(startDate)) {
                    Message.warning('预到时间应该小于活动开始间')
                    return
                }
                parameters['willComeDate'] = willComeDate
            } else {
                parameters['willComeDate'] = ''
            }
            parameters['lng'] = this.lng
            parameters['lat'] = this.lat
            parameters['desc'] = this.editor.__editor.__copt.area.__initcnt
            parameters['id'] = this.id

            // 更新当前实体
            self.props.dispatch(actions.updateOfflineActivity(parameters))
                .then(function () {
                    self.props.closeEventHandler()
                }, function () {
                    Message.error('对不起，服务器暂时无法处理，请稍后再试')
                })
        })
    }


    render() {
        const self = this
        const {closeEventHandler} = this.props
        const {getFieldDecorator} = this.props.form
        const title = this.props.model ? '编辑' : '新建'
        return (
            <div className="activityUpdate">
                <div className="activityUpdate-bar">
                    <NavigationBar parentTitles={['线下活动项']}
                                   title={title}
                                   closeEventHandler={closeEventHandler}
                                   buttons={[
                                       {"title": "保存", "eventHandler": () => this.handleSaveActivityEvent()}
                                   ]}/>
                </div>
                <div className="activityUpdate-content">
                    <div className="activityUpdate-content-addImage">
                        <div className="activityUpdate-content-addImage-wrapper">
                            <div className="hd"><FilePicker title="添加活动图片"
                                                            action={address.fileUpload}
                                                            accept="jpg|png"
                                                            imageUrl={!!this.props.model ? this.props.model.activityImageUrl : ''}
                                                            onComplete={(response) => {
                                                                self.activityImageUrl = response.data
                                                            }}/>
                            </div>
                            <div className="qrcode"><FilePicker title="添加活动群二维码"
                                                                type="square"
                                                                accept="jpg|png"
                                                                action={address.fileUpload}
                                                                showClear={true}
                                                                clearCallback={() => {
                                                                    self.qrcodeImageUrl = null
                                                                }}
                                                                imageUrl={!!this.props.model ? this.props.model.qrcodeImageUrl : ''}
                                                                onComplete={(response) => {
                                                                    self.qrcodeImageUrl = response.data
                                                                }}/></div>
                        </div>
                    </div>
                    <div className="activityUpdate-content-row">
                        <Form>
                            <FormItem
                                label="主题"
                                style={{paddingRight: '26px'}}
                                labelCol={{span: 3}}
                                wrapperCol={{span: 21}}>
                                {getFieldDecorator("title", {
                                    initialValue: this.title,
                                    rules: [{required: true, type: 'string'}],
                                })(
                                    <Input placeholder="请输入活动主题" id="title"/>
                                )}
                            </FormItem>
                            <FormItem
                                label="活动时间"
                                labelCol={{span: 3}}
                                wrapperCol={{span: 21}}>
                                <Col span="7" style={{paddingRight: '15px'}}>
                                    {getFieldDecorator("startDate", {
                                        initialValue: !!this.props.model ? moment(this.startDate, 'YYYY-MM-DD') : null,
                                        rules: [{type: 'object', required: true}],
                                    })(
                                        <DatePicker style={{width: "100%"}} format="YYYY-MM-DD"/>
                                    )}
                                </Col>
                                <Col span="4">
                                    <FormItem>
                                        {getFieldDecorator("startTime", {
                                            initialValue: !!this.props.model ? moment(this.startDate, 'HH:mm') : null,
                                            rules: [{type: 'object', required: true}],
                                        })(
                                            <TimePicker style={{width: "100%"}} format="HH:mm"/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span="1">
                                    <span style={{width: "100%", textAlign: "center", display: "inline-block"}}>至</span>
                                </Col>
                                <Col span="7">
                                    <FormItem style={{paddingRight: "15px"}}>
                                        {getFieldDecorator("endDate", {
                                            initialValue: !!this.props.model ? moment(this.endDate, 'YYYY-MM-DD') : null,
                                            rules: [{type: 'object', required: true}],
                                        })(
                                            <DatePicker style={{width: "100%"}} format="YYYY-MM-DD"/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span="4">
                                    <FormItem>
                                        {getFieldDecorator("endTime", {
                                            initialValue: !!this.props.model ? moment(this.endDate, 'HH:mm') : null,
                                            rules: [{type: 'object', required: true, message: '请选择结束时间'}],
                                        })(
                                            <TimePicker style={{width: "100%"}} format="HH:mm"/>
                                        )}
                                    </FormItem>
                                </Col>
                            </FormItem>
                            <FormItem
                                label="报名时间"
                                labelCol={{span: 3}}
                                wrapperCol={{span: 21}}>
                                {getFieldDecorator("enrollDate", {
                                    initialValue: !!this.props.model ? moment(this.enrollDate, 'YYYY-MM-DD') : null,
                                    rules: [{type: 'object', required: true, message: '请选择结束时间'}],
                                })(
                                    <DatePicker style={{width: `${700 / 26}%`}}/>
                                )}
                            </FormItem>
                            <FormItem label="分类标签"
                                      labelCol={{span: 3}}
                                      wrapperCol={{span: 18}}>
                                <TagEditor initialValue={this.tags} onChange={(tags) => this.tags = tags}/>
                            </FormItem>
                            <FormItem label="外链"
                                      style={{paddingRight: '26px'}}
                                      labelCol={{span: 3}}
                                      wrapperCol={{span: 21}}>
                                {getFieldDecorator("link", {
                                    initialValue: !!this.props.model ? this.link : '',
                                    rules: [{type: 'string', required: false, message: '请输入外链'}],
                                })(
                                    <Input addonBefore="http://"/>
                                )}
                            </FormItem>
                            <FormItem label="人数限定"
                                      labelCol={{span: 3}}
                                      wrapperCol={{span: 18}}>
                                <div className="number-limit">
                                    <div className="number-limit-sel">
                                        <TrueFalseBox initialValue={!this.state.limitDisabled} onChange={(value) => {
                                            self.setState({limitDisabled: !value})
                                        }}/>
                                    </div>
                                    <div className="number-limit-value">
                                        {!this.state.limitDisabled && getFieldDecorator("limits", {initialValue: this.limits})(
                                            <InputNumber min={1} initialValue={3}/>
                                        )}
                                    </div>
                                </div>
                            </FormItem>
                            <FormItem label="预到意向"
                                      labelCol={{span: 3}}
                                      wrapperCol={{span: 18}}>
                                <div className="number-limit">
                                    <div className="number-limit-sel">
                                        <TrueFalseBox initialValue={!this.state.willComeDisabled} onChange={(value) => {
                                            self.setState({willComeDisabled: !value})
                                        }}/>
                                    </div>
                                    <div className="number-limit-value">
                                        <Col span="12">
                                            <FormItem>
                                                {!this.state.willComeDisabled
                                                && getFieldDecorator("willComeDate", {
                                                    initialValue: !!this.willComeDate ? moment(this.willComeDate, 'YYYY-MM-DD') : null
                                                })(
                                                    <DatePicker format="YYYY-MM-DD"/>
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem>
                                                {!this.state.willComeDisabled
                                                && getFieldDecorator("willComeTime", {
                                                    initialValue: !!this.willComeDate ? moment(this.willComeDate, 'HH:mm') : null
                                                })(
                                                    <TimePicker style={{marginLeft: "15px"}} format="HH:mm"/>
                                                )}
                                            </FormItem>
                                        </Col>
                                    </div>
                                </div>
                            </FormItem>
                            <FormItem label="活动简介"
                                      required={true}
                                      labelCol={{span: 3}}
                                      style={{paddingRight: '26px'}}
                                      wrapperCol={{span: 21}}>
                                <div className="desc-rich-text" id="desc-rich-text">

                                </div>
                            </FormItem>
                            <FormItem label="地址"
                                      labelCol={{span: 3}}
                                      style={{paddingRight: '26px'}}
                                      wrapperCol={{span: 21}}>
                                {getFieldDecorator("address", {
                                    initialValue: self.state.address,
                                    rules: [{type: 'string', required: true, message: '请输入地址'}],
                                })(
                                    <Input placeholder="请输入活动地点"
                                           onChange={(event) => this.handleAddressChangeEvent(event)}/>
                                )}
                                <div className="address-map" id="address-map">

                                </div>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.configNejRichTextEditor()
        this.mapInit()
    }

    configNejRichTextEditor() {
        const self = this
        var _ = NEJ.P,
            _e = _('nej.e'),
            _v = _('nej.v'),
            _u = _('nej.ui');
        self.editor = _u._$$Custom._$allocate({
            parent: _e._$get('desc-rich-text'),
            clazz: 'w-edt',
            focus: true,
            content: !!this.props.model ? this.props.model.desc : ''
        })
        _v._$addEvent('getvalue', 'click', () => {
            _e._$get('result').innerHTML = self.editor._$getContent();
        })
    }

    handleAddressChangeEvent(event) {
        const self = this
        const address = event.target.value
        this.geocoder.getLocation(address, function (status, result) {
            if (status !== 'complete' || result.info !== 'OK') return
            if (result.geocodes && result.geocodes.length > 0) {
                const location = result.geocodes[0].location
                self.lng = location.lng
                self.lat = location.lat
                self.map.setCenter([self.lng, self.lat])
                self.marker.setPosition([self.lng, self.lat])
                self.marker.setAnimation('AMAP_ANIMATION_DROP')
            }
        })
    }

    mapInit() {
        const self = this

        //加载地图，调用浏览器定位服务
        if (this.lat && this.lng) {
            self.map = new AMap.Map('address-map', {
                center: [this.lng, this.lat],
                resizeEnable: true,
                zoom: 15
            })
        } else {
            self.map = new AMap.Map('address-map', {
                resizeEnable: true,
                zoom: 15
            })
        }

        self.marker = new AMap.Marker({
            map: self.map,
            icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png"
        })

        self.map.plugin(["AMap.Geocoder"], function () {
            self.geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            })
        })

        self.map.on('click', function (event) {
            self.geocoder.getAddress(event.lnglat, function (status, result) {
                if (status !== 'complete' || result.info !== 'OK') return
                console.log('activity update get address lng:', self.lng, " - lat:", self.lat)
                self.lng = event.lnglat.lng
                self.lat = event.lnglat.lat
                self.marker.setPosition([self.lng, self.lat])
                self.marker.setAnimation('AMAP_ANIMATION_DROP')
                self.props.form.setFieldsValue({'address': result.regeocode.formattedAddress})
            })
        })

        self.map.plugin(["AMap.ToolBar"], function () {
            self.map.addControl(new AMap.ToolBar());
        })
    }
}

export default connect()(Form.create()(ActivityUpdate))