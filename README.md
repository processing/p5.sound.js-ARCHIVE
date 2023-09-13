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

We had copied the source files from Tone.js r10 to our src/ folder, but after a discussion with the Tone.js team, we are adding Tone.js 14.x.x as a dependency when we need it, and updating its references.

## Help wanted

- p5.SoundFile: please help us fix the AudioWorklet and build for this.


