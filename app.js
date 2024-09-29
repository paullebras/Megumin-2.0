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

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  commandsController(null, interaction);
});

client.on(Events.MessageCreate, (message) => {
  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) {
    // if (message.content.includes('x.com')) {
    //     utils.sendBasicMessage(utils.createFxTwitterLink(message.content), message.channel);
    // }
    return;
  }
  commandsController(message, null);
});

client.login(process.env.DISCORD_TOKEN);

process.on('unhandledRejection', (error) =>
  console.error('Uncaught Promise Rejection', error),
);
