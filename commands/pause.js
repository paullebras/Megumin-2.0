module.exports = {
    name: 'pause',
    description: 'this is the pause command.',

    execute(VoiceControl) {
        VoiceControl.dispatcher.pause();
    }
}
