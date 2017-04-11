/*开发模式、采用MockJs模拟ajax数据*/
if (__DEV__) require("./ajaxMock.js")

import address from './address'

/*
 * 发起请求
 * */
function sendRequest(url, parameters) {

    __DEV__ && console.log('HttpChannel begin sendRequest url -> ', url)

    /*url自带返回数据*/
    if (typeof url === 'object' && url.isJson) return url.value


    return new Promise(function (resolve, reject) {

        // initialize the form data
        // var formData = new FormData();
        // formData.append("key",JSON.stringify(parameters));
        // Object.assign(formData, parameters);
        var params = `key=${encodeURIComponent(JSON.stringify(parameters))}`
        params = params.replace(/%20/g, '+')

        __DEV__ && console.log('request parameters -> ', parameters)

        /*
         * initialize the xml http request level2
         * @discussion :
         * 1、there are two types of XMLHttpRequest,XmlHttpRequest level1 and XmlHttpRequest level2
         * 2、XmlHttpRequest level 1 is the old version,it can't send request across origin.
         * 3、XmlHttpRequest level 2 is the newest version,it can send request across origin and build formData with new interface.
         * */
        var client = new XMLHttpRequest()
        client.open('POST', url)
        client.onreadystatechange = __state_change_handler
        client.responseType = 'json'
        if (parameters['isFile']) {
            client.responseType = 'application/octet-stream'
        }
        client.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        client.send(params)

        /*
         * 状态改变事件
         * */
        function __state_change_handler() {
            if (this.readyState !== 4 || parameters['isFile']) return
            if (this.status === 200) {
                var responseObject = __DEV__ ? JSON.parse(this.response) : this.response
                if (responseObject.status == 0) {
                    resolve(responseObject.data)
                } else {
                    reject({
                        level: 0,
                        message: responseObject.message,
                        status: responseObject.status
                    })
                }
                __DEV__ && console.log('HttpChannel request successed with responseObject -> ', responseObject)
            } else {
                __DEV__ && console.log('HttpChannel request failed with statusCode -> ', this.statusText)

                reject({level: -1, message: "哎呀！网络变成蝴蝶飞走了"})
            }
        }
    })
}

const HttpChannel = {
    sendRequest: sendRequest
}

Object.keys(address).map(key => Object.defineProperty(HttpChannel, key, {
        enumerable: false,
        get: () => parameters => sendRequest(address[key], parameters)
    }
))

export default HttpChannel