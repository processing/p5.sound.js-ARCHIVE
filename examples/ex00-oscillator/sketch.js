// print the current p5sound version
console.log(p5sound.VERSION);

// declare variable for oscillator
let osc;

// retrieve the buttons from the DOM
let startAudioButton = document.getElementById('startAudioButton');
let stopAudioButton = document.getElementById('stopAudioButton');
let startOscillatorButton = document.getElementById('startOscillatorButton');

startAudioButton.addEventListener('click', function () {
  getAudioContext().resume();
});

stopAudioButton.addEventListener('click', function () {
  getAudioContext().suspend();
});

startOscillatorButton.addEventListener('click', function () {
  osc.start();
});

function setup() {
  createCanvas(400, 400);
  background(196);
  osc = new Oscillator('sine', 400);
}

function draw() {
  for (let i = 0; i < width; i++) {
    noFill(); stroke(255*Math.random(), 16);
    ellipse(width * Math.random(), height - i, 10, 10);
  }
  let newFreq = map(mouseX, 0, width, 100, 1000);
  osc.freq(newFreq);
}

function stopOscillator(){
  osc.stop();
}