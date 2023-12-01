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

let song, analyzer;

function preload() {
  song = loadSound('./../assets/lucky_dragons_-_power_melody.mp3');


}

function setup() {

  createCanvas(710, 200);
  song.loop();

  console.log(analyzer);



  // create a new Amplitude analyzer
  analyzer = new Amplitude();
}

function draw() {
  background(255);

  // Get the average (root mean square) amplitude
  let rms = analyzer.getLevel();
  fill(127);
  stroke(0);

  // Draw an ellipse with size based on volume
  ellipse(width / 2, height / 2, 10 + rms * 200, 10 + rms * 200);
}

function mouseClicked() {
  // Patch the input to an volume analyzer
  analyzer.setInput(song);

}