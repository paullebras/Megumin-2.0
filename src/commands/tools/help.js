const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

const name = 'help';
const description =
  "Affiche la description et l'usage d'une commande spécifique ou liste toutes les commandes.";
const inputDescription = '<nom de la commande souhaitée> (optionnel)';

module.exports = {
  name: name,
  description: description,
  usage: `${name} ${inputDescription}`,
  type: ':wrench: Tools',
  data: new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addStringOption((option) =>
      option.setName('input').setDescription(inputDescription),
    ),
  async execute(interaction, args) {
    const prefix = process.env.PREFIX;

    // User specified a command => We provide its description and its usage.
    if (args.length) {
      const requiredCommand = interaction.client.commands.find(
        (cmd) => cmd.name === args[0],
      );

      if (!requiredCommand) {
        throw new Error("Cette commande n'existe pas encore !");
      }
      if (requiredCommand.name === 'help') {
        return { content: 'https://tenor.com/bkNeZ.gif' };
      }
      const commandEmbed = new EmbedBuilder()
        .setColor(0x000000)
        .setTitle(`**${prefix}${requiredCommand.name}**`)
        .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        .setThumbnail('https://cdn3.emoji.gg/emojis/9899-meguminthumbsup.png')
        .addFields(
          {
            name: 'Description : ',
            value: requiredCommand.description,
            inline: false,
          },
          {
            name: 'Utilisation : ',
            value: `\`${prefix}${requiredCommand.usage}\``,
            inline: true,
          },
        );
      return { embeds: [commandEmbed] };
    }

    // User did not specify a command => we sort and then list all commands.
    const sortedCommands = {};

    interaction.client.commands.forEach((command) => {
      if (!sortedCommands[command.type]) {
        sortedCommands[command.type] = `${command.name}\n`;
      } else {
        sortedCommands[command.type] += `${command.name}\n`;
      }
    });

    const embedFields = [];
    for (const key in sortedCommands) {
      embedFields.push({
        name: key,
        value: sortedCommands[key],
        inline: true,
      });
    }

    const helpEmbed = new EmbedBuilder()
      .setColor(0x000000)
      .setTitle('Commandes')
      .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
      .setDescription(`\`${prefix}help <commande>\` pour plus d'informations.`)
      .setThumbnail('https://cdn3.emoji.gg/emojis/9899-meguminthumbsup.png')
      .addFields(embedFields)
      .addFields()
      .setImage(
        'https://static.wikia.nocookie.net/konosuba/images/3/39/Megumin%27s_card.png/revision/latest?cb=20160718182017',
      );

    return { embeds: [helpEmbed] };
  },
};
