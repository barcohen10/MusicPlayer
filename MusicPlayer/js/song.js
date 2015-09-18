function Song(artistName, songTitle) {
    this.artistName = artistName;
    this.songTitle = songTitle;
    this.url = "http://toma.hk/embed.php?artist=" + artistName + "&title=" + songTitle + "&autoplay=true";
}

Song.prototype.getArtistName = function () {
    return this.artistName;
};

Song.prototype.getSongTitle = function () {
    return this.songTitle;
};

Song.prototype.getUrl = function () {
    return this.url;
};