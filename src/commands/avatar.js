const { SlashCommandBuilder } = require('discord.js');

const name = 'avatar';
const description =
  "Affiche l'avatar d'un utilisateur";
const inputDescription = '@<user> (optionnel)';

module.exports = {
  name: name,
  description: description,
  usage: `${name} ${inputDescription}`,
  type: ':tada: Fun',
  data: new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addStringOption((option) =>
      option.setName('input').setDescription(inputDescription),
    ),
  async execute(interaction, args) {
    let userId, avatarId;

    if (args.length) {
      userId = args[0].match(/\d+/)[0];
      avatarId = interaction.guild.members.cache.get(userId).user.avatar;
    } else {
      userId = interaction.member.user.id;
      avatarId = interaction.member.user.avatar;
    }

    const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.png`;

    return { files: [{ attachment: avatarUrl }] };
  },
};
