# p5.sound.js

This repository is a work in progress for the 2023 p5.js sound fellowship. Please read the [announcement](https://medium.com/@ProcessingOrg/announcing-the-2023-p5-sound-fellow-aar%C3%B3n-montoya-moraga-7613450902f6) for more details.

This repository will soon replace the previous version of the p5.sound library, which is currently hosted at [https://github.com/processing/p5.js-sound](https://github.com/processing/p5.js-sound).

p5.sound Fellow 2023: aarón montoya-moraga(@[montoyamoraga](https://github.com/montoyamoraga)),
p5.Sound Fellow Mentor 2023: Kristin Galvin (@[blechdom](https://github.com/blechdom))

## Scope of the project

This project is an update of the p5.sound.js library, with the following goals:

- Code stability and readability
- Updated and fewer dependencies

## Testing with examples

We are currently hosting `examples`  on the website https://processing.github.io/p5.sound.js/examples/

Please let us know if you find any bugs or issues.




## Comparison with the previous version of the library

Highlight the ones on this version, group them in categories, add dependencies, and include at the end the deprecated ones.

## Base classes

## Oscillator

## SoundFile


Associated examples here:

* Load/Play Soundfile: [https://editor.p5js.org/montoyamoraga/sketches/ZY9jQSOdp](https://editor.p5js.org/montoyamoraga/sketches/ZY9jQSOdp)

## Amplitude

## Effects



| Current version | Previous version | Status |
| :-------------- | :--------------- | :----- |
| Amplitude       | TODO             | works! |
| AudioVoice      | TODO             | TODO   |
| AudioContext    | TODO             | TODO   |
| AudioIn         | TODO             | TODO   |
| Compressor      | TODO             | TODO   |
| Effect          | TODO             | TODO   |
| Delay           | TODO             | TODO   |
| Effect          | TODO             | TODO   |
| Envelope        | TODO             | TODO   |
| EQ              | TODO             | TODO   |
| AnalyzerFFT     | Filter           | TODO   |
| AudioFilter     | TODO             | TODO   |
| Gain            | TODO             | TODO   |
| Listener3D      | TODO             | TODO   |
| Looper          | TODO             | TODO   |


## Deprecations

| Name of class | Reason of deprecation |
| :------------ | :-------------------- |
| Polysynth     | TODO                  |
| SoundLoop     | TODO                  |


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

## Dependencies

This library is intended 

After a fruitful discussion with the Tone.js team, we are adding Tone.js 14.x.x as a dependency when we need it, and updating its references.

## Help wanted

- p5.SoundFile: please help us fix the AudioWorklet and build for this.


## New contributors

Please clone this repository and make a pull request to contribute. We are currently working on the `main` branch.

## Build instructions

To install the dependencies for building, please run this command.

```bash
npm ci
```

To build the library, please run this command.

```bash
npm run build
```

