const { EmbedBuilder } = require('discord.js');

module.exports = {

    createErrorEmbed: function(error) {
        return new EmbedBuilder()
            .setColor(0x0000)
            .setDescription(`:x:\xa0\xa0${error.message || error}`);
    },

    logError: function(error, channel) {
        const errorEmbed = this.createErrorEmbed(error);
        console.error(error.message || error);
        channel.send({ embeds: [errorEmbed] });
        return;
    },


    sendBasicMessage: function(text, channel) {
        channel.send(text);
    },


    createInfoEmbed: function(text) {
        return new EmbedBuilder()
            .setColor(0x0000)
            .setDescription(`:information_source:\xa0\xa0${text}`);
    },


    sendMessageWithCustomEmbed: function(customEmbed, channel) {
        channel.send({ embeds: [customEmbed] });
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