module.exports = {
    name: 'stop',
    description: 'this is the stop command.',

    execute(VoiceControl) {
        VoiceControl.dispatcher.destroy();
    }
}
