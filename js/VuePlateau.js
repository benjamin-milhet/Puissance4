let niveau = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

export class VuePlateau {

    afficherPlateau() {
        let emplacement = document.querySelector("playground"); // On recupere l'element HTML qui contient le plateau de jeu

        niveau.forEach((element) => { // On parcourt chaque ligne du plateau de jeu
            let div = document.createElement("div"); // On cree une div qui va contenir la ligne
            div.className = "ligne"; // On lui donne la classe ligne

            element.forEach((donne) => { // On parcourt chaque case de la ligne
                let minidiv = document.createElement("div"); // On cree une div qui va contenir la case
                //let img = document.createElement("img"); // On cree une image qui sera dans la case

                minidiv.className = "pion case"; // On lui donne la classe case
                minidiv.style.display = 'inline-block'; // On lui donne la propriete display
                minidiv.innerHTML = donne;

                div.appendChild(minidiv); // On ajoute la case dans la ligne

            });


            emplacement.appendChild(div); // On ajoute la ligne dans le plateau de jeu
        });    
        
        const plateau = document.querySelector('.plateau');
        const controlContainer = document.createElement('div');
        controlContainer.classList.add('control-container');
        controlContainer.id = 'control-container';
        plateau.after(controlContainer);
    }

    ajouterPion(colonne, couleur) {
        // Faire que la colonne soit un multiple de nombre de colonne
        colonne = colonne % niveau[0].length;
        let ligne= 5;
        while (niveau[ligne][colonne] !== 0) {
            ligne--;
        }
        niveau[ligne][colonne] = couleur;
        console.log(niveau);
        // Recuperer la div qui a la classe case et qui est dans la ligne et la colonne
        let div = document.querySelector(".ligne:nth-child(" + (ligne + 1) + ") .case:nth-child(" + (colonne + 1) + ")");
        // Changer la couleur du rond de la classe case:before en fonction de la couleur du joueur
        div.classList.remove('case');
        div.classList.add('pion' + couleur);
    }

    verifierCase(colonne){
        let res = true
        colonne = colonne % niveau[0].length;
        let ligne= 5;
        while (niveau[ligne][colonne] !== 0 && res) {
            ligne--;
            if (ligne < 0){
                res = false
                ligne = 5
            }
        }
        return res
    }

    verifierVictoire(player) {
        // Vérifier les victoires horizontales
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 4; col++) {
                if (
                    niveau[row][col] === player &&
                    niveau[row][col + 1] === player &&
                    niveau[row][col + 2] === player &&
                    niveau[row][col + 3] === player
                ) {
                    return true;
                }
            }
        }

        // Vérifier les victoires verticales
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 7; col++) {
                if (
                    niveau[row][col] === player &&
                    niveau[row + 1][col] === player &&
                    niveau[row + 2][col] === player &&
                    niveau[row + 3][col] === player
                ) {
                    return true;
                }
            }
        }

        // Vérifier les victoires en diagonale vers le haut
        for (let row = 3; row < 6; row++) {
            for (let col = 0; col < 4; col++) {
                if (
                    niveau[row][col] === player &&
                    niveau[row - 1][col + 1] === player &&
                    niveau[row - 2][col + 2] === player &&
                    niveau[row - 3][col + 3] === player
                ) {
                    return true;
                }
            }
        }

        // Vérifier les victoires en diagonale vers le bas
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 4; col++) {
                if (
                    niveau[row][col] === player &&
                    niveau[row + 1][col + 1] === player &&
                    niveau[row + 2][col + 2] === player &&
                    niveau[row + 3][col + 3] === player
                ) {
                    return true;
                }
            }
        }

        // Si aucune victoire n'a été trouvée, retourner false
        return false;

    }

}