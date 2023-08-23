// https://github.com/Tonejs/Tone.js/blob/r10/Tone/signal/Modulo.js

import SignalMultiply from './SignalMultiply';
import SignalSubtract from './SignalSubtract';
import SignalWaveShaper from './SignalWaveShaper';

class SignalModulo {
  /**
  *  @class Signal-rate modulo operator. Only works in AudioRange [-1, 1] and for modulus
  *         values in the NormalRange.
  *
  *  @constructor
  *  @extends {SignalBase}
  *  @param {NormalRange} modulus The modulus to apply.
  *  @example
  * let mod = new SignalModulo(0.2)
  * let sig = new Signal(0.5).connect(mod);
  * //mod outputs 0.1
  */
  constructor(modulus) {


    /**
    * The modulus value.
    * @memberOf Tone.Modulo#
    * @type {NormalRange}
    * @name value
    */
    // Object.defineProperty(Tone.Modulo.prototype, 'value', {
    Object.defineProperty(this.prototype, 'value', {
      get : function(){
        return this._modSignal.value;
      },
      set : function(mod){
        this._modSignal.value = mod;
        this._setWaveShaper(mod);
      }
    });

    this.createInsOuts(1, 0);
    /**
    *  A waveshaper gets the integer multiple of
    *  the input signal and the modulus.
    *  @private
    *  @type {SignalWaveShaper}
    */
    this._shaper = new SignalWaveShaper(Math.pow(2, 16));

    /**
    *  the integer multiple is multiplied by the modulus
    *  @type  {SignalMultiply}
    *  @private
    */
    this._multiply = new SignalMultiply();

    /**
    *  and subtracted from the input signal
    *  @type  {SignalSubtract}
    *  @private
    */
    this._subtract = this.output = new SignalSubtract();

    /**
    *  the modulus signal
    *  @type  {Signal}
    *  @private
    */
    this._modSignal = new Signal(modulus);

    //connections
    this.input.fan(this._shaper, this._subtract);
    this._modSignal.connect(this._multiply, 0, 0);
    this._shaper.connect(this._multiply, 0, 1);
    this._multiply.connect(this._subtract, 0, 1);
    this._setWaveShaper(modulus);

  }

  /**
    *  @param  {number}  mod  the modulus to apply
    *  @private
    */
  _setWaveShaper(mod){
    this._shaper.setMap(function(val){
      let multiple = Math.floor((val + 0.0001) / mod);
      return multiple;
    });
  }


  /**
  * clean up
  *  @returns {SignalModulo} this
  */
  dispose() {
    dispose.call(this);
    this._shaper.dispose();
    this._shaper = null;
    this._multiply.dispose();
    this._multiply = null;
    this._subtract.dispose();
    this._subtract = null;
    this._modSignal.dispose();
    this._modSignal = null;
    return this;
  }

}

export default SignalModulo;
