const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');
const { readdirSync, createReadStream } = require('fs');
const Path = require('path');
const { createAudioResource } = require('@discordjs/voice');

module.exports = {
    name: 'sound',
    description: 'Joue un fichier audio de la base de données',
    usage:'sound <nom du fichier audio>',
    type: ':notes: Music',
    async execute(message, args, type, VoiceControl) {
        try {
            const channelToJoin = message.member.voice.channel;
            const currentChannel = await voiceUtils.getUserCurrentChannelFromMsg(message);
            const folder = type === 'sound' ? Path.join('src', 'soundboard') : Path.join('src', 'music');
            const files = readdirSync(folder);
            const normalizedFiles = files.map(x => x.toLowerCase());
            const index = normalizedFiles.indexOf(`${args[0].toLowerCase()}.mp3`);
            const resource = files[index];

            if (normalizedFiles.includes(args[0].toLowerCase())) {
                throw (`File '${args}' does not exist`);
            }
            const resourcePath = Path.join(folder, resource);

            await voiceUtils.joinVoice(channelToJoin, currentChannel)
                .catch((error) => {
                    throw (error);
                });
            VoiceControl.source = 'soundboard';
            // start_issue
            // 03/12/2022
            // Using createReadStream should not be needed but there is an issue with discordjs/voice
            // More details here: https://github.com/discordjs/discord.js/issues/7232
            // original code: const resource = createAudioResource(path);
            const audioResource = createAudioResource(createReadStream(resourcePath));
            // end_issue
            await voiceUtils.playAudioResource(audioResource, VoiceControl)
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