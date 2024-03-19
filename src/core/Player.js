const { createAudioPlayer, NoSubscriberBehavior, AudioPlayerStatus } = require('@discordjs/voice');

class AudioPlayer {
    constructor() {
        this.player = createAudioPlayer({
            behaviors: {
                // Default behavior is to pause when there are no active subscribers for an audio player.
                // Can be configured to pause, stop, or just continue playing through the stream.
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });
    }

    pausePlayer() {
        return new Promise((resolve, reject) => {
            if (this.player.state.status === AudioPlayerStatus.Playing) {
                this.player.pause();
                resolve();
            }
            else {
                reject('Je ne suis pas en train de jouer de musique.');
            }
        });
    }

    resumePlayer() {
        return new Promise((resolve, reject) => {
            if (this.player.state.status === AudioPlayerStatus.Paused || this.player.state.status === AudioPlayerStatus.AutoPaused) {
                this.player.unpause();
                resolve();
            }
            else {
                reject('Il n\'y a pas de musique en pause.');
            }
        });
    }

    stopPlayer() {
        return new Promise((resolve, reject) => {
            if (this.player.state.status !== AudioPlayerStatus.Idle) {
                this.player.stop();
                resolve();
            }
            else {
                reject('Il n\'y a pas de musique à arrêter.');
            }
        });
    }
}

// Singleton pattern
const audioPlayerInstance = new AudioPlayer();
module.exports = audioPlayerInstance;