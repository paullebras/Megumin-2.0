**__MAIN FEATURES__**

cas "--sound" sans rien après

soundlist

play twitch / beepbox

set prefix

play:
    stop / queue / clear queue / history (all things that have ever been played);

soundlist

help

set prefix

play twitch / beepbox

**__SECONDARY FEATURES__**

delete the last X messages + search by string and delete ?

new dealabs genshin

check youtube 10 hours video

change current volume / change default volume (for anison ?)

**__FEATURES IMPROVMENTS__**

queue :
=> far too laggy
=> call ytdl twice
=> improve queue design (use embed)
=> may need to clear queue automatically with certain commands or at at certain point (leave ?, stop ?, when leaving channel ?, ...)

anison current track, playlist and next songs, anison history too ?

play : ajouter un texte quand une url n'est pas jouée mais ajoutée à la queue

sound :
=> majuscules sur les mp3 (sur la commande mais aussi sur le nom du fichier)
=> cas "--sound" sans rien après

join : add message if already in voice channel when *join* is called

**__BUG FIXES__**
START ERROR
VoiceControl.queue[VoiceControl.queueIndex] = **play
Error: No video id found: **play
Uncaught Promise Rejection ReferenceError: message is not defined
    at D:\Documents\La Voie des Philosophes\6 - Geekeries\Megumin-2.0\commands\play.js:55:21
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
END ERROR

what happens to dispatcher and connection when megumin is force disconnected via right click => disconnect

START ERROR - pause if never played
D:\Documents\La Voie des Philosophes\6 - Geekeries\Megumin-2.0\commands\pause.js:6
        VoiceControl.dispatcher.pause();
                                ^
TypeError: Cannot read property 'pause' of null
    at Object.execute (D:\Documents\La Voie des Philosophes\6 - Geekeries\Megumin-2.0\commands\pause.js:6:33)
    at Client.<anonymous> (D:\Documents\La Voie des Philosophes\6 - Geekeries\Megumin-2.0\app.js:57:42)
    at Client.emit (events.js:314:20)
    at MessageCreateAction.handle (D:\Documents\La Voie des Philosophes\6 - Geekeries\Megumin-2.0\node_modules\discord.js\src\client\actions\MessageCreate.js:31:14)
    at Object.module.exports [as MESSAGE_CREATE] (D:\Documents\La Voie des Philosophes\6 - Geekeries\Megumin-2.0\node_modules\discord.js\src\client\websocket\handlers\MESSAGE_CREATE.js:4:32)
    at WebSocketManager.handlePacket (D:\Documents\La Voie des Philosophes\6 - Geekeries\Megumin-2.0\node_modules\discord.js\src\client\websocket\WebSocketManager.js:384:31)
    at WebSocketShard.onPacket (D:\Documents\La Voie des Philosophes\6 - Geekeries\Megumin-2.0\node_modules\discord.js\src\client\websocket\WebSocketShard.js:444:22)
    at WebSocketShard.onMessage (D:\Documents\La Voie des Philosophes\6 - Geekeries\Megumin-2.0\node_modules\discord.js\src\client\websocket\WebSocketShard.js:301:10)
    at WebSocket.onMessage (D:\Documents\La Voie des Philosophes\6 - Geekeries\Megumin-2.0\node_modules\ws\lib\event-target.js:132:16)
    at WebSocket.emit (events.js:314:20)
[nodemon] app crashed - waiting for file changes before starting...
END ERROR

START ERROR STOP WITH OTHER COMMANDS THAN PLAY
Megumin-2.0 is now online!
Sanguor : --join
Sanguor : --sound YacineBeepBox-WavySong
Sanguor : --sound BeepBox-Song
Sanguor : --stop
C:\Users\Paul Le Bras\Documents\Projets persos\Megumin-2.0\app.js:75
            client.commands.get('stop').execute(VoiceControl);
                                       ^

TypeError: Cannot read property 'execute' of undefined
    at Client.<anonymous> (C:\Users\Paul Le Bras\Documents\Projets persos\Megumin-2.0\app.js:75:40)
    at Client.emit (events.js:315:20)
    at MessageCreateAction.handle (C:\Users\Paul Le Bras\Documents\Projets persos\Megumin-2.0\node_modules\discord.js\src\client\actions\MessageCreate.js:31:14)
    at Object.module.exports [as MESSAGE_CREATE] (C:\Users\Paul Le Bras\Documents\Projets persos\Megumin-2.0\node_modules\discord.js\src\client\websocket\handlers\MESSAGE_CREATE.js:4:32)
    at WebSocketManager.handlePacket (C:\Users\Paul Le Bras\Documents\Projets persos\Megumin-2.0\node_modules\discord.js\src\client\websocket\WebSocketManager.js:384:31)
    at WebSocketShard.onPacket (C:\Users\Paul Le Bras\Documents\Projets persos\Megumin-2.0\node_modules\discord.js\src\client\websocket\WebSocketShard.js:444:22)
    at WebSocketShard.onMessage (C:\Users\Paul Le Bras\Documents\Projets persos\Megumin-2.0\node_modules\discord.js\src\client\websocket\WebSocketShard.js:301:10)
    at WebSocket.onMessage (C:\Users\Paul Le Bras\Documents\Projets persos\Megumin-2.0\node_modules\ws\lib\event-target.js:132:16)
    at WebSocket.emit (events.js:315:20)
    at Receiver.receiverOnMessage (C:\Users\Paul Le Bras\Documents\Projets persos\Megumin-2.0\node_modules\ws\lib\websocket.js:825:20)
END ERROR STOP WITH OTHER COMMANDS THAN PLAY


2020-09-27T16:54:55.169950+00:00 app[worker.1]: --sound jojo_OhNo
2020-09-27T16:54:55.172502+00:00 app[worker.1]: /app/commands/sound.js:6
2020-09-27T16:54:55.172503+00:00 app[worker.1]: const dispatcher = channel.join()
2020-09-27T16:54:55.172504+00:00 app[worker.1]: ^
2020-09-27T16:54:55.172505+00:00 app[worker.1]:
2020-09-27T16:54:55.172505+00:00 app[worker.1]: TypeError: Cannot read property 'join' of null
2020-09-27T16:54:55.172506+00:00 app[worker.1]: at Object.execute (/app/commands/sound.js:6:36)
2020-09-27T16:54:55.172506+00:00 app[worker.1]: at Client.<anonymous> (/app/app.js:38:38)
2020-09-27T16:54:55.172506+00:00 app[worker.1]: at Client.emit (events.js:315:20)
2020-09-27T16:54:55.172513+00:00 app[worker.1]: at MessageCreateAction.handle (/app/node_modules/discord.js/src/client/actions/MessageCreate.js:31:14)
2020-09-27T16:54:55.172513+00:00 app[worker.1]: at Object.module.exports [as MESSAGE_CREATE] (/app/node_modules/discord.js/src/client/websocket/handlers/MESSAGE_CREATE.js:4:32)
2020-09-27T16:54:55.172514+00:00 app[worker.1]: at WebSocketManager.handlePacket (/app/node_modules/discord.js/src/client/websocket/WebSocketManager.js:384:31)
2020-09-27T16:54:55.172514+00:00 app[worker.1]: at WebSocketShard.onPacket (/app/node_modules/discord.js/src/client/websocket/WebSocketShard.js:444:22)
2020-09-27T16:54:55.172515+00:00 app[worker.1]: at WebSocketShard.onMessage (/app/node_modules/discord.js/src/client/websocket/WebSocketShard.js:301:10)
2020-09-27T16:54:55.172516+00:00 app[worker.1]: at WebSocket.onMessage (/app/node_modules/ws/lib/event-target.js:125:16)2020-09-27T16:54:55.172516+00:00 app[worker.1]: at WebSocket.emit (events.js:315:20)
2020-09-27T16:54:55.218212+00:00 heroku[worker.1]: Process exited with status 1
2020-09-27T16:54:55.249268+00:00 heroku[worker.1]: State changed from up to crashed
2020-09-27T16:54:55.251595+00:00 heroku[worker.1]: State changed from crashed to starting
2020-09-27T16:54:59.622073+00:00 heroku[worker.1]: Starting process with command `node app.js`
2020-09-27T16:55:00.269837+00:00 heroku[worker.1]: State changed from starting to up
2020-09-27T16:55:02.381314+00:00 app[worker.1]: Megumin-2.0 is now online!
2020-09-27T16:55:10.437050+00:00 app[worker.1]: --sound kmlt_arthur
2020-09-27T16:55:10.439539+00:00 app[worker.1]: /app/commands/sound.js:6
2020-09-27T16:55:10.439542+00:00 app[worker.1]: const dispatcher = channel.join()
2020-09-27T16:55:10.439542+00:00 app[worker.1]: ^
2020-09-27T16:55:10.439543+00:00 app[worker.1]:
2020-09-27T16:55:10.439544+00:00 app[worker.1]: TypeError: Cannot read property 'join' of null
2020-09-27T16:55:10.439545+00:00 app[worker.1]: at Object.execute (/app/commands/sound.js:6:36)
2020-09-27T16:55:10.439545+00:00 app[worker.1]: at Client.<anonymous> (/app/app.js:38:38)
2020-09-27T16:55:10.439546+00:00 app[worker.1]: at Client.emit (events.js:315:20)
2020-09-27T16:55:10.439547+00:00 app[worker.1]: at MessageCreateAction.handle (/app/node_modules/discord.js/src/client/actions/MessageCreate.js:31:14)
2020-09-27T16:55:10.439548+00:00 app[worker.1]: at Object.module.exports [as MESSAGE_CREATE] (/app/node_modules/discord.js/src/client/websocket/handlers/MESSAGE_CREATE.js:4:32)
2020-09-27T16:55:10.439549+00:00 app[worker.1]: at WebSocketManager.handlePacket (/app/node_modules/discord.js/src/client/websocket/WebSocketManager.js:384:31)
2020-09-27T16:55:10.439549+00:00 app[worker.1]: at WebSocketShard.onPacket (/app/node_modules/discord.js/src/client/websocket/WebSocketShard.js:444:22)
2020-09-27T16:55:10.439550+00:00 app[worker.1]: at WebSocketShard.onMessage (/app/node_modules/discord.js/src/client/websocket/WebSocketShard.js:301:10)
2020-09-27T16:55:10.439551+00:00 app[worker.1]: at WebSocket.onMessage (/app/node_modules/ws/lib/event-target.js:125:16)2020-09-27T16:55:10.439551+00:00 app[worker.1]: at WebSocket.emit (events.js:315:20)
2020-09-27T16:55:10.493674+00:00 heroku[worker.1]: Process exited with status 1
2020-09-27T16:55:10.528171+00:00 heroku[worker.1]: State changed from up to crashed

**__CODE IMPROVMENTS__**

replace credentials.json + config.json files with a .env file (see tutorial in chrome bookmarks)

check pourquoi elle déco vite quand elle join sans parler
    => setup deco timer

ajouter des checks avant d'appeler les fonctions (nombres d'arguments / types d'argument attendu ...);

apprendre à linker des channels

fichier utils avec fonctions
=> log (cons.log + message.write)

**__DUMB  FEATURES__**

spam command: --spam yacine
jalousie quand play avec autre bot
help => daga kotowaru

**__FRONT__**

upload mp3 via front page

**__DONE__**

leave command
msg en cas d'erreur
si le bot est dans un canal vocal, il accepte d'être appelé sans que le user soit également dans un voice channel
switch pour les commandes
play youtube
play:
    pause / resume
add message if bot not in bot channel when *leave* is called
fichier utils avec fonctions
    => checkVoice
debug queue
skip current song
play anisson