export class VoiceControl {
  root;
  recognition;
  commandsMap;
  commandHandler;

  constructor(rootElement, commandsMap, commandHandler) {
    this.root = rootElement;
    this.commandHandler = commandHandler;
    this.commandsMap = commandsMap;

    this.initRecognition()
    this.bindEventHandles()
  }

  bindEventHandles() {

    this.recognition.addEventListener("start", () => {
      this.commandNum = 0;
    })

    this.recognition.addEventListener("result", (event) => {
      this._onRecognitionResult(event)
    })

    this.recognition.addEventListener("error", (event) => {
      this._onRecognitionError(event)
    })
  }

  _onRecognitionResult(event) {
    let transcript = event.results[this.commandNum][0].transcript.trim().toLowerCase();

    let availableCommandName = Object.keys(this.commandsMap).find(key => this.commandsMap[key] === transcript);
    if (availableCommandName) {
      this._showTextMessage("willDo", transcript)
      this.commandHandler(transcript)
    }
    else {
      this._showTextMessage("tryAgain", transcript)
    }

    this.commandNum++;
  }

  _showTextMessage(id, transcript) {
    let userText = this.root.querySelector(`#text`);
    let response = this.root.querySelector(`#${id}`);

    userText.innerHTML = `It seems you said: "${transcript}"`
    response.style.visibility = "visible"
    setTimeout(() => {
      userText.innerHTML = ""
      response.style.visibility = "hidden"
    }, 1000)
  }

  _onRecognitionError(event) {
    console.log('Speech recognition error detected: ' + event.error);
  }

  startRecognition() {
    this.recognition.start();
  }

  stopRecognition() {
    this.recognition.stop();
  }

  initRecognition() {
    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!speechRecognition)
      console.log("Your browser does not support speech recognition");
    else {
      this.recognition = new speechRecognition()
      this.recognition.continuous = true;
    }
  }

}