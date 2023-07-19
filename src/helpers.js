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

export { _checkFileFormats };