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

    console.log(player);

    socket.emit("playerData", player);
});




