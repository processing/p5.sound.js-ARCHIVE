// print the current p5sound version
console.log(p5sound.VERSION);

// declare variable for oscillator
let osc;

// declare variable for FFT
let analyzer;

// retrieve the buttons from the DOM
let startAudioButton = document.getElementById('startAudioButton');
let stopAudioButton = document.getElementById('stopAudioButton');
let startOscillatorButton = document.getElementById('startOscillatorButton');
let oscSineButton = document.getElementById('oscSineButton');
let oscTriButton = document.getElementById('oscTriButton');
let oscSquareButton = document.getElementById('oscSquareButton');
let oscSawButton = document.getElementById('oscSawButton');

// add event listeners
startAudioButton.addEventListener('click', function () {
  getAudioContext().resume();
});

stopAudioButton.addEventListener('click', function () {
  getAudioContext().suspend();
});

startOscillatorButton.addEventListener('click', function () {
  osc.start();
});

oscSineButton.addEventListener('click', function () {
  osc.setType('sine');
});

oscTriButton.addEventListener('click', function () {
  osc.setType('triangle');
});

oscSquareButton.addEventListener('click', function () {
  osc.setType('square');
});

oscSawButton.addEventListener('click', function () {
  osc.setType('sawtooth');
});


function setup() {
  createCanvas(400, 400);
  background(196);
  // create new sine oscillator
  osc = new Oscillator('sine', 440);
  // create new analyzer
  analyzer = new AnalyzerFFT();
}

function draw() {

  background(196);

  let newFreq = map(mouseX, 0, width, 100, 1000);
  osc.freq(newFreq);

  let spectrum = analyzer.analyze();
  noStroke();
  fill(255, 0, 255);
  for (let i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h);
  }

  let waveform = analyzer.waveform();
  noFill();
  beginShape();
  stroke(20);
  for (let i = 0; i < waveform.length; i++){
    let x = map(i, 0, waveform.length, 0, width);
    let y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();

}
