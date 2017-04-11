import React from 'react'
import './Trains.scss'
import TitleBar from '../common/TitleBar'
import HttpChannel from '../../../channel'
import EditModal from '../common/EditModal'
import TrueFalseBox from '../common/TrueFalseBox'
import FilePicker from '../common/FilePicker'
import Loading from '../common/Loading'
import {connect} from 'react-redux'
import actions from '../../../actions'
import {Message, Path} from '../../../utils/utils'
import address from '../../../channel/address'
import {Form, Input, DatePicker, TimePicker, Tag, message, InputNumber, Button, Col}from 'antd'
const FormItem = Form.Item

const TrainInfoFlag = (props) => {
    const {isActive, text} = props
    return (
        <div className="train-info">
            <span className={`train-info-flag ${isActive ? 'active' : ''}`}></span>
            <span className="train-info-text">{text}</span>
        </div>
    )
}

class TrainItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isEditBoxShow: false
        }
    }

    render() {
        const {model, editHandler, deleteHandler, editable} = this.props
        return (
            <div className="train-item">
                <div className="train-item-header">
                    <div className="train-item-header-title">{model.title}</div>
                    {
                        !!editable && (
                            <div className="train-item-header-opt" onClick={editHandler}><img
                                src={require('19')}/></div>
                        )
                    }
                    {
                        !!editable && (
                            <div className="train-item-header-opt" onClick={deleteHandler}><img src={require('22')}/>
                            </div>
                        )
                    }
                </div>
                <div className="train-item-cnt">
                    {
                        <TrainInfoFlag text="主题" isActive={!!model.title}/>
                    }
                    {
                        !(!model.desc && !model.isDescChecked) && (
                            <TrainInfoFlag text="描述" isActive={model.isDescChecked}/>)
                    }
                    {
                        !(!model.music && !model.isMusicChecked) && (
                            <TrainInfoFlag text="音乐" isActive={model.isMusicChecked}/>)
                    }
                    {
                        !(!model.alarm && !model.isAlarmChecked) && (
                            <TrainInfoFlag text="闹铃" isActive={model.isAlarmChecked}/>)
                    }
                    {
                        !(!model.video && !model.isVideoChecked) && (
                            <TrainInfoFlag text="视频" isActive={model.isVideoChecked}/>)
                    }
                    {
                        !(!model.text && !model.isTextChecked) && (
                            <TrainInfoFlag text="文字介绍" isActive={model.isTextChecked}/>)
                    }
                </div>
            </div>
        )
    }

}

class Trains extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isEditBoxShow: false,
            currentEditModel: null,
            musicFileName: '',
            alarmFileName: '',
            videoFileName: '',
            loadingTrains: false
        }
        this.activityImageUrl = null
        this.editor = null
    }

    componentDidMount() {
        const self = this
        self.setState({loadingTrains: true})
        this.props.dispatch(actions.getTrains()).then(function () {
            self.setState({loadingTrains: false})
        }, function () {
            self.setState({loadingTrains: false})
        })
        /*
         // http://www.oss.stream.com/iamges/a.png
         const lastIndex = 'http://www.oss.stream.com/iamges/a.png'.lastIndexOf('/')
         console.log('fileName : ', 'http://www.oss.stream.com/iamges/a.png'.substring(lastIndex + 1))*/
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
            disabled: true,
            content: this.state.currentEditModel ? this.state.currentEditModel.text : '',
        })
        _v._$addEvent('getvalue', 'click', () => {
            _e._$get('result').innerHTML = self.editor._$getContent();
        })
    }

    handleEditEvent(model) {
        this.setState({
            isEditBoxShow: true,
            currentEditModel: {...model},
            musicFileName: model.music,
            alarmFileName: model.alarm,
            videoFileName: model.video
        })
        const self = this
        setTimeout(function () {
            self.configNejRichTextEditor()
        }, 350)
    }

    handleUpdateTrainEvent() {
        const self = this
        const {getFieldValue} = this.props.form

        /*主题必填*/
        if (!getFieldValue('title')) {
            Message.warning('您还未填写主题内容')
            return
        }
        const isDescChecked = getFieldValue('isDescChecked')
        if (isDescChecked) {
            const desc = getFieldValue('desc')
            if (!desc) {
                Message.warning('您还未填写描述')
                return
            }
        }
        const isMusicChecked = getFieldValue('isMusicChecked')
        if (isMusicChecked && !this.state.musicFileName) {
            Message.warning('请选择音乐文件')
            return
        }
        const isAlarmChecked = getFieldValue('isAlarmChecked')
        if (isAlarmChecked && !this.state.alarmFileName) {
            Message.warning('请选择闹铃文件')
            return
        }
        const isVideoChecked = getFieldValue('isVideoChecked')
        if (isVideoChecked && !this.state.videoFileName) {
            Message.warning('请选择视频文件')
            return
        }
        const isTextChecked = getFieldValue('isTextChecked')
        const text = this.editor.__editor.__copt.area.__initcnt
        if (isTextChecked && !text) {
            Message.warning('请填写音乐文字说明')
            return
        }

        let parameters = {
            id: this.state.currentEditModel == null ? null : this.state.currentEditModel.id,
            title: getFieldValue('title'),
            desc: getFieldValue('desc'),
            imageUrl: this.activityImageUrl,
            music: this.state.musicFileName,
            alarm: this.state.alarmFileName,
            video: this.state.videoFileName,
            text: text,
            isDescChecked, isMusicChecked, isAlarmChecked, isVideoChecked, isTextChecked
        }

        this.props.dispatch(actions.updateTrain(parameters)).then(function () {
            self.handleCloseEditBoxEvent()
        })
    }

    handleAddEvent() {
        /*
         * 新建时设置默认的currentEditModel值，左边单选框选择时会修改这个值，如果没有就会报错哦
         * */
        this.setState({
            isEditBoxShow: true, currentEditModel: {
                isMusicChecked: true,
                isDescChecked: true,
                isAlarmChecked: true,
                isTextChecked: true
            }
        })
        const self = this
        setTimeout(function () {
            self.configNejRichTextEditor()
        }, 350)
    }

    handleCloseEditBoxEvent() {
        this.setState({
            isEditBoxShow: false,
            currentEditModel: null,
            musicFileName: '',
            alarmFileName: '',
            videoFileName: ''
        })
    }

    handleDeleteEvent(id, userId, indexOfList) {
        const self = this
        Message.confirm('确定删除此训练项吗？', function () {
            setTimeout(function () {
                self.props.dispatch(actions.deleteTrain(id, userId, indexOfList))
            }, 300)
        })

    }

    handlePlayAudio(audioId) {
        const audio = document.getElementById(audioId)
        $(`#${audioId}-play`).toggleClass('media-play-animate')
        if ($(`#${audioId}-play`).hasClass('media-play-animate')) {
            audio.play()
        } else {
            audio.pause()
        }
    }

    render() {
        const self = this
        const {getFieldDecorator} = this.props.form
        const isDescChecked = this.state.currentEditModel ? this.state.currentEditModel.isDescChecked : false
        const isMusicChecked = this.state.currentEditModel ? this.state.currentEditModel.isMusicChecked : false
        const isAlarmChecked = this.state.currentEditModel ? this.state.currentEditModel.isAlarmChecked : false
        const isTextChecked = this.state.currentEditModel ? this.state.currentEditModel.isTextChecked : false
        const buttons = this.props.editable ? [{"title": "添加新类别", "eventHandler": () => this.handleAddEvent()}] : []
        return this.state.loadingTrains ? (<Loading/>) : (
                <div className="cnt-wrapper">
                    <div className="cnt-wrapper-bar">
                        <TitleBar title="正念训练项" buttons={buttons}/>
                    </div>
                    <div className="cnt-wrapper-cnt">
                        <div className="train-list">
                            {
                                !!this.props.trains && this.props.trains.map(function (train, index) {
                                    return (
                                        <TrainItem model={train} key={index} editable={self.props.editable}
                                                   deleteHandler={() => self.handleDeleteEvent(train.id, self.props.userId, index)}
                                                   editHandler={() => self.handleEditEvent(train)}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {
                        this.state.isEditBoxShow && (
                            <div className="train-edit">
                                <EditModal
                                    buttons={[
                                        {"title": "保存", "eventHandler": () => this.handleUpdateTrainEvent()}
                                    ]}
                                    onCloseHandler={() => {
                                        this.handleCloseEditBoxEvent()
                                    }}>
                                    <div className="train-edit-addImage">
                                        <FilePicker title="添加活动图片"
                                                    action={address.fileUpload}
                                                    accept="jpg|png"
                                                    showClear={true}
                                                    clearCallback={() => {
                                                        self.activityImageUrl = null
                                                    }}
                                                    imageUrl={this.state.currentEditModel ? this.state.currentEditModel.imageUrl : ''}
                                                    onComplete={(response) => {
                                                        self.activityImageUrl = response.data
                                                    }}/>
                                    </div>
                                    <div className="train-edit-form">
                                        <div className="train-edit-form-sel">
                                            <div className="train-edit-form-sel-row"></div>
                                            <div className="train-edit-form-sel-row">
                                                {
                                                    getFieldDecorator('isDescChecked', {initialValue: isDescChecked})(
                                                        <TrueFalseBox onChange={(value) => {
                                                            const currentModel = self.state.currentEditModel
                                                            currentModel.isDescChecked = value
                                                            self.setState({currentEditModel: currentModel})
                                                        }}/>
                                                    )
                                                }
                                            </div>
                                            <div className="train-edit-form-sel-row">
                                                {
                                                    getFieldDecorator('isMusicChecked', {initialValue: isMusicChecked})(
                                                        <TrueFalseBox onChange={(value) => {
                                                            const currentModel = self.state.currentEditModel
                                                            currentModel.isMusicChecked = value
                                                            self.setState({currentEditModel: currentModel})
                                                        }}/>
                                                    )
                                                }
                                            </div>
                                            <div className="train-edit-form-sel-row">
                                                {
                                                    getFieldDecorator('isAlarmChecked', {initialValue: isAlarmChecked})(
                                                        <TrueFalseBox onChange={(value) => {
                                                            const currentModel = self.state.currentEditModel
                                                            currentModel.isAlarmChecked = value
                                                            self.setState({currentEditModel: currentModel})
                                                        }}/>
                                                    )
                                                }
                                            </div>
                                            {/*<div className="train-edit-form-sel-row">
                                             {
                                             getFieldDecorator('isVideoChecked', {initialValue: isVideoChecked})(
                                             <TrueFalseBox onChange={(value) => {
                                             const currentModel = self.state.currentEditModel
                                             currentModel.isVideoChecked = value
                                             self.setState({currentEditModel: currentModel})
                                             }}/>
                                             )
                                             }
                                             </div>*/}
                                            <div className="train-edit-form-sel-row">
                                                {
                                                    getFieldDecorator('isTextChecked', {initialValue: isTextChecked})(
                                                        <TrueFalseBox onChange={(value) => {
                                                            const currentModel = self.state.currentEditModel
                                                            currentModel.isTextChecked = value
                                                            self.setState({currentEditModel: currentModel})
                                                        }}/>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="train-edit-form-cnt">
                                            <Form>
                                                <FormItem
                                                    label="主题"
                                                    labelCol={{span: 2}}
                                                    wrapperCol={{span: 18}}>
                                                    {getFieldDecorator("title", {
                                                        initialValue: this.state.currentEditModel ? this.state.currentEditModel.title : '',
                                                        rules: [{required: true, type: 'string'}],
                                                    })(
                                                        <Input placeholder="请输入活动主题" id="title"/>
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    label="描述"
                                                    labelCol={{span: 2}}
                                                    wrapperCol={{span: 18}}>
                                                    {getFieldDecorator("desc", {
                                                        initialValue: this.state.currentEditModel ? this.state.currentEditModel.desc : '',
                                                        rules: [{required: false, type: 'string'}],
                                                    })(
                                                        <Input placeholder="请输入描述" id="desc"
                                                               disabled={!isDescChecked}/>
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    label="音乐"
                                                    labelCol={{span: 2}}
                                                    wrapperCol={{span: 18}}>
                                                    <div className="media">
                                                        {
                                                            <FilePicker action={address.fileUpload}
                                                                        accept="mp3"
                                                                        formatErrorText="文件后缀不正确"
                                                                        mime="mp3"
                                                                        disabled={!isMusicChecked}
                                                                        showProgress={true}
                                                                        progressText="文件上传中解析中"
                                                                        onComplete={(response) => {
                                                                            self.setState({musicFileName: response.data})
                                                                        }}>
                                                                <div
                                                                    className={`media-picker ${isMusicChecked ? '' : 'disabled'}`}>
                                                                    {
                                                                        this.state.musicFileName ? (
                                                                                <span
                                                                                    className="media-picker-file">{Path.getFileName(self.state.musicFileName)}</span>
                                                                            ) : (
                                                                                <span
                                                                                    className="media-picker-add">添加音频</span>
                                                                            )
                                                                    }
                                                                    <audio src={this.state.musicFileName} id="music"
                                                                           style={{display: 'none'}} preload/>
                                                                </div>
                                                            </FilePicker>
                                                        }
                                                        {this.state.musicFileName && isMusicChecked && (
                                                            <div id="music-play" className="media-play"
                                                                 onClick={() => {
                                                                     self.handlePlayAudio('music')
                                                                 }}></div>)}
                                                    </div>
                                                </FormItem>
                                                <FormItem
                                                    label="闹铃"
                                                    labelCol={{span: 2}}
                                                    wrapperCol={{span: 18}}>
                                                    <div className="media">
                                                        {
                                                            <FilePicker action={address.fileUpload}
                                                                        accept="mp3"
                                                                        formatErrorText="文件后缀不正确"
                                                                        mime="mp3"
                                                                        disabled={!isAlarmChecked}
                                                                        showProgress={true}
                                                                        progressText="文件上传中解析中"
                                                                        onComplete={(response) => {
                                                                            self.setState({alarmFileName: response.data})
                                                                        }}>
                                                                <div
                                                                    className={`media-picker ${isAlarmChecked ? '' : 'disabled'}`}>
                                                                    {
                                                                        this.state.alarmFileName ? (
                                                                                <span
                                                                                    className="media-picker-file">{Path.getFileName(self.state.alarmFileName)}</span>
                                                                            ) : (
                                                                                <span
                                                                                    className="media-picker-add">添加音频</span>
                                                                            )
                                                                    }
                                                                    <audio src={this.state.alarmFileName} id="alarm"
                                                                           style={{display: 'none'}} preload/>
                                                                </div>
                                                            </FilePicker>
                                                        }
                                                        {this.state.alarmFileName && isAlarmChecked && (
                                                            <div id="alarm-play" className="media-play"
                                                                 onClick={() => {
                                                                     self.handlePlayAudio('alarm')
                                                                 }}></div>)}
                                                    </div>
                                                </FormItem>
                                                <FormItem label="文字"
                                                          required={false}
                                                          labelCol={{span: 2}}
                                                          wrapperCol={{span: 18}}>
                                                    <div id="desc-rich-text" className="train-text">
                                                        {
                                                            !isTextChecked && (
                                                                <div className="train-text-overlay"></div>)
                                                        }
                                                    </div>
                                                </FormItem>
                                            </Form>
                                        </div>
                                    </div>
                                </EditModal>
                            </div>
                        )
                    }
                </div>
            )
    }
}


const mapStateToProps = (state) => {
    return {
        trains: state.train.list,
        userId: state.user.id
    }
}

export default connect(mapStateToProps)(Form.create()(Trains))