import audioContext from './audioContext';
import Effect from './Effect';

/**
 * Delay is an echo effect. it processes an existing sound source,
 * and outputs a delayed version of that sound. the p5.Delay can
 * produce different effects depending on the delayTime, feedback,
 * filter, and type. in the example below, a feedback of 0.5 (the
 * default value) will produce a looping delay that decreases in
 * volume by 50% each repeat. a filter will cut out the high
 * frequencies so that the delay does nto sound as piercing as the
 * original source.
 *
 *
 * This class extends p5sound.Effect
 *
 * @class p5.Delay
 * @extends p5.Effect
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
 *   osc = new p5.Oscillator('square');
 *   osc.amp(0.5);
 *   delay = new p5.Delay();
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

    this.gain = audioContext.createGain();
    this.delay = audioContext.createDelay();

    this.input.connect(this.gain);
    this.gain.connect(this.delay);
    this.delay.connect(this.output);

    // this._split = audioContext.createChannelSplitter(2);
    // this._merge = audioContext.createChannelMerger(2);


    // this._leftGain = audioContext.createGain();
    // this._rightGain = audioContext.createGain();

    // this.leftDelay = audioContext.createDelay();
    // this.rightDelay = audioContext.createDelay();

    // graph routing
    // this.input.connect(this._split);
    // this.leftDelay.connect(this._lefttGain);
    // this.rightDelay.connect(this._rightGain);
    // this._leftGain.connect(this._merge, 0, 0);

    this._maxDelay = this.delay.delayTime.maxValue;
    this.feedback(0.5);
  }

  process(src, _delayTime, _feedback) {
    let feedback = _feedback || 0;
    let delayTime = _delayTime || 0;
    if (feedback >= 1) {
      throw new Error('Feedback value will force a positive feedback loop.');
    }
    if (delayTime >= this._maxDelay) {
      throw new Error('Delay Time exceeds maximum delay time of ' + this._maxDelay + ' second.');
    }

    src.connect(this.input);
    this.delay.delayTime.value = delayTime;
    this.gain.gain.value = feedback;
  }

  delayTime(t) {
    // if t is an audio node...
    if (typeof t !== 'number') {
      t.connect(this.delay.delayTime);
    } else {
      this.delay.delayTime.cancelScheduledValues(audioContext.currentTime);
      this.delay.delayTime.value = t;
    }
  }

  feedback(f) {
    // if f is an audio node...
    if (f && typeof f !== 'number') {
      f.connect(this.gain.gain);
    } else if (f >= 1.0) {
      throw new Error('Feedback value will force a positive feedback loop.');
    } else if (typeof f === 'number') {
      this.gain.gain.value = f;
    }
    // return value of feedback
    return this.gain.gain.value;
  }

  // setType(t) {
  //   this._split.disconnect();
  //   this._split.connect(this.leftDelay, 0);
  //   this._split.connect(this.rightDelay, 1);
  //   if (t === 0) {
  //     this._merge.output.connect(this.leftDelay, 0, 0);
  //     this._merge.output.connect(this.rightDelay, 0, 1);
  //   }
  // }

  dispose() {
    super.dispose();

    if (this.delay) {
      this.delay.disconnect();
      delete this.delay;
    }

    // this._split.disconnect();
    // this._merge.disconnect();
    // this._leftGain.disconnect();
    // this._rightGain.disconnect();
    // this.leftDelay.disconnect();
    // this.rightDelay.disconnect();

    // this._split = undefined;
    // this._merge = undefined;
    // this._leftGain = undefined;
    // this._rightGain = undefined;
    // this.leftDelay = undefined;
    // this.rightDelay = undefined;
  }
}



export default Delay;
