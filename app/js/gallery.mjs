import { Card } from "./card.mjs";

export class Gallery {
  root;
  card;

  constructor(rootElement) {
    this.root = rootElement;
  }

  addCard() {
    let cardTemplate = this.root.querySelector("template").content.cloneNode(true);
    this.root.appendChild(cardTemplate)

    this.card = new Card(this.root.lastElementChild)
  }

  addPicture(data) {
    (!this.card || this.card.isFull()) && this.addCard()

    this.card.addPicture(data)
  }


  clear() {
    this.root.querySelectorAll(".card").forEach(element => {
      this.root.removeChild(element)
    });

    this.card = null
  }


}