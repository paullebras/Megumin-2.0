const { SlashCommandBuilder } = require('discord.js');

const name = 'restart';
const description =
  'Redémarre le bot. Fix temporaire du bug suivant https://github.com/discordjs/discord.js/issues/7232.';

module.exports = {
  name: name,
  description: description,
  usage: 'restart',
  type: ':wrench: Tools',
  data: new SlashCommandBuilder().setName(name).setDescription(description),
  execute() {
    // https://nodejs.org/api/process.html#event-exit
    // The node:child_process module provides the ability to spawn subprocesses
    // cwd <string> | <URL> Current working directory of the child process. Default: process.cwd().
    // https://nodejs.org/api/child_process.html#optionsdetached
    // https://nodejs.org/api/child_process.html#optionsstdio

    setTimeout(function () {
      process.on('exit', function () {
        require('child_process').spawn(process.argv.shift(), process.argv, {
          cwd: process.cwd(),
          detached: true,
          stdio: 'inherit',
        });
      });
      process.exit();
    }, 5000);
    return { content: '`Bot has restarted` ✅' };
  },
};
