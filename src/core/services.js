const axios = require('axios');

module.exports = {
    searchYoutube: async function(keywords) {
        const key = process.env.YOUTUBE_API_KEY;
        console.log('key =', key);
        console.log('keywords =', keywords);
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${key}&q=${encodeURIComponent(keywords)}&part=snippet&type=video`);
        console.log('after axios call');
        return response;
    },
};