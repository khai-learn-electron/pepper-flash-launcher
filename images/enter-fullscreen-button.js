
'use strict'

const size = 64
const width = size
const height = size
const cornersize = size >> 1
const padding = 16
const weight = 5
const xweight = Math.sqrt((weight * weight) << 1)
const arrowsize = 12
const cornerspace = 1
const center = size >> 1
const highest = cornersize
const arrowbottom = highest - arrowsize

const swaparg = fn => (a, b) => fn(b, a)

function draw(canvas) {

    const context = canvas.getContext('2d')
    context.fillStyle = context.strokeStyle = 'white'
    context.lineWidth = 1

    drawCorner(1, 1)
    drawCorner(1, -1)
    drawCorner(-1, 1)
    drawCorner(-1, -1)

    function drawCorner(fx, fy) {

        const moveTo = (x, y) => context.moveTo(center + fx * x, center + fy * y)
        const lineTo = (x, y) => context.lineTo(center + fx * x, center + fy * y)

        drawSide(moveTo, lineTo)
        drawSide(swaparg(moveTo), swaparg(lineTo))

        function drawSide(moveTo, lineTo) {

            begin()
            moveTo(highest, highest)
            lineTo(highest, arrowbottom)
            lineTo(arrowbottom, highest)
            end()

        }

    }

    function begin() {
        context.beginPath()
    }

    function end() {
        context.closePath()
        context.fill()
        context.stroke()
    }

}

module.exports = {
    width, height, draw
}
