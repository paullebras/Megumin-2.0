module.exports = {
    name: 'resume',
    description: 'this is the resume command.',

    execute(VoiceControl) {
        try {
            VoiceControl.dispatcher.resume();
        } catch (error) {
            console.log(error);
            message.channel.send(error);
        }
    }
}
