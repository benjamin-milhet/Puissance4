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

    verifierVictoire(colonne, couleur) {
        // on parcourt toute les lignes, les colonnes et les diagonales
        // on compte le nombre de pions de la couleur du joueur
        // si on en a 4, on renvoie true
        // sinon on renvoie false
        let res = false
        let ligne = 0
        let compteur = 0

        // on parcourt les lignes
        while (ligne < 6 && !res) {
            compteur = 0
            for (let i = 0; i < 7; i++) {
                if (niveau[ligne][i] === couleur) {
                    compteur++
                } else {
                    compteur = 0
                }
                if (compteur === 4) {
                    res = true
                }
            }
            ligne++
        }

        // on parcourt les colonnes
        let colonne2 = 0
        while (colonne2 < 7 && !res) {
            compteur = 0
            for (let i = 0; i < 6; i++) {
                if (niveau[i][colonne2] === couleur) {
                    compteur++
                } else {
                    compteur = 0
                }
                if (compteur === 4) {
                    res = true
                }
            }
            colonne2++
        }

        // on parcourt les diagonales
        let ligne2 = 0
        let colonne3 = 0
        while (ligne2 < 6 && !res) {
            compteur = 0
            for (let i = 0; i < 6; i++) {
                if (niveau[ligne2][colonne3] === couleur) {
                    compteur++
                } else {
                    compteur = 0
                }
                if (compteur === 4) {
                    res = true
                }
                ligne2++
                colonne3++
            }
        }

        let ligne3 = 0
        let colonne4 = 6
        while (ligne3 < 6 && !res) {
            compteur = 0
            for (let i = 0; i < 6; i++) {
                if (niveau[ligne3][colonne4] === couleur) {
                    compteur++
                } else {
                    compteur = 0
                }
                if (compteur === 4) {
                    res = true
                }
                ligne3++
                colonne4--
            }
        }

        return res
    }

}