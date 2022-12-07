const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');

module.exports = {
    name: 'pause',
    description: 'Met en pause l`audio en cours de lecture.',
    usage:'pause',
    type: ':notes: Music',
    async execute(message, VoiceControl) {
        try {
            await voiceUtils.pausePlayer(VoiceControl.player)
                .catch((error) => {
                    throw error;
                });
            utils.reactMessage('✅', message);
        }
        catch (error) {
            utils.logError(error, message.channel);
        }
    },
};
