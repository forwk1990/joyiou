import React from 'react'
import './ButtonGroupCell.scss'
import Switch from '../common/Switch'
const {Cell} = require('fixed-data-table')


class ButtonGroupCell extends Cell {

    constructor(props) {
        super(props)
        this.state = {value: props.value}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.value})
    }

    render() {
        const {valueChange, onDelete, onEdit, editable} = this.props
        return editable ? (
                <div className="button-group-cell">
                    <Switch checkedImageUrl={require('29')}
                            uncheckedImageUrl={require('30')}
                            warningText='确定关闭此能量规则吗?'
                            style={{width: '100px', height: '30px'}}
                            valueChangeEventHandler={valueChange}
                            defaultValue={this.state.value}/>
                    {
                        this.state.value ? (<img className="button-group-cell-edit forbid" src={require('21')}/>)
                            : (<img className="button-group-cell-edit" src={require('20')} onClick={onEdit}/>)
                    }
                    {
                        this.state.value ? (<img className="button-group-cell-delete forbid" src={require('24')}/>)
                            : (<img className="button-group-cell-delete" src={require('23')} onClick={onDelete}/>)
                    }
                </div>
            ) : (
                <div className="button-group-text">
                    {this.state.value ? '已开启' : '未启用'}
                </div>
            )
    }

}

export default ButtonGroupCell