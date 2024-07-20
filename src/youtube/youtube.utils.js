const services = require('./youtube.service.js');
const ytdl = require("@distube/ytdl-core");

module.exports = {
  getYoutubeUrl: async function (args) {
    const searchData = await services.searchYoutube(args);
    const videoId = searchData.data.items[0].id.videoId;
    return `https://www.youtube.com/watch?v=${videoId}`;
  },

  getYoutubeVideoInfos: async function (url) {
    return await ytdl.getBasicInfo(url);
  },
};
