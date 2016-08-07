
'use strict'

const size = 64
const width = size
const height = size
const padding = 16
const lowest = padding
const middle = size >> 1
const highest = size - padding
const weight = 5
const nearlowest = lowest + weight
const nearmiddlelow = middle - weight
const nearmiddlehigh = middle + weight
const nearhighest = highest - weight

const path = [

    // left-top
    [nearmiddlelow, middle],
    [lowest, nearlowest],
    [lowest, lowest],
    [nearlowest, lowest],

    // right-top
    [middle, nearmiddlelow],
    [nearhighest, lowest],
    [highest, lowest],
    [highest, nearlowest],

    // right-bottom
    [nearmiddlehigh, middle],
    [highest, nearhighest],
    [highest, highest],
    [nearhighest, highest],

    // left-bottom
    [middle, nearmiddlehigh],
    [nearlowest, highest],
    [lowest, highest],
    [lowest, nearhighest]

]

function draw(canvas) {

    const context = canvas.getContext('2d')
    const [begin, ...rest] = path
    context.fillStyle = 'white'

    context.beginPath()
    context.moveTo(...begin)
    rest.forEach(([x, y]) => context.lineTo(x, y))
    context.closePath()
    context.fill()

}

module.exports = {
    width, height, draw
}
