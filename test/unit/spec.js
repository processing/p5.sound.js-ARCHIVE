var spec = {
  color: ['color_conversion', 'creating_reading', 'p5.Color', 'setting'],
  core: [
    '2d_primitives',
    'attributes',
    'environment',
    'error_helpers',
    'main',
    'p5.Element',
    'preload',
    'rendering',
    'structure',
    'transform',
    'version'
  ],
  image: ['p5.Image', 'loading', 'pixels', 'filters', 'downloading'],
  math: ['calculation', 'noise', 'p5.Vector', 'random', 'trigonometry'],
  utilities: ['array_functions', 'conversion']
};
Object.keys(spec).map(function(folder) {
  spec[folder].map(function(file) {
    var string = [
      '<script src="unit/',
      folder,
      '/',
      file,
      '.js" type="text/javascript" ></script>'
    ];
    document.write(string.join(''));
  });
});
