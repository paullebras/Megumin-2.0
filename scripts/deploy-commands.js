const { REST, Routes } = require('discord.js');
const { readdirSync } = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const clientId = process.env.MEGUTEST_CLIENT_ID;
const guildId = process.env.SERVER_ID;
const discordToken = process.env.DISCORD_TOKEN;

// FIND ORIGINAL SCRIPT HERE : https://discordjs.guide/creating-your-bot/command-deployment.html#command-registration

// START LOOP FOR COMMANDS FOLDER WITHOUT SUB FOLDERS

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const commandsPath = path.join(__dirname, '../src/commands');

const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));
// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    }
    else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// END LOOP FOR COMMANDS FOLDER WITHOUT SUB FOLDERS

// TODO - ADD SUBFOLDERS IN COMMANDS FOLDER AND USE THE FOLLOWING CODE
// THIS IS THE PROPER WAY TO DO THING
// const commands = [];
// // Grab all the command folders from the commands directory you created earlier
// const foldersPath = path.join(__dirname, 'commands');
// const commandFolders = fs.readdirSync(foldersPath);

// for (const folder of commandFolders) {
// 	// Grab all the command files from the commands directory you created earlier
// 	const commandsPath = path.join(foldersPath, folder);
// 	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
// 	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
// 	for (const file of commandFiles) {
// 		const filePath = path.join(commandsPath, file);
// 		const command = require(filePath);
// 		if ('data' in command && 'execute' in command) {
// 			commands.push(command.data.toJSON());
// 		} else {
// 			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
// 		}
// 	}
// }

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(discordToken);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );
        console.log('data =', data);
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    }
    catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();
