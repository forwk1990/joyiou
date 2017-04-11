import './App.scss'
import React from 'react';
import 'RichTextEditor.js'

class App extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // 最小宽度为屏幕宽度
        const windowWidth = window.screen.width
        $('.app').css('min-width', windowWidth)
    }

    render() {
        return (
            <div className="app">
                {this.props.children}
            </div>
        )
    }
}


export default App
