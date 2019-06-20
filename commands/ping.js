const Discord = require('discord.js')

exports.run = (cake, message, args) => {
    const embed = new Discord.RichEmbed()
    .setDescription(`Estou com ${Math.floor(cake.ping)} de ping!`)

    message.channel.send(embed)
}

/**************************************************************************/
exports.config = { // module.exports.config
    name: 'ping',
    aliases: ['ping']
}