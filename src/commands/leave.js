const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    name: 'leave',
    description: 'Quitte le salon vocal actuel.',
    usage:'leave',
    type: ':notes: Music',
    async execute(message, VoiceControl) {
        try {
            const connection = getVoiceConnection(process.env.SERVER_ID);
            if (connection) {
                await voiceUtils.destroyConnection(VoiceControl)
                    .catch((error) => {
                        throw (error);
                    });
                utils.reactMessage('✅', message);
                return;
            }
            else {
                throw ('Désolée, je ne suis pas dans un canal vocal.');
            }
        }
        catch (error) {
            utils.logError(error, message.channel);
        }
    },
};
