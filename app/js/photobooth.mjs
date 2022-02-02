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
    this.width = 400;
    this.height = 0;

    this.streaming = false;

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

    this.video.addEventListener('canplay', (ev) => {
      if (!this.streaming) {
        this.height = this.video.videoHeight / (this.video.videoWidth / this.width);

        if (isNaN(this.height)) {
          this.height = this.width / (4 / 3);
        }

        this.video.setAttribute('width', this.width);
        this.video.setAttribute('height', this.height);
        this.canvas.setAttribute('width', this.width);
        this.canvas.setAttribute('height', this.height);
        this.streaming = true;
      }
    }, false);

    // this.clear()
  }

  clear() {
    // this.ctx = this.canvas.getContext('2d');
    // this.ctx.fillStyle = "#AAA";
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // var data = this.canvas.toDataURL('image/png');
    // this._gallery.clear(data)
    this._gallery.clear()
  }

  _shot() {

  }

  shot() {
    setTimeout(() => {
      this.ctx = this.canvas.getContext('2d');
      if (this.width && this.height) {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx.drawImage(this.video, 0, 0, this.width, this.height);

        var data = this.canvas.toDataURL('image/png');

        this._gallery.addPicture(data)

      }

    }, this.delay)
  }

  burstShot() {
    this._gallery.addCard()
    let startTime = Date.now();
    let intervalId = setInterval(() => {
      let timePassed = Date.now() - startTime;
      if (timePassed > 3000)
        clearInterval(intervalId)
      this.shot();
    }, 1000)
  }

  setDelay(delay) {
    this.delay = delay;
  }
}
