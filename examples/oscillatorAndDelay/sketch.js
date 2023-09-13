// print the current p5sound version
console.log(p5sound.VERSION);

// retrieve the buttons from the DOM
let startAudioButton = document.getElementById('startAudioButton');
let stopAudioButton = document.getElementById('stopAudioButton');

// add event listeners
startAudioButton.addEventListener('click', function () {
  getAudioContext().resume();
});

stopAudioButton.addEventListener('click', function () {
  getAudioContext().suspend();
});

// variable for oscillator
let osc;

// variable for delay effect
let delayEffect;

function setup() {

  createCanvas(400, 400);
  background(196);

  osc = new Oscillator('sine', 400);
  delayEffect = new Delay();

  osc.disconnect();

  // source, delaytime (in seconds), feedback
  delayEffect.process(osc, 0.3, 0.7);
}

function draw() {
  for (let i = 0; i < width; i++) {
    noFill(); stroke(255*Math.random(), 16);
    ellipse(width * Math.random(), height - i, 10, 10);
  }
}

function mousePressed() {
  osc.start();
}

// function mouseDragged() {
//   let newFreq = map(mouseX, 0, width, 100, 1000);
//   osc.freq(newFreq);
//   return false;
// }

function mouseReleased() {
  osc.stop();
}
