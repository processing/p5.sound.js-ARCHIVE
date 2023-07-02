/**
 * @module Structure
 * @submodule Structure
 * @for p5sound
 * @requires constants
 */


// Core needs the PVariables object
import * as constants from './constants';

/**
 * This is the p5sound instance constructor.
 *
 * A p5sound instance holds all the properties and methods related to
 * a p5sound sketch.  It expects an incoming sketch closure and it can also
 * take an optional node parameter for attaching the generated p5sound canvas
 * to a node.  The sketch closure takes the newly created p5sound instance as
 * its sole argument and may optionally set <a href="#/p5/preload">preload()</a>,
 * <a href="#/p5/setup">setup()</a>, and/or
 * <a href="#/p5/draw">draw()</a> properties on it for running a sketch.
 *
 * A p5sound sketch can run in "global" or "instance" mode:
 * "global"   - all properties and methods are attached to the window
 * "instance" - all properties and methods are bound to this p5sound object
 *
 * @class p5sound
 * @constructor
 * @param  {function}           sketch a closure that can set optional <a href="#/p5/preload">preload()</a>,
 *                              <a href="#/p5/setup">setup()</a>, and/or <a href="#/p5/draw">draw()</a> properties on the
 *                              given p5sound instance
 * @param  {HTMLElement}        [node] element to attach canvas to
 * @return {p5sound}                 a p5sound instance
 */
class p5sound {
  constructor(sketch, node, sync) {
    //////////////////////////////////////////////
    // PUBLIC p5sound PROPERTIES AND METHODS
    //////////////////////////////////////////////

    /**
     * Called directly before <a href="#/p5/setup">setup()</a>, the <a href="#/p5/preload">preload()</a> function is used to handle
     * asynchronous loading of external files in a blocking way. If a preload
     * function is defined, <a href="#/p5/setup">setup()</a> will wait until any load calls within have
     * finished. Nothing besides load calls (<a href="#/p5/loadImage">loadImage</a>, <a href="#/p5/loadJSON">loadJSON</a>, <a href="#/p5/loadFont">loadFont</a>,
     * <a href="#/p5/loadStrings">loadStrings</a>, etc.) should be inside the preload function. If asynchronous
     * loading is preferred, the load methods can instead be called in <a href="#/p5/setup">setup()</a>
     * or anywhere else with the use of a callback parameter.
     *
     * By default the text "loading..." will be displayed. To make your own
     * loading page, include an HTML element with id "p5_loading" in your
     * page. More information <a href="http://bit.ly/2kQ6Nio">here</a>.
     *
     * @method preload
     * @example
     * <div><code>
     * let img;
     * let c;
     * function preload() {
     *   // preload() runs once
     *   img = loadImage('assets/laDefense.jpg');
     * }
     *
     * function setup() {
     *   // setup() waits until preload() is done
     *   img.loadPixels();
     *   // get color of middle pixel
     *   c = img.get(img.width / 2, img.height / 2);
     * }
     *
     * function draw() {
     *   background(c);
     *   image(img, 25, 25, 50, 50);
     * }
     * </code></div>
     *
     * @alt
     * nothing displayed
     *
     */

    //////////////////////////////////////////////
    // PRIVATE p5sound PROPERTIES AND METHODS
    //////////////////////////////////////////////

    this._setupDone = false;
    this._preloadDone = false;
    // for handling hidpi
    this._pixelDensity = Math.ceil(window.devicePixelRatio) || 1;
    this._userNode = node;
    this._curElement = null;
    this._elements = [];
    this._requestAnimId = 0;
    this._preloadCount = 0;
    this._isGlobal = false;
    this._loop = true;
    this._initializeInstanceVariables();
    this._defaultCanvasSize = {
      width: 100,
      height: 100
    };
    this._events = {
      // keep track of user-events for unregistering later
      mousemove: null,
      mousedown: null,
      mouseup: null,
      dragend: null,
      dragover: null,
      click: null,
      dblclick: null,
      mouseover: null,
      mouseout: null,
      keydown: null,
      keyup: null,
      keypress: null,
      touchstart: null,
      touchmove: null,
      touchend: null,
      resize: null,
      blur: null
    };
    this._millisStart = -1;
    this._recording = false;

    // States used in the custom random generators
    this._lcg_random_state = null;
    this._gaussian_previous = false;

    this._events.wheel = null;
    this._loadingScreenId = 'p5_loading';

    // Allows methods to be registered on an instance that
    // are instance-specific.
    this._registeredMethods = {};
    const methods = Object.getOwnPropertyNames(
      p5sound.prototype._registeredMethods);

    for (const prop of methods) {
      this._registeredMethods[prop] = p5sound.prototype._registeredMethods[
        prop
      ].slice();
    }

    if (window.DeviceOrientationEvent) {
      this._events.deviceorientation = null;
    }
    if (window.DeviceMotionEvent && !window._isNodeWebkit) {
      this._events.devicemotion = null;
    }

    this._start = () => {
      // Find node if id given
      if (this._userNode) {
        if (typeof this._userNode === 'string') {
          this._userNode = document.getElementById(this._userNode);
        }
      }

      const context = this._isGlobal ? window : this;
      if (context.preload) {
        // Setup loading screen
        // Set loading screen into dom if not present
        // Otherwise displays and removes user provided loading screen
        let loadingScreen = document.getElementById(this._loadingScreenId);
        if (!loadingScreen) {
          loadingScreen = document.createElement('div');
          loadingScreen.innerHTML = 'Loading...';
          loadingScreen.style.position = 'absolute';
          loadingScreen.id = this._loadingScreenId;
          const node = this._userNode || document.body;
          node.appendChild(loadingScreen);
        }
        const methods = this._preloadMethods;
        for (const method in methods) {
          // default to p5sound if no object defined
          methods[method] = methods[method] || p5sound;
          let obj = methods[method];
          //it's p5, check if it's global or instance
          if (obj === p5sound.prototype || obj === p5sound) {
            if (this._isGlobal) {
              window[method] = this._wrapPreload(this, method);
            }
            obj = this;
          }
          this._registeredPreloadMethods[method] = obj[method];
          obj[method] = this._wrapPreload(obj, method);
        }

        context.preload();
        this._runIfPreloadsAreDone();
      }
    };



    this._decrementPreload = function() {
      const context = this._isGlobal ? window : this;
      if (!context._preloadDone && typeof context.preload === 'function') {
        context._setProperty('_preloadCount', context._preloadCount - 1);
        context._runIfPreloadsAreDone();
      }
    };

    this._wrapPreload = function(obj, fnName) {
      return (...args) => {
        //increment counter
        this._incrementPreload();
        //call original function
        return this._registeredPreloadMethods[fnName].apply(obj, args);
      };
    };

    this._incrementPreload = function() {
      const context = this._isGlobal ? window : this;
      // Do nothing if we tried to increment preloads outside of `preload`
      if (context._preloadDone) return;
      context._setProperty('_preloadCount', context._preloadCount + 1);
    };

    this._setProperty = (prop, value) => {
      this[prop] = value;
      if (this._isGlobal) {
        window[prop] = value;
      }
    };

    // call any registered init functions
    this._registeredMethods.init.forEach(function(f) {
      if (typeof f !== 'undefined') {
        f.call(this);
      }
    }, this);

    const friendlyBindGlobal = this._createFriendlyGlobalFunctionBinder();

    // If the user has created a global setup or draw function,
    // assume "global" mode and make everything global (i.e. on the window)
    if (!sketch) {
      this._isGlobal = true;
      p5sound.instance = this;
      // Loop through methods on the prototype and attach them to the window
      for (const p in p5sound.prototype) {
        if (typeof p5sound.prototype[p] === 'function') {
          const ev = p.substring(2);
          if (!this._events.hasOwnProperty(ev)) {
            if (Math.hasOwnProperty(p) && Math[p] === p5sound.prototype[p]) {
              // Multiple p5sound methods are just native Math functions. These can be
              // called without any binding.
              friendlyBindGlobal(p, p5sound.prototype[p]);
            } else {
              friendlyBindGlobal(p, p5sound.prototype[p].bind(this));
            }
          }
        } else {
          friendlyBindGlobal(p, p5sound.prototype[p]);
        }
      }
      // Attach its properties to the window
      for (const p2 in this) {
        if (this.hasOwnProperty(p2)) {
          friendlyBindGlobal(p2, this[p2]);
        }
      }
    } else {
      // Else, the user has passed in a sketch closure that may set
      // user-provided 'setup', 'draw', etc. properties on this instance of p5
      sketch(this);

      // Run a check to see if the user has misspelled 'setup', 'draw', etc
      // detects capitalization mistakes only ( Setup, SETUP, MouseClicked, etc)
      p5sound._checkForUserDefinedFunctions(this);
    }

    // Bind events to window (not using container div bc key events don't work)

    for (const e in this._events) {
      const f = this[`_on${e}`];
      if (f) {
        const m = f.bind(this);
        window.addEventListener(e, m, { passive: false });
        this._events[e] = m;
      }
    }

    const focusHandler = () => {
      this._setProperty('focused', true);
    };
    const blurHandler = () => {
      this._setProperty('focused', false);
    };
    window.addEventListener('focus', focusHandler);
    window.addEventListener('blur', blurHandler);
    this.registerMethod('remove', () => {
      window.removeEventListener('focus', focusHandler);
      window.removeEventListener('blur', blurHandler);
    });

    if (document.readyState === 'complete') {
      this._start();
    } else {
      window.addEventListener('load', this._start.bind(this), false);
    }
  }

  _initializeInstanceVariables() {
    this._accessibleOutputs = {
      text: false,
      grid: false,
      textLabel: false,
      gridLabel: false
    };



  }

  registerPreloadMethod(fnString, obj) {
    // obj = obj || p5sound.prototype;
    if (!p5sound.prototype._preloadMethods.hasOwnProperty(fnString)) {
      p5sound.prototype._preloadMethods[fnString] = obj;
    }
  }

  registerMethod(name, m) {
    const target = this || p5sound.prototype;
    if (!target._registeredMethods.hasOwnProperty(name)) {
      target._registeredMethods[name] = [];
    }
    target._registeredMethods[name].push(m);
  }

  // create a function which provides a standardized process for binding
  // globals; this is implemented as a factory primarily so that there's a
  // way to redefine what "global" means for the binding function so it
  // can be used in scenarios like unit testing where the window object
  // might not exist
  _createFriendlyGlobalFunctionBinder(options = {}) {
    const globalObject = options.globalObject || window;
    const log = options.log || console.log.bind(console);
    const propsToForciblyOverwrite = {
      // p5sound.print actually always overwrites an existing global function,
      // albeit one that is very unlikely to be used:
      //
      //   https://developer.mozilla.org/en-US/docs/Web/API/Window/print
      print: true
    };

    return (prop, value) => {
      if (
        !p5sound.disableFriendlyErrors &&
        typeof IS_MINIFIED === 'undefined' &&
        typeof value === 'function' &&
        !(prop in p5sound.prototype._preloadMethods)
      ) {
        try {
          // Because p5sound has so many common function names, it's likely
          // that users may accidentally overwrite global p5sound functions with
          // their own variables. Let's allow this but log a warning to
          // help users who may be doing this unintentionally.
          //
          // For more information, see:
          //
          //   https://github.com/processing/p5sound.js/issues/1317

          if (prop in globalObject && !(prop in propsToForciblyOverwrite)) {
            throw new Error(`global "${prop}" already exists`);
          }

          // It's possible that this might throw an error because there
          // are a lot of edge-cases in which `Object.defineProperty` might
          // not succeed; since this functionality is only intended to
          // help beginners anyways, we'll just catch such an exception
          // if it occurs, and fall back to legacy behavior.
          Object.defineProperty(globalObject, prop, {
            configurable: true,
            enumerable: true,
            get() {
              return value;
            },
            set(newValue) {
              Object.defineProperty(globalObject, prop, {
                configurable: true,
                enumerable: true,
                value: newValue,
                writable: true
              });
              log(
                `You just changed the value of "${prop}", which was a p5sound function. This could cause problems later if you're not careful.`
              );
            }
          });
        } catch (e) {
          globalObject[prop] = value;
        }
      } else {
        globalObject[prop] = value;
      }
    };
  }
}

// This is a pointer to our global mode p5sound instance, if we're in
// global mode.
p5sound.instance = null;


// attach constants to p5sound prototype
for (const k in constants) {
  p5sound.prototype[k] = constants[k];
}

// makes the `VERSION` constant available on the p5sound object
// in instance mode, even if it hasn't been instatiated yet
p5sound.VERSION = constants.VERSION;

// functions that cause preload to wait
// more can be added by using registerPreloadMethod(func)
p5sound.prototype._preloadMethods = {
  loadImage: p5sound.prototype,
  loadBytes: p5sound.prototype,
  loadShader: p5sound.prototype
};

p5sound.prototype._registeredMethods = {
  init: [], pre: [], post: [], remove: []
};

p5sound.prototype._registeredPreloadMethods = {};

export default p5sound;
