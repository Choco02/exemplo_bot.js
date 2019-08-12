const Discord = require("discord.js")
const client = new Discord.Client()
const config = require("./config.json")
const fs = require('fs')
let Cake

client.on("ready", async () => {
    console.log(`Estou funcionando ♡ e conheço ${client.users.size} usuários`)
    Cake = await client.fetchUser('551658291474989076')
    //client.user.setActivity(`Estou em ${client.guilds.size} servidores e conheço ${client.users.size} pessoas ♡`)
    const activity = [
                    {name: `Estou em ${client.guilds.size} servidores e conheço ${client.users.size} pessoas ♡`, type: 1, url: "https://www.twitch.tv/cellbit"},
                    {name: `Dancin Krono Remix 🎧`, type: 2/*, url: "https://www.twitch.tv/cellbit"*/},
                    {name: `Fui criada por ${Cake.tag}`, type: 1, url: "https://www.twitch.tv/cellbit"}]
    
    setInterval(function() {
        let random = Math.floor(Math.random() * activity.length)
        client.user.setPresence({game: activity[random]})
    }, 15000)
})


client.on('message', async message => {
    if (message.author.bot) return
    if (message.channel.type == 'dm') return
    let member = message.mentions.members.first()
    if (member)
        if (member.id == `${client.user.id}`)
            message.channel.send(`Oiin eu sou a Chocola ♡, uma bot kawaii criada por \`${Cake.tag}\`. \nUse \`c.help\` para ver meus comandos \`^3^\``)
        
    if (!message.content.startsWith(config.prefix)) return
    
    const args = message.content.slice(config.prefix.length).trim()
    .split(/ +/g)
    const command = args.shift().toLowerCase()
    
    
    fs.readdir('./commands', (err, files) => {
        if (err) console.log(err)
        
        let jsfile = files.filter(f => f.split('.').pop() === 'js')
        //console.log(jsfile)
        if (jsfile.length <= 0) {
            console.log('Comando não encontrado :c')
            return
        }
        jsfile.forEach((f) => {
            let pull = require(`./commands/${f}`)
            //console.log(`${f} loaded`)
            if (pull.config.aliases.includes(command)) pull.run(client, message, args)
        })
    }) 
})


client.login(config.token)
