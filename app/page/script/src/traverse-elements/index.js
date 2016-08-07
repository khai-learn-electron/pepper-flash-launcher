
'use strict'

const {join, extname} = require('path')
const {readdirSync} = require('fs')
const FunctionList = require(`${global.__dirname}/lib/function-list.js`)

function getHandles(name) {
    const directory = join(__dirname, name)
    const list = getDirList(directory)
        .filter(fname => extname(fname) === '.js')
        .map(fname => join(directory, fname))
        .map(fpath => require(fpath))
    return new FunctionList(...list)
}

function getDirList(directory) {
    try {
        return readdirSync(directory)
    } catch (error) {
        console.warn(error)
        return []
    }
}

module.exports = {
    prehandles: getHandles('prehandles'),
    posthandles: getHandles('posthandles'),
    __proto__: null
}
