const ytdl = require('ytdl-core');
const voiceUtils = require('../utils/voiceUtils.js');
const Config = require('../config/config.json');

module.exports = {
    name: 'play',
    description: 'this is the music command.',

    async execute(message, args, client, VoiceControl) {
        try {
            const url = args[0];
            const channelToJoin = message.member.voice.channel;
            const currentChannel = client.voice.connections.get(Config.server_id);
            // console.log('client.voice.connections =', client.voice.connections);

            await voiceUtils.joinVoice(channelToJoin, currentChannel, VoiceControl).catch((err) => {
                throw err;
            })
            VoiceControl.queue.push(url);
            if (VoiceControl.isPlaying == false) {
                await client.commands.get('play').play(VoiceControl);
                VoiceControl.queueIndex += 1;
            }
        } catch (err) {
            console.log(err);
            message.channel.send(err);
        }
    },


    play(VoiceControl) {
        return new Promise((resolve, reject) => {
            try {
                console.log('ca');
                console.log('cb');
                console.log('VoiceControl.queueIndex =', VoiceControl.queueIndex);
                console.log('VoiceControl.queue[VoiceControl.queueIndex] =', VoiceControl.queue[VoiceControl.queueIndex]);
                VoiceControl.dispatcher = VoiceControl.connection.play(ytdl(VoiceControl.queue[VoiceControl.queueIndex], { filter: 'audioonly' }))
                    .on('start', () => {
                        console.log('cc');
                        // console.log('VoiceControl =', VoiceControl);
                        console.log('cc2');
                        VoiceControl.isPlaying = true;
                    })
                    .on('finish', () => {
                        VoiceControl.isPlaying = false;
                    })
                    .on('error', (err) => {
                        console.log(String(err));
                        message.channel.send(String(err));
                        reject();
                    })
                resolve();
            } catch (err) {
                reject(err);
            }
        })
    }
}
