module.exports = {
    name: 'pause',
    description: 'this is the pause command.',

    execute(VoiceControl) {
        VoiceControl.dispatcher.pause().then((var1) => {
            const msg = 'succesfully paused';
            console.log(var1);
            message.channel.send(var1);
            console.log(msg);
            message.channel.send(msg);
        }).catch((error) => {
            console.log(error);
            message.channel.send(error);
        });
    }
}
