const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');
const { createAudioResource } = require('@discordjs/voice');

module.exports = {
    name: 'anison',
    description: 'Joue la webradio ANISON.FM : https://en.anison.fm/.',
    usage: 'anison',
    type: ':notes: Music',
    async execute(message, VoiceControl) {
        try {
            const channelToJoin = message.member.voice.channel;
            const currentChannel = await voiceUtils.getUserCurrentChannelFromMsg(message);
            const url = 'https://pool.anison.fm/AniSonFM(320)';

            await voiceUtils.joinVoice(channelToJoin, currentChannel, VoiceControl)
                .catch((error) => {
                    throw (error);
                });
            VoiceControl.source = 'anison';
            const audioResource = createAudioResource(url);
            await voiceUtils.playAudioResource(audioResource, VoiceControl)
                .catch((error) => {
                    throw (error);
                });
            utils.reactMessage('✅', message);
        }
        catch (error) {
            utils.logError(error, message.channel);
        }
    },
};