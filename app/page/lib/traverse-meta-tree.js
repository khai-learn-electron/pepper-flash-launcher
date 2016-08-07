
'use strict'

function traverseMetaTree(tree, prehandles, posthandles, args = []) {

    const preresponse = prehandles.call(tree, ...args)

    const childrenresponse = []
    for (let child of tree.children) {
        childrenresponse.push(traverseMetaTree(child, prehandles, posthandles, args))
    }

    const postresponse = posthandles.call(tree, ...args)

    return {
        tree,
        preresponse,
        childrenresponse,
        postresponse,
        __proto__: null
    }
}

module.exports = traverseMetaTree
