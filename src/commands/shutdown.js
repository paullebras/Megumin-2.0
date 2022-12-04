const utils = require('../utils/utils.js');

module.exports = {
    name: 'shutdown',
    description: 'this command stops the bot. It is used to stop it after the restart function has been used because we dont know any better',

    execute(message) {
        try {
            process.exit();
        }
        catch (error) {
            utils.logError(error, message.channel);
        }
    },
};
