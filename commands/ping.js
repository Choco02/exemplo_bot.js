const Discord = require('discord.js')

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setDescription(`Estou com ${Math.floor(client.ping)} de ping!`)

    message.channel.send(embed)
}

/**************************************************************************/
exports.config = { // module.exports.config
    name: 'ping',
    aliases: ['ping']
}