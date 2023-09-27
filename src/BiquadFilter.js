import audioContext from './audioContext';
import Effect from './Effect';

/**
 *  <p>A BiquadFilter uses a Web Audio Biquad Filter to filter
 *  the frequency response of an input source. Subclasses
 *  include:</p>
 *  <a href="/reference/#/LowPass"><code>LowPass</code></a>:
 *  Allows frequencies below the cutoff frequency to pass through,
 *  and attenuates frequencies above the cutoff.<br/>
 *  <a href="/reference/#/HighPass"><code>HighPass</code></a>:
 *  The opposite of a lowpass filter. <br/>
 *  <a href="/reference/#/BandPass"><code>BandPass</code></a>:
 *  Allows a range of frequencies to pass through and attenuates
 *  the frequencies below and above this frequency range.<br/>
 *
 *  The <code>.res()</code> method controls either width of the
 *  bandpass, or resonance of the low/highpass cutoff frequency.
 *
 *  This class extends <a href = "/reference/#/Effect">Effect</a>.
 *  Methods <a href = "/reference/#/Effect/amp">amp()</a>, <a href = "/reference/#/Effect/chain">chain()</a>,
 *  <a href = "/reference/#/Effect/drywet">drywet()</a>, <a href = "/reference/#/Effect/connect">connect()</a>, and
 *  <a href = "/reference/#/Effect/disconnect">disconnect()</a> are available.
 *
 *  @class BiquadFilter
 *  @extends Effect
 *  @constructor
 *  @param {String} [type] 'lowpass' (default), 'highpass', 'bandpass'
 *  @example
 *  <div><code>
 *  let fft, noise, filter;
 *
 *  function setup() {
 *    let cnv = createCanvas(100,100);
 *    cnv.mousePressed(makeNoise);
 *    fill(255, 0, 255);
 *
 *    filter = new BandPass();
 *    noise = new Noise();
 *    noise.disconnect();
 *    noise.connect(filter);
 *
 *    fft = new AnalyzerFFT();
 *  }
 *
 *  function draw() {
 *    background(220);
 *
 *    // set the BandPass frequency based on mouseX
 *    let freq = map(mouseX, 0, width, 20, 10000);
 *    freq = constrain(freq, 0, 22050);
 *    filter.freq(freq);
 *    // give the filter a narrow band (lower res = wider bandpass)
 *    filter.res(50);
 *
 *    // draw filtered spectrum
 *    let spectrum = fft.analyze();
 *    noStroke();
 *    for (let i = 0; i < spectrum.length; i++) {
 *      let x = map(i, 0, spectrum.length, 0, width);
 *      let h = -height + map(spectrum[i], 0, 255, height, 0);
 *      rect(x, height, width/spectrum.length, h);
 *    }
 *    if (!noise.started) {
 *      text('tap here and drag to change frequency', 10, 20, width - 20);
 *    } else {
 *      text('Frequency: ' + round(freq)+'Hz', 20, 20, width - 20);
 *    }
 *  }
 *
 *  function makeNoise() {
 *    // see also: `userStartAudio()`
 *    noise.start();
 *    noise.amp(0.5, 0.2);
 *  }
 *
 *  function mouseReleased() {
 *    noise.amp(0, 0.2);
 *  }
 *
 *  </code></div>
 */
class BiquadFilter extends Effect {
  constructor(type) {
    super();
    this.biquad = audioContext.createBiquadFilter();
    this.input.connect(this.biquad);
    // this.biquad.connect(this.output);
    this.biquad.connect(this.wet);

    if (type) {
      this.setType(type);
    }

    this._on = true;
    this._untoggledType = this.biquad.type;
  }

  /**
   *  Filter an audio signal according to a set
   *  of filter parameters.
   *
   *  @method  process
   *  @param {Object} src An object that outputs audio
   *  @param {Number} [freq] Frequency in Hz, from 10 to 22050
   *  @param {Number} [res] Resonance/Width of the filter frequency
   *                        from 0.001 to 1000
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  process(src, freq, res, time) {
    src.connect(this.input);
    this.set(freq, res, time);
  }

  /**
   *  Set the frequency and the resonance of the filter.
   *
   *  @method  set
   *  @param {Number} [freq] Frequency in Hz, from 10 to 22050
   *  @param {Number} [res]  Resonance (Q) from 0.001 to 1000
   *  @param {Number} [timeFromNow] schedule this event to happen
   *                                seconds from now
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  set(freq, res, time) {
    if (freq) {
      this.freq(freq, time);
    }
    if (res) {
      this.res(res, time);
    }
  }

  /**
   *  Set the filter frequency, in Hz, from 10 to 22050 (the range of
   *  human hearing, although in reality most people hear in a narrower
   *  range).
   *
   *  @method  freq
   *  @param  {Number} freq Filter Frequency
   *  @param {Number} [timeFromNow] schedule this event to happen
   *                                seconds from now
   *  @return {Number} value  Returns the current frequency value
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
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

  /**
   *  Controls either width of a bandpass frequency,
   *  or the resonance of a low/highpass cutoff frequency.
   *
   *  @method  res
   *  @param {Number} res  Resonance/Width of filter freq
   *                       from 0.001 to 1000
   *  @param {Number} [timeFromNow] schedule this event to happen
   *                                seconds from now
   *  @return {Number} value Returns the current res value
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
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

  /**
   * Controls the gain attribute of a Biquad Filter.
   * This is distinctly different from .amp() which is inherited from Effect
   * .amp() controls the volume via the output gain node
   * BiquadFilter.gain() controls the gain parameter of a Biquad Filter node.
   *
   * @method gain
   * @param  {Number} gain
   * @return {Number} Returns the current or updated gain value
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
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

  /**
   * Toggle function. Switches between the specified type and allpass
   *
   * @method toggle
   * @return {boolean} [Toggle value]
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  toggle() {
    this._on = !this._on;

    if (this._on === true) {
      this.biquad.type = this._untoggledType;
    } else if (this._on === false) {
      this.biquad.type = 'allpass';
    }

    return this._on;
  }

  /**
   *  Set the type of a BiquadFilter. Possible types include:
   *  "lowpass" (default), "highpass", "bandpass",
   *  "lowshelf", "highshelf", "peaking", "notch",
   *  "allpass".
   *
   *  @method  setType
   *  @param {String} t
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
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
 *  Constructor: <code>new LowPass()</code> BiquadFilter.
 *  This is the same as creating a BiquadFilter and then calling
 *  its method <code>setType('lowpass')</code>.
 *  See BiquadFilter for methods.
 *
 *  @class LowPass
 *  @constructor
 *  @extends BiquadFilter
 */
class LowPass extends BiquadFilter {
  constructor() {
    super('lowpass');
  }
}

/**
*  Constructor: <code>new HighPass()</code> BiquadFilter.
*  This is the same as creating a BiquadFilter and then calling
*  its method <code>setType('highpass')</code>.
*  See BiquadFilter for methods.
*
*  @class HighPass
*  @constructor
*  @extends BiquadFilter
*/
class HighPass extends BiquadFilter {
  constructor() {
    super('highpass');
  }
}

/**
*  Constructor: <code>new BandPass()</code> BiquadFilter.
*  This is the same as creating a BiquadFilter and then calling
*  its method <code>setType('bandpass')</code>.
*  See BiquadFilter for methods.
*
*  @class BandPass
*  @constructor
*  @extends BiquadFilter
*/
class BandPass extends BiquadFilter {
  constructor() {
    super('bandpass');
  }
}

export default BiquadFilter;
export { LowPass, HighPass, BandPass };