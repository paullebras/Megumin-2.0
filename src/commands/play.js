const ytdl = require('ytdl-core');
const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');

module.exports = {
    name: 'play',
    description: 'Joue l\'audio d\'une vidéo sur Youtube. A l\'avenir, divers sites seront pris en charge.',
    usage: 'play <youtube URL>',
    type: ':notes: Music',
    async execute(message, args, VoiceControl) {
        try {
            const url = args[0];

            if (!url.includes('http://') && !url.includes('https://')) {
                throw ('La recherche de vidéos par titre n\'a pas encore été implémentée');
            }
            if (!url.includes('giyoutube') && !url.includes('youtu.be')) {
                throw ('La lecture de contenus extérieurs à YouTube n\'a pas encore été implémentée');
            }

            const channelToJoin = message.member.voice.channel;
            const currentChannel = voiceUtils.getUserCurrentChannelFromMsg(message);

            // 1 << 62 gives the biggest number
            // dlChunkSize: disabling chunking is recommended in discord bot
            const audioParams = {
                filter: 'audioonly',
                fmt: 'mp3',
                highWaterMark: 1 << 62,
                liveBuffer: 1 << 62,
                dlChunkSize: 0,
                bitrate: 128,
                quality: 'lowestaudio',
            };
            await voiceUtils.joinVoice(channelToJoin, currentChannel, VoiceControl)
                .catch((error) => {
                    throw (error);
                });
            VoiceControl.queue.push(url);
            const readableStream = ytdl(url);
            readableStream
                .on('info', (info/* , format */) => {
                    VoiceControl.frontQueue.push(info.videoDetails.title);
                    // let fileName = info.title.replace(/[^a-z0-9\-]/gi, '_');
                    // let container = format.container;
                    // let writeableSteam = fs.createWriteStream(`${fileName}.${container}`);
                    // readableStream.pipe(writeableSteam);
                })
                .on('error', (error/* , format */) => {
                    utils.logError(error.message);
                });
            if (VoiceControl.isPlaying == false) {
                const audio = ytdl(VoiceControl.queue[VoiceControl.queueIndex], audioParams);
                voiceUtils.playAudio(audio, VoiceControl, { volume: 1.0 }/* , message */, false);
            }
        }
        catch (error) {
            utils.logError(error, message.channel);
        }
    },
};
