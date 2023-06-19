// core
import p5 from './core/main';
import './core/constants';
import './core/environment';
import './core/friendly_errors/stacktrace';
import './core/friendly_errors/validate_params';
import './core/friendly_errors/file_errors';
import './core/friendly_errors/fes_core';
import './core/friendly_errors/sketch_reader';
import './core/helpers';
import './core/legacy';
import './core/preload';
import './core/p5.Element';
import './core/p5.Renderer';
import './core/p5.Renderer2D';
import './core/rendering';
import './core/shim';
import './core/structure';
import './core/transform';
import './core/shape/2d_primitives';
import './core/shape/attributes';

// color
import './color/color_conversion';
import './color/creating_reading';
import './color/p5.Color';
import './color/setting';

// image
import './image/filters';
import './image/image';
import './image/loading_displaying';
import './image/p5.Image';
import './image/pixels';

// utilities
import './utilities/array_functions';
import './utilities/conversion';

// webgl
import './webgl/3d_primitives';
import './webgl/interaction';
import './webgl/loading';
import './webgl/material';
import './webgl/p5.Camera';
import './webgl/p5.Geometry';
import './webgl/p5.Matrix';
import './webgl/p5.RendererGL.Immediate';
import './webgl/p5.RendererGL';
import './webgl/p5.RendererGL.Retained';
import './webgl/p5.Shader';
import './webgl/p5.RenderBuffer';
import './webgl/p5.Texture';
import './webgl/text';

import './core/init';

module.exports = p5;
