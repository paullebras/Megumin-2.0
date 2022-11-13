
const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');

module.exports = {
    name: 'skip',
    description: 'This command allows to play the next video in queue.',

    async execute(message, VoiceControl) {
        try {
            if (VoiceControl.queue.length >= VoiceControl.queueIndex + 2) {
                VoiceControl.queueIndex += 1;
                voiceUtils.playYoutube(VoiceControl, message);
                return;
            }
            if (VoiceControl.queue.length >= VoiceControl.queueIndex + 1) {
                voiceUtils.stopPlayer(VoiceControl.player);
            }
            message.channel.send('Désolée, la queue est vide.');
        } catch (error) {
            utils.logError(error, message.channel);
        }

    }
}