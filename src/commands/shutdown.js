const { SlashCommandBuilder } = require('discord.js');

const name = 'shutdown';
const description = '/!\\ Cette commande arrête le bot. Une intervention manuelle sera nécessaire pour le redémarrer /!\\.';

module.exports = {
    name: name,
    description: description,
    usage:'shutdown',
    type: ':wrench: Tools',
    data: new SlashCommandBuilder()
        .setName(name)
        .setDescription(description),
    execute() {
            process.exit();
    },
};
