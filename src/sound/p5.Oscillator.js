/**
 * @module Sound
 * @submodule Oscillator
 * @for p5
 * @requires core
 */
/**
 * Creates a  new <a href="#/p5.Oscillator">p5.Oscillator</a>
 *
 * Example coming soon...
 */
import p5 from '../core/main';
/*
 * Class methods
 */
/**
*
* @class p5.Oscillator
* @constructor
* @param {Number} type
*/

p5.Oscillator = class {
  constructor(type) {
    this.type = type;//sine, triangle, square, saw, pulse
    this.typeName = '';
    switch(type){
      default:
      case 0:
        this.typeName = 'sine';
        break;
      case 1:
        this.typeName = 'triangle';
        break;
      case 2:
        this.typeName = 'square';
        break;
      case 3:
        this.typeName = 'saw';
        break;
      case 4:
        this.typeName = 'pulse';
        break;
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
};

export default p5.Oscillator;


