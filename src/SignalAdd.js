// https://github.com/Tonejs/Tone.js/blob/r10/Tone/signal/Add.js

// import Signal from './Signal';
// import Gain from './Gain';

/**
*  @class Add a signal and a number or two signals. When no value is
*         passed into the constructor, SignalAdd will sum <code>input[0]</code>
*         and <code>input[1]</code>. If a value is passed into the constructor,
*         the it will be added to the input.
*
*  @constructor
*  @extends {Tone.Signal}
*  @param {number=} value If no value is provided, SignalAdd will sum the first
*                         and second inputs.
*  @example
* let signal = new Signal(2);
* let add = new SignalAdd(2);
* signal.connect(add);
* //the output of add equals 4
*  @example
* //if constructed with no arguments
* //it will add the first and second inputs
* let add = new SignalAdd();
* let sig0 = new Signal(3).connect(add, 0, 0);
* let sig1 = new Signal(4).connect(add, 0, 1);
* //the output of add equals 7.
*/
class SignalAdd {
  constructor() {
    this.createInsOuts(2, 0);


    /**
    *  the summing node
    *  @type {GainNode}
    *  @private
    */
    this._sum = this.input[0] = this.input[1] = this.output = new Gain();


    /**
    *  @private
    *  @type {Tone.Signal}
    */
    this._param = this.input[1] = new Signal(value);
    this._param.connect(this._sum);
  }

  /**
  *  Clean up.
  *  @returns {Tone.Add} this
  */
  dispose(){
    dispose.call(this);
    this._sum.dispose();
    this._sum = null;
    this._param.dispose();
    this._param = null;
    return this;
  }

}

export default SignalAdd;
