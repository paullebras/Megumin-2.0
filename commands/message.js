module.exports = {
    name: 'message',
    description: 'this is a message command.',
    execute(channel, text) {
        channel.send(text);
    }
}