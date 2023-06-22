/**
 * @module Color
 * @submodule Creating & Reading
 * @for p5
 * @requires core
 * @requires constants
 */

import p5sound from '../core/main';
import './p5sound.Color';

p5sound.prototype.color = function() {
  if (arguments[0] instanceof p5sound.Color) {
    return arguments[0]; // Do nothing if argument is already a color object.
  }

  const args = arguments[0] instanceof Array ? arguments[0] : arguments;
  return new p5sound.Color(this, args);
};

export default p5sound;
