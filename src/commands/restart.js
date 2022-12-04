const utils = require('../utils/utils.js');

module.exports = {
    name: 'restart',
    description: 'this command restarts the bot. Will be deleted after https://github.com/discordjs/discord.js/issues/7232 is fixed.',

    execute(message) {
        try {
            // https://nodejs.org/api/process.html#event-exit
            // The node:child_process module provides the ability to spawn subprocesses
            // cwd <string> | <URL> Current working directory of the child process. Default: process.cwd().
            // https://nodejs.org/api/child_process.html#optionsdetached
            // https://nodejs.org/api/child_process.html#optionsstdio

            setTimeout(function() {
                process.on('exit', function() {
                    require('child_process').spawn(process.argv.shift(), process.argv, {
                        cwd: process.cwd(),
                        detached: true,
                        stdio: 'inherit',
                    });
                });
                process.exit();
            }, 5000);
            utils.reactMessage('✅', message);
        }
        catch (error) {
            utils.logError(error, message.channel);
        }
    },
};
