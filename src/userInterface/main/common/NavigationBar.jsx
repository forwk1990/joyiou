import React from 'react'
import './NavigationBar.scss'
import {connect} from 'react-redux'

class NavigationBar extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {parentTitles, title, buttons, closeEventHandler} = this.props
        return (
            <div className="navigationBar">
                <div className="navigationBar-left">
                    <div className="navigationBar-left-back" onClick={closeEventHandler}>&lsaquo;</div>
                    <div className="navigationBar-left-title">
                        {
                            parentTitles.map(function (title, index) {
                                return (
                                    <span key={index} className="navigationBar-left-title-parent">{title}<span>/</span></span>
                                )
                            })
                        }
                        <span className="navigationBar-left-title-current">{title}</span>
                    </div>
                </div>
                <div className="navigationBar-right">
                    {
                        buttons.map(function (button, index) {
                            return (
                                <div key={index} className="titleBar-right-button"
                                     onClick={button.eventHandler}>{button.title}</div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        modules: state.user.modules
    }
}

export default connect(mapStateToProps)(NavigationBar)