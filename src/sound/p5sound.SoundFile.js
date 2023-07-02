/**
 * SoundFile object with a path to a file.
 * The p5sound.SoundFile may not be available immediately because it loads the file information asynchronously.
 * To do something with the sound as soon as it loads pass the name of a function as the second parameter.
 * @module Sound
 * @submodule SoundFile
 * @for p5
 * @requires core
 */

// import p5sound from '../core/main';

/*
* @class p5sound.Oscillator
* @constructor
* @param {String|Array} path to a sound file (String). Optionally, you may include multiple file formats in an array. Alternately, accepts an object from the HTML5 File API, or a p5sound.File.
* @param {Function} [successCallback] Name of a function to call once file loads.
*/
SoundFile = class {
  constructor(path) {
    this.path = path;
  }
  isLoaded(){
    console.log('isLoaded');
  }
  play() {
    console.log('play');
  }
  playMode() {
    console.log('playMode');
  }
  pause() {
    console.log('pause');
  }
};
export default SoundFile;


