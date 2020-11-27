const { readFileSync, writeFileSync, readdirSync } = require('fs')

if (!readdirSync('./').includes('muted.json')) writeFileSync('./muted.json', '{}')

// console.log(readdirSync('./'))
// console.log(muted)
function jsonSave(jsonObj) {
    writeFileSync('./muted.json', JSON.stringify(jsonObj, null, ' '))
}

function muteCreate (guild, mutedUser, time, staff, reason, channel) {
    const muted = JSON.parse(readFileSync('./muted.json'))
    // const mutedUser = user
    // const staff = staff

    // console.log(muted)

    if (time.includes('m')) {
        time = Number(time.split('m')[0]) * 60 * 1000

        // console.log(time)
    }
    else if (time.includes('h')) {
        time = Number(time.split('h')[0]) * 60 * 60 * 1000
    
        // console.log(time)
    }

    else if (time.includes('d')) {
        time = Number(time.split('d')[0]) * 24 * 60 * 60 * 1000

        // console.log(time)
    }

    const userData = {
        user: mutedUser,
        time: time + Date.now(),
        motivo: reason,
        staff: staff,
        channel: channel
    }

    if (!muted[guild]) muted[guild] = []

    const usersAreMuted = muted[guild].map(u => u.user)
    // console.log(usersJaMutados)

    if (!usersAreMuted.includes(mutedUser)) {
        muted[guild].push(userData)
    }
    else {
        return "Ja esta mutado"
        console.log('User ja esta mutado')
    }


    // console.log(muted)

    jsonSave(muted)

}

function muteDelete (guild, user) {

    const muted = JSON.parse(readFileSync('./muted.json'))
    // console.log(muted[guild])
    const m = muted[guild].map(a => a.user)
    // const keys = Object.keys(m)
    if (!muted[guild]) {
        muted[guild] = []
        jsonSave(muted)
        return console.log('Nao ha usuarios mutados')
    }
    else if (muted[guild].length < 1) {
        return console.log('Nao ha usuarios mutados')
    }
    else if (m.includes(user)) {
        const userId = muted[guild].map(u => u.user)[0]
        // console.log(userId)
        const userObject = muted[guild].find(u => u.user == userId)
        // console.log(userObject)
        const userObjectIndex = muted[guild].indexOf(userObject)
        // console.log(userObjectIndex)
        muted[guild].splice(userObjectIndex, 1)
        // console.log(muted[guild])
        jsonSave(muted)
        return console.log("Mute removido")
    }

}
// muteCreate("123", "321", "5m", "0231", "raid")
// muteCreate("123", "002", "1m", "0231", "raid")
// muteCreate("321", "321", "1m", "0231", "raid")

module.exports.muteCreate = muteCreate

module.exports.muteDelete = muteDelete