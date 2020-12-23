const ytdl = require('ytdl-core');

module.exports = {

    joinVoice: function (requestedChannel, currentChannel, VoiceControl) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!requestedChannel && !currentChannel) {
                    return reject("Désolée, l'un de nous deux doit être dans un canal vocal");
                }
                if (requestedChannel) {
                    if (currentChannel != requestedChannel) {
                        VoiceControl.connection = await requestedChannel.join();
                    } else {
                        return resolve();
                    }
                }
                resolve();
            } catch (error) {
                reject(error);
            }

        })

    },

    playYoutube: function (VoiceControl) {
        try {
            VoiceControl.dispatcher = VoiceControl.connection.play(ytdl(VoiceControl.queue[VoiceControl.queueIndex], { filter: 'audioonly' }))
                .on('start', () => {
                    VoiceControl.isPlaying = true;
                })
                .on('finish', () => {
                    if (VoiceControl.queue.length >= VoiceControl.queueIndex + 2) {
                        VoiceControl.queueIndex += 1;
                        module.exports.play(VoiceControl);
                    } else {
                        VoiceControl.isPlaying = false;
                    }
                })
                .on('error', (error) => {
                    throw(error);
                })
        } catch (error) {
            throw (error);
        }
    }
}