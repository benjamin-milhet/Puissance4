export class VuePlateau {

    afficherPlateau() {
        let emplacement = document.querySelector("playground"); // On recupere l'element HTML qui contient le plateau de jeu

        let niveau = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];

        niveau.forEach((element) => { // On parcourt chaque ligne du plateau de jeu
            let div = document.createElement("div"); // On cree une div qui va contenir la ligne
            div.className = "ligne"; // On lui donne la classe ligne

            element.forEach((donne) => { // On parcourt chaque case de la ligne
                let minidiv = document.createElement("div"); // On cree une div qui va contenir la case
                //let img = document.createElement("img"); // On cree une image qui sera dans la case

                minidiv.className = "case"; // On lui donne la classe case
                minidiv.style.display = 'inline-block'; // On lui donne la propriete display
                minidiv.innerHTML = donne;
                minidiv.style.backgroundColor = "dodgerblue"; // On lui donne la propriete background-color
                minidiv.style.width = "100px"; // On lui donne la propriete width
                minidiv.style.height = "100px"; // On lui donne la propriete height
                minidiv.style.border = "1px solid black"; // On lui donne la propriete border
                //img.className = "imgCase"; // On lui donne la classe imgCase

                //if (donne != "V") img.src = '../images/' + donne + '.png'; // On lui donne l'image correspondante

                //minidiv.appendChild(img); // On ajoute l'image dans la case
                div.appendChild(minidiv); // On ajoute la case dans la ligne

            });

            emplacement.appendChild(div); // On ajoute la ligne dans le plateau de jeu
        });
    }
}