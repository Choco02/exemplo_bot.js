exports.run = async (client, message, args) => {
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Não tenho permissão de gerenciar canais')
    if (message.guild.channels.cache.find(ch => ch.topic?.includes(message.author.id))) return message.reply('Já existe um canal criado pra você 🐒')

    const permsEveryone = {
        id: message.guild.id, // permissoes para cargo @everyone (todo mundo)
        deny: ['VIEW_CHANNEL'] // permissoes de nao ver o canal (ler mensagens)
    }

    const permsUser = {
        id: message.author.id, // permissoes para quem digitou o comando
        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] // essa pessoa pode ver o canal e enviar mensagens
    }

    const emotes = ["✅", "❌"]
    const [ yep, nop ] = emotes

    const msg = await message.reply('Confirme a criacao de seu canal')
    emotes.forEach(async r => await msg.react(r))

    const collector = msg.createReactionCollector((reaction, user) => emotes.includes(reaction.emoji.name) && user.id == message.author.id, {
        time: 60 * 1000
    })

    collector.on('collect', async reaction => {
        if (reaction.emoji.name == yep) {
            await collector.stop()
            channelCreate()
        }
        else if (reaction.emoji.name == nop) {
            collector.stop()
            msg.delete({ timeout: 5 * 1000 })
        }
    })

    async function channelCreate() {
        let channel // declarando variavel global channel que é o canal que vai ser criado e marcado a pessoa que deu comando
        try { // ← Tentar criar o canal, se nao conseguir cai no catch
            channel = await message.guild.channels
                .create(`${message.member.displayName}•${message.author.discriminator}`,
                    {
                        topic: message.author.id,
                        permissionOverwrites: [ permsEveryone, permsUser ]
                    })
        }
        catch (err) {
            message.channel.send('Erro: ' + err.message)
        }

        let timeout = await channel.send(`${message.author}`) // espera o canal ser criado e marca o membro
            .catch(err => message.channel.send('Erro: ' + err.message))
        timeout.delete({ timeout: 5000 }) // deleta a mensagem que ping que avisou o membro do canal criado
        setTimeout(() => channel.delete() // tenta deletar o canal
            .then(c => message.channel.send(`\`Canal ${c.name} deletado ✅\``)) // avisa no canal que foi dado o comando que o canal foi deletado
            .catch(err => message.channel.send('Erro: ' + err.message)), 1000 * 60) // 1000 * 60 == 1 minuto em milissegundos (ms)
    }
}

exports.config = {
    name: 'ticket',
    aliases: ['ticket']
}