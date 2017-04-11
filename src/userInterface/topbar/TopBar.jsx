import './TopBar.scss'
import React from 'react'
import {connect} from 'react-redux'
import actions from '../../actions'
import {Message} from '../../utils/utils'

class TopBar extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="topBar">
                <div className="topBar-left">
                    <span>喜悦</span>
                    <span>后台管理</span>
                </div>
                <div className="topBar-right">
                    <span className="logout-icon" onClick={() => this.handleLogoutEvent()}></span>
                    <span className="logout-text">注销</span>
                    <span className="username">{this.props.name}</span>
                </div>
            </div>
        )
    }

    handleLogoutEvent() {
        const self = this
        Message.confirm('确认退出系统吗？', function () {
            self.props.dispatch(actions.logout())
        })
    }
}

const mapStatesToProps = (state) => {
    return {
        name: state.user.username
    }
}

export default connect(mapStatesToProps)(TopBar)