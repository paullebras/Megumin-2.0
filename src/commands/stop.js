const utils = require('../utils/utils.js');
const audioPlayer = require('../core/Player.js');

module.exports = {
    name: 'stop',
    description: 'Interrompt l`audio en cours de lecture.',
    usage:'stop',
    type: ':notes: Music',
    async execute(message) {
        try {
            await audioPlayer.stopPlayer();
            utils.reactMessage('✅', message);
        }
        catch (error) {
            utils.logError(error, message.channel);
        }
    },
};
