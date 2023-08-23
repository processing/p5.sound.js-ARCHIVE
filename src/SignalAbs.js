// https://github.com/Tonejs/Tone.js/blob/r10/Tone/signal/Abs.js

import SignalWaveShaper from './SignalWaveShaper';

/**
*  @class Return the absolute value of an incoming signal.
*
*  @constructor
*  @extends {SignalBase}
*  @example
* let signal = new Tone.Signal(-1);
* let abs = new Tone.Abs();
* signal.connect(abs);
* //the output of abs is 1.
*/

class SignalAbs {

  /**
  *  @type {Tone.LessThan}
  *  @private
  */
  constructor() {
    this._abs = this.input = this.output = new SignalWaveShaper(function (val) {
      if (val === 0) {
        return 0;
      } else {
        return Math.abs(val);
      }
    }, 127);
  }

  /**
  *  dispose method
  *  @returns {Tone.Abs} this
  */
  dispose(){
    dispose.call(this);
    this._abs.dispose();
    this._abs = null;
    return this;
  }

}

export default SignalAbs;