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


socket.on("startGame", async (players) => {
    await showAlert("La partie va commencer !");
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

socket.on("playedCell", async (data) => {
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
        if (player.socketId === data.socketId) await showAlert("Cette case est déjà prise !");
    }

});

socket.on("playerWin", async (data) => {
    if (player.symbol === data.symbol) {
        await showAlert("Vous avez gagné !");
    } else {
        await showAlert("Vous avez perdu !");
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

window.onload = async function() {
    // Récupérer la valeur de l'input avec l'id "username"

    let url = new URL(window.location.href);

    if (url.searchParams.get("roomId")) {
        player.username = "";
        player.username = await showPrompt("Quel est votre username ?");

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
            divs[i].addEventListener("click", async() => {
                if (player.turn === true) {
                    socket.emit("playedCell", {roomId: player.roomId, socketId: player.socketId, cell: i, symbol: player.symbol});
                } else {
                    await showAlert("Ce n'est pas votre tour !")
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
            divs[i].addEventListener("click", async() =>{
                if (player.turn === true) {
                    socket.emit("playedCell", {roomId: player.roomId, socketId: player.socketId, cell: i, symbol: player.symbol});
                } else {
                    await showAlert("Ce n'est pas votre tour !")
                }
            });
        }
    });

  });

const alert = document.getElementById('alert');

function showAlert(message) {
    const alertClose = document.getElementById('alert-close');
    const alertMessage = document.getElementById('alert-message');

    alertMessage.textContent = message;
    alert.style.display = "block";

    return new Promise((resolve) => {
        const closeHandler = function() {
            alert.style.display = "none";
            alertClose.removeEventListener('click', closeHandler);
            resolve();
        };

        alertClose.addEventListener('click', closeHandler);
    });
}

let prompt = document.getElementById('prompt');
let closePrompt = document.getElementById('closePrompt');
let promptValue = '';
let promptSubmitButton = document.getElementById('prompt-submit');
let promptInput = document.getElementById('prompt-input');

function showPrompt(message) {
    document.getElementById('prompt-message').textContent = message;
    prompt.style.display = "block";

    return new Promise((resolve) => {
        promptSubmitButton.onclick = function() {
            promptValue = promptInput.value;
            prompt.style.display = "none";
            resolve(promptValue); // résout la promesse avec la valeur saisie
        };
    });
}


