// Importe le module color-convert
import * as convert from "color-convert";

export class Color {
  // Crée un champ privé #hsl
  #hsl;
  // Crée un champ privé #hex
  #hex;
  // Crée un champ privé #element
  #element;

  constructor(hsl) {
    this.#hsl = hsl;

    // Converti la valeur hsl en hexadécimal
    this.#hex = `#${convert.hsl.hex(hsl)}`;

    // Crée l'élément
    this.#element = this.#generateElement();
  }

  #generateElement() {
    // Crée un élément <div> div
    const div = document.createElement("div");
    // Lui ajoute une class "color"
    div.classList.add("color");
    // Ajoute l'attribut de donnée "data-color"
    div.dataset.color = this.#hex;
    // Change la couleur de fond de l'élément
    div.style.backgroundColor = this.#hex;

    // Crée un élément <p> p
    const p = document.createElement("p");
    // Lui ajoute comme texte la valeur hexadécimale
    p.textContent = this.#hex;
    // Change la couleur du texte selon la luminosité de la couleur de fond
    p.style.color = this.#hsl[2] < 60 ? "#ffffff" : "#000000";
    // this.#hsl[2] fait référence à la troisième valeur (luminosité) du tableau
    // < 60, inférieure à cela signifie que la couleur est sombre donc mettre le texte en blanc sinon superieur à 60 mettre en noir

    // Ajoute l'élément <p> comme enfant du <div>
    div.appendChild(p);

    // Retourne le <div>
    return div;
  }

  display(main) {
    // Ajoute this.#element comme enfant d'un élément parent passé en argument.
    main.appendChild(this.#element);
  }
}
