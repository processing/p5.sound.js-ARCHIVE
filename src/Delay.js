import audioContext from './audioContext';
import BiquadFilter from './BiquadFilter';
import Effect from './Effect';

/**
 * Delay is an echo effect. it processes an existing sound source,
 * and outputs a delayed version of that sound. the p5.Delay can
 * produce different effects depending on the delayTime, feedback,
 * filter, and type. in the example below, a feedback of 0.5 (the
 * default value) will produce a looping delay that decreases in
 * volume by 50% each repeat.
 *
 *
 * This class extends Effect
 *
 * @class Delay
 * @extends Effect
 * @constructor
 * @example
 * <div><code>
 * let osc;
 *
 * function setup() {
 *   let cnv = createCanvas(100, 100);
 *   background(220);
 *   textAlign(CENTER);
 *   text('tap to play', width/2, height/2);
 *
 *   osc = new Oscillator('square');
 *   osc.amp(0.5);
 *   delay = new Delay();
 *
 *   // delay.process() accepts 4 parameters:
 *   // source, delaytime (in seconds), feedback, filter frequency
 *   delay.process(osc, 0.12, 0.7, 2300);
 *   cnv.mousePressed(oscStart);
 * }
 *
 * function oscStart() {
 *   osc.start();
 * }
 *
 * function mouseReleased() {
 *   osc.stop();
 * }
 * </code></div>
 */
class Delay extends Effect {
  constructor() {
    super();

    this._split = audioContext.createChannelSplitter(2);
    this._merge = audioContext.createChannelMerger(2);

    this._leftGain = audioContext.createGain();
    this._rightGain = audioContext.createGain();

    /**
     *  The p5.Delay is built with two
     *  <a href="http://www.w3.org/TR/webaudio/#DelayNode">
     *  Web Audio Delay Nodes</a>, one for each stereo channel.
     *
     *  @for p5.Delay
     *  @property {DelayNode} leftDelay
     */
    this.leftDelay = audioContext.createDelay();

    /**
     *  The p5.Delay is built with two
     *  <a href="http://www.w3.org/TR/webaudio/#DelayNode">
     *  Web Audio Delay Nodes</a>, one for each stereo channel.
     *  @for p5.Delay
     *  @property {DelayNode} rightDelay
     */
    this.rightDelay = audioContext.createDelay();

    this._leftBiquadFilter = new BiquadFilter();
    this._rightBiquadFilter = new BiquadFilter();
    this._leftBiquadFilter.disconnect();
    this._rightBiquadFilter.disconnect();

    this._leftBiquadFilter.biquad.frequency.setValueAtTime(
      1200, audioContext.currentTime);
    this._rightBiquadFilter.biquad.frequency.setValueAtTime(
      1200,
      audioContext.currentTime
    );
    this._leftBiquadFilter.biquad.Q.setValueAtTime(
      0.3, audioContext.currentTime);
    this._rightBiquadFilter.biquad.Q.setValueAtTime(
      0.3, audioContext.currentTime);

    // graph routing
    this.input.connect(this._split);
    this.leftDelay.connect(this._leftGain);
    this.rightDelay.connect(this._rightGain);
    this._leftGain.connect(this._leftBiquadFilter.input);
    this._rightGain.connect(this._rightBiquadFilter.input);
    this._merge.connect(this.wet);

    this._leftBiquadFilter.biquad.gain.setValueAtTime(
      1, audioContext.currentTime);
    this._rightBiquadFilter.biquad.gain.setValueAtTime(
      1, audioContext.currentTime);

    // default routing
    this.setType(0);

    this._maxDelay = this.leftDelay.delayTime.maxValue;

    this.feedback(0.5);
  }

  process(src, _delayTime, _feedback, _filter) {
    let feedback = _feedback || 0;
    let delayTime = _delayTime || 0;
    if (feedback >= 1) {
      throw new Error('Feedback value will force a positive feedback loop.');
    }
    if (delayTime >= this._maxDelay) {
      throw new Error('Delay Time exceeds maximum delay time of ' + this._maxDelay + ' second.');
    }

    src.connect(this.input);
    this.leftDelay.delayTime.value = delayTime;
    this.rightDelay.delayTime.value = delayTime;
    this._leftGain.gain.value = feedback;
    this._rightGain.gain.value = feedback;

    if (_filter) {
      this._leftBiquadFilter.freq(_filter);
      this._rightBiquadFilter.freq(_filter);
    }
  }

  /**
   *  Set the delay (echo) time, in seconds. Usually this value will be
   *  a floating point number between 0.0 and 1.0.
   *
   *  @method  delayTime
   *  @for p5.Delay
   *  @param {Number} delayTime Time (in seconds) of the delay
   */
  delayTime(t) {
    // if t is an audio node...
    if (typeof t !== 'number') {
      t.connect(this.leftDelay.delayTime);
      t.connect(this.rightDelay.delayTime);
    } else {
      this.leftDelay.delayTime.cancelScheduledValues(audioContext.currentTime);
      this.rightDelay.delayTime.cancelScheduledValues(audioContext.currentTime);
      this.leftDelay.delayTime.linearRampToValueAtTime(
        t, audioContext.currentTime);
      this.rightDelay.delayTime.linearRampToValueAtTime(
        t, audioContext.currentTime);
    }
  }

  /**
   *  Feedback occurs when Delay sends its signal back through its input
   *  in a loop. The feedback amount determines how much signal to send each
   *  time through the loop. A feedback greater than 1.0 is not desirable because
   *  it will increase the overall output each time through the loop,
   *  creating an infinite feedback loop. The default value is 0.5
   *
   *  @method  feedback
   *  @for Delay
   *  @param {Number|Object} feedback 0.0 to 1.0, or an object such as an
   *                                  Oscillator that can be used to
   *                                  modulate this param
   *  @returns {Number} Feedback value
   *
   */
  feedback(f) {
    // if f is an audio node...
    if (f && typeof f !== 'number') {
      f.connect(this._leftGain.gain);
      f.connect(this._rightGain.gain);
    } else if (f >= 1.0) {
      throw new Error('Feedback value will force a positive feedback loop.');
    } else if (typeof f === 'number') {
      this._leftGain.gain.value = f;
      this._rightGain.gain.value = f;
    }
    // return value of feedback
    return this._leftGain.gain.value;
  }

  /**
   *  Set a lowpass filter frequency for the delay. A lowpass filter
   *  will cut off any frequencies higher than the filter frequency.
   *
   *  @method  filter
   *  @for Delay
   *  @param {Number|Object} cutoffFreq  A lowpass filter will cut off any
   *                              frequencies higher than the filter frequency.
   *  @param {Number|Object} res  Resonance of the filter frequency
   *                              cutoff, or an object (i.e. a p5.Oscillator)
   *                              that can be used to modulate this parameter.
   *                              High numbers (i.e. 15) will produce a resonance,
   *                              low numbers (i.e. .2) will produce a slope.
   */
  filter(freq, q) {
    this._leftBiquadFilter.set(freq, q);
    this._rightBiquadFilter.set(freq, q);
  }

  /**
   *  Choose a preset type of delay. 'pingPong' bounces the signal
   *  from the left to the right channel to produce a stereo effect.
   *  Any other parameter will revert to the default delay setting.
   *
   *  @method  setType
   *  @for p5.Delay
   *  @param {String|Number} type 'pingPong' (1) or 'default' (0)
   */
  setType(t) {
    if (t === 1) {
      t = 'pingPong';
    }
    this._split.disconnect();
    this._leftBiquadFilter.disconnect();
    this._rightBiquadFilter.disconnect();
    this._split.connect(this.leftDelay, 0);
    this._split.connect(this.rightDelay, 1);
    switch (t) {
      case 'pingPong':
        this._rightBiquadFilter.setType(this._leftBiquadFilter.biquad.type);
        this._leftBiquadFilter.output.connect(this._merge, 0, 0);
        this._rightBiquadFilter.output.connect(this._merge, 0, 1);
        this._leftBiquadFilter.output.connect(this.rightDelay);
        this._rightBiquadFilter.output.connect(this.leftDelay);
        break;
      default:
        this._leftBiquadFilter.output.connect(this._merge, 0, 0);
        this._rightBiquadFilter.output.connect(this._merge, 0, 1);
        this._leftBiquadFilter.output.connect(this.leftDelay);
        this._rightBiquadFilter.output.connect(this.rightDelay);
    }
  }

  // DocBlocks for methods inherited from p5.Effect
  /**
   *  Set the output level of the delay effect.
   *
   *  @method  amp
   *  @for Delay
   *  @param  {Number} volume amplitude between 0 and 1.0
   *  @param {Number} [rampTime] create a fade that lasts rampTime
   *  @param {Number} [timeFromNow] schedule this event to happen
   *                                seconds from now
   */
  /**
   *  Send output to a p5.sound or web audio object
   *
   *  @method  connect
   *  @for Delay
   *  @param  {Object} unit
   */
  /**
   *  Disconnect all output.
   *
   *  @method disconnect
   *  @for Delay
   */

  dispose() {
    super.dispose();

    this._split.disconnect();
    this._leftBiquadFilter.dispose();
    this._rightBiquadFilter.dispose();
    this._merge.disconnect();
    this._leftGain.disconnect();
    this._rightGain.disconnect();
    this.leftDelay.disconnect();
    this.rightDelay.disconnect();

    this._split = undefined;
    this._leftBiquadFilter = undefined;
    this._rightBiquadFilter = undefined;
    this._merge = undefined;
    this._leftGain = undefined;
    this._rightGain = undefined;
    this.leftDelay = undefined;
    this.rightDelay = undefined;
  }
}

export default Delay;
