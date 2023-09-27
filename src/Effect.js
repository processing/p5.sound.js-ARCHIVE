import audioContext from './audioContext';
import p5sound from './main';
import { CrossFade as ToneCrossFrade } from 'tone';
/**
 * Effect is a base class for audio effects in p5sound.
 * This module handles the nodes and methods that are
 * common and useful for current and future effects.
 *
 *
 * This class is extended by other effects.
 *
 * @class Effect
 * @constructor
 *
 * @param {Object} [audioContext] reference to the audio context of the p5 object
 * @param {AudioNode} [input] gain node effect wrapper
 * @param {AudioNode} [output] gain node effect wrapper
 *
 */

class Effect {
  constructor() {

    this.input = audioContext.createGain();
    this.output = audioContext.createGain();

    this._drywet = new ToneCrossFrade(1);
    this.wet = audioContext.createGain();

    this.input.connect(this._drywet.a);
    this.wet.connect(this._drywet.b);
    this._drywet.connect(this.output);

    this.connect();
    this.output.connect(p5sound.input);

    // this.input.gain.value = 0.5;
    // this.output.gain.value = 0.5;
    // this.input.connect(this.output);
    // this.output.connect(p5sound.input);

    p5sound.soundArray.push(this);
  }

  /**
   * set the output volume of the filter
   *  @method amp
   * @for Effect
   * @param {Number} [vol] amplitude between 0.0 and 1.0
   * @param {Number} [rampTime] create a fade that lasts until rampTime
   * @param {Number} [tFromNow] schedule this event to happen in tFromNow
 * @example
 * <div><code>
 * function setup() {
 * console.log('TODO EXAMPLE');
 * }
 *
 * function draw() {
 * }
 * </code></div>
   */
  amp(vol, rampTime = 0, tFromNow = 0) {
    const now = audioContext.currentTime;
    const startTime = now + tFromNow;
    const endTime = startTime + rampTime * 0.001;
    const currentVol = this.output.gain.value;
    this.output.gain.cancelScheduledValues(now);
    this.output.gain.linearRampToValueAtTime(currentVol, startTime + 0.001);
    this.output.gain.linearRampToValueAtTime(vol, endTime);
  }

  /**
   * link effects together in a chain
   * example usage: filter.chain(reverb, delay, panner)
   * may be used with an open-ended number of arguments
   */
  chain() {
    if (arguments.length > 0) {
      this.connect(arguments[0]);
      for (let i = 0; i < arguments.length; i+=1) {
        arguments[i - 1].connect(arguments[i]);
      }
    }
    return this;
  }


  /**
   *  Adjust the dry/wet value.
   *
   *  @method drywet
   *  @for Effect
   *  @param {Number} [fade] The desired drywet value (0 - 1.0)
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  drywet(fade) {
    if (typeof fade !== 'undefined') {
      this._drywet.fade.value = fade;
    }
    return this._drywet.fade.value;
  }

  /**
   * send output to a p5sound, Web Audio Node, or use signal to
   * control an AudioParam
   * @method connect
   * @for Effect
   * @param {Object} unit
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
   * disconnect all outputs
   * @method disconnect
   * @for Effect
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

  dispose() {
    // remove reference from soundArray
    let index = p5sound.soundArray.indexOf(this);
    p5sound.soundArray.splice(index, 1);

    if (this.input) {
      this.input.disconnect();
      delete this.input;
    }

    if (this.output) {
      this.output.disconnect();
      delete this.output;
    }

  }
}

export default Effect;