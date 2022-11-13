module.exports = {

    logError: function (error, channel) {
        const stringObj = new String(error);

        console.error(error);
        channel.send(stringObj.toString());
        return;
    },
}