const Player = require('../../core/Player');
const { SlashCommandBuilder } = require('discord.js');

const name = 'resume';
const description = 'Redémarre l`audio en cours de lecture après une pause.';

module.exports = {
  name: name,
  description: description,
  usage: 'resume',
  type: ':notes: Music',
  data: new SlashCommandBuilder().setName(name).setDescription(description),
  async execute() {
    const audioPlayer = Player.getInstance();
    await audioPlayer.resumePlayer().catch((error) => {
      throw error;
    });
    return { content: '`Playback resumed` ✅' };
  },
};
