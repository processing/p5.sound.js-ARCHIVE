import Effect from './p5sound.Effect';

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
 * This class extends p5.Effect.
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

    this._split = this.audioContext.createChannelSplitter(2);
    this._merge = this.audioContext.createChannelMerger(2);

    this._leftGain = this.audioContext.createGain();
    this._rightGain = this.audioContext.createGain();

    this.leftDelay = this.audioContext.createDelay();
    this.rightDelay = this.audioContext.createDelay();

    // graph routing
    this.input.connect(this._split);
    this.leftDelay.connect(this._lefttGain);
    this.rightDelay.connect(this._rightGain);
    this._leftGain.connect(this._merge, 0, 0);
  }

  dipose() {
    super.dispose();

    this._split.disconnect();
    this._merge.disconnect();
    this._leftGain.disconnect();
    this._rightGain.disconnect();
    this.leftDelay.disconnect();
    this.rightDelay.disconnect();

    this._split = undefined;
    this._merge = undefined;
    this._leftGain = undefined;
    this._rightGain = undefined;
    this.leftDelay = undefined;
    this.rightDelay = undefined;
  }
}



export default Delay;
