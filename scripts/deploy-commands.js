const { REST, Routes } = require('discord.js');
const { readdirSync, statSync } = require('node:fs');
const { join } = require('node:path');
require('dotenv').config();

const clientId = process.env.MEGUTEST_CLIENT_ID;
const guildId = process.env.SERVER_ID;
const discordToken = process.env.DISCORD_TOKEN;

// FIND ORIGINAL SCRIPT HERE : https://discordjs.guide/creating-your-bot/command-deployment.html#command-registration

// Grab all command folders from the commands directory
const commands = [];
const foldersPath = join(__dirname, '..', 'src', 'commands');
const commandFolders = readdirSync(foldersPath).filter((item) => {
  const itemPath = join(foldersPath, item);
  return statSync(itemPath).isDirectory();
});

for (const folder of commandFolders) {
  // Grab all command files from the commands directory
  const commandsPath = join(foldersPath, folder);
  const commandFiles = readdirSync(commandsPath).filter((file) =>
    file.endsWith('.js'),
  );
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
      );
    }
  }
}

const rest = new REST().setToken(discordToken);

// Deploy commands
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );

    // Fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );
    console.log('data =', data);
    console.log(
      // @ts-ignore
      `Successfully reloaded ${data.length} application (/) commands.`,
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
