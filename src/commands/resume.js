const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');

module.exports = {
    name: 'resume',
    description: 'this is the resume command.',

    execute(message, VoiceControl) {
        try {
            voiceUtils.resumePlayer(VoiceControl.player);
        } catch (error) {
            utils.logError(error, message.channel);
        }
    }
}
