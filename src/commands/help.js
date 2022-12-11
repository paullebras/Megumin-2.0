const utils = require('../utils/utils.js');
const { EmbedBuilder } = require('discord.js');


module.exports = {
    name: 'help',
    type: ':wrench: Tools',
    description: 'Affiche la description et l\'utilisation de la commande spécifiée. Si aucune commandes n\'est précisée : affiche la liste de toutes les commandes.',
    usage: 'help <commande>',
    async execute(message, args) {
        try {
            const prefix = process.env.PREFIX;

            // User specified a command => We provide its description and its usage.
            if (args.length > 0) {
                const requiredCommand = message.client.commands.find((cmd) => cmd.name === args[0]);

                if (!requiredCommand) {
                    throw ('Cette commande n\'existe pas encore !');
                }
                if (requiredCommand.name === 'help') {
                    utils.sendBasicMessage('https://tenor.com/bkNeZ.gif', message.channel);
                    return;
                }
                const commandEmbed = new EmbedBuilder()
                    .setColor(0x000000)
                    .setTitle(`**${prefix}${requiredCommand.name}**`)
                    .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
                    .setThumbnail('https://cdn3.emoji.gg/emojis/9899-meguminthumbsup.png')
                    .addFields(
                        { name: 'Description : ', value: requiredCommand.description, inline: false },
                        { name: 'Utilisation : ', value: `\`${prefix}${requiredCommand.usage}\``, inline: true },
                    );
                utils.sendMessageWithCustomEmbed(commandEmbed, message.channel);
                return;
            }

            // User did not specify a command => we sort and then list all commands.
            const sortedCommands = {};

            message.client.commands.forEach(command => {
                if (!sortedCommands[command.type]) {
                    sortedCommands[command.type] = `${command.name}\n`;
                }
                else {
                    sortedCommands[command.type] += `${command.name}\n`;
                }
            });

            const embedFields = [];
            for (const key in sortedCommands) {
                embedFields.push({ name: key, value: sortedCommands[key], inline: true });
            }

            const helpEmbed = new EmbedBuilder()
                .setColor(0x000000)
                .setTitle('Commandes')
                .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
                .setDescription(`\`${prefix}help <commande>\` pour plus d'informations.`)
                .setThumbnail('https://cdn3.emoji.gg/emojis/9899-meguminthumbsup.png')
                .addFields(embedFields)
                .addFields()
                .setImage('https://static.wikia.nocookie.net/konosuba/images/3/39/Megumin%27s_card.png/revision/latest?cb=20160718182017');

            utils.sendMessageWithCustomEmbed(helpEmbed, message.channel);
        }

        catch (error) {
            utils.logError(error, message.channel);
        }
    },
};