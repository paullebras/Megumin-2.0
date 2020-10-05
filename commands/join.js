module.exports = {
    name: 'join',
    description: 'Megumin joins the current or specified (by id or by name) voice channel.',
    execute(message, args) {
        let voiceChannel;
        if (args.length > 0) {
            voiceChannel = message.guild.channels.cache.find(element => (element.name.includes(args[0])) || element.id.includes(args[0]));
        } else {
            voiceChannel = message.member.voice.channel;
        }
        voiceChannel != undefined ? voiceChannel.join() : message.channel.send(`Désolée, le channel vocal **${args[0]}** n'existe pas.`);
    },


    executeFront(voiceChannel) {
        voiceChannel.join();
    }
}
