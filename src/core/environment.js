/**
 * @module Environment
 * @submodule Environment
 * @for p5
 * @requires core
 * @requires constants
 */

import p5 from './main';
import * as C from './constants';

const standardCursors = [C.ARROW, C.CROSS, C.HAND, C.MOVE, C.TEXT, C.WAIT];

p5.prototype._frameRate = 0;
p5.prototype._lastFrameTime = window.performance.now();
p5.prototype._targetFrameRate = 60;

/**
 * The system variable <a href="#/p5/frameCount">frameCount</a> contains the
 * number of frames that have been displayed since the program started. Inside
 * <a href="#/p5/setup">setup()</a> the value is 0, after the first iteration
 * of <a href="#/p5/draw">draw()</a> it is 1, etc.
 *
 * @property {Integer} frameCount
 * @readOnly
 * @example
 * <div><code>
 * function setup() {
 *   frameRate(30);
 *   textSize(30);
 *   textAlign(CENTER);
 * }
 *
 * function draw() {
 *   background(200);
 *   text(frameCount, width / 2, height / 2);
 * }
 * </code></div>
 *
 * @alt
 * numbers rapidly counting upward with frame count set to 30.
 */
p5.prototype.frameCount = 0;

/**
 * The system variable <a href="#/p5/deltaTime">deltaTime</a> contains the time
 * difference between the beginning of the previous frame and the beginning
 * of the current frame in milliseconds.
 *
 * This variable is useful for creating time sensitive animation or physics
 * calculation that should stay constant regardless of frame rate.
 *
 * @property {Integer} deltaTime
 * @readOnly
 * @example
 * <div><code>
 * let rectX = 0;
 * let fr = 30; //starting FPS
 * let clr;
 *
 * function setup() {
 *   background(200);
 *   frameRate(fr); // Attempt to refresh at starting FPS
 *   clr = color(255, 0, 0);
 * }
 *
 * function draw() {
 *   background(200);
 *   rectX = rectX + 1 * (deltaTime / 50); // Move Rectangle in relation to deltaTime
 *
 *   if (rectX >= width) {
 *     // If you go off screen.
 *     if (fr === 30) {
 *       clr = color(0, 0, 255);
 *       fr = 10;
 *       frameRate(fr); // make frameRate 10 FPS
 *     } else {
 *       clr = color(255, 0, 0);
 *       fr = 30;
 *       frameRate(fr); // make frameRate 30 FPS
 *     }
 *     rectX = 0;
 *   }
 *   fill(clr);
 *   rect(rectX, 40, 20, 20);
 * }
 * </code></div>
 *
 * @alt
 * red rect moves left to right, followed by blue rect moving at the same speed
 * with a lower frame rate. Loops.
 */
p5.prototype.deltaTime = 0;

/**
 * Confirms if the window a p5.js program is in is "focused," meaning that
 * the sketch will accept mouse or keyboard input. This variable is
 * "true" if the window is focused and "false" if not.
 *
 * @property {Boolean} focused
 * @readOnly
 * @example
 * <div><code>
 * // To demonstrate, put two windows side by side.
 * // Click on the window that the p5 sketch isn't in!
 * function draw() {
 *   background(200);
 *   noStroke();
 *   fill(0, 200, 0);
 *   ellipse(25, 25, 50, 50);
 *
 *   if (!focused) {
    // or "if (focused === false)"
 *     stroke(200, 0, 0);
 *     line(0, 0, 100, 100);
 *     line(100, 0, 0, 100);
 *   }
 * }
 * </code></div>
 *
 * @alt
 * green 50×50 ellipse at top left. Red X covers canvas when page focus changes
 */
p5.prototype.focused = document.hasFocus();

/**
 * Sets the cursor to a predefined symbol or an image, or makes it visible
 * if already hidden. If you are trying to set an image as the cursor, the
 * recommended size is 16×16 or 32×32 pixels. The values for parameters x and y
 * must be less than the dimensions of the image.
 *
 * @method cursor
 * @param {String|Constant} type Built-In: either ARROW, CROSS, HAND, MOVE, TEXT and WAIT
 *                               Native CSS properties: 'grab', 'progress', 'cell' etc.
 *                               External: path for cursor's images
 *                               (Allowed File extensions: .cur, .gif, .jpg, .jpeg, .png)
 *                               For more information on Native CSS cursors and url visit:
 *                               https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
 * @param {Number}          [x]  the horizontal active spot of the cursor (must be less than 32)
 * @param {Number}          [y]  the vertical active spot of the cursor (must be less than 32)
 * @example
 * <div><code>
 * // Move the mouse across the quadrants
 * // to see the cursor change
 * function draw() {
 *   line(width / 2, 0, width / 2, height);
 *   line(0, height / 2, width, height / 2);
 *   if (mouseX < 50 && mouseY < 50) {
 *     cursor(CROSS);
 *   } else if (mouseX > 50 && mouseY < 50) {
 *     cursor('progress');
 *   } else if (mouseX > 50 && mouseY > 50) {
 *     cursor('https://avatars0.githubusercontent.com/u/1617169?s=16');
 *   } else {
 *     cursor('grab');
 *   }
 * }
 * </code></div>
 *
 * @alt
 * canvas is divided into four quadrants. cursor on first is a cross, second is a progress,
 * third is a custom cursor using path to the cursor and fourth is a grab.
 */
p5.prototype.cursor = function(type, x, y) {
  let cursor = 'auto';
  const canvas = this._curElement.elt;
  if (standardCursors.includes(type)) {
    // Standard css cursor
    cursor = type;
  } else if (typeof type === 'string') {
    let coords = '';
    if (x && y && (typeof x === 'number' && typeof y === 'number')) {
      // Note that x and y values must be unit-less positive integers < 32
      // https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
      coords = `${x} ${y}`;
    }
    if (
      type.substring(0, 7) === 'http://' ||
      type.substring(0, 8) === 'https://'
    ) {
      // Image (absolute url)
      cursor = `url(${type}) ${coords}, auto`;
    } else if (/\.(cur|jpg|jpeg|gif|png|CUR|JPG|JPEG|GIF|PNG)$/.test(type)) {
      // Image file (relative path) - Separated for performance reasons
      cursor = `url(${type}) ${coords}, auto`;
    } else {
      // Any valid string for the css cursor property
      cursor = type;
    }
  }
  canvas.style.cursor = cursor;
};

/**
 * Specifies the number of frames to be displayed every second. For example,
 * the function call frameRate(30) will attempt to refresh 30 times a second.
 * If the processor is not fast enough to maintain the specified rate, the
 * frame rate will not be achieved. Setting the frame rate within
 * <a href="#/p5/setup">setup()</a> is recommended. The default frame rate is
 * based on the frame rate of the display (here also called "refresh rate"),
 * which is set to 60 frames per second on most computers. A frame rate of 24
 * frames per second (usual for movies) or above will be enough for smooth
 * animations. This is the same as setFrameRate(val).
 *
 * Calling <a href="#/p5/frameRate">frameRate()</a> with no arguments returns
 * the current framerate. The draw function must run at least once before it will
 * return a value. This is the same as <a href="#/p5/getFrameRate">getFrameRate()</a>.
 *
 * Calling <a href="#/p5/frameRate">frameRate()</a> with arguments that are not
 * of the type Number or are non-positive also returns current framerate.
 *
 * @method frameRate
 * @param  {Number} fps number of frames to be displayed every second
 * @chainable
 *
 * @example
 *
 * <div><code>
 * let rectX = 0;
 * let fr = 30; //starting FPS
 * let clr;
 *
 * function setup() {
 *   background(200);
 *   frameRate(fr); // Attempt to refresh at starting FPS
 *   clr = color(255, 0, 0);
 * }
 *
 * function draw() {
 *   background(200);
 *   rectX += 1; // Move Rectangle
 *
 *   if (rectX >= width) {
    // If you go off screen.
 *     if (fr === 30) {
 *       clr = color(0, 0, 255);
 *       fr = 10;
 *       frameRate(fr); // make frameRate 10 FPS
 *     } else {
 *       clr = color(255, 0, 0);
 *       fr = 30;
 *       frameRate(fr); // make frameRate 30 FPS
 *     }
 *     rectX = 0;
 *   }
 *   fill(clr);
 *   rect(rectX, 40, 20, 20);
 * }
 * </code></div>
 *
 * @alt
 * blue rect moves left to right, followed by red rect moving faster. Loops.
 */
/**
 * @method frameRate
 * @return {Number}       current frameRate
 */
p5.prototype.frameRate = function(fps) {
  if (typeof fps !== 'number' || fps < 0) {
    return this._frameRate;
  } else {
    this._setProperty('_targetFrameRate', fps);
    if (fps === 0) {
      this._setProperty('_frameRate', fps);
    }
    return this;
  }
};

/**
 * Returns the current framerate.
 *
 * @private
 * @return {Number} current frameRate
 */
p5.prototype.getFrameRate = function() {
  return this.frameRate();
};

/**
 * Specifies the number of frames to be displayed every second. For example,
 * the function call frameRate(30) will attempt to refresh 30 times a second.
 * If the processor is not fast enough to maintain the specified rate, the
 * frame rate will not be achieved. Setting the frame rate within <a href="#/p5/setup">setup()</a> is
 * recommended. The default rate is 60 frames per second.
 *
 * Calling <a href="#/p5/frameRate">frameRate()</a> with no arguments returns the current framerate.
 *
 * @private
 * @param {Number} [fps] number of frames to be displayed every second
 */
p5.prototype.setFrameRate = function(fps) {
  return this.frameRate(fps);
};

/**
 * Returns _targetFrameRate variable. The default _targetFrameRate is set to 60.
 * This could be changed by calling frameRate() and setting it to the desired
 * value. When getTargetFrameRate() is called, it should return the value that was set.
 * @method getTargetFrameRate
 * @return {Number} _targetFrameRate
 * @example
 * <div><code>
 * function draw() {
 *   frameRate(20);
 *   text(getTargetFrameRate(), width / 2, height / 2);
 * }
 * </code></div>
 */
p5.prototype.getTargetFrameRate = function() {
  return this._targetFrameRate;
};


/**
 * System variable that stores the width of the screen display according to The
 * default <a href="#/p5/pixelDensity">pixelDensity</a>. This is used to run a
 * full-screen program on any display size. To return actual screen size,
 * multiply this by pixelDensity.
 *
 * @property {Number} displayWidth
 * @readOnly
 * @example
 * <div class="norender"><code>
 * createCanvas(displayWidth, displayHeight);
 * </code></div>
 *
 * @alt
 * This example does not render anything.
 */
p5.prototype.displayWidth = screen.width;

/**
 * System variable that stores the height of the screen display according to The
 * default <a href="#/p5/pixelDensity">pixelDensity</a>. This is used to run a
 * full-screen program on any display size. To return actual screen size,
 * multiply this by pixelDensity.
 *
 * @property {Number} displayHeight
 * @readOnly
 * @example
 * <div class="norender"><code>
 * createCanvas(displayWidth, displayHeight);
 * </code></div>
 *
 * @alt
 * This example does not render anything.
 */
p5.prototype.displayHeight = screen.height;

/**
 * System variable that stores the width of the inner window, it maps to
 * window.innerWidth.
 *
 * @property {Number} windowWidth
 * @readOnly
 * @example
 * <div class="norender"><code>
 * createCanvas(windowWidth, windowHeight);
 * </code></div>
 *
 * @alt
 * This example does not render anything.
 */
p5.prototype.windowWidth = getWindowWidth();
/**
 * System variable that stores the height of the inner window, it maps to
 * window.innerHeight.
 *
 * @property {Number} windowHeight
 * @readOnly
 * @example
 * <div class="norender"><code>
 * createCanvas(windowWidth, windowHeight);
 * </code></div>
 *
 * @alt
 * This example does not render anything.
 */
p5.prototype.windowHeight = getWindowHeight();

/**
 * The <a href="#/p5/windowResized">windowResized()</a> function is called once
 * every time the browser window is resized. This is a good place to resize the
 * canvas or do any other adjustments to accommodate the new window size.
 *
 * @method windowResized
 * @param {Object} [event] optional Event callback argument.
 * @example
 * <div class="norender"><code>
 * function setup() {
 *   createCanvas(windowWidth, windowHeight);
 * }
 *
 * function draw() {
 *   background(0, 100, 200);
 * }
 *
 * function windowResized() {
 *   resizeCanvas(windowWidth, windowHeight);
 * }
 * </code></div>
 * @alt
 * This example does not render anything.
 */
p5.prototype._onresize = function(e) {
  this._setProperty('windowWidth', getWindowWidth());
  this._setProperty('windowHeight', getWindowHeight());
  const context = this._isGlobal ? window : this;
  let executeDefault;
  if (typeof context.windowResized === 'function') {
    executeDefault = context.windowResized(e);
    if (executeDefault !== undefined && !executeDefault) {
      e.preventDefault();
    }
  }
};

function getWindowWidth() {
  return (
    window.innerWidth ||
    (document.documentElement && document.documentElement.clientWidth) ||
    (document.body && document.body.clientWidth) ||
    0
  );
}

function getWindowHeight() {
  return (
    window.innerHeight ||
    (document.documentElement && document.documentElement.clientHeight) ||
    (document.body && document.body.clientHeight) ||
    0
  );
}

/**
 * System variable that stores the width of the drawing canvas. This value
 * is set by the first parameter of the <a href="#/p5/createCanvas">createCanvas()</a> function.
 * For example, the function call createCanvas(320, 240) sets the width
 * variable to the value 320. The value of width defaults to 100 if
 * <a href="#/p5/createCanvas">createCanvas()</a> is not used in a program.
 *
 * @property {Number} width
 * @readOnly
 */
p5.prototype.width = 0;

/**
 * System variable that stores the height of the drawing canvas. This value
 * is set by the second parameter of the <a href="#/p5/createCanvas">createCanvas()</a> function. For
 * example, the function call createCanvas(320, 240) sets the height
 * variable to the value 240. The value of height defaults to 100 if
 * <a href="#/p5/createCanvas">createCanvas()</a> is not used in a program.
 *
 * @property {Number} height
 * @readOnly
 */
p5.prototype.height = 0;


export default p5;
