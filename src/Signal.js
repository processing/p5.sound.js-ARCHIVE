// https://github.com/Tonejs/Tone.js/blob/r10/Tone/signal/Signal.js

import audioContext from './audioContext';
// import Gain from './Gain';
import Param from './Param';
import SignalBase from './SignalBase';
import Type from './Type';
// import SignalWaveShaper from './SignalWaveShaper';

/**
*  @class  A signal is an audio-rate value. Tone.Signal is a core component of the library.
*          Unlike a number, Signals can be scheduled with sample-level accuracy. Tone.Signal
*          has all of the methods available to native Web Audio
*          [AudioParam](http://webaudio.github.io/web-audio-api/#the-audioparam-interface)
*          as well as additional conveniences. Read more about working with signals
*          [here](https://github.com/Tonejs/Tone.js/wiki/Signals).
*
*  @constructor
*  @extends {Tone.Param}
*  @param {Number|AudioParam} [value] Initial value of the signal. If an AudioParam
*                                     is passed in, that parameter will be wrapped
*                                     and controlled by the Signal.
*  @param {string} [units=Number] unit The units the signal is in.
*  @example
* let signal = new Signal(10);
*/

class Signal {
  constructor() {

    this.audioContext = audioContext;

    this.defaults = {
      'value': 0,
      'units': Type.Default,
      'convert': true
    };

    let options = this.optionsObject(arguments, ['value', 'units'], Signal.defaults);
    /**
    * The node where the constant signal value is scaled.
    * @type {GainNode}
    * @private
    */
    this.output = this._gain = this.audioContext.createGain();
    options.param = this._gain.gain;
    Param.call(this, options);

    /**
    * The node where the value is set.
    * @type {Tone.Param}
    * @private
    */
    this.input = this._param = this._gain.gain;
    /**
	  * The node where the value is set.
 		 * @type {Tone.Param}
 		 * @private
 		 */
    this.input = this._param = this._gain.gain;

    //connect the const output to the node output
    this.audioContext.getConstant(1).chain(this._gain);
  }

  /**
  	 *  When signals connect to other signals or AudioParams,
  	 *  they take over the output value of that signal or AudioParam.
  	 *  For all other nodes, the behavior is the same as a default <code>connect</code>.
  	 *
  	 *  @override
  	 *  @param {AudioParam|AudioNode|Signal|Tone} node
  	 *  @param {number} [outputNumber=0] The output number to connect from.
  	 *  @param {number} [inputNumber=0] The input number to connect to.
  	 *  @returns {SignalBase} this
  	 *  @method
  	 */
  connect() {
    SignalBase.prototype.connect;
  }

  /**
  *  dispose and disconnect
  *  @returns {Tone.Signal} this
  */
  dispose() {
    Param.prototype.dispose.call(this);
    this._param = null;
    this._gain.disconnect();
    this._gain = null;
    return this;
  }

}

export default Signal;