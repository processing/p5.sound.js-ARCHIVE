/**
 * @module Sound
 * @submodule Oscillator
 * @for p5
 * @requires core
 */
/**
 * Creates a  new <a href="#/p5sound.Oscillator">p5sound.Oscillator</a>
 *
 * Example coming soon...
 */


import audioContext from './audioContext';

// reference
// https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/destination
// jason recommends to play with the web audio api on the console
// on google chrome

/*
 * Class methods
 */
/**
*
* @class p5sound.Oscillator
* @constructor
* @param {Number} type
*/

class Oscillator {
  constructor(freq, type) {
    this.type = type;//sine, triangle, square, saw, pulse

    if (typeof freq === 'string') {
      let f = type;
      type = freq;
      freq = f;
    }
    if (typeof type === 'number') {
      let f = type;
      type = freq;
      freq = f;
    }
    this.started = false;

    this.oscillator = audioContext.createOscillator();
    this.f = freq || 440.0; // frequency
    this.oscillator.type = type || 'sine';
    this.oscillator.frequency.setValueAtTime(
      this.f,
      audioContext.currentTime
    );

    // connections
    this.output = audioContext.createGain();

    // set default output gain to 0.5
    // TODO: maybe think of a constant that people can tweak
    // for max volume
    this.output.gain.value = 0.5;

    this.output.gain.setValueAtTime(0.5, audioContext.currentTime);

    this.oscillator.connect(this.output);

    this.output.connect(audioContext.destination);

    // if you wanna do 3D node panners
    // please do it with web audio api,
    // everything we are doing here its compatible

    // add to the soundArray so we can dispose of the osc later
    // p5sound.soundArray.push(this);

    // TODO: try a different approach
    // not create references to the audio nodes
    // so that we dont use up so much memory

    // this.typeName = '';
    // switch(type){
    //   default:
    //   case 0:
    //     this.typeName = 'sine';
    //     break;
    //   case 1:
    //     this.typeName = 'triangle';
    //     break;
    //   case 2:
    //     this.typeName = 'square';
    //     break;
    //   case 3:
    //     this.typeName = 'saw';
    //     break;
    //   case 4:
    //     this.typeName = 'pulse';
    //     break;
    // }
  }

  start(time, f) {
    if (this.started) {
      let now = audioContext.currentTime;
      this.stop(now);
    }
    if (!this.started) {
      let freq = f || this.f;
      let type = this.oscillator.type;

      this.oscillator = audioContext.createOscillator();
      this.oscillator.frequency.value = Math.abs(freq);
      this.oscillator.type = type;

      this.oscillator.connect(this.output);
      time = time || 0;
      this.oscillator.start(time + audioContext.currentTime);

      this.started = true;


    }
  }

  // hopefully we can get rid of the started variable
  stop(time) {
    if (this.started) {
      let t = time || 0;
      let now = audioContext.currentTime;
      this.oscillator.stop(t + now);
      this.started = false;
    }
  }


  /**
  * Dummy method
  *
  * @method helloworld
  *
  */
  helloworld(){
    console.log(this.typeName);
  }
}

export default Oscillator;


