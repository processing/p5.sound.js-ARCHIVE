# p5.sound.js

This repository was started during the 2023 p5.js sound fellowship. Please read the [announcement](https://medium.com/@ProcessingOrg/announcing-the-2023-p5-sound-fellow-aar%C3%B3n-montoya-moraga-7613450902f6) for more details.

This repository will soon replace the previous version of the p5.sound library, which is currently hosted at [https://github.com/processing/p5.js-sound](https://github.com/processing/p5.js-sound).

p5.sound Fellow 2023: aarón montoya-moraga(@[montoyamoraga](https://github.com/montoyamoraga)),
p5.Sound Fellow Mentor 2023: Kristin Galvin (@[blechdom](https://github.com/blechdom))

## Scope of the project

This project is an update of the p5.sound.js library, with the following goals:

- Code stability and readability
- Updated and fewer dependencies
- Only keeping the most used features
- Deprecating the least used features

## Usage

To use this library, make sure you have p5.js installed. Visit the [p5.js website](https://p5js.org/) for more information and installation instructions.

Please let us know if you find any bugs or issues!

## Comparison with the previous version of the library

### Base classes

| Name         | Previous name | Dependencies | Tone.js dependencies |
| :----------- | :------------ | :----------- | :------------------- |
| audioContext | -             | none         | none                 |

### Oscillators

| Name       | Previous name | Dependencies | Tone.js dependencies |
| :--------- | :------------ | :----------- | :------------------- |
| Oscillator | -             | audioContext | Add, Multiply, Scale |
| SinOsc     | -             | Oscillator   |                      |
| TriOsc     | -             | Oscillator   |                      |
| SawOsc     | -             | Oscillator   |                      |
| Noise      | -             | Oscillator   |                      |

### Effects

| Name of class | Previous name | Dependencies | Tone.js dependencies |
| :------------ | :------------ | :----------- | :------------------- |
| BiquadFilter  | Filter        | Effect       | TODO                 |
| Delay         | -             | Effect       | TODO                 |

### Utilities

| Name of class | Previous name | Dependencies | Tone.js dependencies |
| :------------ | :------------ | :----------- | :------------------- |
| AnalyzerFFT   | FFT           | audioContext | none                 |
| Gain          | FFT           | audioContext | none                 |
| Envelope      | FFT           | audioContext | none                 |

### Currently broken / in progress

| Name of class | Previous name | Dependencies  | Tone.js dependencies |
| :------------ | :------------ | :------------ | :------------------- |
| AudioIn       | -             | audioWorklet/ | TODO                 |
| SoundFile     | -             | audioWorklet/ | TODO                 |

## Deprecations

| Name of class  | Reason of deprecation                                      |
| :------------- | :--------------------------------------------------------- |
| Convolver      | Efforts focused on simpler effects                         |
| MonoSynth      | Efforts focused on developing dependencies like Oscillator |
| Polysynth      | Built on top of MonoSynth, already deprecate               |
| Part           | Musical class, and out of scope for p5.sound               |
| Phrase         | Musical class, and out of scope for p5.sound               |
| Score          | Musical class, and out of scope for p5.sound               |
| SoundLoop      | Efforts focused on developing dependency SoundFile         |
| userStartAudio | Bad practice                                               |

## Dependencies

After a fruitful discussion with the Tone.js team, we are keeping Tone.js as a dependency and updating this to the latest version 14.x.x.

## Build instructions

To install the dependencies for building, please run this command.

```bash
npm install
```

To build the library, please run this command.

```bash
npm run build
```
