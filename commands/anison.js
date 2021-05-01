const voiceUtils = require('../utils/voiceUtils.js');
require('dotenv').config();

module.exports = {
    name: 'anison',
    description: 'this is the anison command.',
    async execute(message, args, client, VoiceControl) {
        try {
            const channelToJoin = message.member.voice.channel;
            const currentChannel = client.voice.connections.get(process.env.SERVER_ID);

            await voiceUtils.joinVoice(channelToJoin, currentChannel, VoiceControl)

            VoiceControl.dispatcher = VoiceControl.connection.play('https://pool.anison.fm/AniSonFM(320)', { volume: 0.2 });

        } catch (error) {
            console.error(error);
            message.channel.send(error);
        }
    }
}