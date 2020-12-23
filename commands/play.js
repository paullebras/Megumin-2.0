const voiceUtils = require('../utils/voiceUtils.js');
const Config = require('../config/config.json');

module.exports = {
    name: 'play',
    description: 'this is the music command.',

    async execute(message, args, client, VoiceControl) {
        try {
            const url = args[0];
            const channelToJoin = message.member.voice.channel;
            const currentChannel = client.voice.connections.get(Config.server_id);

            await voiceUtils.joinVoice(channelToJoin, currentChannel, VoiceControl).catch((err) => {
                throw err;
            })
            VoiceControl.queue.push(url);
            if (VoiceControl.isPlaying == false) {
                voiceUtils.playYoutube(VoiceControl);
            }
        } catch (err) {
            console.log(err);
            message.channel.send(err);
        }
    },
}
