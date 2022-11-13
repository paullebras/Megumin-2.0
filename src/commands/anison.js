const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');

module.exports = {
    name: 'anison',
    description: 'this is the anison command.',
    async execute(message, VoiceControl) {
        try {
            const channelToJoin = message.member.voice.channel;
            const currentChannel = voiceUtils.getCurrentChannelFromMsg(VoiceControl, message);
            let path = 'https://pool.anison.fm/AniSonFM(320)';

            await voiceUtils.joinVoice(channelToJoin, currentChannel, VoiceControl).catch((error) => {
                throw (error);
            });
            voiceUtils.playResource(path, VoiceControl, { volume: 0.1 });
        } catch (error) {
            utils.logError(error, message.channel);
        }
    }
}