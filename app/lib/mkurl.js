
'use strict'

const {resolve: resolvePath} = require('path')

const mkurl = path =>
    `file:///${resolvePath(path).split('\\').join('/')}`

module.exports = mkurl
