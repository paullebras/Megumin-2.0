const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');
const fs = require("fs");

module.exports = {
    name: 'sound',
    description: 'this is the soundboard command.',
    async execute(message, args, type, VoiceControl) {
        try {
            const channelToJoin = message.member.voice.channel;
            const currentChannel = voiceUtils.getCurrentChannelFromMsg(VoiceControl, message);
            if (type == 'sound')
                var path = `soundboard/${args}.mp3`
            if (type == 'music')
                var path = `music/${args}.mp3`
            if (!fs.existsSync(path))
                throw(`File '${args}' does not exist`);

            voiceUtils.joinVoice(channelToJoin, currentChannel, VoiceControl)
            voiceUtils.playResource(path, VoiceControl, { volume: 1.0 });
        } catch (error) {
            utils.logError(error, message.channel);
        }
    }
}