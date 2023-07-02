/**
 * This module has shims
 */

/* AudioContext Monkeypatch
     Copyright 2013 Chris Wilson
     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at
         http://www.apache.org/licenses/LICENSE-2.0
     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
  */

/**
 * Determine which filetypes are supported (inspired by buzz.js)
 * The audio element (el) will only be used to test browser support for various audio formats
 */
let el = document.createElement('audio');

p5.prototype.isSupported = function () {
  return !!el.canPlayType;
};
var isOGGSupported = function () {
  return !!el.canPlayType && el.canPlayType('audio/ogg; codecs="vorbis"');
};
var isMP3Supported = function () {
  return !!el.canPlayType && el.canPlayType('audio/mpeg;');
};
var isWAVSupported = function () {
  return !!el.canPlayType && el.canPlayType('audio/wav; codecs="1"');
};
var isAACSupported = function () {
  return (
    !!el.canPlayType &&
    (el.canPlayType('audio/x-m4a;') || el.canPlayType('audio/aac;'))
  );
};
let isAIFSupported = function () {
  return !!el.canPlayType && el.canPlayType('audio/x-aiff;');
};
p5.prototype.isFileSupported = function (extension) {
  switch (extension.toLowerCase()) {
    case 'mp3':
      return isMP3Supported();
    case 'wav':
      return isWAVSupported();
    case 'ogg':
      return isOGGSupported();
    case 'aac':
    case 'm4a':
    case 'mp4':
      return isAACSupported();
    case 'aif':
    case 'aiff':
      return isAIFSupported();
    default:
      return false;
  }
};
