module.exports = {
    name: 'sound',
    description: 'this is the soundboard command.',
    execute(message, args) {
        const channel = message.member.voice.channel;
        const dispatcher = channel.join()
            .then((connection) => {
                connection.play(`soundboard/${args}.mp3`)
                console.log(`soundboard/${args}.mp3`);
            }).catch((error) => {
                console.log(error);
                message.channel.send(error);
            });
    }
}
