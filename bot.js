const Discord = require("discord.js")
const cake = new Discord.Client()
const config = require("./config.json")
const fs = require('fs')

cake.on("ready", () => {
    console.log(`Estou funcionando ♡ e conheço ${cake.users.size} usuários`)
    //cake.user.setActivity(`Estou em ${cake.guilds.size} servidores e conheço ${cake.users.size} pessoas ♡`)
    const activity = [
                    {name: `Estou em ${cake.guilds.size} servidores e conheço ${cake.users.size} pessoas ♡`, type: 1, url: "https://www.twitch.tv/cellbit"},
                    {name: `Dancin Krono Remix 🎧`, type: 2/*, url: "https://www.twitch.tv/cellbit"*/},
                    {name: `Fui criada por ${cake.users.get('551658291474989076').tag}`, type: 1, url: "https://www.twitch.tv/cellbit"}]
    
    setInterval(function() {
        let random = Math.floor(Math.random() * activity.length)
        cake.user.setPresence({game: activity[random]})
    }, 15000)
})


cake.on('message', async message => {
    if (message.author.bot) return
    if (message.channel.type === 'dm') return
    let member = message.mentions.members.first()
    if (member) 
        if (member.id == `${cake.user.id}`)
            message.channel.send(`Oiin eu sou a Chocola ♡, uma bot kawaii criada por \`${cake.users.get('551658291474989076').tag}\`. \nUse \`c.help\` para ver meus comandos \`^3^\``)
        
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
            if (pull.config.aliases.includes(command)) pull.run(cake, message, args)
        })
    }) 
})


cake.login(config.token)
