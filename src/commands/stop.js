const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');

module.exports = {
    name: 'stop',
    description: 'Interrompt l`audio en cours de lecture.',
    usage:'stop',
    type: ':notes: Music',
    async execute(message, VoiceControl) {
        try {
            await voiceUtils.stopPlayer(VoiceControl.player);
            utils.reactMessage('✅', message);
        }
        catch (error) {
            utils.logError(error, message.channel);
        }
    },
};
