
'use strict'

const {basename, dirname} = require('path')
const {ipcRenderer} = require('electron')
const {embed} = require(`${global.__dirname}/lib/embed.js`).for({window, document})

ipcRenderer.on('open-file', (event, filename) => {
    embed(filename)
    document.title = `${basename(filename)} — ${dirname(filename)} — Flash Player`
})
