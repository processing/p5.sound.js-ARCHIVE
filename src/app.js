// core
// import p5sound from './core/main';
import './constants';

// sound
import './shims';
import { getAudioContext } from './audioContext';
p5.prototype.getAudioContext = getAudioContext;
import './main';
import Oscillator from './p5sound.Oscillator';
p5.prototype.Oscillator  = Oscillator;
import SoundFile from './p5sound.SoundFile';
p5.prototype.SoundFile = SoundFile;

// helpers
import { _checkFileFormats } from './helpers';
p5.prototype._checkFileFormats = _checkFileFormats;

// import './init';

// module.exports = p5sound;
