// core
import p5sound from './core/main';
import './core/constants';

// sound
import { getAudioContext } from './sound/audioContext';
p5.prototype.getAudioContext = getAudioContext;
import './sound/main';
import Oscillator from './sound/p5sound.Oscillator';
p5.prototype.Oscillator  = Oscillator;
// import './sound/p5sound.SoundFile';
// p5.prototype.SoundFile = SoundFile;

import './core/init';

module.exports = p5sound;
