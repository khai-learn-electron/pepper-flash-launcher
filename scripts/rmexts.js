
'use strict'

const {extname, join: joinPath} = require('path')
const {readdirSync, statSync, rmdirSync, unlinkSync} = require('fs')
const [project, ...extensions] = require('process').argv.slice(2)
const extset = new Set(extensions)

main(project)

function main(path) {

    const stats = statSync(path)

    if (stats.isDirectory()) {
        readdirSync(path)
            .filter(item => item.indexOf('.git') === -1)
            .map(item => joinPath(path, item))
            .forEach(main)
        return
    }

    if (stats.isFile()) {
        if (extset.has(extname(path).slice(1))) {
            try {
                unlinkSync(path)
                console.info(`Deleted "${path}"`)
            } catch (error) {
                console.error(`ERROR: Deleting "${path}" failed\n${error}`)
            }
        }
        return
    }

    console.warn(`WARNING: Ignored "${path}"`)

}
