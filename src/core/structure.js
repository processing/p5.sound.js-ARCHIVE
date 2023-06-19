/**
 * @module Structure
 * @submodule Structure
 * @for p5
 * @requires core
 */

import p5 from './main';



p5.prototype.push = function() {
  this._styles.push({
    props: {
      _colorMode: this._colorMode
    },
    renderer: this._renderer.push()
  });
};

p5.prototype.pop = function() {
  const style = this._styles.pop();
  if (style) {
    this._renderer.pop(style.renderer);
    Object.assign(this, style.props);
  } else {
    console.warn('pop() was called without matching push()');
  }
};

/**
 * Executes the code within <a href="#/p5/draw">draw()</a> one time. This
 * function allows the program to update the display window only when necessary,
 * for example when an event registered by <a href="#/p5/mousePressed">mousePressed()</a>
 * or <a href="#/p5/keyPressed">keyPressed()</a> occurs.
 *
 * In structuring a program, it only makes sense to call <a href="#/p5/redraw">redraw()</a>
 * within events such as <a href="#/p5/mousePressed">mousePressed()</a>. This
 * is because <a href="#/p5/redraw">redraw()</a> does not run
 * <a href="#/p5/draw">draw()</a> immediately (it only sets a flag that indicates
 * an update is needed).
 *
 * The <a href="#/p5/redraw">redraw()</a> function does not work properly when
 * called inside <a href="#/p5/draw">draw()</a>.To enable/disable animations,
 * use <a href="#/p5/loop">loop()</a> and <a href="#/p5/noLoop">noLoop()</a>.
 *
 * In addition you can set the number of redraws per method call. Just
 * add an integer as single parameter for the number of redraws.
 *
 * @method redraw
 * @param  {Integer} [n] Redraw for n-times. The default value is 1.
 * @example
 * <div><code>
 * let x = 0;
 *
 * function setup() {
 *   createCanvas(100, 100);
 *   noLoop();
 * }
 *
 * function draw() {
 *   background(204);
 *   line(x, 0, x, height);
 * }
 *
 * function mousePressed() {
 *   x += 1;
 *   redraw();
 * }
 * </code>
 * </div>
 *
 * <div class='norender'>
 * <code>
 * let x = 0;
 *
 * function setup() {
 *   createCanvas(100, 100);
 *   noLoop();
 * }
 *
 * function draw() {
 *   background(204);
 *   x += 1;
 *   line(x, 0, x, height);
 * }
 *
 * function mousePressed() {
 *   redraw(5);
 * }
 * </code>
 * </div>
 *
 * @alt
 * black line on far left of canvas
 * black line on far left of canvas
 */
p5.prototype.redraw = function(n) {
  if (this._inUserDraw || !this._setupDone) {
    return;
  }

  let numberOfRedraws = parseInt(n);
  if (isNaN(numberOfRedraws) || numberOfRedraws < 1) {
    numberOfRedraws = 1;
  }

  const context = this._isGlobal ? window : this;
  if (typeof context.draw === 'function') {
    if (typeof context.setup === 'undefined') {
      context.scale(context._pixelDensity, context._pixelDensity);
    }
    const callMethod = f => {
      f.call(context);
    };
    for (let idxRedraw = 0; idxRedraw < numberOfRedraws; idxRedraw++) {
      if (this._accessibleOutputs.grid || this._accessibleOutputs.text) {
        this._updateAccsOutput();
      }
      context._setProperty('frameCount', context.frameCount + 1);
      context._registeredMethods.pre.forEach(callMethod);
      this._inUserDraw = true;
      try {
        context.draw();
      } finally {
        this._inUserDraw = false;
      }
      context._registeredMethods.post.forEach(callMethod);
    }
  }
};

/**
 * The `p5()` constructor enables you to activate "instance mode" instead of normal
 * "global mode". This is an advanced topic. A short description and example is
 * included below. Please see
 * <a target="blank" href="https://www.youtube.com/watch?v=Su792jEauZg&feature=youtu.be">
 * Dan Shiffman's Coding Train video tutorial</a> or this
 * <a target="blank" href="https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace">tutorial page</a>
 * for more info.
 *
 * By default, all p5.js functions are in the global namespace (i.e. bound to the window
 * object), meaning you can call them simply `ellipse()`, `fill()`, etc. However, this
 * might be inconvenient if you are mixing with other JS libraries (synchronously or
 * asynchronously) or writing long programs of your own. p5.js currently supports a
 * way around this problem called "instance mode". In instance mode, all p5 functions
 * are bound up in a single variable instead of polluting your global namespace.
 *
 * Optionally, you can specify a default container for the canvas and any other elements
 * to append to with a second argument. You can give the ID of an element in your html,
 * or an html node itself.
 *
 * Note that creating instances like this also allows you to have more than one p5 sketch on
 * a single web page, as they will each be wrapped up with their own set up variables. Of
 * course, you could also use iframes to have multiple sketches in global mode.
 *
 * @method p5
 * @param {Object} sketch a function containing a p5.js sketch
 * @param {String|Object} node ID or pointer to HTML DOM node to contain sketch in
 * @example
 * <div class='norender'><code>
 * const s = p => {
 *   let x = 100;
 *   let y = 100;
 *
 *   p.setup = function() {
 *     p.createCanvas(700, 410);
 *   };
 *
 *   p.draw = function() {
 *     p.background(0);
 *     p.fill(255);
 *     p.rect(x, y, 50, 50);
 *   };
 * };
 *
 * new p5(s); // invoke p5
 * </code></div>
 *
 * @alt
 * white rectangle on black background
 */
export default p5;
