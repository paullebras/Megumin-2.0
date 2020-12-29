module.exports = {
    name: 'queue',
    description: 'this is the queue command.',

    execute(message, args, client, VoiceControl) {
        try {
            const response = VoiceControl.frontQueue.length > 0 ? VoiceControl.frontQueue : 'Queue is empty.';
            message.channel.send(response);
        } catch (error) {
            console.log(error);
            message.channel.send(error);
        }
    }
}
