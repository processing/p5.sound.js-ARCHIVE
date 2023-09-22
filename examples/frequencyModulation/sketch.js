// print the current p5sound version
console.log(p5sound.VERSION);

let carrier; // this is the oscillator we will hear
let modulator; // this oscillator will modulate the frequency of the carrier
let waveform;
let modFreq = 0;
let modDepth = 0;

// retrieve the buttons from the DOM
let startAudioButton = document.getElementById('startAudioButton');
let stopAudioButton = document.getElementById('stopAudioButton');

// add event listeners
startAudioButton.addEventListener('click', function () {
  console.log('start');
  getAudioContext().resume();
  carrier.amp(0.0, 0);
  modulator.amp(0.0, 0);
});

stopAudioButton.addEventListener('click', function () {
  console.log('stop');
  getAudioContext().suspend();
});

let analyzer; // we'll use this visualize the waveform

// the carrier frequency pre-modulation
let carrierBaseFreq = 220;

// min/max ranges for modulator
let modMaxFreq = 112;
let modMinFreq = 0;
let modMaxDepth = 150;
let modMinDepth = -150;

function setup() {
  let cnv = createCanvas(800, 400);
  noFill();

  carrier = new Oscillator('sine');
  carrier.amp(0); // set amplitude
  carrier.freq(carrierBaseFreq); // set frequency
  carrier.start(); // start oscillating

  // try changing the type to 'square', 'sine' or 'triangle'
  modulator = new Oscillator('sawtooth');
  modulator.start();

  // add the modulator's output to modulate the carrier's frequency
  modulator.disconnect();
  carrier.freq(modulator);

  // create an FFT to analyze the audio
  analyzer = new AnalyzerFFT();

  // fade carrier in/out on mouseover / touch start
  toggleAudio(cnv);
}

function draw() {
  background(30);

  if (mouseX != 0 && mouseY != 0) {
    // map mouseY to modulator freq between a maximum and minimum frequency
    modFreq = map(mouseY, height, 0, modMinFreq, modMaxFreq);
    modulator.freq(modFreq);

    // change the amplitude of the modulator
    // negative amp reverses the sawtooth waveform, and sounds percussive
    //
    modDepth = map(mouseX, 0, width, modMinDepth, modMaxDepth);
    modulator.amp(modDepth);

  }

  // analyze the waveform
  waveform = analyzer.waveform();


  // draw the shape of the waveform
  stroke(255);
  strokeWeight(10);
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, -height / 2, height / 2);
    vertex(x, y + height / 2);
  }
  endShape();

  strokeWeight(1);
  // add a note about what's happening
  text('Modulator Frequency: ' + modFreq.toFixed(3) + ' Hz', 20, 20);
  text(
    'Modulator Amplitude (Modulation Depth): ' + modDepth.toFixed(3),
    20,
    40
  );
  text(
    'Carrier Frequency (pre-modulation): ' + carrierBaseFreq + ' Hz',
    width / 2,
    20
  );
}

// helper function to toggle sound
function toggleAudio(cnv) {
  cnv.mouseOver(function () {
    console.log('mouseOver');
    carrier.amp(1.0, 0.01);
  });
  cnv.touchStarted(function () {
    carrier.amp(1.0, 0.01);
    console.log('touchStarted');
  });
  cnv.mouseOut(function () {
    carrier.amp(0.0, 1.0);
    console.log('mouseOut');
  });
}