import p5sound from './main';

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
  for (var i = 0; i < arguments.length; i++) {
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
              var p = pathSplit[i];
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

export {
  _checkFileFormats,
  soundFormats
};