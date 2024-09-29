require('dotenv').config();
const { readdirSync, statSync } = require('fs');
const { join, resolve } = require('path');
const {
  Client,
  Collection,
  IntentsBitField,
  GatewayIntentBits,
  Events,
} = require('discord.js');
const commandsController = require('./commands/commands.controller');

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

const commandsDir = resolve('src', 'commands');

const commandDirectories = readdirSync(commandsDir).filter((item) => {
  const itemPath = join(commandsDir, item);
  return statSync(itemPath).isDirectory();
});

const commandFiles = commandDirectories.flatMap((dir) => {
  const dirPath = join(commandsDir, dir);
  return readdirSync(dirPath)
    .filter((file) => file.endsWith('.js'))
    .map((file) => {
      return join(dirPath, file);
    });
});

// Load all command files and add them to the commands collection
for (const file of commandFiles) {
  try {
    const command = require(file);
    if (command && command.name) {
      // @ts-ignore
      client.commands.set(command.name, command);
    } else {
      console.warn(`Warning: ${file} is missing a valid 'name' property.`);
    }
  } catch (error) {
    console.error(`Error loading command ${file}:`, error);
  }
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
