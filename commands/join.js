const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');

module.exports = {
    name: 'join',
    description: 'Megumin joins the current or specified (by id or by name) voice channel.',
    execute(message, args, VoiceControl) {
        try {
            let channelToJoin;
            const currentChannel = voiceUtils.getCurrentChannelFromMsg(VoiceControl, message);
            if (args.length > 0) {
                channelToJoin = message.guild.channels.cache.find(element => (element.name.includes(args[0])) || element.id.includes(args[0]));
            } else {
                channelToJoin = message.member.voice.channel;
            }
            if (channelToJoin != undefined) {
                voiceUtils.joinVoice(channelToJoin, currentChannel, VoiceControl);
            } else {
                message.channel.send(`Désolée, le canal vocal **${args[0]}** n'existe pas.`);
            }
        } catch (error) {
            utils.logError(error, message.channel);
        }
    }
}
