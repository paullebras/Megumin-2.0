const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');

module.exports = {
    name: 'stop',
    description: 'this is the stop command.',

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
