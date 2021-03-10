const Config = require('../config/config.json');
const voiceUtils = require('../utils/voiceUtils.js');
const fetch = require('node-fetch');
const https = require('https');

module.exports = {
    name: 'anison',
    description: 'this is the anison command.',
    async execute(message, args, client, VoiceControl) {
        try {
            const channelToJoin = message.member.voice.channel;
            const currentChannel = client.voice.connections.get(Config.server_id);

            await voiceUtils.joinVoice(channelToJoin, currentChannel, VoiceControl)

            VoiceControl.dispatcher = VoiceControl.connection.play('https://pool.anison.fm/AniSonFM(320)', { volume: 0.2 });

        } catch (error) {
            console.error(error);
            message.channel.send(error);
        }
    }
}