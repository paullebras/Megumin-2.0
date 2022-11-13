const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    name: 'leave',
    description: 'this command makes Megumin leave the current voice channel.',
    execute(message, VoiceControl) {
        try {
            const connection = getVoiceConnection(process.env.SERVER_ID);
            if (connection) {
                voiceUtils.destroyConnection(VoiceControl, connection);
                return;
            }
            else {
                const msg = 'Désolée, je ne suis pas dans un canal vocal.'
                message.channel.send(msg);
                return;
            }
        } catch (error) {
            utils.logError(error, message.channel);
        }
    }
}
