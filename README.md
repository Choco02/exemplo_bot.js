## Todos os comandos devem estar dentro da pasta *commands* e seguindo o modelo

```js
exports.run = (client, message, args) => {
    /* Todo o codigo aqui
    *
    *
    *
    *
    *
    */
} // <-- Verifique bem onde fecha o comando

/********************/
exports.config = {
    name: 'nomeDoComando',
    aliases: ['nomeDoComando', 'alternativas']
}
// ↑ Como é handler com aliases, tem que ter sempre essa parte acima em todo comando

```

Você precisa criar seu arquivo *package.json* com comando **npm init -y** e instalar a lib/biblioteca *discord.js* com comando **npm i discord.js**

# Alguns problemas comuns na hora de criar seu bot

* Veja se seu você instalou [Node.js](https://nodejs.org/pt-br/download/)
* Evite criar nome da pasta do projeto com espaço, por exemplo *Meu Bot*, mude para MeuBot ou Meu-Bot
* Verique seu *package.json* e veja se o campo "name" está tudo em minúsculo e sem espaço:
    * Assim é válido "name": "meu-bot"
    * Assim **NÃO** "name": "meu bot" ou "name": "MeuBot"