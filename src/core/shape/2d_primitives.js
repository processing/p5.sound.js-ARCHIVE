/**
 * @module Shape
 * @submodule 2D Primitives
 * @for p5
 * @requires core
 * @requires constants
 */

import p5 from '../main';

/**
 * Draws an ellipse (oval) to the canvas. An ellipse with equal width and height
 * is a circle. By default, the first two parameters set the location of the
 * center of the ellipse. The third and fourth parameters set the shape's width
 * and height, respectively. The origin may be changed with the
 * <a href="#/p5/ellipseMode">ellipseMode()</a> function.
 *
 * If no height is specified, the value of width is used for both the width and
 * height. If a negative height or width is specified, the absolute value is
 * taken.
 *
 * @method ellipse
 * @param  {Number} x x-coordinate of the center of the ellipse.
 * @param  {Number} y y-coordinate of the center of the ellipse.
 * @param  {Number} w width of the ellipse.
 * @param  {Number} [h] height of the ellipse.
 * @chainable
 * @example
 * <div>
 * <code>
 * ellipse(56, 46, 55, 55);
 * describe('A white ellipse with black outline in middle of a gray canvas.');
 * </code>
 * </div>
 *
 */

/**
 * @method ellipse
 * @param  {Number} x
 * @param  {Number} y
 * @param  {Number} w
 * @param  {Number} h
 */
p5.prototype.ellipse = function(x, y, w, h) {
  return this._renderEllipse(...arguments);
};

// internal method for drawing ellipses (without parameter validation)
p5.prototype._renderEllipse = function(x, y, w, h) {
  // if the current stroke and fill settings wouldn't result in something
  // visible, exit immediately
  if (!this._renderer._doStroke && !this._renderer._doFill) {
    return this;
  }

  // p5 supports negative width and heights for rects
  if (w < 0) {
    w = Math.abs(w);
  }

  if (typeof h === 'undefined') {
    // Duplicate 3rd argument if only 3 given.
    h = w;
  } else if (h < 0) {
    h = Math.abs(h);
  }
  this._renderer.ellipse([x, y, w, h]);

  //accessible Outputs
  if (this._accessibleOutputs.grid || this._accessibleOutputs.text) {
    this._accsOutput('ellipse', [vals.x, vals.y, vals.w, vals.h]);
  }

  return this;
};

export default p5;
