var spec = {
  color: ['color_conversion', 'creating_reading', 'p5.Color', 'setting'],
  core: [
    '2d_primitives',
    'attributes',
    'curves',
    'environment',
    'error_helpers',
    'main',
    'p5.Element',
    'p5.Graphics',
    'preload',
    'rendering',
    'structure',
    'transform',
    'version',
    'vertex'
  ],
  image: ['p5.Image', 'loading', 'pixels', 'filters', 'downloading'],
  math: ['calculation', 'noise', 'p5.Vector', 'random', 'trigonometry'],
  utilities: ['array_functions', 'conversion'],
  webgl: [
    '3d_primitives',
    'interaction',
    'p5.Matrix',
    'p5.Camera',
    'p5.Framebuffer',
    'p5.Geometry',
    'p5.RendererGL',
    'p5.Shader',
    'p5.Texture'
  ]
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
