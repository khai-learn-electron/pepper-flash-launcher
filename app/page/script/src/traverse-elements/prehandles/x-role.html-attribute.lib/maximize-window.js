
'use strict'

const win = require('electron').remote.getCurrentWindow()

module.exports = ({element}) => {
    element.hidden = win.isMaximized()
    win.on('maximize', () => element.hidden = true)
    win.on('unmaximize', () => element.hidden = false)
    element.addEventListener('click', () => win.maximize(), false)
}
