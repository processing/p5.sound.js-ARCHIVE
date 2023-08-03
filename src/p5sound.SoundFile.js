import audioContext from './audioContext';
import processorNames from './audioWorklet/processorNames';
import CustomError from './errorHandler';


/**
 * SoundFile object with a path to a file.
 * The p5sound.SoundFile may not be available immediately because it loads the file information asynchronously.
 * To do something with the sound as soon as it loads pass the name of a function as the second parameter.
 * @module Sound
 * @submodule SoundFile
 * @for p5
 * @requires core
 */



// let _createCounterBuffer = function (buffer) {
//   const len = buffer.length;
//   const audioBuf = ac.createBuffer(1, buffer.length, ac.sampleRate);
//   const arrayBuffer = audioBuf.getChannelData(0);
//   for (let index = 0; index < len; index++) {
//     arrayBuffer[index] = index;
//   }
//   return audioBuf;
// };

// event handler to remove references to the bufferSourceNode when it is done playing
function _clearOnEnd(e) {
  const thisBufferSourceNode = e.target;
  const soundFile = this;

  // delete this.bufferSourceNode from the sources array when it is done playing:
  thisBufferSourceNode._playing = false;
  thisBufferSourceNode.removeEventListener('ended', soundFile._clearOnEnd);

  // call the onended callback
  soundFile._onended(soundFile);

  // delete bufferSourceNode(s) in soundFile.bufferSourceNodes
  // iterate in reverse order because the index changes by splice
  soundFile.bufferSourceNodes
    .map((_, i) => i)
    .reverse()
    .forEach(function (i) {
      const n = soundFile.bufferSourceNodes[i];

      if (n._playing === false) {
        soundFile.bufferSourceNodes.splice(i, 1);
      }
    });

  if (soundFile.bufferSourceNodes.length === 0) {
    soundFile._playing = false;
  }
}

class SoundFile {
  constructor(paths, onload, onerror, whileLoading) {
    if (typeof paths !== 'undefined') {
      if (typeof paths === 'string' || typeof paths[0] === 'string') {
        let path = p5.prototype._checkFileFormats(paths);
        this.url = path;
      } else if (typeof paths === 'object') {
        if (
          !(window.File && window.FileReader && window.FileList && window.Blob)
        ) {
          // The File API isn't supported in this browser
          throw 'Unable to load file because the File API is not supported';
        }
      }

      // if type is a p5.File...get the actual file
      if (paths.file) {
        paths = paths.file;
      }

      this.file = paths;
    }

    // private _onended callback, set by the method: onended(callback)
    this._onended = function () {};

    this._looping = false;
    this._playing = false;
    this._paused = false;
    this._pauseTime = 0;

    // cues for scheduling events with addCue() removeCue()
    this._cues = [];
    this._cueIDCounter = 0;

    //  position of the most recently played sample
    this._lastPos = 0;
    this._counterNode = null;
    this._workletNode = null;

    // array of sources so that they can all be stopped!
    this.bufferSourceNodes = [];

    // current source
    this.bufferSourceNode = null;

    this.buffer = null;
    this.playbackRate = 1;

    this.input = audioContext.createGain();
    this.output = audioContext.createGain();

    this.reversed = false;

    // start and end of playback / loop
    this.startTime = 0;
    this.endTime = null;
    this.pauseTime = 0;

    // "restart" would stop playback before retriggering
    this.mode = 'sustain';

    // time that playback was started, in millis
    this.startMillis = null;

    // stereo panning
    // this.panner = new Panner();
    // this.output.connect(this.panner);
    this.output.connect(audioContext.destination);

    // it is possible to instantiate a soundfile with no path
    if (this.url || this.file) {
      this.load(onload, onerror);
    }

    // add this p5.SoundFile to the soundArray
    // p5sound.soundArray.push(this);

    if (typeof whileLoading === 'function') {
      this._whileLoading = whileLoading;
    } else {
      this._whileLoading = function () {};
    }

    this._clearOnEnd = _clearOnEnd.bind(this);

    // same as setVolume, to match Processing Sound
    this.amp = this.setVolume;

    // these are the same thing
    this.fade = this.setVolume;
  }

  /**
   * This is a helper function that the p5.SoundFile calls to load
   * itself. Accepts a callback (the name of another function)
   * as an optional parameter.
   *
   * @private
   * @for p5.SoundFile
   * @param {Function} [successCallback]   Name of a function to call once file loads
   * @param {Function} [errorCallback]   Name of a function to call if there is an error
   */
  load(callback, errorCallback) {
    let self = this;
    let errorTrace = new Error().stack;

    if (this.url !== undefined && this.url !== '') {
      let request = new XMLHttpRequest();
      request.addEventListener(
        'progress',
        function (evt) {
          self._updateProgress(evt);
        },
        false
      );
      request.open('GET', this.url, true);
      request.responseType = 'arraybuffer';

      request.onload = function () {
        if (request.status === 200) {
          // on sucess loading file:
          // if (!self.panner) return;
          audioContext.decodeAudioData(
            request.response,
            // success decoding buffer:
            function (buff) {
              // if (!self.panner) return;
              self.buffer = buff;
              if (callback) {
                callback(self);
              }
            },
            // error decoding buffer. "e" is undefined in Chrome 11/22/2015
            function () {
              // if (!self.panner) return;
              let err = new CustomError(
                'decodeAudioData',
                errorTrace,
                self.url
              );
              let msg = 'AudioContext error at decodeAudioData for ' + self.url;
              if (errorCallback) {
                err.msg = msg;
                errorCallback(err);
              } else {
                console.error(
                  msg + '\n The error stack trace includes: \n' + err.stack
                );
              }
            }
          );
        }
        // if request status != 200, it failed
        else {
          // if (!self.panner) return;
          let err = new CustomError('loadSound', errorTrace, self.url);
          let msg =
            'Unable to load ' +
            self.url +
            '. The request status was: ' +
            request.status +
            ' (' +
            request.statusText +
            ')';

          if (errorCallback) {
            err.message = msg;
            errorCallback(err);
          } else {
            console.error(
              msg + '\n The error stack trace includes: \n' + err.stack
            );
          }
        }
      };

      // if there is another error, aside from 404...
      request.onerror = function () {
        let err = new CustomError('loadSound', errorTrace, self.url);
        let msg =
          'There was no response from the server at ' +
          self.url +
          '. Check the url and internet connectivity.';

        if (errorCallback) {
          err.message = msg;
          errorCallback(err);
        } else {
          console.error(
            msg + '\n The error stack trace includes: \n' + err.stack
          );
        }
      };

      request.send();
    } else if (this.file !== undefined) {
      let reader = new FileReader();
      reader.onload = function () {
        // if (!self.panner) return;
        audioContext.decodeAudioData(reader.result, function (buff) {
          // if (!self.panner) return;
          self.buffer = buff;
          if (callback) {
            callback(self);
          }
        });
      };
      reader.onerror = function (e) {
        // if (!self.panner) return;
        if (onerror) {
          onerror(e);
        }
      };
      reader.readAsArrayBuffer(this.file);
    }
  }

  /**
   *  Returns true if the sound file finished loading successfully.
   *
   *  @method  isLoaded
   *  @for p5.SoundFile
   *  @return {Boolean}
   */
  isLoaded() {
    if (this.buffer) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Play the p5.SoundFile
   *
   * @method play
   * @for p5.SoundFile
   * @param {Number} [startTime]            (optional) schedule playback to start (in seconds from now).
   * @param {Number} [rate]             (optional) playback rate
   * @param {Number} [amp]              (optional) amplitude (volume)
   *                                     of playback
   * @param {Number} [cueStart]        (optional) cue start time in seconds
   * @param {Number} [duration]          (optional) duration of playback in seconds
   */
  play(startTime, rate, amp, _cueStart, duration) {
    if (!this.output) {
      console.warn('SoundFile.play() called after dispose');
      return;
    }

    let now = audioContext.currentTime;
    let cueStart, cueEnd;
    let time = startTime || 0;
    if (time < 0) {
      time = 0;
    }

    time = time + now;

    if (typeof rate !== 'undefined') {
      this.rate(rate);
    }

    if (typeof amp !== 'undefined') {
      this.setVolume(amp);
    }

    // TO DO: if already playing, create array of buffers for easy stop()
    if (this.buffer) {
      // reset the pause time (if it was paused)
      this._pauseTime = 0;

      // handle restart playmode
      if (this.mode === 'restart' && this.buffer && this.bufferSourceNode) {
        this.bufferSourceNode.stop(time);
        this._counterNode.stop(time);
      }

      //dont create another instance if already playing
      if (this.mode === 'untildone' && this.isPlaying()) {
        return;
      }
      // make a new source and counter. They are automatically assigned playbackRate and buffer
      this.bufferSourceNode = this._initSourceNode();

      // garbage collect counterNode and create a new one
      delete this._counterNode;
      this._counterNode = this._initCounterNode();

      if (_cueStart) {
        if (_cueStart >= 0 && _cueStart < this.buffer.duration) {
          // this.startTime = cueStart;
          cueStart = _cueStart;
        } else {
          throw 'start time out of range';
        }
      } else {
        cueStart = 0;
      }

      if (duration) {
        // if duration is greater than buffer.duration, just play entire file anyway rather than throw an error
        duration =
          duration <= this.buffer.duration - cueStart
            ? duration
            : this.buffer.duration;
      }

      // if it was paused, play at the pause position
      if (this._paused) {
        this.bufferSourceNode.start(time, this.pauseTime, duration);
        this._counterNode.start(time, this.pauseTime, duration);
      } else {
        this.bufferSourceNode.start(time, cueStart, duration);
        this._counterNode.start(time, cueStart, duration);
      }

      this._playing = true;
      this._paused = false;

      // add source to sources array, which is used in stopAll()
      this.bufferSourceNodes.push(this.bufferSourceNode);
      this.bufferSourceNode._arrayIndex = this.bufferSourceNodes.length - 1;

      this.bufferSourceNode.addEventListener('ended', this._clearOnEnd);
    }
    // If soundFile hasn't loaded the buffer yet, throw an error
    else {
      throw 'not ready to play file, buffer has yet to load. Try preload()';
    }

    // if looping, will restart at original time
    this.bufferSourceNode.loop = this._looping;
    this._counterNode.loop = this._looping;

    if (this._looping === true) {
      cueEnd = duration ? duration : cueStart - 0.000000000000001;
      this.bufferSourceNode.loopStart = cueStart;
      this.bufferSourceNode.loopEnd = cueEnd;
      this._counterNode.loopStart = cueStart;
      this._counterNode.loopEnd = cueEnd;
    }
  }
  playMode() {
    console.log('playMode');
  }
  pause() {
    console.log('pause');
  }

  /**
     *  Connect to a p5.sound / Web Audio object.
     *
     *  @method  connect
     *  @for p5.Oscillator
     *  @param  {Object} unit A p5.sound or Web Audio object
     */
  connect(unit) {
    if(!unit) {
      this.output.connect(p5sound.input);
    }
    else if (unit.hasOwnProperty('input')) {
      this.output.connect(unit.input);
    } else {
      this.output.connect(unit);
    }
    if (unit && unit._onNewInput) {
      unit._onNewInput(this);
    }
  }

  disconnect() {
    // console.log('disconnect');
  }

  /**
   * Loop the p5.SoundFile. Accepts optional parameters to set the
   * playback rate, playback volume, loopStart, loopEnd.
   *
   * @method loop
   * @for p5.SoundFile
   * @param {Number} [startTime] (optional) schedule event to occur
   *                             seconds from now
   * @param {Number} [rate]        (optional) playback rate
   * @param {Number} [amp]         (optional) playback volume
   * @param {Number} [cueLoopStart] (optional) startTime in seconds
   * @param {Number} [duration]  (optional) loop duration in seconds
   * @example
   *  <div><code>
   *  let soundFile;
   *  let loopStart = 0.5;
   *  let loopDuration = 0.2;
   *  function preload() {
   *    soundFormats('ogg', 'mp3');
   *    soundFile = loadSound('assets/Damscray_-_Dancing_Tiger_02.mp3');
   *  }
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(canvasPressed);
   *    background(220);
   *    text('tap to play, release to pause', 10, 20, width - 20);
   *  }
   *  function canvasPressed() {
   *    soundFile.loop();
   *    background(0, 200, 50);
   *  }
   *  function mouseReleased() {
   *    soundFile.pause();
   *    background(220);
   *  }
   *  </code>
   *  </div>
   */
  loop(startTime, rate, amp, loopStart, duration) {
    this._looping = true;
    this.play(startTime, rate, amp, loopStart, duration);
  }

  async _initCounterNode() {
    let self = this;
    console.log('this ', JSON.stringify(self));
    // let now = audioContext.currentTime;
    // let cNode = audioContext.createBufferSource();

    // Reuse the worklet node rather than creating a new one. Even if we
    // disconnect it, it seems to leak and cause choppy audio after a
    // while.
    if (!self._workletNode) {
      const workletBufferSize = 256;//safeBufferSize(256);
      self._workletNode = new AudioWorkletNode(
        audioContext,
        processorNames.soundFileProcessor,
        {
          processorOptions: { bufferSize: workletBufferSize }
        }
      );
      console.log('self._workletNode', JSON.stringify(self._workletNode, null, 2));
      await self._workletNode.addModule('recorderProcessor.js');
      await self._workletNode.addModule('amplitudeProcessor.js');
      await self._workletNode.addModule('soundfileProcessor.js');
      self._workletNode.port.onmessage = event => {
        if (event.data.name === 'position') {
          // event.data.position should only be 0 when paused
          if (event.data.position === 0) {
            return;
          }
          this._lastPos = event.data.position;

          // do any callbacks that have been scheduled
          this._onTimeUpdate(self._lastPos);
        }
      };
      self._workletNode.connect(p5.soundOut._silentNode);
    }
  }

  // initialize sourceNode, set its initial buffer and playbackRate
  _initSourceNode() {
    let bufferSourceNode = audioContext.createBufferSource();
    bufferSourceNode.buffer = this.buffer;
    bufferSourceNode.playbackRate.value = this.playbackRate;
    bufferSourceNode.connect(this.output);
    return bufferSourceNode;
  }


  /**
   *  Returns true if a p5.SoundFile is playing, false if not (i.e.
   *  paused or stopped).
   *
   *  @method isPlaying
   *  @for p5.SoundFile
   *  @return {Boolean}
   */
  isPlaying() {
    return this._playing;
  }

  /**
   *  Returns true if a p5.SoundFile is paused, false if not (i.e.
   *  playing or stopped).
   *
   *  @method  isPaused
   *  @for p5.SoundFile
   *  @return {Boolean}
   */
  isPaused() {
    return this._paused;
  }

  // TO DO: use this method to create a loading bar that shows progress during file upload/decode.
  _updateProgress(evt) {
    if (evt.lengthComputable) {
      let percentComplete = (evt.loaded / evt.total) * 0.99;
      this._whileLoading(percentComplete, evt);
      // ...
    } else {
      // Unable to compute progress information since the total size is unknown
      this._whileLoading('size unknown');
    }
  }
}


/**
 *  loadSound() returns a new p5.SoundFile from a specified
 *  path. If called during preload(), the p5.SoundFile will be ready
 *  to play in time for setup() and draw(). If called outside of
 *  preload, the p5.SoundFile will not be ready immediately, so
 *  loadSound accepts a callback as the second parameter. Using a
 *  <a href="https://github.com/processing/p5.js/wiki/Local-server">
 *  local server</a> is recommended when loading external files.
 *
 *  @method loadSound
 *  @for p5
 *  @param  {String|Array}   path     Path to the sound file, or an array with
 *                                    paths to soundfiles in multiple formats
 *                                    i.e. ['sound.ogg', 'sound.mp3'].
 *                                    Alternately, accepts an object: either
 *                                    from the HTML5 File API, or a p5.File.
 *  @param {Function} [successCallback]   Name of a function to call once file loads
 *  @param {Function} [errorCallback]   Name of a function to call if there is
 *                                      an error loading the file.
 *  @param {Function} [whileLoading] Name of a function to call while file is loading.
 *                                 This function will receive the percentage loaded
 *                                 so far, from 0.0 to 1.0.
 *  @return {SoundFile}            Returns a p5.SoundFile
 *  @example
 *  <div><code>
 *  let mySound;
 *  function preload() {
 *    soundFormats('mp3', 'ogg');
 *    mySound = loadSound('assets/doorbell');
 *  }
 *
 *  function setup() {
 *    let cnv = createCanvas(100, 100);
 *    cnv.mousePressed(canvasPressed);
 *    background(220);
 *    text('tap here to play', 10, 20);
 *  }
 *
 *  function canvasPressed() {
 *    // playing a sound file on a user gesture
 *    // is equivalent to `userStartAudio()`
 *    mySound.play();
 *  }
 *  </code></div>
 */
function loadSound(path, callback, onerror, whileLoading) {
  // if loading locally without a server
  if (
    window.location.origin.indexOf('file://') > -1 &&
    window.cordova === 'undefined'
  ) {
    window.alert(
      'This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS'
    );
  }

  let self = this;
  let s = new SoundFile(
    path,
    function () {
      if (typeof callback === 'function') {
        callback.apply(self, arguments);
      }

      if (typeof self._decrementPreload === 'function') {
        self._decrementPreload();
      }
    },
    onerror,
    whileLoading
  );

  return s;
}

export default SoundFile;
export { loadSound };