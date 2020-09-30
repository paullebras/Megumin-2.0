module.exports = {
    name: 'join',
    description: 'Megumin joins the current or specified (by id or by name) voice channel.',
    execute(message, args) {
        let channel;
        if (args.length > 0) {
            channel = message.guild.channels.cache.find(channel => (channel.name.includes(args[0])) || channel.id.includes(args[0]));
        } else {
            channel = message.member.voice.channel;
        }
        channel != undefined ? channel.join() : message.channel.send(`Désolée, le channel vocal **${args[0]}** n'existe pas.`);
    }
}
