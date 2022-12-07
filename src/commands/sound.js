const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');
const fs = require('fs');
const Path = require('path');

module.exports = {
    name: 'sound',
    description: 'Joue un fichier audio de la base de données',
    usage:'sound <nom du fichier audio>',
    type: ':notes: Music',
    async execute(message, args, type, VoiceControl) {
        try {
            const channelToJoin = message.member.voice.channel;
            const currentChannel = voiceUtils.getUserCurrentChannelFromMsg(message);
            const folder = type === 'sound' ? Path.join('src', 'soundboard') : Path.join('src', 'music');
            const files = fs.readdirSync(folder);
            const normalizedFiles = files.map(x => x.toLowerCase());
            const index = normalizedFiles.indexOf(`${args[0].toLowerCase()}.mp3`);
            const resource = files[index];

            if (normalizedFiles.includes(args[0].toLowerCase())) {
                throw (`File '${args}' does not exist`);
            }
            const path = Path.join(folder, resource);

            await voiceUtils.joinVoice(channelToJoin, currentChannel, VoiceControl)
                .catch((error) => {
                    throw (error);
                });
            await voiceUtils.playAudio(path, VoiceControl, { volume: 1.0 }, true)
                .then(() => {
                    utils.reactMessage('✅', message);
                })
                .catch((error) => {
                    throw (error);
                });
        }
        catch (error) {
            utils.logError(error, message.channel);
        }
    },
};