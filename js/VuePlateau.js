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
                //img.className = "imgCase"; // On lui donne la classe imgCase

                //if (donne != "V") img.src = '../images/' + donne + '.png'; // On lui donne l'image correspondante

                //minidiv.appendChild(img); // On ajoute l'image dans la case
                div.appendChild(minidiv); // On ajoute la case dans la ligne

            });


            emplacement.appendChild(div); // On ajoute la ligne dans le plateau de jeu
        });    
        
        const plateau = document.querySelector('.plateau');
        const controlContainer = document.createElement('div');
        controlContainer.classList.add('control-container');
        plateau.after(controlContainer);

        for (let i = 0; i < 7; i++) {
            const button = document.createElement('button');
            button.classList.add('control-button');
            button.setAttribute('data-column', i);
            button.innerHTML = '↑';
            controlContainer.appendChild(button);
        }
    }
}