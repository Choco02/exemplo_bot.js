const Discord = require('discord.js')

exports.run = (client, message, args) => {
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('\`❌\`| Você não tem permissão de kick')
    if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('\`😐\`| Não tenho permissão de kick aqui... :thinking: ')
    if (!args[0]) return message.channel.send('Se usa assim \`kick @mention\` ou \`kick ID\`')

    let mention = message.mentions.members.first()
    let member = mention? mention: message.guild.members.get(args[0])

    if (member.kickable) return message.channel.send('Não posso kickar esse membro!')
    member.kick()
        .then(m => message.reply(`\`✅\`| ${m.user.tag}/ <@${m.user.id}> foi kickado do server!`).delete(5000))
        .catch(() => message.channel.send(`\`❌\`| Erro ao kickar usuário`))
    
}

exports.config = {
    name: 'kick',
    aliases: ['kick', 'expulsar']
}