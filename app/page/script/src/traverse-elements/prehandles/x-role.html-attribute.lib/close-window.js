
'use strict'

module.exports = ({window, element}) =>
    element.addEventListener('click', () => window.close(), false)
