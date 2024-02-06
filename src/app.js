import * as convert from "color-convert";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

import { Color } from "./modules/Color";
// Tester la classe
//const containerElement = document.querySelector("main");
//const color = new Color([0, 0, 0]);
//color.display(containerElement);

import { isHexColor, hexToCSSHSL, generatePalette } from "./modules/utils";

// Instancier Notyf
const notyf = new Notyf();

// Cherche l'élément <form> dans le DOM
const form = document.querySelector("form");

// Cherche l'élément <main> des couleurs dans le DOM
const main = document.querySelector("main");

const handleForm = (e) => {
  try {
    // Empêche le refresh lors de la soumission du formulaire
    e.preventDefault();
    // Cherche la valeur de l'élément <input>
    const inputValue = e.target.firstElementChild.value; // la cible de l'événement déclenché avec la valeur actuelle saisie ou sélectionnée du 1e enfant (important car il y en a plusieurs)
    // Vérifie que la valeur soit bien un code hexadécimal
    if (!isHexColor(inputValue)) {
      // Si ce n'est pas le cas, balancer l'erreur
      throw new Error(`${inputValue} is not a valid Hexadecimal color`);
    }

    // Crée la palette à partir du code hexadécimal
    const palette = generatePalette(inputValue);

    displayColors(inputValue, palette);
  } catch (err) {
    // Attrape les erreurs du block try et les affiche dans une notification.
    notyf.error(err.message);
  }
};

form.addEventListener("submit", handleForm);

const handleClick = async (e) => {
  // Cherche l'élément avec la classe "color" le plus proche de la cible du
  // click et récupère son data-color.
  console.log(e);
  const color = e.target.closest(".color").dataset.color; // .dataset.color accède à l'attribut data-color de l'élément trouvé.

  try {
    // Copie de façon asynchrone la couleur dans le presse-papier
    await navigator.clipboard.writeText(color); // copie le code couleur
  } catch (error) {
    console.err(error);
  }
  // Affiche un message de succès dans une notification
  notyf.success(`copied ${color} to clipboard`);
};

main.addEventListener("click", handleClick);

const displayColors = (input, palette) => {
  // Efface tout le contenu de l'élément <main>
  main.innerHTML = "";

  // Cherche l'élément header dans le DOM
  const header = document.querySelector("header");
  // Ajoute la classe "minimized" au header
  header.classList.add("minimized");

  // Reçoit l'input du formulaire, et modifie la variable css "--shadow-color"
  // avec ce qui sort de la fonction hexToCSSHSL.
  document.documentElement.style.setProperty(
    // document.documentElement = racine html
    // .style.setProperty définir ou de modifier la valeur d'une propriété
    "--shadow-color", // nom de la propriété CSS
    hexToCSSHSL(input) // valeur (fonction qui convertit HEX de couleur en une valeur CSS HSL)
  );

  // Crée un tableau avec les index de la palette que nous souhaitons
  // transformer en hex pour le dégradé. On le map ensuite de telle sorte
  // à recevoir en retour les valeur hex pour chaque couleur de la palette
  // à l'index du tableau de départ. On ajoute également un "#" au début
  // des chaînes de caractère.
  const gradientColors = [
    // 3 indices : 0 : Le premier élément de la palette. Math.round(palette.length / 2) : L'indice du milieu arrondi à la valeur entière la plus proche. palette.length - 1 : Le dernier élément de la palette.
    0,
    Math.round(palette.length / 2),
    palette.length - 1,
  ].map((index) => `#${convert.hsl.hex(palette[index])}`);
  // map itère sur chaque élément du tableau et crée un nouveau tableau avec la couleur convertie #...

  // Utilise les valeurs du tableau gradientColors pour modifier le dégradé, couleur arrière plan style de body
  document.body.style.background = `linear-gradient(-45deg, ${gradientColors.join(
    ","
  )}`; // injecte les couleurs du tableau gradientColors, join(",") concatène les éléments du tableau avec une virgule, créant ainsi une liste de couleurs pour le dégradé.

  // Redéfinis background-size, la taille de l'image de fond en pourcentage, l'image de fond sera quatre fois plus grande que l'élément body
  document.body.style.backgroundSize = `400% 400%`;

  // Prend chaque élément dans le tableau palette, instancie une classe avec
  // ses données et appelle la méthode display() dessus.
  palette.map((chaquecouleur) => new Color(chaquecouleur).display(main));
}; // chaque couleur dans la palette crée une instance Color, appelle display avec main en argument

