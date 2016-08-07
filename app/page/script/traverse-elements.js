
'use strict'

; (({document, window}) => {

    const rootdir = global.__dirname
    const traverse = require(`${rootdir}/lib/traverse-meta-tree.js`)
    const {prehandles, posthandles} = require(`${rootdir}/script/src/traverse-elements`)

    traverse(document.documentElement, prehandles, posthandles, [window])

})(window)
