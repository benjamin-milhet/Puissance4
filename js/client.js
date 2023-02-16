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


socket.on("startGame", (players) => {
    console.log("Start game !");
    console.log(players);

    startGame(players);
});

function startGame(players) {
    document.getElementById("controle-container").style.display = "in-line";
}

$(document).ready(function() {
    $('#bouton-jouer').click(function() {
        // Récupérer la valeur de l'input avec l'id "username"
        var username = $('#username').val();

        player.username = username;
        player.host = true;
        player.turn = true;
        player.socketId = socket.id;
        
        let url = new URL(window.location.href);

        if (url.searchParams.get("roomId")) {
            player.roomId = url.searchParams.get("roomId");
            player.host = false;
            player.turn = false;
        }

        console.log(player);

        $("#mainAccueil").css("display", "none");
        $("#titre").css("display", "none");


        let vuePlateau = new VuePlateau();
        vuePlateau.afficherPlateau();

        $(".button").css("display", "inline-block");
        $("#controle-container").css("display", "inline-block");


        socket.emit("playerData", player);
    });
  });


