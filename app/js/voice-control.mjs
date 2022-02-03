export class VoiceControl {
  root;
  recognition;
  commandsMap;
  commandHandler;

  //mine 
  transcript;

  constructor(rootElement, commandsMap, commandHandler) {
    this.root = rootElement;
    this.commandHandler = commandHandler;
    this.commandsMap = commandsMap;
    this.initRecognition()
    this.bindEventHandles()
  }

  bindEventHandles() {
    // remove after
    this.recognition.addEventListener("start", () => {
      console.log("start");
      this.counter = 0;
    })


    this.recognition.addEventListener("result", (event) => {
      this._onRecognitionResult(event)
    })
    this.recognition.addEventListener("end", () => {
      this._onRecognitionEnd()
    })
    this.recognition.addEventListener("error", (event) => {
      this._onRecognitionError(event)
    })
  }

  _onControlValueChange() {
    // on end
    // recordBtn.checked = false;
  }

  _onRecognitionEnd() {

  }

  _onRecognitionResult(event) {
    let transcript = event.results[this.counter][0].transcript.replace(/^\s+/g, '').toLowerCase();

    console.log("result", transcript);

    let availableCommandName = Object.keys(this.commandsMap).find(key => this.commandsMap[key] === transcript);
    if (availableCommandName)
      this.commandHandler(transcript)
    else
      alert("Try again!")

    this.counter++;
  }

  _onRecognitionError(event) {
    alert('Speech recognition error detected: ' + event.error);
  }

  startRecognition() {
    this.recognition.start();
  }

  stopRecognition() {
    this.recognition.stop();
    console.log("stop");

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