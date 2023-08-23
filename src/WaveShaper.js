// adapted from WaveShaper.js at Tone.js v0.10.0

import audioContext from './audioContext';

class WaveShaper {
  constructor(mapping, bufferLen) {
    this._shaper = this.input = this.output = audioContext.createWaveShaper();
    this._curve = null;

    if (Array.isArray(mapping)) {
      this.curve = mapping;
    } else if (isFinite(mapping) || this.isUndef(mapping)) {
      this._curve = new Float32Array(this.defaultArg(mapping, 1024));
    } else if (this.isFunction(mapping)) {
      this._curve = new Float32Array(this.defaultArg(bufferLen, 1024));
      this.setMap(mapping);
    }
  }

  get curve() {
    return this._shaper.curve;
  }

  set curve(mapping) {
    this._curve = new Float32Array(mapping);
    this._shaper.curve = this._curve;
  }

  setMap(mapping) {
    for (let i = 0, len = this._curve.length; i < len; i++) {
      let normalized = (i / (len - 1)) * 2 - 1;
      this._curve[i] = mapping(normalized, i);
    }
    this._shaper.curve = this._curve;
    return this;
  }

  /**
 * Specifies what type of oversampling (if any) should be used when
 * applying the shaping curve. Can either be "none", "2x" or "4x".
 * @memberOf WaveShaper
 * @type {string}
 * @name oversample
 */
  get oversample() {
    return this._shaper.oversample;
  }
  set oversample(oversampling) {
    if (['none', '2x', '4x'].indexOf(oversampling) !== -1) {
      this._shaper.oversample = oversampling;
    } else {
      throw new RangeError("WaveShaper: oversampling must be either 'none', '2x', or '4x'");
    }
  }

  dispose() {
    this._shaper.disconnect();
    this._shaper = null;
    this._curve = null;
  }

}

export default WaveShaper;
