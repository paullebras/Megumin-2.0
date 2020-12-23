const Config = require('../config/config.json');

module.exports = {
    name: 'leave',
    description: 'this command makes Megumin leave the current voice channel.',
    execute(message, client, VoiceControl) {
        if (client.voice.connections.get(Config.server_id)) {
            const voiceChannel = client.voice.connections.get(Config.server_id).channel;
            voiceChannel.leave();
            VoiceControl.connection = null;
            return;
        }
        else {
            const msg = 'Désolée, je ne suis pas dans un canal vocal.'
            message.channel.send(msg);
            return;
        }
    }
}
