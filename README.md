# Discord Bot - Megumin-2.0

A Discord bot written in JavaScript using the Discord.js library.

## Functionalities

- Music: The bot can play music from YouTube by taking a search query (not implemented yet) or a direct link as input. It can also create playlists.

- Web radio: The bot includes a web radio command that plays the "Anison" web radio in the current voice channel. The "Anison" web radio plays songs from various anime shows.

- Dice rolling: The bot includes a dice rolling command that allows users to roll a random number, similar to rolling a physical dice. The user can choose the number of dice and the number of faces on each dice.

- Soundbox: The bot includes a soundbox feature that allows users to play short sound clips from a predefined list. Users can use the `!sound` command followed by the name of the sound to play it in the current voice channel. For example:

```
!sound HastaLaVista
```



You can customize the list of available sounds by adding or removing audio files from the `soundboard` directory in the bot's code.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- A Discord account
- A Discord bot token (instructions on how to get one can be found [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html))

### Installing

1. Clone the repository

```
git clone https://github.com/Sanguor/Megumin-2.0.git
```

2. Install dependencies

```
npm install
```

3. Copy the `.env.mock` file, rename it `.env` and add the required credentials.

4. Run the bot

```
npm start
```

## Usage

The bot can be controlled through commands issued in Discord channels. A list of available commands can be obtained by using the $help command.



## Built With

- [Discord.js](https://discord.js.org/) - A powerful JavaScript library for interacting with the Discord API





## Authors

- [Paul LE BRAS](https://github.com/paullebras) - Initial work


## Release History

- v1.0.0 (2020-23-12)
  - Initial release


- v2.0.0 (2022-19-10)
  - Update code to use discord.js v14

