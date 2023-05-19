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
    if (vuePlateau.verifierCase(data.cell)) {
        vuePlateau.ajouterPion(data.cell, data.symbol);
        if (vuePlateau.verifierVictoire(data.symbol)) {
            player.win = true;
            socket.emit("playerWin", {roomId: player.roomId, symbol: data.symbol});
        } else {
            player.turn = player.socketId !== data.socketId;
        }

        if (player.turn === true && player.symbol === "red") {
            $("#currentPlayer").css("background-color", "orangered");
        } else if (player.turn === true && player.symbol === "yellow") {
            $("#currentPlayer").css("background-color", "gold");
        } else if (player.turn !== true && player.symbol === "red") {
            $("#currentPlayer").css("background-color", "gold");
        } else if (player.turn !== true && player.symbol === "yellow") {
            $("#currentPlayer").css("background-color", "orangered");
        }
    } else {
        if (player.socketId === data.socketId) alert("Cette case est déjà prise !");
    }

});

socket.on("playerWin", (data) => {
    if (player.symbol === data.symbol) {
        alert("Vous avez gagné !");
    } else {
        alert("Vous avez perdu !");
    }
    let url = new URL(window.location.href);
    window.location.href = url.origin + url.pathname;
});


function startGame(players) {
    console.log(players);
    $("#btnCopier").css("display", "none");
    $(".lien-input").css("display", "none");
    $(".indicator-container").css("display", "flex");

    if (player.symbol === "red") {
        $("#yourColor").css("background-color", "orangered");
    } else {
        $("#yourColor").css("background-color", "gold");
    }

    $("#currentPlayer").css("background-color", "orangered");

    if (players[0].socketId === socket.id) {
        player.turn = true;
    }
}

window.onload = function() {
    // Récupérer la valeur de l'input avec l'id "username"

    let url = new URL(window.location.href);

    if (url.searchParams.get("roomId")) {
        player.username = prompt("Quel est votre username ?");

        player.roomId = url.searchParams.get("roomId");
        player.host = false;
        player.turn = false;
        player.symbol = "yellow";
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
        player.username = document.getElementById("username").value;
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
                    socket.emit("playedCell", {roomId: player.roomId, socketId: player.socketId, cell: i, symbol: player.symbol});
                } else {
                    alert("Ce n'est pas votre tour !")
                }
            });
        }
    });

  });


