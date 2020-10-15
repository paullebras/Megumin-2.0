module.exports = {
    name: 'sound',
    description: 'this is the soundboard command.',
    execute(message, args, type) {
        try {
            const voiceChannel = message.member.voice.channel;
            if (voiceChannel == undefined) {
                err = 'Désolée, tu dois être dans un channel vocal.';
                console.log(err);
                message.channel.send(err);
                return
            }
            const dispatcher = voiceChannel.join().then((connection) => {
                if (type == 'sound')
                    connection.play(`soundboard/${args}.mp3`);
                if (type == 'music')
                    connection.play(`music/${args}.m3u`);
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

