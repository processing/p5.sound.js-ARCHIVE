# p5.sound.js

This repository is currently work in progress for 2023 p5.js sound fellowship. Please read the [announcement](https://medium.com/@ProcessingOrg/announcing-the-2023-p5-sound-fellow-aar%C3%B3n-montoya-moraga-7613450902f6) for more details.

p5.sound Fellow: aarón montoya-moraga(@[montoyamoraga](https://github.com/montoyamoraga)),
p5.Sound Fellow Mentor: Kristin Galvin (@[blechdom](https://github.com/blechdom))

## Build instructions

To install the dependencies for building, please run this command.

```bash
npm ci
```

To build the library, please run this command.

```bash
npm run build
```

## Examples

We are currently hosting some examples in the `examples` folder. To run them, please visit https://processing.github.io/p5.sound.js/examples/

## Current state

### Working

- p5.SoundFile: it's able to playback files, since we are removing build dependencies, such as preval and audioworklet-polyfill, it is right now only able to play back sound, not loop it.
-  p5.Oscillator: working, without amplitude or frequency modulation, or panning.

### Buggy

- p5.Amplitude: early stages of implementation
- p5.AudioIn: early stages of implementation
- p5.AnalyzerFFT: former name was p5.FFT
- p5.Envelope: work in progress on getting rid of Tone.js dependencies
- p5.Delay: took out the lowpass filter
- p5.Filter: not tested yet

### Coming soon

- p5.SoundRecorder
- p5.Reverb

### Deprecated (for now)

- userStartAudio
- p5.MonoSynth and p5.PolySynth
- p5.SoundLoop, p5.Phrase, p5.Part and p5.Score
- p5.Convolver

## Modules adapted from Tone.js r10

One of the big goals of this new version of the p5.sound.js library, we are trying to minimize the dependencies, and at the time the original library was built, [Tone.js r10](https://github.com/Tonejs/Tone.js/tree/r10) was included as a dependency.

In order to minimize the amount of external dependencies, and since Tone.js was evolved so much since 2017, when its r10 was released, we are adapting the Tone.js modules from that era, and including them in the source code here so that we can build p5.sound.js without having to import Tone.js.

The modules we are adapting are these:

- [CrossFade.js](./src/Tone/CrossFade.js)
- [Gain.js](./src/Tone/Gain.js)
- [Param.js](./src/Tone/Param.js)
- [Signal.js](./src/Tone/Signal.js)
- [SignalAbs.js](./src/Tone/SignalAbs.js)
- [SignalAdd.js](./src/Tone/SignalAdd.js)
- [SignalAudioToGain.js](./src/Tone/SignalAudioToGain.js)
- [SignalBase.js](./src/Tone/SignalBase.js)
- [SignalEqualPowerGain.js](./src/Tone/SignalEqualPowerGain.js)
- [SignalExpr.js](./src/Tone/SignalExpr.js)
- [SignalModulo.js](./src/Tone/SignalModulo.js)
- [SignalMultiply.js](./src/Tone/SignalMultiply.js)
- [SignalNegate.js](./src/Tone/SignalNegate.js)
- [SignalPow.js](./src/Tone/SignalPow.js)
- [SignalScale.js](./src/Tone/SignalScale.js)
- [SignalSubtract.js](./src/Tone/SignalSubtract.js)
- [SignalWaveShaper.js](./src/Tone/SignalWaveShaper.js)
- [SignalTimeLineSignal.js](./src/Tone/SignalTimeLineSignal.js)
- [Type.js](./src/Tone/Type.js)


## Help wanted

- p5.SoundFile: please help us fix the AudioWorklet and build for this.


