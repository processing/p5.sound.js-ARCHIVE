// core
// import p5sound from './core/main';
import './constants';

// sound
import { getAudioContext } from './audioContext';
p5.prototype.getAudioContext = getAudioContext;
import './main';
import Oscillator from './p5sound.Oscillator';
p5.prototype.Oscillator  = Oscillator;
// import './p5sound.SoundFile';
// p5.prototype.SoundFile = SoundFile;

// import './init';

// module.exports = p5sound;
