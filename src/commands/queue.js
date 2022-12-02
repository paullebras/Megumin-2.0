const utils = require('../utils/utils.js');

module.exports = {
    name: 'queue',
    description: 'this is the queue command.',

    execute(message, VoiceControl) {
        try {
            if (VoiceControl.frontQueue.length == 0) {
                message.channel.send('Queue is empty.');
                return;
            }
            else {
                let response = [];
                for (let index = 0; index < VoiceControl.frontQueue.length; index++) {
                    response.push(VoiceControl.frontQueue[index]);
                }
                response[VoiceControl.queueIndex] = '=> ' + response[VoiceControl.queueIndex];
                response = JSON.stringify(response);
                message.channel.send(response);
                return;
            }
        }
        catch (error) {
            utils.logError(error, message.channel);
        }
    },
};
