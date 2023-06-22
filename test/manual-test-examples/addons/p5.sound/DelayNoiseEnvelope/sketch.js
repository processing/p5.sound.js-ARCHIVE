// /**
//  *  Example: p5sound.Delay w/ p5sound.Noise, p5sound.Env & p5sound.Amplitude
//  *
//  *  Click the mouse to hear the p5sound.Delay process a Noise Envelope.
//  *
//  *  MouseX controls the p5sound.Delay Filter Frequency.
//  *  MouseY controls both the p5sound.Delay Time and Resonance.
//  */

// var noise, env, analyzer, delay;

// function setup() {
//   createCanvas(710, 400);
//   noise = new p5sound.Noise('white'); // other types include 'brown' and 'pink'

//   // Turn down because we'll control .amp with a p5sound.Env
//   noise.amp(0);

//   noise.start();
//   noise.disconnect(); // so we will only hear the p5sound.Delay effect

//   delay = new p5sound.Delay();
//   delay.process(noise, 0.12, 0.7, 2300); // tell delay to process noise

//   // the Env accepts time / value pairs to
//   // create a series of timed fades
//   env = new p5sound.Env(0.01, 1, 0.2, 0.1);

//   // p5sound.Amplitude will analyze all sound in the sketch
//   analyzer = new p5sound.Amplitude();
// }

// function draw() {
//   background(0);

//   // get volume reading from the p5sound.Amplitude analyzer
//   var level = analyzer.getLevel();
//   // then use level to draw a green rectangle
//   var levelHeight = map(level, 0, 0.4, 0, height);
//   fill(100, 250, 100);
//   rect(0, height, width, -levelHeight);

//   // map mouseX and mouseY to p5sound.Delay parameters
//   var filterFreq = map(mouseX, 0, width, 60, 15000);
//   filterFreq = constrain(filterFreq, 60, 15000);
//   var filterRes = map(mouseY, 0, height, 3, 0.01);
//   filterRes = constrain(filterRes, 0.01, 3);
//   delay.filter(filterFreq, filterRes);
//   var delTime = map(mouseY, 0, width, 0.2, 0.01);
//   delTime = constrain(delTime, 0.01, 0.2);
//   delay.delayTime(delTime);
// }

// function mousePressed() {
//   env.play(noise);
// }
