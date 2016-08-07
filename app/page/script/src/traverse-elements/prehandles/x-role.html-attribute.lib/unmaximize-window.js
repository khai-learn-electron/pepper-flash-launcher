
'use strict'

const win = require('electron').remote.getCurrentWindow()

module.exports = ({element}) => {
    element.hidden = !win.isMaximized()
    win.on('maximize', () => element.hidden = false)
    win.on('unmaximize', () => element.hidden = true)
    element.addEventListener('click', () => win.unmaximize(), false)
}
