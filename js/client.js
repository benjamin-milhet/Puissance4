import { VuePlateau }  from "./VuePlateau.js";

window.addEventListener("load", () => {
    console.log("Page loaded !");
    let vuePlateau = new VuePlateau();
    vuePlateau.afficherPlateau();
});