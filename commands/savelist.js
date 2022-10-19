/* var fs = require('fs');
var readline = require('readline');
var { google } = require('googleapis');
const { content } = require('googleapis/build/src/apis/content');
var OAuth2 = google.auth.OAuth2;
const utils = require('../utils/utils.js'); */

module.exports = {
    name: 'savelist',
    description: 'this commands takes a youtube playlist url and generates a txt with data from the playlist.',

    async execute(message, args, client, VoiceControl) {
        try {
            const url = args[0];
            const channel = message.channel;

            // const url = 'PLl65YA4-MTEDJHevviaZLZ5wV1s8H_NQE';


            if (url.includes("http://") || url.includes("https://")) {
                if ((url.includes("youtube") || url.includes("youtu.be")) && (url.includes("playlist"))) {


                    userPlaylistId = url.split('list=')[1]
                    // If modifying these scopes, delete your previously saved credentials
                    // at ~/.credentials/youtube-nodejs-quickstart.json
                    var SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];
                    // var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/';
                    var TOKEN_DIR = (process.env.USERPROFILE || process.env.HOME || process.env.HOMEPATH) + '/.credentials/';
                    var TOKEN_PATH = TOKEN_DIR + 'megumin-v2';

                    // Load client secrets from a local file.
                    fs.readFile('./config/client_secret.json', async function processClientSecrets(err, content) {
                        if (err) {
                            console.log('Error loading client secret file: ' + err);
                            return;
                        }
                        // Authorize a client with the loaded credentials, then call the YouTube API.
                        try {
                            data = await authorize(JSON.parse(content), getPlaylistItems);
                            message.channel.send("Attend un moment s'il te plait.");
                            await writeData(data);
                            await message.channel.send("Voici ta playlist.", { files: ["./yourPlaylist.txt"] });
                            // fs.unlink("./yourPlaylist.txt");

                            fs.unlink("./yourPlaylist.txt", (err) => {
                                if (err) {
                                  console.error(err)
                                  return
                                }
                            });
                        } catch (error) {
                            console.log('error =', error);
                        }
                    });

                    /**
                     * Create an OAuth2 client with the given credentials, and then execute the
                     * given callback function.
                     *
                     * @param {Object} credentials The authorization client credentials.
                     * @param {function} callback The callback to call with the authorized client.
                     */
                    function authorize(credentials, callback) {
                        return new Promise((resolve, reject) => {
                            try {
                                var clientSecret = credentials.installed.client_secret;
                                var clientId = credentials.installed.client_id;
                                var redirectUrl = credentials.installed.redirect_uris[0];
                                var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

                                // Check if we have previously stored a token.
                                fs.readFile(TOKEN_PATH, async function (err, token) {
                                    if (err) {
                                        getNewToken(oauth2Client, callback);
                                    } else {
                                        oauth2Client.credentials = JSON.parse(token);
                                        result = await callback(oauth2Client);
                                    }
                                    resolve(result);
                                });
                            } catch (error) {
                                reject(error);
                            }
                        })
                    }

                    /**
                     * Get and store new token after prompting for user authorization, and then
                     * execute the given callback with the authorized OAuth2 client.
                     *
                     * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
                     * @param {getEventsCallback} callback The callback to call with the authorized
                     *     client.
                     */
                    function getNewToken(oauth2Client, callback) {
                        var authUrl = oauth2Client.generateAuthUrl({
                            access_type: 'offline',
                            scope: SCOPES
                        });
                        console.log('Authorize this app by visiting this url: ', authUrl);
                        var rl = readline.createInterface({
                            input: process.stdin,
                            output: process.stdout
                        });
                        rl.question('Enter the code from that page here: ', function (code) {
                            rl.close();
                            oauth2Client.getToken(code, function (err, token) {
                                if (err) {
                                    console.log('Error while trying to retrieve access token', err);
                                    return;
                                }
                                oauth2Client.credentials = token;
                                storeToken(token);
                                callback(oauth2Client);
                            });
                        });
                    }

                    /**
                     * Store token to disk be used in later program executions.
                     *
                     * @param {Object} token The token to store to disk.
                     */
                    function storeToken(token) {
                        try {
                            fs.mkdirSync(TOKEN_DIR);
                        } catch (err) {
                            if (err.code != 'EEXIST') {
                                throw err;
                            }
                        }
                        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                            if (err) throw err;
                            console.log('Token stored to ' + TOKEN_PATH);
                        });
                    }


                    function getPlaylistItems(auth) {
                        return new Promise((resolve, reject) => {
                            try {
                                var service = google.youtube('v3');
                                service.playlistItems.list({
                                    auth: auth,
                                    part: 'snippet,contentDetails',
                                    playlistId: userPlaylistId,
                                    maxResults: 50
                                }, function (err, response) {
                                    if (err) {
                                        console.log('The API returned an error: ' + err);
                                        reject('The API returned an error: ' + err);
                                    }
                                    let arrayOfData = [];

                                    for (const video of response.data.items) {
                                        var parsedData = {
                                            title: video.snippet.title,
                                            url: video.contentDetails.videoId,
                                            date: video.contentDetails.videoPublishedAt,
                                            channelTitle: video.snippet.videoOwnerChannelTitle,
                                            channelUrl: video.snippet.videoOwnerChannelId,
                                        }
                                        arrayOfData.push(parsedData);
                                    }
                                    resolve(arrayOfData);
                                })
                            } catch (error) {
                                throw (error);
                            }
                        })
                    }


                    function writeData(jsonData) {

                        return new Promise((resolve, reject) => {
                            fs.writeFile("yourPlaylist.txt", 'title;url;date;channelTitle;channelUrl' + '\n', function (err) {
                                if (err) {
                                    console.log(err);
                                }
                            })

                            for (const json of jsonData) {
                                let dataToWrite = ''
                                for (const key in json) {
                                    if (key != 'channelUrl') {
                                        dataToWrite += json[key] + ';';
                                    }
                                    if (key == 'channelUrl') {
                                        dataToWrite += json[key] + '\n';
                                    }
                                }

                                fs.appendFile("yourPlaylist.txt", dataToWrite, function (res, err) {
                                    if (err) {
                                        console.log(err);
                                    }
                                })
                            }
                            resolve()
                        })

                    }
                }
            }

        } catch (error) {
            utils.logError(error, message.channel);
        }
    }
}
