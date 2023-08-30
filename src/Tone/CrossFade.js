// https://github.com/Tonejs/Tone.js/blob/r10/Tone/component/CrossFade.js

// import audioContext from './audioContext';

import Signal from './Signal';
import Expr from './SignalExpr';
import EqualPowerGain from './SignalEqualPowerGain';
import Gain from './Gain';

/**
* @class  Tone.Crossfade provides equal power fading between two inputs.
*         More on crossfading technique [here](https://en.wikipedia.org/wiki/Fade_(audio_engineering)#Crossfading).
*
* @constructor
* @extends {Tone}
* @param {NormalRange} [initialFade=0.5]
* @example
* var crossFade = new Tone.CrossFade(0.5);
* //connect effect A to crossfade from
* //effect output 0 to crossfade input 0
* effectA.connect(crossFade, 0, 0);
* //connect effect B to crossfade from
* //effect output 0 to crossfade input 1
* effectB.connect(crossFade, 0, 1);
* crossFade.fade.value = 0;
* // ^ only effectA is output
* crossFade.fade.value = 1;
* // ^ only effectB is output
* crossFade.fade.value = 0.5;
* // ^ the two signals are mixed equally.
*/


class CrossFade {
  constructor(initialFade) {
    this.createInsOuts(2, 1);
    /**
    *  Alias for <code>input[0]</code>.
    *  @type {Gain}
    */
    this.a = this.input[0] = new Gain();

    /**
    *  Alias for <code>input[1]</code>.
    *  @type {Gain}
    */
    this.b = this.input[1] = new Gain();

    /**
    *  equal power gain cross fade
    *  @private
    *  @type {EqualPowerGain}
    */
    this._equalPowerA = new EqualPowerGain();

    /**
    *  equal power gain cross fade
    *  @private
    *  @type {Tone.EqualPowerGain}
    */
    this._equalPowerB = new EqualPowerGain();

    /**
    *  invert the incoming signal
    *  @private
    *  @type {Tone}
    */
    this._invert = new Expr('1 - $0');

    //connections
    this.a.connect(this.output);
    this.b.connect(this.output);
    this.fade.chain(this._equalPowerB, this.b.gain);
    this.fade.chain(this._invert, this._equalPowerA, this.a.gain);
    this._readOnly('fade');


    /**
    * The mix between the two inputs. A fade value of 0
    * will output 100% <code>input[0]</code> and
    * a value of 1 will output 100% <code>input[1]</code>.
    * @type {NormalRange}
    * @signal
    */
    this.fade = new Signal(this.defaultArg(initialFade, 0.5), Type.NormalRange);
  }

  /**
  *  clean up
  *  @returns {Tone.CrossFade} this
  */
  dispose() {
    this._writable('fade');
    this._equalPowerA.dispose();
    this._equalPowerA = null;
    this._equalPowerB.dispose();
    this._equalPowerB = null;
    this.fade.dispose();
    this.fade = null;
    this._invert.dispose();
    this._invert = null;
    this.a.dispose();
    this.a = null;
    this.b.dispose();
    this.b = null;
    return this;
  }
}

export default CrossFade;