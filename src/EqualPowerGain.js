// https://raw.githubusercontent.com/Tonejs/Tone.js/r10/Tone/signal/EqualPowerGain.js

import WaveShaper from './WaveShaper';

/**
 *  @class Convert an incoming signal between 0, 1 to an equal power gain scale.
 *
 *  @extends {SignalBase}
 *  @constructor
 *  @example
 * let eqPowGain = new EqualPowerGain();
 */

class EqualPowerGain {
  constructor() {
    this._eqPower = this.input = this.output = new WaveShaper(function (val) {
      if (Math.abs(val) < 0.001) {
        return 0;
      } else {
        return this.equalPowerScale(val);
      }
    }.bind(this), 4096);
  }
  dispose() {
    this._eqPower.dispose();
    this._eqPower = null;
    return this;
  }
}

export default EqualPowerGain;
