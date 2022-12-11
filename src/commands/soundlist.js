const utils = require('../utils/utils.js');
const fs = require('fs');
const Path = require('path');
const { EmbedBuilder } = require('discord.js');


module.exports = {
    name: 'soundlist',
    type: ':wrench: Tools',
    description: 'Affiche la liste des sons de la catégorie spécifiée. Si aucune catégorie n\'est précisée : affiche la liste de tous les sons.',
    usage: 'soundlist <sound_category>',
    async execute(message, args) {
        try {

            // https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Keyed_collections ???

            const categoriesIndex = {
                ad: 'Antoine Daniel',
                bg: 'Bapt&Gael',
                cdi: 'CD-i Zelda ',
                cly: 'Clyde Vanilla',
                go: 'Google Voice',
                jdg: 'Joueur du Grenier',
                jojo: 'Jojo\'s Bizarre Adventure',
                kmlt: 'Kaamelott',
                kassos: 'Les Kassos',
                ks: 'Konosuba',
                lol: 'League of Legends',
                lotr: 'Lord of the Rings',
                misc: 'Divers',
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
            const sounds = fs.readdirSync(Path.join('src', 'soundboard')).map(sound => sound.split('.')[0]);

            const sortedSounds = {};
            for (const cat in categoriesIndex) {
                sortedSounds[cat] = [];
            }
            sortedSounds['misc'] = [];

            for (const sound of sounds) {
                const temp = sound.split('_');
                if (sound.includes('_')) {
                    sortedSounds[temp[0]].push(temp[1]);
                }
                else {
                    sortedSounds['misc'].push(temp[0]);
                }
            }


            // TODO make this work so that it only considers files even if there is no folder here (supposedly)
            /* const soundsFiles = fs.readdirSync(Path.join('src', 'soundboard'), { withFileTypes: true }).map(sound => sound.name.split('.')[0]); */
            // User specified a category => We provide the list of all the audio files belonging to this category
            if (args.length > 0) {
                const key = args[0];
                const embedFields = [];
                let content = '';
                sortedSounds[key].forEach(element => {
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

                utils.sendMessageWithCustomEmbed(soundListEmbed, message.channel);
                return;
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
                    utils.sendBasicMessage(finalMessage, message.channel);
                    lineContent = '';
                    lineNumber = 0;
                }
                lineContent += `# ${categoriesIndex[key]}\n`;
                let columnNumber = 1;
                sortedSounds[key].forEach(sound => {
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
                            utils.sendBasicMessage(finalMessage, message.channel);
                            lineContent = '';
                            lineNumber = 0;
                        }
                    }
                    else {
                        columnNumber += 1;
                    }
                });
                lineContent += '\n\n';
                lineNumber += 1;
            }

        }

        // TODO ADD ERROR HANDLING FOR CATEGORIES NOT PRESENT IN THE INDEX

        catch (error) {
            utils.logError(error, message.channel);
        }
    },
};