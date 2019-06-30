## Todos os comandos devem estar dentro da pasta *commands* e seguindo o modelo

```js
exports.run = (client, message, args) => {
    // Todo o codigo aqui

} // <-- Verifique bem onde fecha o comando

/********************/
exports.config = {
    name: 'nomeDoComando',
    aliases: ['alternativas']
}
// ↑ Como é handler com aliases, tem que ter sempre essa parte acima em todo comando

```