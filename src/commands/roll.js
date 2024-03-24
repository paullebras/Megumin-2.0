const { SlashCommandBuilder } = require('discord.js');
// const utils = require('../utils/utils.js');

const name = 'roll';
const description = 'Jet de dés aléatoire';
const inputDescription = '<nombre de dés>d<nombre de faces>';

module.exports = {
    name: name,
    description: description,
    usage: `${name} ${inputDescription}`,
    type: ':tada: Fun',
    data: new SlashCommandBuilder()
        .setName(name)
        .setDescription(description)
        .addStringOption(option =>
            option.setName('input')
                .setDescription(inputDescription)),
    execute(interaction, args) {
        const input = args[0];
        const regex = /[0-9]+d[0-9]+/i;
        if (!regex.test(input)) {
            throw new Error('Command not recognized. Use : ```<number of dices>d<number of faces>```');
        }
        const [dices, faces] = input.split('d').map(string => parseInt(string));
        let randoms = '```md\n# ';
        for (let i = 0; i < dices; i++) {
            const rd = Math.floor(Math.random() * faces) + 1;
            randoms += rd.toString();
            if (i !== dices - 1) {
                randoms += '  ';
            }
            else {
                randoms += '```';
            }
        }
        if (randoms.length > 2000) {
            throw new Error('Wow wow wow ! On se calme...');
        }
        return { content: randoms };
    },
};
