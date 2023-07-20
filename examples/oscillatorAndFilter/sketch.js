// print the current p5sound version
console.log(p5sound.VERSION);

// declare variable for oscillator
let osc;

// declare variable for filter
let lowpass;

// retrieve the buttons from the DOM
let startAudioButton = document.getElementById('startAudioButton');
let stopAudioButton = document.getElementById('stopAudioButton');
let startOscillatorButton = document.getElementById('startOscillatorButton');
let oscSineButton = document.getElementById('oscSineButton');
let oscTriButton = document.getElementById('oscTriButton');
let oscSquareButton = document.getElementById('oscSquareButton');
let oscSawButton = document.getElementById('oscSawButton');

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
  // osc = new SinOsc(440);
  osc.setType('sine');
});

oscTriButton.addEventListener('click', function () {
  // osc = new TriOsc(440);
  osc.setType('triangle');
});

oscSquareButton.addEventListener('click', function () {
  // osc = new SqrOsc(440);
  osc.setType('square');
});

oscSawButton.addEventListener('click', function () {
  // osc = new SawOsc(440);
  osc.setType('sawtooth');
});

function setup() {
  createCanvas(400, 400);
  background(196);
  osc = new Oscillator('sine', 400);
  lowpass = new LowPass();
  // lowpass = new BiquadFilter('lowpass', 200);
  osc.disconnect();
  osc.connect(lowpass);
}

function draw() {
  for (let i = 0; i < width; i++) {
    noFill(); stroke(255*Math.random(), 16);
    ellipse(width * Math.random(), height - i, 10, 10);
  }
  let newFreq = map(mouseX, 0, width, 100, 1000);
  osc.freq(newFreq);
  lowpass.freq(400, 0);
  lowpass.res(50);
}
