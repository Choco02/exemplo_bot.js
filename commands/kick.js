const Discord = require('discord.js')

exports.run = (client, message, args) => {
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('\`❌\`| Você não tem permissão de kick')
    if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('\`😐\`| Não tenho permissão de kick aqui... :thinking: ')
    if (!args[0]) return message.channel.send('Se usa assim \`kick @mention\` ou \`kick ID\`')

    let mention = message.mentions.members.first()
    let member = mention? mention: message.guild.members.cache.get(args[0])

    const embed = new Discord.MessageEmbed()
    if (!member) return message.channel.send(embed
        .setColor('#f00000')
        .setDescription(`\`❌\`| Usuário não encontrado`))
    
    if (!member.kickable) return message.channel.send(embed
        .setColor('#f00000')
        .setDescription('Não posso kickar esse membro!'))
    
    member.kick()
        .then(m => message.reply(embed
            .setColor('#00ff95')
            .setDescription(`\`✅\`| ${m.user.tag}/ <@${m.user.id}> foi kickado do server!`)).delete({timeout: 5000}))

        .catch(() => message.channel.send(embed
            .setDescription(`\`❌\`| Erro ao kickar usuário`)))
}

exports.config = {
    name: 'kick',
    aliases: ['kick', 'expulsar']
}
