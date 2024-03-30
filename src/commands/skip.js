const voiceUtils = require('../utils/voiceUtils.js');
const audioParams = require('../../config/audioParams.js');
const { createAudioResource } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const Player = require('../core/Player');
const { SlashCommandBuilder } = require('discord.js');

const audioPlayer = Player.getInstance();
const name = 'skip';
const description = 'Joue le prochain audio contenu dans la file d\'attente.';

module.exports = {
    name: name,
    description: description,
    usage: 'skip',
    type: ':notes: Music',
    data: new SlashCommandBuilder()
        .setName(name)
        .setDescription(description),
    async execute(VoiceControl) {
        if (!VoiceControl.queue.length) {
            throw new Error('Désolée, la queue est vide.');
        }
        if (VoiceControl.queue.length === 1) {
            await audioPlayer.stopPlayer();
            VoiceControl.queue.shift();
            VoiceControl.frontQueue.shift();
            return { content: '`Queue is now empty.` ✅' };
        }
        if (VoiceControl.queue.length > 1) {
            VoiceControl.queue.shift();
            VoiceControl.frontQueue.shift();
            //  TODO handle other cases than youtube (probably do as in play and handle source specificities in dedicaded modules)
            VoiceControl.source = voiceUtils.getSourceFromUrl(VoiceControl.queue[0]);
            const url = VoiceControl.queue[0];
            const audioResource = createAudioResource(ytdl(url, audioParams));
            voiceUtils.playAudioResource(audioResource, VoiceControl);
            return { content: '`Skipped to next element in queue.` ✅' };
        }
        return { content: '`Skipped to next audio` ✅' };
    },
};
