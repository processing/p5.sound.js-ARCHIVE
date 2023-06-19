/**
 * @module Rendering
 * @submodule Rendering
 * @for p5
 */

import p5 from './main';
import * as constants from './constants';
import './p5.Renderer2D';
let defaultId = 'defaultCanvas0'; // this gets set again in createCanvas
const defaultClass = 'p5Canvas';

/**
 * Creates a canvas element in the document and sets its dimensions
 * in pixels. This method should be called only once at the start of <a href="#/p5/setup">setup()</a>.
 * Calling <a href="#/p5/createCanvas">createCanvas</a> more than once in a
 * sketch will result in very unpredictable behavior.
 *
 * Important note: in 2D mode (i.e. when `p5.Renderer` is not set) the origin (0,0)
 * is positioned at the top left of the screen. In 3D mode (i.e. when `p5.Renderer`
 * is set to `WEBGL`), the origin is positioned at the center of the canvas.
 * See [this issue](https://github.com/processing/p5.js/issues/1545) for more information.
 *
 * A WebGL canvas will use a WebGL2 context if it is supported by the browser.
 * Check the <a href="#/p5/webglVersion">webglVersion</a> property to check what
 * version is being used, or call <a href="#/p5/setAttributes">setAttributes({ version: 1 })</a>
 * to create a WebGL1 context.
 *
 * The system variables width and height are set by the parameters passed to this
 * function. If <a href="#/p5/createCanvas">createCanvas()</a> is not used, the
 * window will be given a default size of 100×100 pixels.
 *
 * For more ways to position the canvas, see the
 * <a href='https://github.com/processing/p5.js/wiki/Positioning-your-canvas'>
 * positioning the canvas</a> wiki page.
 *
 * @method createCanvas
 * @param  {Number} w width of the canvas
 * @param  {Number} h height of the canvas
 * @param  {Constant} [renderer] either P2D or WEBGL
 * @return {p5.Renderer} pointer to p5.Renderer holding canvas
 * @example
 * <div>
 * <code>
 * function setup() {
 *   createCanvas(100, 50);
 *   background(153);
 *   line(0, 0, width, height);
 * }
 * </code>
 * </div>
 *
 * @alt
 * Black line extending from top-left of canvas to bottom right.
 */
p5.prototype.createCanvas = function(w, h, renderer) {
  //optional: renderer, otherwise defaults to p2d
  const r = renderer || constants.P2D;
  let c;

  if (r === constants.WEBGL) {
    c = document.getElementById(defaultId);
    if (c) {
      //if defaultCanvas already exists
      c.parentNode.removeChild(c); //replace the existing defaultCanvas
      const thisRenderer = this._renderer;
      this._elements = this._elements.filter(e => e !== thisRenderer);
    }
    c = document.createElement('canvas');
    c.id = defaultId;
    c.classList.add(defaultClass);
  } else {
    if (!this._defaultGraphicsCreated) {
      c = document.createElement('canvas');
      let i = 0;
      while (document.getElementById(`defaultCanvas${i}`)) {
        i++;
      }
      defaultId = `defaultCanvas${i}`;
      c.id = defaultId;
      c.classList.add(defaultClass);
    } else {
      // resize the default canvas if new one is created
      c = this.canvas;
    }
  }

  // set to invisible if still in setup (to prevent flashing with manipulate)
  if (!this._setupDone) {
    c.dataset.hidden = true; // tag to show later
    c.style.visibility = 'hidden';
  }

  if (this._userNode) {
    // user input node case
    this._userNode.appendChild(c);
  } else {
    //create main element
    if (document.getElementsByTagName('main').length === 0) {
      let m = document.createElement('main');
      document.body.appendChild(m);
    }
    //append canvas to main
    document.getElementsByTagName('main')[0].appendChild(c);
  }

  // Init our renderer
  //P2D mode
  if (!this._defaultGraphicsCreated) {
    this._setProperty('_renderer', new p5.Renderer2D(c, this, true));
    this._defaultGraphicsCreated = true;
    this._elements.push(this._renderer);
  }
  this._renderer.resize(w, h);
  this._renderer._applyDefaults();
  return this._renderer;
};

export default p5;
