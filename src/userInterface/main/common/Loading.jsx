import React from 'react'
import './Loading.scss'
import {Icon} from 'antd'

class Loading extends React.Component {

    render() {
        return (
            <div className="loading-itachi">
                <Icon type="loading"/>
                <span>系统处理中，请耐心等候</span>
            </div>
        )
    }

}

export default Loading