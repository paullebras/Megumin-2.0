const {
  createAudioPlayer,
  NoSubscriberBehavior,
  AudioPlayerStatus,
} = require('@discordjs/voice');

class Player {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties#simulating_private_constructors
  static #isInternalConstructing = false;

  constructor() {
    if (!Player.#isInternalConstructing) {
      throw new TypeError("PrivateConstructor is not constructable");
    }
    Player.#isInternalConstructing = false;

    this.player = createAudioPlayer({
      behaviors: {
        // Default behavior is to pause when there are no active subscribers for an audio player.
        // Can be configured to pause, stop, or just continue playing through the stream.
        noSubscriber: NoSubscriberBehavior.Pause,
      },
    });
  }

  static getInstance() {
    if (!this.instance) {
      Player.#isInternalConstructing = true;
      this.instance = new Player();
    }
    return this.instance;
  }

  pausePlayer() {
    return new Promise((resolve, reject) => {
      if (this.player.state.status === AudioPlayerStatus.Playing) {
        this.player.pause();
        resolve();
      } else {
        reject('Je ne suis pas en train de jouer de musique.');
      }
    });
  }

  resumePlayer() {
    return new Promise((resolve, reject) => {
      if (
        this.player.state.status === AudioPlayerStatus.Paused ||
        this.player.state.status === AudioPlayerStatus.AutoPaused
      ) {
        this.player.unpause();
        resolve();
      } else {
        reject("Il n'y a pas de musique en pause.");
      }
    });
  }

  stopPlayer() {
    return new Promise((resolve, reject) => {
      if (this.player.state.status !== AudioPlayerStatus.Idle) {
        this.player.stop();
        resolve();
      } else {
        reject("Il n'y a pas de musique à arrêter.");
      }
    });
  }
}

module.exports = Player;
