import Oscillator from './Oscillator';
import audioContext from './audioContext';
import p5sound from './main';

// generate noise buffers
const _whiteNoiseBuffer = (function () {
  let bufferSize = 2 * audioContext.sampleRate;
  let whiteBuffer = audioContext.createBuffer(1,
    bufferSize,
    audioContext.sampleRate
  );
  let noiseData = whiteBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    noiseData[i] = Math.random() * 2 - 1;
  }
  whiteBuffer.type = 'white';
  return whiteBuffer;
})();

const _pinkNoiseBuffer = (function () {
  let bufferSize = 2 * audioContext.sampleRate;
  let pinkBuffer = audioContext.createBuffer(
    1,
    bufferSize,
    audioContext.sampleRate
  );
  let noiseData = pinkBuffer.getChannelData(0);
  let b0, b1, b2, b3, b4, b5, b6;
  b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    let white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.969 * b2 + white * 0.153852;
    b3 = 0.8665 * b3 + white * 0.3104856;
    b4 = 0.55 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.016898;
    noiseData[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    noiseData[i] *= 0.11; // (roughly) compensate for gain
    b6 = white * 0.115926;
  }
  pinkBuffer.type = 'pink';
  return pinkBuffer;
})();

const _brownNoiseBuffer = (function () {
  let bufferSize = 2 * audioContext.sampleRate;
  let brownBuffer = audioContext.createBuffer(
    1,
    bufferSize,
    audioContext.sampleRate
  );
  let noiseData = brownBuffer.getChannelData(0);
  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    let white = Math.random() * 2 - 1;
    noiseData[i] = (lastOut + 0.02 * white) / 1.02;
    lastOut = noiseData[i];
    noiseData[i] *= 3.5;
  }
  brownBuffer.type = 'brown';
  return brownBuffer;
})();

class Noise extends Oscillator {
  constructor(type) {
    super();
    let assignType;
    delete this.f;
    delete this.freq;
    delete this.oscillator;

    if (type === 'brown') {
      assignType = _brownNoiseBuffer;
    } else if (type === 'pink') {
      assignType = _pinkNoiseBuffer;
    } else {
      assignType = _whiteNoiseBuffer;
    }
    this.buffer = assignType;
  }
  setType(type) {
    switch (type) {
      case 'white':
        this.buffer = _whiteNoiseBuffer;
        break;
      case 'pink':
        this.buffer = _pinkNoiseBuffer;
        break;
      case 'brown':
        this.buffer = _brownNoiseBuffer;
        break;
      default:
        this.buffer = _whiteNoiseBuffer;
    }
    if (this.started) {
      let now = audioContext.currentTime;
      this.stop(now);
      this.start(now + 0.01);
    }
  }
  getType() {
    return this.buffer.type;
  }
  start() {
    if (this.started) {
      this.stop();
    }
    this.noise = audioContext.createBufferSource();
    this.noise.buffer = this.buffer;
    this.noise.loop = true;
    this.noise.connect(this.output);
    let now = audioContext.currentTime;
    this.noise.start(now);
    this.started = true;
  }

  stop() {
    let now = audioContext.currentTime;
    if (this.noise) {
      this.noise.stop(now);
      this.started = false;
    }
  }
  dispose() {
    let now = audioContext.currentTime;

    // remove reference from soundArray
    let index = p5sound.soundArray.indexOf(this);
    p5sound.soundArray.splice(index, 1);

    if (this.noise) {
      this.noise.disconnect();
      this.stop(now);
    }
    if (this.output) {
      this.output.disconnect();
    }
    if (this.panner) {
      this.panner.disconnect();
    }
    this.output = null;
    this.panner = null;
    this.buffer = null;
    this.noise = null;
  }
}

export default Noise;