// core
import './constants';

// sound
import './shims';
import { getAudioContext } from './audioContext';
p5.prototype.getAudioContext = getAudioContext;
import p5sound from './main';
import Oscillator from './p5sound.Oscillator';
p5.prototype.Oscillator = Oscillator;
import { SinOsc, TriOsc, SawOsc, SqrOsc } from './p5sound.Oscillator';
p5.prototype.SinOsc = SinOsc;
p5.prototype.TriOsc = TriOsc;
p5.prototype.SawOsc = SawOsc;
p5.prototype.SqrOsc = SqrOsc;

import SoundFile from './p5sound.SoundFile';
p5.prototype.SoundFile = SoundFile;
import Effect from './p5sound.Effect';
p5.prototype.Effect = Effect;
import Filter from './p5sound.Filter';
p5.prototype.Filter = Filter;
import { LowPass, HighPass, BandPass } from './p5sound.Filter';
p5.prototype.LowPass = LowPass;
p5.prototype.HighPass = HighPass;
p5.prototype.BandPass = BandPass;
import Delay from './p5sound.Delay';
p5.prototype.Delay = Delay;

// helpers
import { _checkFileFormats } from './helpers';
p5.prototype._checkFileFormats = _checkFileFormats;

// import './init';

module.exports = p5sound;
