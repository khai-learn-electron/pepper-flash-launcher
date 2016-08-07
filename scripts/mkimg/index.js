
'use strict'

const {parse: parsePath, join: joinPath} = require('path')
const {statSync, readdirSync, mkdirSync, rmdirSync, unlinkSync} = require('fs')
const {env: {IMAGE_SOURCE, IMAGE_TARGET}, stdout, stderr} = require('process')
const {app, ipcMain, BrowserWindow} = require('electron')

const {freeze: freezeObject} = Object

const HIDDEN_WINDOW_DESCRIPTOR = freezeObject({
    show: false,
    webPreferences: freezeObject({
        nodeIntegration: true
    })
})

const pset = new Set()

try {
    if (statSync(IMAGE_TARGET).isFile()) {
        unlinkSync(IMAGE_TARGET)
        mkdirSync(IMAGE_TARGET)
    }
} catch (error) {
    mkdirSync(IMAGE_TARGET)
}

for (const trgitem of readdirSync(IMAGE_TARGET)) {
    const {name} = parsePath(trgitem)
    const srcexists = readdirSync(IMAGE_SOURCE).filter(srcitem => parsePath(srcitem).name === name).length
    if (!srcexists) {
        const target = joinPath(IMAGE_TARGET, trgitem)
        try {
            unlinkSync(target)
            stdout.write(`Deleted "${target}" (no corresponding source item)\n`)
        } catch (error) {
            stderr.write(`ERROR: Failed to delete "${target}"\n${error}`)
        }
    }
}

for (const srcitem of readdirSync(IMAGE_SOURCE)) {

    const {name, ext} = parsePath(srcitem)
    const source = joinPath(IMAGE_SOURCE, srcitem)
    const target = joinPath(IMAGE_TARGET, `${name}.png`)

    try {

        const stats = statSync(target)

        if (stats.isDirectory()) {
            rmdirSync(target)
            stdout.write(`Removed "${target}" (directory)\n`)
        } else if (stats.isFile()) {
            if (statSync(source).mtime <= stats.mtime) {
                stdout.write(`Skipped overwriting "${target}" (up to date)\n`)
                continue
            }
        } else {
            stderr.write(`WARNING: Skipped creating "${target}" (unrecognized format)\n`)
            continue
        }

    } catch (error) {

        if (error.code !== 'ENOENT') {
            stderr.write(`ERROR: Failed to get information of "${target}"\n${error}\n`)
            continue
        }

    }

    const execute = (resolve, reject) => {

        app.on('ready', () => {
            const win = new BrowserWindow(HIDDEN_WINDOW_DESCRIPTOR)
            win.loadURL(joinPath(__dirname, 'page.xml'))
            win.once('ready-to-show', () => win.webContents.send(`create-image`, {name, ext, source, target}))
        })

        ipcMain.on(`did-create-image:${name}`, () => {
            stdout.write(`Created "${target}"\n`)
            resolve()
        })

        ipcMain.on('did-fail-create-image:${name}', () => {
            stderr.write('ERROR: Failed to create "${target}"\n')
            reject()
        })

    }

    pset.add(new Promise(execute))

}

Promise.all(pset)
    .then(() => app.exit(0))
    .catch(() => app.exit(1))
