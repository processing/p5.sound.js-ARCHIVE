let spec = {
  core: [
    '2d_primitives',
    'attributes',
    'environment',
    'error_helpers',
    'main',
    'preload',
    'rendering',
    'structure',
    'version'
  ]
};
Object.keys(spec).map(function(folder) {
  spec[folder].map(function(file) {
    let string = [
      '<script src="unit/',
      folder,
      '/',
      file,
      '.js" type="text/javascript" ></script>'
    ];
    document.write(string.join(''));
  });
});
