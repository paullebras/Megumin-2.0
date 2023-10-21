const services = require('../core/services.js');
const utils = require('../utils/utils.js');
const fs = require('fs').promises; // Import fs.promises for async file operations

module.exports = {
    name: 'savelist',
    description: 'Génère un fichier CSV avec les données de la playlist YouTube spécifiée.',
    usage: 'savelist <playlist URL>',
    type: ':wrench: Tools',
    async execute(message, args) {
        try {
            const playlistId = args[0];
            const response = await services.searchPlaylist(playlistId);

            const playlistItems = response.data.items;
            const csvData = [];

            // Define the header line
            const header = 'Video Title,Video URL,Publication Date,Channel Title,Channel URL';
            csvData.push(header);

            for (const item of playlistItems) {
                const video = item.snippet;
                const videoTitle = video.title;
                const videoUrl = `https://www.youtube.com/watch?v=${video.resourceId.videoId}`;
                const publicationDate = video.publishedAt;
                const channelTitle = video.videoOwnerChannelTitle;
                const channelUrl = `https://www.youtube.com/channel/${video.videoOwnerChannelId}`;

                // Format the data as a CSV line
                const csvLine = `${videoTitle},"${videoUrl}",${publicationDate},${channelTitle},"${channelUrl}"`;
                csvData.push(csvLine);
            }

            // Join the CSV lines with line breaks
            const csvText = csvData.join('\n');

            // Write the data to the CSV file using await
            await fs.writeFile('playlist_data.csv', csvText);

            // Send the CSV file as an attachment
            message.channel.send({
                files: [
                    {
                        attachment: './playlist_data.csv',
                        name: 'playlist_data.csv',
                    },
                ],
            });
        }
        catch (error) {
            utils.logError(error, message.channel);
        }
    },
};
