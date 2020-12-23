**__DONE__**

leave command
msg en cas d'erreur
si le bot est dans un canal vocal, il accepte d'être appelé sans que le user soit également dans un voice channel
switch pour les commandes
play youtube
play:
    pause / resume

**__TODO__**

majuscules sur les mp3 (sur la commande mais aussi sur le nom du fichier)

cas "--sound" sans rien après

soundlist

help => daga kotowaru

check pourquoi elle déco vite quand elle join sans parler
    => setup deco timer

ajouter des checks avant d'appeler les fonctions (nombres d'arguments / types d'argument attendu ...);

apprendre à linker des channels

upload mp3 via front page

play twitch
play anisson

set prefix

clear queue when leave channel ?

add message if already in voice channel when *join* is called
add message if bot not in bot channel when *leave* is calle

set playing + prefix

play:
    stop / queue

spam command: --spam yacine

history (all youtube url queued);

check youtube 10 hours video

jalousie quand play avec autre bot

fichier utils avec fonctions
    => log (cons.log + message.write)
    => checkVoice

clear queue

create a queue which can be cleared and a forever lasting history which can be played

debug queue

skip current song

what happens to dispatcher and connection when megumin is force disconnected via right click => disconnect

replace credentials.json + config.json files with a .env file (see tutorial in chrome bookmarks)

VoiceControl.queue[VoiceControl.queueIndex] = **play
Error: No video id found: **play
Uncaught Promise Rejection ReferenceError: message is not defined
    at D:\Documents\La Voie des Philosophes\6 - Geekeries\Megumin-2.0\commands\play.js:55:21
    at processTicksAndRejections (internal/process/task_queues.js:93:5)