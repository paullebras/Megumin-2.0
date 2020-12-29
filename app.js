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

var VoiceControl = {
    "isPlaying": false,
    "queueIndex": 0,
    "queue": [],
    "frontQueue": [],
    "dispatcher": null,
    "connection": null // maybe connection and dispatcher can be merged since dispatcher = connection.play
};

client.on('message', message => {
    //const guild = client.guilds.fetch(process.env.SERVER_ID || Credentials.server_id);

    if (!message.content.startsWith(prefix) || message.author.bot)
        return;
    console.log(message.author.username + ' : ' + message.content);

    var args = message.content.slice(prefix.length).split(/ +/);
    var command = args.shift().toLowerCase();


    switch (command) {
        case 'anison':
            client.commands.get('anison').execute(message, args, client, VoiceControl);
            break;
        case 'join':
            client.commands.get('join').execute(message, args, client, VoiceControl);
            break;
        case 'leave':
            client.commands.get('leave').execute(message, client, VoiceControl);
            break;
        case 'music':
            client.commands.get('sound').execute(message, args, 'music', client, VoiceControl);
            break;
        case 'pause':
            client.commands.get('pause').execute(VoiceControl);
            break;
        case 'ping':
            client.commands.get('ping').execute(message, args);
            break;
        case 'play':
            client.commands.get('play').execute(message, args, client, VoiceControl);
            break;
        case 'queue':
            client.commands.get('queue').execute(message, args, client, VoiceControl);
            break;
        case 'resume':
            client.commands.get('resume').execute(VoiceControl);
            break;
        case 'skip':
            client.commands.get('skip').execute(message, client, VoiceControl);
            break;
        case 'sound':
            client.commands.get('sound').execute(message, args, 'sound', client, VoiceControl);
            break;
        case 'stop':
            client.commands.get('stop').execute(VoiceControl);
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