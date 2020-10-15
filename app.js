const fs = require('fs');
const Discord = require('discord.js');
const Config = require('./config/config.json');
try {
    var Credentials = require('./config/credentials.json');
} catch (err) {
    if (err.code != 'MODULE_NOT_FOUND')
        throw err;
}

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
    //const guild = client.guilds.fetch(process.env.SERVER_ID || Credentials.server_id);

    if (!message.content.startsWith(prefix) || message.author.bot)
        return;
    console.log(message.author.username + ' : ' + message.content);

    var args = message.content.slice(prefix.length).split(/ +/);
    var command = args.shift().toLowerCase();

    switch (command) {
        case 'ping':
            client.commands.get('ping').execute(message, args);
            break;
        case 'join':
            client.commands.get('join').execute(message, args);
            break;
        case 'sound':
            client.commands.get('sound').execute(message, args, 'sound');
            break;
        case 'music':
            client.commands.get('sound').execute(message, args, 'music');
            break;
        case 'leave':
            client.commands.get('leave').execute(message, args);
            break;
        case 'play':
            client.commands.get('play').execute(message, args);
            break;
        default:
            msg = "Désolée, je ne sais pas encore faire ça.\nSi c'est important, tu peux en faire la demande dans le salon #Megumin-Request.";
            console.log(msg);
            message.channel.send(msg);
            break;
    }
});

client.login(process.env.BOT_TOKEN || Credentials.token);

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));