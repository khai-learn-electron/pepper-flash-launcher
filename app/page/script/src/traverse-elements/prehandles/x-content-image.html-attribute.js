
'use strict'

const ImageElement = require(`${global.__dirname}/lib/html-image.js`)

function main(element) {

    const xContentImage = element.getAttribute('x-content-image')

    if (!xContentImage) {
        return
    }

    const [src, width, height] = xContentImage.split(';').map(str => str.trim())
    const image = new ImageElement({src, width, height})

    element.appendChild(image)

}

module.exports = main
