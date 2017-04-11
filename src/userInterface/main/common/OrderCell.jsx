import React from 'react'
import './OrderCell.scss'
import {Icon} from 'antd'
const {Cell} = require('fixed-data-table')


class OrderCell extends Cell {

    constructor(props) {
        super(props)
        this.direction = props.direction
    }

    componentWillReceiveProps(nextProps){
        this.direction = nextProps.direction
    }

    handleClick() {
        this.direction = this.direction === 0 ? 1 : -this.direction
        if (this.props.triggerOrderHandler
            && typeof this.props.triggerOrderHandler === 'function') {
            this.props.triggerOrderHandler.call(null, this.direction)
        }
    }

    render() {
        const {title} = this.props
        console.log('title:',title,'   -   direction : ', this.direction)
        return (
            <div className="order-cell" onClick={() => this.handleClick()}>
                <div className="order-cell-title">{title}</div>
                <div className="order-cell-order">
                </div>
            </div>
        )
    }
}

export default OrderCell