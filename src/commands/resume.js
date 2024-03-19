const utils = require('../utils/utils.js');
const audioPlayer = require('../core/Player.js');

module.exports = {
    name: 'resume',
    description: 'Redémarre l`audio en cours de lecture.',
    usage:'resume',
    type: ':notes: Music',
    async execute(message) {
        try {
            await audioPlayer.resumePlayer()
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
