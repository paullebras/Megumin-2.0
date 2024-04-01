const { SlashCommandBuilder } = require('discord.js');

const name = 'clear';
const description = "Nettoie la file d'attente.";

module.exports = {
  name: name,
  description: description,
  usage: 'clear',
  type: ':notes: Music',
  data: new SlashCommandBuilder().setName(name).setDescription(description),
  execute(interaction, VoiceControl) {
    if (!VoiceControl.frontQueue.length) {
      interaction.channel.send('La queue est déjà vide.');
    } else {
      VoiceControl.queue = [];
      VoiceControl.frontQueue = [];
    }
    return { content: '`Queue cleared` ✅' };
  },
};
