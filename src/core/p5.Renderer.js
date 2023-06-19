/**
 * @module Rendering
 * @submodule Rendering
 * @for p5
 */

import p5 from './main';
import * as constants from '../core/constants';

/**
 * Main and rendering context, as well as the base API
 * implementation for p5.js "core". To be used as the superclass for
 * Renderer2D and Renderer3D classes, respectively.
 *
 * @class p5.Renderer
 * @constructor
 * @extends p5.Element
 * @param {String} elt DOM node that is wrapped
 * @param {p5} [pInst] pointer to p5 instance
 * @param {Boolean} [isMainCanvas] whether we're using it as main canvas
 */
p5.Renderer = function (elt, pInst, isMainCanvas) {
  p5.Element.call(this, elt, pInst);
  this.canvas = elt;
  this._pixelsState = pInst;
  if (isMainCanvas) {
    this._isMainCanvas = true;
    // for pixel method sharing with pimage
    this._pInst._setProperty('_curElement', this);
    this._pInst._setProperty('canvas', this.canvas);
    this._pInst._setProperty('width', this.width);
    this._pInst._setProperty('height', this.height);
  } else {
    // hide if offscreen buffer by default
    this.canvas.style.display = 'none';
    this._styles = []; // non-main elt styles stored in p5.Renderer
  }

  this._ellipseMode = constants.CENTER;
  this._curveTightness = 0;

  this._doStroke = true;
  this._doFill = true;
  this._strokeSet = false;
  this._fillSet = false;
};

p5.Renderer.prototype = Object.create(p5.Element.prototype);

// the renderer should return a 'style' object that it wishes to
// store on the push stack.
p5.Renderer.prototype.push = function () {
  return {
    properties: {
      _doStroke: this._doStroke,
      _strokeSet: this._strokeSet,
      _doFill: this._doFill,
      _fillSet: this._fillSet,
      _imageMode: this._imageMode,
      _ellipseMode: this._ellipseMode
    }
  };
};

// a pop() operation is in progress
// the renderer is passed the 'style' object that it returned
// from its push() method.
p5.Renderer.prototype.pop = function (style) {
  if (style.properties) {
    // copy the style properties back into the renderer
    Object.assign(this, style.properties);
  }
};

/**
 * Resize our canvas element.s
 */
p5.Renderer.prototype.resize = function (w, h) {
  this.width = w;
  this.height = h;
  this.elt.width = w * this._pInst._pixelDensity;
  this.elt.height = h * this._pInst._pixelDensity;
  this.elt.style.width = `${w}px`;
  this.elt.style.height = `${h}px`;
  if (this._isMainCanvas) {
    this._pInst._setProperty('width', this.width);
    this._pInst._setProperty('height', this.height);
  }
};

p5.Renderer.prototype.get = function (x, y, w, h) {
  const pixelsState = this._pixelsState;
  const pd = pixelsState._pixelDensity;
  const canvas = this.canvas;

  if (typeof x === 'undefined' && typeof y === 'undefined') {
    // get()
    x = y = 0;
    w = pixelsState.width;
    h = pixelsState.height;
  } else {
    x *= pd;
    y *= pd;

    if (typeof w === 'undefined' && typeof h === 'undefined') {
      // get(x,y)
      if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
        return [0, 0, 0, 0];
      }

      return this._getPixel(x, y);
    }
    // get(x,y,w,h)
  }

  const region = new p5.Image(w, h);
  region.canvas
    .getContext('2d')
    .drawImage(canvas, x, y, w * pd, h * pd, 0, 0, w, h);

  return region;
};

p5.Renderer.prototype._applyDefaults = function () {
  return this;
};

export default p5.Renderer;
