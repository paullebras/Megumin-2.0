const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const utils = require('../utils/utils.js');

function createQueueEmbed(
  content,
  duration,
  numberOfSongs,
  requiredPage,
  numberOfPages,
) {
  const playEmbed = new EmbedBuilder()
    .setColor(0x000000)
    .setDescription(content)
    .setTitle("Playlist de l'Empire des Connards")
    .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    // .setThumbnail('attachment://meguminthumbsup.png')
    .setThumbnail('https://cdn3.emoji.gg/emojis/9899-meguminthumbsup.png')
    .addFields({ name: '\u200b\nDurée', value: duration, inline: true })
    .addFields({
      name: '\u200b\nTaille',
      value: numberOfSongs,
      inline: true,
    })
    .addFields({
      name: '\u200b\nPage',
      value: `${requiredPage}/${numberOfPages}`,
      inline: true,
    });

  return playEmbed;
}

async function calculateTotalQueueDuration(durations) {
  let durationSeconds = 0;

  for (const time of durations) {
    durationSeconds += parseInt(time);
  }
  const durationHms = utils.secondsToHms(durationSeconds);

  return durationHms;
}

const name = 'queue';
const description = 'Affiche la liste des audio en attente de lecture.';
const inputDescription = '<page number>';
const usage = `${name} or ${name} ${inputDescription}`;

module.exports = {
  name: name,
  description: description,
  usage: `${name} ${inputDescription}`,
  type: ':notes: Music',
  data: new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addStringOption((option) =>
      option.setName('input').setDescription(inputDescription),
    ),
  async execute(args, VoiceControl) {
    if (!VoiceControl.frontQueue.length) {
      const emptyQueuInfoEmbed = utils.createInfoEmbed(
        "Il n'y a aucune vidéo en attente de lecture.",
      );
      return { embeds: [emptyQueuInfoEmbed] };
    }

    if (args.length && isNaN(args[0])) {
      throw new Error(`Queue needs a number. Usage : ${usage}`);
    }
    const requiredPage = !args.length ? 1 : args[0];

    // TODO Remove songs from queue after they have been played ? => Fixes at least previous issue since current song would always be at index 0 => DONE
    // TODO Handle auto play next song => DONE
    // TODO Handle play with no args if songs are still in queue ?
    // TODO find how to use local images in embed : https://stackoverflow.com/questions/51199950/how-do-i-use-a-local-image-on-a-discord-js-rich-embed
    let queue = '\u200b\n**EN COURS : **\n\n';
    /* VoiceControl.queue = [
            'https://www.youtube.com/watch?v=IAGJ8lYl_5E',
            'https://www.youtube.com/watch?v=kyULO1HILkE',
            'https://www.youtube.com/watch?v=_sLHf38gY_4',
            'https://www.youtube.com/watch?v=pOm-jTZvp-E',
            'https://www.youtube.com/watch?v=TF21AsQZWDU',
            'https://www.youtube.com/watch?v=6fp81GzKarQ',
            'https://www.youtube.com/watch?v=0lkpOZ22n08',
            'https://www.youtube.com/watch?v=omxj5Ddfgvk',
            'https://www.youtube.com/watch?v=7dlL2UabUFk',
            'https://www.youtube.com/watch?v=Y2RezTJUQGw',
            'https://www.youtube.com/watch?v=6MIZDiAbveQ',
            'https://www.youtube.com/watch?v=iiIjY7WzenA',
        ];
        VoiceControl.frontQueue = [
            '【ASMR】 Fluffy ASMR to heal your soul ♡ Ear cleaning & positive affirmations',
            'いじめっ子Bully （Lofi Ver. Instrumental）',
            '[Longmix] Final Fantasy X - Wandering Flames',
            'Calm before the Storm - Final Fantasy X - 1 hour loop',
            '【CITYPOP】Japanese Female Citypop 1992-95🚬 ~ Late Night シティポップ',
            'Final Fantasy X - OST - To Zanarkand',
            'To Zanarkand with Relaxing Rain and Thunders | Final Fantasy X Sad ASMR Ambience Music',
            'This video has the longest title on youtube its record breaking with how much stuff is in this title',
            'World`s Longest Title: This video has the longest title on Youtube. This is as long as the title....',
            '【派對咖孔明】插入歌「Be Crazy For Me」完整版MAD（中英翻譯）',
            'A True Orcat',
            '【ASMR】 Tingly Tapping & Onomatopoeia ♡ Soft Whispering',
        ];

        VoiceControl.durationQueue = [
            '3644',
            '334',
            '1821',
            '3745',
            '3911',
            '185',
            '1877',
            '31',
            '34',
            '275',
            '36',
            '3780',
        ]; */

    const numberOfPages = Math.ceil(VoiceControl.frontQueue.length / 10);

    const startIndex = (requiredPage - 1) * 10 + 1;
    const endIndex = startIndex + 9;

    queue += `[${VoiceControl.frontQueue[0]}](${VoiceControl.queue[0]})\n`;
    queue += '\n\n**A SUIVRE : **\n\n';
    for (let index = startIndex; index <= endIndex; index++) {
      if (VoiceControl.frontQueue[index]) {
        queue += `${index}. [${VoiceControl.frontQueue[index]}](${VoiceControl.queue[index]})\n\n`;
      }
    }
    // const currentSong = `[${VoiceControl.frontQueue[0]}](${VoiceControl.queue[0]})`;
    const totalDurationHms = await calculateTotalQueueDuration(
      VoiceControl.durationQueue,
    );
    const queueEmbed = createQueueEmbed(
      queue,
      totalDurationHms,
      VoiceControl.frontQueue.length.toString(),
      requiredPage.toString(),
      numberOfPages.toString(),
    );
    return { embeds: [queueEmbed] };
  },
};
