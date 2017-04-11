import React from 'react'
import './TitleBar.scss'

class TitleBar extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {title, buttons} = this.props
        return (
            <div className="titleBar">
                <div className="titleBar-left">
                    <div className="titleBar-left-line"></div>
                    <div className="titleBar-left-title">{title}</div>
                </div>
                <div className="titleBar-right">
                    {
                        buttons.map(function (button, index) {
                            return (
                                <div key={index} className="titleBar-right-button" onClick={button.eventHandler}>{button.title}</div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

}

export default TitleBar