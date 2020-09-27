module.exports = {
    name: 'ping',
    description: 'this is a ping command.',
    execute(message, args) {
        message.channel.send(`${message.author.username}, le Destin nous a réunis !`);
    }
}
