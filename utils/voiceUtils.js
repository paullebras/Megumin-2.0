const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');
const utils = require('../utils/utils.js');

module.exports = {

    getCurrentChannelFromMsg: function (VoiceControl, message) {

        let currentChannel;
        if (VoiceControl.connection) {
            const id = VoiceControl.connection.joinConfig.channelId
            currentChannel = message.guild.channels.cache.find(element => (element.id.includes(id)));
        }
        return currentChannel
    },

    joinVoice: function (requestedChannel, currentChannel, VoiceControl) {
        return new Promise((resolve, reject) => {
            try {
                if (!requestedChannel && !currentChannel) {
                    throw ("Désolée, l'un de nous deux doit être dans un canal vocal");
                }
                if (requestedChannel) {
                    if (currentChannel != requestedChannel) {
                        VoiceControl.connection = joinVoiceChannel({
                            channelId: requestedChannel.id,
                            guildId: requestedChannel.guild.id,
                            adapterCreator: requestedChannel.guild.voiceAdapterCreator,
                        });
                    } else {
                        resolve();
                    }
                }
                resolve();
            } catch (error) {
                reject(error)
            }
        })
    },

    destroyConnection: function (VoiceControl, connection) {
        connection.destroy();
        VoiceControl.connection = null;
        return;
    },

    pausePlayer: function (player) {
        player.pause();
    },

    resumePlayer: function (player) {
        player.unpause();
    },

    stopPlayer: function (player) {
        player.stop();
    },

    playResource: function (path, VoiceControl, volume) {
        const resource = createAudioResource(path);
        VoiceControl.player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });
        VoiceControl.player.play(resource, volume);
        VoiceControl.connection.subscribe(VoiceControl.player);
    },

    playYoutube: function (VoiceControl, message) {
        try {
            const resource = createAudioResource(ytdl(VoiceControl.queue[VoiceControl.queueIndex], { filter: 'audioonly' }));

            VoiceControl.player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause,
                },
            });
            VoiceControl.player.play(resource)
            VoiceControl.player
                .on('info', (info, format, error) => {
                    const videoDetails = info.videoDetails;
                    message.channel.send(`this song was requested: \`${videoDetails.title}\``);
                    VoiceControl.frontQueue.push(videoDetails.title);
                    if (VoiceControl.isPlaying == false) {
                        voiceUtils.playYoutube(VoiceControl, message);
                    }
                    // let fileName = info.title.replace(/[^a-z0-9\-]/gi, '_');
                    // let container = format.container;
                    // let writeableSteam = fs.createWriteStream(`${fileName}.${container}`);
                    // readableStream.pipe(writeableSteam);
                })
                .on('start', () => {
                    VoiceControl.isPlaying = true;
                })
                .on('finish', () => {
                    if (VoiceControl.queue.length >= VoiceControl.queueIndex + 2) {
                        VoiceControl.queueIndex += 1;
                        module.exports.playYoutube(VoiceControl, message);
                    } else {
                        VoiceControl.isPlaying = false;
                    }
                })
                .on('error', (error) => {
                    utils.logError(error.message);
                })
            VoiceControl.connection.subscribe(VoiceControl.player);
        } catch (error) {
            throw (error);
        }
    }
}