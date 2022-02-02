import { Card } from "./card.mjs";

export class Gallery {
  root;
  card;

  constructor(rootElement) {
    this.root = rootElement;

    this.addCard()

    this.photo = this.root.querySelector('#photo');
  }

  addCard() {
    let cardTemplate = this.root.querySelector("template").content.cloneNode(true);
    this.card = new Card("lol", cardTemplate)
    this.root.appendChild(cardTemplate)
  }

  addPicture(data) {
    // if (!this.card.isFull()) {
    //   this.card.addPicture(data)
    // }
    // else {
    //   this.addCard();
    //   this.card.addPicture(data)
    // }
    // this.addCard()
    this.photo.setAttribute('src', data);
  }

  clear() {
    this.root.querySelectorAll(".card").forEach(element => {
      this.root.removeChild(element)
    });
  }


}