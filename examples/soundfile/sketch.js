// console.log(p5sound.VERSION);

let startAudioButton = document.getElementById('startAudioButton');
let stopAudioButton = document.getElementById('stopAudioButton');

startAudioButton.addEventListener('click', function () {
  getAudioContext().resume();
});

stopAudioButton.addEventListener('click', function () {
  getAudioContext().suspend();
});

let song;

// function preload() {
//   self._incrementPreload();
//   soundFile = new SoundFile('./../assets/doorbell.mp3', function () {
//     console.log('sound file loaded');
//     self._decrementPreload();
//   });
//   console.log("here");
// }

function setup() {
  song = loadSound('./../assets/doorbell.mp3');
  createCanvas(720, 200);
  background(255, 0, 0);
  // console.log('is loaded?'+ song.isLoaded());
}

function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
    background(255, 0, 0);
  } else {
    song.play();
    background(0, 255, 0);
  }
}