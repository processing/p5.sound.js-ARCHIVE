// core
import './constants';

import './shims';

import { getAudioContext } from './audioContext';
p5.prototype.getAudioContext = getAudioContext;

import p5sound from './main';


// helpers
import {
  _checkFileFormats,
  midiToFreq,
  soundFormats,
  safeBufferSize
} from './helpers';

p5.prototype._checkFileFormats = _checkFileFormats;
p5.prototype.midiToFreq = midiToFreq;
p5.prototype.soundFormats = soundFormats;
p5.prototype.safeBufferSize = safeBufferSize;

import SoundFile, { loadSound } from './SoundFile';
p5.prototype.SoundFile = SoundFile;
p5.prototype.loadSound = loadSound;
// register preload handling of loadSound
p5.prototype.registerPreloadMethod('loadSound', p5.prototype);


import Oscillator from './Oscillator';
p5.prototype.Oscillator = Oscillator;
import { SinOsc, TriOsc, SawOsc, SqrOsc } from './Oscillator';
p5.prototype.SinOsc = SinOsc;
p5.prototype.TriOsc = TriOsc;
p5.prototype.SawOsc = SawOsc;
p5.prototype.SqrOsc = SqrOsc;

import Noise from './Noise';
p5.prototype.Noise = Noise;

import Amplitude from './Amplitude';
p5.prototype.Amplitude = Amplitude;

import AudioIn from './AudioIn';
p5.prototype.AudioIn = AudioIn;

import Effect from './Effect';
p5.prototype.Effect = Effect;

import BiquadFilter from './BiquadFilter';
p5.prototype.BiquadFilter = BiquadFilter;
import { LowPass, HighPass, BandPass } from './BiquadFilter';
p5.prototype.LowPass = LowPass;
p5.prototype.HighPass = HighPass;
p5.prototype.BandPass = BandPass;

import Delay from './Delay';
p5.prototype.Delay = Delay;

import AnalyzerFFT from './AnalyzerFFT';
p5.prototype.AnalyzerFFT = AnalyzerFFT;

import Envelope from './Envelope';
p5.prototype.Envelope = Envelope;

// new modules adapted from Tone.js v0.10.0
import CrossFade from './CrossFade';
p5.prototype.CrossFade = CrossFade;
import WaveShaper from './WaveShaper';
p5.prototype.WaveShaper = WaveShaper;

module.exports = p5sound;