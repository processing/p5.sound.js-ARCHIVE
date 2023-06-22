/**
 * @module DOM
 * @submodule DOM
 * @for p5sound.Element
 */

import p5sound from './main';

/**
 * Base class for all elements added to a sketch, including canvas,
 * buffers, and other HTML elements. It is not called directly, but <a href="#/p5sound.Element">p5sound.Element</a>
 * objects are created by calling <a href="#/p5/createCanvas">createCanvas()</a>,
 * <a href="#/p5/createDiv">createDiv()</a>, <a href="#/p5/createImg">createImg()</a>, <a href="#/p5/createInput">createInput()</a>, etc.
 *
 * @class p5sound.Element
 * @constructor
 * @param {String} elt DOM node that is wrapped
 * @param {p5sound} [pInst] pointer to p5sound instance
 */
p5sound.Element = class {
  constructor(elt, pInst) {
    /**
     * Underlying HTML element. All normal HTML methods can be called on this.
     * @example
     * <div>
     * <code>
     * function setup() {
     *   let c = createCanvas(50, 50);
     *   c.elt.style.border = '5px solid red';
     * }
     *
     * function draw() {
     *   background(220);
     * }
     * </code>
     * </div>
     *
     * @property elt
     * @readOnly
     */
    this.elt = elt;
    this._pInst = this._pixelsState = pInst;
    this._events = {};
    this.width = this.elt.offsetWidth;
    this.height = this.elt.offsetHeight;
  }

  /**
   *
   * Attaches the element to the parent specified. A way of setting
   * the container for the element. Accepts either a string ID, DOM
   * node, or <a href="#/p5sound.Element">p5sound.Element</a>. If no arguments are given, parent node is returned.
   * For more ways to position the canvas, see the
   * <a href='https://github.com/processing/p5sound.js/wiki/Positioning-your-canvas'>
   * positioning the canvas</a> wiki page.
   *
   * @method parent
   * @param  {String|p5sound.Element|Object} parent the ID, DOM node, or <a href="#/p5sound.Element">p5sound.Element</a>
   *                         of desired parent element
   * @chainable
   *
   * @example
   * <div class="norender notest"><code>
   * // Add the following comment to html file.
   * // &lt;div id="myContainer">&lt;/div>
   *
   * // The js code
   * let cnv = createCanvas(100, 100);
   * cnv.parent('myContainer');
   * </code></div>
   *
   * <div class='norender'><code>
   * let div0 = createDiv('this is the parent');
   * let div1 = createDiv('this is the child');
   * div1.parent(div0); // use p5sound.Element
   * </code></div>
   *
   * <div class='norender'><code>
   * let div0 = createDiv('this is the parent');
   * div0.id('apples');
   * let div1 = createDiv('this is the child');
   * div1.parent('apples'); // use id
   * </code></div>
   *
   * <div class='norender notest'><code>
   * let elt = document.getElementById('myParentDiv');
   * let div1 = createDiv('this is the child');
   * div1.parent(elt); // use element from page
   * </code></div>
   *
   * @alt
   * no display.
   */
  /**
   * @method parent
   * @return {p5sound.Element}
   */
  parent(p) {
    if (typeof p === 'undefined') {
      return this.elt.parentNode;
    }

    if (typeof p === 'string') {
      if (p[0] === '#') {
        p = p.substring(1);
      }
      p = document.getElementById(p);
    } else if (p instanceof p5sound.Element) {
      p = p.elt;
    }
    p.appendChild(this.elt);
    return this;
  }

  /**
   *
   * Sets the ID of the element. If no ID argument is passed in, it instead
   * returns the current ID of the element.
   * Note that only one element can have a particular id in a page.
   * The <a href="#/p5sound.Element/class">class()</a> method can be used
   * to identify multiple elements with the same class name.
   *
   * @method id
   * @param  {String} id ID of the element
   * @chainable
   *
   * @example
   * <div class='norender'><code>
   * function setup() {
   *   let cnv = createCanvas(100, 100);
   *   // Assigns a CSS selector ID to
   *   // the canvas element.
   *   cnv.id('mycanvas');
   * }
   * </code></div>
   *
   * @alt
   * no display.
   */
  /**
   * @method id
   * @return {String} the id of the element
   */
  id(id) {
    if (typeof id === 'undefined') {
      return this.elt.id;
    }

    this.elt.id = id;
    this.width = this.elt.offsetWidth;
    this.height = this.elt.offsetHeight;
    return this;
  }

  /**
   *
   * Adds given class to the element. If no class argument is passed in, it
   * instead returns a string containing the current class(es) of the element.
   *
   * @method class
   * @param  {String} class class to add
   * @chainable
   *
   * @example
   * <div class='norender'><code>
   * function setup() {
   *   let cnv = createCanvas(100, 100);
   *   // Assigns a CSS selector class 'small'
   *   // to the canvas element.
   *   cnv.class('small');
   * }
   * </code></div>
   *
   * @alt
   * no display.
   */
  /**
   * @method class
   * @return {String} the class of the element
   */
  class(c) {
    if (typeof c === 'undefined') {
      return this.elt.className;
    }

    this.elt.className = c;
    return this;
  }


  // General handler for event attaching and detaching
  static _adjustListener(ev, fxn, ctx) {
    if (fxn === false) {
      p5sound.Element._detachListener(ev, ctx);
    } else {
      p5sound.Element._attachListener(ev, fxn, ctx);
    }
    return this;
  }

  static _attachListener(ev, fxn, ctx) {
    // detach the old listener if there was one
    if (ctx._events[ev]) {
      p5sound.Element._detachListener(ev, ctx);
    }
    const f = fxn.bind(ctx);
    ctx.elt.addEventListener(ev, f, false);
    ctx._events[ev] = f;
  }

  static _detachListener(ev, ctx) {
    const f = ctx._events[ev];
    ctx.elt.removeEventListener(ev, f, false);
    ctx._events[ev] = null;
  }

  /**
   * Helper fxn for sharing pixel methods
   */
  _setProperty(prop, value) {
    this[prop] = value;
  }
};

export default p5sound.Element;
