const { REST, Routes } = require('discord.js');
require('dotenv').config();

const clientId = process.env.MEGUTEST_CLIENT_ID;
const guildId = process.env.SERVER_ID;
const discordToken = process.env.DISCORD_TOKEN;

const commandId = '1219764791644520610';

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(discordToken);

// for guild-based commands
rest
  .delete(Routes.applicationGuildCommand(clientId, guildId, commandId))
  .then(() => console.log('Successfully deleted guild command'))
  .catch(console.error);

// for global commands
// rest.delete(Routes.applicationCommand(clientId, 'commandId'))
// 	.then(() => console.log('Successfully deleted application command'))
// 	.catch(console.error);
