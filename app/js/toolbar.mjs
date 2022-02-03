import { VoiceControl } from "./voice-control.mjs";

export class Toolbar {
  root;
  app;
  delayInput;

  constructor(app, rootElement) {
    this.app = app;
    this.root = rootElement;

    this.clickListeners();
  }

  clickListeners() {
    this.delayInput = this.root.querySelector('[name=delay]');
    let shotBtn = this.root.querySelector('[name=shot]');
    let burstShotBtn = this.root.querySelector('[name=burst_shot]');
    let clearBtn = this.root.querySelector('[name=clear]');

    shotBtn.onclick = () => { this._setDelay(); this._shot() }
    burstShotBtn.onclick = () => { this._setDelay(); this._burstShot() }
    clearBtn.onclick = () => { this._clear() }
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
    this.app.setDelay(parseInt(this.delayInput.value * 1000));
  }

}