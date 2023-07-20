// print the current p5sound version
console.log(p5sound.VERSION);

// declare variable for noise
let noise;

// declare variable for filter
let lowpass;

// retrieve the buttons from the DOM
let startAudioButton = document.getElementById('startAudioButton');
let stopAudioButton = document.getElementById('stopAudioButton');
let startNoiseButton = document.getElementById('startNoiseButton');
let noiseWhiteButton = document.getElementById('noiseWhiteButton');
let noisePinkButton = document.getElementById('noisePinkButton');
let noiseBrownButton = document.getElementById('noiseBrownButton');

startAudioButton.addEventListener('click', function () {
  getAudioContext().resume();
});

stopAudioButton.addEventListener('click', function () {
  getAudioContext().suspend();
});

startNoiseButton.addEventListener('click', function () {
  noise.start();
});

noiseWhiteButton.addEventListener('click', function () {
  noise.setType('white');
});

noisePinkButton.addEventListener('click', function () {
  noise.setType('pink');
});

noiseBrownButton.addEventListener('click', function () {
  noise.setType('brown');
});

function setup() {
  createCanvas(400, 400);
  background(196);
  noise = new Noise('white');
  lowpass = new LowPass();
  noise.disconnect();
  noise.connect(lowpass);
}

function draw() {
  for (let i = 0; i < width; i++) {
    noFill(); stroke(255*Math.random(), 16);
    ellipse(width * Math.random(), height - i, 10, 10);
  }

  let newFreq = map(mouseX, 0, width, 100, 10000);
  lowpass.freq(newFreq);
  lowpass.res(5);
}