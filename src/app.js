// core
import './constants';

import './shims';

import { getAudioContext } from './audioContext';
p5.prototype.getAudioContext = getAudioContext;

import './main';

// helpers
import {
  _checkFileFormats,
  soundFormats,
  safeBufferSize
} from './helpers';

p5.prototype._checkFileFormats = _checkFileFormats;
p5.prototype.soundFormats = soundFormats;
p5.prototype.safeBufferSize = safeBufferSize;

import SoundFile, { loadSound } from './p5sound.SoundFile';
p5.prototype.SoundFile = SoundFile;
p5.prototype.loadSound = loadSound;
// register preload handling of loadSound
p5.prototype.registerPreloadMethod('loadSound', p5.prototype);


import Oscillator from './p5sound.Oscillator';
p5.prototype.Oscillator = Oscillator;
import { SinOsc, TriOsc, SawOsc, SqrOsc } from './p5sound.Oscillator';
p5.prototype.SinOsc = SinOsc;
p5.prototype.TriOsc = TriOsc;
p5.prototype.SawOsc = SawOsc;
p5.prototype.SqrOsc = SqrOsc;

import Noise from './p5sound.Noise';
p5.prototype.Noise = Noise;

import Amplitude from './p5sound.Amplitude';
p5.prototype.Amplitude = Amplitude;

import AudioIn from './p5Sound.AudioIn';
p5.prototype.AudioIn = AudioIn;

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

import AnalyzerFFT from './p5sound.AnalyzerFFT';
p5.prototype.AnalyzerFFT = AnalyzerFFT;

import Envelope from './p5sound.Envelope';
p5.prototype.Envelope = Envelope;

