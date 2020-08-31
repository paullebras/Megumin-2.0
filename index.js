const fs = require('fs');
const Discord = require('discord.js');
const Config = require('./config/config.json');
const Credentials = require('./config/credentials.json');

const prefix = Config.prefix;

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Megumin-2.0 is now online!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    var args = message.content.slice(prefix.length).split(/ +/);
    var command = args.shift().toLowerCase();

    if (command === 'bonjour' || command === 'ping') {
        client.commands.get('ping').execute(message, args);
    }
});

client.login(Credentials.token);
