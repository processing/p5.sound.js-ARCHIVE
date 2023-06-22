// var carrier, modulator;

// // carrier frequency signal, a p5.Signal
// var carrierFreq;

// // modulator frequency signal, a p5.Signal
// var modFreq;

// // output envelope
// var env;

// function setup() {
//   carrier = new p5sound.Oscillator();

//   carrierFreq = new p5sound.Signal(240);
//   carrier.freq(carrierFreq);
//   carrier.start();

//   env = new p5sound.Env(0.05, 1, 0.5, 0);
//   carrier.amp(env);

//   modulator = new p5sound.Oscillator();
//   modulator.disconnect();
//   modFreq = new p5sound.SignalMult(8);
//   modFreq.setInput(carrierFreq);
//   modulator.freq(modFreq);
//   modulator.start();

//   var m1 = new p5sound.SignalMult();
//   m1.setInput(modulator);
//   m1.setValue(100);
// }

// function draw() {
//   carrierFreq.fade(mouseX);
// }

// function mousePressed() {
//   env.play();
// }
