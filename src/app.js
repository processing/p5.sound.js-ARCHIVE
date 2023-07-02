// core
import p5sound from './core/main';
import './core/constants';
import './core/structure';

// sound
import { getAudioContext } from './sound/audioContext';
p5sound.prototype.getAudioContext = getAudioContext;
import './sound/main';
import Oscillator from './sound/p5sound.Oscillator';
p5sound.prototype.Oscillator  = Oscillator;
import './sound/p5sound.SoundFile';

// utilities
import './utilities/conversion';

import './core/init';

module.exports = p5sound;
