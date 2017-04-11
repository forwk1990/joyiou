import React from 'react'
import './Canvas.scss'

class Canvas extends React.Component {

    componentDidMount() {
        this.draw()
        // this.canvasApp()
    }

    draw() {
        const theCanvas = document.querySelector("#theCanvas")
        const context = theCanvas.getContext("2d")
        if (!context)return

        // box
        context.strokeStyle = '#000000'
        context.beginPath()
        context.moveTo(0, 0)
        context.bezierCurveTo(0, 100, 200, 100, 300, 100)
        context.stroke()
        context.closePath()
    }

    handleClick() {
        const theCanvas = document.querySelector("#theCanvas")
        const context = theCanvas.getContext("2d")
        console.log("context.globalAlpha:", context.globalAlpha)
        context.globalAlpha = 0
    }

    canvasApp() {
        const theCanvas = document.querySelector("#theCanvas")
        const context = theCanvas.getContext("2d")
        var text = 'Hello World'
        var alpha = 0
        var fadeIn = true

        // image
        var helloWorldImage = new Image()
        helloWorldImage.src = require('cj')

        function gameLoop() {
            window.setTimeout(gameLoop, 20)
            drawScreen()
        }


        gameLoop()


        function drawScreen() {

            // background
            context.globalAlpha = 1
            context.fillStyle = '#000000'
            context.fillRect(0, 0, 640, 480)

            // image
            context.globalAlpha = .25
            context.drawImage(helloWorldImage, 0, 0)

            if (fadeIn) {
                alpha += 0.01
                if (alpha >= 1) {
                    alpha = 1
                    fadeIn = false
                }
            } else {
                alpha -= 0.01
                if (alpha < 0) {
                    alpha = 0
                    fadeIn = true
                }
            }

            // text
            context.font = '72px Sans-Serif'
            context.textBaseline = 'top'

            context.globalAlpha = alpha
            context.fillStyle = '#ffffff'
            context.fillText(text, 150, 200)
        }
    }

    render() {
        return (
            <div className="canvas">
                <canvas id="theCanvas" width="640" height="480"></canvas>
                <div className="button" onClick={() => this.handleClick()}>点击我</div>
            </div>
        )
    }

}

export default Canvas