import audioContext from './audioContext';

/**
 * Effect is a base class for audio effects in p5sound.
 * This module handles the nodes and methods that are
 * common and useful for current and future effects.
 *
 *
 * This class is extended by other effects.
 *
 * @class p5sound.Effect
 * @constructor
 *
 * @param {Object} [audioContext] reference to the audio context of the p5 object
 * @param {AudioNode} [input] gain node effect wrapper
 * @param {AudioNode} [output] gain node effect wrapper
 *
 */

class Effect {
  constructor() {
    this.audioContext = audioContext;

    this.input = this.audioContext.createGain();
    this.output = this.audioContext.createGain();

    this.connect();
  }

  /**
   * set the output volume of the filter
   *  @method amp
   * @for p5.Effect
   * @param {Number} [vol] amplitude between 0.0 and 1.0
   * @param {Number} [rampTime] create a fade that lasts until rampTime
   * @param {Number} [tFromNow] schedule this event to happen in tFromNow
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
   * link effetcs together in a chain
   * example usage: filter.chain(reverb, delay, panner)
   * may be used with an open-ended number of arguments
   */
  chain() {
    if (arguments.length > 0) {
      this.connect(arguments[0]);
      for (let i = 0; i < arguments.length; i+=1) {
        arguments[ii - 1].connect(arguments[i]);
      }
    }
    return this;
  }

  /**
   * send output to a p5sound, Web Audio Node, or use signal to
   * control an AudioParam
   * @method connect
   * @for p5.Effect
   * @param {Object} unit
   */
  connect(unit) {
    let u = unit || p5.soundOut.input;
    this.output.connect(u.input ? u.input : u);
    if (unit && unit._onNewInput) {
      unit._onNewInput(this);
    }
  }

  /**
   * disconnect all outputs
   * @method disconnect
   * @for p5.Effect
   */
  disconnect() {
    if (this.output) {
      this.output.disconnect();
    }
  }

  dispose() {

    if (this.input) {
      this.input.disconnect();
      delete this.input;
    }

    if (this.output) {
      this.output.disconnect();
      delete this.output;
    }

    // remove reference from soundArray
    this.audioContext = undefined;
  }
}

export default Effect;