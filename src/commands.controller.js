const utils = require('./utils/utils');
const voiceUtils = require('./utils/voiceUtils');

async function handleError(interaction, command, args, message, error) {
  const errorEmbed = utils.createErrorEmbed(error);
  const errorResponse = {
    embeds: [errorEmbed] /* , ephemeral: true */,
  };
  if (interaction) {
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorResponse);
      console.error(
        'error after interaction response (or interaction was deferred):',
        error,
      );
    } else {
      await interaction.reply(errorResponse);
      console.error('error before interaction response:', error);
    }
  }
  if (message) {
    console.log('error during command handling:', error);
    utils.logError(error, message.channel);
  }
}

async function commandsController(
  VoiceControl,
  message = null,
  interaction = null,
) {
  let command;
  let args;
  const fakeInteraction = {};

  if (message && !interaction) {
    args = message.content.slice(process.env.PREFIX.length).split(/ +/);
    command = args.shift().toLowerCase();

    fakeInteraction.client = message.client;
    fakeInteraction.voiceChannel =
      await voiceUtils.getUserCurrentChannelFromMsg(message);
    fakeInteraction.channel = message.channel;
    fakeInteraction.member = message.member;
    fakeInteraction.guild = message.guild;
  }
  if (interaction && !message) {
    const input = interaction.options.getString('input');
    args = input ? input.split(/ +/) : [];
    command = interaction.commandName;

    fakeInteraction.realInteraction = interaction;
    fakeInteraction.client = interaction.client;
    fakeInteraction.voiceChannel = interaction.voiceChannel;
    fakeInteraction.channel = interaction.channel;
    fakeInteraction.member = interaction.member;
    fakeInteraction.guild = interaction.guild;
  }

  const userInput = `${fakeInteraction.member.user.username} : ${command} ${args.join(' ') || ''}`;
  console.log('user input =', userInput);

  const commands = fakeInteraction.client.commands;
  try {
    let response;
    switch (command) {
      case 'anison':
        response = await commands
          .get('anison')
          .execute(fakeInteraction, VoiceControl);
        break;
      case 'avatar':
        response = await commands
          .get('avatar')
          .execute(fakeInteraction, args);
        break;
      case 'clear':
        response = await commands
          .get('clear')
          .execute(fakeInteraction, VoiceControl);
        break;
      case 'help':
        response = await commands.get('help').execute(fakeInteraction, args);
        break;
      case 'join':
        response = await commands.get('join').execute(fakeInteraction, args);
        break;
      case 'leave':
        response = await commands
          .get('leave')
          .execute(fakeInteraction, VoiceControl);
        break;
      case 'music':
        response = await commands
          .get('sound')
          .execute(fakeInteraction, args, 'music', VoiceControl);
        break;
      case 'pause':
        response = await commands.get('pause').execute();
        break;
      case 'ping':
        response = await commands.get('ping').execute(fakeInteraction);
        break;
      case 'play':
        response = await commands
          .get('play')
          .execute(fakeInteraction, args, VoiceControl);
        break;
      case 'queue':
        response = await commands.get('queue').execute(args, VoiceControl);
        break;
      case 'restart':
        response = await commands.get('restart').execute();
        break;
      case 'resume':
        response = await commands.get('resume').execute();
        break;
      case 'roll':
        response = await commands.get('roll').execute(fakeInteraction, args);
        break;
      case 'savelist':
        response = await commands
          .get('savelist')
          .execute(fakeInteraction, args);
        break;
      case 'shutdown':
        response = await commands.get('shutdown').execute();
        break;
      case 'skip':
        response = await commands.get('skip').execute(VoiceControl);
        break;
      case 'sound':
        response = await commands
          .get('sound')
          .execute(fakeInteraction, args, 'sound', VoiceControl);
        break;
      case 'soundlist':
        response = await commands
          .get('soundlist')
          .execute(fakeInteraction, args);
        break;
      case 'stop':
        response = await commands.get('stop').execute();
        break;
      default: {
        const error =
          "Désolée, je ne sais pas encore faire ça.\nSi c'est important, tu peux en faire la demande ici : <#751202233105907763>.";
        throw new Error(error);
      }
    }

    if (!response) {
      throw new Error("Désolée, quelqu'un ne sait pas coder...");
    }

    if (interaction) {
      interaction.reply(response).catch(async (error) => {
        handleError(interaction, command, args, message, error);
      });
    } else if (message) {
      if (response.content?.includes('✅')) {
        message.react('✅').catch(async (error) => {
          handleError(interaction, command, args, message, error);
        });
      } else {
        message.channel.send(response).catch(async (error) => {
          handleError(interaction, command, args, message, error);
        });
      }
    }
  } catch (error) {
    handleError(interaction, command, args, message, error);
  }
}

module.exports = commandsController;
