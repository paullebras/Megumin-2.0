const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const voiceUtils = require('../utils/voiceUtils.js');
const utils = require('../utils/utils.js');
const youtubeUtils = require('../youtube/youtube.utils.js');
const { AudioPlayerStatus, createAudioResource } = require('@discordjs/voice');
const audioParams = require('../../config/audioParams.js');
const ytdl = require('ytdl-core');
const Player = require('../core/Player');

const audioPlayer = Player.getInstance();

function createAddToQueueEmbed(videoDetails) {
  const { title, video_url, author, lengthSeconds, thumbnails } = videoDetails;

  return new EmbedBuilder()
    .setAuthor({ name: '✅ Added to queue' })
    .setColor(0x000000)
    .setTitle(title)
    .setURL(video_url)
    .setThumbnail(thumbnails[0].url)
    .addFields({
      name: 'Durée',
      value: utils.secondsToHms(lengthSeconds),
      inline: true,
    })
    .addFields({
      name: 'Chaîne',
      value: `[${author.name}](${author.channel_url})`,
      inline: true,
    });
}

function createPlayEmbed(videoDetails, username) {
  const { title, video_url, author, lengthSeconds, thumbnails } = videoDetails;

  return new EmbedBuilder()
    .setAuthor({
      name: author.name,
      url: author.channel_url,
      iconURL: author.thumbnails[0].url,
    })
    .setColor(0x000000)
    .setTitle(title)
    .setURL(video_url)
    .setThumbnail(thumbnails[0].url)
    .addFields({
      name: 'Durée ',
      value: utils.secondsToHms(lengthSeconds),
      inline: true,
    })
    .addFields({ name: 'Demandée par ', value: username, inline: true });
}

const name = 'play';
const description =
  "Joue l'audio d'une vidéo sur Youtube. A l'avenir, divers sites seront pris en charge.";
const inputDescription = '<youtube URL ou mots clefs>';

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

  // TODO handle case where playback is stopped, curren song stays in queue but next play will play the asked song since isPlaying = false and queue is fucked
  // example where this happens : queue has some elements and bot is playing one of them => leave => play
  async execute(interaction, args, VoiceControl) {
    // TODO use writeStream ?
    // const fileName = info.videoDetails.title.replace(/[^a-z0-9-]/gi, '_');
    // let container = format.container;
    // let writeableSteam = fs.createWriteStream(`${fileName}.${container}`);
    // readableStream.pipe(writeableSteam);
    if (!args.length) {
      throw new Error(
        "La lecture auto de la playlist n'a pas encore été implémentée.",
      );
    }

    let url;
    let videoInfo;

    if (args[0].includes('http://') || args[0].includes('https://')) {
      url = args[0];
      VoiceControl.source = voiceUtils.getSourceFromUrl(url);
    }
    // si les arguments ne comportent pas d'url, on considère qu'il s'agit d'une recherche de vidéo youtube par mot clef
    else {
      url = await youtubeUtils.getYoutubeUrl(args);
      console.log('url =', url);
      VoiceControl.source = 'youtube';
    }

    let duration;
    let title;
    switch (VoiceControl.source) {
      case 'youtube':
        videoInfo = await youtubeUtils.getYoutubeVideoInfos(url);
        duration = videoInfo.videoDetails.lengthSeconds;
        title = videoInfo.videoDetails.title;
        break;
      case 'twitch':
        throw new Error(
          "Désolé, la lecture de contenus Twitch est prévue mais n'a pas encore été implémentée.",
        );
      default: {
        throw new Error(
          'Désolé, je ne gère pas la lecture de contenus extérieurs à Youtube et Twitch. Vous pouvez en faire la demande dans #megumin-request',
        );
      }
    }

    if (!videoInfo) {
      throw 'Désolé, je ne parviens pas à récupérer les informations de ce contenu';
    }

    VoiceControl = voiceUtils.addElementToQueue(
      VoiceControl,
      url,
      title,
      duration,
    );

    const playerStatus = audioPlayer.player.state.status;
    const { Playing, Paused } = AudioPlayerStatus;
    if (playerStatus === Playing || playerStatus === Paused) {
      const addedToQueueEmbed = createAddToQueueEmbed(
        videoInfo.videoDetails
      );
      return { embeds: [addedToQueueEmbed] };
    }

    const channelToJoin = interaction.member.voice.channel;
    const currentChannel = await interaction.voiceChannel;

    await voiceUtils.joinVoice(channelToJoin, currentChannel).catch((error) => {
      throw error;
    });

    const audioResource = createAudioResource(ytdl(url, audioParams));
    await voiceUtils
      .playAudioResource(audioResource, VoiceControl)
      .catch((error) => {
        throw error;
      });
    const playEmbed = createPlayEmbed(
      videoInfo.videoDetails,
      interaction.member.user.username,
    );
    return { embeds: [playEmbed] };
  },
};
