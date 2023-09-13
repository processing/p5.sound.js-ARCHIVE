import p5sound from './main';

function safeBufferSize(idealBufferSize) {
  let bufferSize = idealBufferSize;

  // if the AudioWorkletNode is actually a ScriptProcessorNode created via polyfill,
  // make sure that our chosen buffer size isn't smaller than the buffer size automatically
  // selected by the polyfill
  // reference: https://github.com/GoogleChromeLabs/audioworklet-polyfill/issues/13#issuecomment-425014930
  // let tempAudioWorkletNode = new AudioWorkletNode(
  //   audioContext,
  //   processorNames.soundFileProcessor
  // );
  // if (tempAudioWorkletNode instanceof ScriptProcessorNode) {
  //   bufferSize = tempAudioWorkletNode.bufferSize;
  // }
  // tempAudioWorkletNode.disconnect();
  // tempAudioWorkletNode = null;

  return bufferSize;
}

/**
 *  List the SoundFile formats that you will include. LoadSound
 *  will search your directory for these extensions, and will pick
 *  a format that is compatable with the client's web browser.
 *  <a href="http://media.io/">Here</a> is a free online file
 *  converter.
 *
 *  @method soundFormats
 *  @param {String} [...formats] i.e. 'mp3', 'wav', 'ogg'
 *  @example
 *  <div><code>
 *  function preload() {
 *    // set the global sound formats
 *    soundFormats('mp3', 'ogg');
 *
 *    // load either beatbox.mp3, or .ogg, depending on browser
 *    mySound = loadSound('assets/beatbox.mp3');
 *  }
 *
 *  function setup() {
 *       let cnv = createCanvas(100, 100);
 *       background(220);
 *       text('sound loaded! tap to play', 10, 20, width - 20);
 *       cnv.mousePressed(function() {
 *         mySound.play();
 *       });
 *     }
 *  </code></div>
 */

function soundFormats() {
  // reset extensions array
  p5sound.extensions = [];
  // add extensions
  for (let i = 0; i < arguments.length; i++) {
    arguments[i] = arguments[i].toLowerCase();
    if (['mp3', 'wav', 'ogg', 'm4a', 'aac'].indexOf(arguments[i]) > -1) {
      p5sound.extensions.push(arguments[i]);
    } else {
      throw arguments[i] + ' is not a valid sound format!';
    }
  }
}

function _checkFileFormats(paths) {
  let path;
  // if path is a single string, check to see if extension is provided
  if (typeof paths === 'string') {
    path = paths;
    // see if extension is provided
    let extTest = path.split('.').pop();
    // if an extension is provided...
    if (['mp3', 'wav', 'ogg', 'm4a', 'aac'].indexOf(extTest) > -1) {
      if (!p5.prototype.isFileSupported(extTest)) {
        let pathSplit = path.split('.');
        let pathCore = pathSplit[pathSplit.length - 1];
        for (let i = 0; i < p5sound.extensions.length; i++) {
          const extension = p5sound.extensions[i];
          const supported = p5.prototype.isFileSupported(extension);
          if (supported) {
            pathCore = '';
            if (pathSplit.length === 2) {
              pathCore += pathSplit[0];
            }
            for (let i = 1; i <= pathSplit.length - 2; i++) {
              let p = pathSplit[i];
              pathCore += '.' + p;
            }
            path = pathCore += '.';
            path = path += extension;
            break;
          }
        }
      }
    }
    // if no extension is provided...
    else {
      for (let i = 0; i < p5sound.extensions.length; i++) {
        const extension = p5sound.extensions[i];
        const supported = p5.prototype.isFileSupported(extension);
        if (supported) {
          path = path + '.' + extension;
          break;
        }
      }
    }
  } // end 'if string'

  // path can either be a single string, or an array
  else if (typeof paths === 'object') {
    for (let i = 0; i < paths.length; i++) {
      let extension = paths[i].split('.').pop();
      let supported = p5.prototype.isFileSupported(extension);
      if (supported) {
        // console.log('.'+extension + ' is ' + supported +
        //  ' supported by your browser.');
        path = paths[i];
        break;
      }
    }
  }
  return path;
}

/**
 *  Used by Osc and Envelope to chain signal math
 */
function _mathChain(o, math, thisChain, nextChain, type) {
  // if this type of math already exists in the chain, replace it
  for (let i in o.mathOps) {
    if (o.mathOps[i] instanceof type) {
      o.mathOps[i].dispose();
      thisChain = i;
      if (thisChain < o.mathOps.length - 1) {
        nextChain = o.mathOps[i + 1];
      }
    }
  }
  o.mathOps[thisChain - 1].disconnect();
  o.mathOps[thisChain - 1].connect(math);
  math.connect(nextChain);
  o.mathOps[thisChain] = math;
  return o;
}

// helper methods to convert audio file as .wav format,
// will use as saving .wav file and saving blob object
// Thank you to Matt Diamond's RecorderJS (MIT License)
// https://github.com/mattdiamond/Recorderjs
function convertToWav(audioBuffer) {
  var leftChannel, rightChannel;
  leftChannel = audioBuffer.getChannelData(0);

  // handle mono files
  if (audioBuffer.numberOfChannels > 1) {
    rightChannel = audioBuffer.getChannelData(1);
  } else {
    rightChannel = leftChannel;
  }

  var interleaved = interleave(leftChannel, rightChannel);

  // create the buffer and view to create the .WAV file
  var buffer = new window.ArrayBuffer(44 + interleaved.length * 2);
  var view = new window.DataView(buffer);

  // write the WAV container,
  // check spec at: https://web.archive.org/web/20171215131933/http://tiny.systems/software/soundProgrammer/WavFormatDocs.pdf

  // RIFF chunk descriptor
  writeUTFBytes(view, 0, 'RIFF');
  view.setUint32(4, 36 + interleaved.length * 2, true);
  writeUTFBytes(view, 8, 'WAVE');
  // FMT sub-chunk
  writeUTFBytes(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  // stereo (2 channels)
  view.setUint16(22, 2, true);
  view.setUint32(24, p5sound.audiocontext.sampleRate, true);
  view.setUint32(28, p5sound.audiocontext.sampleRate * 4, true);
  view.setUint16(32, 4, true);
  view.setUint16(34, 16, true);
  // data sub-chunk
  writeUTFBytes(view, 36, 'data');
  view.setUint32(40, interleaved.length * 2, true);

  // write the PCM samples
  var lng = interleaved.length;
  var index = 44;
  var volume = 1;
  for (var i = 0; i < lng; i++) {
    view.setInt16(index, interleaved[i] * (0x7fff * volume), true);
    index += 2;
  }

  return view;
}

/**
 *  Returns the frequency value of a MIDI note value.
 *  General MIDI treats notes as integers where middle C
 *  is 60, C# is 61, D is 62 etc. Useful for generating
 *  musical frequencies with oscillators.
 *
 *  @method  midiToFreq
 *  @param  {Number} midiNote The number of a MIDI note
 *  @return {Number} Frequency value of the given MIDI note
 *  @example
 *  <div><code>
 *  let midiNotes = [60, 64, 67, 72];
 *  let noteIndex = 0;
 *  let midiVal, freq;
 *
 *  function setup() {
 *    let cnv = createCanvas(100, 100);
 *    cnv.mousePressed(startSound);
 *    osc = new p5.TriOsc();
 *    env = new p5.Envelope();
 *  }
 *
 *  function draw() {
 *    background(220);
 *    text('tap to play', 10, 20);
 *    if (midiVal) {
 *      text('MIDI: ' + midiVal, 10, 40);
 *      text('Freq: ' + freq, 10, 60);
 *    }
 *  }
 *
 *  function startSound() {
 *    // see also: userStartAudio();
 *    osc.start();
 *
 *    midiVal = midiNotes[noteIndex % midiNotes.length];
 *    freq = midiToFreq(midiVal);
 *    osc.freq(freq);
 *    env.ramp(osc, 0, 1.0, 0);
 *
 *    noteIndex++;
 *  }
 *  </code></div>
 */
function midiToFreq(m) {
  return 440 * Math.pow(2, (m - 69) / 12.0);
}

export {
  _mathChain,
  _checkFileFormats,
  convertToWav,
  midiToFreq,
  soundFormats,
  safeBufferSize
};