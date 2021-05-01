const voiceUtils = require('../utils/voiceUtils.js');
require('dotenv').config();

module.exports = {
    name: 'join',
    description: 'Megumin joins the current or specified (by id or by name) voice channel.',
    execute(message, args, client, VoiceControl) {
        try {
            let channelToJoin;
            const currentChannel = client.voice.connections.get(process.env.SERVER_ID);
            if (args.length > 0) {
                channelToJoin = message.guild.channels.cache.find(element => (element.name.includes(args[0])) || element.id.includes(args[0]));
            } else {
                channelToJoin = message.member.voice.channel;
            }
            if (channelToJoin != undefined) {
                voiceUtils.joinVoice(channelToJoin, currentChannel, VoiceControl).catch((error) => {
                    throw (error);
                })
            } else {
                message.channel.send(`Désolée, le canal vocal **${args[0]}** n'existe pas.`);
            }
        } catch (error) {
            console.log(error);
            message.channel.send(error);
        }
    }
}
