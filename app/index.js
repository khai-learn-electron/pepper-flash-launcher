
'use strict'

const {join: joinPath, resolve: resolvePath, extname} = require('path')
const {platform, env, argv} = require('process')
const {app, BrowserWindow} = require('electron')
const mkurl = require('./lib/mkurl.js')

const ignoredexts = new Set(['', '.js', '.exe', '.app', '.sh', '.cmd', '.com'])

let win = null
let startfile = argv.find(path => path[0] !== '-' && !ignoredexts.has(extname(path)))

init()
app.on('ready', createWindow)
app.on('activate', () => win || createWindow())
app.on('window-all-closed', () => platform !== 'darwin' && app.quit())
app.on('open-file', onOpenFile)
app.on('open-url', onOpenFile)

function init() {
    app.commandLine.appendSwitch(
        'ppapi-flash-path',
        resolvePath(env.PEPPER_FLASH || app.getPath('pepperFlashSystemPlugin') || 'pepperflash')
    )
}

function createWindow() {

    const {webContents} = win = new BrowserWindow({
        show: false,
        autoHideMenuBar: false,
        hasShadow: true,
        frame: false,
        transparent: true,
        webPreferences: {
            plugins: true,
            nodeIntegration: true
        }
    })

    win.loadURL(mkurl(joinPath(__dirname, 'page', 'index.xml')))
    win.focus()

    win.on('closed', () => win = null)

    win.once('ready-to-show', () => {
        win.show()
        startfile && webContents.send('open-file', mkurl(startfile))
    })

    win.on('focus', () => webContents.send('focus'))

    win.on('blur', () => webContents.send('blur'))


}

function onOpenFile(event, path) {
    event.preventDefault()
    if (win) {
        win.webContents.send('open-file', mkurl(path))
    } else {
        startfile = path
    }
}
