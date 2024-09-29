const voiceUtils = require('../../utils/voiceUtils.js');
const audioParams = require('../../../config/audioParams.js');
const { createAudioResource } = require('@discordjs/voice');
const ytdl = require('@distube/ytdl-core');
const Player = require('../../core/Player');
const { SlashCommandBuilder } = require('discord.js');

const name = 'skip';
const description = "Joue le prochain audio contenu dans la file d'attente.";

module.exports = {
  name: name,
  description: description,
  usage: 'skip',
  type: ':notes: Music',
  data: new SlashCommandBuilder().setName(name).setDescription(description),
  async execute() {
    const audioPlayer = Player.getInstance();
    if (!audioPlayer.voiceControl.queue.length) {
      throw new Error('Désolée, la queue est vide.');
    }
    if (audioPlayer.voiceControl.queue.length === 1) {
      await audioPlayer.stopPlayer();
      audioPlayer.voiceControl.queue.shift();
      audioPlayer.voiceControl.frontQueue.shift();
      audioPlayer.voiceControl.durationQueue.shift();
      return { content: '`Queue is now empty.` ✅' };
    }
    if (audioPlayer.voiceControl.queue.length > 1) {
      audioPlayer.voiceControl.queue.shift();
      audioPlayer.voiceControl.frontQueue.shift();
      audioPlayer.voiceControl.durationQueue.shift();
      //  TODO handle other cases than youtube (probably do as in play and handle source specificities in dedicaded modules)
      audioPlayer.voiceControl.source = voiceUtils.getSourceFromUrl(
        audioPlayer.voiceControl.queue[0],
      );
      const url = audioPlayer.voiceControl.queue[0];
      const audioResource = createAudioResource(ytdl(url, audioParams));
      audioPlayer.playAudioResource(audioResource);
      return { content: '`Skipped to next element in queue.` ✅' };
    }
    return { content: '`Skipped to next audio` ✅' };
  },
};
