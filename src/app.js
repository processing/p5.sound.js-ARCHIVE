// core
import p5sound from './core/main';
import './core/constants';
import './core/environment';
import './core/preload';
import './core/p5sound.Element';
import './core/p5sound.Renderer';
import './core/p5sound.Renderer2D';
import './core/rendering';
import './core/structure';
import './core/shape/2d_primitives';
import './core/shape/attributes';

// color
import './color/creating_reading';
import './color/p5sound.Color';
import './color/setting';

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
