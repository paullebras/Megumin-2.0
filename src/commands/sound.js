const voiceUtils = require('../utils/voiceUtils.js');
const { readdirSync, createReadStream } = require('fs');
const Path = require('path');
const { createAudioResource } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');

const name = 'sound';
const description =
  'Joue un audio spécifique ou bien en choisis un aléatoirement';
const inputDescription =
  "<nom de l'audio> ou 'random' pour jouer un son aléatoire";

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
  async execute(interaction, args, type, VoiceControl) {
    const channelToJoin = interaction.member.voice.channel;
    const currentChannel = await interaction.voiceChannel;
    const folder =
      type === 'sound'
        ? Path.join('audio-resources', 'soundboard')
        : Path.join('audio-resources', 'music');
    const files = readdirSync(folder);
    const normalizedFiles = files.map((x) =>
      x.toLowerCase().split('.').slice(0, -1).join('.'),
    );
    const truncatedFiles = normalizedFiles.map((file) =>
      file.substring(file.indexOf('_') + 1),
    );

    let index;
    if (args[0] === 'random') {
      index = Math.floor(Math.random() * normalizedFiles.length);
    } else {
      index = normalizedFiles.indexOf(`${args[0].toLowerCase()}`);
      if (index === -1) {
        index = truncatedFiles.indexOf(`${args[0].toLowerCase()}`);
      }
    }
    if (index === -1) {
      throw new Error(`File '${args}' does not exist`);
    }
    const resource = files[index];
    const resourcePath = Path.join(folder, resource);

    await voiceUtils.joinVoice(channelToJoin, currentChannel).catch((error) => {
      throw error;
    });
    VoiceControl.source = 'soundboard';
    // start_issue
    // 03/12/2022
    // Using createReadStream should not be needed but there is an issue with discordjs/voice
    // More details here: https://github.com/discordjs/discord.js/issues/7232
    // original code: const resource = createAudioResource(path);
    const audioResource = createAudioResource(createReadStream(resourcePath));
    // end_issue
    await voiceUtils
      .playAudioResource(audioResource, VoiceControl)
      .catch((error) => {
        throw error;
      });

    return { content: `\`Playing ${resource}\` ✅` };
  },
};
