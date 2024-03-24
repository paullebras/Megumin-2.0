const audioPlayer = require('../core/Player.js');
const { SlashCommandBuilder } = require('discord.js');

const name = 'stop';
const description = 'Interrompt l`audio en cours de lecture.';

module.exports = {
    name: name,
    description: description,
    usage: 'stop',
    type: ':notes: Music',
    data: new SlashCommandBuilder()
        .setName(name)
        .setDescription(description),
    async execute() {
        await audioPlayer.stopPlayer();
        return { content: '`Playback stopped` ✅' };
    },
};
