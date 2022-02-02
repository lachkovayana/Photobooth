import { VoiceControl } from "./voice-control.mjs";

export class Toolbar {
  root;
  app;
  delayInput;

  constructor(app, rootElement) {
    this.app = app;
    this.root = rootElement;


    this.delayInput = this.root.querySelector('[name=delay]');
    this.shotBtn = this.root.querySelector('[name=shot]');
    this.burstShotBtn = this.root.querySelector('[name=burst_shot]');
    this.clearBtn = this.root.querySelector('[name=clear]');
    this.bindListeners();

  }

  bindListeners() {
    this.shotBtn.onclick = () => { this._setDelay(); this._shot() }
    this.burstShotBtn.onclick = () => { this._setDelay(); this._burstShot() }
    this.clearBtn.onclick = () => { this._clear() }
  }

  _onFormSubmit(event) {

  }

  executeCommand(command) {

  }

  _clear() {
    this.app.clear();
  }

  _shot() {
    this.app.shot();
  }

  _burstShot() {
    this.app.burstShot();
  }

  _setDelay() {
    this.app.setDelay(parseInt(this.delayInput.value*1000));
  }

}