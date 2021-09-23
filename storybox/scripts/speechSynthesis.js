var synth = window.speechSynthesis;

var voices = [];
voices = synth.getVoices();
console.log(voices);

function outLoud(txt,voice,pitch,rate) {
    
  var utterThis = new SpeechSynthesisUtterance(txt);
  utterThis.voice = voices[voice];

  utterThis.pitch = pitch;//0-2
  utterThis.rate = rate;//.1-10
  synth.speak(utterThis);

}
