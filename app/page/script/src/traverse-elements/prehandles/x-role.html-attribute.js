
'use strict'

function main(element, window) {

    const {classList} = element
    const xRole = element.getAttribute('x-role')

    if (!xRole) {
        return
    }

    const roles = xRole.split(' ').filter(x => x)

    roles.forEach(rl => classList.add(`x-role-${rl}`))

    return roles
        .map(fname => require(`${__dirname}/x-role.html-attribute.lib/${fname}`))
        .map(handle => handle({window, element}))

}

module.exports = main
