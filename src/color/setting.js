/**
 * @module Color
 * @submodule Setting
 * @for p5
 * @requires core
 * @requires constants
 */

import p5 from '../core/main';
import './p5.Color';

/**
 * The <a href="#/p5/background">background()</a> function sets the color used
 * for the background of the p5.js canvas. The default background is transparent.
 * This function is typically used within <a href="#/p5/draw">draw()</a> to clear
 * the display window at the beginning of each frame, but it can be used inside
 * <a href="#/p5/setup">setup()</a> to set the background on the first frame of
 * animation or if the background need only be set once.
 *
 * The color is either specified in terms of the RGB, HSB, or HSL color depending
 * on the current <a href="#/p5/colorMode">colorMode</a>. (The default color space
 * is RGB, with each value in the range from 0 to 255). The alpha range by default
 * is also 0 to 255.<br><br>
 *
 * If a single string argument is provided, RGB, RGBA and Hex CSS color strings
 * and all named color strings are supported. In this case, an alpha number
 * value as a second argument is not supported, the RGBA form should be used.
 *
 * A <a href="#/p5.Color">p5.Color</a> object can also be provided to set the background color.
 *
 *
 * @method background
 * @param {p5.Color} color  any value created by the <a href="#/p5/color">color()</a> function
 * @chainable
 *
 * @example
 * <div>
 * <code>
 * // Grayscale integer value
 * background(51);
 * describe('canvas with darkest charcoal grey background');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // R, G & B integer values
 * background(255, 204, 0);
 * describe('canvas with yellow background');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // H, S & B integer values
 * colorMode(HSB);
 * background(255, 204, 100);
 * describe('canvas with royal blue background');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // Named SVG/CSS color string
 * background('red');
 * describe('canvas with red background');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // three-digit hexadecimal RGB notation
 * background('#fae');
 * describe('canvas with pink background');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // six-digit hexadecimal RGB notation
 * background('#222222');
 * describe('canvas with black background');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // integer RGB notation
 * background('rgb(0,255,0)');
 * describe('canvas with bright green background');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // integer RGBA notation
 * background('rgba(0,255,0, 0.25)');
 * describe('canvas with soft green background');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // percentage RGB notation
 * background('rgb(100%,0%,10%)');
 * describe('canvas with red background');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // percentage RGBA notation
 * background('rgba(100%,0%,100%,0.5)');
 * describe('canvas with light purple background');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // p5 Color object
 * background(color(0, 0, 255));
 * describe('canvas with blue background');
 * </code>
 * </div>
 *
 */

/**
 * @method background
 * @param {String} colorstring color string, possible formats include: integer
 *                         rgb() or rgba(), percentage rgb() or rgba(),
 *                         3-digit hex, 6-digit hex
 * @param {Number} [a]         opacity of the background relative to current
 *                             color range (default is 0-255)
 * @chainable
 */

/**
 * @method background
 * @param {Number} gray   specifies a value between white and black
 * @param {Number} [a]
 * @chainable
 */

/**
 * @method background
 * @param {Number} v1     red or hue value (depending on the current color
 *                        mode)
 * @param {Number} v2     green or saturation value (depending on the current
 *                        color mode)
 * @param {Number} v3     blue or brightness value (depending on the current
 *                        color mode)
 * @param  {Number} [a]
 * @chainable
 */

/**
 * @method background
 * @param  {Number[]}      values  an array containing the red, green, blue
 *                                 and alpha components of the color
 * @chainable
 */

/**
 * @method background
 * @param  {Number}  [a]
 * @chainable
 */
p5.prototype.background = function(...args) {
  this._renderer.background(...args);
  return this;
};


p5.prototype.clear = function(...args) {
  const _r = args[0] || 0;
  const _g = args[1] || 0;
  const _b = args[2] || 0;
  const _a = args[3] || 0;

  this._renderer.clear(_r, _g, _b, _a);
  return this;
};

/**
 * Sets the color used to fill shapes. For example, if you run fill(204, 102, 0),
 * all shapes drawn after the fill command will be filled with the color orange.
 * This color is either specified in terms of the RGB or HSB color depending on
 * the current <a href="#/p5/colorMode">colorMode()</a>. (The default color space
 * is RGB, with each value in the range from 0 to 255). The alpha range by default
 * is also 0 to 255.
 *
 * If a single string argument is provided, RGB, RGBA and Hex CSS color strings
 * and all named color strings are supported. In this case, an alpha number
 * value as a second argument is not supported, the RGBA form should be used.
 *
 * A <a href="#/p5.Color">p5.Color</a> object can also be provided to set the fill color.
 *
 * @method fill
 * @param  {Number}        v1      red or hue value relative to
 *                                 the current color range
 * @param  {Number}        v2      green or saturation value
 *                                 relative to the current color range
 * @param  {Number}        v3      blue or brightness value
 *                                 relative to the current color range
 * @param  {Number}        [alpha]
 * @chainable
 * @example
 * <div>
 * <code>
 * // Grayscale integer value
 * fill(51);
 * rect(20, 20, 60, 60);
 * describe('dark charcoal grey rect with black outline in center of canvas');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // R, G & B integer values
 * fill(255, 204, 0);
 * rect(20, 20, 60, 60);
 * describe('yellow rect with black outline in center of canvas');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // integer RGB notation
 * fill('rgb(0,255,0)');
 * rect(20, 20, 60, 60);
 * describe('bright green rect with black outline in center of canvas');
 * </code>
 * </div>
 *
 *
 * <div>
 * <code>
 * // p5 Color object
 * fill(color(0, 0, 255));
 * rect(20, 20, 60, 60);
 * describe('blue rect with black outline in center of canvas');
 * </code>
 * </div>
 */

/**
 * @method fill
 * @param  {String}        value   a color string
 * @chainable
 */

/**
 * @method fill
 * @param  {Number}        gray   a gray value
 * @param  {Number}        [alpha]
 * @chainable
 */

/**
 * @method fill
 * @param  {Number[]}      values  an array containing the red,green,blue &
 *                                 and alpha components of the color
 * @chainable
 */

/**
 * @method fill
 * @param  {p5.Color}      color   the fill color
 * @chainable
 */
p5.prototype.fill = function(...args) {
  this._renderer._setProperty('_fillSet', true);
  this._renderer._setProperty('_doFill', true);
  this._renderer.fill(...args);
  return this;
};

/**
 * Sets the color used to draw lines and borders around shapes. This color
 * is either specified in terms of the RGB or HSB color depending on the
 * current <a href="#/p5/colorMode">colorMode()</a> (the default color space
 * is RGB, with each value in the range from 0 to 255). The alpha range by
 * default is also 0 to 255.
 *
 * If a single string argument is provided, RGB, RGBA and Hex CSS color
 * strings and all named color strings are supported. In this case, an alpha
 * number value as a second argument is not supported, the RGBA form should be
 * used.
 *
 * A <a href="#/p5.Color">p5.Color</a> object can also be provided to set the stroke color.
 *
 * @method stroke
 * @param  {Number}        v1      red or hue value relative to
 *                                 the current color range
 * @param  {Number}        v2      green or saturation value
 *                                 relative to the current color range
 * @param  {Number}        v3      blue or brightness value
 *                                 relative to the current color range
 * @param  {Number}        [alpha]
 * @chainable
 *
 * @example
 * <div>
 * <code>
 * // Grayscale integer value
 * strokeWeight(4);
 * stroke(51);
 * rect(20, 20, 60, 60);
 * describe('White rect at center with dark charcoal grey outline.');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // R, G & B integer values
 * stroke(255, 204, 0);
 * strokeWeight(4);
 * rect(20, 20, 60, 60);
 * describe('White rect at center with yellow outline.');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // integer RGB notation
 * stroke('rgb(0,255,0)');
 * strokeWeight(4);
 * rect(20, 20, 60, 60);
 * describe('White rect at center with bright green outline.');
 * </code>
 * </div>
 *
 */

/**
 * @method stroke
 * @param  {String}        value   a color string
 * @chainable
 */

/**
 * @method stroke
 * @param  {Number}        gray   a gray value
 * @param  {Number}        [alpha]
 * @chainable
 */

/**
 * @method stroke
 * @param  {Number[]}      values  an array containing the red,green,blue &
 *                                 and alpha components of the color
 * @chainable
 */

/**
 * @method stroke
 * @param  {p5.Color}      color   the stroke color
 * @chainable
 */

p5.prototype.stroke = function(...args) {
  this._renderer._setProperty('_strokeSet', true);
  this._renderer._setProperty('_doStroke', true);
  this._renderer.stroke(...args);
  return this;
};

export default p5;
