const Player = require('../core/Player');
const { SlashCommandBuilder } = require('discord.js');

const audioPlayer = Player.getInstance();
const name = 'pause';
const description = 'Met en pause l`audio en cours de lecture.';

module.exports = {
    name: name,
    description: description,
    usage: 'pause',
    type: ':notes: Music',
    data: new SlashCommandBuilder()
        .setName(name)
        .setDescription(description),
    async execute() {
        await audioPlayer.pausePlayer()
            .catch((error) => {
                throw error;
            });
        return { content: '`Playback paused` ✅' };
    },
};
