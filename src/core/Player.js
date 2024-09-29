const {
  entersState,
  createAudioPlayer,
  NoSubscriberBehavior,
  AudioPlayerStatus,
  getVoiceConnection,
} = require('@discordjs/voice');
const ytdl = require('@distube/ytdl-core');
const { createAudioResource } = require('@discordjs/voice');
const audioParams = require('./../../config/audioParams');

class Player {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties#simulating_private_constructors
  static #isInternalConstructing = false;

  constructor() {
    if (!Player.#isInternalConstructing) {
      throw new TypeError('PrivateConstructor is not constructable');
    }
    Player.#isInternalConstructing = false;

    this.voiceControl = {
      queue: [],
      frontQueue: [],
      durationQueue: [],
      source: '',
    };

    this.player = createAudioPlayer({
      behaviors: {
        // Default behavior is to pause when there are no active subscribers for an audio player.
        // Can be configured to pause, stop, or just continue playing through the stream.
        noSubscriber: NoSubscriberBehavior.Pause,
      },
    });

    this.player.on(AudioPlayerStatus.Idle, async () => {
      this.handleIdleStatus();
    });

    this.player.on('stateChange', (oldState, newState) => {
      console.log(`Audio player: ${oldState.status} => ${newState.status}`);
    });

    this.player.on('error', (error) => {
      console.error('Audio player emitted an error:', error);
    });
  }

  static getInstance() {
    if (!this.instance) {
      Player.#isInternalConstructing = true;
      this.instance = new Player();
    }
    return this.instance;
  }

  async handleIdleStatus() {
    if (
      this.voiceControl.source !== 'soundboard' &&
      this.voiceControl.source !== 'anison'
    ) {
      this.voiceControl.queue.shift();
      this.voiceControl.frontQueue.shift();
      this.voiceControl.durationQueue.shift();
    }

    if (this.voiceControl.queue.length >= 1) {
      this.voiceControl.source = 'youtube';
      const url = this.voiceControl.queue[0];
      if (url) {
        const audioResource = createAudioResource(ytdl(url, audioParams));
        await this.playAudioResource(audioResource).catch((error) => {
          throw error;
        });
      }
    }
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

  playAudioResource(audioResource) {
    return new Promise((resolve) => {
      const connection = getVoiceConnection(process.env.SERVER_ID);
      this.player.play(audioResource);
      try {
        entersState(this.player, AudioPlayerStatus.Playing, 5_000);
        // The player has entered the Playing state within 5 seconds
        resolve();
      } catch (error) {
        // The player has not entered the Playing state and either:
        // 1) The 'error' event has been emitted and should be handled
        // 2) 5 seconds have passed
        console.error(error);
      }
      this.voiceControl.subscription = connection.subscribe(this.player);
    });
  }

  addElementToQueue(url, title, duration) {
    this.voiceControl.queue.push(url);
    this.voiceControl.frontQueue.push(title);
    this.voiceControl.durationQueue.push(duration);
  }
}

module.exports = Player;
