const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');

module.exports = {
    name: 'pause',
    description: 'this is the pause command.',

    execute(VoiceControl) {
        try {
            voiceUtils.pausePlayer(VoiceControl.player);
        } catch (error) {
            utils.logError(error, message.channel);
        }
    }
}
