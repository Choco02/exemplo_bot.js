const { Client, Collection } = require("discord.js")
const client = new Client()
const config = require("./config.json")
const { readdirSync, readFileSync, writeFileSync } = require('fs')
if (!readdirSync('./').includes('muted.json')) writeFileSync('./muted.json', '{}')
const muteManager = require('./muteManager')
let Cake
const githubUrl = "github.com/Choco02/exemplo_bot.js"

client.commands = new Collection()
client.aliases = new Collection()

function loadCommands() {
    const commands = readdirSync('./commands').filter(file => file.endsWith('.js'))
    if (commands.length < 1) return console.log('Comando nao encontrado')
    commands.forEach(f => {
        const pull = require(`./commands/${f}`)
        console.log(`* Comando ${f} carregado`)
        client.commands.set(pull.config.name, pull)
        pull.config.aliases.forEach(alias => {
            client.aliases.set(alias, pull)
        })
    })
    console.log(`${client.commands.size} comandos carregados`)
    /*
    console.log('commands')
    console.log(client.commands)
    console.log('\n\n\n')
    console.log('aliases')
    console.log(client.aliases)
    */
}

function muteCheck() {
    const muted = JSON.parse(readFileSync('./muted.json'))
    //console.log(muted)
    const guilds = Object.keys(muted)
    // console.log(guilds)
    const entries = Object.entries(muted)
    //console.log(entries)
    //console.log(entries[0][0])
    
    guilds.forEach(g => {
        console.log(g)
        // console.log(muted[g])
        muted[g].forEach(async user => {
            // console.log(user)
            if (Date.now() > user.time) {
                console.log('Mute desse usuario ja terminou')
                try {
                    const guild = client.guilds.cache.get(g)
                    const member = await guild.members.fetch(user)
                    await member.roles.remove(guild.roles.cache.find(r => r.name === "Mute 🤡"))
                    await guild.channels.cache.get(user.channel).send(`${member} desmutado`)
                    muteManager.muteDelete(g, user.user)
                }
                catch(err) {
                    console.log(err.stack)
                }
            }

        })
    })
}

client.on("ready", async () => {
    Cake = await client.users.fetch('551658291474989076')
    console.log(`${client.user.tag} online`)
    console.log(`Código original criado por ${Cake.tag}`)
    console.log('-'.repeat(30))
    //client.user.setActivity(`Estou em ${client.guilds.size} servidores e conheço ${client.users.size} pessoas ♡`)
    const activity = [
                    {name: `Estou em ${client.guilds.cache.size} servidores`, type: 1, url: "https://www.twitch.tv/cellbit"},
                    {name: `Dancin Krono Remix 🎧`, type: 2/*, url: "https://www.twitch.tv/cellbit"*/},
                    {name: `Codigo original criado por ${Cake.tag}`, type: 1, url: "https://www.twitch.tv/cellbit"},
                    {name: githubUrl, type: 2}
                ]
    
    setInterval(function() {
        let random = Math.floor(Math.random() * activity.length)
        client.user.setPresence({game: activity[random]})
    }, 15000)

    loadCommands()
    setInterval(muteCheck, 30 * 1000)
})


client.on('message', async message => {
    if (message.author.bot) return
    if (message.channel.type == 'dm') return
    const mention = message.mentions.members.first()
    if (mention && mention.id == client.user.id)
        message.channel.send(`*Use \`${config.prefix}help\` para ver meus comandos*`)
        
    if (!message.content.startsWith(config.prefix)) return
    
    const args = message.content.slice(config.prefix.length).trim()
        .split(/ +/g)
    const command = args.shift().toLowerCase()

    const exec = client.commands.get(command) || client.aliases.get(command)
    if (!exec) return message.channel.send(`Comando \`${command}\` nao encontrado`)
    try {
        exec.run(client, message, args)
    }
    catch(err) {
        console.log('Algo deu errado ao executar o comando ' + command)
        console.log(err.stack)
    }
    
     
})


client.login(config.token)
