const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');

module.exports = {
    name: 'resume',
    description: 'Redémarre l`audio en cours de lecture.',
    usage:'resume',
    type: ':notes: Music',
    async execute(message, VoiceControl) {
        try {
            await voiceUtils.resumePlayer(VoiceControl.player)
                .catch((error) => {
                    throw (error);
                });
            utils.reactMessage('✅', message);
        }
        catch (error) {
            utils.logError(error, message.channel);
        }
    },
};
