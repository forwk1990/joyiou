/**
 * Created by Itachi on 2017/2/21.
 */

import swal from 'sweetalert'
import {message} from 'antd'

var utils = {}, Message = {}, Path = {}, Validator = {};

exports['default'] = utils

Message.warning = function (text) {
    message.warning(text)
}

Message.error = function (text) {
    message.error(text)
}

Message.loading = function (text) {
    swal({
        title: '',
        text: `<div style="display: flex;align-items: center;justify-content: center;"><i class="icon-spinner icon-spin icon-2x pull-left"></i><span style="text-align:left;float:left;height: 32px;line-height: 32px;">${text}</span></div>`,
        html: true,
        showConfirmButton: false
    })
}

Message.progress = function (text, percent) {
    const progressHtml = ` <div class="yp-progress yp-progress-circle">
                            <div class="yp-progress-inner" style="width: 80px; height: 80px; font-size: 18.8px;">
                            <svg class="yp-progress-circle " viewBox="0 0 100 100">
                                 <path class="yp-progress-circle-trail" 
                                 d="M 50,50 m 0,-47
                                 a 47,47 0 1 1 0,94
                                 a 47,47 0 1 1 0,-94" 
                                 stroke="#f3f3f3" 
                                 stroke-width="6" 
                                 fill-opacity="0"></path>
                                <path class="yp-progress-circle-path" d="M 50,50 m 0,-47
                                 a 47,47 0 1 1 0,94
                                 a 47,47 0 1 1 0,-94" 
                                 stroke-linecap="round" 
                                 stroke="#108ee9" 
                                 stroke-width="6" fill-opacity="0" 
                                 style="stroke-dasharray: 295.31px, 295.31px; stroke-dashoffset: ${295.31 - 295.31 * 0.01 * percent}px; 
                                 transition: stroke-dashoffset 0.3s ease 0s, stroke 0.3s ease;">
                                </path>
                            </svg>
                            <span class="yp-progress-text">${percent}%</span>
                            </div>
                        </div>`
    swal({
        title: '',
        text: `<div style="display: flex;align-items: center;justify-content: flex-start;">
                <div style="margin-left:20px">${progressHtml}</div>
                <div style="text-align:left;float:left;height: 32px;line-height: 32px;margin-left:20px;">${text}</div>
               </div>`,
        html: true,
        showConfirmButton: false
    })
}

Message.close = function () {
    swal.close()
}

Message.confirm = function (text, okCallback, cancelCallback) {
    swal({
            title: text,
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#fdb32b",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                !!okCallback && typeof okCallback === 'function' && okCallback()
            } else {
                !!cancelCallback && typeof cancelCallback === 'function' && cancelCallback()
            }
        });
}

Message.prompt = function (text, okCallback) {
    swal({
            title: text,
            text: '',
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: ""
        },
        function (inputValue) {
            if (!!inputValue) {
                !!okCallback && typeof okCallback === 'function' && okCallback(inputValue)
                swal.close()
            }
            return false
        })
}

utils.Message = Message

Path.getFileName = function (url) {
    if (!url || typeof url !== 'string') return ''
    const lastIndex = url.lastIndexOf('/')
    if (lastIndex == url.length - 1) return ''
    return decodeURI(url.substring(lastIndex + 1))
}

utils.Path = Path

Validator.isRegularPhone = function (phone) {
    return /^1[34578]\d{9}$/.test(phone)
}

utils.Validator = Validator

module.exports = exports['default']