module.exports = {
    name: 'queue',
    description: 'this is the queue command.',

    execute(message, args, client, VoiceControl) {
        try {
            if (VoiceControl.frontQueue.length == 0) {
                message.channel.send('Queue is empty.');
                return;
            } else {
                const response = [];
                for (let index = 0; index < VoiceControl.frontQueue.length; index++) {
                    response.push(VoiceControl.frontQueue[index]);
                }
                response[VoiceControl.queueIndex] = '=> ' + response[VoiceControl.queueIndex];
                message.channel.send(response);
                return;
            }
        } catch (error) {
            console.log(error);
            message.channel.send(error);
        }
    }
}
