const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');

module.exports = {
    name: 'anison',
    description: 'Joue la webradio ANISON.FM : https://en.anison.fm/.',
    usage: 'anison',
    type: ':notes: Music',
    async execute(message, VoiceControl) {
        try {
            const channelToJoin = message.member.voice.channel;
            const currentChannel = await voiceUtils.getUserCurrentChannelFromMsg(message);
            const path = 'https://pool.anison.fm/AniSonFM(320)';

            await voiceUtils.joinVoice(channelToJoin, currentChannel, VoiceControl)
                .catch((error) => {
                    throw (error);
                });
            await voiceUtils.playAudio(path, VoiceControl, { volume: 0.1 }, false)
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