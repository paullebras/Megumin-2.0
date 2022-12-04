const ytdl = require('ytdl-core');
const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');

module.exports = {
    name: 'skip',
    description: 'This command allows to play the next video in queue.',

    async execute(message, VoiceControl) {
        try {
            if (VoiceControl.queue.length >= VoiceControl.queueIndex + 2) {
                VoiceControl.queueIndex += 1;
                const audioParams = {
                    filter: 'audioonly',
                    fmt: 'mp3',
                    highWaterMark: 1 << 62,
                    liveBuffer: 1 << 62,
                    dlChunkSize: 0,
                    bitrate: 128,
                    quality: 'lowestaudio',
                };
                const audio = ytdl(VoiceControl.queue[VoiceControl.queueIndex], audioParams);
                voiceUtils.playAudio(audio, VoiceControl, { volume: 1.0 }/* , message */, false);
                utils.reactMessage('✅', message);
                return;
            }
            if (VoiceControl.queue.length >= VoiceControl.queueIndex + 1) {
                await voiceUtils.stopPlayer(VoiceControl.player);
                utils.reactMessage('✅', message);
            }
            message.channel.send('Désolée, la queue est vide.');
        }
        catch (error) {
            utils.logError(error, message.channel);
        }

    },
};
