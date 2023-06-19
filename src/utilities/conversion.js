/**
 * @module Data
 * @submodule Conversion
 * @for p5
 * @requires core
 */

import p5 from '../core/main';


/**
 * Converts a boolean, string, or float to its integer representation.
 * When an array of values is passed in, then an int array of the same length
 * is returned.
 *
 * @method int
 * @param {String|Boolean|Number}       n value to parse
 * @param {Integer}       [radix] the radix to convert to (default: 10)
 * @return {Number}                     integer representation of value
 *
 * @example
 * <div class='norender'><code>
 * print(int('10')); // 10
 * print(int(10.31)); // 10
 * print(int(-10)); // -10
 * print(int(true)); // 1
 * print(int(false)); // 0
 * print(int([false, true, '10.3', 9.8])); // [0, 1, 10, 9]
 * print(int(Infinity)); // Infinity
 * print(int('-Infinity')); // -Infinity
 * </code></div>
 */
/**
 * @method int
 * @param {Array} ns                    values to parse
 * @param {Integer}       [radix]
 * @return {Number[]}                   integer representation of values
 */
p5.prototype.int = function(n, radix = 10) {
  if (n === Infinity || n === 'Infinity') {
    return Infinity;
  } else if (n === -Infinity || n === '-Infinity') {
    return -Infinity;
  } else if (typeof n === 'string') {
    return parseInt(n, radix);
  } else if (typeof n === 'number') {
    return n | 0;
  } else if (typeof n === 'boolean') {
    return n ? 1 : 0;
  } else if (n instanceof Array) {
    return n.map(n => p5.prototype.int(n, radix));
  }
};

export default p5;
