// const ytdl = require('ytdl-core');
const { joinVoiceChannel, getVoiceConnection, entersState } = require('@discordjs/voice');
const { AudioPlayerStatus } = require('@discordjs/voice');
const audioPlayer = require('../core/Player.js');

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
    },


    joinVoice: function(requestedChannel, currentChannel) {
        return new Promise((resolve, reject) => {
            try {
                if (!requestedChannel && !currentChannel) {
                    throw new Error('Désolée, l\'un de nous deux doit être dans un canal vocal');
                }
                if (requestedChannel) {
                    if (currentChannel !== requestedChannel) {
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
        // TODO Do I use the correct way to handle VoiceConnection ? (similar to how I was using isPlaying instead of Player state)
        // https://discordjs.guide/voice/life-cycles.html#subscribing-to-individual-events
        // investigate "VoiceConnection – maintains a network connection to a Discord voice server"
        return new Promise((resolve, reject) => {
            const connection = getVoiceConnection(process.env.SERVER_ID);
            if (connection) {
                connection.destroy();
                resolve(VoiceControl);
            }
            else {
                reject('Je ne suis actuellement connectée à aucun salon vocal.');
            }
        });
    },


    playAudioResource: function(audioResource, VoiceControl) {
        return new Promise((resolve) => {
            const connection = getVoiceConnection(process.env.SERVER_ID);
            audioPlayer.player.play(audioResource);
            try {
                entersState(audioPlayer.player, AudioPlayerStatus.Playing, 5_000);
                // The player has entered the Playing state within 5 seconds
                resolve();
            }
            catch (error) {
                // The player has not entered the Playing state and either:
                // 1) The 'error' event has been emitted and should be handled
                // 2) 5 seconds have passed
                console.error(error);
            }
            VoiceControl.subscription = connection.subscribe(audioPlayer.player);
        });
    },

    addElementToQueue: function(VoiceControl, url, title, duration) {
        VoiceControl.queue.push(url);
        VoiceControl.frontQueue.push(title);
        VoiceControl.durationQueue.push(duration);

        return VoiceControl;
    },

    getSourceFromUrl: function(url) {
        if (url.includes('youtube') || url.includes('youtu.be')) {
            return 'youtube';
        }
        if (url.includes('twitch')) {
            return 'twitch';
        }
        return 'Unhandled source';
    },
};