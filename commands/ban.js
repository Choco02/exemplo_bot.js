const Discord = require('discord.js')

exports.run = (client, message, args) => {
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('\`❌\`| Você não tem permissão de banir')
    if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('\`😐\`| Não tenho permissão de banir aqui... :thinking: ')
    if (!args[0]) return message.channel.send('Se usa assim \`ban @mention\` ou \`ban ID\`')

    let mention = message.mentions.members.first()
    let member = mention? mention: message.guild.members.get(args[0])

    const embed = new Discord.RichEmbed()
    if (!member) return message.channel.send(embed
        .setColor('#f00000')
        .setDescription(`\`❌\`| Usuário não encontrado`))
    
    if (member.banable) return message.channel.send(embed
        .setColor('#f00000')
        .setDescription('Não posso banir esse membro!'))
    
    member.ban()
        .then(m => message.reply(embed
            .setColor('#00ff95')
            .setDescription(`\`✅\`| ${m.user.tag}/ <@${m.user.id}> foi banido do server!`)).delete(5000))

        .catch(() => message.channel.send(embed
            .setDescription(`\`❌\`| Erro ao banir usuário`)))
}

exports.config = {
    name: 'ban',
    aliases: ['ban', 'banir']
}