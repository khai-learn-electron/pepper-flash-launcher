
'use strict'

const win = require('electron').remote.getCurrentWindow()

module.exports = ({element}) =>
    element.addEventListener('click', () => win.minimize(), false)
