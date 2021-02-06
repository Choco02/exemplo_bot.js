const muteManager = require('../muteManager')
const { muteEnabled } = require('../config.json')
module.exports.run = async (client, message, args) => {
    if (!muteEnabled) {
        return console.log("Comando de mute desativado")
    }
    if (!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send('Voce nao tem permissao suficiente')
    if (!message.guild.me.permissions.has('KICK_MEMBERS')) return message.channel.send('Nao tenho permissao suficiente para isso')
    const rolePosition = message.guild.me.roles.highest.position - 1
    const howToUse = 'Modo de uso `mute {@usuario ou ID} 1m {motivo opcional}`\n`mute {@usuario ou ID} 1h`\n`mute {ID} 2d`'
    if (!args[0]) return message.channel.send(howToUse)
    if (!args[1]) return message.channel.send(howToUse)
    const reason = args.slice(2).join(" ") || "Sem motivo especificado"
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || await message.guild.members.fetch(args[0])

    let mutedRole = message.guild.roles.cache.find(r => r.name == "Mute 🤡")
    if (!mutedRole) {
        mutedRole = await message.guild.roles.create({
            data: {
                name: 'Mute 🤡',
                color: '#7C411C',
                position: rolePosition,
                permissions: 'VIEW_CHANNEL'
            },
        }, "Mute")
    }
    
    try {
        await user.roles.add(mutedRole, reason)
    }
    catch(err) {
        console.log(err.stack)
        return message.channel.send("Erro: " + err.message)
    }

    const result = muteManager.muteCreate(message.guild.id, user.id, args[1], message.member.id, reason, message.channel.id)
    if (result == "Ja esta mutado") return message.channel.send("Esse usuario ja esta mutado")
    message.channel.send(`${user} mutado por ${message.member} com motivo pelo tempo ${args[1]}`)
}

exports.config = {
    name: 'mute',
    aliases: ['mute', 'mutar']
}