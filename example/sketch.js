
let context;
let osc;

let button = document.getElementById('startAudioButton');

button.addEventListener('click', function () { 
  getAudioContext().resume();
  osc.start();
  console.log('hey');
});

function setup() {
  createCanvas(400, 400);
  background(255, 0, 0);
  // console.log(p5.VERSION);
  osc = new Oscillator('sine', 400);
  context = getAudioContext();
  console.log(context);
  console.log(context.state);
}

function draw() {
  for (let i = 0; i < width; i++) {
    fill(255, 255, 0);
    ellipse(width * Math.random(), height - i, 10, 10);
  }
  // console.log(context.state);
  // osc.helloworld();
  // console.log(frameCount);
}