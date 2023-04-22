import {VuePlateau} from "./VuePlateau.js";

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

let vuePlateau = new VuePlateau();

const socket = io();


socket.on("startGame", (players) => {
    console.log("Start game !");
    console.log(players);

    startGame(players);
});

socket.on("roomData", (data) => {
    player.roomId = data

    let url = new URL(window.location.href);
    let input = document.getElementById("lien-input");
    input.value = url.origin + url.pathname + "?roomId=" + data;
});

socket.on("playedCell", (data) => {
    if (vuePlateau.verifierCase(data.cell)) vuePlateau.ajouterPion(data.cell, data.symbol);
    if (player.socketId !== data.socketId) {
        player.turn = true;
    }
});

function startGame(players) {
    console.log(players);
    $("#btnCopier").css("display", "none");
    $(".lien-input").css("display", "none");

    if (players[0].socketId === socket.id) {
        player.turn = true;
    }
}

window.onload = function() {
    // Récupérer la valeur de l'input avec l'id "username"

    let url = new URL(window.location.href);

    if (url.searchParams.get("roomId")) {
        if (!url.searchParams.get("username")) {
            let username = prompt("Quel est votre username ?");
            $('#username').val(username);
        }

        player.roomId = url.searchParams.get("roomId");
        player.host = false;
        player.turn = false;
        player.symbol = "yellow";

        player.username = $('#username').val();
        player.socketId = socket.id;
    
        console.log(player);

        $("#mainAccueil").css("display", "none");
        $("#titre").css("display", "none");


        let vuePlateau = new VuePlateau();
        vuePlateau.afficherPlateau();
        console.log("Etape 2");

        $(".button").css("display", "inline-block");
        $("#btnCopier").css("display", "none");

        socket.emit("playerData", player);

        const divs = document.querySelectorAll(".case");
        for (let i = 0; i < divs.length; i++) {
            divs[i].addEventListener("click", function() {
                if (player.turn === true) {
                    player.turn = false;
                    socket.emit("playedCell", {roomId: player.roomId, socketId: player.socketId, cell: i, symbol: player.symbol});
                } else {
                    alert("Ce n'est pas votre tour !")
                }
            });
        }
    }

    
}

$(document).ready(function() {
    $('#bouton-jouer').click(function() {
        // Récupérer la valeur de l'input avec l'id "username"
        player.username = $('#username').val();
        player.host = true;
        player.turn = false;
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

        vuePlateau.afficherPlateau();

        $(".button").css("display", "inline-block");
        $(".lien-input").css("display", "inline-block");

        socket.emit("playerData", player);

        const divs = document.querySelectorAll(".case");
        for (let i = 0; i < divs.length; i++) {
            divs[i].addEventListener("click", function() {
                if (player.turn === true) {
                    player.turn = false;
                    socket.emit("playedCell", {roomId: player.roomId, socketId: player.socketId, cell: i, symbol: player.symbol});
                } else {
                    alert("Ce n'est pas votre tour !")
                }
            });
        }
    });

  });


