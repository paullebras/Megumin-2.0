
const voiceUtils = require('../utils/voiceUtils.js');
const Config = require('../config/config.json');

module.exports = {
    name: 'skip',
    description: 'This command allows to play the next video in queue.',

    async execute(message, client, VoiceControl) {
        try {
            if (VoiceControl.isPlaying == false) {
                throw ("Désolée, aucune vidéo n'est en cours de lecture.");
            }
            const channelToJoin = message.member.voice.channel;
            const currentChannel = client.voice.connections.get(Config.server_id);

            await voiceUtils.joinVoice(channelToJoin, currentChannel, VoiceControl).catch((err) => {
                throw err;
            })
            if (VoiceControl.queue.length >= VoiceControl.queueIndex + 2) {
                VoiceControl.queueIndex += 1;
                voiceUtils.playYoutube(VoiceControl, message);
                return;
            }
            if (VoiceControl.queue.length >= VoiceControl.queueIndex + 1) {
                // TODO
                VoiceControl.queueIndex += 1;
                console.log("EUH... J'ai pas fais ça encore");
                message.channel.send("EUH... J'ai pas fais ça encore");
                return;
            }
            throw ("Désolée, il n'y a rien que je puisse skip.");
        } catch (error) {
            console.error(error);
            message.channel.send(error);
        }

    }
}
