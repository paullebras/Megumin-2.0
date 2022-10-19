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

            voiceUtils.joinVoice(channelToJoin, currentChannel, VoiceControl)
            voiceUtils.playResource(path, VoiceControl, { volume: 0.2 });
        } catch (error) {
            utils.logError(error, message.channel);
        }
    }
}