// core
import './constants';

// sound
import './shims';
import { getAudioContext } from './audioContext';
p5.prototype.getAudioContext = getAudioContext;
import p5sound from './main';

// import './main';

import Oscillator from './p5sound.Oscillator';
p5.prototype.Oscillator = Oscillator;
import { SinOsc, TriOsc, SawOsc, SqrOsc } from './p5sound.Oscillator';
p5.prototype.SinOsc = SinOsc;
p5.prototype.TriOsc = TriOsc;
p5.prototype.SawOsc = SawOsc;
p5.prototype.SqrOsc = SqrOsc;

import Noise from './p5sound.Noise';
p5.prototype.Noise = Noise;

import SoundFile from './p5sound.SoundFile';
p5.prototype.SoundFile = SoundFile;

import Effect from './p5sound.Effect';
p5.prototype.Effect = Effect;

import BiquadFilter from './p5sound.BiquadFilter';
p5.prototype.BiquadFilter = BiquadFilter;
import { LowPass, HighPass, BandPass } from './p5sound.BiquadFilter';
p5.prototype.LowPass = LowPass;
p5.prototype.HighPass = HighPass;
p5.prototype.BandPass = BandPass;

import Delay from './p5sound.Delay';
p5.prototype.Delay = Delay;

import FFT from './p5sound.FFT';
p5.prototype.FFT = FFT;

// helpers
import { _checkFileFormats } from './helpers';
p5.prototype._checkFileFormats = _checkFileFormats;

// import './init';

module.exports = p5sound;
