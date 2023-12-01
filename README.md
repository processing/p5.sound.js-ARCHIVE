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

- AnalyzerFFT
- BiquadFilter
- Delay
- Noise
- Oscillator
- SoundFile
- 
### Buggy

- p5.Amplitude: early stages of implementation
- p5.AudioIn: early stages of implementation
- p5.Envelope: work in progress on getting rid of Tone.js dependencies

### Coming soon

- p5.SoundRecorder
- p5.Reverb

### Deprecated (for now)

- userStartAudio
- MonoSynth and PolySynth
- SoundLoop, Phrase, Part and Score
- Convolver

After a fruitful discussion with the Tone.js team, we are adding Tone.js 14.x.x as a dependency when we need it, and updating its references.

## Help wanted

- p5.SoundFile: please help us fix the AudioWorklet and build for this.


