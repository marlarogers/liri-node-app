require("dotenv").config();
var axios = require("axios");

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var lookup = process.argv[3];

var concertThis = function (lookup) {
    console.log("concerting");
    var URL = "https://rest.bandsintown.com/artists/" + lookup + "/events?app_id=codingbootcamp"
    axios.get(URL).then(function(response) {
        var concerts = response.data;
        for (var i = 0; i < 3; i++){
            console.log("---------------")
            console.log("Venue name: " + concerts[i].venue.name);
            console.log("Venue city: " + concerts[i].venue.country);
            console.log("Concert date: " + concerts[i].datetime);
            console.log("---------------")
        }
    })
}


var movieThis = function (lookup) {
    console.log("movieing");

    var URL = "http://www.omdbapi.com/?t=" + lookup + "&apikey=trilogy"
    console.log(URL)
    axios.get(URL).then(function(response) {
    
        
        var movies = response.data;
        for (var i = 0; i < 1; i++){
            console.log("---------------")
            console.log("Title: " + movies.Title);
            console.log("Release Year: " + movies.Year);
            console.log("IMDB Rating: " + movies.Ratings.imdbRating);
            console.log("Country: " + movies.Country);
            console.log("Language: " + movies.Language);
            console.log("Plot: " + movies.Plot);
            console.log("Actors: " + movies.Actors);
            console.log("---------------")
        }
    })
}

var spotifyThis = function (lookup) {
    console.log("spotifying");
    spotify.search({ type: 'track', query: lookup }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        // console.log(JSON.stringify(data.tracks.items[0].album.name, null, 4));
        var songs = data.tracks.items;
        for (var i = 0; i < 1; i++){
            console.log("---------------")
            console.log("Artist: " + songs[i].artists[0].name);
            console.log("Song: " + songs[i].name);
            console.log("Preview: " + songs[i].external_urls.spotify);
            console.log("Album: " + songs[i].album.name);
            // console.log("Album: " + songs[i].datetime);
            console.log("---------------")
        }
       
    //   console.log(data.tracks.items);
    });
}

switch(action) {
    case "concertThis":
    concertThis(lookup);
    break

    case "movieThis":
    movieThis(lookup);
    break

    case "spotifyThis":
    spotifyThis(lookup);
    break

};

