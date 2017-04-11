import React from 'react'
import './Switch.scss'
import {Message} from '../../../utils/utils'

class Switch extends React.Component {

    constructor(props) {
        super(props)
        this.state = {value: !!props.defaultValue ? true : false}
        this.warningText = props.warningText
    }

    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.defaultValue ? true : false})
    }

    onClickEventHandler(valueChangeEventHandler) {
        const self = this
        const currentValue = !self.state.value
        if (this.warningText && !currentValue) {
            Message.confirm(this.warningText, function () {
                self.setState({value: currentValue})
                setTimeout(function () {
                    !!valueChangeEventHandler
                    && typeof valueChangeEventHandler === 'function'
                    && valueChangeEventHandler(currentValue)
                }, 600)
            })
        } else {
            self.setState({value: currentValue})
            !!valueChangeEventHandler && typeof valueChangeEventHandler === 'function' && valueChangeEventHandler(currentValue)
        }
    }

    render() {
        const {checkedImageUrl, uncheckedImageUrl, style, valueChangeEventHandler} = this.props
        return (
            <div className="switch" style={style} onClick={() => this.onClickEventHandler(valueChangeEventHandler)}>
                <img src={this.state.value ? checkedImageUrl : uncheckedImageUrl}/>
            </div>
        )
    }

}

export default Switch