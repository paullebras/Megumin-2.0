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

    playYoutube: function (VoiceControl, message) {
        try {
            VoiceControl.dispatcher = VoiceControl.connection.play(ytdl(VoiceControl.queue[VoiceControl.queueIndex], { filter: 'audioonly' }))
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
                    console.log(error);
                    message.channel.send(error.message);
                })
        } catch (error) {
            throw (error);
        }
    }
}