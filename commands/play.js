const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    description: 'this is the music command.',
    execute(message, args) {
        try {
            const voiceChannel = message.member.voice.channel;
            if (voiceChannel == undefined) {
                err = 'Désolée, tu dois être dans un channel vocal.';
                console.log(err);
                message.channel.send(err);
                return
            }
            const dispatcher = voiceChannel.join().then((connection) => {
                connection.play(ytdl(args[0], { filter: 'audioonly' }));
            }).catch((err) => {
                console.log(String(err));
                message.channel.send(String(err));
            });
        } catch (err) {
            console.error(String(err));
            message.channel.send(String(err));
        }
    }
}