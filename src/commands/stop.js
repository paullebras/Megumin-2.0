const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');

module.exports = {
    name: 'stop',
    description: 'this is the stop command.',

    execute(message, VoiceControl) {
        try {
            voiceUtils.stopPlayer(VoiceControl.player);
        }
        catch (error) {
            utils.logError(error, message.channel);
        }
    },
};
