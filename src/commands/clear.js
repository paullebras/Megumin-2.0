const utils = require('../utils/utils.js');

module.exports = {
    name: 'clear',
    description: 'this is the clear command, it clears the queue.',

    execute(message, VoiceControl) {
        try {
            if (VoiceControl.frontQueue.length == 0) {
                message.channel.send('La queue est déjà vide.');
            }
            else {
                VoiceControl.queue = [];
                VoiceControl.frontQueue = [];
                VoiceControl.queueIndex = 0;
                utils.reactMessage('✅', message);
            }
        }
        catch (error) {
            utils.logError(error, message.channel);
        }
    },
};
