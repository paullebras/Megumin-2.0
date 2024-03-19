const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');
const audioParams = require('../../config/audioParams.js');
const { createAudioResource } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const audioPlayer = require('../core/Player.js');

module.exports = {
    name: 'skip',
    description: 'Joue le prochain audio contenu dans la file d\'attente.',
    usage: 'skip',
    type: ':notes: Music',
    async execute(message, VoiceControl) {
        try {
            if (!VoiceControl.queue.length) {
                message.channel.send('Désolée, la queue est vide.');
                return;
            }
            if (VoiceControl.queue.length === 1) {
                await audioPlayer.stopPlayer();
                VoiceControl.queue.shift();
                VoiceControl.frontQueue.shift();
                utils.reactMessage('✅', message);
                return;
            }
            if (VoiceControl.queue.length > 1) {
                VoiceControl.queue.shift();
                VoiceControl.frontQueue.shift();
                //  TODO handle other cases than youtube (probably do as in play and handle source specificities in dedicaded modules)
                VoiceControl.source = voiceUtils.getSourceFromUrl(VoiceControl.queue[0]);
                const url = VoiceControl.queue[0];
                const audioResource = createAudioResource(ytdl(url, audioParams));
                voiceUtils.playAudioResource(audioResource, VoiceControl);
                utils.reactMessage('✅', message);
                return;
            }
        }
        catch (error) {
            utils.logError(error, message.channel);
        }

    },
};
