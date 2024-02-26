import audioContext from './audioContext';
import p5sound from './main';

/**
 *  A gain node is usefull to set the relative volume of sound.
 *  It's typically used to build mixers.
 *
 *  @class Gain
 *  @constructor
 *  @example
 *  <div><code>
 *
 *  // load two soundfile and crossfade beetween them
 *  let sound1,sound2;
 *  let sound1Gain, sound2Gain, mixGain;
 *  function preload(){
 *    soundFormats('ogg', 'mp3');
 *    sound1 = loadSound('assets/Damscray_-_Dancing_Tiger_01');
 *    sound2 = loadSound('assets/beat');
 *  }
 *  function setup() {
 *    let cnv = createCanvas(100, 100);
 *    cnv.mousePressed(startSound);
 *    // create a 'mix' gain bus to which we will connect both soundfiles
 *    mixGain = new Gain();
 *    mixGain.connect();
 *    sound1.disconnect(); // diconnect from p5 output
 *    sound1Gain = new Gain(); // setup a gain node
 *    sound1Gain.setInput(sound1); // connect the first sound to its input
 *    sound1Gain.connect(mixGain); // connect its output to the final mix bus
 *    sound2.disconnect();
 *    sound2Gain = new Gain();
 *    sound2Gain.setInput(sound2);
 *    sound2Gain.connect(mixGain);
 *  }
 *  function startSound() {
 *    sound1.loop();
 *    sound2.loop();
 *    loop();
 *  }
 *  function mouseReleased() {
 *    sound1.stop();
 *    sound2.stop();
 *  }
 *  function draw(){
 *    background(220);
 *    textAlign(CENTER);
 *    textSize(11);
 *    fill(0);
 *    if (!sound1.isPlaying()) {
 *      text('tap and drag to play', width/2, height/2);
 *      return;
 *    }
 *    // map the horizontal position of the mouse to values useable for volume    *  control of sound1
 *    let sound1Volume = constrain(map(mouseX,width,0,0,1), 0, 1);
 *    let sound2Volume = 1-sound1Volume;
 *    sound1Gain.amp(sound1Volume);
 *    sound2Gain.amp(sound2Volume);
 *    // map the vertical position of the mouse to values useable for 'output    *  volume control'
 *    let outputVolume = constrain(map(mouseY,height,0,0,1), 0, 1);
 *    mixGain.amp(outputVolume);
 *    text('output', width/2, height - outputVolume * height * 0.9)
 *    fill(255, 0, 255);
 *    textAlign(LEFT);
 *    text('sound1', 5, height - sound1Volume * height * 0.9);
 *    textAlign(RIGHT);
 *    text('sound2', width - 5, height - sound2Volume * height * 0.9);
 *  }
 *</code></div>
 */

class Gain {
  constructor() {

    this.input = audioContext.createGain();
    this.output = audioContext.createGain();

    this.input.gain.value = 0.5;
    this.output.gain.value = 0.5;

    this.input.connect(this.output);
    this.output.connect(p5sound.input);

    // add  to the soundArray
    p5sound.soundArray.push(this);
  }

  /**
   *  Connect a source to the gain node.
   *
   *  @method  setInput
   *  @for Gain
   *  @param  {Object} src     p5.sound / Web Audio object with a sound
   *                           output.
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

  setInput(src) {
    src.connect(this.input);
  }

  /**
   *  Send output to a p5.sound or web audio object
   *
   *  @method  connect
   *  @for Gain
   *  @param  {Object} unit
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  connect(unit) {
    let u = unit || p5sound.input;
    this.output.connect(u.input ? u.input : u);
    if (unit && unit._onNewInput) {
      unit._onNewInput(this);
    }
  }

  /**
   *  Disconnect all output.
   *
   *  @method disconnect
   *  @for Gain
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  disconnect() {
    if (this.output) {
      this.output.disconnect();
    }
  }

  /**
   *  Set the output level of the gain node.
   *
   *  @method  amp
   *  @for Gain
   *  @param  {Number} volume amplitude between 0 and 1.0
   *  @param  {Number} [rampTime] create a fade that lasts rampTime
   *  @param  {Number} [timeFromNow] schedule this event to happen
   *                                seconds from now
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  amp(vol, rampTime = 0, tFromNow = 0) {
    let now = audioContext.currentTime;
    let currentVol = this.output.gain.value;
    this.output.gain.cancelScheduledValues(now);
    this.output.gain.linearRampToValueAtTime(currentVol, now + tFromNow);
    this.output.gain.linearRampToValueAtTime(vol, now + tFromNow + rampTime);
  }

  dispose() {
    // remove reference from soundArray
    let index = p5sound.soundArray.indexOf(this);
    p5sound.soundArray.splice(index, 1);
    if (this.output) {
      this.output.disconnect();
      delete this.output;
    }
    if (this.input) {
      this.input.disconnect();
      delete this.input;
    }
  }
}

export default Gain;
