
'use strict'

const {extname} = require('path')
const {readFile} = require('fs')
const {ipcRenderer} = require('electron')
const mMimeTypes = require('./mime-types.js')

const {freeze: freezeObject} = Object

const xmlns = 'http://www.w3.org/1999/xhtml'

exports.for = ({window, document}) => {

    const pluginContainer = document.getElementById('plugin-container')

    const embed = src => readFile(src, (error, data) => {
        const element = document.createElementNS(xmlns, 'embed')
        element.type = mMimeTypes[extname(src).slice(1)] || ''
        element.src = src
        pluginContainer.textContent = ''
        pluginContainer.insertBefore(element, null)
        element.addEventListener('load', () => {
            element.focus()
        }, false)
        ipcRenderer.on('focus', () => element.focus())
        ipcRenderer.on('blur', () => element.blur())
    })

    return freezeObject({
        pluginContainer, embed,
        __proto__: null
    })

}
