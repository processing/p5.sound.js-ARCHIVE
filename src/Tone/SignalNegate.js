// https://github.com/Tonejs/Tone.js/blob/r10/Tone/signal/Negate.js

// import Signal from './Signal';
import SignalMultiply from './SignalMultiply';

/**
*  @class Negate the incoming signal. i.e. an input signal of 10 will output -10
*
*  @constructor
*  @extends {Tone.SignalBase}
*  @example
* let neg = new Tone.Negate();
* let sig = new Tone.Signal(-2).connect(neg);
* //output of neg is positive 2.
*/
class SignalNegate {
  /**
  *  negation is done by multiplying by -1
  *  @type {SignalMultiply}
  *  @private
  */
  constructor() {
    this._multiply = this.input = this.output = new SignalMultiply(-1);
  }

  /**
	 *  clean up
	 *  @returns {Tone.Negate} this
	 */
  dispose(){
    dispose.call(this);
    this._multiply.dispose();
    this._multiply = null;
    return this;
  }
}

export default SignalNegate;