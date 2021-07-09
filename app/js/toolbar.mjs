import { VoiceControl } from "./voice-control.mjs";

export class Toolbar {
  root;
  app;
  delayInput;

  constructor(app, rootElement) {
    this.bindListeners();
  }

  bindListeners() {
    
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
    this.app.setDelay(this.delayInput.value);
  }

}