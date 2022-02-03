export class Card {
  root;
  container;

  constructor(container) {
    this.container = container;
  }

  isFull() {
    return this._getEmptyImageElement() === null
  }

  _getEmptyImageElement() {
    return this.container.querySelector(`[data-photo=default]`)
  }

  addPicture(data) {
    let placeForPhoto = this._getEmptyImageElement()
    placeForPhoto.setAttribute("src", data);
    placeForPhoto.setAttribute("data-photo", "user");
  }

}