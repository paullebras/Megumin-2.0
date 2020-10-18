module.exports = {
    name: 'skip',
    description: 'this is a ping command.',

    async execute(message, client, VoiceControl) {
        console.log('a');
        const voiceChannel = message.member.voice.channel;
        console.log('VoiceControl.queueIndex =', VoiceControl.queueIndex);
        let a = VoiceControl.queue;
        console.log('a =', a);
        console.log('a.length() =', a.length);
        console.log('typeof VoiceControl.queue =', typeof VoiceControl.queue);
        if (VoiceControl.queueIndex <= a.length - 1) {
            await client.commands.get('play').play(voiceChannel, VoiceControl);
            VoiceControl.queueIndex += 1;
            console.log('d');
        } else {
            console.error("Désolée, il n'y a plus de musiques en réserve.");
            message.channel.send("Désolée, il n'y a plus de musiques en réserve.");
        }
    }
}
