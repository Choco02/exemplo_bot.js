const Discord = require('discord.js')
exports.run = (client, message, args) => {
    const mention = message.mentions.members.first()
    let Member = mention? mention: message.guild.members.get(args[0])
    if (!Member) Member = message.member
    const embed = new Discord.RichEmbed()
        .setColor('#42a1f5')
        .setImage(Member.user.displayAvatarURL)
    
    if (!args[0]) return message.channel.send(embed.setTitle(message.author.tag))

    message.channel.send(embed.setTitle(Member.user.tag))
}


exports.config = {
    name: 'avatar',
    aliases: ['avatar', 'av']
}