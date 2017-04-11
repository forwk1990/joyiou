import React from 'react'
import './TrueFalseBox.scss'

class TrueFalseBox extends React.Component {

    constructor(props) {
        super(props)
        this.firstValueSetting = true
        this.state = {value: !!this.props.value}
        this.value = this.state.value
    }

    render() {

        const onChangeEventHandler = this.props.onChange
        let actualValue = this.state.value

        /*第一次设置值时，actualValue为传入的defaultValue*/
        if (this.firstValueSetting
            && this.props.initialValue
            && this.props.initialValue != this.state.value) {
            actualValue = this.props.initialValue
        }
        /*保存实际值*/
        this.value = actualValue

        return (
            <div className={`true-false-box ${actualValue ? 'active' : ''}`}
                 onChange={() => {
                 }}
                 onClick={() => this.handleClickEvent(onChangeEventHandler)}>
                <div className={`true-false-box-value ${actualValue ? 'active' : ''}`}></div>
            </div>
        )
    }

    handleClickEvent(onChangeEventHandler) {
        /*点击事件后都不是第一次设置值*/
        this.firstValueSetting = false
        this.value = !this.value
        this.setState({value: this.value})
        typeof onChangeEventHandler == "function" && onChangeEventHandler(this.value)
    }

}

export default TrueFalseBox