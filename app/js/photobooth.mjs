import { Gallery } from "./gallery.mjs";
import { Toolbar } from "./toolbar.mjs";

export class Photobooth {
  root;
  video;
  canvas;
  ctx;
  _toolbar;
  _gallery;

  constructor(rootElement) {
    window.__photoboth = this;
    this.root = rootElement;
    
    this._toolbar = new Toolbar(this, this.root.querySelector('.camera form'));
    this._gallery = new Gallery(this.root.querySelector('.gallery'));

    this.initCamera();

  }

  initCamera() {

  }

  clear() {

  }

  _shot() {

  }

  shot() {
    
  }

  burstShot() {

  }

  setDelay(delay) {
    
  }
}
