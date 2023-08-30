// https://github.com/Tonejs/Tone.js/blob/r10/Tone/signal/Pow.js

import SignalWaveShaper from './SignalWaveShaper';

/**
*  @class Pow applies an exponent to the incoming signal. The incoming signal
*         must be AudioRange.
*
*  @extends {SignalBase}
*  @constructor
*  @param {Positive} exp The exponent to apply to the incoming signal, must be at least 2.
*  @example
* let pow = new SignalPow(2);
* let sig = new Signal(0.5).connect(pow);
* //output of pow is 0.25.
*/
class SignalPow {
  /**
  * the exponent
  * @private
  * @type {number}
  */
  constructor() {

    /**
  * The value of the exponent.
  * @memberOf Tone.Pow#
  * @type {number}
  * @name value
  */
    // Object.defineProperty(Tone.Pow.prototype, 'value', {
    Object.defineProperty(this.prototype, 'value', {
      get : function(){
        return this._exp;
      },
      set : function(exp){
        this._exp = exp;
        this._expScaler.setMap(this._expFunc(this._exp));
      }
    });

    this._exp = this.defaultArg(exp, 1);
    /**
    *  @type {WaveShaperNode}
    *  @private
    */
    this._expScaler = this.input = this.output = new SignalWaveShaper(
      this._expFunc(this._exp), 8192);
  }


  /**
    *  the function which maps the waveshaper
    *  @param   {number} exp
    *  @return {function}
    *  @private
    */_expFunc(exp){
    return function(val){
      return Math.pow(Math.abs(val), exp);
    };
  }

  /**
  *  Clean up.
  *  @returns {Tone.Pow} this
  */
  dispose(){
    dispose.call(this);
    this._expScaler.dispose();
    this._expScaler = null;
    return this;
  }

}

export default SignalPow;