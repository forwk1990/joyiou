import React from 'react'
import './ButtonGroupCell.scss'
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
        const {onDelete, onEdit, disabled} = this.props
        return !disabled ? (
                <div className="rank-button-group-cell">
                    {
                        this.state.value ? (<img className="rank-button-group-cell-edit forbid" src={require('21')}/>)
                            : (<img className="rank-button-group-cell-edit" src={require('20')} onClick={onEdit}/>)
                    }
                    {
                        this.state.value ? (<img className="rank-button-group-cell-delete forbid" src={require('24')}/>)
                            : (<img className="rank-button-group-cell-delete" src={require('23')} onClick={onDelete}/>)
                    }
                </div>
            ) : (
                <div className="rank-button-group-cell">
                    <img className="rank-button-group-cell-edit forbid"
                         src={require('21')}/>
                    <img className="rank-button-group-cell-delete forbid" src={require('24')}/>
                </div>)
    }

}

export default ButtonGroupCell