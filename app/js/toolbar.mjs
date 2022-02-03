import { VoiceControl } from "./voice-control.mjs";

export class Toolbar {
  root;
  app;
  delayInput;
  //mine
  voiceControl;
  commandsMap = { shot: "снимок", burstShot: "серия снимков", clear: "сбросить карточки" };

  constructor(app, rootElement) {
    this.app = app;
    this.root = rootElement;

    this.bindListeners();


    let helperFunc = this.executeCommand.bind(this)
    this.voiceControl = new VoiceControl(this.root, this.commandsMap, helperFunc)
  }

  bindListeners() {
    this.delayInput = this.root.querySelector('[name=delay]');
    let shotBtn = this.root.querySelector('[name=shot]');
    let burstShotBtn = this.root.querySelector('[name=burst_shot]');
    let clearBtn = this.root.querySelector('[name=clear]');

    this.root.onsubmit = (event) => this._onFormSubmit(event)
    shotBtn.onclick = () => this._shot()
    burstShotBtn.onclick = () => this._burstShot()
    clearBtn.onclick = () => this._clear()

    let recordBtn = this.root.querySelector('#voice_control');
    recordBtn.onclick = () => {
      if (recordBtn.checked)
        this.voiceControl.startRecognition()
      else
        this.voiceControl.stopRecognition()
    }

  }
  _onFormSubmit(event) {
    event.preventDefault()
  }

  executeCommand(command) {
    switch (command) {
      case this.commandsMap.shot:
        this._shot();
        break;
      case this.commandsMap.burstShot:
        this._burstShot();
        break;
      case this.commandsMap.clear:
        this._clear();
        break;

      default: break;
    }
  }

  _clear() {
    this.app.clear();
  }

  _shot() {
    this._setDelay();
    this.app.shot();
  }

  _burstShot() {
    this._setDelay();
    this.app.burstShot();
  }

  _setDelay() {
    this.app.setDelay(parseInt(this.delayInput.value * 1000));
  }

}