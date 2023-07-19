import Effect from './p5sound.Effect';

class Filter extends Effect {
  constructor(type) {
    super();
    this.biquad = this.audioContext.createBiquadFilter();
    this.input.connect(this.biquad);
    this.biquad.connect(this.wet);
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
        this.audioContext.currentTime + 0.01 + t);
      this.biquad.frequency.exponentialRampToValueAtTime(
        freq,
        this.audioContext.currentTime + 0.02 + t);
    } else if(freq) {
      freq.connect(this.biquad.frequency);
    }
    return this.biquad.frequency.value;
  }

  res(res, time) {
    let t = time || 0;
    if (typeof res === 'number') {
      this.biquad.Q.value = res;
      this.biquad.Q.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
      this.biquad.Q.linearRampToValueAtTime(
        res,
        this.ac.currentTime + 0.02 + t
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
      this.biquad.gain.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
      this.biquad.gain.linearRampToValueAtTime(
        gain,
        this.ac.currentTime + 0.02 + t
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
 *  Constructor: <code>new p5.LowPass()</code> Filter.
 *  This is the same as creating a p5.Filter and then calling
 *  its method <code>setType('lowpass')</code>.
 *  See p5.Filter for methods.
 *
 *  @class p5.LowPass
 *  @constructor
 *  @extends p5.Filter
 */
class LowPass extends Filter {
  constructor() {
    super('lowpass');
  }
}

/**
*  Constructor: <code>new p5.HighPass()</code> Filter.
*  This is the same as creating a p5.Filter and then calling
*  its method <code>setType('highpass')</code>.
*  See p5.Filter for methods.
*
*  @class p5.HighPass
*  @constructor
*  @extends p5.Filter
*/
class HighPass extends Filter {
  constructor() {
    super('highpass');
  }
}

/**
*  Constructor: <code>new p5.BandPass()</code> Filter.
*  This is the same as creating a p5.Filter and then calling
*  its method <code>setType('bandpass')</code>.
*  See p5.Filter for methods.
*
*  @class p5.BandPass
*  @constructor
*  @extends p5.Filter
*/
class BandPass extends Filter {
  constructor() {
    super('bandpass');
  }
}

export default Filter;
export { LowPass, HighPass, BandPass };