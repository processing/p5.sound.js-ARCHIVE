import audioContext from './audioContext';
import p5sound from './main';
// import processorNames from './audioWorklet/processorNames';
import CustomError from './errorHandler';
import { midiToFreq, convertToWav } from './helpers';
import Panner from './panner';

let _createCounterBuffer = function (buffer) {
  const len = buffer.length;
  const audioBuf = audioContext.createBuffer(
    1, buffer.length, audioContext.sampleRate);
  const arrayBuffer = audioBuf.getChannelData(0);
  for (let index = 0; index < len; index++) {
    arrayBuffer[index] = index;
  }
  return audioBuf;
};

/*** SCHEDULE EVENTS ***/

// Cue inspired by JavaScript setTimeout, and the
// Tone.js Transport Timeline Event, MIT License Yotam Mann 2015 tonejs.org
class Cue {
  constructor(callback, time, id, val) {
    this.callback = callback;
    this.time = time;
    this.id = id;
    this.val = val;
  }
}

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

/**
 *  <p>SoundFile object with a path to a file.</p>
 *
 *  <p>The SoundFile may not be available immediately because
 *  it loads the file information asynchronously.</p>
 *
 *  <p>To do something with the sound as soon as it loads
 *  pass the name of a function as the second parameter.</p>
 *
 *  <p>Only one file path is required. However, audio file formats
 *  (i.e. mp3, ogg, wav and m4a/aac) are not supported by all
 *  web browsers. If you want to ensure compatability, instead of a single
 *  file path, you may include an Array of filepaths, and the browser will
 *  choose a format that works.</p>
 *
 *  @class SoundFile
 *  @constructor
 *  @param {String|Array} path   path to a sound file (String). Optionally,
 *                               you may include multiple file formats in
 *                               an array. Alternately, accepts an object
 *                               from the HTML5 File API, or a p5.File.
 *  @param {Function} [successCallback]   Name of a function to call once file loads
 *  @param {Function} [errorCallback]   Name of a function to call if file fails to
 *                                      load. This function will receive an error or
 *                                     XMLHttpRequest object with information
 *                                     about what went wrong.
 *  @param {Function} [whileLoadingCallback]   Name of a function to call while file
 *                                             is loading. That function will
 *                                             receive progress of the request to
 *                                             load the sound file
 *                                             (between 0 and 1) as its first
 *                                             parameter. This progress
 *                                             does not account for the additional
 *                                             time needed to decode the audio data.
 *
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
 * </code></div>
 */
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
    this.panner = new Panner();
    this.output.connect(this.panner);
    this.panner.connect(p5sound.input);

    // it is possible to instantiate a soundfile with no path
    if (this.url || this.file) {
      this.load(onload, onerror);
    }

    // add this SoundFile to the soundArray
    p5sound.soundArray.push(this);

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
   * This is a helper function that the SoundFile calls to load
   * itself. Accepts a callback (the name of another function)
   * as an optional parameter.
   *
   * @private
   * @for SoundFile
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
          if (!self.panner) return;
          audioContext.decodeAudioData(
            request.response,
            // success decoding buffer:
            function (buff) {
              if (!self.panner) return;
              self.buffer = buff;
              if (callback) {
                callback(self);
              }
            },
            // error decoding buffer. "e" is undefined in Chrome 11/22/2015
            function () {
              if (!self.panner) return;
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
          if (!self.panner) return;
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
        if (!self.panner) return;
        audioContext.decodeAudioData(reader.result, function (buff) {
          if (!self.panner) return;
          self.buffer = buff;
          if (callback) {
            callback(self);
          }
        });
      };
      reader.onerror = function (e) {
        if (!self.panner) return;
        if (onerror) {
          onerror(e);
        }
      };
      reader.readAsArrayBuffer(this.file);
    }
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

  /**
   *  Returns true if the sound file finished loading successfully.
   *
   *  @method  isLoaded
   *  @for SoundFile
   *  @return {Boolean}
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  isLoaded() {
    if (this.buffer) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Play the SoundFile
   *
   * @method play
   * @for SoundFile
   * @param {Number} [startTime]            (optional) schedule playback to start (in seconds from now).
   * @param {Number} [rate]             (optional) playback rate
   * @param {Number} [amp]              (optional) amplitude (volume)
   *                                     of playback
   * @param {Number} [cueStart]        (optional) cue start time in seconds
   * @param {Number} [duration]          (optional) duration of playback in seconds
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
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
        // this._counterNode.stop(time);
      }

      //dont create another instance if already playing
      if (this.mode === 'untildone' && this.isPlaying()) {
        return;
      }
      // make a new source and counter. They are automatically assigned playbackRate and buffer
      this.bufferSourceNode = this._initSourceNode();

      // garbage collect counterNode and create a new one
      // delete this._counterNode;
      // this._counterNode = this._initCounterNode();

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
        // this._counterNode.start(time, this.pauseTime, duration);
      } else {
        this.bufferSourceNode.start(time, cueStart, duration);
        // this._counterNode.start(time, cueStart, duration);
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
    // this._counterNode.loop = this._looping;

    if (this._looping === true) {
      cueEnd = duration ? duration : cueStart - 0.000000000000001;
      this.bufferSourceNode.loopStart = cueStart;
      this.bufferSourceNode.loopEnd = cueEnd;
      // this._counterNode.loopStart = cueStart;
      // this._counterNode.loopEnd = cueEnd;
    }
  }

  /**
   *  SoundFile has two play modes: <code>restart</code> and
   *  <code>sustain</code>. Play Mode determines what happens to a
   *  SoundFile if it is triggered while in the middle of playback.
   *  In sustain mode, playback will continue simultaneous to the
   *  new playback. In restart mode, play() will stop playback
   *  and start over. With untilDone, a sound will play only if it's
   *  not already playing. Sustain is the default mode.
   *
   *  @method  playMode
   *  @for SoundFile
   *  @param  {String} str 'restart' or 'sustain' or 'untilDone'
   *  @example
   *  <div><code>
   *  let mySound;
   *  function preload(){
   *    mySound = loadSound('assets/Damscray_DancingTiger.mp3');
   *  }
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(canvasPressed);
   *    noFill();
   *    rect(0, height/2, width - 1, height/2 - 1);
   *    rect(0, 0, width - 1, height/2);
   *    textAlign(CENTER, CENTER);
   *    fill(20);
   *    text('restart', width/2, 1 * height/4);
   *    text('sustain', width/2, 3 * height/4);
   *  }
   *  function canvasPressed() {
   *    if (mouseX < height/2) {
   *      mySound.playMode('restart');
   *    } else {
   *      mySound.playMode('sustain');
   *    }
   *    mySound.play();
   *  }
   *
   * </code></div>
   */
  playMode(str) {
    let s = str.toLowerCase().trim();

    // if restart, stop all other sounds from playing
    if (s === 'restart' && this.buffer && this.bufferSourceNode) {
      for (let i = 0; i < this.bufferSourceNodes.length; i++) {
        let now = audioContext.currentTime;
        this.bufferSourceNodes[i].stop(now);
      }
    }

    // set play mode to effect future playback
    if (s === 'restart' || s === 'sustain' || s === 'untildone') {
      this.mode = s;
    } else {
      throw 'Invalid play mode. Must be either "restart" or "sustain"';
    }
  }

  /**
   *  Pauses a file that is currently playing. If the file is not
   *  playing, then nothing will happen.
   *
   *  After pausing, .play() will resume from the paused
   *  position.
   *  If SoundFile had been set to loop before it was paused,
   *  it will continue to loop after it is unpaused with .play().
   *
   *  @method pause
   *  @for SoundFile
   *  @param {Number} [startTime] (optional) schedule event to occur
   *                               seconds from now
   *  @example
   *  <div><code>
   *  let soundFile;
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
  pause(startTime) {
    let now = audioContext.currentTime;
    let time = startTime || 0;
    let pTime = time + now;

    if (this.isPlaying() && this.buffer && this.bufferSourceNode) {
      this._paused = true;
      this._playing = false;

      this.pauseTime = this.currentTime();
      this.bufferSourceNode.stop(pTime);
      // this._counterNode.stop(pTime);

      this._pauseTime = this.currentTime();
      // TO DO: make sure play() still starts from orig start position
    } else {
      this._pauseTime = 0;
    }
  }

  /**
   * Loop the SoundFile. Accepts optional parameters to set the
   * playback rate, playback volume, loopStart, loopEnd.
   *
   * @method loop
   * @for SoundFile
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

  /**
   * Set a SoundFile's looping flag to true or false. If the sound
   * is currently playing, this change will take effect when it
   * reaches the end of the current playback.
   *
   * @method setLoop
   * @for SoundFile
   * @param {Boolean} Boolean   set looping to true or false
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  setLoop(bool) {
    if (bool === true) {
      this._looping = true;
    } else if (bool === false) {
      this._looping = false;
    } else {
      throw 'Error: setLoop accepts either true or false';
    }
    if (this.bufferSourceNode) {
      this.bufferSourceNode.loop = this._looping;
      this._counterNode.loop = this._looping;
    }
  }

  /**
   * Returns 'true' if a SoundFile is currently looping and playing, 'false' if not.
   *
   * @method isLooping
   * @for SoundFile
   * @return {Boolean}
   * @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  isLooping() {
    if (!this.bufferSourceNode) {
      return false;
    }
    if (this._looping === true && this.isPlaying() === true) {
      return true;
    }
    return false;
  }

  /**
   *  Returns true if a SoundFile is playing, false if not (i.e.
   *  paused or stopped).
   *
   *  @method isPlaying
   *  @for SoundFile
   *  @return {Boolean}
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  isPlaying() {
    return this._playing;
  }

  /**
   *  Returns true if a SoundFile is paused, false if not (i.e.
   *  playing or stopped).
   *
   *  @method  isPaused
   *  @for SoundFile
   *  @return {Boolean}
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  isPaused() {
    return this._paused;
  }

  /**
   * Stop soundfile playback.
   *
   * @method stop
   * @for SoundFile
   * @param {Number} [startTime] (optional) schedule event to occur
   *                             in seconds from now
 * @example
 * <div><code>
 * function setup() {
 * console.log('TODO EXAMPLE');
 * }
 *
 * function draw() {
 * }
 * </code></div>
   */
  stop(timeFromNow) {
    let time = timeFromNow || 0;

    if (this.mode === 'sustain' || this.mode === 'untildone') {
      this.stopAll(time);
      this._playing = false;
      this.pauseTime = 0;
      this._paused = false;
    } else if (this.buffer && this.bufferSourceNode) {
      let now = audioContext.currentTime;
      this.pauseTime = 0;
      this.bufferSourceNode.stop(now + time);
      // this._counterNode.stop(now + time);
      this._playing = false;
      this._paused = false;
    }
  }

  /**
   *  Stop playback on all of this soundfile's sources.
   *  @private
   */
  stopAll(_time) {
    let now = audioContext.currentTime;
    let time = _time || 0;
    if (this.buffer && this.bufferSourceNode) {
      for (let i in this.bufferSourceNodes) {
        const bufferSourceNode = this.bufferSourceNodes[i];
        if (bufferSourceNode) {
          try {
            bufferSourceNode.stop(now + time);
          } catch (e) {
            // this was throwing errors only on Safari
          }
        }
      }
      // this._counterNode.stop(now + time);
    }
  }

  /**
   * It returns the volume of a sound, which is a measure
   * of how loud or quiet the sound is.
   *
   * @method getVolume
   * @for SoundFile
   * @return {Number}
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  getVolume() {
    return this.output.gain.value;
  }

  /**
   * Set the stereo panning of a p5.sound object to
   * a floating point number between -1.0 (left) and 1.0 (right).
   * Default is 0.0 (center).
   *
   * @method pan
   * @for SoundFile
   * @param {Number} panValue     Set the stereo panner
   * @param {Number} [timeFromNow]  schedule this event to happen
   *                                 seconds from now
   * @example
   * <div><code>
   *  let ballX = 0;
   *  let soundFile;
   *
   *  function preload() {
   *    soundFormats('ogg', 'mp3');
   *    soundFile = loadSound('assets/beatbox.mp3');
   *  }
   *
   *  function draw() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(canvasPressed);
   *    background(220);
   *    ballX = constrain(mouseX, 0, width);
   *    ellipse(ballX, height/2, 20, 20);
   *  }
   *
   *  function canvasPressed(){
   *    // map the ball's x location to a panning degree
   *    // between -1.0 (left) and 1.0 (right)
   *    let panning = map(ballX, 0., width,-1.0, 1.0);
   *    soundFile.pan(panning);
   *    soundFile.play();
   *  }
   *  </div></code>
   */
  pan(pval, tFromNow) {
    this.panner.pan(pval, tFromNow);
  }

  /**
   * Returns the current stereo pan position (-1.0 to 1.0)
   *
   * @method getPan
   * @for SoundFile
   * @return {Number} Returns the stereo pan setting of the Oscillator
   *                          as a number between -1.0 (left) and 1.0 (right).
   *                          0.0 is center and default.
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  getPan() {
    return this.panner.getPan();
  }

  /**
   *  Set the playback rate of a sound file. Will change the speed and the pitch.
   *  Values less than zero will reverse the audio buffer.
   *
   *  @method rate
   *  @for SoundFile
   *  @param {Number} [playbackRate]     Set the playback rate. 1.0 is normal,
   *                                     .5 is half-speed, 2.0 is twice as fast.
   *                                     Values less than zero play backwards.
   *  @example
   *  <div><code>
   *  let mySound;
   *
   *  function preload() {
   *    mySound = loadSound('assets/Damscray_DancingTiger.mp3');
   *  }
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(canvasPressed);
   *  }
   *  function canvasPressed() {
   *    mySound.loop();
   *  }
   *  function mouseReleased() {
   *    mySound.pause();
   *  }
   *  function draw() {
   *    background(220);
   *
   *    // Set the rate to a range between 0.1 and 4
   *    // Changing the rate also alters the pitch
   *    let playbackRate = map(mouseY, 0.1, height, 2, 0);
   *    playbackRate = constrain(playbackRate, 0.01, 4);
   *    mySound.rate(playbackRate);
   *
   *    line(0, mouseY, width, mouseY);
   *    text('rate: ' + round(playbackRate * 100) + '%', 10, 20);
   *  }
   *
   * </code>
   * </div>
   *
   */
  rate(playbackRate) {
    let reverse = false;
    if (typeof playbackRate === 'undefined') {
      return this.playbackRate;
    }

    this.playbackRate = playbackRate;

    if (playbackRate === 0) {
      playbackRate = 0.0000000000001;
    } else if (playbackRate < 0 && !this.reversed) {
      playbackRate = Math.abs(playbackRate);
      reverse = true;
    } else if (playbackRate > 0 && this.reversed) {
      reverse = true;
    }

    if (this.bufferSourceNode) {
      let now = audioContext.currentTime;
      this.bufferSourceNode.playbackRate.cancelScheduledValues(now);
      this.bufferSourceNode.playbackRate.linearRampToValueAtTime(
        Math.abs(playbackRate),
        now
      );
      this._counterNode.playbackRate.cancelScheduledValues(now);
      this._counterNode.playbackRate.linearRampToValueAtTime(
        Math.abs(playbackRate),
        now
      );
    }

    if (reverse) {
      this.reverseBuffer();
    }
    return this.playbackRate;
  }

  /**
   *  Pitch of a sound file can be changed by providing a MIDI note number.
   *  It will change the pitch and also the speed.
   *  If the input note is 60 (middle C), then frequency and speed is normal.
   *  If we increase the note input, then frequency and speed increases,
   *  and if we decrease the note input, then frequency and speed decreases.
   *
   *  @method setPitch
   *  @for SoundFile
   *  @param {Number} pitchRate     If the MIDI note is increased, then both the
   *                                frequency of the sound and its playback speed
   *                                will increase as a result.
   *  @example
   *  <div><code>
   *  let sound, sRate, midiVal;
   *  let midiNotes = [60, 64, 67, 72];
   *  let noteIndex = 0;
   *
   *  function preload() {
   *    sound = loadSound('assets/beat.mp3');
   *  }
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(startSound);
   *  }
   *
   *  function draw() {
   *    background(220);
   *    sRate = sound.rate();
   *    text('tap to play', 10, 20);
   *    if (midiVal) {
   *      text('MIDI: ' + midiVal, 10, 40);
   *      text('Rate: ' + sRate, 10, 60);
   *    }
   *  }
   *
   *  function startSound() {
   *    if (sound.isPlaying()) {
   *      sound.stop();
   *    }
   *    sound.play();
   *    midiVal = midiNotes[noteIndex % midiNotes.length];
   *    sound.setPitch(midiVal);
   *
   *    noteIndex++;
   *  }
   *  </code></div>
   */
  setPitch(num) {
    let newPlaybackRate = midiToFreq(num) / midiToFreq(60);
    this.rate(newPlaybackRate);
  }

  /**
   * Returns the current pitch of a sound file as a MIDI note.
   *
   * @method getPitch
   * @for SoundFile
   * @return {Number}  Current pitch of the SoundFile. The default note is assumed to
   *                   be 60 (middle C).
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  getPitch() {
    let freqValue = this.rate() * midiToFreq(60);
    return freqToMidi(freqValue);
  }

  /**
   * Returns the current playback rate of a sound file.
   *
   * @method getPlaybackRate
   * @for SoundFile
   * @return {Number}  Current playback rate of the SoundFile.
     *  @example
   *  <div><code>
   *  let mySound;
   *
   *  function preload() {
   *    mySound = loadSound('assets/Damscray_DancingTiger.mp3');
   *  }
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(canvasPressed);
   *  }
   *  function canvasPressed() {
   *    mySound.loop();
   *  }
   *  function mouseReleased() {
   *    mySound.pause();
   *  }
   *  function draw() {
   *    background(220);
   *
   *    let playbackRate = mySound.getPlaybackRate();
   *    text('rate: ' + round(playbackRate * 100) + '%', 10, 20);
   *  }
   *
   * </code>
   * </div>
   *
   */
  getPlaybackRate() {
    return this.playbackRate;
  }

  /**
   *  Multiply the output volume (amplitude) of a sound file
   *  between 0.0 (silence) and 1.0 (full volume).
   *  1.0 is the maximum amplitude of a digital sound, so multiplying
   *  by greater than 1.0 may cause digital distortion. To
   *  fade, provide a <code>rampTime</code> parameter. For more
   *  complex fades, see the Envelope class.
   *
   *  Alternately, you can pass in a signal source such as an
   *  oscillator to modulate the amplitude with an audio signal.
   *
   *  @method  setVolume
   *  @for SoundFile
   *  @param {Number|Object} volume  Volume (amplitude) between 0.0
   *                                     and 1.0 or modulating signal/oscillator
   *  @param {Number} [rampTime]  Fade for t seconds
   *  @param {Number} [timeFromNow]  Schedule this event to happen at
   *                                 t seconds in the future
  *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  setVolume(vol, _rampTime, _tFromNow) {
    if (typeof vol === 'number') {
      let rampTime = _rampTime || 0;
      let tFromNow = _tFromNow || 0;
      let now = audioContext.currentTime;
      let currentVol = this.output.gain.value;
      this.output.gain.cancelScheduledValues(now + tFromNow);
      this.output.gain.linearRampToValueAtTime(currentVol, now + tFromNow);
      this.output.gain.linearRampToValueAtTime(vol, now + tFromNow + rampTime);
    } else if (vol) {
      vol.connect(this.output.gain);
    } else {
      // return the Gain Node
      return this.output.gain;
    }
  }
  /**
   * Returns the duration of a sound file in seconds.
   *
   * @method duration
   * @for SoundFile
   * @return {Number} The duration of the soundFile in seconds.
    * @example
 * <div><code>
 * function setup() {
 * console.log('TODO EXAMPLE');
 * }
 *
 * function draw() {
 * }
 * </code></div>
   */
  duration() {
    // Return Duration
    if (this.buffer) {
      return this.buffer.duration;
    } else {
      return 0;
    }
  }

  /**
   * Return the current position of the SoundFile playhead, in seconds.
   * Time is relative to the normal buffer direction, so if `reverseBuffer`
   * has been called, currentTime will count backwards.
   *
   * @method currentTime
   * @for SoundFile
   * @return {Number}   currentTime of the soundFile in seconds.
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  currentTime() {
    return this.reversed
      ? Math.abs(this._lastPos - this.buffer.length) / audioContext.sampleRate
      : this._lastPos / audioContext.sampleRate;
  }

  /**
   * Move the playhead of a soundfile that is currently playing to a
   * new position and a new duration, in seconds.
   * If none are given, will reset the file to play entire duration
   * from start to finish. To set the position of a soundfile that is
   * not currently playing, use the `play` or `loop` methods.
   *
   * @method jump
   * @for SoundFile
   * @param {Number} cueTime    cueTime of the soundFile in seconds.
   * @param {Number} duration    duration in seconds.
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  jump(cueTime, duration) {
    if (cueTime < 0 || cueTime > this.buffer.duration) {
      throw 'jump time out of range';
    }
    if (duration > this.buffer.duration - cueTime) {
      throw 'end time out of range';
    }

    let cTime = cueTime || 0;
    let dur = duration || undefined;
    if (this.isPlaying()) {
      this.stop(0);
      this.play(0, this.playbackRate, this.output.gain.value, cTime, dur);
    }
  }

  /**
   * Return the number of channels in a sound file.
   * For example, Mono = 1, Stereo = 2.
   *
   * @method channels
   * @for SoundFile
   * @return {Number} [channels]
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  channels() {
    if (this.buffer) return this.buffer.numberOfChannels;
  }

  /**
   * Return the sample rate of the sound file.
   *
   * @method sampleRate
   * @for SoundFile
   * @return {Number} [sampleRate]
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  sampleRate() {
    if (this.buffer) return this.buffer.sampleRate;
  }

  /**
   * Return the number of samples in a sound file.
   * Equal to sampleRate * duration.
   *
   * @method frames
   * @for SoundFile
   * @return {Number} [sampleCount]
 * @example
 * <div><code>
 * function setup() {
 * console.log('TODO EXAMPLE');
 * }
 *
 * function draw() {
 * }
 * </code></div>
   */
  frames() {
    if (this.buffer) return this.buffer.length;
  }

  /**
   * Returns an array of amplitude peaks in a SoundFile that can be
   * used to draw a static waveform. Scans through the SoundFile's
   * audio buffer to find the greatest amplitudes. Accepts one
   * parameter, 'length', which determines size of the array.
   * Larger arrays result in more precise waveform visualizations.
   *
   * Inspired by Wavesurfer.js.
   *
   * @method  getPeaks
   * @for SoundFile
   * @params {Number} [length] length is the size of the returned array.
   *                          Larger length results in more precision.
   *                          Defaults to 5*width of the browser window.
   * @returns {Float32Array} Array of peaks.
 * @example
 * <div><code>
 * function setup() {
 * console.log('TODO EXAMPLE');
 * }
 *
 * function draw() {
 * }
 * </code></div>
   */
  getPeaks(length) {
    if (this.buffer) {
      // set length to window's width if no length is provided
      if (!length) {
        length = window.innerWidth * 5;
      }
      if (this.buffer) {
        let buffer = this.buffer;
        let sampleSize = buffer.length / length;
        let sampleStep = ~~(sampleSize / 10) || 1;
        let channels = buffer.numberOfChannels;
        let peaks = new Float32Array(Math.round(length));

        for (let c = 0; c < channels; c++) {
          let chan = buffer.getChannelData(c);
          for (let i = 0; i < length; i++) {
            let start = ~~(i * sampleSize);
            let end = ~~(start + sampleSize);
            let max = 0;
            for (let j = start; j < end; j += sampleStep) {
              let value = chan[j];
              if (value > max) {
                max = value;
                // faster than Math.abs
              } else if (-value > max) {
                max = value;
              }
            }
            if (c === 0 || Math.abs(max) > peaks[i]) {
              peaks[i] = max;
            }
          }
        }

        return peaks;
      }
    } else {
      throw 'Cannot load peaks yet, buffer is not loaded';
    }
  }

  /**
   *  Reverses the SoundFile's buffer source.
   *  Playback must be handled separately (see example).
   *
   *  @method  reverseBuffer
   *  @for SoundFile
   *  @example
   *  <div><code>
   *  let drum;
   *  function preload() {
   *    drum = loadSound('assets/drum.mp3');
   *  }
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(canvasPressed);
   *    background(220);
   *    text('tap to play', 20, 20);
   *  }
   *
   *  function canvasPressed() {
   *    drum.stop();
   *    drum.reverseBuffer();
   *    drum.play();
   *  }
   * </code>
   * </div>
   */
  reverseBuffer() {
    if (this.buffer) {
      let currentPos = this._lastPos / audioContext.sampleRate;
      let curVol = this.getVolume();
      this.setVolume(0, 0.001);

      const numChannels = this.buffer.numberOfChannels;
      for (let i = 0; i < numChannels; i++) {
        this.buffer.getChannelData(i).reverse();
      }
      // set reversed flag
      this.reversed = !this.reversed;

      if (this.isPlaying() && currentPos) {
        this.jump(this.duration() - currentPos);
      }
      this.setVolume(curVol, 0.001);
    } else {
      throw 'SoundFile is not done loading';
    }
  }

  /**
   *  Schedule an event to be called when the soundfile
   *  reaches the end of a buffer. If the soundfile is
   *  playing through once, this will be called when it
   *  ends. If it is looping, it will be called when
   *  stop is called.
   *
   *  @method  onended
   *  @for SoundFile
   *  @param  {Function} callback function to call when the
   *                              soundfile has ended.
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  onended(callback) {
    this._onended = callback;
    return this;
  }

  add() {
    // TO DO
  }

  dispose() {
    let now = audioContext.currentTime;

    // remove reference to soundfile
    let index = p5sound.soundArray.indexOf(this);
    p5sound.soundArray.splice(index, 1);

    this.stop(now);
    if (this.buffer && this.bufferSourceNode) {
      for (let i = 0; i < this.bufferSourceNodes.length - 1; i++) {
        if (this.bufferSourceNodes[i] !== null) {
          this.bufferSourceNodes[i].disconnect();
          try {
            this.bufferSourceNodes[i].stop(now);
          } catch (e) {
            console.warn('no buffer source node to dispose');
          }
          this.bufferSourceNodes[i] = null;
        }
      }
      if (this.isPlaying()) {
        try {
          // this._counterNode.stop(now);
        } catch (e) {
          console.log(e);
        }
        this._counterNode = null;
      }
    }
    if (this.output) {
      this.output.disconnect();
      this.output = null;
    }
    if (this.panner) {
      this.panner.dispose();
      this.panner = null;
    }
  }

  /**
   * Connects the output of a p5sound object to input of another
   * p5.sound object. For example, you may connect a SoundFile to an
   * FFT or an Effect. If no parameter is given, it will connect to
   * the main output. Most p5sound objects connect to the master
   * output when they are created.
   *
   * @method connect
   * @for SoundFile
   * @param {Object} [object] Audio object that accepts an input
 * @example
 * <div><code>
 * function setup() {
 * console.log('TODO EXAMPLE');
 * }
 *
 * function draw() {
 * }
 * </code></div>
   */
  connect(unit) {
    if (!unit) {
      // this.panner.connect(p5sound.input);
      this.output.connect(p5sound.input);
    } else {
      if (unit.hasOwnProperty('input')) {
        // this.panner.connect(unit.input);
        this.output.connect(unit.input);
      } else {
        // this.panner.connect(unit);
        this.output.connect(unit);
      }
    }
    if (unit && unit._onNewInput) {
      unit._onNewInput(this);
    }
  }

  /**
   * Disconnects the output of this p5sound object.
   *
   * @method disconnect
   * @for SoundFile
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  disconnect() {
    // if (this.panner) {
    if (this.output) {
      // this.panner.disconnect();
      this.output.disconnect();
    }
  }

  /**
   */
  getLevel() {
    console.warn(
      'SoundFile.getLevel has been removed from the library. Use p5.Amplitude instead'
    );
  }

  /**
   *  Reset the source for this SoundFile to a
   *  new path (URL).
   *
   *  @method  setPath
   *  @for SoundFile
   *  @param {String}   path     path to audio file
   *  @param {Function} callback Callback
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  setPath(p, callback) {
    let path = p5.prototype._checkFileFormats(p);
    this.url = path;
    this.load(callback);
  }

  /**
   *  Replace the current Audio Buffer with a new Buffer.
   *
   *  @method setBuffer
   *  @for SoundFile
   *  @param {Array} buf Array of Float32 Array(s). 2 Float32 Arrays
   *                     will create a stereo source. 1 will create
   *                     a mono source.
   * @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  setBuffer(buf) {
    let numChannels = buf.length;
    let size = buf[0].length;
    let newBuffer = audioContext.createBuffer(
      numChannels, size, audioContext.sampleRate);

    if (!(buf[0] instanceof Float32Array)) {
      buf[0] = new Float32Array(buf[0]);
    }

    for (let channelNum = 0; channelNum < numChannels; channelNum++) {
      let channel = newBuffer.getChannelData(channelNum);
      channel.set(buf[channelNum]);
    }

    this.buffer = newBuffer;
  }

  // initialize counterNode, set its initial buffer and playbackRate
  async _initCounterNode() {
    let self = this;
    // let now = audioContext.currentTime;
    // let cNode = audioContext.createBufferSource();

    // Reuse the worklet node rather than creating a new one. Even if we
    // disconnect it, it seems to leak and cause choppy audio after a
    // while.
    if (!self._workletNode) {
      // const workletBufferSize = safeBufferSize(256);
      const workletBufferSize = 256;
      self._workletNode = new AudioWorkletNode(
        audioContext,
        processorNames.soundFileProcessor,
        {
          processorOptions: { bufferSize: workletBufferSize }
        }
      );
      console.log('before', JSON.stringify(self._workletNode, null, 2));
      await self._workletNode.addModule('recorderProcessor.js');
      await self._workletNode.addModule('amplitudeProcessor.js');
      await self._workletNode.addModule('soundfileProcessor.js');
      console.log('after', JSON.stringify(self._workletNode, null, 2));

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

    // create counter buffer of the same length as self.buffer
    cNode.buffer = _createCounterBuffer(self.buffer);

    cNode.playbackRate.setValueAtTime(self.playbackRate, now);

    cNode.connect(self._workletNode);

    return cNode;
  }

  // initialize sourceNode, set its initial buffer and playbackRate
  _initSourceNode() {
    let bufferSourceNode = audioContext.createBufferSource();
    bufferSourceNode.buffer = this.buffer;
    bufferSourceNode.playbackRate.value = this.playbackRate;
    bufferSourceNode.connect(this.output);
    return bufferSourceNode;
  }

  processPeaks(callback, _initThreshold, _minThreshold, _minPeaks) {
    console.warn('processPeaks is deprecated');
  }

  /**
   *  Schedule events to trigger every time a MediaElement
   *  (audio/video) reaches a playback cue point.
   *
   *  Accepts a callback function, a time (in seconds) at which to trigger
   *  the callback, and an optional parameter for the callback.
   *
   *
   *  @method  addCue
   *  @for SoundFile
   *  @param {Number}   time     Time in seconds, relative to this media
   *                             element's playback. For example, to trigger
   *                             an event every time playback reaches two
   *                             seconds, pass in the number 2. This will be
   *                             passed as the first parameter to
   *                             the callback function.
   *  @param {Function} callback Name of a function that will be
   *                             called at the given time. The callback will
   *                             optionally receive the third argument as its
   *                             parameter.
   *  @param {Object} [value]    An object to be passed as the
   *                             optional parameter to the
   *                             callback function.
   *  @return {Number} id ID of this cue,
   *                      useful for removeCue(id)
   *  @example
   *  <div><code>
   *  let mySound;
   *  function preload() {
   *    mySound = loadSound('assets/Damscray_DancingTiger.mp3');
   *  }
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(canvasPressed);
   *    background(220);
   *    text('tap to play', 10, 20);
   *
   *    // schedule calls to changeText
   *    mySound.addCue(0, changeText, "hello" );
   *    mySound.addCue(0.5, changeText, "hello," );
   *    mySound.addCue(1, changeText, "hello, p5!");
   *    mySound.addCue(1.5, changeText, "hello, p5!!");
   *    mySound.addCue(2, changeText, "hello, p5!!!!!");
   *  }
   *
   *  function changeText(val) {
   *    background(220);
   *    text(val, 10, 20);
   *  }
   *
   *  function canvasPressed() {
   *    mySound.play();
   *  }
   *  </code></div>
   */
  addCue(time, callback, val) {
    let id = this._cueIDCounter++;

    let cue = new Cue(callback, time, id, val);
    this._cues.push(cue);

    // if (!this.elt.ontimeupdate) {
    //   this.elt.ontimeupdate = this._onTimeUpdate.bind(this);
    // }

    return id;
  }

  /**
   *  Remove a callback based on its ID. The ID is returned by the
   *  addCue method.
   *
   *  @method removeCue
   *  @for SoundFile
   *  @param  {Number} id ID of the cue, as returned by addCue
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  removeCue(id) {
    let cueLength = this._cues.length;
    for (let i = 0; i < cueLength; i++) {
      let cue = this._cues[i];
      if (cue.id === id) {
        this._cues.splice(i, 1);
        break;
      }
    }

    if (this._cues.length === 0) {
      // TO DO: remove callback
      // this.elt.ontimeupdate = null
    }
  }

  /**
   *  Remove all of the callbacks that had originally been scheduled
   *  via the addCue method.
   *
   *  @method  clearCues
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
  clearCues() {
    this._cues = [];
    // this.elt.ontimeupdate = null;
  }

  // private method that checks for cues to be fired if events
  // have been scheduled using addCue(callback, time).
  _onTimeUpdate(position) {
    let playbackTime = position / this.buffer.sampleRate;
    let cueLength = this._cues.length;

    for (let i = 0; i < cueLength; i++) {
      let cue = this._cues[i];
      let callbackTime = cue.time;
      let val = cue.val;
      let leftLimit = this._prevUpdateTime || 0;
      let rightLimit = playbackTime;
      if (leftLimit <= callbackTime && callbackTime <= rightLimit) {
        cue.callback(val);
      }
    }

    this._prevUpdateTime = playbackTime;
  }

  /**
   * Save a SoundFile as a .wav file. The browser will prompt the user
   * to download the file to their device. To upload a file to a server, see
   * <a href="/reference/#/SoundFile/getBlob">getBlob</a>
   *
   * @method save
   * @for SoundFile
   * @param  {String} [fileName]      name of the resulting .wav file.
   * @example
   *  <div><code>
   *  let mySound;
   *  function preload() {
   *    mySound = loadSound('assets/doorbell.mp3');
   *  }
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(canvasPressed);
   *    background(220);
   *    text('tap to download', 10, 20);
   *  }
   *
   *  function canvasPressed() {
   *    mySound.save('my cool filename');
   *  }
   * </code></div>
   */
  save(fileName) {
    p5.prototype.saveSound(this, fileName, 'wav');
  }

  /**
   * This method is useful for sending a SoundFile to a server. It returns the
   * .wav-encoded audio data as a "<a target="_blank" title="Blob reference at
   * MDN" href="https://developer.mozilla.org/en-US/docs/Web/API/Blob">Blob</a>".
   * A Blob is a file-like data object that can be uploaded to a server
   * with an <a href="/reference/#/p5/httpDo">http</a> request. We'll
   * use the `httpDo` options object to send a POST request with some
   * specific options: we encode the request as `multipart/form-data`,
   * and attach the blob as one of the form values using `FormData`.
   *
   *
   * @method getBlob
   * @for SoundFile
   * @returns {Blob} A file-like data object
   * @example
   *  <div><code>
   *  function preload() {
   *    mySound = loadSound('assets/doorbell.mp3');
   *  }
   *
   *  function setup() {
   *    noCanvas();
   *    let soundBlob = mySound.getBlob();
   *
   *    // Now we can send the blob to a server...
   *    let serverUrl = 'https://jsonplaceholder.typicode.com/posts';
   *    let httpRequestOptions = {
   *      method: 'POST',
   *      body: new FormData().append('soundBlob', soundBlob),
   *      headers: new Headers({
   *        'Content-Type': 'multipart/form-data'
   *      })
   *    };
   *    httpDo(serverUrl, httpRequestOptions);
   *
   *    // We can also create an `ObjectURL` pointing to the Blob
   *    let blobUrl = URL.createObjectURL(soundBlob);
   *
   *    // The `<Audio>` Element accepts Object URL's
   *    createAudio(blobUrl).showControls();
   *
   *    createDiv();
   *
   *    // The ObjectURL exists as long as this tab is open
   *    let input = createInput(blobUrl);
   *    input.attribute('readonly', true);
   *    input.mouseClicked(function() { input.elt.select() });
   *  }
   *
   * </code></div>
   */
  getBlob() {
    const dataView = convertToWav(this.buffer);
    return new Blob([dataView], { type: 'audio/wav' });
  }
}

/**
 *  loadSound() returns a new SoundFile from a specified
 *  path. If called during preload(), the SoundFile will be ready
 *  to play in time for setup() and draw(). If called outside of
 *  preload, the SoundFile will not be ready immediately, so
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
 *  @return {SoundFile}            Returns a SoundFile
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
