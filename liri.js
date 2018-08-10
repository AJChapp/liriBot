require("dotenv").config();
var keys = require(`./keys.js`)
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require("request");
var fs = require(`fs`);


var spotSong = function () {

    var search = ''
    if (process.argv.length > 4) {
        for (i = 3; i < process.argv.length; i++) {
            if (i == process.argv.length - 1) {
                search += process.argv[i]

            }
            else {

                search += process.argv[i] + ' '
            }
        }
    }

    spotify.search({ type: 'track', query: search }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //   console.log(JSON.parse(data)); 
        console.log(`↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓`)
        console.log(`Song Name: ${data.tracks.items[0].name}`);
        console.log(`Artist Name: ${data.tracks.items[0].artists[0].name}`);
        console.log(`Album Name:  ${data.tracks.items[0].album.name}`);
        console.log(`Spotify URL: ${data.tracks.items[0].external_urls.spotify}`);
        console.log(`↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑`)
    });
}

var movieSearch = function () {
    var search = ''
    if (process.argv.length > 4) {
        for (i = 3; i < process.argv.length; i++) {
            if (i == process.argv.length - 1) {
                search += process.argv[i]

            }
            else {

                search += process.argv[i] + '+'
            }
        }
    }
    request(`http://www.omdbapi.com/?t=${search}&y=&plot=full&apikey=${keys.omdbAPI.key}`, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // console.log(JSON.parse(body))
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
            console.log(`Movie Title: ${JSON.parse(body).Title}`);
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
            console.log(`The movie's IMDB rating is: ${JSON.parse(body).imdbRating}`);
            console.log(`Rotten Tomatoes Score: ${JSON.parse(body).Ratings[1].Value}`);
            console.log(`The Movie Was Made in ${JSON.parse(body).Year}`);
            console.log(`Made in: ${JSON.parse(body).Country}`);
            console.log(`Language: ${JSON.parse(body).Language}`);
            console.log(`Actors/Actresses: ${JSON.parse(body).Actors}`);
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
            console.log(JSON.parse(body).Plot);
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
        }
    });
}

var degToCard = function (deg) {
    if (deg > 11.25 && deg < 33.75) {
        return "NNE";
    } else if (deg > 33.75 && deg < 56.25) {
        return "ENE";
    } else if (deg > 56.25 && deg < 78.75) {
        return "E";
    } else if (deg > 78.75 && deg < 101.25) {
        return "ESE";
    } else if (deg > 101.25 && deg < 123.75) {
        return "ESE";
    } else if (deg > 123.75 && deg < 146.25) {
        return "SE";
    } else if (deg > 146.25 && deg < 168.75) {
        return "SSE";
    } else if (deg > 168.75 && deg < 191.25) {
        return "S";
    } else if (deg > 191.25 && deg < 213.75) {
        return "SSW";
    } else if (deg > 213.75 && deg < 236.25) {
        return "SW";
    } else if (deg > 236.25 && deg < 258.75) {
        return "WSW";
    } else if (deg > 258.75 && deg < 281.25) {
        return "W";
    } else if (deg > 281.25 && deg < 303.75) {
        return "WNW";
    } else if (deg > 303.75 && deg < 326.25) {
        return "NW";
    } else if (deg > 326.25 && deg < 348.75) {
        return "NNW";
    } else {
        return "N";
    }
}
// source↑ https://gist.github.com/felipeskroski/8aec22f01dabdbf8fb6b
var openWeatherSearch = function () {
    query = ``
    if (process.argv.length > 4) {
        for (i = 3; i < process.argv.length; i++) {
            if (i == process.argv.length - 1) {
                query += process.argv[i]
                query = query.replace(`/c`, `,`)
            }
            else {

                query += process.argv[i] + ' '
                query = query.replace(`/c`, `,`)
            }
        }
    }
    request(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=${keys.openWeather.key}`, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            // console.log(JSON.parse(body))
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
            console.log(`City Searched: ${JSON.parse(body).name}`)
            console.log(`Wind Direction (Meteorological Degrees): ${JSON.parse(body).wind.speed}`)
            console.log(`Wind Direction (Cardinal): ${degToCard(JSON.parse(body).wind.speed)}`)
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
        }
        else {
            console.log(error)
            console.log(query)
        }

    })
}

var fileRead = function () {
    fs.readFile(`random.txt`, `utf8`, function (err, data) {
        if (err) {
            console.log(err)
        }
        else {
            var txt = data.split(`,`)
            spotify.search({ type: 'track', query: txt[1] }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                //   console.log(JSON.parse(data)); 
                console.log(`↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓`)
                console.log(`Song Name: ${data.tracks.items[0].name}`);
                console.log(`Artist Name: ${data.tracks.items[0].artists[0].name}`);
                console.log(`Album Name:  ${data.tracks.items[0].album.name}`);
                console.log(`Spotify URL: ${data.tracks.items[0].external_urls.spotify}`);
                console.log(`↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑`)
            });
        }
    })
}


if (process.argv[2] === `movie-this`) {
    movieSearch();
}
else if (process.argv[2] === `windDir`) {
    openWeatherSearch();
}
else if (process.argv[2] === `spotify-this-song`) {
    spotSong();
}
else if (process.argv[2] === `readFile`) {
    fileRead();
}
else {
    console.log(`Not Valid Command`)
}