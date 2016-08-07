
'use strict'

class FunctionList extends Array {
    call(...args) {
        return this.map(fn => fn(...args))
    }
}

module.exports = FunctionList
