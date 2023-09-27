
import audioContext from './audioContext.js';
import Effect from './Effect.js';
// import p5sound from './main';

let panner;

// Stereo panner
// if there is a stereo panner node use it
if (typeof audioContext.createStereoPanner !== 'undefined') {
  /**
   * The Panner class allows you to control the stereo
   * panning of a sound source. It uses the [StereoPannerNode](https://developer.mozilla.org/en-US/docs/Web/API/StereoPannerNode),
   * which allows you to adjust the balance between the left and right channels of a sound source.
   *
   * This class extends <a href = "/reference/#/Effect">Effect</a>.
   * Methods <a href = "/reference/#/Effect/amp">amp()</a>, <a href = "/reference/#/Effect/chain">chain()</a>,
   * <a href = "/reference/#/Effect/drywet">drywet()</a>, <a href = "/reference/#/Effect/connect">connect()</a>, and
   * <a href = "/reference/#/Effect/disconnect">disconnect()</a> are available.
   *
   * @class Panner
   * @extends Effect
   */
  class Panner extends Effect {
    constructor() {
      super();
      this.stereoPanner = audioContext.createStereoPanner();

      this.input.connect(this.stereoPanner);
      this.stereoPanner.connect(this.wet);
    }

    /**
     * Set the stereo pan position, a value of -1 means the sound will be fully panned
     * to the left, a value of 0 means the sound will be centered, and a value of 1 means
     * the sound will be fully panned to the right.
     * @method pan
     * @for Panner
     * @param {Number} value  A value between -1 and 1 that sets the pan position.
     *
     * @param {Number} [time] time in seconds that it will take for the panning to change to the specified value.
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
     */
    pan(val, tFromNow) {
      if (typeof val === 'number') {
        let time = tFromNow || 0;
        this.stereoPanner.pan.linearRampToValueAtTime(
          val,
          audioContext.currentTime + time
        );
      } else if (typeof val !== 'undefined') {
        val.connect(this.stereoPanner.pan);
      }
    }

    /**
     *  Return the current panning value.
     *
     *  @method  getPan
     *  @for Panner
     *  @return {Number} current panning value, number between -1 (left) and 1 (right).
     *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
     */
    getPan() {
      return this.stereoPanner.pan.value;
    }

    /**
     *  Get rid of the Panner and free up its resources / memory.
     *
     *  @method  dispose
     *  @for Panner
        *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
     */
    dispose() {
      super.dispose();
      if (this.stereoPanner) {
        this.stereoPanner.disconnect();
        delete this.stereoPanner;
      }
    }
  }

  panner = Panner;
} else {
  // if there is no createStereoPanner object
  // such as in safari 7.1.7 at the time of writing this
  // use this method to create the effect
  class Panner extends Effect {
    constructor() {
      super();

      // 'explicit' channelCountMode will convert any number of channels to stereo
      this.input.channelCountMode = 'explicit';

      this.panValue = 0;
      this.left = audioContext.createGain();
      this.right = audioContext.createGain();
      this.left.channelInterpretation = 'discrete';
      this.right.channelInterpretation = 'discrete';

      this.splitter = audioContext.createChannelSplitter(2);
      this.merger = audioContext.createChannelMerger(2);

      this.input.connect(this.splitter);

      this.splitter.connect(this.left, 1);
      this.splitter.connect(this.right, 0);

      this.left.connect(this.merger, 0, 1);
      this.right.connect(this.merger, 0, 0);

      this.merger.connect(this.wet);
    }

    // -1 is left, +1 is right
    pan(val, tFromNow) {
      this.panValue = val;
      let time = tFromNow || 0;
      let t = audioContext.currentTime + time;
      let v = (val + 1) / 2;
      let rightVal = Math.cos((v * Math.PI) / 2);
      let leftVal = Math.sin((v * Math.PI) / 2);
      this.left.gain.linearRampToValueAtTime(leftVal, t);
      this.right.gain.linearRampToValueAtTime(rightVal, t);
    }

    getPan() {
      return this.panValue;
    }

    dispose() {
      super.dispose();
      if (this.left) {
        this.left.disconnect();
        delete this.left;
      }
      if (this.right) {
        this.right.disconnect();
        delete this.right;
      }
      if (this.splitter) {
        this.splitter.disconnect();
        delete this.splitter;
      }
      if (this.merger) {
        this.merger.disconnect();
        delete this.merger;
      }
    }
  }
  panner = Panner;
}

export default panner;
