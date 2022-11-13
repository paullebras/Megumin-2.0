require('dotenv').config();
const fs = require('fs');
const Path = require('path');
const { Client, Collection, IntentsBitField } = require('discord.js');

const myIntents = new IntentsBitField();
myIntents.add(IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildVoiceStates);

const client = new Client({ intents: myIntents });

const prefix = process.env.PREFIX;

client.commands = new Collection();
const commandFiles = fs.readdirSync(Path.join('src', 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(Path.join(__dirname, 'src', 'commands', file));
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
    "player": null,
    "connection": null
};

client.on('messageCreate', message => {
    //const guild = client.guilds.fetch(process.env.SERVER_ID || credentials.server_id);

    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    console.log(message.author.username + ' : ' + message.content);

    var args = message.content.slice(prefix.length).split(/ +/);
    var command = args.shift().toLowerCase();


    switch (command) {
        case 'anison':
            client.commands.get('anison').execute(message, VoiceControl);
            break;
        case 'clear':
            client.commands.get('clear').execute(message, VoiceControl);
            break;
        case 'join':
            client.commands.get('join').execute(message, args, VoiceControl);
            break;
        case 'leave':
            client.commands.get('leave').execute(message, VoiceControl);
            break;
        case 'music':
            client.commands.get('sound').execute(message, args, 'music', VoiceControl);
            break;
        case 'pause':
            client.commands.get('pause').execute(message, VoiceControl);
            break;
        case 'ping':
            client.commands.get('ping').execute(message);
            break;
        case 'play':
            client.commands.get('play').execute(message, args, VoiceControl);
            break;
        case 'queue':
            client.commands.get('queue').execute(message, VoiceControl);
            break;
        case 'resume':
            client.commands.get('resume').execute(message, VoiceControl);
            break;
        case 'roll':
            client.commands.get('roll').execute(message, args);
            break;
        // case 'savelist':
        //     client.commands.get('savelist').execute(message, args, client, VoiceControl);
        //     break;
        case 'skip':
            client.commands.get('skip').execute(message, VoiceControl);
            break;
        case 'sound':
            client.commands.get('sound').execute(message, args, 'sound', VoiceControl);
            break;
        case 'stop':
            client.commands.get('stop').execute(VoiceControl, message);
            break;

        default:
            msg = "Désolée, je ne sais pas encore faire ça.\nSi c'est important, tu peux en faire la demande dans le salon #Megumin-Request.";
            console.log(msg);
            message.channel.send(msg);
            break;
    }
});

client.login(process.env.DISCORD_TOKEN);

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));