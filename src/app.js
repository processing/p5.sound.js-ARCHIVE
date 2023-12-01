// core
import './constants';

import './shims';

import { getAudioContext } from './audioContext';
p5.prototype.getAudioContext = getAudioContext;

import p5sound from './main';

// helpers
import {
  sampleRate,
  freqToMidi,
  midiToFreq,
  noteToFreq,
  soundFormats,
  disposeSound,
  _checkFileFormats,
  _mathChain,
  convertToWav,
  interleave,
  writeUTFBytes,
  safeBufferSize,
  saveSound
} from './helpers';


p5.prototype.sampleRate = sampleRate;
p5.prototype.freqToMidi = freqToMidi;
p5.prototype.midiToFreq = midiToFreq;
p5.prototype.noteToFreq = noteToFreq;
p5.prototype.soundFormats = soundFormats;
p5.prototype.disposeSound = disposeSound;
p5.prototype._checkFileFormats = _checkFileFormats;
p5.prototype._mathChain = _mathChain;
p5.prototype.convertToWav = convertToWav;
p5.prototype.interleave = interleave;
p5.prototype.writeUTFBytes = writeUTFBytes;
p5.prototype.safeBufferSize = safeBufferSize;
p5.prototype.saveSound = saveSound;

import SoundFile, { loadSound } from './SoundFile';
p5.prototype.SoundFile = SoundFile;
p5.prototype.loadSound = loadSound;
// register preload handling of loadSound
p5.prototype.registerPreloadMethod('loadSound', p5.prototype);

import Gain from './Gain';
p5.prototype.Gain = Gain;

// included on v0.0.3
import Oscillator from './Oscillator';
p5.prototype.Oscillator = Oscillator;
import { SinOsc, TriOsc, SawOsc, SqrOsc } from './Oscillator';
p5.prototype.SinOsc = SinOsc;
p5.prototype.TriOsc = TriOsc;
p5.prototype.SawOsc = SawOsc;
p5.prototype.SqrOsc = SqrOsc;

// included on v0.0.3
import Noise from './Noise';
p5.prototype.Noise = Noise;

// import Amplitude from './Amplitude';
// p5.prototype.Amplitude = Amplitude;

// import AudioIn from './AudioIn';
// p5.prototype.AudioIn = AudioIn;

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

import Panner from './Panner';
p5.prototype.Panner = Panner;

module.exports = p5sound;