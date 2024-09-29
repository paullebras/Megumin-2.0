const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
  getUserCurrentChannelFromMsg: function (message) {
    return new Promise((resolve) => {
      let currentChannel;
      const connection = getVoiceConnection(process.env.SERVER_ID);
      if (connection) {
        const id = connection.joinConfig.channelId;
        currentChannel = message.guild.channels.cache.find((element) =>
          element.id.includes(id),
        );
      }
      resolve(currentChannel);
    });
  },

  joinVoice: function (requestedChannel, currentChannel) {
    return new Promise((resolve, reject) => {
      try {
        if (!requestedChannel && !currentChannel) {
          throw new Error(
            "Désolée, l'un de nous deux doit être dans un canal vocal",
          );
        }
        if (requestedChannel) {
          if (currentChannel !== requestedChannel) {
            joinVoiceChannel({
              channelId: requestedChannel.id,
              guildId: requestedChannel.guild.id,
              adapterCreator: requestedChannel.guild.voiceAdapterCreator,
            });
          }
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },

  destroyConnection: function (voiceControl) {
    // TODO Do I use the correct way to handle VoiceConnection ? (similar to how I was using isPlaying instead of Player state)
    // https://discordjs.guide/voice/life-cycles.html#subscribing-to-individual-events
    // investigate "VoiceConnection – maintains a network connection to a Discord voice server"
    return new Promise((resolve, reject) => {
      const connection = getVoiceConnection(process.env.SERVER_ID);
      if (connection) {
        connection.destroy();
        resolve(voiceControl);
      } else {
        reject('Je ne suis actuellement connectée à aucun salon vocal.');
      }
    });
  },

  getSourceFromUrl: function (url) {
    if (url.includes('youtube') || url.includes('youtu.be')) {
      return 'youtube';
    }
    if (url.includes('twitch')) {
      return 'twitch';
    }
    return 'Unhandled source';
  },
};
