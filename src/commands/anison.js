const voiceUtils = require('../utils/voiceUtils.js');
const { createAudioResource } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');

const name = 'anison';
const description = 'Joue la webradio ANISON.FM : https://en.anison.fm/.';

module.exports = {
  name: name,
  description: description,
  usage: 'anison',
  type: ':notes: Music',
  data: new SlashCommandBuilder().setName(name).setDescription(description),
  async execute(interaction, VoiceControl) {
    const channelToJoin = interaction.member.voice.channel;
    const currentChannel = await interaction.voiceChannel;
    const url = 'https://pool.anison.fm/AniSonFM(320)';

    await voiceUtils
      .joinVoice(channelToJoin, currentChannel, VoiceControl)
      .catch((error) => {
        throw error;
      });
    VoiceControl.source = 'anison';
    const audioResource = createAudioResource(url);
    await voiceUtils
      .playAudioResource(audioResource, VoiceControl)
      .catch((error) => {
        throw error;
      });
    return { content: '`Anison playback has started` ✅' };
  },
};
