module.exports = {
    name: 'pause',
    description: 'this is a ping command.',
    execute(message, args, client) {
        //console.log('message.guild =', message.guild);
        client.dispatcher.pause();
        console.log('dispatcher paused');
    }
}
