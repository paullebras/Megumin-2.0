var axios = require('axios').default;

const apiKey = process.env.YOUTUBE_API_KEY;
const baseUrl = process.env.YOUTUBE_API_URL;
module.exports = {
  searchYoutube: async function (keywords) {
    const response = await axios.get(
      `${baseUrl}/v3/search?key=${apiKey}&q=${encodeURIComponent(keywords)}&part=snippet&type=video`,
    );
    return response;
  },
  searchYoutubePlaylist: async function (playlistId) {
    let allItems = [];
    let nextPageToken = null;

    do {
      const response = await axios.get(
        `${baseUrl}/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}` +
          (nextPageToken ? `&pageToken=${nextPageToken}` : ''),
      );

      const items = response.data.items;
      allItems = allItems.concat(items);

      nextPageToken = response.data.nextPageToken;
    } while (nextPageToken);

    return {
      data: {
        items: allItems,
      },
    };
  },
};
