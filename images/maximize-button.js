
'use strict'

const size = 64
const width = size
const height = size
const padding = 16
const weight = 5
const outerbegin = padding
const outerend = size - 2 * outerbegin
const innerbegin = outerbegin + weight
const innerend = size - 2 * innerbegin

function draw(canvas) {
    const context = canvas.getContext('2d')
    context.fillStyle = 'white'
    context.fillRect(outerbegin, outerbegin, outerend, outerend)
    context.clearRect(innerbegin, innerbegin, innerend, innerend)
}

module.exports = {
    width, height, draw
}
