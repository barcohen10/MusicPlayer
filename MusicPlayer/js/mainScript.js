$(document).ready(function () {
    var allSongs = [];

    (function getAllSongsFromJSON()
    {
        $.getJSON("http://shmulik.mybluemix.net/playlist")
.done(function (json) {
    json = json.response.songs;
    for (var i = 0; i < json.length; i++) {
        allSongs.push(new Song(json[i].artist_name, json[i].title));
        $("#plList").append("<li> <div class='plItem'> <div class='plNum'>" + (i+1) + ".</div> <div class='plTitle'>" + json[i].artist_name + " - "  + json[i].title + " </div> </div> </li>");
    }

});
    })();


});