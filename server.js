const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const port = 1825;

app.use(express.static('public'));
app.use("/style/style.css", express.static(__dirname + '/style/style.css'));
app.use("/style/game.css", express.static(__dirname + '/style/game.css'));
app.use("/js/client.js", express.static(__dirname + '/js/client.js'));
app.use("/js/VuePlateau.js", express.static(__dirname + '/js/VuePlateau.js'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html');
});

app.get('/games/game-lobby', (req, res) => {
    res.sendFile(__dirname + '/templates/games/game-lobby.html');
});

http.listen(port, () => {
    console.log("Server running !");
});