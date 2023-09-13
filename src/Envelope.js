import { AmplitudeEnvelope as ToneEnvelope } from 'tone';

class Envelope {
  constructor() {
    this.envelope = new ToneEnvelope({
      attack: 0.1,
      decay: 0.2,
      sustain: 0.5,
      release: 0.8
    });
  }

  play(unit, secondsFromNow, susTime) {
    // let tFromNow = secondsFromNow || 0;

    if (unit) {
      if (this.connection !== unit) {
        this.connect(unit);
      }
    }
  }
}

export default Envelope;