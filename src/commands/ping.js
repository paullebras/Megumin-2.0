const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

const name = 'ping';
const description = 'pong!';

module.exports = {
    name: name,
    description: description,
    usage: 'ping',
    type: ':wrench: Tools',
    data: new SlashCommandBuilder()
        .setName(name)
        .setDescription(description),
    execute(interaction) {
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0000)
            .setImage('https://i.ytimg.com/vi/2MeXQd41H_Q/maxresdefault.jpg');
        //
        // To mention a specific role:
        // const roleName = 'Connard de Grammar Nazi'
        // const roleId = '466892791243603968'
        // interaction.channel.send(`${message.guild.roles.cache.find(element => (element.name.includes(roleName)) || element.id.includes(roleId))}`);

        return { content: `${interaction.member/* .username */}, le Destin nous a réunis !`, embeds: [exampleEmbed] };
    },
};