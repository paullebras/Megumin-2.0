const voiceUtils = require('../utils/voiceUtils.js');
const { SlashCommandBuilder } = require('discord.js');

const name = 'join';
const description =
  "Rejoins le salon vocal (nom ou id). Si aucun salon n'est précisé : rejoins le salon de l`utilisateur";
const inputDescription = '<nom ou id du salon>';

module.exports = {
  name: name,
  description: description,
  usage: `${name} ${inputDescription}`,
  type: ':notes: Music',
  data: new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addStringOption((option) =>
      option.setName('input').setDescription(inputDescription),
    ),
  async execute(interaction, args) {
    const currentChannel = await interaction.voiceChannel;

    // find specified voice channel OR user current voice channel
    let channelToJoin;
    if (args.length > 0) {
      const voiceChannels = interaction.guild.channels.cache.filter(
        (channel) => channel.type === 2,
      );
      channelToJoin = voiceChannels.find(
        (voiceChannel) =>
          voiceChannel.name.toLowerCase().includes(args[0].toLowerCase()) ||
          voiceChannel.id.includes(args[0]),
      );
      if (channelToJoin === undefined) {
        throw `Désolée, le canal vocal **${args[0]}** n'existe pas.`;
      }
    } else {
      channelToJoin = interaction.member.voice.channel;
    }

    // join voice channel
    await voiceUtils.joinVoice(channelToJoin, currentChannel).catch((error) => {
      throw error;
    });

    return { content: `\`Joined : ${channelToJoin.name}\` ✅` };
  },
};
