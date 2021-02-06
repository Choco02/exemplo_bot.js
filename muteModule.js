module.exports = function (client) {
    const muted = JSON.parse(readFileSync('./muted.json'))
    //console.log(muted)
    const guilds = Object.keys(muted)
    // console.log(guilds)
    const entries = Object.entries(muted)
    //console.log(entries)
    //console.log(entries[0][0])
    
    guilds.forEach(g => {
        console.log(g)
        // console.log(muted[g])
        muted[g].forEach(async user => {
            // console.log(user)
            if (Date.now() > user.time) {
                console.log('Mute desse usuario ja terminou')
                try {
                    const guild = client.guilds.cache.get(g)
                    const member = await guild.members.fetch(user)
                    await member.roles.remove(guild.roles.cache.find(r => r.name === "Mute 🤡"))
                    await guild.channels.cache.get(user.channel).send(`${member} desmutado`)
                    muteManager.muteDelete(g, user.user)
                }
                catch(err) {
                    console.log(err.stack)
                }
            }

        })
    })
}