import audioContext from './audioContext';
import p5sound from './main';

class Envelope {
  constructor(t1, l1, t2, l2, t3, l3) {
    /**
     * Time until envelope reaches attackLevel
     * @property attackTime
     */
    this.aTime = t1 || 0.1;
    /**
     * Level once attack is complete.
     * @property attackLevel
     */
    this.aLevel = l1 || 1;
    /**
     * Time until envelope reaches decayLevel.
     * @property decayTime
     */
    this.dTime = t2 || 0.5;
    /**
     * Level after decay. The envelope will sustain here until it is released.
     * @property decayLevel
     */
    this.dLevel = l2 || 0;
    /**
     * Duration of the release portion of the envelope.
     * @property releaseTime
     */
    this.rTime = t3 || 0;
    /**
     * Level at the end of the release.
     * @property releaseLevel
     */
    this.rLevel = l3 || 0;

    this._rampHighPercentage = 0.98;

    this._rampLowPercentage = 0.02;

    this.output = audioContext.createGain();

    this.control = new TimelineSignal();

    this._init(); // this makes sure the envelope starts at zero

    this.control.connect(this.output); // connect to the output

    this.connection = null; // store connection

    //array of math operation signal chaining
    this.mathOps = [this.control];

    //whether envelope should be linear or exponential curve
    this.isExponential = false;

    // oscillator or buffer source to clear on env complete
    // to save resources if/when it is retriggered
    this.sourceToClear = null;

    // set to true if attack is set, then false on release
    this.wasTriggered = false;

    // add to the soundArray so we can dispose of the env later
    p5sound.soundArray.push(this);
  }

  /**
   *  Set values like a traditional
   *  <a href="https://en.wikipedia.org/wiki/Synthesizer#/media/File:ADSR_parameter.svg">
   *  ADSR envelope
   *  </a>.
   *
   *  @method  setADSR
   *  @for p5.Envelope
   *  @param {Number} attackTime    Time (in seconds before envelope
   *                                reaches Attack Level
   *  @param {Number} [decayTime]    Time (in seconds) before envelope
   *                                reaches Decay/Sustain Level
   *  @param {Number} [susRatio]    Ratio between attackLevel and releaseLevel, on a scale from 0 to 1,
   *                                where 1.0 = attackLevel, 0.0 = releaseLevel.
   *                                The susRatio determines the decayLevel and the level at which the
   *                                sustain portion of the envelope will sustain.
   *                                For example, if attackLevel is 0.4, releaseLevel is 0,
   *                                and susAmt is 0.5, the decayLevel would be 0.2. If attackLevel is
   *                                increased to 1.0 (using <code>setRange</code>),
   *                                then decayLevel would increase proportionally, to become 0.5.
   *  @param {Number} [releaseTime]   Time in seconds from now (defaults to 0)
   *  @example
   *  <div><code>
   *  let attackLevel = 1.0;
   *  let releaseLevel = 0;
   *
   *  let attackTime = 0.001;
   *  let decayTime = 0.2;
   *  let susPercent = 0.2;
   *  let releaseTime = 0.5;
   *
   *  let env, triOsc;
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(playEnv);
   *
   *    env = new p5.Envelope();
   *    triOsc = new p5.Oscillator('triangle');
   *    triOsc.amp(env);
   *    triOsc.freq(220);
   *  }
   *
   *  function draw() {
   *    background(220);
   *    text('tap here to play', 5, 20);
   *    attackTime = map(mouseX, 0, width, 0, 1.0);
   *    text('attack time: ' + attackTime, 5, height - 40);
   *  }
   *
   *  function playEnv() {
   *    triOsc.start();
   *    env.setADSR(attackTime, decayTime, susPercent, releaseTime);
   *    env.play();
   *  }
   *  </code></div>
   */
  setADSR(aTime, dTime, sPercent, rTime) {
    this.aTime = aTime;
    this.dTime = dTime || 0;

    // lerp
    this.sPercent = sPercent || 0;
    this.dLevel =
      typeof sPercent !== 'undefined'
        ? sPercent * (this.aLevel - this.rLevel) + this.rLevel
        : 0;

    this.rTime = rTime || 0;

    // also set time constants for ramp
    this._setRampAD(aTime, dTime);
  }

  /**
   *  Set max (attackLevel) and min (releaseLevel) of envelope.
   *
   *  @method  setRange
   *  @for p5.Envelope
   *  @param {Number} aLevel attack level (defaults to 1)
   *  @param {Number} rLevel release level (defaults to 0)
   *  @example
   *  <div><code>
   *  let attackLevel = 1.0;
   *  let releaseLevel = 0;
   *
   *  let attackTime = 0.001;
   *  let decayTime = 0.2;
   *  let susPercent = 0.2;
   *  let releaseTime = 0.5;
   *
   *  let env, triOsc;
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(playEnv);
   *
   *    env = new p5.Envelope();
   *    triOsc = new p5.Oscillator('triangle');
   *    triOsc.amp(env);
   *    triOsc.freq(220);
   *  }
   *
   *  function draw() {
   *    background(220);
   *    text('tap here to play', 5, 20);
   *    attackLevel = map(mouseY, height, 0, 0, 1.0);
   *    text('attack level: ' + attackLevel, 5, height - 20);
   *  }
   *
   *  function playEnv() {
   *    triOsc.start();
   *    env.setRange(attackLevel, releaseLevel);
   *    env.play();
   *  }
   *  </code></div>
   */
  setRange(aLevel, rLevel) {
    this.aLevel = aLevel || 1;
    this.rLevel = rLevel || 0;

    // not sure if this belongs here:

    // {Number} [dLevel] decay/sustain level (optional)
    // if (typeof(dLevel) !== 'undefined') {
    //   this.dLevel = dLevel
    // } else if (this.sPercent) {
    //   this.dLevel = this.sPercent ? this.sPercent * (this.aLevel - this.rLevel) + this.rLevel : 0;
    // }
  }

  //  private (undocumented) method called when ADSR is set to set time constants for ramp
  //
  //  Set the <a href="https://en.wikipedia.org/wiki/RC_time_constant">
  //  time constants</a> for simple exponential ramps.
  //  The larger the time constant value, the slower the
  //  transition will be.
  //
  //  method  _setRampAD
  //  param {Number} attackTimeConstant  attack time constant
  //  param {Number} decayTimeConstant   decay time constant
  //
  _setRampAD(t1, t2) {
    this._rampAttackTime = this.checkExpInput(t1);
    this._rampDecayTime = this.checkExpInput(t2);

    let TCDenominator = 1.0;
    /// Aatish Bhatia's calculation for time constant for rise(to adjust 1/1-e calculation to any percentage)
    TCDenominator = Math.log(
      1.0 / this.checkExpInput(1.0 - this._rampHighPercentage)
    );
    this._rampAttackTC = t1 / this.checkExpInput(TCDenominator);
    TCDenominator = Math.log(1.0 / this._rampLowPercentage);
    this._rampDecayTC = t2 / this.checkExpInput(TCDenominator);
  }

  /**
   *  <p>Play tells the envelope to start acting on a given input.
   *  If the input is a p5.sound object (i.e. AudioIn, Oscillator,
   *  SoundFile), then Envelope will control its output volume.
   *  Envelopes can also be used to control any <a href="
   *  http://docs.webplatform.org/wiki/apis/webaudio/AudioParam">
   *  Web Audio Audio Param.</a></p>
   *
   *  @method  play
   *  @for p5.Envelope
   *  @param  {Object} unit         A p5.sound object or
   *                                Web Audio Param.
   *  @param  {Number} [startTime]  time from now (in seconds) at which to play
   *  @param  {Number} [sustainTime] time to sustain before releasing the envelope
   *  @example
   *  <div><code>
   *  let attackLevel = 1.0;
   *  let releaseLevel = 0;
   *
   *  let attackTime = 0.001;
   *  let decayTime = 0.2;
   *  let susPercent = 0.2;
   *  let releaseTime = 0.5;
   *
   *  let env, triOsc;
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(playEnv);
   *
   *    env = new p5.Envelope();
   *    triOsc = new p5.Oscillator('triangle');
   *    triOsc.amp(env);
   *    triOsc.freq(220);
   *    triOsc.start();
   *  }
   *
   *  function draw() {
   *    background(220);
   *    text('tap here to play', 5, 20);
   *    attackTime = map(mouseX, 0, width, 0, 1.0);
   *    attackLevel = map(mouseY, height, 0, 0, 1.0);
   *    text('attack time: ' + attackTime, 5, height - 40);
   *    text('attack level: ' + attackLevel, 5, height - 20);
   *  }
   *
   *  function playEnv() {
   *    // ensure that audio is enabled
   *    userStartAudio();
   *
   *    env.setADSR(attackTime, decayTime, susPercent, releaseTime);
   *    env.setRange(attackLevel, releaseLevel);
   *    env.play();
   *  }
   *  </code></div>
   */
  play(unit, secondsFromNow, susTime) {
    let tFromNow = secondsFromNow || 0;

    if (unit) {
      if (this.connection !== unit) {
        this.connect(unit);
      }
    }

    this.triggerAttack(unit, tFromNow);

    this.triggerRelease(unit, tFromNow + this.aTime + this.dTime + ~~susTime);
  }

  //helper method to protect against zero values being sent to exponential functions
  checkExpInput(value) {
    if (value <= 0) {
      value = 0.00000001;
    }
    return value;
  }

  /**
   *  Trigger the Attack, and Decay portion of the Envelope.
   *  Similar to holding down a key on a piano, but it will
   *  hold the sustain level until you let go. Input can be
   *  any p5.sound object, or a <a href="
   *  http://docs.webplatform.org/wiki/apis/webaudio/AudioParam">
   *  Web Audio Param</a>.
   *
   *  @method  triggerAttack
   *  @for p5.Envelope
   *  @param  {Object} unit p5.sound Object or Web Audio Param
   *  @param  {Number} secondsFromNow time from now (in seconds)
   *  @example
   *  <div><code>
   *  let attackTime = 0.001;
   *  let decayTime = 0.2;
   *  let susPercent = 0.3;
   *  let releaseTime = 0.4;
   *  let env, triOsc;
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    background(220);
   *    textAlign(CENTER);
   *    textSize(10);
   *    text('tap to triggerAttack', width/2, height/2);
   *
   *    env = new p5.Envelope();
   *    env.setADSR(attackTime, decayTime, susPercent, releaseTime);
   *    env.setRange(1.0, 0.0);
   *    triOsc = new p5.Oscillator('triangle');
   *    triOsc.freq(220);
   *
   *    cnv.mousePressed(envAttack);
   *  }
   *
   *  function envAttack()  {
   *    background(0, 255, 255);
   *    text('release to release', width/2, height/2);
   *
   *    // ensures audio is enabled. See also: `userStartAudio`
   *    triOsc.start();
   *
   *    env.triggerAttack(triOsc);
   *  }
   *
   *  function mouseReleased() {
   *    background(220);
   *    text('tap to triggerAttack', width/2, height/2);
   *
   *    env.triggerRelease(triOsc);
   *  }
   *  </code></div>
   */
  triggerAttack(unit, secondsFromNow) {
    let now = audioContext.currentTime;
    let tFromNow = secondsFromNow || 0;
    let t = now + tFromNow;
    this.lastAttack = t;
    this.wasTriggered = true;

    if (unit) {
      if (this.connection !== unit) {
        this.connect(unit);
      }
    }

    // get and set value (with linear ramp) to anchor automation
    let valToSet = this.control.getValueAtTime(t);

    if (this.isExponential === true) {
      this.control.exponentialRampToValueAtTime(
        this.checkExpInput(valToSet),
        t
      );
    } else {
      this.control.linearRampToValueAtTime(valToSet, t);
    }

    // after each ramp completes, cancel scheduled values
    // (so they can be overridden in case env has been re-triggered)
    // then, set current value (with linearRamp to avoid click)
    // then, schedule the next automation...

    // attack
    t += this.aTime;
    if (this.isExponential === true) {
      this.control.exponentialRampToValueAtTime(
        this.checkExpInput(this.aLevel),
        t
      );
      valToSet = this.checkExpInput(this.control.getValueAtTime(t));
      this.control.cancelScheduledValues(t);
      this.control.exponentialRampToValueAtTime(valToSet, t);
    } else {
      this.control.linearRampToValueAtTime(this.aLevel, t);
      valToSet = this.control.getValueAtTime(t);
      this.control.cancelScheduledValues(t);
      this.control.linearRampToValueAtTime(valToSet, t);
    }

    // decay to decay level (if using ADSR, then decay level == sustain level)
    t += this.dTime;
    if (this.isExponential === true) {
      this.control.exponentialRampToValueAtTime(
        this.checkExpInput(this.dLevel),
        t
      );
      valToSet = this.checkExpInput(this.control.getValueAtTime(t));
      this.control.cancelScheduledValues(t);
      this.control.exponentialRampToValueAtTime(valToSet, t);
    } else {
      this.control.linearRampToValueAtTime(this.dLevel, t);
      valToSet = this.control.getValueAtTime(t);
      this.control.cancelScheduledValues(t);
      this.control.linearRampToValueAtTime(valToSet, t);
    }
  }

  /**
   *  Trigger the Release of the Envelope. This is similar to releasing
   *  the key on a piano and letting the sound fade according to the
   *  release level and release time.
   *
   *  @method  triggerRelease
   *  @for p5.Envelope
   *  @param  {Object} unit p5.sound Object or Web Audio Param
   *  @param  {Number} secondsFromNow time to trigger the release
   *  @example
   *  <div><code>
   *  let attackTime = 0.001;
   *  let decayTime = 0.2;
   *  let susPercent = 0.3;
   *  let releaseTime = 0.4;
   *  let env, triOsc;
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    background(220);
   *    textAlign(CENTER);
   *    textSize(10);
   *    text('tap to triggerAttack', width/2, height/2);
   *
   *    env = new p5.Envelope();
   *    env.setADSR(attackTime, decayTime, susPercent, releaseTime);
   *    env.setRange(1.0, 0.0);
   *    triOsc = new p5.Oscillator('triangle');
   *    triOsc.freq(220);
   *
   *    cnv.mousePressed(envAttack);
   *  }
   *
   *  function envAttack()  {
   *    background(0, 255, 255);
   *    text('release to release', width/2, height/2);
   *
   *    // ensures audio is enabled. See also: `userStartAudio`
   *    triOsc.start();
   *
   *    env.triggerAttack(triOsc);
   *  }
   *
   *  function mouseReleased() {
   *    background(220);
   *    text('tap to triggerAttack', width/2, height/2);
   *
   *    env.triggerRelease(triOsc);
   *  }
   *  </code></div>
   */
  triggerRelease(unit, secondsFromNow) {
    // only trigger a release if an attack was triggered
    if (!this.wasTriggered) {
      // this currently causes a bit of trouble:
      // if a later release has been scheduled (via the play function)
      // a new earlier release won't interrupt it, because
      // this.wasTriggered has already been set to false.
      // If we want new earlier releases to override, then we need to
      // keep track of the last release time, and if the new release time is
      // earlier, then use it.
      return;
    }

    let now = audioContext.currentTime;
    let tFromNow = secondsFromNow || 0;
    let t = now + tFromNow;

    if (unit) {
      if (this.connection !== unit) {
        this.connect(unit);
      }
    }

    // get and set value (with linear or exponential ramp) to anchor automation
    let valToSet = this.control.getValueAtTime(t);

    if (this.isExponential === true) {
      this.control.exponentialRampToValueAtTime(
        this.checkExpInput(valToSet),
        t
      );
    } else {
      this.control.linearRampToValueAtTime(valToSet, t);
    }

    // release
    t += this.rTime;

    if (this.isExponential === true) {
      this.control.exponentialRampToValueAtTime(
        this.checkExpInput(this.rLevel),
        t
      );
      valToSet = this.checkExpInput(this.control.getValueAtTime(t));
      this.control.cancelScheduledValues(t);
      this.control.exponentialRampToValueAtTime(valToSet, t);
    } else {
      this.control.linearRampToValueAtTime(this.rLevel, t);
      valToSet = this.control.getValueAtTime(t);
      this.control.cancelScheduledValues(t);
      this.control.linearRampToValueAtTime(valToSet, t);
    }

    this.wasTriggered = false;
  }

  /**
   *  Exponentially ramp to a value using the first two
   *  values from <code><a href="#/p5.Envelope/setADSR">setADSR(attackTime, decayTime)</a></code>
   *  as <a href="https://en.wikipedia.org/wiki/RC_time_constant">
   *  time constants</a> for simple exponential ramps.
   *  If the value is higher than current value, it uses attackTime,
   *  while a decrease uses decayTime.
   *
   *  @method  ramp
   *  @for p5.Envelope
   *  @param  {Object} unit           p5.sound Object or Web Audio Param
   *  @param  {Number} secondsFromNow When to trigger the ramp
   *  @param  {Number} v              Target value
   *  @param  {Number} [v2]           Second target value
   *  @example
   *  <div><code>
   *  let env, osc, amp;
   *
   *  let attackTime = 0.001;
   *  let decayTime = 0.2;
   *  let attackLevel = 1;
   *  let decayLevel = 0;
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    fill(0,255,0);
   *    noStroke();
   *
   *    env = new p5.Envelope();
   *    env.setADSR(attackTime, decayTime);
   *    osc = new p5.Oscillator();
   *    osc.amp(env);
   *    amp = new p5.Amplitude();
   *
   *    cnv.mousePressed(triggerRamp);
   *  }
   *
   *  function triggerRamp() {
   *    // ensures audio is enabled. See also: `userStartAudio`
   *    osc.start();
   *
   *    env.ramp(osc, 0, attackLevel, decayLevel);
   *  }
   *
   *  function draw() {
   *    background(20);
   *    text('tap to play', 10, 20);
   *    let h = map(amp.getLevel(), 0, 0.4, 0, height);;
   *    rect(0, height, width, -h);
   *  }
   *  </code></div>
   */
  ramp(unit, secondsFromNow, v1, v2) {
    let now = audioContext.currentTime;
    let tFromNow = secondsFromNow || 0;
    let t = now + tFromNow;
    let destination1 = this.checkExpInput(v1);
    let destination2 =
      typeof v2 !== 'undefined' ? this.checkExpInput(v2) : undefined;

    // connect env to unit if not already connected
    if (unit) {
      if (this.connection !== unit) {
        this.connect(unit);
      }
    }

    //get current value
    let currentVal = this.checkExpInput(this.control.getValueAtTime(t));
    // this.control.cancelScheduledValues(t);

    //if it's going up
    if (destination1 > currentVal) {
      this.control.setTargetAtTime(destination1, t, this._rampAttackTC);
      t += this._rampAttackTime;
    }

    //if it's going down
    else if (destination1 < currentVal) {
      this.control.setTargetAtTime(destination1, t, this._rampDecayTC);
      t += this._rampDecayTime;
    }

    // Now the second part of envelope begins
    if (destination2 === undefined) return;

    //if it's going up
    if (destination2 > destination1) {
      this.control.setTargetAtTime(destination2, t, this._rampAttackTC);
    }

    //if it's going down
    else if (destination2 < destination1) {
      this.control.setTargetAtTime(destination2, t, this._rampDecayTC);
    }
  }

  connect(unit) {
    this.connection = unit;

    // assume we're talking about output gain
    // unless given a different audio param
    if (
      unit instanceof Oscillator ||
      unit instanceof p5.SoundFile ||
      unit instanceof p5.AudioIn ||
      unit instanceof p5.Reverb ||
      unit instanceof p5.Noise ||
      unit instanceof p5.Filter ||
      unit instanceof p5.Delay
    ) {
      unit = unit.output.gain;
    }
    if (unit instanceof AudioParam) {
      //set the initial value
      unit.setValueAtTime(0, audioContext.currentTime);
    }

    this.output.connect(unit);
    if (unit && unit._onNewInput) {
      unit._onNewInput(this);
    }
  }

  disconnect() {
    if (this.output) {
      this.output.disconnect();
    }
  }

  _init() {
    let now = audioContext.currentTime;
    let t = now;
    this.control.setTargetAtTime(0.00001, t, 0.001);
    //also, compute the correct time constants
    this._setRampAD(this.aTime, this.dTime);
  }

  dispose() {
    let index = p5sound.soundArray.indefOf(this);
    p5sound.soundArray.splice(index, 1);

    this.disconnect();
  }


}

export default Envelope;