module.exports = {
    name: 'pause',
    description: 'this is the stop command.',

    execute(VoiceControl) {
        VoiceControl.dispatcher.destroy();
    }
}
