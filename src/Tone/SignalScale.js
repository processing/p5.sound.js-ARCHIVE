// https://github.com/Tonejs/Tone.js/blob/r10/Tone/signal/Scale.js

// import Signal from './Signal';
import SignalAdd from './SignalAdd';
import SignalMultiply from './SignalMultiply';

/**
*  @class  Performs a linear scaling on an input signal.
*          Scales a NormalRange input to between
*          outputMin and outputMax.
*
*  @constructor
*  @extends {Tone.SignalBase}
*  @param {number} [outputMin=0] The output value when the input is 0.
*  @param {number} [outputMax=1]	The output value when the input is 1.
*  @example
* let scale = new Tone.Scale(50, 100);
* let signal = new Tone.Signal(0.5).connect(scale);
* //the output of scale equals 75
*/
class SignalScale {
  constructor(outputMin, outputMax) {

    /**
    * The minimum output value. This number is output when
    * the value input value is 0.
    * @memberOf Tone.Scale#
    * @type {number}
    * @name min
    */
    // Object.defineProperty(Tone.Scale.prototype, 'min', {
    Object.defineProperty(this.prototype, 'min', {
      get : function(){
        return this._outputMin;
      },
      set : function(min){
        this._outputMin = min;
        this._setRange();
      }
    });

    /**
    * The maximum output value. This number is output when
    * the value input value is 1.
    * @memberOf Tone.Scale#
    * @type {number}
    * @name max
    */
    // Object.defineProperty(Tone.Scale.prototype, 'max', {
    Object.defineProperty(this.prototype, 'max', {
      get : function(){
        return this._outputMax;
      },
      set : function(max){
        this._outputMax = max;
        this._setRange();
      }
    });


    /**
    *  set the values
    *  @private
    */
    _setRange = function() {
      this._add.value = this._outputMin;
      this._scale.value = this._outputMax - this._outputMin;
    };


    /**
    *  @private
    *  @type {number}
    */
    this._outputMin = this.defaultArg(outputMin, 0);

    /**
    *  @private
    *  @type {number}
    */
    this._outputMax = this.defaultArg(outputMax, 1);

    /**
    // *  @private
    // *  @type {SignalMultiply}
    // *  @private
    // */
    this._scale = this.input = new SignalMultiply(1);

    /**
    *  @private
    *  @type {SignalAdd}
    *  @private
    */
    this._add = this.output = new SignalAdd(0);

    this._scale.connect(this._add);
    this._setRange();
  }

  /**
*  Clean up.
*  @returns {Tone.Scale} this
*/
  dispose(){
    dispose.call(this);
    this._add.dispose();
    this._add = null;
    this._scale.dispose();
    this._scale = null;
    return this;
  }
}

export default SignalScale;
