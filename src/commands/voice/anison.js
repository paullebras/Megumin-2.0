const voiceUtils = require('../../utils/voiceUtils.js');
const { createAudioResource } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');
const Player = require('../../core/Player.js');

const name = 'anison';
const description = 'Joue la webradio ANISON.FM : https://en.anison.fm/.';

module.exports = {
  name: name,
  description: description,
  usage: 'anison',
  type: ':notes: Music',
  data: new SlashCommandBuilder().setName(name).setDescription(description),
  async execute(interaction) {
    const channelToJoin = interaction.member.voice.channel;
    const currentChannel = await interaction.voiceChannel;
    const url = 'https://pool.anison.fm/AniSonFM(320)';

    await voiceUtils.joinVoice(channelToJoin, currentChannel).catch((error) => {
      throw error;
    });
    const audioPlayer = Player.getInstance();
    audioPlayer.voiceControl.source = 'anison';
    const audioResource = createAudioResource(url);
    await audioPlayer.playAudioResource(audioResource).catch((error) => {
      throw error;
    });
    return { content: '`Anison playback has started` ✅' };
  },
};
