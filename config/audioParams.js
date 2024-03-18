// 1 << 62 gives the biggest number
// dlChunkSize: disabling chunking is recommended in discord bot

const audioParams = {
    filter: 'audioonly',
    fmt: 'mp3',
    highWaterMark: 1 << 62,
    liveBuffer: 1 << 62,
    dlChunkSize: 0,
    bitrate: 128,
    quality: 'lowestaudio',
};

module.exports = audioParams;
