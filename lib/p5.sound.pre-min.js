/*! p5sound.js v0.0.1 June 22, 2023 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.p5sound = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  }

  return it;
};

},{}],2:[function(_dereq_,module,exports){
var isObject = _dereq_('../internals/is-object');

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  }

  return it;
};

},{"../internals/is-object":56}],3:[function(_dereq_,module,exports){
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var create = _dereq_('../internals/object-create');

var definePropertyModule = _dereq_('../internals/object-define-property');

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
} // add a key to Array.prototype[@@unscopables]


module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

},{"../internals/object-create":69,"../internals/object-define-property":71,"../internals/well-known-symbol":113}],4:[function(_dereq_,module,exports){
module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  }

  return it;
};

},{}],5:[function(_dereq_,module,exports){
var isObject = _dereq_('../internals/is-object');

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  }

  return it;
};

},{"../internals/is-object":56}],6:[function(_dereq_,module,exports){
'use strict';

var toObject = _dereq_('../internals/to-object');

var toAbsoluteIndex = _dereq_('../internals/to-absolute-index');

var toLength = _dereq_('../internals/to-length'); // `Array.prototype.fill` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.fill


module.exports = function fill(value
/* , start = 0, end = @length */
) {
  var O = toObject(this);
  var length = toLength(O.length);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);

  while (endPos > index) O[index++] = value;

  return O;
};

},{"../internals/to-absolute-index":103,"../internals/to-length":106,"../internals/to-object":107}],7:[function(_dereq_,module,exports){
'use strict';

var $forEach = _dereq_('../internals/array-iteration').forEach;

var arrayMethodIsStrict = _dereq_('../internals/array-method-is-strict');

var arrayMethodUsesToLength = _dereq_('../internals/array-method-uses-to-length');

var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach'); // `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach

module.exports = !STRICT_METHOD || !USES_TO_LENGTH ? function forEach(callbackfn
/* , thisArg */
) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;

},{"../internals/array-iteration":9,"../internals/array-method-is-strict":11,"../internals/array-method-uses-to-length":12}],8:[function(_dereq_,module,exports){
var toIndexedObject = _dereq_('../internals/to-indexed-object');

var toLength = _dereq_('../internals/to-length');

var toAbsoluteIndex = _dereq_('../internals/to-absolute-index'); // `Array.prototype.{ indexOf, includes }` methods implementation


var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

},{"../internals/to-absolute-index":103,"../internals/to-indexed-object":104,"../internals/to-length":106}],9:[function(_dereq_,module,exports){
var bind = _dereq_('../internals/function-bind-context');

var IndexedObject = _dereq_('../internals/indexed-object');

var toObject = _dereq_('../internals/to-object');

var toLength = _dereq_('../internals/to-length');

var arraySpeciesCreate = _dereq_('../internals/array-species-create');

var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation

var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;

    for (; length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);

      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
            case 3:
              return true;
            // some

            case 5:
              return value;
            // find

            case 6:
              return index;
            // findIndex

            case 2:
              push.call(target, value);
            // filter
          } else if (IS_EVERY) return false; // every
      }
    }

    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};

},{"../internals/array-species-create":13,"../internals/function-bind-context":39,"../internals/indexed-object":48,"../internals/to-length":106,"../internals/to-object":107}],10:[function(_dereq_,module,exports){
var fails = _dereq_('../internals/fails');

var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var V8_VERSION = _dereq_('../internals/engine-v8-version');

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};

    constructor[SPECIES] = function () {
      return {
        foo: 1
      };
    };

    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

},{"../internals/engine-v8-version":34,"../internals/fails":37,"../internals/well-known-symbol":113}],11:[function(_dereq_,module,exports){
'use strict';

var fails = _dereq_('../internals/fails');

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () {
      throw 1;
    }, 1);
  });
};

},{"../internals/fails":37}],12:[function(_dereq_,module,exports){
var DESCRIPTORS = _dereq_('../internals/descriptors');

var fails = _dereq_('../internals/fails');

var has = _dereq_('../internals/has');

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) {
  throw it;
};

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;
  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = {
      length: -1
    };
    if (ACCESSORS) defineProperty(O, 1, {
      enumerable: true,
      get: thrower
    });else O[1] = 1;
    method.call(O, argument0, argument1);
  });
};

},{"../internals/descriptors":29,"../internals/fails":37,"../internals/has":43}],13:[function(_dereq_,module,exports){
var isObject = _dereq_('../internals/is-object');

var isArray = _dereq_('../internals/is-array');

var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

module.exports = function (originalArray, length) {
  var C;

  if (isArray(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }

  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

},{"../internals/is-array":54,"../internals/is-object":56,"../internals/well-known-symbol":113}],14:[function(_dereq_,module,exports){
var anObject = _dereq_('../internals/an-object'); // call something on iterator step with safe closing on error


module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};

},{"../internals/an-object":5}],15:[function(_dereq_,module,exports){
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return {
        done: !!called++
      };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };

  iteratorWithReturn[ITERATOR] = function () {
    return this;
  }; // eslint-disable-next-line no-throw-literal


  Array.from(iteratorWithReturn, function () {
    throw 2;
  });
} catch (error) {
  /* empty */
}

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;

  try {
    var object = {};

    object[ITERATOR] = function () {
      return {
        next: function () {
          return {
            done: ITERATION_SUPPORT = true
          };
        }
      };
    };

    exec(object);
  } catch (error) {
    /* empty */
  }

  return ITERATION_SUPPORT;
};

},{"../internals/well-known-symbol":113}],16:[function(_dereq_,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],17:[function(_dereq_,module,exports){
var TO_STRING_TAG_SUPPORT = _dereq_('../internals/to-string-tag-support');

var classofRaw = _dereq_('../internals/classof-raw');

var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag'); // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

},{"../internals/classof-raw":16,"../internals/to-string-tag-support":109,"../internals/well-known-symbol":113}],18:[function(_dereq_,module,exports){
'use strict';

var redefineAll = _dereq_('../internals/redefine-all');

var getWeakData = _dereq_('../internals/internal-metadata').getWeakData;

var anObject = _dereq_('../internals/an-object');

var isObject = _dereq_('../internals/is-object');

var anInstance = _dereq_('../internals/an-instance');

var iterate = _dereq_('../internals/iterate');

var ArrayIterationModule = _dereq_('../internals/array-iteration');

var $has = _dereq_('../internals/has');

var InternalStateModule = _dereq_('../internals/internal-state');

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;
var find = ArrayIterationModule.find;
var findIndex = ArrayIterationModule.findIndex;
var id = 0; // fallback for uncaught frozen keys

var uncaughtFrozenStore = function (store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) this.entries.splice(index, 1);
    return !!~index;
  }
};
module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: undefined
      });
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });
    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);else data[state.id] = value;
      return that;
    };

    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && $has(data, state.id) && delete data[state.id];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && $has(data, state.id);
      }
    });
    redefineAll(C.prototype, IS_MAP ? {
      // 23.3.3.3 WeakMap.prototype.get(key)
      get: function get(key) {
        var state = getInternalState(this);

        if (isObject(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // 23.3.3.5 WeakMap.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // 23.4.3.1 WeakSet.prototype.add(value)
      add: function add(value) {
        return define(this, value, true);
      }
    });
    return C;
  }
};

},{"../internals/an-instance":4,"../internals/an-object":5,"../internals/array-iteration":9,"../internals/has":43,"../internals/internal-metadata":51,"../internals/internal-state":52,"../internals/is-object":56,"../internals/iterate":59,"../internals/redefine-all":86}],19:[function(_dereq_,module,exports){
'use strict';

var $ = _dereq_('../internals/export');

var global = _dereq_('../internals/global');

var isForced = _dereq_('../internals/is-forced');

var redefine = _dereq_('../internals/redefine');

var InternalMetadataModule = _dereq_('../internals/internal-metadata');

var iterate = _dereq_('../internals/iterate');

var anInstance = _dereq_('../internals/an-instance');

var isObject = _dereq_('../internals/is-object');

var fails = _dereq_('../internals/fails');

var checkCorrectnessOfIteration = _dereq_('../internals/check-correctness-of-iteration');

var setToStringTag = _dereq_('../internals/set-to-string-tag');

var inheritIfRequired = _dereq_('../internals/inherit-if-required');

module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY, KEY == 'add' ? function add(value) {
      nativeMethod.call(this, value === 0 ? 0 : value);
      return this;
    } : KEY == 'delete' ? function (key) {
      return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
    } : KEY == 'get' ? function get(key) {
      return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
    } : KEY == 'has' ? function has(key) {
      return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
    } : function set(key, value) {
      nativeMethod.call(this, key === 0 ? 0 : key, value);
      return this;
    });
  }; // eslint-disable-next-line max-len


  if (isForced(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })))) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.REQUIRED = true;
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor(); // early implementations not supports chaining

    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance; // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false

    var THROWS_ON_PRIMITIVES = fails(function () {
      instance.has(1);
    }); // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new

    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) {
      new NativeConstructor(iterable);
    }); // for early implementations -0 and +0 not the same

    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;

      while (index--) $instance[ADDER](index, index);

      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER); // weak collections should not contains .clear method

    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({
    global: true,
    forced: Constructor != NativeConstructor
  }, exported);
  setToStringTag(Constructor, CONSTRUCTOR_NAME);
  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
  return Constructor;
};

},{"../internals/an-instance":4,"../internals/check-correctness-of-iteration":15,"../internals/export":36,"../internals/fails":37,"../internals/global":42,"../internals/inherit-if-required":49,"../internals/internal-metadata":51,"../internals/is-forced":55,"../internals/is-object":56,"../internals/iterate":59,"../internals/redefine":87,"../internals/set-to-string-tag":94}],20:[function(_dereq_,module,exports){
var has = _dereq_('../internals/has');

var ownKeys = _dereq_('../internals/own-keys');

var getOwnPropertyDescriptorModule = _dereq_('../internals/object-get-own-property-descriptor');

var definePropertyModule = _dereq_('../internals/object-define-property');

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

},{"../internals/has":43,"../internals/object-define-property":71,"../internals/object-get-own-property-descriptor":72,"../internals/own-keys":82}],21:[function(_dereq_,module,exports){
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;

  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) {
      /* empty */
    }
  }

  return false;
};

},{"../internals/well-known-symbol":113}],22:[function(_dereq_,module,exports){
var fails = _dereq_('../internals/fails');

module.exports = !fails(function () {
  function F() {
    /* empty */
  }

  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

},{"../internals/fails":37}],23:[function(_dereq_,module,exports){
'use strict';

var IteratorPrototype = _dereq_('../internals/iterators-core').IteratorPrototype;

var create = _dereq_('../internals/object-create');

var createPropertyDescriptor = _dereq_('../internals/create-property-descriptor');

var setToStringTag = _dereq_('../internals/set-to-string-tag');

var Iterators = _dereq_('../internals/iterators');

var returnThis = function () {
  return this;
};

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, {
    next: createPropertyDescriptor(1, next)
  });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};

},{"../internals/create-property-descriptor":25,"../internals/iterators":61,"../internals/iterators-core":60,"../internals/object-create":69,"../internals/set-to-string-tag":94}],24:[function(_dereq_,module,exports){
var DESCRIPTORS = _dereq_('../internals/descriptors');

var definePropertyModule = _dereq_('../internals/object-define-property');

var createPropertyDescriptor = _dereq_('../internals/create-property-descriptor');

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"../internals/create-property-descriptor":25,"../internals/descriptors":29,"../internals/object-define-property":71}],25:[function(_dereq_,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],26:[function(_dereq_,module,exports){
'use strict';

var toPrimitive = _dereq_('../internals/to-primitive');

var definePropertyModule = _dereq_('../internals/object-define-property');

var createPropertyDescriptor = _dereq_('../internals/create-property-descriptor');

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
};

},{"../internals/create-property-descriptor":25,"../internals/object-define-property":71,"../internals/to-primitive":108}],27:[function(_dereq_,module,exports){
'use strict';

var $ = _dereq_('../internals/export');

var createIteratorConstructor = _dereq_('../internals/create-iterator-constructor');

var getPrototypeOf = _dereq_('../internals/object-get-prototype-of');

var setPrototypeOf = _dereq_('../internals/object-set-prototype-of');

var setToStringTag = _dereq_('../internals/set-to-string-tag');

var createNonEnumerableProperty = _dereq_('../internals/create-non-enumerable-property');

var redefine = _dereq_('../internals/redefine');

var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var IS_PURE = _dereq_('../internals/is-pure');

var Iterators = _dereq_('../internals/iterators');

var IteratorsCore = _dereq_('../internals/iterators-core');

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () {
  return this;
};

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS:
        return function keys() {
          return new IteratorConstructor(this, KIND);
        };

      case VALUES:
        return function values() {
          return new IteratorConstructor(this, KIND);
        };

      case ENTRIES:
        return function entries() {
          return new IteratorConstructor(this, KIND);
        };
    }

    return function () {
      return new IteratorConstructor(this);
    };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY; // fix native

  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));

    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      } // Set @@toStringTag to native iterators


      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  } // fix Array#{values, @@iterator}.name in V8 / FF


  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;

    defaultIterator = function values() {
      return nativeIterator.call(this);
    };
  } // define iterator


  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }

  Iterators[NAME] = defaultIterator; // export additional methods

  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({
      target: NAME,
      proto: true,
      forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
    }, methods);
  }

  return methods;
};

},{"../internals/create-iterator-constructor":23,"../internals/create-non-enumerable-property":24,"../internals/export":36,"../internals/is-pure":57,"../internals/iterators":61,"../internals/iterators-core":60,"../internals/object-get-prototype-of":76,"../internals/object-set-prototype-of":80,"../internals/redefine":87,"../internals/set-to-string-tag":94,"../internals/well-known-symbol":113}],28:[function(_dereq_,module,exports){
var path = _dereq_('../internals/path');

var has = _dereq_('../internals/has');

var wrappedWellKnownSymbolModule = _dereq_('../internals/well-known-symbol-wrapped');

var defineProperty = _dereq_('../internals/object-define-property').f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};

},{"../internals/has":43,"../internals/object-define-property":71,"../internals/path":83,"../internals/well-known-symbol-wrapped":112}],29:[function(_dereq_,module,exports){
var fails = _dereq_('../internals/fails'); // Thank's IE8 for his funny defineProperty


module.exports = !fails(function () {
  return Object.defineProperty({}, 1, {
    get: function () {
      return 7;
    }
  })[1] != 7;
});

},{"../internals/fails":37}],30:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');

var isObject = _dereq_('../internals/is-object');

var document = global.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

},{"../internals/global":42,"../internals/is-object":56}],31:[function(_dereq_,module,exports){
// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

},{}],32:[function(_dereq_,module,exports){
var userAgent = _dereq_('../internals/engine-user-agent');

module.exports = /(iphone|ipod|ipad).*applewebkit/i.test(userAgent);

},{"../internals/engine-user-agent":33}],33:[function(_dereq_,module,exports){
var getBuiltIn = _dereq_('../internals/get-built-in');

module.exports = getBuiltIn('navigator', 'userAgent') || '';

},{"../internals/get-built-in":40}],34:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');

var userAgent = _dereq_('../internals/engine-user-agent');

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;

},{"../internals/engine-user-agent":33,"../internals/global":42}],35:[function(_dereq_,module,exports){
// IE8- don't enum bug keys
module.exports = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

},{}],36:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');

var getOwnPropertyDescriptor = _dereq_('../internals/object-get-own-property-descriptor').f;

var createNonEnumerableProperty = _dereq_('../internals/create-non-enumerable-property');

var redefine = _dereq_('../internals/redefine');

var setGlobal = _dereq_('../internals/set-global');

var copyConstructorProperties = _dereq_('../internals/copy-constructor-properties');

var isForced = _dereq_('../internals/is-forced');
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/


module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    } // extend global


    redefine(target, key, sourceProperty, options);
  }
};

},{"../internals/copy-constructor-properties":20,"../internals/create-non-enumerable-property":24,"../internals/global":42,"../internals/is-forced":55,"../internals/object-get-own-property-descriptor":72,"../internals/redefine":87,"../internals/set-global":92}],37:[function(_dereq_,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

},{}],38:[function(_dereq_,module,exports){
var fails = _dereq_('../internals/fails');

module.exports = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});

},{"../internals/fails":37}],39:[function(_dereq_,module,exports){
var aFunction = _dereq_('../internals/a-function'); // optional / simple context binding


module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;

  switch (length) {
    case 0:
      return function () {
        return fn.call(that);
      };

    case 1:
      return function (a) {
        return fn.call(that, a);
      };

    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }

  return function ()
  /* ...args */
  {
    return fn.apply(that, arguments);
  };
};

},{"../internals/a-function":1}],40:[function(_dereq_,module,exports){
var path = _dereq_('../internals/path');

var global = _dereq_('../internals/global');

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace]) : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};

},{"../internals/global":42,"../internals/path":83}],41:[function(_dereq_,module,exports){
var classof = _dereq_('../internals/classof');

var Iterators = _dereq_('../internals/iterators');

var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};

},{"../internals/classof":17,"../internals/iterators":61,"../internals/well-known-symbol":113}],42:[function(_dereq_,module,exports){
(function (global){
var check = function (it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


module.exports = // eslint-disable-next-line no-undef
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof global == 'object' && global) || // eslint-disable-next-line no-new-func
Function('return this')();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],43:[function(_dereq_,module,exports){
var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],44:[function(_dereq_,module,exports){
module.exports = {};

},{}],45:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');

module.exports = function (a, b) {
  var console = global.console;

  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

},{"../internals/global":42}],46:[function(_dereq_,module,exports){
var getBuiltIn = _dereq_('../internals/get-built-in');

module.exports = getBuiltIn('document', 'documentElement');

},{"../internals/get-built-in":40}],47:[function(_dereq_,module,exports){
var DESCRIPTORS = _dereq_('../internals/descriptors');

var fails = _dereq_('../internals/fails');

var createElement = _dereq_('../internals/document-create-element'); // Thank's IE8 for his funny defineProperty


module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});

},{"../internals/descriptors":29,"../internals/document-create-element":30,"../internals/fails":37}],48:[function(_dereq_,module,exports){
var fails = _dereq_('../internals/fails');

var classof = _dereq_('../internals/classof-raw');

var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

},{"../internals/classof-raw":16,"../internals/fails":37}],49:[function(_dereq_,module,exports){
var isObject = _dereq_('../internals/is-object');

var setPrototypeOf = _dereq_('../internals/object-set-prototype-of'); // makes subclassing work correct for wrapped built-ins


module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if ( // it can work only with native `setPrototypeOf`
  setPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
  typeof (NewTarget = dummy.constructor) == 'function' && NewTarget !== Wrapper && isObject(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};

},{"../internals/is-object":56,"../internals/object-set-prototype-of":80}],50:[function(_dereq_,module,exports){
var store = _dereq_('../internals/shared-store');

var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;

},{"../internals/shared-store":96}],51:[function(_dereq_,module,exports){
var hiddenKeys = _dereq_('../internals/hidden-keys');

var isObject = _dereq_('../internals/is-object');

var has = _dereq_('../internals/has');

var defineProperty = _dereq_('../internals/object-define-property').f;

var uid = _dereq_('../internals/uid');

var FREEZING = _dereq_('../internals/freezing');

var METADATA = uid('meta');
var id = 0;

var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, {
    value: {
      objectID: 'O' + ++id,
      // object ID
      weakData: {} // weak collections IDs

    }
  });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F'; // not necessary to add metadata

    if (!create) return 'E'; // add missing metadata

    setMetadata(it); // return object ID
  }

  return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true; // not necessary to add metadata

    if (!create) return false; // add missing metadata

    setMetadata(it); // return the store of weak collections IDs
  }

  return it[METADATA].weakData;
}; // add metadata on freeze-family methods calling


var onFreeze = function (it) {
  if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};
hiddenKeys[METADATA] = true;

},{"../internals/freezing":38,"../internals/has":43,"../internals/hidden-keys":44,"../internals/is-object":56,"../internals/object-define-property":71,"../internals/uid":110}],52:[function(_dereq_,module,exports){
var NATIVE_WEAK_MAP = _dereq_('../internals/native-weak-map');

var global = _dereq_('../internals/global');

var isObject = _dereq_('../internals/is-object');

var createNonEnumerableProperty = _dereq_('../internals/create-non-enumerable-property');

var objectHas = _dereq_('../internals/has');

var sharedKey = _dereq_('../internals/shared-key');

var hiddenKeys = _dereq_('../internals/hidden-keys');

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;

  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };

  get = function (it) {
    return wmget.call(store, it) || {};
  };

  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };

  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

},{"../internals/create-non-enumerable-property":24,"../internals/global":42,"../internals/has":43,"../internals/hidden-keys":44,"../internals/is-object":56,"../internals/native-weak-map":65,"../internals/shared-key":95}],53:[function(_dereq_,module,exports){
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var Iterators = _dereq_('../internals/iterators');

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype; // check on default Array iterator

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

},{"../internals/iterators":61,"../internals/well-known-symbol":113}],54:[function(_dereq_,module,exports){
var classof = _dereq_('../internals/classof-raw'); // `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray


module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};

},{"../internals/classof-raw":16}],55:[function(_dereq_,module,exports){
var fails = _dereq_('../internals/fails');

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;

},{"../internals/fails":37}],56:[function(_dereq_,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],57:[function(_dereq_,module,exports){
module.exports = false;

},{}],58:[function(_dereq_,module,exports){
var isObject = _dereq_('../internals/is-object');

var classof = _dereq_('../internals/classof-raw');

var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var MATCH = wellKnownSymbol('match'); // `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp

module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};

},{"../internals/classof-raw":16,"../internals/is-object":56,"../internals/well-known-symbol":113}],59:[function(_dereq_,module,exports){
var anObject = _dereq_('../internals/an-object');

var isArrayIteratorMethod = _dereq_('../internals/is-array-iterator-method');

var toLength = _dereq_('../internals/to-length');

var bind = _dereq_('../internals/function-bind-context');

var getIteratorMethod = _dereq_('../internals/get-iterator-method');

var callWithSafeIterationClosing = _dereq_('../internals/call-with-safe-iteration-closing');

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable'); // optimisation for array iterators

    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      }

      return new Result(false);
    }

    iterator = iterFn.call(iterable);
  }

  next = iterator.next;

  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  }

  return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};

},{"../internals/an-object":5,"../internals/call-with-safe-iteration-closing":14,"../internals/function-bind-context":39,"../internals/get-iterator-method":41,"../internals/is-array-iterator-method":53,"../internals/to-length":106}],60:[function(_dereq_,module,exports){
'use strict';

var getPrototypeOf = _dereq_('../internals/object-get-prototype-of');

var createNonEnumerableProperty = _dereq_('../internals/create-non-enumerable-property');

var has = _dereq_('../internals/has');

var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var IS_PURE = _dereq_('../internals/is-pure');

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () {
  return this;
}; // `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object


var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

},{"../internals/create-non-enumerable-property":24,"../internals/has":43,"../internals/is-pure":57,"../internals/object-get-prototype-of":76,"../internals/well-known-symbol":113}],61:[function(_dereq_,module,exports){
module.exports = {};

},{}],62:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');

var getOwnPropertyDescriptor = _dereq_('../internals/object-get-own-property-descriptor').f;

var classof = _dereq_('../internals/classof-raw');

var macrotask = _dereq_('../internals/task').set;

var IS_IOS = _dereq_('../internals/engine-is-ios');

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var IS_NODE = classof(process) == 'process'; // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`

var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
var flush, head, last, notify, toggle, node, promise, then; // modern engines have queueMicrotask method

if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();

    while (head) {
      fn = head.fn;
      head = head.next;

      try {
        fn();
      } catch (error) {
        if (head) notify();else last = undefined;
        throw error;
      }
    }

    last = undefined;
    if (parent) parent.enter();
  }; // Node.js


  if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    }; // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339

  } else if (MutationObserver && !IS_IOS) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, {
      characterData: true
    });

    notify = function () {
      node.data = toggle = !toggle;
    }; // environments with maybe non-completely correct, but existent Promise

  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    then = promise.then;

    notify = function () {
      then.call(promise, flush);
    }; // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout

  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = {
    fn: fn,
    next: undefined
  };
  if (last) last.next = task;

  if (!head) {
    head = task;
    notify();
  }

  last = task;
};

},{"../internals/classof-raw":16,"../internals/engine-is-ios":32,"../internals/global":42,"../internals/object-get-own-property-descriptor":72,"../internals/task":102}],63:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');

module.exports = global.Promise;

},{"../internals/global":42}],64:[function(_dereq_,module,exports){
var fails = _dereq_('../internals/fails');

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

},{"../internals/fails":37}],65:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');

var inspectSource = _dereq_('../internals/inspect-source');

var WeakMap = global.WeakMap;
module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

},{"../internals/global":42,"../internals/inspect-source":50}],66:[function(_dereq_,module,exports){
'use strict';

var aFunction = _dereq_('../internals/a-function');

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}; // 25.4.1.5 NewPromiseCapability(C)


module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"../internals/a-function":1}],67:[function(_dereq_,module,exports){
var isRegExp = _dereq_('../internals/is-regexp');

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  }

  return it;
};

},{"../internals/is-regexp":58}],68:[function(_dereq_,module,exports){
'use strict';

var DESCRIPTORS = _dereq_('../internals/descriptors');

var fails = _dereq_('../internals/fails');

var objectKeys = _dereq_('../internals/object-keys');

var getOwnPropertySymbolsModule = _dereq_('../internals/object-get-own-property-symbols');

var propertyIsEnumerableModule = _dereq_('../internals/object-property-is-enumerable');

var toObject = _dereq_('../internals/to-object');

var IndexedObject = _dereq_('../internals/indexed-object');

var nativeAssign = Object.assign;
var defineProperty = Object.defineProperty; // `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign

module.exports = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && nativeAssign({
    b: 1
  }, nativeAssign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), {
    b: 2
  })).b !== 1) return true; // should work with symbols and should have deterministic property order (V8 bug)

  var A = {};
  var B = {}; // eslint-disable-next-line no-undef

  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) {
    B[chr] = chr;
  });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;

  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;

    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  }

  return T;
} : nativeAssign;

},{"../internals/descriptors":29,"../internals/fails":37,"../internals/indexed-object":48,"../internals/object-get-own-property-symbols":75,"../internals/object-keys":78,"../internals/object-property-is-enumerable":79,"../internals/to-object":107}],69:[function(_dereq_,module,exports){
var anObject = _dereq_('../internals/an-object');

var defineProperties = _dereq_('../internals/object-define-properties');

var enumBugKeys = _dereq_('../internals/enum-bug-keys');

var hiddenKeys = _dereq_('../internals/hidden-keys');

var html = _dereq_('../internals/html');

var documentCreateElement = _dereq_('../internals/document-create-element');

var sharedKey = _dereq_('../internals/shared-key');

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () {
  /* empty */
};

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak

  return temp;
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
}; // Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug


var activeXDocument;

var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) {
    /* ignore */
  }

  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;

  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];

  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true; // `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create

module.exports = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO] = O;
  } else result = NullProtoObject();

  return Properties === undefined ? result : defineProperties(result, Properties);
};

},{"../internals/an-object":5,"../internals/document-create-element":30,"../internals/enum-bug-keys":35,"../internals/hidden-keys":44,"../internals/html":46,"../internals/object-define-properties":70,"../internals/shared-key":95}],70:[function(_dereq_,module,exports){
var DESCRIPTORS = _dereq_('../internals/descriptors');

var definePropertyModule = _dereq_('../internals/object-define-property');

var anObject = _dereq_('../internals/an-object');

var objectKeys = _dereq_('../internals/object-keys'); // `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties


module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;

  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);

  return O;
};

},{"../internals/an-object":5,"../internals/descriptors":29,"../internals/object-define-property":71,"../internals/object-keys":78}],71:[function(_dereq_,module,exports){
var DESCRIPTORS = _dereq_('../internals/descriptors');

var IE8_DOM_DEFINE = _dereq_('../internals/ie8-dom-define');

var anObject = _dereq_('../internals/an-object');

var toPrimitive = _dereq_('../internals/to-primitive');

var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty

exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"../internals/an-object":5,"../internals/descriptors":29,"../internals/ie8-dom-define":47,"../internals/to-primitive":108}],72:[function(_dereq_,module,exports){
var DESCRIPTORS = _dereq_('../internals/descriptors');

var propertyIsEnumerableModule = _dereq_('../internals/object-property-is-enumerable');

var createPropertyDescriptor = _dereq_('../internals/create-property-descriptor');

var toIndexedObject = _dereq_('../internals/to-indexed-object');

var toPrimitive = _dereq_('../internals/to-primitive');

var has = _dereq_('../internals/has');

var IE8_DOM_DEFINE = _dereq_('../internals/ie8-dom-define');

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};

},{"../internals/create-property-descriptor":25,"../internals/descriptors":29,"../internals/has":43,"../internals/ie8-dom-define":47,"../internals/object-property-is-enumerable":79,"../internals/to-indexed-object":104,"../internals/to-primitive":108}],73:[function(_dereq_,module,exports){
var toIndexedObject = _dereq_('../internals/to-indexed-object');

var nativeGetOwnPropertyNames = _dereq_('../internals/object-get-own-property-names').f;

var toString = {}.toString;
var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
}; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
};

},{"../internals/object-get-own-property-names":74,"../internals/to-indexed-object":104}],74:[function(_dereq_,module,exports){
var internalObjectKeys = _dereq_('../internals/object-keys-internal');

var enumBugKeys = _dereq_('../internals/enum-bug-keys');

var hiddenKeys = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

},{"../internals/enum-bug-keys":35,"../internals/object-keys-internal":77}],75:[function(_dereq_,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],76:[function(_dereq_,module,exports){
var has = _dereq_('../internals/has');

var toObject = _dereq_('../internals/to-object');

var sharedKey = _dereq_('../internals/shared-key');

var CORRECT_PROTOTYPE_GETTER = _dereq_('../internals/correct-prototype-getter');

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype; // `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof

module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];

  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }

  return O instanceof Object ? ObjectPrototype : null;
};

},{"../internals/correct-prototype-getter":22,"../internals/has":43,"../internals/shared-key":95,"../internals/to-object":107}],77:[function(_dereq_,module,exports){
var has = _dereq_('../internals/has');

var toIndexedObject = _dereq_('../internals/to-indexed-object');

var indexOf = _dereq_('../internals/array-includes').indexOf;

var hiddenKeys = _dereq_('../internals/hidden-keys');

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key); // Don't enum bug & hidden keys


  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }

  return result;
};

},{"../internals/array-includes":8,"../internals/has":43,"../internals/hidden-keys":44,"../internals/to-indexed-object":104}],78:[function(_dereq_,module,exports){
var internalObjectKeys = _dereq_('../internals/object-keys-internal');

var enumBugKeys = _dereq_('../internals/enum-bug-keys'); // `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys


module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

},{"../internals/enum-bug-keys":35,"../internals/object-keys-internal":77}],79:[function(_dereq_,module,exports){
'use strict';

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

},{}],80:[function(_dereq_,module,exports){
var anObject = _dereq_('../internals/an-object');

var aPossiblePrototype = _dereq_('../internals/a-possible-prototype'); // `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.

/* eslint-disable no-proto */


module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;

  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) {
    /* empty */
  }

  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
    return O;
  };
}() : undefined);

},{"../internals/a-possible-prototype":2,"../internals/an-object":5}],81:[function(_dereq_,module,exports){
'use strict';

var TO_STRING_TAG_SUPPORT = _dereq_('../internals/to-string-tag-support');

var classof = _dereq_('../internals/classof'); // `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring


module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

},{"../internals/classof":17,"../internals/to-string-tag-support":109}],82:[function(_dereq_,module,exports){
var getBuiltIn = _dereq_('../internals/get-built-in');

var getOwnPropertyNamesModule = _dereq_('../internals/object-get-own-property-names');

var getOwnPropertySymbolsModule = _dereq_('../internals/object-get-own-property-symbols');

var anObject = _dereq_('../internals/an-object'); // all object keys, includes non-enumerable and symbols


module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

},{"../internals/an-object":5,"../internals/get-built-in":40,"../internals/object-get-own-property-names":74,"../internals/object-get-own-property-symbols":75}],83:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');

module.exports = global;

},{"../internals/global":42}],84:[function(_dereq_,module,exports){
module.exports = function (exec) {
  try {
    return {
      error: false,
      value: exec()
    };
  } catch (error) {
    return {
      error: true,
      value: error
    };
  }
};

},{}],85:[function(_dereq_,module,exports){
var anObject = _dereq_('../internals/an-object');

var isObject = _dereq_('../internals/is-object');

var newPromiseCapability = _dereq_('../internals/new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"../internals/an-object":5,"../internals/is-object":56,"../internals/new-promise-capability":66}],86:[function(_dereq_,module,exports){
var redefine = _dereq_('../internals/redefine');

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);

  return target;
};

},{"../internals/redefine":87}],87:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');

var createNonEnumerableProperty = _dereq_('../internals/create-non-enumerable-property');

var has = _dereq_('../internals/has');

var setGlobal = _dereq_('../internals/set-global');

var inspectSource = _dereq_('../internals/inspect-source');

var InternalStateModule = _dereq_('../internals/internal-state');

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');
(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;

  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }

  if (O === global) {
    if (simple) O[key] = value;else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }

  if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});

},{"../internals/create-non-enumerable-property":24,"../internals/global":42,"../internals/has":43,"../internals/inspect-source":50,"../internals/internal-state":52,"../internals/set-global":92}],88:[function(_dereq_,module,exports){
'use strict';

var regexpFlags = _dereq_('./regexp-flags');

var stickyHelpers = _dereq_('./regexp-sticky-helpers');

var nativeExec = RegExp.prototype.exec; // This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.

var nativeReplace = String.prototype.replace;
var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
}();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET; // nonparticipating capturing group, copied from es5-shim's String#split patch.

var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');

      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex); // Support anchored sticky behavior.

      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      } // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.


      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }

    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }

    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;

},{"./regexp-flags":89,"./regexp-sticky-helpers":90}],89:[function(_dereq_,module,exports){
'use strict';

var anObject = _dereq_('../internals/an-object'); // `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags


module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"../internals/an-object":5}],90:[function(_dereq_,module,exports){
'use strict';

var fails = _dereq_('./fails'); // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.


function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});
exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

},{"./fails":37}],91:[function(_dereq_,module,exports){
// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

},{}],92:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');

var createNonEnumerableProperty = _dereq_('../internals/create-non-enumerable-property');

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  }

  return value;
};

},{"../internals/create-non-enumerable-property":24,"../internals/global":42}],93:[function(_dereq_,module,exports){
'use strict';

var getBuiltIn = _dereq_('../internals/get-built-in');

var definePropertyModule = _dereq_('../internals/object-define-property');

var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var DESCRIPTORS = _dereq_('../internals/descriptors');

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () {
        return this;
      }
    });
  }
};

},{"../internals/descriptors":29,"../internals/get-built-in":40,"../internals/object-define-property":71,"../internals/well-known-symbol":113}],94:[function(_dereq_,module,exports){
var defineProperty = _dereq_('../internals/object-define-property').f;

var has = _dereq_('../internals/has');

var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, {
      configurable: true,
      value: TAG
    });
  }
};

},{"../internals/has":43,"../internals/object-define-property":71,"../internals/well-known-symbol":113}],95:[function(_dereq_,module,exports){
var shared = _dereq_('../internals/shared');

var uid = _dereq_('../internals/uid');

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

},{"../internals/shared":97,"../internals/uid":110}],96:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');

var setGlobal = _dereq_('../internals/set-global');

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});
module.exports = store;

},{"../internals/global":42,"../internals/set-global":92}],97:[function(_dereq_,module,exports){
var IS_PURE = _dereq_('../internals/is-pure');

var store = _dereq_('../internals/shared-store');

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});

},{"../internals/is-pure":57,"../internals/shared-store":96}],98:[function(_dereq_,module,exports){
var anObject = _dereq_('../internals/an-object');

var aFunction = _dereq_('../internals/a-function');

var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species'); // `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor

module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};

},{"../internals/a-function":1,"../internals/an-object":5,"../internals/well-known-symbol":113}],99:[function(_dereq_,module,exports){
var toInteger = _dereq_('../internals/to-integer');

var requireObjectCoercible = _dereq_('../internals/require-object-coercible'); // `String.prototype.{ codePointAt, at }` methods implementation


var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

},{"../internals/require-object-coercible":91,"../internals/to-integer":105}],100:[function(_dereq_,module,exports){
var fails = _dereq_('../internals/fails');

var whitespaces = _dereq_('../internals/whitespaces');

var non = '\u200B\u0085\u180E'; // check that a method works with the correct list
// of whitespaces and has a correct name

module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};

},{"../internals/fails":37,"../internals/whitespaces":114}],101:[function(_dereq_,module,exports){
var requireObjectCoercible = _dereq_('../internals/require-object-coercible');

var whitespaces = _dereq_('../internals/whitespaces');

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};

},{"../internals/require-object-coercible":91,"../internals/whitespaces":114}],102:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');

var fails = _dereq_('../internals/fails');

var classof = _dereq_('../internals/classof-raw');

var bind = _dereq_('../internals/function-bind-context');

var html = _dereq_('../internals/html');

var createElement = _dereq_('../internals/document-create-element');

var IS_IOS = _dereq_('../internals/engine-is-ios');

var location = global.location;
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(id + '', location.protocol + '//' + location.host);
}; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;

    while (arguments.length > i) args.push(arguments[i++]);

    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };

    defer(counter);
    return counter;
  };

  clear = function clearImmediate(id) {
    delete queue[id];
  }; // Node.js 0.8-


  if (classof(process) == 'process') {
    defer = function (id) {
      process.nextTick(runner(id));
    }; // Sphere (JS game engine) Dispatch API

  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    }; // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624

  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1); // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts && !fails(post) && location.protocol !== 'file:') {
    defer = post;
    global.addEventListener('message', listener, false); // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    }; // Rest old browsers

  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};

},{"../internals/classof-raw":16,"../internals/document-create-element":30,"../internals/engine-is-ios":32,"../internals/fails":37,"../internals/function-bind-context":39,"../internals/global":42,"../internals/html":46}],103:[function(_dereq_,module,exports){
var toInteger = _dereq_('../internals/to-integer');

var max = Math.max;
var min = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

},{"../internals/to-integer":105}],104:[function(_dereq_,module,exports){
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = _dereq_('../internals/indexed-object');

var requireObjectCoercible = _dereq_('../internals/require-object-coercible');

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

},{"../internals/indexed-object":48,"../internals/require-object-coercible":91}],105:[function(_dereq_,module,exports){
var ceil = Math.ceil;
var floor = Math.floor; // `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger

module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

},{}],106:[function(_dereq_,module,exports){
var toInteger = _dereq_('../internals/to-integer');

var min = Math.min; // `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength

module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"../internals/to-integer":105}],107:[function(_dereq_,module,exports){
var requireObjectCoercible = _dereq_('../internals/require-object-coercible'); // `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject


module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};

},{"../internals/require-object-coercible":91}],108:[function(_dereq_,module,exports){
var isObject = _dereq_('../internals/is-object'); // `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string


module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"../internals/is-object":56}],109:[function(_dereq_,module,exports){
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z';
module.exports = String(test) === '[object z]';

},{"../internals/well-known-symbol":113}],110:[function(_dereq_,module,exports){
var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

},{}],111:[function(_dereq_,module,exports){
var NATIVE_SYMBOL = _dereq_('../internals/native-symbol');

module.exports = NATIVE_SYMBOL // eslint-disable-next-line no-undef
&& !Symbol.sham // eslint-disable-next-line no-undef
&& typeof Symbol.iterator == 'symbol';

},{"../internals/native-symbol":64}],112:[function(_dereq_,module,exports){
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

exports.f = wellKnownSymbol;

},{"../internals/well-known-symbol":113}],113:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');

var shared = _dereq_('../internals/shared');

var has = _dereq_('../internals/has');

var uid = _dereq_('../internals/uid');

var NATIVE_SYMBOL = _dereq_('../internals/native-symbol');

var USE_SYMBOL_AS_UID = _dereq_('../internals/use-symbol-as-uid');

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  }

  return WellKnownSymbolsStore[name];
};

},{"../internals/global":42,"../internals/has":43,"../internals/native-symbol":64,"../internals/shared":97,"../internals/uid":110,"../internals/use-symbol-as-uid":111}],114:[function(_dereq_,module,exports){
// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],115:[function(_dereq_,module,exports){
'use strict';

var $ = _dereq_('../internals/export');

var fails = _dereq_('../internals/fails');

var isArray = _dereq_('../internals/is-array');

var isObject = _dereq_('../internals/is-object');

var toObject = _dereq_('../internals/to-object');

var toLength = _dereq_('../internals/to-length');

var createProperty = _dereq_('../internals/create-property');

var arraySpeciesCreate = _dereq_('../internals/array-species-create');

var arrayMethodHasSpeciesSupport = _dereq_('../internals/array-method-has-species-support');

var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var V8_VERSION = _dereq_('../internals/engine-v8-version');

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679

var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species

$({
  target: 'Array',
  proto: true,
  forced: FORCED
}, {
  concat: function concat(arg) {
    // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;

    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];

      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }

    A.length = n;
    return A;
  }
});

},{"../internals/array-method-has-species-support":10,"../internals/array-species-create":13,"../internals/create-property":26,"../internals/engine-v8-version":34,"../internals/export":36,"../internals/fails":37,"../internals/is-array":54,"../internals/is-object":56,"../internals/to-length":106,"../internals/to-object":107,"../internals/well-known-symbol":113}],116:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');

var fill = _dereq_('../internals/array-fill');

var addToUnscopables = _dereq_('../internals/add-to-unscopables'); // `Array.prototype.fill` method
// https://tc39.github.io/ecma262/#sec-array.prototype.fill


$({
  target: 'Array',
  proto: true
}, {
  fill: fill
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('fill');

},{"../internals/add-to-unscopables":3,"../internals/array-fill":6,"../internals/export":36}],117:[function(_dereq_,module,exports){
'use strict';

var $ = _dereq_('../internals/export');

var $filter = _dereq_('../internals/array-iteration').filter;

var arrayMethodHasSpeciesSupport = _dereq_('../internals/array-method-has-species-support');

var arrayMethodUsesToLength = _dereq_('../internals/array-method-uses-to-length');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter'); // Edge 14- issue

var USES_TO_LENGTH = arrayMethodUsesToLength('filter'); // `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species

$({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH
}, {
  filter: function filter(callbackfn
  /* , thisArg */
  ) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/array-iteration":9,"../internals/array-method-has-species-support":10,"../internals/array-method-uses-to-length":12,"../internals/export":36}],118:[function(_dereq_,module,exports){
'use strict';

var $ = _dereq_('../internals/export');

var forEach = _dereq_('../internals/array-for-each'); // `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach


$({
  target: 'Array',
  proto: true,
  forced: [].forEach != forEach
}, {
  forEach: forEach
});

},{"../internals/array-for-each":7,"../internals/export":36}],119:[function(_dereq_,module,exports){
'use strict';

var $ = _dereq_('../internals/export');

var $includes = _dereq_('../internals/array-includes').includes;

var addToUnscopables = _dereq_('../internals/add-to-unscopables');

var arrayMethodUsesToLength = _dereq_('../internals/array-method-uses-to-length');

var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', {
  ACCESSORS: true,
  1: 0
}); // `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes

$({
  target: 'Array',
  proto: true,
  forced: !USES_TO_LENGTH
}, {
  includes: function includes(el
  /* , fromIndex = 0 */
  ) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('includes');

},{"../internals/add-to-unscopables":3,"../internals/array-includes":8,"../internals/array-method-uses-to-length":12,"../internals/export":36}],120:[function(_dereq_,module,exports){
'use strict';

var toIndexedObject = _dereq_('../internals/to-indexed-object');

var addToUnscopables = _dereq_('../internals/add-to-unscopables');

var Iterators = _dereq_('../internals/iterators');

var InternalStateModule = _dereq_('../internals/internal-state');

var defineIterator = _dereq_('../internals/define-iterator');

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator

module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated),
    // target
    index: 0,
    // next index
    kind: kind // kind

  }); // `%ArrayIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;

  if (!target || index >= target.length) {
    state.target = undefined;
    return {
      value: undefined,
      done: true
    };
  }

  if (kind == 'keys') return {
    value: index,
    done: false
  };
  if (kind == 'values') return {
    value: target[index],
    done: false
  };
  return {
    value: [index, target[index]],
    done: false
  };
}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject

Iterators.Arguments = Iterators.Array; // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"../internals/add-to-unscopables":3,"../internals/define-iterator":27,"../internals/internal-state":52,"../internals/iterators":61,"../internals/to-indexed-object":104}],121:[function(_dereq_,module,exports){
'use strict';

var $ = _dereq_('../internals/export');

var IndexedObject = _dereq_('../internals/indexed-object');

var toIndexedObject = _dereq_('../internals/to-indexed-object');

var arrayMethodIsStrict = _dereq_('../internals/array-method-is-strict');

var nativeJoin = [].join;
var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ','); // `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join

$({
  target: 'Array',
  proto: true,
  forced: ES3_STRINGS || !STRICT_METHOD
}, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});

},{"../internals/array-method-is-strict":11,"../internals/export":36,"../internals/indexed-object":48,"../internals/to-indexed-object":104}],122:[function(_dereq_,module,exports){
'use strict';

var $ = _dereq_('../internals/export');

var $map = _dereq_('../internals/array-iteration').map;

var arrayMethodHasSpeciesSupport = _dereq_('../internals/array-method-has-species-support');

var arrayMethodUsesToLength = _dereq_('../internals/array-method-uses-to-length');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map'); // FF49- issue

var USES_TO_LENGTH = arrayMethodUsesToLength('map'); // `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species

$({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH
}, {
  map: function map(callbackfn
  /* , thisArg */
  ) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/array-iteration":9,"../internals/array-method-has-species-support":10,"../internals/array-method-uses-to-length":12,"../internals/export":36}],123:[function(_dereq_,module,exports){
'use strict';

var $ = _dereq_('../internals/export');

var isObject = _dereq_('../internals/is-object');

var isArray = _dereq_('../internals/is-array');

var toAbsoluteIndex = _dereq_('../internals/to-absolute-index');

var toLength = _dereq_('../internals/to-length');

var toIndexedObject = _dereq_('../internals/to-indexed-object');

var createProperty = _dereq_('../internals/create-property');

var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var arrayMethodHasSpeciesSupport = _dereq_('../internals/array-method-has-species-support');

var arrayMethodUsesToLength = _dereq_('../internals/array-method-uses-to-length');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH = arrayMethodUsesToLength('slice', {
  ACCESSORS: true,
  0: 0,
  1: 2
});
var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max; // `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects

$({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH
}, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

    var Constructor, result, n;

    if (isArray(O)) {
      Constructor = O.constructor; // cross-realm fallback

      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }

      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }

    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));

    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);

    result.length = n;
    return result;
  }
});

},{"../internals/array-method-has-species-support":10,"../internals/array-method-uses-to-length":12,"../internals/create-property":26,"../internals/export":36,"../internals/is-array":54,"../internals/is-object":56,"../internals/to-absolute-index":103,"../internals/to-indexed-object":104,"../internals/to-length":106,"../internals/well-known-symbol":113}],124:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');

var assign = _dereq_('../internals/object-assign'); // `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign


$({
  target: 'Object',
  stat: true,
  forced: Object.assign !== assign
}, {
  assign: assign
});

},{"../internals/export":36,"../internals/object-assign":68}],125:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');

var fails = _dereq_('../internals/fails');

var toIndexedObject = _dereq_('../internals/to-indexed-object');

var nativeGetOwnPropertyDescriptor = _dereq_('../internals/object-get-own-property-descriptor').f;

var DESCRIPTORS = _dereq_('../internals/descriptors');

var FAILS_ON_PRIMITIVES = fails(function () {
  nativeGetOwnPropertyDescriptor(1);
});
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES; // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

$({
  target: 'Object',
  stat: true,
  forced: FORCED,
  sham: !DESCRIPTORS
}, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});

},{"../internals/descriptors":29,"../internals/export":36,"../internals/fails":37,"../internals/object-get-own-property-descriptor":72,"../internals/to-indexed-object":104}],126:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');

var fails = _dereq_('../internals/fails');

var nativeGetOwnPropertyNames = _dereq_('../internals/object-get-own-property-names-external').f;

var FAILS_ON_PRIMITIVES = fails(function () {
  return !Object.getOwnPropertyNames(1);
}); // `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

$({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES
}, {
  getOwnPropertyNames: nativeGetOwnPropertyNames
});

},{"../internals/export":36,"../internals/fails":37,"../internals/object-get-own-property-names-external":73}],127:[function(_dereq_,module,exports){
var TO_STRING_TAG_SUPPORT = _dereq_('../internals/to-string-tag-support');

var redefine = _dereq_('../internals/redefine');

var toString = _dereq_('../internals/object-to-string'); // `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring


if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, {
    unsafe: true
  });
}

},{"../internals/object-to-string":81,"../internals/redefine":87,"../internals/to-string-tag-support":109}],128:[function(_dereq_,module,exports){
'use strict';

var $ = _dereq_('../internals/export');

var IS_PURE = _dereq_('../internals/is-pure');

var global = _dereq_('../internals/global');

var getBuiltIn = _dereq_('../internals/get-built-in');

var NativePromise = _dereq_('../internals/native-promise-constructor');

var redefine = _dereq_('../internals/redefine');

var redefineAll = _dereq_('../internals/redefine-all');

var setToStringTag = _dereq_('../internals/set-to-string-tag');

var setSpecies = _dereq_('../internals/set-species');

var isObject = _dereq_('../internals/is-object');

var aFunction = _dereq_('../internals/a-function');

var anInstance = _dereq_('../internals/an-instance');

var classof = _dereq_('../internals/classof-raw');

var inspectSource = _dereq_('../internals/inspect-source');

var iterate = _dereq_('../internals/iterate');

var checkCorrectnessOfIteration = _dereq_('../internals/check-correctness-of-iteration');

var speciesConstructor = _dereq_('../internals/species-constructor');

var task = _dereq_('../internals/task').set;

var microtask = _dereq_('../internals/microtask');

var promiseResolve = _dereq_('../internals/promise-resolve');

var hostReportErrors = _dereq_('../internals/host-report-errors');

var newPromiseCapabilityModule = _dereq_('../internals/new-promise-capability');

var perform = _dereq_('../internals/perform');

var InternalStateModule = _dereq_('../internals/internal-state');

var isForced = _dereq_('../internals/is-forced');

var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var V8_VERSION = _dereq_('../internals/engine-v8-version');

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var PromiseConstructor = NativePromise;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var $fetch = getBuiltIn('fetch');
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var IS_NODE = classof(process) == 'process';
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
var FORCED = isForced(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);

  if (!GLOBAL_CORE_JS_PROMISE) {
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (V8_VERSION === 66) return true; // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test

    if (!IS_NODE && typeof PromiseRejectionEvent != 'function') return true;
  } // We need Promise#finally in the pure version for preventing prototype pollution


  if (IS_PURE && !PromiseConstructor.prototype['finally']) return true; // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679

  if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false; // Detect correctness of subclassing with @@species support

  var promise = PromiseConstructor.resolve(1);

  var FakePromise = function (exec) {
    exec(function () {
      /* empty */
    }, function () {
      /* empty */
    });
  };

  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  return !(promise.then(function () {
    /* empty */
  }) instanceof FakePromise);
});
var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () {
    /* empty */
  });
}); // helpers

var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (promise, state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0; // variable length - can't use forEach

    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;

      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
            state.rejection = HANDLED;
          }

          if (handler === true) result = value;else {
            if (domain) domain.enter();
            result = handler(value); // can throw

            if (domain) {
              domain.exit();
              exited = true;
            }
          }

          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }

    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(promise, state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;

  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = {
    promise: promise,
    reason: reason
  };

  if (handler = global['on' + name]) handler(event);else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (promise, state) {
  task.call(global, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;

    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      }); // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should

      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (promise, state) {
  task.call(global, function () {
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, promise, state, unwrap) {
  return function (value) {
    fn(promise, state, value, unwrap);
  };
};

var internalReject = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(promise, state, true);
};

var internalResolve = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;

  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);

    if (then) {
      microtask(function () {
        var wrapper = {
          done: false
        };

        try {
          then.call(value, bind(internalResolve, promise, wrapper, state), bind(internalReject, promise, wrapper, state));
        } catch (error) {
          internalReject(promise, wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(promise, state, false);
    }
  } catch (error) {
    internalReject(promise, {
      done: false
    }, error, state);
  }
}; // constructor polyfill


if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);

    try {
      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
    } catch (error) {
      internalReject(this, state, error);
    }
  }; // eslint-disable-next-line no-unused-vars


  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };

  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(this, state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });

  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, promise, state);
    this.reject = bind(internalReject, promise, state);
  };

  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function') {
    nativeThen = NativePromise.prototype.then; // wrap native Promise#then for native async functions

    redefine(NativePromise.prototype, 'then', function then(onFulfilled, onRejected) {
      var that = this;
      return new PromiseConstructor(function (resolve, reject) {
        nativeThen.call(that, resolve, reject);
      }).then(onFulfilled, onRejected); // https://github.com/zloirock/core-js/issues/640
    }, {
      unsafe: true
    }); // wrap fetch result

    if (typeof $fetch == 'function') $({
      global: true,
      enumerable: true,
      forced: true
    }, {
      // eslint-disable-next-line no-unused-vars
      fetch: function fetch(input
      /* , init */
      ) {
        return promiseResolve(PromiseConstructor, $fetch.apply(global, arguments));
      }
    });
  }
}

$({
  global: true,
  wrap: true,
  forced: FORCED
}, {
  Promise: PromiseConstructor
});
setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);
PromiseWrapper = getBuiltIn(PROMISE); // statics

$({
  target: PROMISE,
  stat: true,
  forced: FORCED
}, {
  // `Promise.reject` method
  // https://tc39.github.io/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});
$({
  target: PROMISE,
  stat: true,
  forced: IS_PURE || FORCED
}, {
  // `Promise.resolve` method
  // https://tc39.github.io/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});
$({
  target: PROMISE,
  stat: true,
  forced: INCORRECT_ITERATION
}, {
  // `Promise.all` method
  // https://tc39.github.io/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.github.io/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

},{"../internals/a-function":1,"../internals/an-instance":4,"../internals/check-correctness-of-iteration":15,"../internals/classof-raw":16,"../internals/engine-v8-version":34,"../internals/export":36,"../internals/get-built-in":40,"../internals/global":42,"../internals/host-report-errors":45,"../internals/inspect-source":50,"../internals/internal-state":52,"../internals/is-forced":55,"../internals/is-object":56,"../internals/is-pure":57,"../internals/iterate":59,"../internals/microtask":62,"../internals/native-promise-constructor":63,"../internals/new-promise-capability":66,"../internals/perform":84,"../internals/promise-resolve":85,"../internals/redefine":87,"../internals/redefine-all":86,"../internals/set-species":93,"../internals/set-to-string-tag":94,"../internals/species-constructor":98,"../internals/task":102,"../internals/well-known-symbol":113}],129:[function(_dereq_,module,exports){
var DESCRIPTORS = _dereq_('../internals/descriptors');

var global = _dereq_('../internals/global');

var isForced = _dereq_('../internals/is-forced');

var inheritIfRequired = _dereq_('../internals/inherit-if-required');

var defineProperty = _dereq_('../internals/object-define-property').f;

var getOwnPropertyNames = _dereq_('../internals/object-get-own-property-names').f;

var isRegExp = _dereq_('../internals/is-regexp');

var getFlags = _dereq_('../internals/regexp-flags');

var stickyHelpers = _dereq_('../internals/regexp-sticky-helpers');

var redefine = _dereq_('../internals/redefine');

var fails = _dereq_('../internals/fails');

var setInternalState = _dereq_('../internals/internal-state').set;

var setSpecies = _dereq_('../internals/set-species');

var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g; // "new" should create a new object, old webkit bug

var CORRECT_NEW = new NativeRegExp(re1) !== re1;
var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var FORCED = DESCRIPTORS && isForced('RegExp', !CORRECT_NEW || UNSUPPORTED_Y || fails(function () {
  re2[MATCH] = false; // RegExp constructor can alter flags and IsRegExp works correct with @@match

  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})); // `RegExp` constructor
// https://tc39.github.io/ecma262/#sec-regexp-constructor

if (FORCED) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var sticky;

    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
      return pattern;
    }

    if (CORRECT_NEW) {
      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
    } else if (pattern instanceof RegExpWrapper) {
      if (flagsAreUndefined) flags = getFlags.call(pattern);
      pattern = pattern.source;
    }

    if (UNSUPPORTED_Y) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }

    var result = inheritIfRequired(CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);
    if (UNSUPPORTED_Y && sticky) setInternalState(result, {
      sticky: sticky
    });
    return result;
  };

  var proxy = function (key) {
    key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
      configurable: true,
      get: function () {
        return NativeRegExp[key];
      },
      set: function (it) {
        NativeRegExp[key] = it;
      }
    });
  };

  var keys = getOwnPropertyNames(NativeRegExp);
  var index = 0;

  while (keys.length > index) proxy(keys[index++]);

  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global, 'RegExp', RegExpWrapper);
} // https://tc39.github.io/ecma262/#sec-get-regexp-@@species


setSpecies('RegExp');

},{"../internals/descriptors":29,"../internals/fails":37,"../internals/global":42,"../internals/inherit-if-required":49,"../internals/internal-state":52,"../internals/is-forced":55,"../internals/is-regexp":58,"../internals/object-define-property":71,"../internals/object-get-own-property-names":74,"../internals/redefine":87,"../internals/regexp-flags":89,"../internals/regexp-sticky-helpers":90,"../internals/set-species":93,"../internals/well-known-symbol":113}],130:[function(_dereq_,module,exports){
'use strict';

var $ = _dereq_('../internals/export');

var exec = _dereq_('../internals/regexp-exec');

$({
  target: 'RegExp',
  proto: true,
  forced: /./.exec !== exec
}, {
  exec: exec
});

},{"../internals/export":36,"../internals/regexp-exec":88}],131:[function(_dereq_,module,exports){
'use strict';

var redefine = _dereq_('../internals/redefine');

var anObject = _dereq_('../internals/an-object');

var fails = _dereq_('../internals/fails');

var flags = _dereq_('../internals/regexp-flags');

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];
var NOT_GENERIC = fails(function () {
  return nativeToString.call({
    source: 'a',
    flags: 'b'
  }) != '/a/b';
}); // FF44- RegExp#toString has a wrong name

var INCORRECT_NAME = nativeToString.name != TO_STRING; // `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring

if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, {
    unsafe: true
  });
}

},{"../internals/an-object":5,"../internals/fails":37,"../internals/redefine":87,"../internals/regexp-flags":89}],132:[function(_dereq_,module,exports){
'use strict';

var $ = _dereq_('../internals/export');

var notARegExp = _dereq_('../internals/not-a-regexp');

var requireObjectCoercible = _dereq_('../internals/require-object-coercible');

var correctIsRegExpLogic = _dereq_('../internals/correct-is-regexp-logic'); // `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes


$({
  target: 'String',
  proto: true,
  forced: !correctIsRegExpLogic('includes')
}, {
  includes: function includes(searchString
  /* , position = 0 */
  ) {
    return !!~String(requireObjectCoercible(this)).indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/correct-is-regexp-logic":21,"../internals/export":36,"../internals/not-a-regexp":67,"../internals/require-object-coercible":91}],133:[function(_dereq_,module,exports){
'use strict';

var charAt = _dereq_('../internals/string-multibyte').charAt;

var InternalStateModule = _dereq_('../internals/internal-state');

var defineIterator = _dereq_('../internals/define-iterator');

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator

defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  }); // `%StringIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return {
    value: undefined,
    done: true
  };
  point = charAt(string, index);
  state.index += point.length;
  return {
    value: point,
    done: false
  };
});

},{"../internals/define-iterator":27,"../internals/internal-state":52,"../internals/string-multibyte":99}],134:[function(_dereq_,module,exports){
'use strict';

var $ = _dereq_('../internals/export');

var $trim = _dereq_('../internals/string-trim').trim;

var forcedStringTrimMethod = _dereq_('../internals/string-trim-forced'); // `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim


$({
  target: 'String',
  proto: true,
  forced: forcedStringTrimMethod('trim')
}, {
  trim: function trim() {
    return $trim(this);
  }
});

},{"../internals/export":36,"../internals/string-trim":101,"../internals/string-trim-forced":100}],135:[function(_dereq_,module,exports){
// `Symbol.prototype.description` getter
// https://tc39.github.io/ecma262/#sec-symbol.prototype.description
'use strict';

var $ = _dereq_('../internals/export');

var DESCRIPTORS = _dereq_('../internals/descriptors');

var global = _dereq_('../internals/global');

var has = _dereq_('../internals/has');

var isObject = _dereq_('../internals/is-object');

var defineProperty = _dereq_('../internals/object-define-property').f;

var copyConstructorProperties = _dereq_('../internals/copy-constructor-properties');

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) || // Safari 12 bug
NativeSymbol().description !== undefined)) {
  var EmptyStringDescriptionStore = {}; // wrap Symbol constructor for correct work with undefined description

  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper ? new NativeSymbol(description) // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
    : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };

  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;
  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });
  $({
    global: true,
    forced: true
  }, {
    Symbol: SymbolWrapper
  });
}

},{"../internals/copy-constructor-properties":20,"../internals/descriptors":29,"../internals/export":36,"../internals/global":42,"../internals/has":43,"../internals/is-object":56,"../internals/object-define-property":71}],136:[function(_dereq_,module,exports){
var defineWellKnownSymbol = _dereq_('../internals/define-well-known-symbol'); // `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator


defineWellKnownSymbol('iterator');

},{"../internals/define-well-known-symbol":28}],137:[function(_dereq_,module,exports){
'use strict';

var $ = _dereq_('../internals/export');

var global = _dereq_('../internals/global');

var getBuiltIn = _dereq_('../internals/get-built-in');

var IS_PURE = _dereq_('../internals/is-pure');

var DESCRIPTORS = _dereq_('../internals/descriptors');

var NATIVE_SYMBOL = _dereq_('../internals/native-symbol');

var USE_SYMBOL_AS_UID = _dereq_('../internals/use-symbol-as-uid');

var fails = _dereq_('../internals/fails');

var has = _dereq_('../internals/has');

var isArray = _dereq_('../internals/is-array');

var isObject = _dereq_('../internals/is-object');

var anObject = _dereq_('../internals/an-object');

var toObject = _dereq_('../internals/to-object');

var toIndexedObject = _dereq_('../internals/to-indexed-object');

var toPrimitive = _dereq_('../internals/to-primitive');

var createPropertyDescriptor = _dereq_('../internals/create-property-descriptor');

var nativeObjectCreate = _dereq_('../internals/object-create');

var objectKeys = _dereq_('../internals/object-keys');

var getOwnPropertyNamesModule = _dereq_('../internals/object-get-own-property-names');

var getOwnPropertyNamesExternal = _dereq_('../internals/object-get-own-property-names-external');

var getOwnPropertySymbolsModule = _dereq_('../internals/object-get-own-property-symbols');

var getOwnPropertyDescriptorModule = _dereq_('../internals/object-get-own-property-descriptor');

var definePropertyModule = _dereq_('../internals/object-define-property');

var propertyIsEnumerableModule = _dereq_('../internals/object-property-is-enumerable');

var createNonEnumerableProperty = _dereq_('../internals/create-non-enumerable-property');

var redefine = _dereq_('../internals/redefine');

var shared = _dereq_('../internals/shared');

var sharedKey = _dereq_('../internals/shared-key');

var hiddenKeys = _dereq_('../internals/hidden-keys');

var uid = _dereq_('../internals/uid');

var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var wrappedWellKnownSymbolModule = _dereq_('../internals/well-known-symbol-wrapped');

var defineWellKnownSymbol = _dereq_('../internals/define-well-known-symbol');

var setToStringTag = _dereq_('../internals/set-to-string-tag');

var InternalStateModule = _dereq_('../internals/internal-state');

var $forEach = _dereq_('../internals/array-iteration').forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () {
      return nativeDefineProperty(this, 'a', {
        value: 7
      }).a;
    }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);

  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);

  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, {
        enumerable: createPropertyDescriptor(0, false)
      });
    }

    return setSymbolDescriptor(O, key, Attributes);
  }

  return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);

  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }

  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
}; // `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor


if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);

    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };

    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, {
      configurable: true,
      set: setter
    });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });
  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });
  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });

    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, {
        unsafe: true
      });
    }
  }
}

$({
  global: true,
  wrap: true,
  forced: !NATIVE_SYMBOL,
  sham: !NATIVE_SYMBOL
}, {
  Symbol: $Symbol
});
$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});
$({
  target: SYMBOL,
  stat: true,
  forced: !NATIVE_SYMBOL
}, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () {
    USE_SETTER = true;
  },
  useSimple: function () {
    USE_SETTER = false;
  }
});
$({
  target: 'Object',
  stat: true,
  forced: !NATIVE_SYMBOL,
  sham: !DESCRIPTORS
}, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});
$({
  target: 'Object',
  stat: true,
  forced: !NATIVE_SYMBOL
}, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
}); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443

$({
  target: 'Object',
  stat: true,
  forced: fails(function () {
    getOwnPropertySymbolsModule.f(1);
  })
}, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
}); // `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify

if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

    return $stringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
    || $stringify({
      a: symbol
    }) != '{}' // V8 throws on boxed symbols
    || $stringify(Object(symbol)) != '{}';
  });
  $({
    target: 'JSON',
    stat: true,
    forced: FORCED_JSON_STRINGIFY
  }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;

      while (arguments.length > index) args.push(arguments[index++]);

      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
} // `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive


if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
} // `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag


setToStringTag($Symbol, SYMBOL);
hiddenKeys[HIDDEN] = true;

},{"../internals/an-object":5,"../internals/array-iteration":9,"../internals/create-non-enumerable-property":24,"../internals/create-property-descriptor":25,"../internals/define-well-known-symbol":28,"../internals/descriptors":29,"../internals/export":36,"../internals/fails":37,"../internals/get-built-in":40,"../internals/global":42,"../internals/has":43,"../internals/hidden-keys":44,"../internals/internal-state":52,"../internals/is-array":54,"../internals/is-object":56,"../internals/is-pure":57,"../internals/native-symbol":64,"../internals/object-create":69,"../internals/object-define-property":71,"../internals/object-get-own-property-descriptor":72,"../internals/object-get-own-property-names":74,"../internals/object-get-own-property-names-external":73,"../internals/object-get-own-property-symbols":75,"../internals/object-keys":78,"../internals/object-property-is-enumerable":79,"../internals/redefine":87,"../internals/set-to-string-tag":94,"../internals/shared":97,"../internals/shared-key":95,"../internals/to-indexed-object":104,"../internals/to-object":107,"../internals/to-primitive":108,"../internals/uid":110,"../internals/use-symbol-as-uid":111,"../internals/well-known-symbol":113,"../internals/well-known-symbol-wrapped":112}],138:[function(_dereq_,module,exports){
'use strict';

var global = _dereq_('../internals/global');

var redefineAll = _dereq_('../internals/redefine-all');

var InternalMetadataModule = _dereq_('../internals/internal-metadata');

var collection = _dereq_('../internals/collection');

var collectionWeak = _dereq_('../internals/collection-weak');

var isObject = _dereq_('../internals/is-object');

var enforceIternalState = _dereq_('../internals/internal-state').enforce;

var NATIVE_WEAK_MAP = _dereq_('../internals/native-weak-map');

var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var isExtensible = Object.isExtensible;
var InternalWeakMap;

var wrapper = function (init) {
  return function WeakMap() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
}; // `WeakMap` constructor
// https://tc39.github.io/ecma262/#sec-weakmap-constructor


var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak); // IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485

if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  InternalMetadataModule.REQUIRED = true;
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeDelete = WeakMapPrototype['delete'];
  var nativeHas = WeakMapPrototype.has;
  var nativeGet = WeakMapPrototype.get;
  var nativeSet = WeakMapPrototype.set;
  redefineAll(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete.call(this, key) || state.frozen['delete'](key);
      }

      return nativeDelete.call(this, key);
    },
    has: function has(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) || state.frozen.has(key);
      }

      return nativeHas.call(this, key);
    },
    get: function get(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
      }

      return nativeGet.call(this, key);
    },
    set: function set(key, value) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
      } else nativeSet.call(this, key, value);

      return this;
    }
  });
}

},{"../internals/collection":19,"../internals/collection-weak":18,"../internals/global":42,"../internals/internal-metadata":51,"../internals/internal-state":52,"../internals/is-object":56,"../internals/native-weak-map":65,"../internals/redefine-all":86}],139:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');

var DOMIterables = _dereq_('../internals/dom-iterables');

var forEach = _dereq_('../internals/array-for-each');

var createNonEnumerableProperty = _dereq_('../internals/create-non-enumerable-property');

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype; // some Chrome versions have non-configurable methods on DOMTokenList

  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}

},{"../internals/array-for-each":7,"../internals/create-non-enumerable-property":24,"../internals/dom-iterables":31,"../internals/global":42}],140:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');

var DOMIterables = _dereq_('../internals/dom-iterables');

var ArrayIteratorMethods = _dereq_('../modules/es.array.iterator');

var createNonEnumerableProperty = _dereq_('../internals/create-non-enumerable-property');

var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;

  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }

    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }

    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}

},{"../internals/create-non-enumerable-property":24,"../internals/dom-iterables":31,"../internals/global":42,"../internals/well-known-symbol":113,"../modules/es.array.iterator":120}],141:[function(_dereq_,module,exports){
"use strict";

var _main = _interopRequireDefault(_dereq_("./core/main"));

_dereq_("./core/constants");

_dereq_("./core/environment");

_dereq_("./core/preload");

_dereq_("./core/p5sound.Element");

_dereq_("./core/p5sound.Renderer");

_dereq_("./core/p5sound.Renderer2D");

_dereq_("./core/rendering");

_dereq_("./core/structure");

_dereq_("./core/shape/2d_primitives");

_dereq_("./core/shape/attributes");

_dereq_("./color/creating_reading");

_dereq_("./color/p5sound.Color");

_dereq_("./color/setting");

var _audioContext = _dereq_("./sound/audioContext");

_dereq_("./sound/main");

var _p5sound5 = _interopRequireDefault(_dereq_("./sound/p5sound.Oscillator"));

_dereq_("./sound/p5sound.SoundFile");

_dereq_("./utilities/conversion");

_dereq_("./core/init");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // core
// color
// sound


_main.default.prototype.getAudioContext = _audioContext.getAudioContext;
_main.default.prototype.Oscillator = _p5sound5.default;
module.exports = _main.default;

},{"./color/creating_reading":142,"./color/p5sound.Color":143,"./color/setting":144,"./core/constants":145,"./core/environment":146,"./core/init":147,"./core/main":148,"./core/p5sound.Element":149,"./core/p5sound.Renderer":150,"./core/p5sound.Renderer2D":151,"./core/preload":152,"./core/rendering":153,"./core/shape/2d_primitives":154,"./core/shape/attributes":155,"./core/structure":156,"./sound/audioContext":157,"./sound/main":158,"./sound/p5sound.Oscillator":159,"./sound/p5sound.SoundFile":160,"./utilities/conversion":161}],142:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = _interopRequireDefault(_dereq_("../core/main"));

_dereq_("./p5sound.Color");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * @module Color
 * @submodule Creating & Reading
 * @for p5
 * @requires core
 * @requires constants
 */


_main.default.prototype.color = function () {
  if (arguments[0] instanceof _main.default.Color) {
    return arguments[0]; // Do nothing if argument is already a color object.
  }

  var args = arguments[0] instanceof Array ? arguments[0] : arguments;
  return new _main.default.Color(this, args);
};

var _default = _main.default;
exports.default = _default;

},{"../core/main":148,"./p5sound.Color":143}],143:[function(_dereq_,module,exports){
"use strict";

_dereq_("core-js/modules/es.symbol");

_dereq_("core-js/modules/es.symbol.description");

_dereq_("core-js/modules/es.symbol.iterator");

_dereq_("core-js/modules/es.array.includes");

_dereq_("core-js/modules/es.array.iterator");

_dereq_("core-js/modules/es.array.join");

_dereq_("core-js/modules/es.array.map");

_dereq_("core-js/modules/es.array.slice");

_dereq_("core-js/modules/es.object.get-own-property-descriptor");

_dereq_("core-js/modules/es.object.to-string");

_dereq_("core-js/modules/es.regexp.constructor");

_dereq_("core-js/modules/es.regexp.exec");

_dereq_("core-js/modules/es.regexp.to-string");

_dereq_("core-js/modules/es.string.includes");

_dereq_("core-js/modules/es.string.iterator");

_dereq_("core-js/modules/es.string.trim");

_dereq_("core-js/modules/es.weak-map");

_dereq_("core-js/modules/web.dom-collections.iterator");

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

_dereq_("core-js/modules/es.array.includes");

_dereq_("core-js/modules/es.array.join");

_dereq_("core-js/modules/es.array.map");

_dereq_("core-js/modules/es.array.slice");

_dereq_("core-js/modules/es.regexp.constructor");

_dereq_("core-js/modules/es.regexp.exec");

_dereq_("core-js/modules/es.regexp.to-string");

_dereq_("core-js/modules/es.string.includes");

_dereq_("core-js/modules/es.string.trim");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = _interopRequireDefault(_dereq_("../core/main"));

var constants = _interopRequireWildcard(_dereq_("../core/constants"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
/**
 * CSS named colors.
 */


var namedColors = {
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

var WHITESPACE = /\s*/; // Match zero or more whitespace characters.

var INTEGER = /(\d{1,3})/; // Match integers: 79, 255, etc.

/**
 * Full color string patterns. The capture groups are necessary.
 */

var colorPatterns = {
  // Match colors in format rgb(R, G, B), e.g. rgb(255, 0, 128).
  RGB: new RegExp(['^rgb\\(', INTEGER.source, ',', INTEGER.source, ',', INTEGER.source, '\\)$'].join(WHITESPACE.source), 'i')
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

_main.default.Color =
/*#__PURE__*/
function () {
  function Color(pInst, vals) {
    _classCallCheck(this, Color); // Record color mode and maxes at time of construction.


    this._storeModeAndMaxes(pInst._colorMode, pInst._colorMaxes); // Calculate normalized RGBA values.


    if (![constants.RGB].includes(this.mode)) {
      throw new Error("".concat(this.mode, " is an invalid colorMode."));
    } else {
      this._array = Color._parseInputs.apply(this, vals);
    } // Expose closest screen color.


    this._calculateLevels();
  } // calculates and stores the closest screen levels


  _createClass(Color, [{
    key: "_calculateLevels",
    value: function _calculateLevels() {
      var array = this._array; // (loop backwards for performance)

      var levels = this.levels = new Array(array.length);

      for (var i = array.length - 1; i >= 0; --i) {
        levels[i] = Math.round(array[i] * 255);
      }
    } // stores the color mode and maxes in this instance of Color
    // for later use (by _parseInputs())

  }, {
    key: "_storeModeAndMaxes",
    value: function _storeModeAndMaxes(new_mode, new_maxes) {
      this.mode = new_mode;
      this.maxes = new_maxes;
    }
  }, {
    key: "_getMaxes",
    value: function _getMaxes() {
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

  }], [{
    key: "_parseInputs",
    value: function _parseInputs(r, g, b, a) {
      var numArgs = arguments.length;
      var mode = this.mode;
      var maxes = this.maxes[mode];
      var results = [];
      var i;

      if (numArgs >= 3) {
        // Argument is a list of component values.
        results[0] = r / maxes[0];
        results[1] = g / maxes[1];
        results[2] = b / maxes[2]; // Alpha may be undefined, so default it to 100%.

        if (typeof a === 'number') {
          results[3] = a / maxes[3];
        } else {
          results[3] = 1;
        } // Constrain components to the range [0,1].
        // (loop backwards for performance)


        for (i = results.length - 1; i >= 0; --i) {
          var result = results[i];

          if (result < 0) {
            results[i] = 0;
          } else if (result > 1) {
            results[i] = 1;
          }
        }
      } else if (numArgs === 1 && typeof r === 'string') {
        var str = r.trim().toLowerCase(); // Return if string is a named colour.

        if (namedColors[str]) {
          return Color._parseInputs.call(this, namedColors[str]);
        }

        if (colorPatterns.RGB.test(str)) {
          // rgb(R,G,B)
          results = colorPatterns.RGB.exec(str).slice(1).map(function (color) {
            return color / 255;
          });
          results[3] = 1;
          return results;
        } // Input did not match any CSS color pattern: default to white.


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
        results[2] = r / maxes[2]; // Alpha may be undefined, so default it to 100%.

        if (typeof g === 'number') {
          results[3] = g / maxes[3];
        } else {
          results[3] = 1;
        } // Constrain components to the range [0,1].


        results = results.map(function (value) {
          return Math.max(Math.min(value, 1), 0);
        });
      } else {
        throw new Error("".concat(arguments, "is not a valid color representation."));
      }

      return results;
    }
  }]);

  return Color;
}();

var _default = _main.default.Color;
exports.default = _default;

},{"../core/constants":145,"../core/main":148,"core-js/modules/es.array.includes":119,"core-js/modules/es.array.iterator":120,"core-js/modules/es.array.join":121,"core-js/modules/es.array.map":122,"core-js/modules/es.array.slice":123,"core-js/modules/es.object.get-own-property-descriptor":125,"core-js/modules/es.object.to-string":127,"core-js/modules/es.regexp.constructor":129,"core-js/modules/es.regexp.exec":130,"core-js/modules/es.regexp.to-string":131,"core-js/modules/es.string.includes":132,"core-js/modules/es.string.iterator":133,"core-js/modules/es.string.trim":134,"core-js/modules/es.symbol":137,"core-js/modules/es.symbol.description":135,"core-js/modules/es.symbol.iterator":136,"core-js/modules/es.weak-map":138,"core-js/modules/web.dom-collections.iterator":140}],144:[function(_dereq_,module,exports){
"use strict";

_dereq_("core-js/modules/es.array.fill");

_dereq_("core-js/modules/es.array.fill");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = _interopRequireDefault(_dereq_("../core/main"));

_dereq_("./p5sound.Color");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * @module Color
 * @submodule Setting
 * @for p5
 * @requires core
 * @requires constants
 */

/**
 * The <a href="#/p5/background">background()</a> function sets the color used
 * for the background of the p5sound.js canvas. The default background is transparent.
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
 * A <a href="#/p5sound.Color">p5sound.Color</a> object can also be provided to set the background color.
 *
 *
 * @method background
 * @param {p5sound.Color} color  any value created by the <a href="#/p5/color">color()</a> function
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
 * // p5sound Color object
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


_main.default.prototype.background = function () {
  var _this$_renderer;

  (_this$_renderer = this._renderer).background.apply(_this$_renderer, arguments);

  return this;
};

_main.default.prototype.clear = function () {
  var _r = (arguments.length <= 0 ? undefined : arguments[0]) || 0;

  var _g = (arguments.length <= 1 ? undefined : arguments[1]) || 0;

  var _b = (arguments.length <= 2 ? undefined : arguments[2]) || 0;

  var _a = (arguments.length <= 3 ? undefined : arguments[3]) || 0;

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
 * A <a href="#/p5sound.Color">p5sound.Color</a> object can also be provided to set the fill color.
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
 * // p5sound Color object
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
 * @param  {p5sound.Color}      color   the fill color
 * @chainable
 */


_main.default.prototype.fill = function () {
  var _this$_renderer2;

  this._renderer._setProperty('_fillSet', true);

  this._renderer._setProperty('_doFill', true);

  (_this$_renderer2 = this._renderer).fill.apply(_this$_renderer2, arguments);

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
 * A <a href="#/p5sound.Color">p5sound.Color</a> object can also be provided to set the stroke color.
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
 * @param  {p5sound.Color}      color   the stroke color
 * @chainable
 */


_main.default.prototype.stroke = function () {
  var _this$_renderer3;

  this._renderer._setProperty('_strokeSet', true);

  this._renderer._setProperty('_doStroke', true);

  (_this$_renderer3 = this._renderer).stroke.apply(_this$_renderer3, arguments);

  return this;
};

var _default = _main.default;
exports.default = _default;

},{"../core/main":148,"./p5sound.Color":143,"core-js/modules/es.array.fill":116}],145:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._DEFAULT_FILL = exports._DEFAULT_STROKE = exports.PORTRAIT = exports.LANDSCAPE = exports.MIRROR = exports.CLAMP = exports.REPEAT = exports.NEAREST = exports.IMAGE = exports.IMMEDIATE = exports.TEXTURE = exports.FILL = exports.STROKE = exports.CURVE = exports.BEZIER = exports.QUADRATIC = exports.LINEAR = exports.RGB = exports.P2D = exports.VERSION = void 0;
/**
 * @module Constants
 * @submodule Constants
 * @for p5
 */

/**
 * Version of this p5sound.js.
 * @property {String} VERSION
 * @final
 */

var VERSION = '0.0.1'; // RENDERER

/**
 * The default, two-dimensional renderer.
 * @property {String} P2D
 * @final
 */

exports.VERSION = VERSION;
var P2D = 'p2d'; // COLOR

/**
 * @property {String} RGB
 * @final
 */

exports.P2D = P2D;
var RGB = 'rgb'; // DOM EXTENSION
// VERTICES

/**
 * @property {String} LINEAR
 * @final
 */

exports.RGB = RGB;
var LINEAR = 'linear';
/**
 * @property {String} QUADRATIC
 * @final
 */

exports.LINEAR = LINEAR;
var QUADRATIC = 'quadratic';
/**
 * @property {String} BEZIER
 * @final
 */

exports.QUADRATIC = QUADRATIC;
var BEZIER = 'bezier';
/**
 * @property {String} CURVE
 * @final
 */

exports.BEZIER = BEZIER;
var CURVE = 'curve'; // WEBGL DRAWMODES

/**
 * @property {String} STROKE
 * @final
 */

exports.CURVE = CURVE;
var STROKE = 'stroke';
/**
 * @property {String} FILL
 * @final
 */

exports.STROKE = STROKE;
var FILL = 'fill';
/**
 * @property {String} TEXTURE
 * @final
 */

exports.FILL = FILL;
var TEXTURE = 'texture';
/**
 * @property {String} IMMEDIATE
 * @final
 */

exports.TEXTURE = TEXTURE;
var IMMEDIATE = 'immediate'; // WEBGL TEXTURE MODE
// NORMAL already exists for typography

/**
 * @property {String} IMAGE
 * @final
 */

exports.IMMEDIATE = IMMEDIATE;
var IMAGE = 'image'; // WEBGL TEXTURE WRAP AND FILTERING
// LINEAR already exists above

/**
 * @property {String} NEAREST
 * @final
 */

exports.IMAGE = IMAGE;
var NEAREST = 'nearest';
/**
 * @property {String} REPEAT
 * @final
 */

exports.NEAREST = NEAREST;
var REPEAT = 'repeat';
/**
 * @property {String} CLAMP
 * @final
 */

exports.REPEAT = REPEAT;
var CLAMP = 'clamp';
/**
 * @property {String} MIRROR
 * @final
 */

exports.CLAMP = CLAMP;
var MIRROR = 'mirror'; // DEVICE-ORIENTATION

/**
 * @property {String} LANDSCAPE
 * @final
 */

exports.MIRROR = MIRROR;
var LANDSCAPE = 'landscape';
/**
 * @property {String} PORTRAIT
 * @final
 */

exports.LANDSCAPE = LANDSCAPE;
var PORTRAIT = 'portrait'; // DEFAULTS

exports.PORTRAIT = PORTRAIT;
var _DEFAULT_STROKE = '#000000';
exports._DEFAULT_STROKE = _DEFAULT_STROKE;
var _DEFAULT_FILL = '#FFFFFF';
exports._DEFAULT_FILL = _DEFAULT_FILL;

},{}],146:[function(_dereq_,module,exports){
"use strict";

_dereq_("core-js/modules/es.symbol");

_dereq_("core-js/modules/es.symbol.description");

_dereq_("core-js/modules/es.symbol.iterator");

_dereq_("core-js/modules/es.array.concat");

_dereq_("core-js/modules/es.array.includes");

_dereq_("core-js/modules/es.array.iterator");

_dereq_("core-js/modules/es.object.get-own-property-descriptor");

_dereq_("core-js/modules/es.object.to-string");

_dereq_("core-js/modules/es.string.includes");

_dereq_("core-js/modules/es.string.iterator");

_dereq_("core-js/modules/es.weak-map");

_dereq_("core-js/modules/web.dom-collections.iterator");

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

_dereq_("core-js/modules/es.array.concat");

_dereq_("core-js/modules/es.array.includes");

_dereq_("core-js/modules/es.string.includes");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = _interopRequireDefault(_dereq_("./main"));

var C = _interopRequireWildcard(_dereq_("./constants"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * @module Environment
 * @submodule Environment
 * @for p5
 * @requires core
 * @requires constants
 */


var standardCursors = [C.ARROW, C.CROSS, C.HAND, C.MOVE, C.TEXT, C.WAIT];
_main.default.prototype._frameRate = 0;
_main.default.prototype._lastFrameTime = window.performance.now();
_main.default.prototype._targetFrameRate = 60;
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

_main.default.prototype.frameCount = 0;
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

_main.default.prototype.deltaTime = 0;
/**
 * Confirms if the window a p5sound.js program is in is "focused," meaning that
 * the sketch will accept mouse or keyboard input. This variable is
 * "true" if the window is focused and "false" if not.
 *
 * @property {Boolean} focused
 * @readOnly
 * @example
 * <div><code>
 * // To demonstrate, put two windows side by side.
 * // Click on the window that the p5sound sketch isn't in!
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

_main.default.prototype.focused = document.hasFocus();
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

_main.default.prototype.cursor = function (type, x, y) {
  var cursor = 'auto';
  var canvas = this._curElement.elt;

  if (standardCursors.includes(type)) {
    // Standard css cursor
    cursor = type;
  } else if (typeof type === 'string') {
    var coords = '';

    if (x && y && typeof x === 'number' && typeof y === 'number') {
      // Note that x and y values must be unit-less positive integers < 32
      // https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
      coords = "".concat(x, " ").concat(y);
    }

    if (type.substring(0, 7) === 'http://' || type.substring(0, 8) === 'https://') {
      // Image (absolute url)
      cursor = "url(".concat(type, ") ").concat(coords, ", auto");
    } else if (/\.(cur|jpg|jpeg|gif|png|CUR|JPG|JPEG|GIF|PNG)$/.test(type)) {
      // Image file (relative path) - Separated for performance reasons
      cursor = "url(".concat(type, ") ").concat(coords, ", auto");
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


_main.default.prototype.frameRate = function (fps) {
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


_main.default.prototype.getFrameRate = function () {
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


_main.default.prototype.setFrameRate = function (fps) {
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


_main.default.prototype.getTargetFrameRate = function () {
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


_main.default.prototype.displayWidth = screen.width;
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

_main.default.prototype.displayHeight = screen.height;
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

_main.default.prototype.windowWidth = getWindowWidth();
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

_main.default.prototype.windowHeight = getWindowHeight();

function getWindowWidth() {
  return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth || 0;
}

function getWindowHeight() {
  return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight || 0;
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


_main.default.prototype.width = 0;
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

_main.default.prototype.height = 0;
var _default = _main.default;
exports.default = _default;

},{"./constants":145,"./main":148,"core-js/modules/es.array.concat":115,"core-js/modules/es.array.includes":119,"core-js/modules/es.array.iterator":120,"core-js/modules/es.object.get-own-property-descriptor":125,"core-js/modules/es.object.to-string":127,"core-js/modules/es.string.includes":132,"core-js/modules/es.string.iterator":133,"core-js/modules/es.symbol":137,"core-js/modules/es.symbol.description":135,"core-js/modules/es.symbol.iterator":136,"core-js/modules/es.weak-map":138,"core-js/modules/web.dom-collections.iterator":140}],147:[function(_dereq_,module,exports){
"use strict";

_dereq_("core-js/modules/es.array.iterator");

_dereq_("core-js/modules/es.object.to-string");

_dereq_("core-js/modules/es.promise");

_dereq_("core-js/modules/es.string.iterator");

_dereq_("core-js/modules/web.dom-collections.iterator");

_dereq_("core-js/modules/es.array.iterator");

_dereq_("core-js/modules/es.object.to-string");

_dereq_("core-js/modules/es.promise");

_dereq_("core-js/modules/es.string.iterator");

_dereq_("core-js/modules/web.dom-collections.iterator");

var _main = _interopRequireDefault(_dereq_("../core/main"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * _globalInit
 *
 * TODO: ???
 * if sketch is on window
 * assume "global" mode
 * and instantiate p5sound automatically
 * otherwise do nothing
 *
 * @private
 * @return {Undefined}
 */


var _globalInit = function _globalInit() {
  // Could have been any property defined within the p5sound constructor.
  // If that property is already a part of the global object,
  // this code has already run before, likely due to a duplicate import
  if (typeof window._setupDone !== 'undefined') {
    console.warn('p5sound.js seems to have been imported multiple times. Please remove the duplicate import');
    return;
  }

  if (!window.mocha) {
    // If there is a setup or draw function on the window
    // then instantiate p5sound in "global" mode
    if ((window.setup && typeof window.setup === 'function' || window.draw && typeof window.draw === 'function') && !_main.default.instance) {
      new _main.default();
    }
  }
}; // make a promise that resolves when the document is ready


var waitForDocumentReady = function waitForDocumentReady() {
  return new Promise(function (resolve, reject) {
    // if the page is ready, initialize p5sound immediately
    if (document.readyState === 'complete') {
      resolve(); // if the page is still loading, add an event listener
      // and initialize p5sound as soon as it finishes loading
    } else {
      window.addEventListener('load', resolve, false);
    }
  });
};

Promise.all([waitForDocumentReady(), Promise.resolve()]).then(_globalInit);

},{"../core/main":148,"core-js/modules/es.array.iterator":120,"core-js/modules/es.object.to-string":127,"core-js/modules/es.promise":128,"core-js/modules/es.string.iterator":133,"core-js/modules/web.dom-collections.iterator":140}],148:[function(_dereq_,module,exports){
"use strict";

_dereq_("core-js/modules/es.symbol");

_dereq_("core-js/modules/es.symbol.description");

_dereq_("core-js/modules/es.symbol.iterator");

_dereq_("core-js/modules/es.array.for-each");

_dereq_("core-js/modules/es.array.iterator");

_dereq_("core-js/modules/es.array.slice");

_dereq_("core-js/modules/es.object.get-own-property-descriptor");

_dereq_("core-js/modules/es.object.get-own-property-names");

_dereq_("core-js/modules/es.object.to-string");

_dereq_("core-js/modules/es.string.iterator");

_dereq_("core-js/modules/es.weak-map");

_dereq_("core-js/modules/web.dom-collections.for-each");

_dereq_("core-js/modules/web.dom-collections.iterator");

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

_dereq_("core-js/modules/es.symbol");

_dereq_("core-js/modules/es.symbol.description");

_dereq_("core-js/modules/es.symbol.iterator");

_dereq_("core-js/modules/es.array.for-each");

_dereq_("core-js/modules/es.array.iterator");

_dereq_("core-js/modules/es.array.slice");

_dereq_("core-js/modules/es.object.get-own-property-names");

_dereq_("core-js/modules/es.object.to-string");

_dereq_("core-js/modules/es.string.iterator");

_dereq_("core-js/modules/web.dom-collections.for-each");

_dereq_("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var constants = _interopRequireWildcard(_dereq_("./constants"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
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


var p5sound =
/*#__PURE__*/
function () {
  function p5sound(sketch, node, sync) {
    var _this = this;

    _classCallCheck(this, p5sound); //////////////////////////////////////////////
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

    /**
     * The <a href="#/p5/setup">setup()</a> function is called once when the program starts. It's used to
     * define initial environment properties such as screen size and background
     * color and to load media such as images and fonts as the program starts.
     * There can only be one <a href="#/p5/setup">setup()</a> function for each program and it shouldn't
     * be called again after its initial execution.
     *
     * Note: Variables declared within <a href="#/p5/setup">setup()</a> are not accessible within other
     * functions, including <a href="#/p5/draw">draw()</a>.
     *
     * @method setup
     * @example
     * <div><code>
     * let a = 0;
     *
     * function setup() {
     *   background(0);
     *   noStroke();
     *   fill(102);
     * }
     *
     * function draw() {
     *   rect(a++ % width, 10, 2, 80);
     * }
     * </code></div>
     *
     * @alt
     * nothing displayed
     *
     */

    /**
     * Called directly after <a href="#/p5/setup">setup()</a>, the <a href="#/p5/draw">draw()</a> function continuously executes
     * the lines of code contained inside its block until the program is stopped
     * or <a href="#/p5/noLoop">noLoop()</a> is called. Note if <a href="#/p5/noLoop">noLoop()</a> is called in <a href="#/p5/setup">setup()</a>, <a href="#/p5/draw">draw()</a> will
     * still be executed once before stopping. <a href="#/p5/draw">draw()</a> is called automatically and
     * should never be called explicitly.
     *
     * It should always be controlled with <a href="#/p5/noLoop">noLoop()</a>, <a href="#/p5/redraw">redraw()</a> and <a href="#/p5/loop">loop()</a>. After
     * <a href="#/p5/noLoop">noLoop()</a> stops the code in <a href="#/p5/draw">draw()</a> from executing, <a href="#/p5/redraw">redraw()</a> causes the
     * code inside <a href="#/p5/draw">draw()</a> to execute once, and <a href="#/p5/loop">loop()</a> will cause the code
     * inside <a href="#/p5/draw">draw()</a> to resume executing continuously.
     *
     * The number of times <a href="#/p5/draw">draw()</a> executes in each second may be controlled with
     * the <a href="#/p5/frameRate">frameRate()</a> function.
     *
     * There can only be one <a href="#/p5/draw">draw()</a> function for each sketch, and <a href="#/p5/draw">draw()</a> must
     * exist if you want the code to run continuously, or to process events such
     * as <a href="#/p5/mousePressed">mousePressed()</a>. Sometimes, you might have an empty call to <a href="#/p5/draw">draw()</a> in
     * your program, as shown in the above example.
     *
     * It is important to note that the drawing coordinate system will be reset
     * at the beginning of each <a href="#/p5/draw">draw()</a> call. If any transformations are performed
     * within <a href="#/p5/draw">draw()</a> (ex: scale, rotate, translate), their effects will be
     * undone at the beginning of <a href="#/p5/draw">draw()</a>, so transformations will not accumulate
     * over time. On the other hand, styling applied (ex: fill, stroke, etc) will
     * remain in effect.
     *
     * @method draw
     * @example
     * <div><code>
     * let yPos = 0;
     * function setup() {
     *   // setup() runs once
     *   frameRate(30);
     * }
     * function draw() {
     *   // draw() loops forever, until stopped
     *   background(204);
     *   yPos = yPos - 1;
     *   if (yPos < 0) {
     *     yPos = height;
     *   }
     *   line(0, yPos, width, yPos);
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
    this._preloadDone = false; // for handling hidpi

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
    this._recording = false; // States used in the custom random generators

    this._lcg_random_state = null;
    this._gaussian_previous = false;
    this._events.wheel = null;
    this._loadingScreenId = 'p5_loading'; // Allows methods to be registered on an instance that
    // are instance-specific.

    this._registeredMethods = {};
    var methods = Object.getOwnPropertyNames(p5sound.prototype._registeredMethods);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = methods[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var prop = _step.value;
        this._registeredMethods[prop] = p5sound.prototype._registeredMethods[prop].slice();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (window.DeviceOrientationEvent) {
      this._events.deviceorientation = null;
    }

    if (window.DeviceMotionEvent && !window._isNodeWebkit) {
      this._events.devicemotion = null;
    }

    this._start = function () {
      // Find node if id given
      if (_this._userNode) {
        if (typeof _this._userNode === 'string') {
          _this._userNode = document.getElementById(_this._userNode);
        }
      }

      var context = _this._isGlobal ? window : _this;

      if (context.preload) {
        // Setup loading screen
        // Set loading screen into dom if not present
        // Otherwise displays and removes user provided loading screen
        var loadingScreen = document.getElementById(_this._loadingScreenId);

        if (!loadingScreen) {
          loadingScreen = document.createElement('div');
          loadingScreen.innerHTML = 'Loading...';
          loadingScreen.style.position = 'absolute';
          loadingScreen.id = _this._loadingScreenId;

          var _node = _this._userNode || document.body;

          _node.appendChild(loadingScreen);
        }

        var _methods = _this._preloadMethods;

        for (var method in _methods) {
          // default to p5sound if no object defined
          _methods[method] = _methods[method] || p5sound;
          var obj = _methods[method]; //it's p5, check if it's global or instance

          if (obj === p5sound.prototype || obj === p5sound) {
            if (_this._isGlobal) {
              window[method] = _this._wrapPreload(_this, method);
            }

            obj = _this;
          }

          _this._registeredPreloadMethods[method] = obj[method];
          obj[method] = _this._wrapPreload(obj, method);
        }

        context.preload();

        _this._runIfPreloadsAreDone();
      } else {
        _this._setup();

        if (!_this._recording) {
          _this._draw();
        }
      }
    };

    this._runIfPreloadsAreDone = function () {
      var context = this._isGlobal ? window : this;

      if (context._preloadCount === 0) {
        var loadingScreen = document.getElementById(context._loadingScreenId);

        if (loadingScreen) {
          loadingScreen.parentNode.removeChild(loadingScreen);
        }

        if (!this._setupDone) {
          this._lastTargetFrameTime = window.performance.now();
          this._lastRealFrameTime = window.performance.now();

          context._setup();

          if (!this._recording) {
            context._draw();
          }
        }
      }
    };

    this._decrementPreload = function () {
      var context = this._isGlobal ? window : this;

      if (!context._preloadDone && typeof context.preload === 'function') {
        context._setProperty('_preloadCount', context._preloadCount - 1);

        context._runIfPreloadsAreDone();
      }
    };

    this._wrapPreload = function (obj, fnName) {
      var _this2 = this;

      return function () {
        //increment counter
        _this2._incrementPreload(); //call original function


        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _this2._registeredPreloadMethods[fnName].apply(obj, args);
      };
    };

    this._incrementPreload = function () {
      var context = this._isGlobal ? window : this; // Do nothing if we tried to increment preloads outside of `preload`

      if (context._preloadDone) return;

      context._setProperty('_preloadCount', context._preloadCount + 1);
    };

    this._setup = function () {
      // Always create a default canvas.
      // Later on if the user calls createCanvas, this default one
      // will be replaced
      _this.createCanvas(_this._defaultCanvasSize.width, _this._defaultCanvasSize.height, 'p2d'); // return preload functions to their normal vals if switched by preload


      var context = _this._isGlobal ? window : _this;

      if (typeof context.preload === 'function') {
        for (var f in _this._preloadMethods) {
          context[f] = _this._preloadMethods[f][f];

          if (context[f] && _this) {
            context[f] = context[f].bind(_this);
          }
        }
      } // Record the time when sketch starts


      _this._millisStart = window.performance.now();
      context._preloadDone = true; // Short-circuit on this, in case someone used the library in "global"
      // mode earlier

      if (typeof context.setup === 'function') {
        context.setup();
      } // unhide any hidden canvases that were created


      var canvases = document.getElementsByTagName('canvas');
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = canvases[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var k = _step2.value;

          if (k.dataset.hidden === 'true') {
            k.style.visibility = '';
            delete k.dataset.hidden;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      _this._lastTargetFrameTime = window.performance.now();
      _this._lastRealFrameTime = window.performance.now();
      _this._setupDone = true;

      if (_this._accessibleOutputs.grid || _this._accessibleOutputs.text) {
        _this._updateAccsOutput();
      }
    };

    this._draw = function () {
      var now = window.performance.now();
      var time_since_last = now - _this._lastTargetFrameTime;
      var target_time_between_frames = 1000 / _this._targetFrameRate; // only draw if we really need to; don't overextend the browser.
      // draw if we're within 5ms of when our next frame should paint
      // (this will prevent us from giving up opportunities to draw
      // again when it's really about time for us to do so). fixes an
      // issue where the frameRate is too low if our refresh loop isn't
      // in sync with the browser. note that we have to draw once even
      // if looping is off, so we bypass the time delay if that
      // is the case.

      var epsilon = 5;

      if (!_this._loop || time_since_last >= target_time_between_frames - epsilon) {
        //mandatory update values(matrixes and stack)
        _this.deltaTime = now - _this._lastRealFrameTime;

        _this._setProperty('deltaTime', _this.deltaTime);

        _this._frameRate = 1000.0 / _this.deltaTime;

        _this.redraw();

        _this._lastTargetFrameTime = Math.max(_this._lastTargetFrameTime + target_time_between_frames, now);
        _this._lastRealFrameTime = now; // If the user is actually using mouse module, then update
        // coordinates, otherwise skip. We can test this by simply
        // checking if any of the mouse functions are available or not.
        // NOTE : This reflects only in complete build or modular build.

        if (typeof _this._updateMouseCoords !== 'undefined') {
          _this._updateMouseCoords(); //reset delta values so they reset even if there is no mouse event to set them
          // for example if the mouse is outside the screen


          _this._setProperty('movedX', 0);

          _this._setProperty('movedY', 0);
        }
      } // get notified the next time the browser gives us
      // an opportunity to draw.


      if (_this._loop) {
        _this._requestAnimId = window.requestAnimationFrame(_this._draw);
      }
    };

    this._setProperty = function (prop, value) {
      _this[prop] = value;

      if (_this._isGlobal) {
        window[prop] = value;
      }
    }; // call any registered init functions


    this._registeredMethods.init.forEach(function (f) {
      if (typeof f !== 'undefined') {
        f.call(this);
      }
    }, this); // Set up promise preloads


    this._setupPromisePreloads();

    var friendlyBindGlobal = this._createFriendlyGlobalFunctionBinder(); // If the user has created a global setup or draw function,
    // assume "global" mode and make everything global (i.e. on the window)


    if (!sketch) {
      this._isGlobal = true;
      p5sound.instance = this; // Loop through methods on the prototype and attach them to the window

      for (var p in p5sound.prototype) {
        if (typeof p5sound.prototype[p] === 'function') {
          var ev = p.substring(2);

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
      } // Attach its properties to the window


      for (var p2 in this) {
        if (this.hasOwnProperty(p2)) {
          friendlyBindGlobal(p2, this[p2]);
        }
      }
    } else {
      // Else, the user has passed in a sketch closure that may set
      // user-provided 'setup', 'draw', etc. properties on this instance of p5
      sketch(this); // Run a check to see if the user has misspelled 'setup', 'draw', etc
      // detects capitalization mistakes only ( Setup, SETUP, MouseClicked, etc)

      p5sound._checkForUserDefinedFunctions(this);
    } // Bind events to window (not using container div bc key events don't work)


    for (var e in this._events) {
      var f = this["_on".concat(e)];

      if (f) {
        var m = f.bind(this);
        window.addEventListener(e, m, {
          passive: false
        });
        this._events[e] = m;
      }
    }

    var focusHandler = function focusHandler() {
      _this._setProperty('focused', true);
    };

    var blurHandler = function blurHandler() {
      _this._setProperty('focused', false);
    };

    window.addEventListener('focus', focusHandler);
    window.addEventListener('blur', blurHandler);
    this.registerMethod('remove', function () {
      window.removeEventListener('focus', focusHandler);
      window.removeEventListener('blur', blurHandler);
    });

    if (document.readyState === 'complete') {
      this._start();
    } else {
      window.addEventListener('load', this._start.bind(this), false);
    }
  }

  _createClass(p5sound, [{
    key: "_initializeInstanceVariables",
    value: function _initializeInstanceVariables() {
      this._accessibleOutputs = {
        text: false,
        grid: false,
        textLabel: false,
        gridLabel: false
      };
      this._styles = [];
      this._bezierDetail = 20;
      this._curveDetail = 20;
      this._colorMode = constants.RGB;
      this._colorMaxes = {
        rgb: [255, 255, 255, 255],
        hsb: [360, 100, 100, 1],
        hsl: [360, 100, 100, 1]
      };
      this._downKeys = {}; //Holds the key codes of currently pressed keys
    }
  }, {
    key: "registerPreloadMethod",
    value: function registerPreloadMethod(fnString, obj) {
      // obj = obj || p5sound.prototype;
      if (!p5sound.prototype._preloadMethods.hasOwnProperty(fnString)) {
        p5sound.prototype._preloadMethods[fnString] = obj;
      }
    }
  }, {
    key: "registerMethod",
    value: function registerMethod(name, m) {
      var target = this || p5sound.prototype;

      if (!target._registeredMethods.hasOwnProperty(name)) {
        target._registeredMethods[name] = [];
      }

      target._registeredMethods[name].push(m);
    } // create a function which provides a standardized process for binding
    // globals; this is implemented as a factory primarily so that there's a
    // way to redefine what "global" means for the binding function so it
    // can be used in scenarios like unit testing where the window object
    // might not exist

  }, {
    key: "_createFriendlyGlobalFunctionBinder",
    value: function _createFriendlyGlobalFunctionBinder() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var globalObject = options.globalObject || window;
      var log = options.log || console.log.bind(console);
      var propsToForciblyOverwrite = {
        // p5sound.print actually always overwrites an existing global function,
        // albeit one that is very unlikely to be used:
        //
        //   https://developer.mozilla.org/en-US/docs/Web/API/Window/print
        print: true
      };
      return function (prop, value) {
        if (!p5sound.disableFriendlyErrors && typeof IS_MINIFIED === 'undefined' && typeof value === 'function' && !(prop in p5sound.prototype._preloadMethods)) {
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
              throw new Error("global \"".concat(prop, "\" already exists"));
            } // It's possible that this might throw an error because there
            // are a lot of edge-cases in which `Object.defineProperty` might
            // not succeed; since this functionality is only intended to
            // help beginners anyways, we'll just catch such an exception
            // if it occurs, and fall back to legacy behavior.


            Object.defineProperty(globalObject, prop, {
              configurable: true,
              enumerable: true,
              get: function get() {
                return value;
              },
              set: function set(newValue) {
                Object.defineProperty(globalObject, prop, {
                  configurable: true,
                  enumerable: true,
                  value: newValue,
                  writable: true
                });
                log("You just changed the value of \"".concat(prop, "\", which was a p5sound function. This could cause problems later if you're not careful."));
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
  }]);

  return p5sound;
}(); // This is a pointer to our global mode p5sound instance, if we're in
// global mode.


p5sound.instance = null; // attach constants to p5sound prototype

for (var k in constants) {
  p5sound.prototype[k] = constants[k];
} // makes the `VERSION` constant available on the p5sound object
// in instance mode, even if it hasn't been instatiated yet


p5sound.VERSION = constants.VERSION; // functions that cause preload to wait
// more can be added by using registerPreloadMethod(func)

p5sound.prototype._preloadMethods = {
  loadImage: p5sound.prototype,
  loadBytes: p5sound.prototype,
  loadShader: p5sound.prototype
};
p5sound.prototype._registeredMethods = {
  init: [],
  pre: [],
  post: [],
  remove: []
};
p5sound.prototype._registeredPreloadMethods = {};
var _default = p5sound;
exports.default = _default;

},{"./constants":145,"core-js/modules/es.array.for-each":118,"core-js/modules/es.array.iterator":120,"core-js/modules/es.array.slice":123,"core-js/modules/es.object.get-own-property-descriptor":125,"core-js/modules/es.object.get-own-property-names":126,"core-js/modules/es.object.to-string":127,"core-js/modules/es.string.iterator":133,"core-js/modules/es.symbol":137,"core-js/modules/es.symbol.description":135,"core-js/modules/es.symbol.iterator":136,"core-js/modules/es.weak-map":138,"core-js/modules/web.dom-collections.for-each":139,"core-js/modules/web.dom-collections.iterator":140}],149:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = _interopRequireDefault(_dereq_("./main"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
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


_main.default.Element =
/*#__PURE__*/
function () {
  function _class(elt, pInst) {
    _classCallCheck(this, _class);
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


  _createClass(_class, [{
    key: "parent",
    value: function parent(p) {
      if (typeof p === 'undefined') {
        return this.elt.parentNode;
      }

      if (typeof p === 'string') {
        if (p[0] === '#') {
          p = p.substring(1);
        }

        p = document.getElementById(p);
      } else if (p instanceof _main.default.Element) {
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

  }, {
    key: "id",
    value: function id(_id) {
      if (typeof _id === 'undefined') {
        return this.elt.id;
      }

      this.elt.id = _id;
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

  }, {
    key: "class",
    value: function _class(c) {
      if (typeof c === 'undefined') {
        return this.elt.className;
      }

      this.elt.className = c;
      return this;
    } // General handler for event attaching and detaching

  }, {
    key: "_setProperty",

    /**
     * Helper fxn for sharing pixel methods
     */
    value: function _setProperty(prop, value) {
      this[prop] = value;
    }
  }], [{
    key: "_adjustListener",
    value: function _adjustListener(ev, fxn, ctx) {
      if (fxn === false) {
        _main.default.Element._detachListener(ev, ctx);
      } else {
        _main.default.Element._attachListener(ev, fxn, ctx);
      }

      return this;
    }
  }, {
    key: "_attachListener",
    value: function _attachListener(ev, fxn, ctx) {
      // detach the old listener if there was one
      if (ctx._events[ev]) {
        _main.default.Element._detachListener(ev, ctx);
      }

      var f = fxn.bind(ctx);
      ctx.elt.addEventListener(ev, f, false);
      ctx._events[ev] = f;
    }
  }, {
    key: "_detachListener",
    value: function _detachListener(ev, ctx) {
      var f = ctx._events[ev];
      ctx.elt.removeEventListener(ev, f, false);
      ctx._events[ev] = null;
    }
  }]);

  return _class;
}();

var _default = _main.default.Element;
exports.default = _default;

},{"./main":148}],150:[function(_dereq_,module,exports){
"use strict";

_dereq_("core-js/modules/es.symbol");

_dereq_("core-js/modules/es.symbol.description");

_dereq_("core-js/modules/es.symbol.iterator");

_dereq_("core-js/modules/es.array.iterator");

_dereq_("core-js/modules/es.object.assign");

_dereq_("core-js/modules/es.object.get-own-property-descriptor");

_dereq_("core-js/modules/es.object.to-string");

_dereq_("core-js/modules/es.string.iterator");

_dereq_("core-js/modules/es.weak-map");

_dereq_("core-js/modules/web.dom-collections.iterator");

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

_dereq_("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = _interopRequireDefault(_dereq_("./main"));

var constants = _interopRequireWildcard(_dereq_("../core/constants"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * @module Rendering
 * @submodule Rendering
 * @for p5
 */

/**
 * Main and rendering context, as well as the base API
 * implementation for p5sound.js "core". To be used as the superclass for
 * Renderer2D and Renderer3D classes, respectively.
 *
 * @class p5sound.Renderer
 * @constructor
 * @extends p5sound.Element
 * @param {String} elt DOM node that is wrapped
 * @param {p5sound} [pInst] pointer to p5sound instance
 * @param {Boolean} [isMainCanvas] whether we're using it as main canvas
 */


_main.default.Renderer = function (elt, pInst, isMainCanvas) {
  _main.default.Element.call(this, elt, pInst);

  this.canvas = elt;
  this._pixelsState = pInst;

  if (isMainCanvas) {
    this._isMainCanvas = true; // for pixel method sharing with pimage

    this._pInst._setProperty('_curElement', this);

    this._pInst._setProperty('canvas', this.canvas);

    this._pInst._setProperty('width', this.width);

    this._pInst._setProperty('height', this.height);
  } else {
    // hide if offscreen buffer by default
    this.canvas.style.display = 'none';
    this._styles = []; // non-main elt styles stored in p5sound.Renderer
  }

  this._ellipseMode = constants.CENTER;
  this._curveTightness = 0;
  this._doStroke = true;
  this._doFill = true;
  this._strokeSet = false;
  this._fillSet = false;
};

_main.default.Renderer.prototype = Object.create(_main.default.Element.prototype); // the renderer should return a 'style' object that it wishes to
// store on the push stack.

_main.default.Renderer.prototype.push = function () {
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
}; // a pop() operation is in progress
// the renderer is passed the 'style' object that it returned
// from its push() method.


_main.default.Renderer.prototype.pop = function (style) {
  if (style.properties) {
    // copy the style properties back into the renderer
    Object.assign(this, style.properties);
  }
};
/**
 * Resize our canvas element.s
 */


_main.default.Renderer.prototype.resize = function (w, h) {
  this.width = w;
  this.height = h;
  this.elt.width = w * this._pInst._pixelDensity;
  this.elt.height = h * this._pInst._pixelDensity;
  this.elt.style.width = "".concat(w, "px");
  this.elt.style.height = "".concat(h, "px");

  if (this._isMainCanvas) {
    this._pInst._setProperty('width', this.width);

    this._pInst._setProperty('height', this.height);
  }
};

_main.default.Renderer.prototype.get = function (x, y, w, h) {
  var pixelsState = this._pixelsState;
  var pd = pixelsState._pixelDensity;
  var canvas = this.canvas;

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
    } // get(x,y,w,h)

  }

  var region = new _main.default.Image(w, h);
  region.canvas.getContext('2d').drawImage(canvas, x, y, w * pd, h * pd, 0, 0, w, h);
  return region;
};

_main.default.Renderer.prototype._applyDefaults = function () {
  return this;
};

var _default = _main.default.Renderer;
exports.default = _default;

},{"../core/constants":145,"./main":148,"core-js/modules/es.array.iterator":120,"core-js/modules/es.object.assign":124,"core-js/modules/es.object.get-own-property-descriptor":125,"core-js/modules/es.object.to-string":127,"core-js/modules/es.string.iterator":133,"core-js/modules/es.symbol":137,"core-js/modules/es.symbol.description":135,"core-js/modules/es.symbol.iterator":136,"core-js/modules/es.weak-map":138,"core-js/modules/web.dom-collections.iterator":140}],151:[function(_dereq_,module,exports){
"use strict";

_dereq_("core-js/modules/es.symbol");

_dereq_("core-js/modules/es.symbol.description");

_dereq_("core-js/modules/es.symbol.iterator");

_dereq_("core-js/modules/es.array.fill");

_dereq_("core-js/modules/es.array.iterator");

_dereq_("core-js/modules/es.object.get-own-property-descriptor");

_dereq_("core-js/modules/es.object.to-string");

_dereq_("core-js/modules/es.regexp.to-string");

_dereq_("core-js/modules/es.string.iterator");

_dereq_("core-js/modules/es.weak-map");

_dereq_("core-js/modules/web.dom-collections.iterator");

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

_dereq_("core-js/modules/es.array.fill");

_dereq_("core-js/modules/es.object.to-string");

_dereq_("core-js/modules/es.regexp.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = _interopRequireDefault(_dereq_("./main"));

var constants = _interopRequireWildcard(_dereq_("./constants"));

_dereq_("./p5sound.Renderer");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * p5sound.Renderer2D
 * The 2D canvas renderer class.
 * extends p5sound.Renderer
 */


var styleEmpty = 'rgba(0,0,0,0)'; // const alphaThreshold = 0.00125; // minimum visible

_main.default.Renderer2D = function (elt, pInst, isMainCanvas) {
  _main.default.Renderer.call(this, elt, pInst, isMainCanvas);

  this.drawingContext = this.canvas.getContext('2d');

  this._pInst._setProperty('drawingContext', this.drawingContext);

  return this;
};

_main.default.Renderer2D.prototype = Object.create(_main.default.Renderer.prototype);

_main.default.Renderer2D.prototype._applyDefaults = function () {
  this._cachedFillStyle = this._cachedStrokeStyle = undefined;
  this._cachedBlendMode = constants.BLEND;

  this._setFill(constants._DEFAULT_FILL);

  this._setStroke(constants._DEFAULT_STROKE);

  this.drawingContext.lineCap = constants.ROUND;
  this.drawingContext.font = 'normal 12px sans-serif';
};

_main.default.Renderer2D.prototype.resize = function (w, h) {
  _main.default.Renderer.prototype.resize.call(this, w, h);

  this.drawingContext.scale(this._pInst._pixelDensity, this._pInst._pixelDensity);
}; //////////////////////////////////////////////
// COLOR | Setting
//////////////////////////////////////////////


_main.default.Renderer2D.prototype.background = function () {
  var _this$_pInst;

  this.drawingContext.save();

  var curFill = this._getFill(); // create background rect


  var color = (_this$_pInst = this._pInst).color.apply(_this$_pInst, arguments);

  var newFill = color.toString();

  this._setFill(newFill);

  this.drawingContext.fillRect(0, 0, this.width, this.height); // reset fill

  this._setFill(curFill);

  this.drawingContext.restore();
};

_main.default.Renderer2D.prototype.clear = function () {
  this.drawingContext.save();
  this.drawingContext.clearRect(0, 0, this.width, this.height);
  this.drawingContext.restore();
};

_main.default.Renderer2D.prototype.fill = function () {
  var _this$_pInst2;

  var color = (_this$_pInst2 = this._pInst).color.apply(_this$_pInst2, arguments);

  this._setFill(color.toString());
};

_main.default.Renderer2D.prototype.stroke = function () {
  var _this$_pInst3;

  var color = (_this$_pInst3 = this._pInst).color.apply(_this$_pInst3, arguments);

  this._setStroke(color.toString());
}; //////////////////////////////////////////////
// SHAPE | 2D Primitives
//////////////////////////////////////////////

/*
 * This function requires that:
 *
 *   0 <= start < TWO_PI
 *
 *   start <= stop < start + TWO_PI
 */


_main.default.Renderer2D.prototype.ellipse = function (args) {
  var ctx = this.drawingContext;
  var doFill = this._doFill,
      doStroke = this._doStroke;
  var x = parseFloat(args[0]),
      y = parseFloat(args[1]),
      w = parseFloat(args[2]),
      h = parseFloat(args[3]);

  if (doFill && !doStroke) {
    if (this._getFill() === styleEmpty) {
      return this;
    }
  } else if (!doFill && doStroke) {
    if (this._getStroke() === styleEmpty) {
      return this;
    }
  }

  var kappa = 0.5522847498,
      // control point offset horizontal
  ox = w / 2 * kappa,
      // control point offset vertical
  oy = h / 2 * kappa,
      // x-end
  xe = x + w,
      // y-end
  ye = y + h,
      // x-middle
  xm = x + w / 2,
      ym = y + h / 2; // y-middle

  ctx.beginPath();
  ctx.moveTo(x, ym);
  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);

  if (doFill) {
    ctx.fill();
  }

  if (doStroke) {
    ctx.stroke();
  }
}; //////////////////////////////////////////////
// SHAPE | Attributes
//////////////////////////////////////////////


_main.default.Renderer2D.prototype.strokeCap = function (cap) {
  if (cap === constants.ROUND || cap === constants.SQUARE || cap === constants.PROJECT) {
    this.drawingContext.lineCap = cap;
  }

  return this;
};

_main.default.Renderer2D.prototype.strokeJoin = function (join) {
  if (join === constants.ROUND || join === constants.BEVEL || join === constants.MITER) {
    this.drawingContext.lineJoin = join;
  }

  return this;
};

_main.default.Renderer2D.prototype.strokeWeight = function (w) {
  if (typeof w === 'undefined' || w === 0) {
    // hack because lineWidth 0 doesn't work
    this.drawingContext.lineWidth = 0.0001;
  } else {
    this.drawingContext.lineWidth = w;
  }

  return this;
};

_main.default.Renderer2D.prototype._getFill = function () {
  if (!this._cachedFillStyle) {
    this._cachedFillStyle = this.drawingContext.fillStyle;
  }

  return this._cachedFillStyle;
};

_main.default.Renderer2D.prototype._setFill = function (fillStyle) {
  if (fillStyle !== this._cachedFillStyle) {
    this.drawingContext.fillStyle = fillStyle;
    this._cachedFillStyle = fillStyle;
  }
};

_main.default.Renderer2D.prototype._getStroke = function () {
  if (!this._cachedStrokeStyle) {
    this._cachedStrokeStyle = this.drawingContext.strokeStyle;
  }

  return this._cachedStrokeStyle;
};

_main.default.Renderer2D.prototype._setStroke = function (strokeStyle) {
  if (strokeStyle !== this._cachedStrokeStyle) {
    this.drawingContext.strokeStyle = strokeStyle;
    this._cachedStrokeStyle = strokeStyle;
  }
}; //////////////////////////////////////////////
// SHAPE | Curves
//////////////////////////////////////////////


_main.default.Renderer2D.prototype.bezier = function (x1, y1, x2, y2, x3, y3, x4, y4) {
  this._pInst.beginShape();

  this._pInst.vertex(x1, y1);

  this._pInst.bezierVertex(x2, y2, x3, y3, x4, y4);

  this._pInst.endShape();

  return this;
};

_main.default.Renderer2D.prototype.curve = function (x1, y1, x2, y2, x3, y3, x4, y4) {
  this._pInst.beginShape();

  this._pInst.curveVertex(x1, y1);

  this._pInst.curveVertex(x2, y2);

  this._pInst.curveVertex(x3, y3);

  this._pInst.curveVertex(x4, y4);

  this._pInst.endShape();

  return this;
}; //////////////////////////////////////////////
// SHAPE | Vertex
//////////////////////////////////////////////


_main.default.Renderer2D.prototype._doFillStrokeClose = function (closeShape) {
  if (closeShape) {
    this.drawingContext.closePath();
  }

  if (this._doFill) {
    this.drawingContext.fill();
  }

  if (this._doStroke) {
    this.drawingContext.stroke();
  }
};

var _default = _main.default.Renderer2D;
exports.default = _default;

},{"./constants":145,"./main":148,"./p5sound.Renderer":150,"core-js/modules/es.array.fill":116,"core-js/modules/es.array.iterator":120,"core-js/modules/es.object.get-own-property-descriptor":125,"core-js/modules/es.object.to-string":127,"core-js/modules/es.regexp.to-string":131,"core-js/modules/es.string.iterator":133,"core-js/modules/es.symbol":137,"core-js/modules/es.symbol.description":135,"core-js/modules/es.symbol.iterator":136,"core-js/modules/es.weak-map":138,"core-js/modules/web.dom-collections.iterator":140}],152:[function(_dereq_,module,exports){
"use strict";

_dereq_("core-js/modules/es.symbol");

_dereq_("core-js/modules/es.symbol.description");

_dereq_("core-js/modules/es.symbol.iterator");

_dereq_("core-js/modules/es.array.iterator");

_dereq_("core-js/modules/es.object.assign");

_dereq_("core-js/modules/es.object.to-string");

_dereq_("core-js/modules/es.promise");

_dereq_("core-js/modules/es.string.iterator");

_dereq_("core-js/modules/web.dom-collections.iterator");

_dereq_("core-js/modules/es.symbol");

_dereq_("core-js/modules/es.symbol.description");

_dereq_("core-js/modules/es.symbol.iterator");

_dereq_("core-js/modules/es.array.iterator");

_dereq_("core-js/modules/es.object.assign");

_dereq_("core-js/modules/es.object.to-string");

_dereq_("core-js/modules/es.promise");

_dereq_("core-js/modules/es.string.iterator");

_dereq_("core-js/modules/web.dom-collections.iterator");

var _main = _interopRequireDefault(_dereq_("./main"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

_main.default.prototype._promisePreloads = [
  /* Example object
  {
    target: p5sound.prototype, // The target object to have the method modified
    method: 'loadXAsync', // The name of the preload function to wrap
    addCallbacks: true,   // Whether to automatically handle the p5sound callbacks
    legacyPreloadSetup: { // Optional object to generate a legacy-style preload
      method: 'loadX',    // The name of the legacy preload function to generate
      createBaseObject: function() {
        return {};
      } // An optional function to create the base object for the legacy preload.
    }
  }
  */
];

_main.default.prototype.registerPromisePreload = function (setup) {
  _main.default.prototype._promisePreloads.push(setup);
};

var initialSetupRan = false;

_main.default.prototype._setupPromisePreloads = function () {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = this._promisePreloads[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var preloadSetup = _step.value;
      var thisValue = this;
      var method = preloadSetup.method,
          addCallbacks = preloadSetup.addCallbacks,
          legacyPreloadSetup = preloadSetup.legacyPreloadSetup; // Get the target object that the preload gets assigned to by default,
      // that is the current object.

      var target = preloadSetup.target || this;
      var sourceFunction = target[method].bind(target); // If the target is the p5sound prototype, then only set it up on the first run per page

      if (target === _main.default.prototype) {
        if (initialSetupRan) {
          continue;
        }

        thisValue = null;
        sourceFunction = target[method];
      } // Replace the original method with a wrapped version


      target[method] = this._wrapPromisePreload(thisValue, sourceFunction, addCallbacks); // If a legacy preload is required

      if (legacyPreloadSetup) {
        // What is the name for this legacy preload
        var legacyMethod = legacyPreloadSetup.method; // Wrap the already wrapped Promise-returning method with the legacy setup

        target[legacyMethod] = this._legacyPreloadGenerator(thisValue, legacyPreloadSetup, target[method]);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  initialSetupRan = true;
};

_main.default.prototype._wrapPromisePreload = function (thisValue, fn, addCallbacks) {
  var replacementFunction = function replacementFunction() {
    var _this = this; // Uses the current preload counting mechanism for now.


    this._incrementPreload(); // A variable for the callback function if specified


    var callback = null; // A variable for the errorCallback function if specified

    var errorCallback = null;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (addCallbacks) {
      // Loop from the end of the args array, pulling up to two functions off of
      // the end and putting them in fns
      for (var i = args.length - 1; i >= 0 && !errorCallback; i--) {
        if (typeof args[i] !== 'function') {
          break;
        }

        errorCallback = callback;
        callback = args.pop();
      }
    } // Call the underlying function and pass it to Promise.resolve,
    // so that even if it didn't return a promise we can still
    // act on the result as if it did.


    var promise = Promise.resolve(fn.apply(this, args)); // Add the optional callbacks

    if (callback) {
      promise.then(callback);
    }

    if (errorCallback) {
      promise.catch(errorCallback);
    } // Decrement the preload counter only if the promise resolved


    promise.then(function () {
      return _this._decrementPreload();
    }); // Return the original promise so that neither callback changes the result.

    return promise;
  };

  if (thisValue) {
    replacementFunction = replacementFunction.bind(thisValue);
  }

  return replacementFunction;
};

var objectCreator = function objectCreator() {
  return {};
};

_main.default.prototype._legacyPreloadGenerator = function (thisValue, legacyPreloadSetup, fn) {
  // Create a function that will generate an object before the preload is
  // launched. For example, if the object should be an array or be an instance
  // of a specific class.
  var baseValueGenerator = legacyPreloadSetup.createBaseObject || objectCreator;

  var returnedFunction = function returnedFunction() {
    var _this2 = this; // Our then clause needs to run before setup, so we also increment the preload counter


    this._incrementPreload(); // Generate the return value based on the generator.


    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var returnValue = baseValueGenerator.apply(this, args); // Run the original wrapper

    fn.apply(this, args).then(function (data) {
      // Copy each key from the resolved value into returnValue
      Object.assign(returnValue, data); // Decrement the preload counter, to allow setup to continue.

      _this2._decrementPreload();
    });
    return returnValue;
  };

  if (thisValue) {
    returnedFunction = returnedFunction.bind(thisValue);
  }

  return returnedFunction;
};

},{"./main":148,"core-js/modules/es.array.iterator":120,"core-js/modules/es.object.assign":124,"core-js/modules/es.object.to-string":127,"core-js/modules/es.promise":128,"core-js/modules/es.string.iterator":133,"core-js/modules/es.symbol":137,"core-js/modules/es.symbol.description":135,"core-js/modules/es.symbol.iterator":136,"core-js/modules/web.dom-collections.iterator":140}],153:[function(_dereq_,module,exports){
"use strict";

_dereq_("core-js/modules/es.symbol");

_dereq_("core-js/modules/es.symbol.description");

_dereq_("core-js/modules/es.symbol.iterator");

_dereq_("core-js/modules/es.array.filter");

_dereq_("core-js/modules/es.array.iterator");

_dereq_("core-js/modules/es.object.get-own-property-descriptor");

_dereq_("core-js/modules/es.object.to-string");

_dereq_("core-js/modules/es.string.iterator");

_dereq_("core-js/modules/es.weak-map");

_dereq_("core-js/modules/web.dom-collections.iterator");

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

_dereq_("core-js/modules/es.array.filter");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = _interopRequireDefault(_dereq_("./main"));

var constants = _interopRequireWildcard(_dereq_("./constants"));

_dereq_("./p5sound.Renderer2D");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * @module Rendering
 * @submodule Rendering
 * @for p5
 */


var defaultId = 'defaultCanvas0'; // this gets set again in createCanvas

var defaultClass = 'p5Canvas';
/**
 * Creates a canvas element in the document and sets its dimensions
 * in pixels. This method should be called only once at the start of <a href="#/p5/setup">setup()</a>.
 * Calling <a href="#/p5/createCanvas">createCanvas</a> more than once in a
 * sketch will result in very unpredictable behavior.
 *
 * Important note: in 2D mode (i.e. when `p5sound.Renderer` is not set) the origin (0,0)
 * is positioned at the top left of the screen. In 3D mode (i.e. when `p5sound.Renderer`
 * is set to `WEBGL`), the origin is positioned at the center of the canvas.
 * See [this issue](https://github.com/processing/p5sound.js/issues/1545) for more information.
 *
 * A WebGL canvas will use a WebGL2 context if it is supported by the browser.
 * Check the <a href="#/p5/webglVersion">webglVersion</a> property to check what
 * version is being used, or call <a href="#/p5/setAttributes">setAttributes({ version: 1 })</a>
 * to create a WebGL1 context.
 *
 * The system variables width and height are set by the parameters passed to this
 * function. If <a href="#/p5/createCanvas">createCanvas()</a> is not used, the
 * window will be given a default size of 100×100 pixels.
 *
 * For more ways to position the canvas, see the
 * <a href='https://github.com/processing/p5sound.js/wiki/Positioning-your-canvas'>
 * positioning the canvas</a> wiki page.
 *
 * @method createCanvas
 * @param  {Number} w width of the canvas
 * @param  {Number} h height of the canvas
 * @param  {Constant} [renderer] either P2D or WEBGL
 * @return {p5sound.Renderer} pointer to p5sound.Renderer holding canvas
 * @example
 * <div>
 * <code>
 * function setup() {
 *   createCanvas(100, 50);
 *   background(153);
 *   line(0, 0, width, height);
 * }
 * </code>
 * </div>
 *
 * @alt
 * Black line extending from top-left of canvas to bottom right.
 */

_main.default.prototype.createCanvas = function (w, h, renderer) {
  //optional: renderer, otherwise defaults to p2d
  var r = renderer || constants.P2D;
  var c;

  if (r === constants.WEBGL) {
    c = document.getElementById(defaultId);

    if (c) {
      //if defaultCanvas already exists
      c.parentNode.removeChild(c); //replace the existing defaultCanvas

      var thisRenderer = this._renderer;
      this._elements = this._elements.filter(function (e) {
        return e !== thisRenderer;
      });
    }

    c = document.createElement('canvas');
    c.id = defaultId;
    c.classList.add(defaultClass);
  } else {
    if (!this._defaultGraphicsCreated) {
      c = document.createElement('canvas');
      var i = 0;

      while (document.getElementById("defaultCanvas".concat(i))) {
        i++;
      }

      defaultId = "defaultCanvas".concat(i);
      c.id = defaultId;
      c.classList.add(defaultClass);
    } else {
      // resize the default canvas if new one is created
      c = this.canvas;
    }
  } // set to invisible if still in setup (to prevent flashing with manipulate)


  if (!this._setupDone) {
    c.dataset.hidden = true; // tag to show later

    c.style.visibility = 'hidden';
  }

  if (this._userNode) {
    // user input node case
    this._userNode.appendChild(c);
  } else {
    //create main element
    if (document.getElementsByTagName('main').length === 0) {
      var m = document.createElement('main');
      document.body.appendChild(m);
    } //append canvas to main


    document.getElementsByTagName('main')[0].appendChild(c);
  } // Init our renderer
  //P2D mode


  if (!this._defaultGraphicsCreated) {
    this._setProperty('_renderer', new _main.default.Renderer2D(c, this, true));

    this._defaultGraphicsCreated = true;

    this._elements.push(this._renderer);
  }

  this._renderer.resize(w, h);

  this._renderer._applyDefaults();

  return this._renderer;
};

var _default = _main.default;
exports.default = _default;

},{"./constants":145,"./main":148,"./p5sound.Renderer2D":151,"core-js/modules/es.array.filter":117,"core-js/modules/es.array.iterator":120,"core-js/modules/es.object.get-own-property-descriptor":125,"core-js/modules/es.object.to-string":127,"core-js/modules/es.string.iterator":133,"core-js/modules/es.symbol":137,"core-js/modules/es.symbol.description":135,"core-js/modules/es.symbol.iterator":136,"core-js/modules/es.weak-map":138,"core-js/modules/web.dom-collections.iterator":140}],154:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = _interopRequireDefault(_dereq_("../main"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * @module Shape
 * @submodule 2D Primitives
 * @for p5
 * @requires core
 * @requires constants
 */

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


_main.default.prototype.ellipse = function (x, y, w, h) {
  return this._renderEllipse.apply(this, arguments);
}; // internal method for drawing ellipses (without parameter validation)


_main.default.prototype._renderEllipse = function (x, y, w, h) {
  // if the current stroke and fill settings wouldn't result in something
  // visible, exit immediately
  if (!this._renderer._doStroke && !this._renderer._doFill) {
    return this;
  } // p5sound supports negative width and heights for rects


  if (w < 0) {
    w = Math.abs(w);
  }

  if (h < 0) {
    h = Math.abs(h);
  }

  this._renderer.ellipse([x, y, w, h]);

  return this;
};

var _default = _main.default;
exports.default = _default;

},{"../main":148}],155:[function(_dereq_,module,exports){
"use strict";

_dereq_("core-js/modules/es.symbol");

_dereq_("core-js/modules/es.symbol.description");

_dereq_("core-js/modules/es.symbol.iterator");

_dereq_("core-js/modules/es.array.iterator");

_dereq_("core-js/modules/es.object.get-own-property-descriptor");

_dereq_("core-js/modules/es.object.to-string");

_dereq_("core-js/modules/es.string.iterator");

_dereq_("core-js/modules/es.weak-map");

_dereq_("core-js/modules/web.dom-collections.iterator");

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = _interopRequireDefault(_dereq_("../main"));

var constants = _interopRequireWildcard(_dereq_("../constants"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * @module Shape
 * @submodule Attributes
 * @for p5
 * @requires core
 * @requires constants
 */

/**
 * Modifies the location from which ellipses, circles, and arcs are drawn. By default, the
 * first two parameters are the x- and y-coordinates of the shape's center. The next
 * parameters are its width and height. This is equivalent to calling `ellipseMode(CENTER)`.
 *
 * `ellipseMode(RADIUS)` also uses the first two parameters to set the x- and y-coordinates
 * of the shape's center. The next parameters are half of the shapes's width and height.
 * Calling `ellipse(0, 0, 10, 15)` draws a shape with a width of 20 and height of 30.
 *
 * `ellipseMode(CORNER)` uses the first two parameters as the upper-left corner of the
 * shape. The next parameters are its width and height.
 *
 * `ellipseMode(CORNERS)` uses the first two parameters as the location of one corner
 * of the ellipse's bounding box. The third and fourth parameters are the location of the
 * opposite corner.
 *
 * The argument passed to `ellipseMode()` must be written in ALL CAPS because the constants
 * `CENTER`, `RADIUS`, `CORNER`, and `CORNERS` are defined this way. JavaScript is a
 * case-sensitive language.
 *
 * @method ellipseMode
 * @param  {Constant} mode either CENTER, RADIUS, CORNER, or CORNERS
 * @chainable
 * @example
 * <div>
 * <code>
 * ellipseMode(RADIUS);
 * fill(255);
 * ellipse(50, 50, 30, 30);
 * ellipseMode(CENTER);
 * fill(100);
 * ellipse(50, 50, 30, 30);
 * describe('A white circle with a gray circle at its center. Both circles have black outlines.');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * ellipseMode(CORNER);
 * fill(255);
 * ellipse(25, 25, 50, 50);
 * ellipseMode(CORNERS);
 * fill(100);
 * ellipse(25, 25, 50, 50);
 * describe('A white circle with a gray circle at its top-left corner. Both circles have black outlines.');
 * </code>
 * </div>
 */


_main.default.prototype.ellipseMode = function (m) {
  if (m === constants.CORNER || m === constants.CORNERS || m === constants.RADIUS || m === constants.CENTER) {
    this._renderer._ellipseMode = m;
  }

  return this;
};
/**
 * Draws all geometry with jagged (aliased) edges.
 *
 * <a href="#/p5/smooth">smooth()</a> is active by default in 2D mode. It's necessary to call
 * <a href="#/p5/noSmooth">noSmooth()</a> to disable smoothing of geometry, images, and fonts.
 *
 * In WebGL mode, <a href="#/p5/noSmooth">noSmooth()</a> is active by default. It's necessary
 * to call <a href="#/p5/smooth">smooth()</a> to draw smooth (antialiased) edges.
 *
 * @method noSmooth
 * @chainable
 * @example
 * <div>
 * <code>
 * background(0);
 * noStroke();
 * smooth();
 * ellipse(30, 48, 36, 36);
 * noSmooth();
 * ellipse(70, 48, 36, 36);
 * describe('Two pixelated white circles on a black background.');
 * </code>
 * </div>
 */


_main.default.prototype.noSmooth = function () {
  if (!this._renderer.isP3D) {
    if ('imageSmoothingEnabled' in this.drawingContext) {
      this.drawingContext.imageSmoothingEnabled = false;
    }
  } else {
    this.setAttributes('antialias', false);
  }

  return this;
};
/**
 * Modifies the location from which rectangles and squares are drawn. By default,
 * the first two parameters are the x- and y-coordinates of the shape's upper-left
 * corner. The next parameters are its width and height. This is equivalent to
 * calling `rectMode(CORNER)`.
 *
 * `rectMode(CORNERS)` also uses the first two parameters as the location of one of
 * the corners. The third and fourth parameters are the location of the opposite
 * corner.
 *
 * `rectMode(CENTER)` uses the first two parameters as the x- and y-coordinates of
 * the shape's center. The next parameters are its width and height.
 *
 * `rectMode(RADIUS)` also uses the first two parameters as the x- and y-coordinates
 * of the shape's center. The next parameters are half of the shape's width and
 * height.
 *
 * The argument passed to `rectMode()` must be written in ALL CAPS because the
 * constants `CENTER`, `RADIUS`, `CORNER`, and `CORNERS` are defined this way.
 * JavaScript is a case-sensitive language.
 *
 * @method rectMode
 * @param  {Constant} mode either CORNER, CORNERS, CENTER, or RADIUS
 * @chainable
 * @example
 * <div>
 * <code>
 * rectMode(CORNER);
 * fill(255);
 * rect(25, 25, 50, 50);
 *
 * rectMode(CORNERS);
 * fill(100);
 * rect(25, 25, 50, 50);
 *
 * describe('A small gray square drawn at the top-left corner of a white square.');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * rectMode(RADIUS);
 * fill(255);
 * rect(50, 50, 30, 30);
 *
 * rectMode(CENTER);
 * fill(100);
 * rect(50, 50, 30, 30);
 *
 * describe('A small gray square drawn at the center of a white square.');
 * </code>
 * </div>
 */


_main.default.prototype.rectMode = function (m) {
  if (m === constants.CORNER || m === constants.CORNERS || m === constants.RADIUS || m === constants.CENTER) {
    this._renderer._rectMode = m;
  }

  return this;
};
/**
 * Draws all geometry with smooth (anti-aliased) edges. <a href="#/p5/smooth">smooth()</a> will also
 * improve image quality of resized images.
 *
 * <a href="#/p5/smooth">smooth()</a> is active by default in 2D mode. It's necessary to call
 * <a href="#/p5/noSmooth">noSmooth()</a> to disable smoothing of geometry, images, and fonts.
 *
 * In WebGL mode, <a href="#/p5/noSmooth">noSmooth()</a> is active by default. It's necessary
 * to call <a href="#/p5/smooth">smooth()</a> to draw smooth (antialiased) edges.
 *
 * @method smooth
 * @chainable
 * @example
 * <div>
 * <code>
 * background(0);
 * noStroke();
 * smooth();
 * ellipse(30, 48, 36, 36);
 * noSmooth();
 * ellipse(70, 48, 36, 36);
 * describe('Two pixelated white circles on a black background.');
 * </code>
 * </div>
 */


_main.default.prototype.smooth = function () {
  this.setAttributes('antialias', true);

  if (!this._renderer.isP3D) {
    if ('imageSmoothingEnabled' in this.drawingContext) {
      this.drawingContext.imageSmoothingEnabled = true;
    }
  }

  return this;
};
/**
 * Sets the style for rendering line endings. These ends are either rounded
 * (`ROUND`), squared (`SQUARE`), or extended (`PROJECT`). The default cap is
 * `ROUND`.
 *
 * The argument passed to `strokeCap()` must be written in ALL CAPS because
 * the constants `ROUND`, `SQUARE`, and `PROJECT` are defined this way.
 * JavaScript is a case-sensitive language.
 *
 * @method strokeCap
 * @param  {Constant} cap either ROUND, SQUARE, or PROJECT
 * @chainable
 * @example
 * <div>
 * <code>
 * strokeWeight(12.0);
 * strokeCap(ROUND);
 * line(20, 30, 80, 30);
 * strokeCap(SQUARE);
 * line(20, 50, 80, 50);
 * strokeCap(PROJECT);
 * line(20, 70, 80, 70);
 * describe('Three horizontal lines. The top line has rounded ends, the middle line has squared ends, and the bottom line has longer, squared ends.');
 * </code>
 * </div>
 */


_main.default.prototype.strokeCap = function (cap) {
  if (cap === constants.ROUND || cap === constants.SQUARE || cap === constants.PROJECT) {
    this._renderer.strokeCap(cap);
  }

  return this;
};
/**
 * Sets the style of the joints which connect line segments. These joints are
 * either mitered (`MITER`), beveled (`BEVEL`), or rounded (`ROUND`). The default
 * joint is `MITER` in 2D mode and `ROUND` in WebGL mode.
 *
 * The argument passed to `strokeJoin()` must be written in ALL CAPS because
 * the constants `MITER`, `BEVEL`, and `ROUND` are defined this way.
 * JavaScript is a case-sensitive language.
 *
 * @method strokeJoin
 * @param  {Constant} join either MITER, BEVEL, or ROUND
 * @chainable
 * @example
 * <div>
 * <code>
 * noFill();
 * strokeWeight(10.0);
 * strokeJoin(MITER);
 * beginShape();
 * vertex(35, 20);
 * vertex(65, 50);
 * vertex(35, 80);
 * endShape();
 * describe('A right-facing arrowhead shape with a pointed tip in center of canvas.');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * noFill();
 * strokeWeight(10.0);
 * strokeJoin(BEVEL);
 * beginShape();
 * vertex(35, 20);
 * vertex(65, 50);
 * vertex(35, 80);
 * endShape();
 * describe('A right-facing arrowhead shape with a flat tip in center of canvas.');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * noFill();
 * strokeWeight(10.0);
 * strokeJoin(ROUND);
 * beginShape();
 * vertex(35, 20);
 * vertex(65, 50);
 * vertex(35, 80);
 * endShape();
 * describe('A right-facing arrowhead shape with a rounded tip in center of canvas.');
 * </code>
 * </div>
 */


_main.default.prototype.strokeJoin = function (join) {
  if (join === constants.ROUND || join === constants.BEVEL || join === constants.MITER) {
    this._renderer.strokeJoin(join);
  }

  return this;
};
/**
 * Sets the width of the stroke used for lines, points, and the border around
 * shapes. All widths are set in units of pixels.
 *
 * Note that `strokeWeight()` is affected by any transformation or scaling that
 * has been applied previously.
 *
 * @method strokeWeight
 * @param  {Number} weight the weight of the stroke (in pixels).
 * @chainable
 * @example
 * <div>
 * <code>
 * // Default.
 * line(20, 20, 80, 20);
 * // Thicker.
 * strokeWeight(4);
 * line(20, 40, 80, 40);
 * // Beastly.
 * strokeWeight(10);
 * line(20, 70, 80, 70);
 * describe('Three horizontal black lines. The top line is thin, the middle is medium, and the bottom is thick.');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // Default.
 * line(20, 20, 80, 20);
 * // Adding scale transformation.
 * scale(5);
 * // Coordinates adjusted for scaling.
 * line(4, 8, 16, 8);
 * describe('Two horizontal black lines. The top line is thin and the bottom is five times thicker than the top.');
 * </code>
 * </div>
 */


_main.default.prototype.strokeWeight = function (w) {
  this._renderer.strokeWeight(w);

  return this;
};

var _default = _main.default;
exports.default = _default;

},{"../constants":145,"../main":148,"core-js/modules/es.array.iterator":120,"core-js/modules/es.object.get-own-property-descriptor":125,"core-js/modules/es.object.to-string":127,"core-js/modules/es.string.iterator":133,"core-js/modules/es.symbol":137,"core-js/modules/es.symbol.description":135,"core-js/modules/es.symbol.iterator":136,"core-js/modules/es.weak-map":138,"core-js/modules/web.dom-collections.iterator":140}],156:[function(_dereq_,module,exports){
"use strict";

_dereq_("core-js/modules/es.array.for-each");

_dereq_("core-js/modules/es.object.assign");

_dereq_("core-js/modules/web.dom-collections.for-each");

_dereq_("core-js/modules/es.array.for-each");

_dereq_("core-js/modules/es.object.assign");

_dereq_("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = _interopRequireDefault(_dereq_("./main"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * @module Structure
 * @submodule Structure
 * @for p5
 * @requires core
 */


_main.default.prototype.push = function () {
  this._styles.push({
    props: {
      _colorMode: this._colorMode
    },
    renderer: this._renderer.push()
  });
};

_main.default.prototype.pop = function () {
  var style = this._styles.pop();

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


_main.default.prototype.redraw = function (n) {
  if (this._inUserDraw || !this._setupDone) {
    return;
  }

  var numberOfRedraws = parseInt(n);

  if (isNaN(numberOfRedraws) || numberOfRedraws < 1) {
    numberOfRedraws = 1;
  }

  var context = this._isGlobal ? window : this;

  if (typeof context.draw === 'function') {
    if (typeof context.setup === 'undefined') {
      context.scale(context._pixelDensity, context._pixelDensity);
    }

    var callMethod = function callMethod(f) {
      f.call(context);
    };

    for (var idxRedraw = 0; idxRedraw < numberOfRedraws; idxRedraw++) {
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
 * The `p5sound()` constructor enables you to activate "instance mode" instead of normal
 * "global mode". This is an advanced topic. A short description and example is
 * included below. Please see
 * <a target="blank" href="https://www.youtube.com/watch?v=Su792jEauZg&feature=youtu.be">
 * Dan Shiffman's Coding Train video tutorial</a> or this
 * <a target="blank" href="https://github.com/processing/p5sound.js/wiki/p5sound.js-overview#instantiation--namespace">tutorial page</a>
 * for more info.
 *
 * By default, all p5sound.js functions are in the global namespace (i.e. bound to the window
 * object), meaning you can call them simply `ellipse()`, `fill()`, etc. However, this
 * might be inconvenient if you are mixing with other JS libraries (synchronously or
 * asynchronously) or writing long programs of your own. p5sound.js currently supports a
 * way around this problem called "instance mode". In instance mode, all p5sound functions
 * are bound up in a single variable instead of polluting your global namespace.
 *
 * Optionally, you can specify a default container for the canvas and any other elements
 * to append to with a second argument. You can give the ID of an element in your html,
 * or an html node itself.
 *
 * Note that creating instances like this also allows you to have more than one p5sound sketch on
 * a single web page, as they will each be wrapped up with their own set up variables. Of
 * course, you could also use iframes to have multiple sketches in global mode.
 *
 * @method p5
 * @param {Object} sketch a function containing a p5sound.js sketch
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
 * new p5sound(s); // invoke p5
 * </code></div>
 *
 * @alt
 * white rectangle on black background
 */


var _default = _main.default;
exports.default = _default;

},{"./main":148,"core-js/modules/es.array.for-each":118,"core-js/modules/es.object.assign":124,"core-js/modules/web.dom-collections.for-each":139}],157:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAudioContext = getAudioContext;
exports.default = void 0;
var audioContext = new window.AudioContext();
/**
 * <p>Returns the Audio Context for this sketch. Useful for users
 * who would like to dig deeper into the <a target='_blank' href=
 * 'http://webaudio.github.io/web-audio-api/'>Web Audio API
 * </a>.</p>
 *
 * <p>Some browsers require users to startAudioContext
 * with a user gesture, such as touchStarted in the example below.</p>
 *
 * @for p5
 * @method getAudioContext
 * @return {Object}    AudioContext for this sketch
 * @example
 *  function draw() {
 *    background(255);
 *    textAlign(CENTER);
 *
 *    if (getAudioContext().state !== 'running') {
 *      text('click to start audio', width/2, height/2);
 *    } else {
 *      text('audio is enabled', width/2, height/2);
 *    }
 *  }
 *
 *  function touchStarted() {
 *    if (getAudioContext().state !== 'running') {
 *      getAudioContext().resume();
 *    }
 *    var synth = new p5sound.MonoSynth();
 *    synth.play('A4', 0.5, 0, 0.2);
 *  }
 *
 */

function getAudioContext() {
  return audioContext;
}

var _default = audioContext;
exports.default = _default;

},{}],158:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _audioContext = _interopRequireDefault(_dereq_("./audioContext.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
} // P5Sound contains the final sound output bus.


var Main = function Main() {
  _classCallCheck(this, Main); // this.input = audioContext.createGain();
  // this.output = audioContext.createGain();
  // //put a hard limiter on the output
  // this.limiter = audioContext.createDynamicsCompressor();
  // this.limiter.threshold.value = -3;
  // this.limiter.ratio.value = 20;
  // this.limiter.knee.value = 1;


  this.audiocontext = _audioContext.default; //   this.output.disconnect();
  //   // connect input to limiter
  //   this.input.connect(this.limiter);
  //   // connect limiter to output
  //   this.limiter.connect(this.output);
  //   // meter is just for global Amplitude / FFT analysis
  //   this.meter = audiocontext.createGain();
  //   this.fftMeter = audiocontext.createGain();
  //   this.output.connect(this.meter);
  //   this.output.connect(this.fftMeter);
  //   // connect output to destination
  //   this.output.connect(this.audiocontext.destination);
  //   // an array of all sounds in the sketch
  //   this.soundArray = [];
  //   // an array of all musical parts in the sketch
  //   this.parts = [];
  // file extensions to search for

  this.extensions = [];
}; // create a single instance of the p5Sound main output for use within this sketch


var p5sound = new Main();
/**
 * Returns a number representing the output volume for sound
 * in this sketch.
 *
 * @method getOutputVolume
 * @return {Number} Output volume for sound in this sketch.
 *                  Should be between 0.0 (silence) and 1.0.
 */
// p5sound.prototype.getOutputVolume = function () {
//   return p5sound.output.gain.value;
// };

/**
 *  <p>Scale the output of all sound in this sketch</p>
 *  Scaled between 0.0 (silence) and 1.0 (full volume).
 *  1.0 is the maximum amplitude of a digital sound, so multiplying
 *  by greater than 1.0 may cause digital distortion. To
 *  fade, provide a <code>rampTime</code> parameter. For more
 *  complex fades, see the Envelope class.
 *
 *  Alternately, you can pass in a signal source such as an
 *  oscillator to modulate the amplitude with an audio signal.
 *
 *  <p><b>How This Works</b>: When you load the p5.sound module, it
 *  creates a single instance of p5sound. All sound objects in this
 *  module output to p5sound before reaching your computer's output.
 *  So if you change the amplitude of p5sound, it impacts all of the
 *  sound in this module.</p>
 *
 *  <p>If no value is provided, returns a Web Audio API Gain Node</p>
 *
 *  @method outputVolume
 *  @param {Number|Object} volume  Volume (amplitude) between 0.0
 *                                     and 1.0 or modulating signal/oscillator
 *  @param {Number} [rampTime]  Fade for t seconds
 *  @param {Number} [timeFromNow]  Schedule this event to happen at
 *                                 t seconds in the future
 */
// p5sound.prototype.outputVolume = function (vol, rampTime = 0, tFromNow = 0) {
//   if (typeof vol === 'number') {
//     var now = p5sound.audiocontext.currentTime;
//     var currentVol = p5sound.output.gain.value;
//     p5sound.output.gain.cancelScheduledValues(now + tFromNow);
//     if (rampTime !== 0)
//       p5sound.output.gain.linearRampToValueAtTime(currentVol, now + tFromNow);
//     p5sound.output.gain.linearRampToValueAtTime(vol, now + tFromNow + rampTime);
//   } else if (vol) {
//     vol.connect(p5sound.output.gain);
//   } else {
//     // return the Gain Node
//     return p5sound.output.gain;
//   }
// };

/**
 *  `p5sound.soundOut` is the p5sound.sound final output bus. It sends output to
 *  the destination of this window's web audio context. It contains
 *  Web Audio API nodes including a dyanmicsCompressor (<code>.limiter</code>),
 *  and Gain Nodes for <code>.input</code> and <code>.output</code>.
 *
 *  @property {Object} soundOut
 */
// p5sound.prototype.soundOut = p5sound.soundOut = p5sound;
// a silent connection to the DesinationNode
// which will ensure that anything connected to it
// will not be garbage collected
// p5sound.soundOut._silentNode = p5sound.audiocontext.createGain();
// p5sound.soundOut._silentNode.gain.value = 0;
// p5sound.soundOut._silentNode.connect(p5sound.audiocontext.destination);

var _default = p5sound;
exports.default = _default;

},{"./audioContext.js":157}],159:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _audioContext = _interopRequireDefault(_dereq_("./audioContext"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
} // reference
// https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/destination
// jason recommends to play with the web audio api on the console
// on google chrome

/*
 * Class methods
 */

/**
*
* @class p5sound.Oscillator
* @constructor
* @param {Number} type
*/


var Oscillator =
/*#__PURE__*/
function () {
  function Oscillator(freq, type) {
    _classCallCheck(this, Oscillator);

    this.type = type; //sine, triangle, square, saw, pulse

    if (typeof freq === 'string') {
      var f = type;
      type = freq;
      freq = f;
    }

    if (typeof type === 'number') {
      var _f = type;
      type = freq;
      freq = _f;
    }

    this.started = false;
    this.oscillator = _audioContext.default.createOscillator();
    this.f = freq || 440.0; // frequency

    this.oscillator.type = type || 'sine';
    this.oscillator.frequency.setValueAtTime(this.f, _audioContext.default.currentTime); // connections

    this.output = _audioContext.default.createGain(); // set default output gain to 0.5
    // TODO: maybe think of a constant that people can tweak
    // for max volume

    this.output.gain.value = 0.5;
    this.output.gain.setValueAtTime(0.5, _audioContext.default.currentTime);
    this.oscillator.connect(this.output);
    this.output.connect(_audioContext.default.destination); // if you wanna do 3D node panners
    // please do it with web audio api,
    // everything we are doing here its compatible
    // add to the soundArray so we can dispose of the osc later
    // p5sound.soundArray.push(this);
    // TODO: try a different approach
    // not create references to the audio nodes
    // so that we dont use up so much memory
    // this.typeName = '';
    // switch(type){
    //   default:
    //   case 0:
    //     this.typeName = 'sine';
    //     break;
    //   case 1:
    //     this.typeName = 'triangle';
    //     break;
    //   case 2:
    //     this.typeName = 'square';
    //     break;
    //   case 3:
    //     this.typeName = 'saw';
    //     break;
    //   case 4:
    //     this.typeName = 'pulse';
    //     break;
    // }
  }

  _createClass(Oscillator, [{
    key: "start",
    value: function start(time, f) {
      if (this.started) {
        var now = _audioContext.default.currentTime;
        this.stop(now);
      }

      if (!this.started) {
        var freq = f || this.f;
        var type = this.oscillator.type;
        this.oscillator = _audioContext.default.createOscillator();
        this.oscillator.frequency.value = Math.abs(freq);
        this.oscillator.type = type;
        this.oscillator.connect(this.output);
        time = time || 0;
        this.oscillator.start(time + _audioContext.default.currentTime);
        this.started = true;
      }
    } // hopefully we can get rid of the started variable

  }, {
    key: "stop",
    value: function stop(time) {
      if (this.started) {
        var t = time || 0;
        var now = _audioContext.default.currentTime;
        this.oscillator.stop(t + now);
        this.started = false;
      }
    }
    /**
    * Dummy method
    *
    * @method helloworld
    *
    */

  }, {
    key: "helloworld",
    value: function helloworld() {
      console.log(this.typeName);
    }
  }]);

  return Oscillator;
}();

var _default = Oscillator;
exports.default = _default;

},{"./audioContext":157}],160:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = _interopRequireDefault(_dereq_("../core/main"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
/*
* @class p5sound.Oscillator
* @constructor
* @param {String|Array} path to a sound file (String). Optionally, you may include multiple file formats in an array. Alternately, accepts an object from the HTML5 File API, or a p5sound.File.
* @param {Function} [successCallback] Name of a function to call once file loads.
*/


_main.default.SoundFile =
/*#__PURE__*/
function () {
  function _class(path) {
    _classCallCheck(this, _class);

    this.path = path;
  }

  _createClass(_class, [{
    key: "isLoaded",
    value: function isLoaded() {
      console.log('isLoaded');
    }
  }, {
    key: "play",
    value: function play() {
      console.log('play');
    }
  }, {
    key: "playMode",
    value: function playMode() {
      console.log('playMode');
    }
  }, {
    key: "pause",
    value: function pause() {
      console.log('pause');
    }
  }]);

  return _class;
}();

var _default = _main.default.SoundFile;
exports.default = _default;

},{"../core/main":148}],161:[function(_dereq_,module,exports){
"use strict";

_dereq_("core-js/modules/es.array.map");

_dereq_("core-js/modules/es.array.map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = _interopRequireDefault(_dereq_("../core/main"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * @module Data
 * @submodule Conversion
 * @for p5
 * @requires core
 */

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


_main.default.prototype.int = function (n) {
  var radix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

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
    return n.map(function (n) {
      return _main.default.prototype.int(n, radix);
    });
  }
};

var _default = _main.default;
exports.default = _default;

},{"../core/main":148,"core-js/modules/es.array.map":122}]},{},[141])(141)
});
