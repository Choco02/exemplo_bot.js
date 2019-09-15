const superagent = require('superagent')
const qs = require('querystring')

exports.run = async (client, message, args) => {
  // command by <@551658291474989076>
  if(!args[0]) return message.reply("Me passe algum argumento pra eu pesquisar 😉")
  
  const source = 'https://raw.githubusercontent.com/discordjs/discord.js/docs/stable.json'
  const queryString = qs.stringify({src: source, q: args.join(' ')})
  const { body: embed } = await superagent.get(`https://djsdocs.sorta.moe/v2/embed?${queryString}`)
  if (!embed) return message.reply("Algo deu errado 😔")

  message.channel.send({embed})
  
}

exports.config = {
  name: 'docs',
  aliases: ['docs']
}
