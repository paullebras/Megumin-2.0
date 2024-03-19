const utils = require('../utils/utils.js');
const audioPlayer = require('../core/Player.js');

module.exports = {
    name: 'pause',
    description: 'Met en pause l`audio en cours de lecture.',
    usage:'pause',
    type: ':notes: Music',
    async execute(message) {
        try {
            await audioPlayer.pausePlayer()
                .catch((error) => {
                    throw error;
                });
            utils.reactMessage('✅', message);
        }
        catch (error) {
            utils.logError(error, message.channel);
        }
    },
};
