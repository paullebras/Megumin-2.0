module.exports = {
    name: 'leave',
    description: 'this command makes Megumin leave the current voice channel..',
    execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        voiceChannel.leave();
    }
}
