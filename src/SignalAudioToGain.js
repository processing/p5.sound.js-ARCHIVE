// https://github.com/Tonejs/Tone.js/blob/r10/Tone/signal/AudioToGain.js

// import Signal from './Signal';
// import SignalWaveShaper from './SignalWaveShaper';


/**
*  @class AudioToGain converts an input in AudioRange [-1,1] to NormalRange [0,1].
*         See SignalGainToAudio.
*
*  @extends {SignalBase}
*  @constructor
*  @example
*  let a2g = new SignalAudioToGain();
*/
class SignalAudioToGain {
  /**
  *  @type {WaveShaperNode}
  *  @private
  */
  constructor() {

    this._norm = this.input = this.output = new SignalWaveShaper(function(x){
      return (x + 1) / 2;
    });
  }

  /**
*  clean up
*  @returns {SignalAudioToGain} this
*/
  dispose(){
    dispose.call(this);
    this._norm.dispose();
    this._norm = null;
    return this;
  }

}

export default SignalAudioToGain;
