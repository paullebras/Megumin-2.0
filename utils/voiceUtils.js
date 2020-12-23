module.exports = {

    joinVoice: function (requestedChannel, currentChannel, VoiceControl) {
        return new Promise(async (resolve, reject) => {
            try {
                /* console.log('requestedChannel', requestedChannel);
                console.log('!requestedChannel', !requestedChannel);
                console.log('currentChannel', currentChannel);
                console.log('!currentChannel', !currentChannel); */
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
}