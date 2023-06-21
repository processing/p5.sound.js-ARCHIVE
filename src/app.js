// core
import p5BLA from './core/main';
import './core/constants';
import './core/environment';
import './core/preload';
import './core/p5.Element';
import './core/p5.Renderer';
import './core/p5.Renderer2D';
import './core/rendering';
import './core/structure';
import './core/shape/2d_primitives';
import './core/shape/attributes';

// color
import './color/creating_reading';
import './color/p5.Color';
import './color/setting';

// sound
import { getAudioContext } from './sound/audioContext';
p5BLA.prototype.getAudioContext = getAudioContext;
import './sound/main';
import './sound/p5.Oscillator';
import './sound/p5.SoundFile';


// utilities
import './utilities/conversion';

import './core/init';

module.exports = p5BLA;
