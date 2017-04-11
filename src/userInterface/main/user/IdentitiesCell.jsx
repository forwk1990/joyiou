import './IdentitiesCell.scss'
import React from 'react'
const {Cell} = require('fixed-data-table')


class IdentitiesCell extends Cell {
    render() {
        const {modules} = this.props
        return (
            <div className="identities-cell">
                {
                    !!modules && modules.length > 0 && modules.map(function (module, index) {
                        if (module.allowVisit === 0) return null
                        const permissionText = module.permission == 1 ? '查看' : '编辑'
                        return (
                            <span className="identities-cell-item" key={index}>{module.name}({permissionText})</span>
                        )
                    })
                }
            </div>
        )
    }
}

export default IdentitiesCell