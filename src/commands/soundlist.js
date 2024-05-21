const utils = require('../utils/utils.js');
const { readdirSync } = require('fs');
const Path = require('path');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

const name = 'soundlist';
const description =
  "Affiche la liste des sons d'une catégorie spécifique ou de toutes les catégories.";
const inputDescription = '<sound_category> (optionnel)';

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
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Keyed_collections ???

    const categoriesIndex = {
      ad: 'Antoine Daniel',
      bg: 'Bapt&Gael',
      cdi: 'CD-i Zelda ',
      cly: 'Clyde Vanilla',
      go: 'Google Voice',
      jdg: 'Joueur du Grenier',
      jojo: "Jojo's Bizarre Adventure",
      kmlt: 'Kaamelott',
      kassos: 'Les Kassos',
      ks: 'Konosuba',
      lol: 'League of Legends',
      lotr: 'Lord of the Rings',
      div: 'Divers',
      mk: 'Mario Kart',
      moz: 'Mozinor',
      ow: 'Overwatch',
      roc: 'Jean Rochefort',
      sard: 'Sardoche',
      sg: 'Steins;Gate',
      sp: 'South Park',
      tuto: 'Les Tutos',
    };

    // We sort all sounds.
    const sounds = readdirSync(Path.join('src', 'soundboard')).map(
      (sound) => sound.split('.')[0],
    );

    const sortedSounds = {};
    for (const cat in categoriesIndex) {
      sortedSounds[cat] = [];
    }

    for (const sound of sounds) {
      if (sound.includes('_')) {
        const [categoryPrefix, soundName] = sound.split('_');
        if (
          Object.prototype.hasOwnProperty.call(categoriesIndex, categoryPrefix)
        ) {
          sortedSounds[categoryPrefix].push(soundName);
        } else {
          throw new Error(
            `Désolé, le préfix '${categoryPrefix}' n'est pas répertorié`,
          );
        }
      } else {
        console.warn(
          `sound ${sound} does not respect naming convention prefix_name.mp3`,
        );
      }
    }

    // TODO make this work so that it only considers files even if there is no folder here (supposedly)
    // TODO handle case where only one category can go over the 2000 characters limit for a single message.
    /* const soundsFiles = fs.readdirSync(Path.join('src', 'soundboard'), { withFileTypes: true }).map(sound => sound.name.split('.')[0]); */
    // User specified a category => We provide the list of all the audio files belonging to this category
    if (args.length) {
      const key = args[0];
      if (!Object.prototype.hasOwnProperty.call(categoriesIndex, key)) {
        throw new Error(`${key} is not a valid category`);
      }
      const embedFields = [];
      let content = '';
      sortedSounds[key].forEach((element) => {
        content += `${element}\n`;
      });
      // embedFields.push({ name: '------------', value: content, inline: true });

      const soundListEmbed = new EmbedBuilder()
        .setColor(0x000000)
        .setTitle(`${categoriesIndex[key]}`)
        .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        .setDescription(content)
        .setThumbnail('https://cdn3.emoji.gg/emojis/9899-meguminthumbsup.png')
        .addFields(embedFields);

      return { embeds: [soundListEmbed] };
    }

    // User did not specify a category = We provide the list of all the audio files for all categories
    const maxLines = 18;
    const lineSize = 114;
    const numberOfColumns = 6;
    let finalMessage;
    const columnWidth = lineSize / numberOfColumns;
    let lineNumber = 1;
    let lineContent = '';
    for (const key in sortedSounds) {
      if (lineNumber === maxLines) {
        finalMessage = `\`\`\`markdown\n${lineContent}\`\`\``;
        utils.sendBasicMessage(finalMessage, interaction.channel);
        lineContent = '';
        lineNumber = 0;
      }
      lineContent += `# ${categoriesIndex[key]} (${key})\n`;
      let columnNumber = 1;
      sortedSounds[key].forEach((sound) => {
        const numberOfSpaces = columnWidth - sound.length;
        const fillerSpaces = new Array(numberOfSpaces + 1).join(' ');
        lineContent += `${sound}${fillerSpaces}`;
        if (columnNumber === 6) {
          columnNumber = 1;
          if (sortedSounds[key].slice(-1)[0] !== sound) {
            lineContent += '\n';
            lineNumber += 1;
          }
          if (lineNumber === maxLines) {
            finalMessage = `\`\`\`markdown\n${lineContent}\`\`\``;
            utils.sendBasicMessage(finalMessage, interaction.channel);
            lineContent = '';
            lineNumber = 0;
          }
        } else {
          columnNumber += 1;
        }
      });
      lineContent += '\n\n';
      lineNumber += 1;
    }
    return { content: `\`Listed ${sounds.length} sounds\` ✅` };
    // TODO ADD ERROR HANDLING FOR CATEGORIES NOT PRESENT IN THE INDEX
  },
};
