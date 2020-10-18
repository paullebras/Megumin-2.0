const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    description: 'this is the music command.',

    async execute(message, args, client, VoiceControl) {
        const url = args[0];
        const voiceChannel = message.member.voice.channel;

        if (client.commands.get('play').checkVoice(message, voiceChannel)) {
            VoiceControl.queue.push(url);
            console.log('VoiceControl.queue =', VoiceControl.queue)
            if (VoiceControl.isPlaying == false) {
                await client.commands.get('play').play(voiceChannel, VoiceControl);
                VoiceControl.queueIndex += 1;
            }
        }

    },


    checkVoice(message, voiceChannel) {
        if (voiceChannel == undefined) {
            err = 'Désolée, tu dois être dans un channel vocal.';
            console.log(err);
            message.channel.send(err);
            return false;
        }
        else {
            return true;
        }
    },


    play(voiceChannel, VoiceControl) {
        return new Promise((resolve, reject) => {
            try {
                console.log('ca');
                voiceChannel.join().then((connection) => {
                    console.log('cb');
                    console.log('VoiceControl.queueIndex =', VoiceControl.queueIndex);
                    console.log('VoiceControl.queue[VoiceControl.queueIndex] =', VoiceControl.queue[VoiceControl.queueIndex]);
                    VoiceControl.dispatcher = connection.play(ytdl(VoiceControl.queue[VoiceControl.queueIndex], { filter: 'audioonly' }))
                        .on('start', () => {
                            console.log('cc');
                            VoiceControl.isPlaying = true;
                        })
                        .on('finish', () => {
                            VoiceControl.isPlaying = false;
                        });
                    resolve();
                }).catch((err) => {
                    console.log(String(err));
                    message.channel.send(String(err));
                    reject();
                });
            } catch (err) {
                console.error(String(err));
                message.channel.send(String(err));
                reject();
            }
        })
    }
}
