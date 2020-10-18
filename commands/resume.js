module.exports = {
    name: 'resume',
    description: 'this is the resume command.',

    execute(VoiceControl) {
        VoiceControl.dispatcher.resume();
    }
}
