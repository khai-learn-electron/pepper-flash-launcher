
'use strict'

const size = 64
const width = size
const height = size
const padding = 16
const weight = 5
const region = size - 2 * padding
const backfront = 7
const outersize = region - backfront
const innersize = outersize - 2 * weight
const outerlowest = padding
const innerlowest = outerlowest + weight
const outernearlowest = outerlowest + backfront
const innernearlowest = innerlowest + backfront

function draw(canvas) {

    const context = canvas.getContext('2d')
    context.fillStyle = 'white'

    context.fillRect(outernearlowest, outerlowest, outersize, outersize)
    context.clearRect(innernearlowest, innerlowest, innersize, innersize)

    context.fillRect(outerlowest, outernearlowest, outersize, outersize)
    context.clearRect(innerlowest, innernearlowest, innersize, innersize)

}

module.exports = {
    width, height, draw
}
