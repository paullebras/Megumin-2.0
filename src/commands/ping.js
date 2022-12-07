const { EmbedBuilder } = require('discord.js');
const utils = require('../utils/utils.js');

module.exports = {
    name: 'ping',
    description: 'pong!',
    usage: 'ping',
    type: ':wrench: Tools',
    execute(message) {
        try {
            message.channel.send(`${message.author/* .username */}, le Destin nous a réunis !`);

            const exampleEmbed = new EmbedBuilder()
                .setColor(0x0000)
                .setImage('https://i.ytimg.com/vi/2MeXQd41H_Q/maxresdefault.jpg');
            message.channel.send({ embeds: [exampleEmbed] });
            // To mention a specific role:
            // const roleName = 'Connard de Grammar Nazi'
            // const roleId = '466892791243603968'
            // message.channel.send(`${message.guild.roles.cache.find(element => (element.name.includes(roleName)) || element.id.includes(roleId))}`);
        }
        catch (error) {
            utils.logError(error, message.channel);
        }
    },
};