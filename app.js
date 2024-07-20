require('dotenv').config();
const { readdirSync } = require('fs');
const Path = require('path');
const {
  Client,
  Collection,
  IntentsBitField,
  GatewayIntentBits,
  Events,
} = require('discord.js');
const { createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const voiceUtils = require('./src/utils/voiceUtils');
const ytdl = require("@distube/ytdl-core");
const audioParams = require('./config/audioParams');
const Player = require('./src/core/Player');
const commandsController = require('./src/commands.controller');

const intents = new IntentsBitField().add(
  GatewayIntentBits.Guilds,
  IntentsBitField.Flags.Guilds,
  IntentsBitField.Flags.GuildMessages,
  IntentsBitField.Flags.MessageContent,
  IntentsBitField.Flags.GuildVoiceStates,
);

const client = new Client({ intents: intents });

// @ts-ignore
client.commands = new Collection();
const commandFiles = readdirSync(Path.join('src', 'commands')).filter((file) =>
  file.endsWith('.js'),
);

for (const file of commandFiles) {
  const command = require(Path.join(__dirname, 'src', 'commands', file));
  // @ts-ignore
  client.commands.set(command.name, command);
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

const VoiceControl = {
  queue: [],
  frontQueue: [],
  durationQueue: [],
  source: '',
};
const audioPlayer = Player.getInstance();

// TODO - Move player listeners to Player constructor ? It requires to have acess to VoiceControl inside of player
audioPlayer.player.on(AudioPlayerStatus.Idle, async () => {
  if (
    VoiceControl.source !== 'soundboard' &&
    VoiceControl.source !== 'anison'
  ) {
    VoiceControl.queue.shift();
    VoiceControl.frontQueue.shift();
    VoiceControl.durationQueue.shift();
  }
  if (VoiceControl.queue.length >= 1) {
    VoiceControl.source = 'youtube';
    const url = VoiceControl.queue[0];
    if (url) {
      const audioResource = createAudioResource(ytdl(url, audioParams));
      await voiceUtils
        .playAudioResource(audioResource, VoiceControl)
        .catch((error) => {
          throw error;
        });
    }
  }
});

audioPlayer.player.on('stateChange', (oldState, newState) => {
  console.log(`Audio player : ${oldState.status} => ${newState.status}`);
});
audioPlayer.player.on('error', (error) => {
  console.error('Audio player emitted an error:', error);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  commandsController(VoiceControl, null, interaction);
});

client.on(Events.MessageCreate, (message) => {
  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) {
    // if (message.content.includes('x.com')) {
    //     utils.sendBasicMessage(utils.createFxTwitterLink(message.content), message.channel);
    // }
    return;
  }
  commandsController(VoiceControl, message, null);
});

client.login(process.env.DISCORD_TOKEN);

process.on('unhandledRejection', (error) =>
  console.error('Uncaught Promise Rejection', error),
);
