const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection } = require('@discordjs/voice');
const { NoSubscriberBehavior, AudioPlayerStatus } = require('@discordjs/voice');
const utils = require('../utils/utils.js');
const { createReadStream } = require('fs');

module.exports = {

    getUserCurrentChannelFromMsg: function(message) {
        return new Promise((resolve) => {
            let currentChannel;
            const connection = getVoiceConnection(process.env.SERVER_ID);
            if (connection) {
                const id = connection.joinConfig.channelId;
                currentChannel = message.guild.channels.cache.find(element => (element.id.includes(id)));
            }
            resolve(currentChannel);
        });
        /* let currentChannel;
        if (VoiceControl.connection) {
            const id = VoiceControl.connection.joinConfig.channelId
            currentChannel = message.guild.channels.cache.find(element => (element.id.includes(id)));
        }
        return currentChannel */
    },


    joinVoice: function(requestedChannel, currentChannel) {
        return new Promise((resolve, reject) => {
            try {
                if (!requestedChannel && !currentChannel) {
                    throw ('Désolée, l\'un de nous deux doit être dans un canal vocal');
                }
                if (requestedChannel) {
                    if (currentChannel != requestedChannel) {
                        joinVoiceChannel({
                            channelId: requestedChannel.id,
                            guildId: requestedChannel.guild.id,
                            adapterCreator: requestedChannel.guild.voiceAdapterCreator,
                        });
                    }
                }
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    },


    destroyConnection: function(VoiceControl) {
        return new Promise((resolve, reject) => {
            const connection = getVoiceConnection(process.env.SERVER_ID);
            if (connection) {
                connection.destroy();
                VoiceControl.isPlaying = false;
                VoiceControl.player = null;
                resolve(VoiceControl);
            }
            else {
                reject('Je ne suis actuellement connectée à aucun salon vocal.');
            }
        });
    },


    pausePlayer: function(player) {
        return new Promise((resolve, reject) => {
            if (player !== null) {
                player.pause();
                resolve();
            }
            else {
                reject('Je ne joue actuellement aucune musique.');
            }
        });
    },


    resumePlayer: function(player) {
        return new Promise((resolve, reject) => {
            if (player !== null) {
                player.unpause();
                resolve();
            }
            else {
                reject('Je ne joue actuellement aucune musique.');
            }
        });
    },


    stopPlayer: function(player) {
        return new Promise((resolve, reject) => {
            if (player !== null) {
                player.stop();
            }
            else {
                reject('Je ne joue actuellement aucune musique.');
            }
        });
    },


    playAudio: function(path, VoiceControl, volume/* , message */, playAsStream) {
        return new Promise((resolve) => {
            // start_issue
            // 03/12/2022
            // Using createReadStream should not be needed but there is an issue with discordjs/voice
            // More details here: https://github.com/discordjs/discord.js/issues/7232
            // original code: const resource = createAudioResource(path);
            let resource;
            if (playAsStream) {
                resource = createAudioResource(createReadStream(path));
            }
            else {
                resource = createAudioResource(path);
            }
            // end_issue

            // const currentChannel = await this.getUserCurrentChannelFromMsg(VoiceControl, message);
            const connection = getVoiceConnection(process.env.SERVER_ID);
            // const connection = getVoiceConnection(currentChannel.guild.id);

            VoiceControl.player = createAudioPlayer({
                behaviors: {
                    // Default behavior is to pause when there are no active subscribers for an audio player.
                    // Can be configured to pause, stop, or just continue playing through the stream.
                    noSubscriber: NoSubscriberBehavior.Pause,
                },
            });
            VoiceControl.player.on('stateChange', (oldState, newState) => {
                console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
            });
            VoiceControl.player.on('error', error => {
                // console.error(`Error: ${error.message} with resource ${error.resource/* .metadata.title */}`);
                throw (error);
            });
            VoiceControl.player.play(resource, volume);
            VoiceControl.subscription = connection.subscribe(VoiceControl.player);
            VoiceControl.player.on(AudioPlayerStatus.Playing, () => {
                VoiceControl.isPlaying = true;
                resolve();
            });

        });
    },

    // useless function, can be deleted after queue and life cycle have been handled
    playYoutube: function(VoiceControl, message) {
        const resource = createAudioResource(ytdl(VoiceControl.queue[VoiceControl.queueIndex], { filter: 'audioonly' }));

        VoiceControl.player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });
        VoiceControl.player.play(resource);
        VoiceControl.player
            .on('info', (info/* , format, error */) => {
                const videoDetails = info.videoDetails;
                message.channel.send(`this song was requested: \`${videoDetails.title}\``);
                VoiceControl.frontQueue.push(videoDetails.title);
                if (VoiceControl.isPlaying == false) {
                    this.playYoutube(VoiceControl, message);
                }
            })
            .on('start', () => {
                VoiceControl.isPlaying = true;
            })
            .on('finish', () => {
                if (VoiceControl.queue.length >= VoiceControl.queueIndex + 2) {
                    VoiceControl.queueIndex += 1;
                    module.exports.playYoutube(VoiceControl, message);
                }
                else {
                    VoiceControl.isPlaying = false;
                }
            })
            .on('error', (error) => {
                utils.logError(error.message, message.channel);
            });
        VoiceControl.connection.subscribe(VoiceControl.player);
    },
};