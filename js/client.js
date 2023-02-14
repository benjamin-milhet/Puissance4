import { VuePlateau }  from "./VuePlateau.js";

const player = {
    host: false,
    playedCell: "",
    roomId: null,
    username: "",
    socketId: "",
    symbol: "red",
    turn: false,
    win: false
};

const socket = io();

window.addEventListener("load", () => {
    console.log("Page loaded !");
    let vuePlateau = new VuePlateau();
    vuePlateau.afficherPlateau();

    let url = new URL(window.location.href);
    let username = url.searchParams.get("username");

    player.username = username;
    player.host = true;
    player.turn = true;
    player.socketId = socket.id;

    if (url.searchParams.get("roomId")) {
        player.roomId = url.searchParams.get("roomId");
        player.host = false;
        player.turn = false;
    }

    console.log(player);

    socket.emit("playerData", player);
});




