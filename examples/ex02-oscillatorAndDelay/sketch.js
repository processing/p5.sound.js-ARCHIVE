// let context;
let osc;

console.log(p5sound.VERSION);

let startOscButton = document.getElementById('startAudioButton');
let stopOscButton  = document.getElementById('stopAudioButton');

startOscButton.addEventListener('click', function () {
  getAudioContext().resume();
  startOscillator();
});
stopOscButton.addEventListener('click', function () {
  stopOscillator();
});

function setup() {
  createCanvas(400, 400);
  background(196);
}

function draw() {
  for (let i = 0; i < width; i++) {
    noFill(); stroke(255*Math.random(), 16);
    ellipse(width * Math.random(), height - i, 10, 10);
  }
}
function startOscillator(){
  osc = new Oscillator('sine', 400);
  osc.start();
}
function stopOscillator(){
  osc.stop();
}