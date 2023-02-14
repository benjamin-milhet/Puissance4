const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const port = 1825;

app.use(express.static('public'));
app.use("/style/style.css", express.static(__dirname + '/style/style.css'));
app.use("/style/style-jeux.css", express.static(__dirname + '/style/style-jeux.css'));
app.use("/js/client.js", express.static(__dirname + '/js/client.js'));
app.use("/js/VuePlateau.js", express.static(__dirname + '/js/VuePlateau.js'));
app.use("/images/fav4.ico", express.static(__dirname + '/images/fav4.ico'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html');
});

app.get('/games/game-lobby', (req, res) => {
    res.sendFile(__dirname + '/templates/games/game-lobby.html');
});

http.listen(port, () => {
    console.log("Server running !");
});

let rooms = [];

io.on('connection', (socket) => {
    console.log("New connection !" + socket.id);

    socket.on('playerData', (data) => {
        console.log("Player data received !");
        console.log(data);

        let room = null;

        if (!data.roomId) {
            room = createRoom(data);
            console.log("Room created !");
        }
    });

    socket.on('disconnect', () => {
        console.log("User disconnected !");
    });
});
 
function createRoom(player) {
    const room = { id: generateRoomId(), players: [] };

    player.roomId = room.id;

    room.players.push(player);
    rooms.push(room);

    return room;
}

function generateRoomId() {
    return Math.random().toString(36).substr(2, 9);
}