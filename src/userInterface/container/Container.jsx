import React from 'react'
import './Container.scss'
import TopBar from 'topbar/TopBar.jsx'
import Sidebar from 'sidebar/Sidebar.jsx'
import {connect} from 'react-redux'

class Container extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container">
                <div className="topBar-wrapper">
                    <TopBar/>
                </div>
                <div className="content-wrapper">
                    <div className="left">
                        <Sidebar/>
                    </div>
                    <div className="right">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}



export default connect()(Container)