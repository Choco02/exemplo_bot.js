exports.run = async (client, message, args) => {
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Não tenho permissão de gerenciar canais')
    if (message.guild.channels.find(ch => ch.name.includes(message.author.id))) return message.reply('Já existe um canal criado pra você 🐒')
    
    let channel // declarando variavel global channel que é o canal que vai ser criado e marcado a pessoa que deu comando
    try { // ← Tentar criar o canal, se nao conseguir cai no catch
        channel = await message.guild 
            .createChannel(`${message.member.displayName}•${message.author.discriminator}┋${message.author.id}`,
                {permissionOverwrites: [{
                    id: message.guild.id, // permissoes para cargo @everyone (todo mundo)
                    deny: ['READ_MESSAGES'], // permissoes de nao ver o canal (ler mensagens)
                },
                {
                    id: message.author.id, // permissoes para quem digitou o comando
                    allow: ['READ_MESSAGES', 'SEND_MESSAGES'] // essa pessoa pode ver o canal e enviar mensagens
                }]
            })
        }
    catch(err) {
        message.channel.send('Erro: ' + err.message) 
    }
        
        let timeout = await channel.send(`<@${message.author.id}>`) // espera o canal ser criado e marca o membro
            .catch(err => message.channel.send('Erro: ' + err.message))
        timeout.delete(5000) // deleta a mensagem que ping que avisou o membro do canal criado
        setTimeout(() => channel.delete() // tenta deletar o canal
            .then(c => message.channel.send(`\`Canal ${c.name} deletado ✅\``)) // avisa no canal que foi dado o comando que o canal foi deletado
            .catch(err => message.channel.send('Erro: ' + err.message)), 1000 * 60) // 1000 * 60 == 1 minuto em milissegundos (ms)
}

exports.config = {
    name: 'ticket',
    aliases: ['ticket']
}