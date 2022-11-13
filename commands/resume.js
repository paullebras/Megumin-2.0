const utils = require('../utils/utils.js');

module.exports = {
    name: 'resume',
    description: 'this is the resume command.',

    execute(message, VoiceControl) {
        try {
            VoiceControl.player.resume();
        } catch (error) {
            utils.logError(error, message.channel);
        }
    }
}
