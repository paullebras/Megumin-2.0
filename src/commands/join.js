const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');

module.exports = {
    name: 'join',
    description: 'Megumin joins the current or specified (by id or by name) voice channel.',
    async execute(message, args, VoiceControl) {
        try {
            let channelToJoin;
            const currentChannel = await voiceUtils.getUserCurrentChannelFromMsg(message)
                .catch((error) => {
                    throw (error);
                });

            // find specified voice channel OR user current voice channel
            if (args.length > 0) {
                channelToJoin = message.guild.channels.cache.find(element => (element.name.includes(args[0])) || element.id.includes(args[0]));
                if ((channelToJoin) === undefined) {
                    throw (`Désolée, le canal vocal **${args[0]}** n'existe pas.`);
                }
            }
            else {
                channelToJoin = message.member.voice.channel;
            }

            // join voice channel
            await voiceUtils.joinVoice(channelToJoin, currentChannel, VoiceControl)
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
