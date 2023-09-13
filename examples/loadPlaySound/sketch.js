console.log(p5sound.VERSION);

let startAudioButton = document.getElementById('startAudioButton');
let stopAudioButton = document.getElementById('stopAudioButton');

startAudioButton.addEventListener('click', function () {
  getAudioContext().resume();
});

stopAudioButton.addEventListener('click', function () {
  getAudioContext().suspend();
});

let song;

function preload() {
  song = loadSound('./../assets/lucky_dragons_-_power_melody.mp3');
}

function setup() {
  createCanvas(720, 200);
  background(255, 0, 0);
}

function mousePressed() {
  // .isPlaying() returns a boolean
  if (song.isPlaying()) {
    song.stop();
    background(255, 0, 0);
  } else {
    song.play();
    background(0, 255, 0);
  }
}