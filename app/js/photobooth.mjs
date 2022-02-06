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
    this.video = this.root.querySelector('#video');
    this.canvas = this.root.querySelector('#canvas');

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        this.video.srcObject = stream;
        this.video.play();
      })
      .catch(function (err) {
        console.log("An error occurred: " + err);
      });

  }

  clear() {
    this._gallery.clear()
  }
  
 _shot() {
    this.canvas.width = this.video.videoWidth;
    this.canvas.height = this.video.videoHeight;

    this.ctx = this.canvas.getContext('2d');
    this.ctx.translate(this.canvas.width, 0);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

    let data = this.canvas.toDataURL('image/png');
    this._gallery.addPicture(data)
  }

  shot() {
    setTimeout(() => {
      this._shot()
    }, this.delay)
  }

  burstShot() {
    setTimeout(() => {
      this._shot();

      let count = 0;
      let intervalId = setInterval(() => {
        count++
        if (count == 2)
          clearInterval(intervalId)

        this._shot();
      }, 1000)

    }, this.delay)

  }

  setDelay(delay) {
    this.delay = delay;
  }
}
