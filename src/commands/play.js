const ytdl = require('ytdl-core');
const { EmbedBuilder } = require('discord.js');
const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');
const services = require('../core/services.js');

function createPlayEmbed(videoInfo, videoUrl, username) {
    const title = videoInfo.videoDetails.title;
    const channel = videoInfo.videoDetails.author.name;
    const durationSeconds = videoInfo.videoDetails.lengthSeconds;
    const video_id = videoUrl.split('=')[1];
    const thumbnail = `https://i.ytimg.com/vi/${video_id}/default.jpg`;
    const playEmbed = new EmbedBuilder()
        .setColor(0x000000)
        .setTitle(title)
        .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        .setDescription(channel)
        .setThumbnail(thumbnail)
        .addFields({ name: 'Durée : ', value: utils.secondsToHms(durationSeconds), inline: true })
        .addFields({ name: 'Demandée par : ', value: username, inline: true });

    return playEmbed;
}


module.exports = {
    name: 'play',
    description: 'Joue l\'audio d\'une vidéo sur Youtube. A l\'avenir, divers sites seront pris en charge.',
    usage: 'play <youtube URL>',
    type: ':notes: Music',
    async execute(message, args, VoiceControl) {
        try {

            // TODO use writeStream ?
            // const fileName = info.videoDetails.title.replace(/[^a-z0-9-]/gi, '_');
            // let container = format.container;
            // let writeableSteam = fs.createWriteStream(`${fileName}.${container}`);
            // readableStream.pipe(writeableSteam);
            if (args.length == 0) {
                throw ('La lecture auto de la playlist n\'a pas encore été implémentée');
            }

            const keywords = args;
            let url;

            if (!keywords.includes('http://') && !keywords.includes('https://')) {
                const searchData = await services.searchYoutube(keywords);
                const videoId = searchData.data.items[0].id.videoId;
                url = `https://www.youtube.com/watch?v=${videoId}`;
            }
            if (!url.includes('youtube') && !url.includes('youtu.be')) {
                throw ('La lecture de contenus extérieurs à YouTube n\'a pas encore été implémentée');
            }

            const videoInfo = await ytdl.getBasicInfo(url);
            VoiceControl.queue.push(url);
            VoiceControl.frontQueue.push(videoInfo.videoDetails.title);
            VoiceControl.durationQueue.push(videoInfo.videoDetails.lengthSeconds);

            if (VoiceControl.isPlaying == true) {
                return;
            }

            const channelToJoin = message.member.voice.channel;
            const currentChannel = await voiceUtils.getUserCurrentChannelFromMsg(message);

            await voiceUtils.joinVoice(channelToJoin, currentChannel, VoiceControl)
                .catch((error) => {
                    throw (error);
                });

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
            const readableStream = ytdl(VoiceControl.queue[VoiceControl.queueIndex], audioParams);
            readableStream
                .on('error', (error/* , format */) => {
                    utils.logError(error.message);
                });
            await voiceUtils.playAudio(readableStream, VoiceControl, { volume: 1.0 }/* , message */, false);
            const playEmbed = createPlayEmbed(videoInfo, url, message.author.username);
            utils.sendMessageWithCustomEmbed(playEmbed, message.channel);

        }
        catch (error) {
            utils.logError(error, message.channel);
        }
    },
};
