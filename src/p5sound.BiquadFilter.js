import audioContext from './audioContext';
import Effect from './p5sound.Effect';

class BiquadFilter extends Effect {
  constructor(type) {
    super();
    this.biquad = audioContext.createBiquadFilter();
    this.input.connect(this.biquad);
    this.biquad.connect(this.output);
    if (type) {
      this.setType(type);
    }
    this._on = true;
    this._untoggledType = this.biquad.type;
  }

  process(src, freq, res, time) {
    if (freq) {
      this.freq(freq, time);
    } if (res) {
      this.res(res, time);
    }
  }
  freq(freq, time) {
    let t = time || 0;
    if (freq <= 0) {
      freq = 1;
    }
    if (typeof freq === 'number') {
      this.biquad.frequency.cancelScheduledValues(
        audioContext.currentTime + 0.01 + t);
      this.biquad.frequency.exponentialRampToValueAtTime(
        freq,
        audioContext.currentTime + 0.02 + t);
    } else if(freq) {
      freq.connect(this.biquad.frequency);
    }
    return this.biquad.frequency.value;
  }

  res(res, time) {
    let t = time || 0;
    if (typeof res === 'number') {
      this.biquad.Q.value = res;
      this.biquad.Q.cancelScheduledValues(
        audioContext.currentTime + 0.01 + t);
      this.biquad.Q.linearRampToValueAtTime(
        res,
        audioContext.currentTime + 0.02 + t
      );
    } else if (res) {
      res.connect(this.biquad.Q);
    }
    return this.biquad.Q.value;
  }

  gain(gain, time) {
    let t = time || 0;
    if (typeof gain === 'number') {
      this.biquad.gain.value = gain;
      this.biquad.gain.cancelScheduledValues(
        audioContext.currentTime + 0.01 + t);
      this.biquad.gain.linearRampToValueAtTime(
        gain,
        audioContext.currentTime + 0.02 + t
      );
    } else if (gain) {
      gain.connect(this.biquad.gain);
    }
    return this.biquad.gain.value;
  }

  toggle() {
    this._on = !this._on;

    if (this._on === true) {
      this.biquad.type = this._untoggledType;
    } else if (this._on === false) {
      this.biquad.type = 'allpass';
    }

    return this._on;
  }

  setType(t) {
    this.biquad.type = t;
    this._untoggledType = this.biquad.type;
  }
  dispose() {
    // remove reference from soundArray
    super.dispose();
    if (this.biquad) {
      this.biquad.disconnect();
      delete this.biquad;
    }
  }
}

/**
 *  Constructor: <code>new p5.LowPass()</code> BiquadFilter.
 *  This is the same as creating a p5.BiquadFilter and then calling
 *  its method <code>setType('lowpass')</code>.
 *  See p5.BiquadFilter for methods.
 *
 *  @class p5.LowPass
 *  @constructor
 *  @extends p5.BiquadFilter
 */
class LowPass extends BiquadFilter {
  constructor() {
    super('lowpass');
  }
}

/**
*  Constructor: <code>new p5.HighPass()</code> BiquadFilter.
*  This is the same as creating a p5.BiquadFilter and then calling
*  its method <code>setType('highpass')</code>.
*  See p5.BiquadFilter for methods.
*
*  @class p5.HighPass
*  @constructor
*  @extends p5.BiquadFilter
*/
class HighPass extends BiquadFilter {
  constructor() {
    super('highpass');
  }
}

/**
*  Constructor: <code>new p5.BandPass()</code> BiquadFilter.
*  This is the same as creating a p5.BiquadFilter and then calling
*  its method <code>setType('bandpass')</code>.
*  See p5.BiquadFilter for methods.
*
*  @class p5.BandPass
*  @constructor
*  @extends p5.BiquadFilter
*/
class BandPass extends BiquadFilter {
  constructor() {
    super('bandpass');
  }
}

export default BiquadFilter;
export { LowPass, HighPass, BandPass };