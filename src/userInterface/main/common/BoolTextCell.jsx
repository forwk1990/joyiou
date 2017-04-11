import React from 'react'
import './BoolTextCell.scss'
const {Cell} = require('fixed-data-table')

class BoolTextCell extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {rowIndex, field, data, type, ...props} = this.props
        const fieldValue = data[rowIndex][field]
        return (fieldValue === undefined || fieldValue === null || fieldValue === '')
            ? (
                <Cell {...props}><span></span></Cell>
            )
            : (
                <Cell {...props}>
                    {
                        (type == 'text')
                            ? (
                                !!fieldValue ? (<span className="bool-cell-text">YES</span>)
                                    : (<span className="bool-cell-text">NO</span>))
                            : (
                                !!fieldValue ? (<div className="bool-cell-check"><img src={require('17')}/></div>)
                                    : (<div className="bool-cell-check"><img src={require('18')}/></div>))
                    }
                </Cell>
            );
    }
}


export default BoolTextCell