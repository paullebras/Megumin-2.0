const voiceUtils = require('../utils/voiceUtils.js');
const { getVoiceConnection } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');

const name = 'leave';
const description = 'Quitte le salon vocal actuel.';

module.exports = {
  name: name,
  description: description,
  usage: 'leave',
  type: ':notes: Music',
  data: new SlashCommandBuilder().setName(name).setDescription(description),
  async execute(interaction, VoiceControl) {
    const connection = getVoiceConnection(process.env.SERVER_ID);
    if (!connection) {
      throw new Error('Désolée, je ne suis pas dans un canal vocal.');
    }
    await voiceUtils.destroyConnection(VoiceControl).catch((error) => {
      throw error;
    });
    return { content: '`Left voice channel` ✅' };
  },
};
