
'use strict'

const {writeFile, readFile, unlinkSync, rmdirSync, statSync} = require('fs')
const {ipcRenderer, nativeImage} = require('electron')

const xmlns = 'http://www.w3.org/1999/xhtml'
const canvas = document.createElementNS(xmlns, 'canvas')

ipcRenderer.on('create-image', main)

function main(event, {name, ext, source, target}) {

    switch (ext) {

        case '.js':

            try {

                const {width, height, draw} = require(source)

                resize(width, height)
                draw(canvas)
                writeCanvasImage()

            } catch (error) {

                onerror()

            }

            return

        case '.svg':

            const image = new Image()
            image.src = source

            image.addEventListener('load', () => {
                const {width, height} = image
                resize(width, height)
                const context = canvas.getContext('2d')
                context.drawImage(image, 0, 0)
                writeCanvasImage()
            }, false)

            image.addEventListener('error', onerror, false)

            return

        case '.png':

            readFile(source, (error, data) => {

                if (error) {
                    return onerror()
                }

                writeTargetFile(data)

            })

            return

        default:

            const buffer = nativeImage.createFromPath(source).toPNG()
            writeTargetFile(buffer)

    }

    function writeCanvasImage() {
        const buffer = nativeImage.createFromDataURL(canvas.toDataURL()).toPNG()
        writeTargetFile(buffer)
    }

    function writeTargetFile(buffer) {
        writeFile(target, buffer, error => error ? onerror() : onsuccess())
    }

    function onsuccess() {
        ipcRenderer.send(`did-create-image:${name}`)
        close()
    }

    function onerror() {
        ipcRenderer.send(`did-fail-create-image:${name}`)
        close()
    }

}

function resize(width, height) {
    canvas.width = width
    canvas.height = height
}
