const { EmbedBuilder } = require('discord.js');

module.exports = {

    logError: function(error, channel) {
        const errorEmbed = new EmbedBuilder()
            .setColor(0x0000)
            .setDescription(`:x:\xa0\xa0${error}`);

        console.error(error);
        channel.send({ embeds: [errorEmbed] });
        return;
    },


    sendBasicMessage: function(text, channel) {
        channel.send(text);
    },


    sendInfoMessage: function(text, channel) {
        const messageEmbed = new EmbedBuilder()
            .setColor(0x0000)
            .setDescription(`:information_source:\xa0\xa0${text}`);

        channel.send({ embeds: [messageEmbed] });
        return;
    },


    sendMessageWithCustomEmbed: function(customEmbed, channel) {
        channel.send({ embeds: [customEmbed] });
        return;
    },


    reactMessage: function(reaction, message) {
        message.react(reaction)
            .catch((error) => {
                this.logError(error, message.channel);
            });
        return;
    },


    secondsToHms: function(d) {
        d = Number(d);

        const h = Math.floor(d / 3600);
        const m = Math.floor(d % 3600 / 60);
        const s = Math.floor(d % 3600 % 60);

        return ('0' + h).slice(-2) + ':' + ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2);
    },

    createFxTwitterLink: function(link) {
        const splittedLink = link.split('x.com');
        return splittedLink.join('fxtwitter.com');
    },
};