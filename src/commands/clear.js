const utils = require('../utils/utils.js');

module.exports = {
    name: 'clear',
    description: 'Nettoie la file d\'attente.',
    usage:'clear',
    type: ':notes: Music',
    execute(message, VoiceControl) {
        try {
            if (VoiceControl.frontQueue.length == 0) {
                message.channel.send('La queue est déjà vide.');
            }
            else {
                VoiceControl.queue = [];
                VoiceControl.frontQueue = [];
                utils.reactMessage('✅', message);
            }
        }
        catch (error) {
            utils.logError(error, message.channel);
        }
    },
};
