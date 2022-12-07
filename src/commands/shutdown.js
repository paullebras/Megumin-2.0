const utils = require('../utils/utils.js');

module.exports = {
    name: 'shutdown',
    description: '/!\\ Cette commande arrête le bot. Une intervention manuelle sera nécessaire pour le redémarrer /!\\.',
    usage:'shutdown',
    type: ':wrench: Tools',
    execute(message) {
        try {
            process.exit();
        }
        catch (error) {
            utils.logError(error, message.channel);
        }
    },
};
