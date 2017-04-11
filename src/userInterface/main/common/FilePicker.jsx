import React from 'react'
import './FilePicker.scss'
import {Upload, Icon, message} from 'antd'
import address from '../../../channel/address'
import {Message} from '../../../utils/utils'

class FilePicker extends React.Component {

    constructor(props) {
        super(props)
        this.state = {imageUrl: props.imageUrl}
        this.mime = props.mime || 'image'
    }

    render() {
        const {title, type, showClear, action, disabled} = this.props
        const styleObject = {width: `${type == 'square' ? '144px' : '240px'}`}
        return !disabled ? (
                <Upload action={action}
                        className="file-uploader"
                        showUploadList={false}
                        beforeUpload={(file) => this.beforeUpload(file)}
                        multiple={false}
                        onChange={(info) => this.handleFileChange(info)}>
                    {this.state.imageUrl ?
                        (
                            <div className="file-uploader-imageBox">
                                {
                                    !!showClear && (<Icon type="minus-circle-o" className="file-uploader-imageBox-icon"
                                                          onClick={(event) => this.handleClearEvent(event)}/>)
                                }
                                <img src={decodeURIComponent(this.state.imageUrl)} alt="" className="file-uploader-imageBox-image"
                                     style={styleObject}/>
                            </div>
                        ) : this.props.children ? this.props.children : (
                                <div className="file-uploader-wrapper" style={styleObject}>
                                    <Icon type="plus" className="file-uploader-wrapper-icon"/>
                                    <span>{title}</span>
                                </div>
                            )}
                </Upload>
            ) : this.props.children
    }

    static propTypes = {
        accept: React.PropTypes.string.isRequired
    }

    beforeUpload(file) {
        console.log('before upload file:', file)
        const accepts = this.props.accept.split('|')
        const matchedAccepts = accepts.filter(function (accept) {
            return file.name.lastIndexOf(accept) == (file.name.length - accept.length)
        })
        if (matchedAccepts.length === 0) {
            const formatErrorText = this.props['formatErrorText'] || "文件格式错误"
            Message.error(formatErrorText)
            return false
        }
        Message.loading('正在为您上传文件，请稍后...')
        return true
    }

    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleClearEvent(event) {
        this.setState({imageUrl: null})
        if(this.props.clearCallback && typeof this.props.clearCallback == 'function'){
            this.props.clearCallback()
        }
        event.stopPropagation()
        event.preventDefault()
    }

    handleFileChange(info) {
        console.log('handleFileChange info', info)
        const onComplete = this.props['onComplete'] || function (data) {
                console.log('no complete bind with data:', data)
            }
        const onProgress = this.props['onProgress'] || function (event) {
                console.log('no complete bind with event:', event)
            }
        if (info.file.status == 'done'
            && info.file.response['status'] == 0) {
            Message.close()
            onComplete(info.file.response, info.file)
            if (this.mime === 'image') {
                this.getBase64(info.file.originFileObj, imageUrl => this.setState({imageUrl}))
            }
        } else {
            if (!event) return
            if (!!this.props["showProgress"]) {
                const progressText = this.props['progressText'] || '服务器处理中'
                if (event.percent < 100) {
                    // Message.loading(`${progressText},当前进度${parseInt(event.percent)}%`)
                    Message.progress('系统正在解析您上传的文件，请耐心等待', parseInt(event.percent))
                } else {
                    // Message.close()
                }
            } else {
                onProgress(event)
            }
        }
    }

}

export default FilePicker