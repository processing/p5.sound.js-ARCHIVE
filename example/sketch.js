// let context;
let osc;
let soundFile;

console.log(p5sound.VERSION);

let startOscButton = document.getElementById('startAudioButton');
let stopOscButton  = document.getElementById('stopAudioButton');

startOscButton.addEventListener('click', function () {
  getAudioContext().resume();
  // osc = new Oscillator('sine', 400);
  // osc.start();
  //console.log('hey');
  startOscillator();
});
stopOscButton.addEventListener('click', function () {
  //getAudioContext().resume();
  // osc = new Oscillator('sine', 400);
  // osc.start();
  //console.log('hey');
  stopOscillator();
});

function preload() {
  self._incrementPreload();
  soundFile = new SoundFile('./doorbell.mp3', function () {
    console.log('sound file loaded');
    self._decrementPreload();
  });
  console.log("here");
}

function setup() {
  console.log('is loaded?'+soundFile.isLoaded());
  createCanvas(400, 400);
  background(196);

}

function draw() {
  for (let i = 0; i < width; i++) {
    noFill(); stroke(255*Math.random(), 16);
    ellipse(width * Math.random(), height - i, 10, 10);
  }
  //console.log(soundFile);
  // console.log(context.state);
  // osc.helloworld();
  // console.log(frameCount);
}
function startOscillator(){
  // console.log(p5sound.VERSION);
  osc = new Oscillator('sine', 400);
  osc.start();
  // context = getAudioContext();
  // console.log(context);
  // console.log(context.state);
}
function stopOscillator(){
  osc.stop();
}