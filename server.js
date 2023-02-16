const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const port = 1825;

app.use(express.static('public'));
app.use("/style/style.css", express.static(__dirname + '/style/style.css'));
app.use("/style/style-jeux.css", express.static(__dirname + '/style/style-jeux.css'));
app.use("/style/style-room.css", express.static(__dirname + '/style/style-room.css'));
app.use("/js/client.js", express.static(__dirname + '/js/client.js'));
app.use("/js/VuePlateau.js", express.static(__dirname + '/js/VuePlateau.js'));
app.use("/images/fav4.ico", express.static(__dirname + '/images/fav4.ico'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html');
});

app.get('/games/game-lobby', (req, res) => {
    res.sendFile(__dirname + '/templates/games/game-lobby.html');
});

app.get('/games/room-lobby', (req, res) => {
    res.sendFile(__dirname + '/templates/games/room-lobby.html');
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
            console.log(data.socketId);
            console.log("Room created !");
        } else {
            room = rooms.find(room => room.id === data.roomId);
            console.log("Room found !");
            data.socketId = socket.id;

            if (room === undefined) {
                return;
            }

            room.players.push(data);
        }
        
        //data.socketId = socket.id;

        socket.join(room.id);
        io.to(socket.id).emit('roomData', room.id);

        if (room.players.length === 2) {
            console.log("Start game !");
            io.to(room.id).emit('startGame', room.players);
        }

    });

    socket.on('getRooms', () => {
        console.log("Get rooms !");
        io.to(socket.id).emit('rooms', rooms);
    });

    socket.on('disconnect', () => {
        console.log("User disconnected !");

        let room = null;

        rooms.forEach(r => {
            r.players.forEach(p => {
                console.log(p.socketId + " " + socket.id);
                if (p.socketId === socket.id && p.host) {
                    room = r;
                    rooms = rooms.filter(r => r !== room);
                }
            })
        })
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