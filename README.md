
# Pepper Flash Launcher
Open shockwave flash files

## Building

### Prerequisites

 * Node >= 6.0.0, npm >= 3.0.0

 * Electron ^1.2.0

 * Pepperflash plugin

### Environment variables

 * `PATH` contains directory of electron

 * `PEPPER_FLASH` points to pepperflash plugin file

### Running

#### Using npm script

```bash
npm start /path/to/a/swf/file
```

#### Using Electron in Command-line

```bash
electron index.js /path/to/a/swf/file
```

#### Using Electron window

Drag project's index.js to Electron drop-zone

### Troubleshooting

#### Can't load plugin

You need to specify `/path/to/a/swf/file`

The architecture of Pepper Flash plugin has to match Electron’s one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

## License

MIT
