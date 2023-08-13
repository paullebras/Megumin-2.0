const utils = require('../utils/utils.js');

module.exports = {
    name: 'roll',
    description: 'Jet de dés aléatoire',
    usage:'roll <nombre de dés>d<nombre de faces>',
    type: ':tada: Fun',
    execute(message, args) {
        try {
            const input = args[0];
            const regex = /[0-9]+d[0-9]+/i;
            if (!regex.test(input)) {
                throw ('Command not recognized. Use : ```<number of dices>d<number of faces>```');
            }
            const [dices, faces] = input.split('d').map(string => parseInt(string));
            let randoms = '```md\n# ';
            for (let i = 0; i < dices; i++) {
                const rd = Math.floor(Math.random() * faces) + 1;
                randoms += rd.toString();
                if (i != dices - 1) {
                    randoms += '  ';
                }
                else {
                    randoms += '```';
                }
            }
            message.channel.send(randoms)
                .catch((error) => {
                    const errmsg = error.rawError.message;
                    if (errmsg === 'Invalid Form Body') {
                        utils.logError('Wow wow wow ! On se calme...', message.channel);
                    }
                    else {
                        utils.logError(errmsg, message.channel);
                    }
                });
        }
        catch (error) {
            utils.logError(error, message.channel);
        }
    },
};
