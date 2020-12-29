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

            await voiceUtils.joinVoice(channelToJoin, currentChannel, VoiceControl).catch((err) => {
                throw err;
            })
            VoiceControl.queue.push(url);
            if (url.includes("http://") || url.includes("https://")) {
                if (url.includes("youtube") || url.includes("youtu.be")) {
                    let readableStream = ytdl(url);
                    readableStream
                        .on('info', (info, format) => {
                            VoiceControl.frontQueue.push(info.videoDetails.title);
                            // let fileName = info.title.replace(/[^a-z0-9\-]/gi, '_');
                            // let container = format.container;
                            // let writeableSteam = fs.createWriteStream(`${fileName}.${container}`);
                            // readableStream.pipe(writeableSteam);
                        })
                        .on('error', (error, format) => {
                            console.log(error.message);
                            message.channel.send(error.message);
                        });
                    if (VoiceControl.isPlaying == false) {
                        voiceUtils.playYoutube(VoiceControl, message);
                    }
                }
            }
        } catch (error) {
            console.log(error);
            message.channel.send(error);
        }
    }
}
