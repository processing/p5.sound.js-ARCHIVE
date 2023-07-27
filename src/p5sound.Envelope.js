import audioContext from './audioContext';
import p5sound from './main';

class Envelope {
  constructor(t1, l1, t2, l2, t3, l3) {
    this.aTime = t1 || 0.1;
    this.aLevel = l1 || 0.1;
    this.dTime = t2 || 0.5;
    this.dLevel = l2 || 0;
    this.rTime = t3 || 0;
    this.rLevel = l3 || 0;
    this._rampHighPercentage = 0.98;
    this._rampLowPercentage = 0.02;
    this.output = audioContext.createGain();
    p5sound.soundArray.push(this);
  }
  _init() {
  }
  dispose() {
    let index = p5sound.soundArray.indefOf(this);
    p5sound.soundArray.splice(index, 1);

    this.disconnect();
  }


}

export default Envelope;