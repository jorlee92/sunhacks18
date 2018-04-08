const express = require('express');
const path = require('path');
const app = express();
const Axios = require('axios');


var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "2449c561a2b74d559e513f8f1494cf7b",
  secret: "0b600a1fa91b497583d62ea577f20baf"
});

// app.use(express.static(path.join(__dirname, 'build')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/proxy/:lat/:long', function(req, res) {
    let response = "";
    let lat = req.params.lat;
    let long = req.params.long;
    Axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=` + 
    `8GeWhE6iAVe1C4OaVvktBfauENCKgwxw&latlong=${lat},${long}&classificationName=music`)
    .then(data => {
         res.json(data.data._embedded.events);
    }).catch(error => {
        console.log(error.response);
        res.send(error.response);
    })

})

app.get('/artists/:name', function(req, res){
    let artistName = req.params.name;
    spotify.search({ type: 'artist', query: artistName })
    .then((result) => {
        //Potentially a big issue here is the fact that that we will assume the first result is the right one
        res.json(result.artists.items[0]);
    })
})


app.get('/ping', function (req, res) {
    res.json({res: "json response"});
   });
app.listen(3001);