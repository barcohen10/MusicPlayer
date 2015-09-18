$(document).ready(function () {
    var allSongs = [];
    var currentSong = 0;
    var playerEl = document.getElementById("musicPlayer");
    var track;

    function googleNewsS() {
        $.ajax({
            url: 'http://shmulik.mybluemix.net/googlenewss',
            dataType: 'text',
            success: function (data) {
                gns = data;
                gns = gns.replace(/:/gi, "");
                gns = gns.replace(/;/gi, ":");
                gns = gns.replace(/.com/gi, "");
                gns = gns.replace(/.co/gi, "");
                gns = gns.replace(/.uk/gi, "");
                talk(gns);
            },
            error: function (request, error) {
                alert("Request: Google newse error");
            }
        });
    }

    function renderTrack(title, artist) {
        var width = 200;
        var height = 200;

        track = window.tomahkAPI.Track(title, artist, {
            width: width,
            height: height,
            autoplay:1,
            disabledResolvers: ["Youtube", "Exfm"],
            handlers: {
                onended: function () {
                    playNext();
                }
            }
        });

        playerEl.appendChild(track.render());
    }
  
    function googleNews() {
        $.ajax({
            url: 'http://shmulik.mybluemix.net/googlenews',
            dataType: 'text',
            success: function (data) {
                gn = data;
                //gn=gn.replace(/:/gi,"");
                gn = gn.replace(/;/gi, ":");
                gn = gn.replace(/.com/gi, "");
                gn = gn.replace(/.co/gi, "");
                gn = gn.replace(/.uk/gi, "");
                // talk(gn);
                googleNewsS();
                alert("google news sucess");
            },
            error: function (request, error) {
                alert("Request: google news error");
            }
        });
    }

    function playNext()
    {
        if ((currentSong + 1) <= allSongs.length) {
            currentSong++;
            playSong(currentSong);
        }
    }

    function playSong(index) {
        $("#musicPlayer").empty();
        if (allSongs[index].getArtistName() != "Google")
        {
            renderTrack(allSongs[index].getSongTitle(), allSongs[index].getArtistName());
        }
        else
        {
            googleNews();
        }
        $("#plList li").css("background-color", "#231F20");
        $('#song' + index).css("background-color", "DARKSLATEGREY");
    }

    (function getAllSongsFromJSON() {
        $.getJSON("http://shmulik.mybluemix.net/playlist")
.done(function (json) {
    json = json.response.songs;
    var songNumber = 0;
    for (var i = 0; i < json.length; i++) {
        if ((songNumber + 1) % 5 != 0) {
            allSongs.push(new Song(json[i].artist_name, json[i].title));
            $("#plList").append("<li id=song" + songNumber + "><div class='plItem'> <div class='plNum'>" + (songNumber + 1) + ".</div> <div class='plTitle'>" + json[i].artist_name + " - " + json[i].title + " </div> </div> </li>");
        }
        else {
            allSongs.push(new Song("Google", "News"));
            $("#plList").append("<li id=song" + songNumber + "><div class='plItem'> <div class='plNum'>" + (songNumber + 1) + ".</div> <div class='plTitle'>" + "Google - News" + "</div> </div> </li>");
            songNumber++;
            allSongs.push(new Song(json[i].artist_name, json[i].title));
            $("#plList").append("<li id=song" + songNumber + "><div class='plItem'> <div class='plNum'>" + (songNumber + 1) + ".</div> <div class='plTitle'>" + json[i].artist_name + " - " + json[i].title + " </div> </div> </li>");
        }
        songNumber++;
    }
    playSong(0);
});
    })();

    $("#btnNext").click(function () {
        playNext();
    });

    $("#btnPrev").click(function () {
        if ((currentSong - 1) >= 0) {
            currentSong--;
            playSong(currentSong);
        }
    });


});