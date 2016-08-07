
'use strict'

const {assign} = Object

class ExtendedImageElement extends Image {

    constructor(properties = {}, attributes = {}) {

        super()

        for (const pname in properties) {
            const value = properties[pname]
            if (typeof value === 'object' && value) {
                assign(this[pname], value)
            } else if (value !== undefined) {
                this[pname] = value
            }
        }

        for (const aname in attributes) {
            this.setAttribute(aname, attributes[aname])
        }

    }

    on(...args) {
        this.addEventListener(...args)
        return this
    }

    static fromUrl(src) {
        return new OwnImage({src})
    }

    static fromSize(width, height) {
        return new OwnImage({width, height})
    }

    static fromSizeUrl(width, height, src) {
        return new OwnImage({width, height, src})
    }

}

module.exports = ExtendedImageElement
