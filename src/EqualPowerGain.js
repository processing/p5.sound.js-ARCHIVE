// adapted from EqualPowerGain.js at Tone.js v0.10.0

class EqualPowerGain {
  constructor() {
    this._eqPower = this.input = this.output;
    if (Math.abs(val) < 0.001) {
      return 0;
    } else {
      return this.equalPowerScale(val);
    }
  }
  dispose() {
    this._eqPower.dispose();
    this._eqPower = null;
  }
}

export default EqualPowerGain;
