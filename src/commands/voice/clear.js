const { SlashCommandBuilder } = require('discord.js');
const Player = require('../../core/Player');

const name = 'clear';
const description = "Nettoie la file d'attente.";

module.exports = {
  name: name,
  description: description,
  usage: 'clear',
  type: ':notes: Music',
  data: new SlashCommandBuilder().setName(name).setDescription(description),
  execute(interaction) {
    const audioPlayer = Player.getInstance();
    if (!audioPlayer.voiceControl.frontQueue.length) {
      interaction.channel.send('La queue est déjà vide.');
    } else {
      audioPlayer.voiceControl.queue = [];
      audioPlayer.voiceControl.frontQueue = [];
    }
    return { content: '`Queue cleared` ✅' };
  },
};
