import * as convert from "color-convert";

// Importer la librairie Notyf
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
const notyf = new Notyf();

// Fonction de génération de palette de couleurs à partir d’une couleur d’entrée
export const generatePalette = (inputhex) => {
  // crée un tableau vide.
  const tableaucolors = [];

  // converti le hex d'entrée en tableau hsl. Ne récupérer que les
  // deux premières valeurs.
  const [h, s] = convert.hex.hsl(inputhex);

  // Itère entre 0 et 100 par intervalle de 10
  for (let i = 0; i <= 100; i += 10) {
    // À chaque itération, pousse un nouveau tableau dans tableaucolors contenant
    // la teinte (fixe), la saturation (fixe) et la luminosité déterminée par
    // l'index de la boucle.
    tableaucolors.push([h, s, i]);
  }

  // Retourne le tableau.
  return tableaucolors;
};

// Fonction qui transforme un hex en HSL au format CSS
export const hexToCSSHSL = (hex) => {
  // tranforme le hex d'entrée en HSL.
  const hsl = convert.hex.hsl(hex);
  // Retourne une chaîne de caractère au format css.
  return `${hsl[0]}deg ${hsl[1]}% ${hsl[2]}%`; // teinte en degrés, saturation en % et luminosité en % par exemple: 120deg 50% 75%
};

export const isHexColor = (hex) => /^#[0-9A-F]{6}$/i.test(hex);
