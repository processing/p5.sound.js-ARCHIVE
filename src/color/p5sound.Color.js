/**
 * @module Color
 * @submodule Creating & Reading
 * @for p5
 * @requires core
 * @requires constants
 */

import p5sound from '../core/main';
import * as constants from '../core/constants';

/**
 * CSS named colors.
 */
const namedColors = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkgrey: '#a9a9a9',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  grey: '#808080',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32'
};

/**
 * These regular expressions are used to build up the patterns for matching
 * viable CSS color strings: fragmenting the regexes in this way increases the
 * legibility and comprehensibility of the code.
 *
 * Note that RGB values of .9 are not parsed by IE, but are supported here for
 * color string consistency.
 */
const WHITESPACE = /\s*/; // Match zero or more whitespace characters.
const INTEGER = /(\d{1,3})/; // Match integers: 79, 255, etc.

/**
 * Full color string patterns. The capture groups are necessary.
 */
const colorPatterns = {

  // Match colors in format rgb(R, G, B), e.g. rgb(255, 0, 128).
  RGB: new RegExp(
    [
      '^rgb\\(',
      INTEGER.source,
      ',',
      INTEGER.source,
      ',',
      INTEGER.source,
      '\\)$'
    ].join(WHITESPACE.source),
    'i'
  )
};

/**
 * Each color stores the color mode and level maxes that were applied at the
 * time of its construction. These are used to interpret the input arguments
 * (at construction and later for that instance of color) and to format the
 * output e.g. when <a href="#/p5/saturation">saturation()</a> is requested.
 *
 * Internally, we store an array representing the ideal RGBA values in floating
 * point form, normalized from 0 to 1. From this we calculate the closest
 * screen color (RGBA levels from 0 to 255) and expose this to the renderer.
 *
 * We also cache normalized, floating-point components of the color in various
 * representations as they are calculated. This is done to prevent repeating a
 * conversion that has already been performed.
 *
 * <a href="#/p5/color">color()</a> is the recommended way to create an instance
 * of this class. However, one can also create a color instace from the constructor
 * using the parameters below.
 *
 * @class p5sound.Color
 * @constructor
 * @param {p5sound} [pInst]                      pointer to p5sound instance.
 *
 * @param {Number[]|String} vals            an array containing the color values
 *                                          for red, green, blue and alpha channel
 *                                          or CSS color.
 */
p5sound.Color = class Color {
  constructor(pInst, vals) {
    // Record color mode and maxes at time of construction.
    this._storeModeAndMaxes(pInst._colorMode, pInst._colorMaxes);

    // Calculate normalized RGBA values.
    if (![constants.RGB].includes(this.mode)) {
      throw new Error(`${this.mode} is an invalid colorMode.`);
    } else {
      this._array = Color._parseInputs.apply(this, vals);
    }

    // Expose closest screen color.
    this._calculateLevels();
  }

  // calculates and stores the closest screen levels
  _calculateLevels() {
    const array = this._array;
    // (loop backwards for performance)
    const levels = (this.levels = new Array(array.length));
    for (let i = array.length - 1; i >= 0; --i) {
      levels[i] = Math.round(array[i] * 255);
    }

  }

  // stores the color mode and maxes in this instance of Color
  // for later use (by _parseInputs())
  _storeModeAndMaxes(new_mode, new_maxes) {
    this.mode = new_mode;
    this.maxes = new_maxes;
  }

  _getMaxes() {
    return this.maxes;
  }

  /**
 * For a number of different inputs, returns a color formatted as [r, g, b, a]
 * arrays, with each component normalized between 0 and 1.
 *
 * @private
 * @param {Array} [...args] An 'array-like' object that represents a list of
 *                          arguments
 * @return {Number[]}       a color formatted as [r, g, b, a]
 *                          Example:
 *                          input        ==> output
 *                          g            ==> [g, g, g, 255]
 *                          g,a          ==> [g, g, g, a]
 *                          r, g, b      ==> [r, g, b, 255]
 *                          r, g, b, a   ==> [r, g, b, a]
 *                          [g]          ==> [g, g, g, 255]
 *                          [g, a]       ==> [g, g, g, a]
 *                          [r, g, b]    ==> [r, g, b, 255]
 *                          [r, g, b, a] ==> [r, g, b, a]
 * @example
 * <div>
 * <code>
 * // todo
 * //
 * // describe('');
 * </code>
 * </div>
 */
  static _parseInputs(r, g, b, a) {
    const numArgs = arguments.length;
    const mode = this.mode;
    const maxes = this.maxes[mode];
    let results = [];
    let i;

    if (numArgs >= 3) {
      // Argument is a list of component values.

      results[0] = r / maxes[0];
      results[1] = g / maxes[1];
      results[2] = b / maxes[2];

      // Alpha may be undefined, so default it to 100%.
      if (typeof a === 'number') {
        results[3] = a / maxes[3];
      } else {
        results[3] = 1;
      }

      // Constrain components to the range [0,1].
      // (loop backwards for performance)
      for (i = results.length - 1; i >= 0; --i) {
        const result = results[i];
        if (result < 0) {
          results[i] = 0;
        } else if (result > 1) {
          results[i] = 1;
        }
      }


    } else if (numArgs === 1 && typeof r === 'string') {
      const str = r.trim().toLowerCase();

      // Return if string is a named colour.
      if (namedColors[str]) {
        return Color._parseInputs.call(this, namedColors[str]);
      }

      if (colorPatterns.RGB.test(str)) {
        // rgb(R,G,B)
        results = colorPatterns.RGB.exec(str)
          .slice(1)
          .map(color => color / 255);
        results[3] = 1;
        return results;
      }



      // Input did not match any CSS color pattern: default to white.
      results = [1, 1, 1, 1];
    } else if ((numArgs === 1 || numArgs === 2) && typeof r === 'number') {
      // 'Grayscale' mode.

      /**
       * For HSB and HSL, interpret the gray level as a brightness/lightness
       * value (they are equivalent when chroma is zero). For RGB, normalize the
       * gray level according to the blue maximum.
       */
      results[0] = r / maxes[2];
      results[1] = r / maxes[2];
      results[2] = r / maxes[2];

      // Alpha may be undefined, so default it to 100%.
      if (typeof g === 'number') {
        results[3] = g / maxes[3];
      } else {
        results[3] = 1;
      }

      // Constrain components to the range [0,1].
      results = results.map(value => Math.max(Math.min(value, 1), 0));
    } else {
      throw new Error(`${arguments}is not a valid color representation.`);
    }

    return results;
  }
};

export default p5sound.Color;
