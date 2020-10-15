const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    description: 'this is the music command.',
    execute(message, args, client) {
        try {
            const voiceChannel = message.member.voice.channel;

            if (voiceChannel == undefined) {
                err = 'Désolée, tu dois être dans un channel vocal.';
                console.log(err);
                message.channel.send(err);
                return
            }

            const dispatcher1 = voiceChannel.join().then((connection) => {
                const dispatcher2 = connection.play(ytdl(args[0], { filter: 'audioonly' }));
                setTimeout(client.commands.get('play').pause(dispatcher2, message), 20000);

                //client.dispatcher = dispatcher2;
            }).catch((err) => {
                console.log(String(err));
                message.channel.send(String(err));
            });


        } catch (err) {
            console.error(String(err));
            message.channel.send(String(err));
        }
    },

    pause(dispatcher, message) {
        console.log('pause');
        message.channel.send('pause');
        dispatcher.pause();
    }
}
