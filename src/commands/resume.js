const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');

module.exports = {
    name: 'resume',
    description: 'this is the resume command.',

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
