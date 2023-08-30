// https://raw.githubusercontent.com/Tonejs/Tone.js/r10/Tone/signal/EqualPowerGain.js

import SignalWaveShaper from './SignalWaveShaper';

/**
 *  @class Convert an incoming signal between 0, 1 to an equal power gain scale.
 *
 *  @extends {SignalBase}
 *  @constructor
 *  @example
 * let eqPowGain = new EqualPowerGain();
 */

class SignalEqualPowerGain {
  constructor() {
    this._eqPower = this.input = this.output = new SignalWaveShaper(
      function (val) {
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

export default SignalEqualPowerGain;
