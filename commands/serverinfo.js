const Discord = require('discord.js');
const client = new Discord.Client();
exports.run = (client, message, args) => {

    const moment = require('moment')
    moment.locale("pt-BR")
    let online = message.guild.members.cache.filter(a => a.presence.status == "online").size;
    let ocupado = message.guild.members.cache.filter(a => a.presence.status == "dnd").size;
    let ausente = message.guild.members.cache.filter(a => a.presence.status == "idle").size;
    let offline = message.guild.members.cache.filter(a => a.presence.status == "offline").size;
    let bot = message.guild.members.cache.filter(a => a.user.bot).size;
    let totalmembros = message.guild.memberCount;
    let canaistexto = message.guild.channels.cache.filter(a => a.type === "text").size;
    let canaisvoz = message.guild.channels.cache.filter(a => a.type === "voice").size;
        const embed = new Discord.MessageEmbed()
        .setTitle(`Informacoes do servidor **${message.guild.name}**`)
        .setColor("#36393E")
        .setThumbnail(message.guild.iconURL())
        .setTimestamp()
        .addField('• Atual dono do servidor:', `<@${message.guild.owner.id}>`)
        .addField('• Criado em:', moment(message.guild.createdAt).format('LLLL'))
        .addField("• ID:", message.guild.id)
        .addField(`• Membros [${totalmembros}]`, ` Online: ${online}\n Ausentes: ${ausente} Ocupados: ${ocupado}\n Offline: ${offline}\n Bots:${bot}`, true)
        .addField(`• Canais [${canaistexto+canaisvoz}]`, `💬 Texto: ${canaistexto}\n 🎧 Voz: ${canaisvoz}`, true)
        .setFooter(`Comando solicitado por: ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
    message.channel.send(embed)
}

exports.config = {
    name: "serverinfo",
    aliases: ["serverinfo", "server"]
}
