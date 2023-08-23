/*! p5.sound.js v0.0.1 August 23, 2023 */
(function (f) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = f()
  } else if (typeof define === 'function' && define.amd) {
    define([], f)
  } else {
    var g;
    if (typeof window !== 'undefined') {
      g = window
    } else if (typeof global !== 'undefined') {
      g = global
    } else if (typeof self !== 'undefined') {
      g = self
    } else {
      g = this
    }
    g.p5sound = f()
  }
}) (function () {
  var define,
  module,
  exports;
  return (function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = 'function' == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error('Cannot find module \'' + i + '\'');
            throw a.code = 'MODULE_NOT_FOUND',
            a
          }
          var p = n[i] = {
            exports: {
            }
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r)
          }, p, p.exports, r, e, n, t)
        }
        return n[i].exports
      }
      for (var u = 'function' == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
      return o
    }
    return r
  }) () ({
    1: [
      function (_dereq_, module, exports) {
        module.exports = function (it) {
          if (typeof it != 'function') {
            throw TypeError(String(it) + ' is not a function');
          }
          return it;
        };
      },
      {
      }
    ],
    2: [
      function (_dereq_, module, exports) {
        var isObject = _dereq_('../internals/is-object');
        module.exports = function (it) {
          if (!isObject(it) && it !== null) {
            throw TypeError('Can\'t set ' + String(it) + ' as a prototype');
          }
          return it;
        };
      },
      {
        '../internals/is-object': 65
      }
    ],
    3: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/object-create': 76,
        '../internals/object-define-property': 78,
        '../internals/well-known-symbol': 127
      }
    ],
    4: [
      function (_dereq_, module, exports) {
        'use strict';
        var charAt = _dereq_('../internals/string-multibyte').charAt; // `AdvanceStringIndex` abstract operation
        // https://tc39.github.io/ecma262/#sec-advancestringindex
        module.exports = function (S, index, unicode) {
          return index + (unicode ? charAt(S, index).length : 1);
        };
      },
      {
        '../internals/string-multibyte': 107
      }
    ],
    5: [
      function (_dereq_, module, exports) {
        module.exports = function (it, Constructor, name) {
          if (!(it instanceof Constructor)) {
            throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
          }
          return it;
        };
      },
      {
      }
    ],
    6: [
      function (_dereq_, module, exports) {
        var isObject = _dereq_('../internals/is-object');
        module.exports = function (it) {
          if (!isObject(it)) {
            throw TypeError(String(it) + ' is not an object');
          }
          return it;
        };
      },
      {
        '../internals/is-object': 65
      }
    ],
    7: [
      function (_dereq_, module, exports) {
        module.exports = typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined';
      },
      {
      }
    ],
    8: [
      function (_dereq_, module, exports) {
        'use strict';
        var NATIVE_ARRAY_BUFFER = _dereq_('../internals/array-buffer-native');
        var DESCRIPTORS = _dereq_('../internals/descriptors');
        var global = _dereq_('../internals/global');
        var isObject = _dereq_('../internals/is-object');
        var has = _dereq_('../internals/has');
        var classof = _dereq_('../internals/classof');
        var createNonEnumerableProperty = _dereq_('../internals/create-non-enumerable-property');
        var redefine = _dereq_('../internals/redefine');
        var defineProperty = _dereq_('../internals/object-define-property').f;
        var getPrototypeOf = _dereq_('../internals/object-get-prototype-of');
        var setPrototypeOf = _dereq_('../internals/object-set-prototype-of');
        var wellKnownSymbol = _dereq_('../internals/well-known-symbol');
        var uid = _dereq_('../internals/uid');
        var Int8Array = global.Int8Array;
        var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
        var Uint8ClampedArray = global.Uint8ClampedArray;
        var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
        var TypedArray = Int8Array && getPrototypeOf(Int8Array);
        var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
        var ObjectPrototype = Object.prototype;
        var isPrototypeOf = ObjectPrototype.isPrototypeOf;
        var TO_STRING_TAG = wellKnownSymbol('toStringTag');
        var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG'); // Fixing native typed arrays in Opera Presto crashes the browser, see #595
        var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(global.opera) !== 'Opera';
        var TYPED_ARRAY_TAG_REQIRED = false;
        var NAME;
        var TypedArrayConstructorsList = {
          Int8Array: 1,
          Uint8Array: 1,
          Uint8ClampedArray: 1,
          Int16Array: 2,
          Uint16Array: 2,
          Int32Array: 4,
          Uint32Array: 4,
          Float32Array: 4,
          Float64Array: 8
        };
        var isView = function isView(it) {
          var klass = classof(it);
          return klass === 'DataView' || has(TypedArrayConstructorsList, klass);
        };
        var isTypedArray = function (it) {
          return isObject(it) && has(TypedArrayConstructorsList, classof(it));
        };
        var aTypedArray = function (it) {
          if (isTypedArray(it)) return it;
          throw TypeError('Target is not a typed array');
        };
        var aTypedArrayConstructor = function (C) {
          if (setPrototypeOf) {
            if (isPrototypeOf.call(TypedArray, C)) return C;
          } else for (var ARRAY in TypedArrayConstructorsList) if (has(TypedArrayConstructorsList, NAME)) {
            var TypedArrayConstructor = global[ARRAY];
            if (TypedArrayConstructor && (C === TypedArrayConstructor || isPrototypeOf.call(TypedArrayConstructor, C))) {
              return C;
            }
          }
          throw TypeError('Target is not a typed array constructor');
        };
        var exportTypedArrayMethod = function (KEY, property, forced) {
          if (!DESCRIPTORS) return;
          if (forced) for (var ARRAY in TypedArrayConstructorsList) {
            var TypedArrayConstructor = global[ARRAY];
            if (TypedArrayConstructor && has(TypedArrayConstructor.prototype, KEY)) {
              delete TypedArrayConstructor.prototype[KEY];
            }
          }
          if (!TypedArrayPrototype[KEY] || forced) {
            redefine(TypedArrayPrototype, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property);
          }
        };
        var exportTypedArrayStaticMethod = function (KEY, property, forced) {
          var ARRAY,
          TypedArrayConstructor;
          if (!DESCRIPTORS) return;
          if (setPrototypeOf) {
            if (forced) for (ARRAY in TypedArrayConstructorsList) {
              TypedArrayConstructor = global[ARRAY];
              if (TypedArrayConstructor && has(TypedArrayConstructor, KEY)) {
                delete TypedArrayConstructor[KEY];
              }
            }
            if (!TypedArray[KEY] || forced) {
              // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
              try {
                return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8Array[KEY] || property);
              } catch (error) {
                /* empty */
              }
            } else return;
          }
          for (ARRAY in TypedArrayConstructorsList) {
            TypedArrayConstructor = global[ARRAY];
            if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
              redefine(TypedArrayConstructor, KEY, property);
            }
          }
        };
        for (NAME in TypedArrayConstructorsList) {
          if (!global[NAME]) NATIVE_ARRAY_BUFFER_VIEWS = false;
        } // WebKit bug - typed arrays constructors prototype is Object.prototype

        if (!NATIVE_ARRAY_BUFFER_VIEWS || typeof TypedArray != 'function' || TypedArray === Function.prototype) {
          // eslint-disable-next-line no-shadow
          TypedArray = function TypedArray() {
            throw TypeError('Incorrect invocation');
          };
          if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
            if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);
          }
        }
        if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
          TypedArrayPrototype = TypedArray.prototype;
          if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
            if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
          }
        } // WebKit bug - one more object in Uint8ClampedArray prototype chain

        if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
          setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
        }
        if (DESCRIPTORS && !has(TypedArrayPrototype, TO_STRING_TAG)) {
          TYPED_ARRAY_TAG_REQIRED = true;
          defineProperty(TypedArrayPrototype, TO_STRING_TAG, {
            get: function () {
              return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
            }
          });
          for (NAME in TypedArrayConstructorsList) if (global[NAME]) {
            createNonEnumerableProperty(global[NAME], TYPED_ARRAY_TAG, NAME);
          }
        }
        module.exports = {
          NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
          TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG,
          aTypedArray: aTypedArray,
          aTypedArrayConstructor: aTypedArrayConstructor,
          exportTypedArrayMethod: exportTypedArrayMethod,
          exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
          isView: isView,
          isTypedArray: isTypedArray,
          TypedArray: TypedArray,
          TypedArrayPrototype: TypedArrayPrototype
        };
      },
      {
        '../internals/array-buffer-native': 7,
        '../internals/classof': 24,
        '../internals/create-non-enumerable-property': 30,
        '../internals/descriptors': 35,
        '../internals/global': 50,
        '../internals/has': 51,
        '../internals/is-object': 65,
        '../internals/object-define-property': 78,
        '../internals/object-get-prototype-of': 83,
        '../internals/object-set-prototype-of': 87,
        '../internals/redefine': 94,
        '../internals/uid': 124,
        '../internals/well-known-symbol': 127
      }
    ],
    9: [
      function (_dereq_, module, exports) {
        'use strict';
        var global = _dereq_('../internals/global');
        var DESCRIPTORS = _dereq_('../internals/descriptors');
        var NATIVE_ARRAY_BUFFER = _dereq_('../internals/array-buffer-native');
        var createNonEnumerableProperty = _dereq_('../internals/create-non-enumerable-property');
        var redefineAll = _dereq_('../internals/redefine-all');
        var fails = _dereq_('../internals/fails');
        var anInstance = _dereq_('../internals/an-instance');
        var toInteger = _dereq_('../internals/to-integer');
        var toLength = _dereq_('../internals/to-length');
        var toIndex = _dereq_('../internals/to-index');
        var IEEE754 = _dereq_('../internals/ieee754');
        var getPrototypeOf = _dereq_('../internals/object-get-prototype-of');
        var setPrototypeOf = _dereq_('../internals/object-set-prototype-of');
        var getOwnPropertyNames = _dereq_('../internals/object-get-own-property-names').f;
        var defineProperty = _dereq_('../internals/object-define-property').f;
        var arrayFill = _dereq_('../internals/array-fill');
        var setToStringTag = _dereq_('../internals/set-to-string-tag');
        var InternalStateModule = _dereq_('../internals/internal-state');
        var getInternalState = InternalStateModule.get;
        var setInternalState = InternalStateModule.set;
        var ARRAY_BUFFER = 'ArrayBuffer';
        var DATA_VIEW = 'DataView';
        var PROTOTYPE = 'prototype';
        var WRONG_LENGTH = 'Wrong length';
        var WRONG_INDEX = 'Wrong index';
        var NativeArrayBuffer = global[ARRAY_BUFFER];
        var $ArrayBuffer = NativeArrayBuffer;
        var $DataView = global[DATA_VIEW];
        var $DataViewPrototype = $DataView && $DataView[PROTOTYPE];
        var ObjectPrototype = Object.prototype;
        var RangeError = global.RangeError;
        var packIEEE754 = IEEE754.pack;
        var unpackIEEE754 = IEEE754.unpack;
        var packInt8 = function (number) {
          return [number & 255];
        };
        var packInt16 = function (number) {
          return [number & 255,
          number >> 8 & 255];
        };
        var packInt32 = function (number) {
          return [number & 255,
          number >> 8 & 255,
          number >> 16 & 255,
          number >> 24 & 255];
        };
        var unpackInt32 = function (buffer) {
          return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
        };
        var packFloat32 = function (number) {
          return packIEEE754(number, 23, 4);
        };
        var packFloat64 = function (number) {
          return packIEEE754(number, 52, 8);
        };
        var addGetter = function (Constructor, key) {
          defineProperty(Constructor[PROTOTYPE], key, {
            get: function () {
              return getInternalState(this) [key];
            }
          });
        };
        var get = function (view, count, index, isLittleEndian) {
          var intIndex = toIndex(index);
          var store = getInternalState(view);
          if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
          var bytes = getInternalState(store.buffer).bytes;
          var start = intIndex + store.byteOffset;
          var pack = bytes.slice(start, start + count);
          return isLittleEndian ? pack : pack.reverse();
        };
        var set = function (view, count, index, conversion, value, isLittleEndian) {
          var intIndex = toIndex(index);
          var store = getInternalState(view);
          if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
          var bytes = getInternalState(store.buffer).bytes;
          var start = intIndex + store.byteOffset;
          var pack = conversion( + value);
          for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
        };
        if (!NATIVE_ARRAY_BUFFER) {
          $ArrayBuffer = function ArrayBuffer(length) {
            anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
            var byteLength = toIndex(length);
            setInternalState(this, {
              bytes: arrayFill.call(new Array(byteLength), 0),
              byteLength: byteLength
            });
            if (!DESCRIPTORS) this.byteLength = byteLength;
          };
          $DataView = function DataView(buffer, byteOffset, byteLength) {
            anInstance(this, $DataView, DATA_VIEW);
            anInstance(buffer, $ArrayBuffer, DATA_VIEW);
            var bufferLength = getInternalState(buffer).byteLength;
            var offset = toInteger(byteOffset);
            if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset');
            byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
            if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
            setInternalState(this, {
              buffer: buffer,
              byteLength: byteLength,
              byteOffset: offset
            });
            if (!DESCRIPTORS) {
              this.buffer = buffer;
              this.byteLength = byteLength;
              this.byteOffset = offset;
            }
          };
          if (DESCRIPTORS) {
            addGetter($ArrayBuffer, 'byteLength');
            addGetter($DataView, 'buffer');
            addGetter($DataView, 'byteLength');
            addGetter($DataView, 'byteOffset');
          }
          redefineAll($DataView[PROTOTYPE], {
            getInt8: function getInt8(byteOffset) {
              return get(this, 1, byteOffset) [0] << 24 >> 24;
            },
            getUint8: function getUint8(byteOffset) {
              return get(this, 1, byteOffset) [0];
            },
            getInt16: function getInt16(byteOffset            /* , littleEndian */
            ) {
              var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
              return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
            },
            getUint16: function getUint16(byteOffset            /* , littleEndian */
            ) {
              var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
              return bytes[1] << 8 | bytes[0];
            },
            getInt32: function getInt32(byteOffset            /* , littleEndian */
            ) {
              return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
            },
            getUint32: function getUint32(byteOffset            /* , littleEndian */
            ) {
              return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
            },
            getFloat32: function getFloat32(byteOffset            /* , littleEndian */
            ) {
              return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
            },
            getFloat64: function getFloat64(byteOffset            /* , littleEndian */
            ) {
              return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
            },
            setInt8: function setInt8(byteOffset, value) {
              set(this, 1, byteOffset, packInt8, value);
            },
            setUint8: function setUint8(byteOffset, value) {
              set(this, 1, byteOffset, packInt8, value);
            },
            setInt16: function setInt16(byteOffset, value            /* , littleEndian */
            ) {
              set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
            },
            setUint16: function setUint16(byteOffset, value            /* , littleEndian */
            ) {
              set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
            },
            setInt32: function setInt32(byteOffset, value            /* , littleEndian */
            ) {
              set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
            },
            setUint32: function setUint32(byteOffset, value            /* , littleEndian */
            ) {
              set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
            },
            setFloat32: function setFloat32(byteOffset, value            /* , littleEndian */
            ) {
              set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
            },
            setFloat64: function setFloat64(byteOffset, value            /* , littleEndian */
            ) {
              set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
            }
          });
        } else {
          if (!fails(function () {
            NativeArrayBuffer(1);
          }) || !fails(function () {
            new NativeArrayBuffer( - 1); // eslint-disable-line no-new
          }) || fails(function () {
            new NativeArrayBuffer(); // eslint-disable-line no-new
            new NativeArrayBuffer(1.5); // eslint-disable-line no-new
            new NativeArrayBuffer(NaN); // eslint-disable-line no-new
            return NativeArrayBuffer.name != ARRAY_BUFFER;
          })) {
            $ArrayBuffer = function ArrayBuffer(length) {
              anInstance(this, $ArrayBuffer);
              return new NativeArrayBuffer(toIndex(length));
            };
            var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE] = NativeArrayBuffer[PROTOTYPE];
            for (var keys = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys.length > j; ) {
              if (!((key = keys[j++]) in $ArrayBuffer)) {
                createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
              }
            }
            ArrayBufferPrototype.constructor = $ArrayBuffer;
          } // WebKit bug - the same parent prototype for typed arrays and data view

          if (setPrototypeOf && getPrototypeOf($DataViewPrototype) !== ObjectPrototype) {
            setPrototypeOf($DataViewPrototype, ObjectPrototype);
          } // iOS Safari 7.x bug

          var testView = new $DataView(new $ArrayBuffer(2));
          var nativeSetInt8 = $DataViewPrototype.setInt8;
          testView.setInt8(0, 2147483648);
          testView.setInt8(1, 2147483649);
          if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataViewPrototype, {
            setInt8: function setInt8(byteOffset, value) {
              nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
            },
            setUint8: function setUint8(byteOffset, value) {
              nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
            }
          }, {
            unsafe: true
          });
        }
        setToStringTag($ArrayBuffer, ARRAY_BUFFER);
        setToStringTag($DataView, DATA_VIEW);
        module.exports = {
          ArrayBuffer: $ArrayBuffer,
          DataView: $DataView
        };
      },
      {
        '../internals/an-instance': 5,
        '../internals/array-buffer-native': 7,
        '../internals/array-fill': 11,
        '../internals/create-non-enumerable-property': 30,
        '../internals/descriptors': 35,
        '../internals/fails': 43,
        '../internals/global': 50,
        '../internals/ieee754': 56,
        '../internals/internal-state': 61,
        '../internals/object-define-property': 78,
        '../internals/object-get-own-property-names': 81,
        '../internals/object-get-prototype-of': 83,
        '../internals/object-set-prototype-of': 87,
        '../internals/redefine-all': 93,
        '../internals/set-to-string-tag': 102,
        '../internals/to-index': 112,
        '../internals/to-integer': 114,
        '../internals/to-length': 115
      }
    ],
    10: [
      function (_dereq_, module, exports) {
        'use strict';
        var toObject = _dereq_('../internals/to-object');
        var toAbsoluteIndex = _dereq_('../internals/to-absolute-index');
        var toLength = _dereq_('../internals/to-length');
        var min = Math.min; // `Array.prototype.copyWithin` method implementation
        // https://tc39.github.io/ecma262/#sec-array.prototype.copywithin
        module.exports = [
        ].copyWithin || function copyWithin(target        /* = 0 */
        , start        /* = 0, end = @length */
        ) {
          var O = toObject(this);
          var len = toLength(O.length);
          var to = toAbsoluteIndex(target, len);
          var from = toAbsoluteIndex(start, len);
          var end = arguments.length > 2 ? arguments[2] : undefined;
          var count = min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
          var inc = 1;
          if (from < to && to < from + count) {
            inc = - 1;
            from += count - 1;
            to += count - 1;
          }
          while (count-- > 0) {
            if (from in O) O[to] = O[from];
             else delete O[to];
            to += inc;
            from += inc;
          }
          return O;
        };
      },
      {
        '../internals/to-absolute-index': 111,
        '../internals/to-length': 115,
        '../internals/to-object': 116
      }
    ],
    11: [
      function (_dereq_, module, exports) {
        'use strict';
        var toObject = _dereq_('../internals/to-object');
        var toAbsoluteIndex = _dereq_('../internals/to-absolute-index');
        var toLength = _dereq_('../internals/to-length'); // `Array.prototype.fill` method implementation
        // https://tc39.github.io/ecma262/#sec-array.prototype.fill
        module.exports = function fill(value        /* , start = 0, end = @length */
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
      },
      {
        '../internals/to-absolute-index': 111,
        '../internals/to-length': 115,
        '../internals/to-object': 116
      }
    ],
    12: [
      function (_dereq_, module, exports) {
        'use strict';
        var $forEach = _dereq_('../internals/array-iteration').forEach;
        var arrayMethodIsStrict = _dereq_('../internals/array-method-is-strict');
        var arrayMethodUsesToLength = _dereq_('../internals/array-method-uses-to-length');
        var STRICT_METHOD = arrayMethodIsStrict('forEach');
        var USES_TO_LENGTH = arrayMethodUsesToLength('forEach'); // `Array.prototype.forEach` method implementation
        // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
        module.exports = !STRICT_METHOD || !USES_TO_LENGTH ? function forEach(callbackfn        /* , thisArg */
        ) {
          return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        }
         : [
        ].forEach;
      },
      {
        '../internals/array-iteration': 14,
        '../internals/array-method-is-strict': 17,
        '../internals/array-method-uses-to-length': 18
      }
    ],
    13: [
      function (_dereq_, module, exports) {
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
            return !IS_INCLUDES && - 1;
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
      },
      {
        '../internals/to-absolute-index': 111,
        '../internals/to-indexed-object': 113,
        '../internals/to-length': 115
      }
    ],
    14: [
      function (_dereq_, module, exports) {
        var bind = _dereq_('../internals/function-bind-context');
        var IndexedObject = _dereq_('../internals/indexed-object');
        var toObject = _dereq_('../internals/to-object');
        var toLength = _dereq_('../internals/to-length');
        var arraySpeciesCreate = _dereq_('../internals/array-species-create');
        var push = [
        ].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
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
            var value,
            result;
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
            return IS_FIND_INDEX ? - 1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
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
      },
      {
        '../internals/array-species-create': 20,
        '../internals/function-bind-context': 46,
        '../internals/indexed-object': 57,
        '../internals/to-length': 115,
        '../internals/to-object': 116
      }
    ],
    15: [
      function (_dereq_, module, exports) {
        'use strict';
        var toIndexedObject = _dereq_('../internals/to-indexed-object');
        var toInteger = _dereq_('../internals/to-integer');
        var toLength = _dereq_('../internals/to-length');
        var arrayMethodIsStrict = _dereq_('../internals/array-method-is-strict');
        var arrayMethodUsesToLength = _dereq_('../internals/array-method-uses-to-length');
        var min = Math.min;
        var nativeLastIndexOf = [
        ].lastIndexOf;
        var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [
          1
        ].lastIndexOf(1, - 0) < 0;
        var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf'); // For preventing possible almost infinite loop in non-standard implementations, test the forward version of the method
        var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', {
          ACCESSORS: true,
          1: 0
        });
        var FORCED = NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH; // `Array.prototype.lastIndexOf` method implementation
        // https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
        module.exports = FORCED ? function lastIndexOf(searchElement        /* , fromIndex = @[*-1] */
        ) {
          // convert -0 to +0
          if (NEGATIVE_ZERO) return nativeLastIndexOf.apply(this, arguments) || 0;
          var O = toIndexedObject(this);
          var length = toLength(O.length);
          var index = length - 1;
          if (arguments.length > 1) index = min(index, toInteger(arguments[1]));
          if (index < 0) index = length + index;
          for (; index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
          return - 1;
        }
         : nativeLastIndexOf;
      },
      {
        '../internals/array-method-is-strict': 17,
        '../internals/array-method-uses-to-length': 18,
        '../internals/to-indexed-object': 113,
        '../internals/to-integer': 114,
        '../internals/to-length': 115
      }
    ],
    16: [
      function (_dereq_, module, exports) {
        var fails = _dereq_('../internals/fails');
        var wellKnownSymbol = _dereq_('../internals/well-known-symbol');
        var V8_VERSION = _dereq_('../internals/engine-v8-version');
        var SPECIES = wellKnownSymbol('species');
        module.exports = function (METHOD_NAME) {
          // We can't use this feature detection in V8 since it causes
          // deoptimization and serious performance degradation
          // https://github.com/zloirock/core-js/issues/677
          return V8_VERSION >= 51 || !fails(function () {
            var array = [
            ];
            var constructor = array.constructor = {
            };
            constructor[SPECIES] = function () {
              return {
                foo: 1
              };
            };
            return array[METHOD_NAME](Boolean).foo !== 1;
          });
        };
      },
      {
        '../internals/engine-v8-version': 40,
        '../internals/fails': 43,
        '../internals/well-known-symbol': 127
      }
    ],
    17: [
      function (_dereq_, module, exports) {
        'use strict';
        var fails = _dereq_('../internals/fails');
        module.exports = function (METHOD_NAME, argument) {
          var method = [
          ][METHOD_NAME];
          return !!method && fails(function () {
            // eslint-disable-next-line no-useless-call,no-throw-literal
            method.call(null, argument || function () {
              throw 1;
            }, 1);
          });
        };
      },
      {
        '../internals/fails': 43
      }
    ],
    18: [
      function (_dereq_, module, exports) {
        var DESCRIPTORS = _dereq_('../internals/descriptors');
        var fails = _dereq_('../internals/fails');
        var has = _dereq_('../internals/has');
        var defineProperty = Object.defineProperty;
        var cache = {
        };
        var thrower = function (it) {
          throw it;
        };
        module.exports = function (METHOD_NAME, options) {
          if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
          if (!options) options = {
          };
          var method = [
          ][METHOD_NAME];
          var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
          var argument0 = has(options, 0) ? options[0] : thrower;
          var argument1 = has(options, 1) ? options[1] : undefined;
          return cache[METHOD_NAME] = !!method && !fails(function () {
            if (ACCESSORS && !DESCRIPTORS) return true;
            var O = {
              length: - 1
            };
            if (ACCESSORS) defineProperty(O, 1, {
              enumerable: true,
              get: thrower
            });
             else O[1] = 1;
            method.call(O, argument0, argument1);
          });
        };
      },
      {
        '../internals/descriptors': 35,
        '../internals/fails': 43,
        '../internals/has': 51
      }
    ],
    19: [
      function (_dereq_, module, exports) {
        var aFunction = _dereq_('../internals/a-function');
        var toObject = _dereq_('../internals/to-object');
        var IndexedObject = _dereq_('../internals/indexed-object');
        var toLength = _dereq_('../internals/to-length'); // `Array.prototype.{ reduce, reduceRight }` methods implementation
        var createMethod = function (IS_RIGHT) {
          return function (that, callbackfn, argumentsLength, memo) {
            aFunction(callbackfn);
            var O = toObject(that);
            var self = IndexedObject(O);
            var length = toLength(O.length);
            var index = IS_RIGHT ? length - 1 : 0;
            var i = IS_RIGHT ? - 1 : 1;
            if (argumentsLength < 2) while (true) {
              if (index in self) {
                memo = self[index];
                index += i;
                break;
              }
              index += i;
              if (IS_RIGHT ? index < 0 : length <= index) {
                throw TypeError('Reduce of empty array with no initial value');
              }
            }
            for (; IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
              memo = callbackfn(memo, self[index], index, O);
            }
            return memo;
          };
        };
        module.exports = {
          // `Array.prototype.reduce` method
          // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
          left: createMethod(false),
          // `Array.prototype.reduceRight` method
          // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
          right: createMethod(true)
        };
      },
      {
        '../internals/a-function': 1,
        '../internals/indexed-object': 57,
        '../internals/to-length': 115,
        '../internals/to-object': 116
      }
    ],
    20: [
      function (_dereq_, module, exports) {
        var isObject = _dereq_('../internals/is-object');
        var isArray = _dereq_('../internals/is-array');
        var wellKnownSymbol = _dereq_('../internals/well-known-symbol');
        var SPECIES = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
        // https://tc39.github.io/ecma262/#sec-arrayspeciescreate
        module.exports = function (originalArray, length) {
          var C;
          if (isArray(originalArray)) {
            C = originalArray.constructor; // cross-realm fallback
            if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
             else if (isObject(C)) {
              C = C[SPECIES];
              if (C === null) C = undefined;
            }
          }
          return new (C === undefined ? Array : C) (length === 0 ? 0 : length);
        };
      },
      {
        '../internals/is-array': 63,
        '../internals/is-object': 65,
        '../internals/well-known-symbol': 127
      }
    ],
    21: [
      function (_dereq_, module, exports) {
        var anObject = _dereq_('../internals/an-object'); // call something on iterator step with safe closing on error
        module.exports = function (iterator, fn, value, ENTRIES) {
          try {
            return ENTRIES ? fn(anObject(value) [0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
          } catch (error) {
            var returnMethod = iterator['return'];
            if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
            throw error;
          }
        };
      },
      {
        '../internals/an-object': 6
      }
    ],
    22: [
      function (_dereq_, module, exports) {
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
            var object = {
            };
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
      },
      {
        '../internals/well-known-symbol': 127
      }
    ],
    23: [
      function (_dereq_, module, exports) {
        var toString = {
        }.toString;
        module.exports = function (it) {
          return toString.call(it).slice(8, - 1);
        };
      },
      {
      }
    ],
    24: [
      function (_dereq_, module, exports) {
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
          var O,
          tag,
          result;
          return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
           : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
           : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
           : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
        };
      },
      {
        '../internals/classof-raw': 23,
        '../internals/to-string-tag-support': 120,
        '../internals/well-known-symbol': 127
      }
    ],
    25: [
      function (_dereq_, module, exports) {
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
          this.entries = [
          ];
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
            if (entry) entry[1] = value;
             else this.entries.push([key,
            value]);
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
              if (data === true) uncaughtFrozenStore(state).set(key, value);
               else data[state.id] = value;
              return that;
            };
            redefineAll(C.prototype, {
              // 23.3.3.2 WeakMap.prototype.delete(key)
              // 23.4.3.3 WeakSet.prototype.delete(value)
              'delete': function (key) {
                var state = getInternalState(this);
                if (!isObject(key)) return false;
                var data = getWeakData(key);
                if (data === true) return uncaughtFrozenStore(state) ['delete'](key);
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
            }
             : {
              // 23.4.3.1 WeakSet.prototype.add(value)
              add: function add(value) {
                return define(this, value, true);
              }
            });
            return C;
          }
        };
      },
      {
        '../internals/an-instance': 5,
        '../internals/an-object': 6,
        '../internals/array-iteration': 14,
        '../internals/has': 51,
        '../internals/internal-metadata': 60,
        '../internals/internal-state': 61,
        '../internals/is-object': 65,
        '../internals/iterate': 68,
        '../internals/redefine-all': 93
      }
    ],
    26: [
      function (_dereq_, module, exports) {
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
          var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== - 1;
          var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== - 1;
          var ADDER = IS_MAP ? 'set' : 'add';
          var NativeConstructor = global[CONSTRUCTOR_NAME];
          var NativePrototype = NativeConstructor && NativeConstructor.prototype;
          var Constructor = NativeConstructor;
          var exported = {
          };
          var fixMethod = function (KEY) {
            var nativeMethod = NativePrototype[KEY];
            redefine(NativePrototype, KEY, KEY == 'add' ? function add(value) {
              nativeMethod.call(this, value === 0 ? 0 : value);
              return this;
            }
             : KEY == 'delete' ? function (key) {
              return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
            }
             : KEY == 'get' ? function get(key) {
              return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
            }
             : KEY == 'has' ? function has(key) {
              return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
            }
             : function set(key, value) {
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
            var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {
            }
             : - 0, 1) != instance; // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
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
              return !$instance.has( - 0);
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
      },
      {
        '../internals/an-instance': 5,
        '../internals/check-correctness-of-iteration': 22,
        '../internals/export': 42,
        '../internals/fails': 43,
        '../internals/global': 50,
        '../internals/inherit-if-required': 58,
        '../internals/internal-metadata': 60,
        '../internals/is-forced': 64,
        '../internals/is-object': 65,
        '../internals/iterate': 68,
        '../internals/redefine': 94,
        '../internals/set-to-string-tag': 102
      }
    ],
    27: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/has': 51,
        '../internals/object-define-property': 78,
        '../internals/object-get-own-property-descriptor': 79,
        '../internals/own-keys': 89
      }
    ],
    28: [
      function (_dereq_, module, exports) {
        var fails = _dereq_('../internals/fails');
        module.exports = !fails(function () {
          function F() {
            /* empty */
          }
          F.prototype.constructor = null;
          return Object.getPrototypeOf(new F()) !== F.prototype;
        });
      },
      {
        '../internals/fails': 43
      }
    ],
    29: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/create-property-descriptor': 31,
        '../internals/iterators': 70,
        '../internals/iterators-core': 69,
        '../internals/object-create': 76,
        '../internals/set-to-string-tag': 102
      }
    ],
    30: [
      function (_dereq_, module, exports) {
        var DESCRIPTORS = _dereq_('../internals/descriptors');
        var definePropertyModule = _dereq_('../internals/object-define-property');
        var createPropertyDescriptor = _dereq_('../internals/create-property-descriptor');
        module.exports = DESCRIPTORS ? function (object, key, value) {
          return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
        }
         : function (object, key, value) {
          object[key] = value;
          return object;
        };
      },
      {
        '../internals/create-property-descriptor': 31,
        '../internals/descriptors': 35,
        '../internals/object-define-property': 78
      }
    ],
    31: [
      function (_dereq_, module, exports) {
        module.exports = function (bitmap, value) {
          return {
            enumerable: !(bitmap & 1),
            configurable: !(bitmap & 2),
            writable: !(bitmap & 4),
            value: value
          };
        };
      },
      {
      }
    ],
    32: [
      function (_dereq_, module, exports) {
        'use strict';
        var toPrimitive = _dereq_('../internals/to-primitive');
        var definePropertyModule = _dereq_('../internals/object-define-property');
        var createPropertyDescriptor = _dereq_('../internals/create-property-descriptor');
        module.exports = function (object, key, value) {
          var propertyKey = toPrimitive(key);
          if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
           else object[propertyKey] = value;
        };
      },
      {
        '../internals/create-property-descriptor': 31,
        '../internals/object-define-property': 78,
        '../internals/to-primitive': 119
      }
    ],
    33: [
      function (_dereq_, module, exports) {
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
          var CurrentIteratorPrototype,
          methods,
          KEY; // fix native
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
      },
      {
        '../internals/create-iterator-constructor': 29,
        '../internals/create-non-enumerable-property': 30,
        '../internals/export': 42,
        '../internals/is-pure': 66,
        '../internals/iterators': 70,
        '../internals/iterators-core': 69,
        '../internals/object-get-prototype-of': 83,
        '../internals/object-set-prototype-of': 87,
        '../internals/redefine': 94,
        '../internals/set-to-string-tag': 102,
        '../internals/well-known-symbol': 127
      }
    ],
    34: [
      function (_dereq_, module, exports) {
        var path = _dereq_('../internals/path');
        var has = _dereq_('../internals/has');
        var wrappedWellKnownSymbolModule = _dereq_('../internals/well-known-symbol-wrapped');
        var defineProperty = _dereq_('../internals/object-define-property').f;
        module.exports = function (NAME) {
          var Symbol = path.Symbol || (path.Symbol = {
          });
          if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
            value: wrappedWellKnownSymbolModule.f(NAME)
          });
        };
      },
      {
        '../internals/has': 51,
        '../internals/object-define-property': 78,
        '../internals/path': 90,
        '../internals/well-known-symbol-wrapped': 126
      }
    ],
    35: [
      function (_dereq_, module, exports) {
        var fails = _dereq_('../internals/fails'); // Thank's IE8 for his funny defineProperty
        module.exports = !fails(function () {
          return Object.defineProperty({
          }, 1, {
            get: function () {
              return 7;
            }
          }) [1] != 7;
        });
      },
      {
        '../internals/fails': 43
      }
    ],
    36: [
      function (_dereq_, module, exports) {
        var global = _dereq_('../internals/global');
        var isObject = _dereq_('../internals/is-object');
        var document = global.document; // typeof document.createElement is 'object' in old IE
        var EXISTS = isObject(document) && isObject(document.createElement);
        module.exports = function (it) {
          return EXISTS ? document.createElement(it) : {
          };
        };
      },
      {
        '../internals/global': 50,
        '../internals/is-object': 65
      }
    ],
    37: [
      function (_dereq_, module, exports) {
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
      },
      {
      }
    ],
    38: [
      function (_dereq_, module, exports) {
        var userAgent = _dereq_('../internals/engine-user-agent');
        module.exports = /(iphone|ipod|ipad).*applewebkit/i.test(userAgent);
      },
      {
        '../internals/engine-user-agent': 39
      }
    ],
    39: [
      function (_dereq_, module, exports) {
        var getBuiltIn = _dereq_('../internals/get-built-in');
        module.exports = getBuiltIn('navigator', 'userAgent') || '';
      },
      {
        '../internals/get-built-in': 48
      }
    ],
    40: [
      function (_dereq_, module, exports) {
        var global = _dereq_('../internals/global');
        var userAgent = _dereq_('../internals/engine-user-agent');
        var process = global.process;
        var versions = process && process.versions;
        var v8 = versions && versions.v8;
        var match,
        version;
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
        module.exports = version && + version;
      },
      {
        '../internals/engine-user-agent': 39,
        '../internals/global': 50
      }
    ],
    41: [
      function (_dereq_, module, exports) {
        // IE8- don't enum bug keys
        module.exports = [
          'constructor',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'toLocaleString',
          'toString',
          'valueOf'
        ];
      },
      {
      }
    ],
    42: [
      function (_dereq_, module, exports) {
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
          var FORCED,
          target,
          key,
          targetProperty,
          sourceProperty,
          descriptor;
          if (GLOBAL) {
            target = global;
          } else if (STATIC) {
            target = global[TARGET] || setGlobal(TARGET, {
            });
          } else {
            target = (global[TARGET] || {
            }).prototype;
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
      },
      {
        '../internals/copy-constructor-properties': 27,
        '../internals/create-non-enumerable-property': 30,
        '../internals/global': 50,
        '../internals/is-forced': 64,
        '../internals/object-get-own-property-descriptor': 79,
        '../internals/redefine': 94,
        '../internals/set-global': 100
      }
    ],
    43: [
      function (_dereq_, module, exports) {
        module.exports = function (exec) {
          try {
            return !!exec();
          } catch (error) {
            return true;
          }
        };
      },
      {
      }
    ],
    44: [
      function (_dereq_, module, exports) {
        'use strict'; // TODO: Remove from `core-js@4` since it's moved to entry points
        _dereq_('../modules/es.regexp.exec');
        var redefine = _dereq_('../internals/redefine');
        var fails = _dereq_('../internals/fails');
        var wellKnownSymbol = _dereq_('../internals/well-known-symbol');
        var regexpExec = _dereq_('../internals/regexp-exec');
        var createNonEnumerableProperty = _dereq_('../internals/create-non-enumerable-property');
        var SPECIES = wellKnownSymbol('species');
        var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
          // #replace needs built-in support for named groups.
          // #match works fine because it just return the exec results, even if it has
          // a "grops" property.
          var re = /./;
          re.exec = function () {
            var result = [
            ];
            result.groups = {
              a: '7'
            };
            return result;
          };
          return ''.replace(re, '$<a>') !== '7';
        }); // IE <= 11 replaces $0 with the whole match, as if it was $&
        // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
        var REPLACE_KEEPS_$0 = function () {
          return 'a'.replace(/./, '$0') === '$0';
        }();
        var REPLACE = wellKnownSymbol('replace'); // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
        var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function () {
          if (/./[REPLACE]) {
            return /./[REPLACE]('a', '$0') === '';
          }
          return false;
        }(); // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
        // Weex JS has frozen built-in prototypes, so use try / catch wrapper
        var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
          var re = /(?:)/;
          var originalExec = re.exec;
          re.exec = function () {
            return originalExec.apply(this, arguments);
          };
          var result = 'ab'.split(re);
          return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
        });
        module.exports = function (KEY, length, exec, sham) {
          var SYMBOL = wellKnownSymbol(KEY);
          var DELEGATES_TO_SYMBOL = !fails(function () {
            // String methods call symbol-named RegEp methods
            var O = {
            };
            O[SYMBOL] = function () {
              return 7;
            };
            return ''[KEY](O) != 7;
          });
          var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
            // Symbol-named RegExp methods call .exec
            var execCalled = false;
            var re = /a/;
            if (KEY === 'split') {
              // We can't use real regex here since it causes deoptimization
              // and serious performance degradation in V8
              // https://github.com/zloirock/core-js/issues/306
              re = {
              }; // RegExp[@@split] doesn't call the regex's exec method, but first creates
              // a new one. We need to return the patched regex when creating the new one.
              re.constructor = {
              };
              re.constructor[SPECIES] = function () {
                return re;
              };
              re.flags = '';
              re[SYMBOL] = /./[SYMBOL];
            }
            re.exec = function () {
              execCalled = true;
              return null;
            };
            re[SYMBOL]('');
            return !execCalled;
          });
          if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0 && !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE) || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
            var nativeRegExpMethod = /./[SYMBOL];
            var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
              if (regexp.exec === regexpExec) {
                if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
                  // The native String method already delegates to @@method (this
                  // polyfilled function), leasing to infinite recursion.
                  // We avoid it by directly calling the native @@method method.
                  return {
                    done: true,
                    value: nativeRegExpMethod.call(regexp, str, arg2)
                  };
                }
                return {
                  done: true,
                  value: nativeMethod.call(str, regexp, arg2)
                };
              }
              return {
                done: false
              };
            }, {
              REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
              REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
            });
            var stringMethod = methods[0];
            var regexMethod = methods[1];
            redefine(String.prototype, KEY, stringMethod);
            redefine(RegExp.prototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
            // 21.2.5.11 RegExp.prototype[@@split](string, limit)
            ? function (string, arg) {
              return regexMethod.call(string, this, arg);
            } // 21.2.5.6 RegExp.prototype[@@match](string)
            // 21.2.5.9 RegExp.prototype[@@search](string)

             : function (string) {
              return regexMethod.call(string, this);
            });
          }
          if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
        };
      },
      {
        '../internals/create-non-enumerable-property': 30,
        '../internals/fails': 43,
        '../internals/redefine': 94,
        '../internals/regexp-exec': 96,
        '../internals/well-known-symbol': 127,
        '../modules/es.regexp.exec': 144
      }
    ],
    45: [
      function (_dereq_, module, exports) {
        var fails = _dereq_('../internals/fails');
        module.exports = !fails(function () {
          return Object.isExtensible(Object.preventExtensions({
          }));
        });
      },
      {
        '../internals/fails': 43
      }
    ],
    46: [
      function (_dereq_, module, exports) {
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
          return function ()          /* ...args */
          {
            return fn.apply(that, arguments);
          };
        };
      },
      {
        '../internals/a-function': 1
      }
    ],
    47: [
      function (_dereq_, module, exports) {
        'use strict';
        var aFunction = _dereq_('../internals/a-function');
        var isObject = _dereq_('../internals/is-object');
        var slice = [
        ].slice;
        var factories = {
        };
        var construct = function (C, argsLength, args) {
          if (!(argsLength in factories)) {
            for (var list = [
            ], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']'; // eslint-disable-next-line no-new-func
            factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
          }
          return factories[argsLength](C, args);
        }; // `Function.prototype.bind` method implementation
        // https://tc39.github.io/ecma262/#sec-function.prototype.bind
        module.exports = Function.bind || function bind(that        /* , ...args */
        ) {
          var fn = aFunction(this);
          var partArgs = slice.call(arguments, 1);
          var boundFunction = function bound()          /* args... */
          {
            var args = partArgs.concat(slice.call(arguments));
            return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
          };
          if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
          return boundFunction;
        };
      },
      {
        '../internals/a-function': 1,
        '../internals/is-object': 65
      }
    ],
    48: [
      function (_dereq_, module, exports) {
        var path = _dereq_('../internals/path');
        var global = _dereq_('../internals/global');
        var aFunction = function (variable) {
          return typeof variable == 'function' ? variable : undefined;
        };
        module.exports = function (namespace, method) {
          return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace]) : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
        };
      },
      {
        '../internals/global': 50,
        '../internals/path': 90
      }
    ],
    49: [
      function (_dereq_, module, exports) {
        var classof = _dereq_('../internals/classof');
        var Iterators = _dereq_('../internals/iterators');
        var wellKnownSymbol = _dereq_('../internals/well-known-symbol');
        var ITERATOR = wellKnownSymbol('iterator');
        module.exports = function (it) {
          if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
        };
      },
      {
        '../internals/classof': 24,
        '../internals/iterators': 70,
        '../internals/well-known-symbol': 127
      }
    ],
    50: [
      function (_dereq_, module, exports) {
        (function (global) {
          var check = function (it) {
            return it && it.Math == Math && it;
          }; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
          module.exports = // eslint-disable-next-line no-undef
          check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof global == 'object' && global) || // eslint-disable-next-line no-new-func
          Function('return this') ();
        }).call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {
        })
      },
      {
      }
    ],
    51: [
      function (_dereq_, module, exports) {
        var hasOwnProperty = {
        }.hasOwnProperty;
        module.exports = function (it, key) {
          return hasOwnProperty.call(it, key);
        };
      },
      {
      }
    ],
    52: [
      function (_dereq_, module, exports) {
        module.exports = {
        };
      },
      {
      }
    ],
    53: [
      function (_dereq_, module, exports) {
        var global = _dereq_('../internals/global');
        module.exports = function (a, b) {
          var console = global.console;
          if (console && console.error) {
            arguments.length === 1 ? console.error(a) : console.error(a, b);
          }
        };
      },
      {
        '../internals/global': 50
      }
    ],
    54: [
      function (_dereq_, module, exports) {
        var getBuiltIn = _dereq_('../internals/get-built-in');
        module.exports = getBuiltIn('document', 'documentElement');
      },
      {
        '../internals/get-built-in': 48
      }
    ],
    55: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/descriptors': 35,
        '../internals/document-create-element': 36,
        '../internals/fails': 43
      }
    ],
    56: [
      function (_dereq_, module, exports) {
        // IEEE754 conversions based on https://github.com/feross/ieee754
        // eslint-disable-next-line no-shadow-restricted-names
        var Infinity = 1 / 0;
        var abs = Math.abs;
        var pow = Math.pow;
        var floor = Math.floor;
        var log = Math.log;
        var LN2 = Math.LN2;
        var pack = function (number, mantissaLength, bytes) {
          var buffer = new Array(bytes);
          var exponentLength = bytes * 8 - mantissaLength - 1;
          var eMax = (1 << exponentLength) - 1;
          var eBias = eMax >> 1;
          var rt = mantissaLength === 23 ? pow(2, - 24) - pow(2, - 77) : 0;
          var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
          var index = 0;
          var exponent,
          mantissa,
          c;
          number = abs(number); // eslint-disable-next-line no-self-compare
          if (number != number || number === Infinity) {
            // eslint-disable-next-line no-self-compare
            mantissa = number != number ? 1 : 0;
            exponent = eMax;
          } else {
            exponent = floor(log(number) / LN2);
            if (number * (c = pow(2, - exponent)) < 1) {
              exponent--;
              c *= 2;
            }
            if (exponent + eBias >= 1) {
              number += rt / c;
            } else {
              number += rt * pow(2, 1 - eBias);
            }
            if (number * c >= 2) {
              exponent++;
              c /= 2;
            }
            if (exponent + eBias >= eMax) {
              mantissa = 0;
              exponent = eMax;
            } else if (exponent + eBias >= 1) {
              mantissa = (number * c - 1) * pow(2, mantissaLength);
              exponent = exponent + eBias;
            } else {
              mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
              exponent = 0;
            }
          }
          for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
          exponent = exponent << mantissaLength | mantissa;
          exponentLength += mantissaLength;
          for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
          buffer[--index] |= sign * 128;
          return buffer;
        };
        var unpack = function (buffer, mantissaLength) {
          var bytes = buffer.length;
          var exponentLength = bytes * 8 - mantissaLength - 1;
          var eMax = (1 << exponentLength) - 1;
          var eBias = eMax >> 1;
          var nBits = exponentLength - 7;
          var index = bytes - 1;
          var sign = buffer[index--];
          var exponent = sign & 127;
          var mantissa;
          sign >>= 7;
          for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
          mantissa = exponent & (1 << - nBits) - 1;
          exponent >>= - nBits;
          nBits += mantissaLength;
          for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
          if (exponent === 0) {
            exponent = 1 - eBias;
          } else if (exponent === eMax) {
            return mantissa ? NaN : sign ? - Infinity : Infinity;
          } else {
            mantissa = mantissa + pow(2, mantissaLength);
            exponent = exponent - eBias;
          }
          return (sign ? - 1 : 1) * mantissa * pow(2, exponent - mantissaLength);
        };
        module.exports = {
          pack: pack,
          unpack: unpack
        };
      },
      {
      }
    ],
    57: [
      function (_dereq_, module, exports) {
        var fails = _dereq_('../internals/fails');
        var classof = _dereq_('../internals/classof-raw');
        var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings
        module.exports = fails(function () {
          // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
          // eslint-disable-next-line no-prototype-builtins
          return !Object('z').propertyIsEnumerable(0);
        }) ? function (it) {
          return classof(it) == 'String' ? split.call(it, '') : Object(it);
        }
         : Object;
      },
      {
        '../internals/classof-raw': 23,
        '../internals/fails': 43
      }
    ],
    58: [
      function (_dereq_, module, exports) {
        var isObject = _dereq_('../internals/is-object');
        var setPrototypeOf = _dereq_('../internals/object-set-prototype-of'); // makes subclassing work correct for wrapped built-ins
        module.exports = function ($this, dummy, Wrapper) {
          var NewTarget,
          NewTargetPrototype;
          if ( // it can work only with native `setPrototypeOf`
          setPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
          typeof (NewTarget = dummy.constructor) == 'function' && NewTarget !== Wrapper && isObject(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) setPrototypeOf($this, NewTargetPrototype);
          return $this;
        };
      },
      {
        '../internals/is-object': 65,
        '../internals/object-set-prototype-of': 87
      }
    ],
    59: [
      function (_dereq_, module, exports) {
        var store = _dereq_('../internals/shared-store');
        var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
        if (typeof store.inspectSource != 'function') {
          store.inspectSource = function (it) {
            return functionToString.call(it);
          };
        }
        module.exports = store.inspectSource;
      },
      {
        '../internals/shared-store': 104
      }
    ],
    60: [
      function (_dereq_, module, exports) {
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
              weakData: {
              } // weak collections IDs

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
      },
      {
        '../internals/freezing': 45,
        '../internals/has': 51,
        '../internals/hidden-keys': 52,
        '../internals/is-object': 65,
        '../internals/object-define-property': 78,
        '../internals/uid': 124
      }
    ],
    61: [
      function (_dereq_, module, exports) {
        var NATIVE_WEAK_MAP = _dereq_('../internals/native-weak-map');
        var global = _dereq_('../internals/global');
        var isObject = _dereq_('../internals/is-object');
        var createNonEnumerableProperty = _dereq_('../internals/create-non-enumerable-property');
        var objectHas = _dereq_('../internals/has');
        var sharedKey = _dereq_('../internals/shared-key');
        var hiddenKeys = _dereq_('../internals/hidden-keys');
        var WeakMap = global.WeakMap;
        var set,
        get,
        has;
        var enforce = function (it) {
          return has(it) ? get(it) : set(it, {
          });
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
            return wmget.call(store, it) || {
            };
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
            return objectHas(it, STATE) ? it[STATE] : {
            };
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
      },
      {
        '../internals/create-non-enumerable-property': 30,
        '../internals/global': 50,
        '../internals/has': 51,
        '../internals/hidden-keys': 52,
        '../internals/is-object': 65,
        '../internals/native-weak-map': 74,
        '../internals/shared-key': 103
      }
    ],
    62: [
      function (_dereq_, module, exports) {
        var wellKnownSymbol = _dereq_('../internals/well-known-symbol');
        var Iterators = _dereq_('../internals/iterators');
        var ITERATOR = wellKnownSymbol('iterator');
        var ArrayPrototype = Array.prototype; // check on default Array iterator
        module.exports = function (it) {
          return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
        };
      },
      {
        '../internals/iterators': 70,
        '../internals/well-known-symbol': 127
      }
    ],
    63: [
      function (_dereq_, module, exports) {
        var classof = _dereq_('../internals/classof-raw'); // `IsArray` abstract operation
        // https://tc39.github.io/ecma262/#sec-isarray
        module.exports = Array.isArray || function isArray(arg) {
          return classof(arg) == 'Array';
        };
      },
      {
        '../internals/classof-raw': 23
      }
    ],
    64: [
      function (_dereq_, module, exports) {
        var fails = _dereq_('../internals/fails');
        var replacement = /#|\.prototype\./;
        var isForced = function (feature, detection) {
          var value = data[normalize(feature)];
          return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
        };
        var normalize = isForced.normalize = function (string) {
          return String(string).replace(replacement, '.').toLowerCase();
        };
        var data = isForced.data = {
        };
        var NATIVE = isForced.NATIVE = 'N';
        var POLYFILL = isForced.POLYFILL = 'P';
        module.exports = isForced;
      },
      {
        '../internals/fails': 43
      }
    ],
    65: [
      function (_dereq_, module, exports) {
        module.exports = function (it) {
          return typeof it === 'object' ? it !== null : typeof it === 'function';
        };
      },
      {
      }
    ],
    66: [
      function (_dereq_, module, exports) {
        module.exports = false;
      },
      {
      }
    ],
    67: [
      function (_dereq_, module, exports) {
        var isObject = _dereq_('../internals/is-object');
        var classof = _dereq_('../internals/classof-raw');
        var wellKnownSymbol = _dereq_('../internals/well-known-symbol');
        var MATCH = wellKnownSymbol('match'); // `IsRegExp` abstract operation
        // https://tc39.github.io/ecma262/#sec-isregexp
        module.exports = function (it) {
          var isRegExp;
          return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
        };
      },
      {
        '../internals/classof-raw': 23,
        '../internals/is-object': 65,
        '../internals/well-known-symbol': 127
      }
    ],
    68: [
      function (_dereq_, module, exports) {
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
          var iterator,
          iterFn,
          index,
          length,
          result,
          next,
          step;
          if (IS_ITERATOR) {
            iterator = iterable;
          } else {
            iterFn = getIteratorMethod(iterable);
            if (typeof iterFn != 'function') throw TypeError('Target is not iterable'); // optimisation for array iterators
            if (isArrayIteratorMethod(iterFn)) {
              for (index = 0, length = toLength(iterable.length); length > index; index++) {
                result = AS_ENTRIES ? boundFunction(anObject(step = iterable[index]) [0], step[1]) : boundFunction(iterable[index]);
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
      },
      {
        '../internals/an-object': 6,
        '../internals/call-with-safe-iteration-closing': 21,
        '../internals/function-bind-context': 46,
        '../internals/get-iterator-method': 49,
        '../internals/is-array-iterator-method': 62,
        '../internals/to-length': 115
      }
    ],
    69: [
      function (_dereq_, module, exports) {
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
        var IteratorPrototype,
        PrototypeOfArrayIteratorPrototype,
        arrayIterator;
        if ([].keys) {
          arrayIterator = [
          ].keys(); // Safari 8 has buggy iterators w/o `next`
          if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
           else {
            PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
            if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
          }
        }
        if (IteratorPrototype == undefined) IteratorPrototype = {
        }; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
        if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
          createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
        }
        module.exports = {
          IteratorPrototype: IteratorPrototype,
          BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
        };
      },
      {
        '../internals/create-non-enumerable-property': 30,
        '../internals/has': 51,
        '../internals/is-pure': 66,
        '../internals/object-get-prototype-of': 83,
        '../internals/well-known-symbol': 127
      }
    ],
    70: [
      function (_dereq_, module, exports) {
        module.exports = {
        };
      },
      {
      }
    ],
    71: [
      function (_dereq_, module, exports) {
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
        var flush,
        head,
        last,
        notify,
        toggle,
        node,
        promise,
        then; // modern engines have queueMicrotask method
        if (!queueMicrotask) {
          flush = function () {
            var parent,
            fn;
            if (IS_NODE && (parent = process.domain)) parent.exit();
            while (head) {
              fn = head.fn;
              head = head.next;
              try {
                fn();
              } catch (error) {
                if (head) notify();
                 else last = undefined;
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
      },
      {
        '../internals/classof-raw': 23,
        '../internals/engine-is-ios': 38,
        '../internals/global': 50,
        '../internals/object-get-own-property-descriptor': 79,
        '../internals/task': 110
      }
    ],
    72: [
      function (_dereq_, module, exports) {
        var global = _dereq_('../internals/global');
        module.exports = global.Promise;
      },
      {
        '../internals/global': 50
      }
    ],
    73: [
      function (_dereq_, module, exports) {
        var fails = _dereq_('../internals/fails');
        module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
          // Chrome 38 Symbol has incorrect toString conversion
          // eslint-disable-next-line no-undef
          return !String(Symbol());
        });
      },
      {
        '../internals/fails': 43
      }
    ],
    74: [
      function (_dereq_, module, exports) {
        var global = _dereq_('../internals/global');
        var inspectSource = _dereq_('../internals/inspect-source');
        var WeakMap = global.WeakMap;
        module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));
      },
      {
        '../internals/global': 50,
        '../internals/inspect-source': 59
      }
    ],
    75: [
      function (_dereq_, module, exports) {
        'use strict';
        var aFunction = _dereq_('../internals/a-function');
        var PromiseCapability = function (C) {
          var resolve,
          reject;
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
      },
      {
        '../internals/a-function': 1
      }
    ],
    76: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/an-object': 6,
        '../internals/document-create-element': 36,
        '../internals/enum-bug-keys': 41,
        '../internals/hidden-keys': 52,
        '../internals/html': 54,
        '../internals/object-define-properties': 77,
        '../internals/shared-key': 103
      }
    ],
    77: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/an-object': 6,
        '../internals/descriptors': 35,
        '../internals/object-define-property': 78,
        '../internals/object-keys': 85
      }
    ],
    78: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/an-object': 6,
        '../internals/descriptors': 35,
        '../internals/ie8-dom-define': 55,
        '../internals/to-primitive': 119
      }
    ],
    79: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/create-property-descriptor': 31,
        '../internals/descriptors': 35,
        '../internals/has': 51,
        '../internals/ie8-dom-define': 55,
        '../internals/object-property-is-enumerable': 86,
        '../internals/to-indexed-object': 113,
        '../internals/to-primitive': 119
      }
    ],
    80: [
      function (_dereq_, module, exports) {
        var toIndexedObject = _dereq_('../internals/to-indexed-object');
        var nativeGetOwnPropertyNames = _dereq_('../internals/object-get-own-property-names').f;
        var toString = {
        }.toString;
        var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [
        ];
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
      },
      {
        '../internals/object-get-own-property-names': 81,
        '../internals/to-indexed-object': 113
      }
    ],
    81: [
      function (_dereq_, module, exports) {
        var internalObjectKeys = _dereq_('../internals/object-keys-internal');
        var enumBugKeys = _dereq_('../internals/enum-bug-keys');
        var hiddenKeys = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
        // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
        exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
          return internalObjectKeys(O, hiddenKeys);
        };
      },
      {
        '../internals/enum-bug-keys': 41,
        '../internals/object-keys-internal': 84
      }
    ],
    82: [
      function (_dereq_, module, exports) {
        exports.f = Object.getOwnPropertySymbols;
      },
      {
      }
    ],
    83: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/correct-prototype-getter': 28,
        '../internals/has': 51,
        '../internals/shared-key': 103,
        '../internals/to-object': 116
      }
    ],
    84: [
      function (_dereq_, module, exports) {
        var has = _dereq_('../internals/has');
        var toIndexedObject = _dereq_('../internals/to-indexed-object');
        var indexOf = _dereq_('../internals/array-includes').indexOf;
        var hiddenKeys = _dereq_('../internals/hidden-keys');
        module.exports = function (object, names) {
          var O = toIndexedObject(object);
          var i = 0;
          var result = [
          ];
          var key;
          for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key); // Don't enum bug & hidden keys
          while (names.length > i) if (has(O, key = names[i++])) {
            ~indexOf(result, key) || result.push(key);
          }
          return result;
        };
      },
      {
        '../internals/array-includes': 13,
        '../internals/has': 51,
        '../internals/hidden-keys': 52,
        '../internals/to-indexed-object': 113
      }
    ],
    85: [
      function (_dereq_, module, exports) {
        var internalObjectKeys = _dereq_('../internals/object-keys-internal');
        var enumBugKeys = _dereq_('../internals/enum-bug-keys'); // `Object.keys` method
        // https://tc39.github.io/ecma262/#sec-object.keys
        module.exports = Object.keys || function keys(O) {
          return internalObjectKeys(O, enumBugKeys);
        };
      },
      {
        '../internals/enum-bug-keys': 41,
        '../internals/object-keys-internal': 84
      }
    ],
    86: [
      function (_dereq_, module, exports) {
        'use strict';
        var nativePropertyIsEnumerable = {
        }.propertyIsEnumerable;
        var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug
        var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
          1: 2
        }, 1); // `Object.prototype.propertyIsEnumerable` method implementation
        // https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
        exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
          var descriptor = getOwnPropertyDescriptor(this, V);
          return !!descriptor && descriptor.enumerable;
        }
         : nativePropertyIsEnumerable;
      },
      {
      }
    ],
    87: [
      function (_dereq_, module, exports) {
        var anObject = _dereq_('../internals/an-object');
        var aPossiblePrototype = _dereq_('../internals/a-possible-prototype'); // `Object.setPrototypeOf` method
        // https://tc39.github.io/ecma262/#sec-object.setprototypeof
        // Works with __proto__ only. Old v8 can't work with null proto objects.
        /* eslint-disable no-proto */
        module.exports = Object.setPrototypeOf || ('__proto__' in {
        }
        ? function () {
          var CORRECT_SETTER = false;
          var test = {
          };
          var setter;
          try {
            setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
            setter.call(test, [
            ]);
            CORRECT_SETTER = test instanceof Array;
          } catch (error) {
            /* empty */
          }
          return function setPrototypeOf(O, proto) {
            anObject(O);
            aPossiblePrototype(proto);
            if (CORRECT_SETTER) setter.call(O, proto);
             else O.__proto__ = proto;
            return O;
          };
        }() : undefined);
      },
      {
        '../internals/a-possible-prototype': 2,
        '../internals/an-object': 6
      }
    ],
    88: [
      function (_dereq_, module, exports) {
        'use strict';
        var TO_STRING_TAG_SUPPORT = _dereq_('../internals/to-string-tag-support');
        var classof = _dereq_('../internals/classof'); // `Object.prototype.toString` method implementation
        // https://tc39.github.io/ecma262/#sec-object.prototype.tostring
        module.exports = TO_STRING_TAG_SUPPORT ? {
        }.toString : function toString() {
          return '[object ' + classof(this) + ']';
        };
      },
      {
        '../internals/classof': 24,
        '../internals/to-string-tag-support': 120
      }
    ],
    89: [
      function (_dereq_, module, exports) {
        var getBuiltIn = _dereq_('../internals/get-built-in');
        var getOwnPropertyNamesModule = _dereq_('../internals/object-get-own-property-names');
        var getOwnPropertySymbolsModule = _dereq_('../internals/object-get-own-property-symbols');
        var anObject = _dereq_('../internals/an-object'); // all object keys, includes non-enumerable and symbols
        module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
          var keys = getOwnPropertyNamesModule.f(anObject(it));
          var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
          return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
        };
      },
      {
        '../internals/an-object': 6,
        '../internals/get-built-in': 48,
        '../internals/object-get-own-property-names': 81,
        '../internals/object-get-own-property-symbols': 82
      }
    ],
    90: [
      function (_dereq_, module, exports) {
        var global = _dereq_('../internals/global');
        module.exports = global;
      },
      {
        '../internals/global': 50
      }
    ],
    91: [
      function (_dereq_, module, exports) {
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
      },
      {
      }
    ],
    92: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/an-object': 6,
        '../internals/is-object': 65,
        '../internals/new-promise-capability': 75
      }
    ],
    93: [
      function (_dereq_, module, exports) {
        var redefine = _dereq_('../internals/redefine');
        module.exports = function (target, src, options) {
          for (var key in src) redefine(target, key, src[key], options);
          return target;
        };
      },
      {
        '../internals/redefine': 94
      }
    ],
    94: [
      function (_dereq_, module, exports) {
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
            if (simple) O[key] = value;
             else setGlobal(key, value);
            return;
          } else if (!unsafe) {
            delete O[key];
          } else if (!noTargetGet && O[key]) {
            simple = true;
          }
          if (simple) O[key] = value;
           else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
        }) (Function.prototype, 'toString', function toString() {
          return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
        });
      },
      {
        '../internals/create-non-enumerable-property': 30,
        '../internals/global': 50,
        '../internals/has': 51,
        '../internals/inspect-source': 59,
        '../internals/internal-state': 61,
        '../internals/set-global': 100
      }
    ],
    95: [
      function (_dereq_, module, exports) {
        var classof = _dereq_('./classof-raw');
        var regexpExec = _dereq_('./regexp-exec'); // `RegExpExec` abstract operation
        // https://tc39.github.io/ecma262/#sec-regexpexec
        module.exports = function (R, S) {
          var exec = R.exec;
          if (typeof exec === 'function') {
            var result = exec.call(R, S);
            if (typeof result !== 'object') {
              throw TypeError('RegExp exec method returned something other than an Object or null');
            }
            return result;
          }
          if (classof(R) !== 'RegExp') {
            throw TypeError('RegExp#exec called on incompatible receiver');
          }
          return regexpExec.call(R, S);
        };
      },
      {
        './classof-raw': 23,
        './regexp-exec': 96
      }
    ],
    96: [
      function (_dereq_, module, exports) {
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
        var NPCG_INCLUDED = /()??/.exec('') [1] !== undefined;
        var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;
        if (PATCH) {
          patchedExec = function exec(str) {
            var re = this;
            var lastIndex,
            reCopy,
            match,
            i;
            var sticky = UNSUPPORTED_Y && re.sticky;
            var flags = regexpFlags.call(re);
            var source = re.source;
            var charsAdded = 0;
            var strCopy = str;
            if (sticky) {
              flags = flags.replace('y', '');
              if (flags.indexOf('g') === - 1) {
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
      },
      {
        './regexp-flags': 97,
        './regexp-sticky-helpers': 98
      }
    ],
    97: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/an-object': 6
      }
    ],
    98: [
      function (_dereq_, module, exports) {
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
      },
      {
        './fails': 43
      }
    ],
    99: [
      function (_dereq_, module, exports) {
        // `RequireObjectCoercible` abstract operation
        // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
        module.exports = function (it) {
          if (it == undefined) throw TypeError('Can\'t call method on ' + it);
          return it;
        };
      },
      {
      }
    ],
    100: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/create-non-enumerable-property': 30,
        '../internals/global': 50
      }
    ],
    101: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/descriptors': 35,
        '../internals/get-built-in': 48,
        '../internals/object-define-property': 78,
        '../internals/well-known-symbol': 127
      }
    ],
    102: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/has': 51,
        '../internals/object-define-property': 78,
        '../internals/well-known-symbol': 127
      }
    ],
    103: [
      function (_dereq_, module, exports) {
        var shared = _dereq_('../internals/shared');
        var uid = _dereq_('../internals/uid');
        var keys = shared('keys');
        module.exports = function (key) {
          return keys[key] || (keys[key] = uid(key));
        };
      },
      {
        '../internals/shared': 105,
        '../internals/uid': 124
      }
    ],
    104: [
      function (_dereq_, module, exports) {
        var global = _dereq_('../internals/global');
        var setGlobal = _dereq_('../internals/set-global');
        var SHARED = '__core-js_shared__';
        var store = global[SHARED] || setGlobal(SHARED, {
        });
        module.exports = store;
      },
      {
        '../internals/global': 50,
        '../internals/set-global': 100
      }
    ],
    105: [
      function (_dereq_, module, exports) {
        var IS_PURE = _dereq_('../internals/is-pure');
        var store = _dereq_('../internals/shared-store');
        (module.exports = function (key, value) {
          return store[key] || (store[key] = value !== undefined ? value : {
          });
        }) ('versions', [
        ]).push({
          version: '3.6.5',
          mode: IS_PURE ? 'pure' : 'global',
          copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
        });
      },
      {
        '../internals/is-pure': 66,
        '../internals/shared-store': 104
      }
    ],
    106: [
      function (_dereq_, module, exports) {
        var anObject = _dereq_('../internals/an-object');
        var aFunction = _dereq_('../internals/a-function');
        var wellKnownSymbol = _dereq_('../internals/well-known-symbol');
        var SPECIES = wellKnownSymbol('species'); // `SpeciesConstructor` abstract operation
        // https://tc39.github.io/ecma262/#sec-speciesconstructor
        module.exports = function (O, defaultConstructor) {
          var C = anObject(O).constructor;
          var S;
          return C === undefined || (S = anObject(C) [SPECIES]) == undefined ? defaultConstructor : aFunction(S);
        };
      },
      {
        '../internals/a-function': 1,
        '../internals/an-object': 6,
        '../internals/well-known-symbol': 127
      }
    ],
    107: [
      function (_dereq_, module, exports) {
        var toInteger = _dereq_('../internals/to-integer');
        var requireObjectCoercible = _dereq_('../internals/require-object-coercible'); // `String.prototype.{ codePointAt, at }` methods implementation
        var createMethod = function (CONVERT_TO_STRING) {
          return function ($this, pos) {
            var S = String(requireObjectCoercible($this));
            var position = toInteger(pos);
            var size = S.length;
            var first,
            second;
            if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
            first = S.charCodeAt(position);
            return first < 55296 || first > 56319 || position + 1 === size || (second = S.charCodeAt(position + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
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
      },
      {
        '../internals/require-object-coercible': 99,
        '../internals/to-integer': 114
      }
    ],
    108: [
      function (_dereq_, module, exports) {
        var fails = _dereq_('../internals/fails');
        var whitespaces = _dereq_('../internals/whitespaces');
        var non = '​᠎'; // check that a method works with the correct list
        // of whitespaces and has a correct name
        module.exports = function (METHOD_NAME) {
          return fails(function () {
            return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
          });
        };
      },
      {
        '../internals/fails': 43,
        '../internals/whitespaces': 128
      }
    ],
    109: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/require-object-coercible': 99,
        '../internals/whitespaces': 128
      }
    ],
    110: [
      function (_dereq_, module, exports) {
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
        var queue = {
        };
        var ONREADYSTATECHANGE = 'onreadystatechange';
        var defer,
        channel,
        port;
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
            var args = [
            ];
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
              html.appendChild(createElement('script')) [ONREADYSTATECHANGE] = function () {
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
      },
      {
        '../internals/classof-raw': 23,
        '../internals/document-create-element': 36,
        '../internals/engine-is-ios': 38,
        '../internals/fails': 43,
        '../internals/function-bind-context': 46,
        '../internals/global': 50,
        '../internals/html': 54
      }
    ],
    111: [
      function (_dereq_, module, exports) {
        var toInteger = _dereq_('../internals/to-integer');
        var max = Math.max;
        var min = Math.min; // Helper for a popular repeating case of the spec:
        // Let integer be ? ToInteger(index).
        // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
        module.exports = function (index, length) {
          var integer = toInteger(index);
          return integer < 0 ? max(integer + length, 0) : min(integer, length);
        };
      },
      {
        '../internals/to-integer': 114
      }
    ],
    112: [
      function (_dereq_, module, exports) {
        var toInteger = _dereq_('../internals/to-integer');
        var toLength = _dereq_('../internals/to-length'); // `ToIndex` abstract operation
        // https://tc39.github.io/ecma262/#sec-toindex
        module.exports = function (it) {
          if (it === undefined) return 0;
          var number = toInteger(it);
          var length = toLength(number);
          if (number !== length) throw RangeError('Wrong length or index');
          return length;
        };
      },
      {
        '../internals/to-integer': 114,
        '../internals/to-length': 115
      }
    ],
    113: [
      function (_dereq_, module, exports) {
        // toObject with fallback for non-array-like ES3 strings
        var IndexedObject = _dereq_('../internals/indexed-object');
        var requireObjectCoercible = _dereq_('../internals/require-object-coercible');
        module.exports = function (it) {
          return IndexedObject(requireObjectCoercible(it));
        };
      },
      {
        '../internals/indexed-object': 57,
        '../internals/require-object-coercible': 99
      }
    ],
    114: [
      function (_dereq_, module, exports) {
        var ceil = Math.ceil;
        var floor = Math.floor; // `ToInteger` abstract operation
        // https://tc39.github.io/ecma262/#sec-tointeger
        module.exports = function (argument) {
          return isNaN(argument = + argument) ? 0 : (argument > 0 ? floor : ceil) (argument);
        };
      },
      {
      }
    ],
    115: [
      function (_dereq_, module, exports) {
        var toInteger = _dereq_('../internals/to-integer');
        var min = Math.min; // `ToLength` abstract operation
        // https://tc39.github.io/ecma262/#sec-tolength
        module.exports = function (argument) {
          return argument > 0 ? min(toInteger(argument), 9007199254740991) : 0; // 2 ** 53 - 1 == 9007199254740991
        };
      },
      {
        '../internals/to-integer': 114
      }
    ],
    116: [
      function (_dereq_, module, exports) {
        var requireObjectCoercible = _dereq_('../internals/require-object-coercible'); // `ToObject` abstract operation
        // https://tc39.github.io/ecma262/#sec-toobject
        module.exports = function (argument) {
          return Object(requireObjectCoercible(argument));
        };
      },
      {
        '../internals/require-object-coercible': 99
      }
    ],
    117: [
      function (_dereq_, module, exports) {
        var toPositiveInteger = _dereq_('../internals/to-positive-integer');
        module.exports = function (it, BYTES) {
          var offset = toPositiveInteger(it);
          if (offset % BYTES) throw RangeError('Wrong offset');
          return offset;
        };
      },
      {
        '../internals/to-positive-integer': 118
      }
    ],
    118: [
      function (_dereq_, module, exports) {
        var toInteger = _dereq_('../internals/to-integer');
        module.exports = function (it) {
          var result = toInteger(it);
          if (result < 0) throw RangeError('The argument can\'t be less than 0');
          return result;
        };
      },
      {
        '../internals/to-integer': 114
      }
    ],
    119: [
      function (_dereq_, module, exports) {
        var isObject = _dereq_('../internals/is-object'); // `ToPrimitive` abstract operation
        // https://tc39.github.io/ecma262/#sec-toprimitive
        // instead of the ES6 spec version, we didn't implement @@toPrimitive case
        // and the second argument - flag - preferred type is a string
        module.exports = function (input, PREFERRED_STRING) {
          if (!isObject(input)) return input;
          var fn,
          val;
          if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
          if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
          if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
          throw TypeError('Can\'t convert object to primitive value');
        };
      },
      {
        '../internals/is-object': 65
      }
    ],
    120: [
      function (_dereq_, module, exports) {
        var wellKnownSymbol = _dereq_('../internals/well-known-symbol');
        var TO_STRING_TAG = wellKnownSymbol('toStringTag');
        var test = {
        };
        test[TO_STRING_TAG] = 'z';
        module.exports = String(test) === '[object z]';
      },
      {
        '../internals/well-known-symbol': 127
      }
    ],
    121: [
      function (_dereq_, module, exports) {
        'use strict';
        var $ = _dereq_('../internals/export');
        var global = _dereq_('../internals/global');
        var DESCRIPTORS = _dereq_('../internals/descriptors');
        var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = _dereq_('../internals/typed-array-constructors-require-wrappers');
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var ArrayBufferModule = _dereq_('../internals/array-buffer');
        var anInstance = _dereq_('../internals/an-instance');
        var createPropertyDescriptor = _dereq_('../internals/create-property-descriptor');
        var createNonEnumerableProperty = _dereq_('../internals/create-non-enumerable-property');
        var toLength = _dereq_('../internals/to-length');
        var toIndex = _dereq_('../internals/to-index');
        var toOffset = _dereq_('../internals/to-offset');
        var toPrimitive = _dereq_('../internals/to-primitive');
        var has = _dereq_('../internals/has');
        var classof = _dereq_('../internals/classof');
        var isObject = _dereq_('../internals/is-object');
        var create = _dereq_('../internals/object-create');
        var setPrototypeOf = _dereq_('../internals/object-set-prototype-of');
        var getOwnPropertyNames = _dereq_('../internals/object-get-own-property-names').f;
        var typedArrayFrom = _dereq_('../internals/typed-array-from');
        var forEach = _dereq_('../internals/array-iteration').forEach;
        var setSpecies = _dereq_('../internals/set-species');
        var definePropertyModule = _dereq_('../internals/object-define-property');
        var getOwnPropertyDescriptorModule = _dereq_('../internals/object-get-own-property-descriptor');
        var InternalStateModule = _dereq_('../internals/internal-state');
        var inheritIfRequired = _dereq_('../internals/inherit-if-required');
        var getInternalState = InternalStateModule.get;
        var setInternalState = InternalStateModule.set;
        var nativeDefineProperty = definePropertyModule.f;
        var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
        var round = Math.round;
        var RangeError = global.RangeError;
        var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
        var DataView = ArrayBufferModule.DataView;
        var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
        var TYPED_ARRAY_TAG = ArrayBufferViewCore.TYPED_ARRAY_TAG;
        var TypedArray = ArrayBufferViewCore.TypedArray;
        var TypedArrayPrototype = ArrayBufferViewCore.TypedArrayPrototype;
        var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
        var isTypedArray = ArrayBufferViewCore.isTypedArray;
        var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
        var WRONG_LENGTH = 'Wrong length';
        var fromList = function (C, list) {
          var index = 0;
          var length = list.length;
          var result = new (aTypedArrayConstructor(C)) (length);
          while (length > index) result[index] = list[index++];
          return result;
        };
        var addGetter = function (it, key) {
          nativeDefineProperty(it, key, {
            get: function () {
              return getInternalState(this) [key];
            }
          });
        };
        var isArrayBuffer = function (it) {
          var klass;
          return it instanceof ArrayBuffer || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
        };
        var isTypedArrayIndex = function (target, key) {
          return isTypedArray(target) && typeof key != 'symbol' && key in target && String( + key) == String(key);
        };
        var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
          return isTypedArrayIndex(target, key = toPrimitive(key, true)) ? createPropertyDescriptor(2, target[key]) : nativeGetOwnPropertyDescriptor(target, key);
        };
        var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
          if (isTypedArrayIndex(target, key = toPrimitive(key, true)) && isObject(descriptor) && has(descriptor, 'value') && !has(descriptor, 'get') && !has(descriptor, 'set') // TODO: add validation descriptor w/o calling accessors
          && !descriptor.configurable && (!has(descriptor, 'writable') || descriptor.writable) && (!has(descriptor, 'enumerable') || descriptor.enumerable)) {
            target[key] = descriptor.value;
            return target;
          }
          return nativeDefineProperty(target, key, descriptor);
        };
        if (DESCRIPTORS) {
          if (!NATIVE_ARRAY_BUFFER_VIEWS) {
            getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
            definePropertyModule.f = wrappedDefineProperty;
            addGetter(TypedArrayPrototype, 'buffer');
            addGetter(TypedArrayPrototype, 'byteOffset');
            addGetter(TypedArrayPrototype, 'byteLength');
            addGetter(TypedArrayPrototype, 'length');
          }
          $({
            target: 'Object',
            stat: true,
            forced: !NATIVE_ARRAY_BUFFER_VIEWS
          }, {
            getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
            defineProperty: wrappedDefineProperty
          });
          module.exports = function (TYPE, wrapper, CLAMPED) {
            var BYTES = TYPE.match(/\d+$/) [0] / 8;
            var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
            var GETTER = 'get' + TYPE;
            var SETTER = 'set' + TYPE;
            var NativeTypedArrayConstructor = global[CONSTRUCTOR_NAME];
            var TypedArrayConstructor = NativeTypedArrayConstructor;
            var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
            var exported = {
            };
            var getter = function (that, index) {
              var data = getInternalState(that);
              return data.view[GETTER](index * BYTES + data.byteOffset, true);
            };
            var setter = function (that, index, value) {
              var data = getInternalState(that);
              if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 255 ? 255 : value & 255;
              data.view[SETTER](index * BYTES + data.byteOffset, value, true);
            };
            var addElement = function (that, index) {
              nativeDefineProperty(that, index, {
                get: function () {
                  return getter(this, index);
                },
                set: function (value) {
                  return setter(this, index, value);
                },
                enumerable: true
              });
            };
            if (!NATIVE_ARRAY_BUFFER_VIEWS) {
              TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
                anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
                var index = 0;
                var byteOffset = 0;
                var buffer,
                byteLength,
                length;
                if (!isObject(data)) {
                  length = toIndex(data);
                  byteLength = length * BYTES;
                  buffer = new ArrayBuffer(byteLength);
                } else if (isArrayBuffer(data)) {
                  buffer = data;
                  byteOffset = toOffset(offset, BYTES);
                  var $len = data.byteLength;
                  if ($length === undefined) {
                    if ($len % BYTES) throw RangeError(WRONG_LENGTH);
                    byteLength = $len - byteOffset;
                    if (byteLength < 0) throw RangeError(WRONG_LENGTH);
                  } else {
                    byteLength = toLength($length) * BYTES;
                    if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
                  }
                  length = byteLength / BYTES;
                } else if (isTypedArray(data)) {
                  return fromList(TypedArrayConstructor, data);
                } else {
                  return typedArrayFrom.call(TypedArrayConstructor, data);
                }
                setInternalState(that, {
                  buffer: buffer,
                  byteOffset: byteOffset,
                  byteLength: byteLength,
                  length: length,
                  view: new DataView(buffer)
                });
                while (index < length) addElement(that, index++);
              });
              if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
              TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype);
            } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
              TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
                anInstance(dummy, TypedArrayConstructor, CONSTRUCTOR_NAME);
                return inheritIfRequired(function () {
                  if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
                  if (isArrayBuffer(data)) return $length !== undefined ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length) : typedArrayOffset !== undefined ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES)) : new NativeTypedArrayConstructor(data);
                  if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
                  return typedArrayFrom.call(TypedArrayConstructor, data);
                }(), dummy, TypedArrayConstructor);
              });
              if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
              forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
                if (!(key in TypedArrayConstructor)) {
                  createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
                }
              });
              TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
            }
            if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
              createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
            }
            if (TYPED_ARRAY_TAG) {
              createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
            }
            exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;
            $({
              global: true,
              forced: TypedArrayConstructor != NativeTypedArrayConstructor,
              sham: !NATIVE_ARRAY_BUFFER_VIEWS
            }, exported);
            if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
              createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
            }
            if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
              createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
            }
            setSpecies(CONSTRUCTOR_NAME);
          };
        } else module.exports = function () {
          /* empty */
        };
      },
      {
        '../internals/an-instance': 5,
        '../internals/array-buffer': 9,
        '../internals/array-buffer-view-core': 8,
        '../internals/array-iteration': 14,
        '../internals/classof': 24,
        '../internals/create-non-enumerable-property': 30,
        '../internals/create-property-descriptor': 31,
        '../internals/descriptors': 35,
        '../internals/export': 42,
        '../internals/global': 50,
        '../internals/has': 51,
        '../internals/inherit-if-required': 58,
        '../internals/internal-state': 61,
        '../internals/is-object': 65,
        '../internals/object-create': 76,
        '../internals/object-define-property': 78,
        '../internals/object-get-own-property-descriptor': 79,
        '../internals/object-get-own-property-names': 81,
        '../internals/object-set-prototype-of': 87,
        '../internals/set-species': 101,
        '../internals/to-index': 112,
        '../internals/to-length': 115,
        '../internals/to-offset': 117,
        '../internals/to-primitive': 119,
        '../internals/typed-array-constructors-require-wrappers': 122,
        '../internals/typed-array-from': 123
      }
    ],
    122: [
      function (_dereq_, module, exports) {
        /* eslint-disable no-new */
        var global = _dereq_('../internals/global');
        var fails = _dereq_('../internals/fails');
        var checkCorrectnessOfIteration = _dereq_('../internals/check-correctness-of-iteration');
        var NATIVE_ARRAY_BUFFER_VIEWS = _dereq_('../internals/array-buffer-view-core').NATIVE_ARRAY_BUFFER_VIEWS;
        var ArrayBuffer = global.ArrayBuffer;
        var Int8Array = global.Int8Array;
        module.exports = !NATIVE_ARRAY_BUFFER_VIEWS || !fails(function () {
          Int8Array(1);
        }) || !fails(function () {
          new Int8Array( - 1);
        }) || !checkCorrectnessOfIteration(function (iterable) {
          new Int8Array();
          new Int8Array(null);
          new Int8Array(1.5);
          new Int8Array(iterable);
        }, true) || fails(function () {
          // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
          return new Int8Array(new ArrayBuffer(2), 1, undefined).length !== 1;
        });
      },
      {
        '../internals/array-buffer-view-core': 8,
        '../internals/check-correctness-of-iteration': 22,
        '../internals/fails': 43,
        '../internals/global': 50
      }
    ],
    123: [
      function (_dereq_, module, exports) {
        var toObject = _dereq_('../internals/to-object');
        var toLength = _dereq_('../internals/to-length');
        var getIteratorMethod = _dereq_('../internals/get-iterator-method');
        var isArrayIteratorMethod = _dereq_('../internals/is-array-iterator-method');
        var bind = _dereq_('../internals/function-bind-context');
        var aTypedArrayConstructor = _dereq_('../internals/array-buffer-view-core').aTypedArrayConstructor;
        module.exports = function from(source        /* , mapfn, thisArg */
        ) {
          var O = toObject(source);
          var argumentsLength = arguments.length;
          var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
          var mapping = mapfn !== undefined;
          var iteratorMethod = getIteratorMethod(O);
          var i,
          length,
          result,
          step,
          iterator,
          next;
          if (iteratorMethod != undefined && !isArrayIteratorMethod(iteratorMethod)) {
            iterator = iteratorMethod.call(O);
            next = iterator.next;
            O = [
            ];
            while (!(step = next.call(iterator)).done) {
              O.push(step.value);
            }
          }
          if (mapping && argumentsLength > 2) {
            mapfn = bind(mapfn, arguments[2], 2);
          }
          length = toLength(O.length);
          result = new (aTypedArrayConstructor(this)) (length);
          for (i = 0; length > i; i++) {
            result[i] = mapping ? mapfn(O[i], i) : O[i];
          }
          return result;
        };
      },
      {
        '../internals/array-buffer-view-core': 8,
        '../internals/function-bind-context': 46,
        '../internals/get-iterator-method': 49,
        '../internals/is-array-iterator-method': 62,
        '../internals/to-length': 115,
        '../internals/to-object': 116
      }
    ],
    124: [
      function (_dereq_, module, exports) {
        var id = 0;
        var postfix = Math.random();
        module.exports = function (key) {
          return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
        };
      },
      {
      }
    ],
    125: [
      function (_dereq_, module, exports) {
        var NATIVE_SYMBOL = _dereq_('../internals/native-symbol');
        module.exports = NATIVE_SYMBOL // eslint-disable-next-line no-undef
        && !Symbol.sham // eslint-disable-next-line no-undef
        && typeof Symbol.iterator == 'symbol';
      },
      {
        '../internals/native-symbol': 73
      }
    ],
    126: [
      function (_dereq_, module, exports) {
        var wellKnownSymbol = _dereq_('../internals/well-known-symbol');
        exports.f = wellKnownSymbol;
      },
      {
        '../internals/well-known-symbol': 127
      }
    ],
    127: [
      function (_dereq_, module, exports) {
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
            if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
             else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
          }
          return WellKnownSymbolsStore[name];
        };
      },
      {
        '../internals/global': 50,
        '../internals/has': 51,
        '../internals/native-symbol': 73,
        '../internals/shared': 105,
        '../internals/uid': 124,
        '../internals/use-symbol-as-uid': 125
      }
    ],
    128: [
      function (_dereq_, module, exports) {
        // a string of all valid unicode whitespaces
        // eslint-disable-next-line max-len
        module.exports = '\t\n\v\f\r                　\u2028\u2029﻿';
      },
      {
      }
    ],
    129: [
      function (_dereq_, module, exports) {
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
          filter: function filter(callbackfn          /* , thisArg */
          ) {
            return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
          }
        });
      },
      {
        '../internals/array-iteration': 14,
        '../internals/array-method-has-species-support': 16,
        '../internals/array-method-uses-to-length': 18,
        '../internals/export': 42
      }
    ],
    130: [
      function (_dereq_, module, exports) {
        'use strict';
        var $ = _dereq_('../internals/export');
        var forEach = _dereq_('../internals/array-for-each'); // `Array.prototype.forEach` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
        $({
          target: 'Array',
          proto: true,
          forced: [
          ].forEach != forEach
        }, {
          forEach: forEach
        });
      },
      {
        '../internals/array-for-each': 12,
        '../internals/export': 42
      }
    ],
    131: [
      function (_dereq_, module, exports) {
        'use strict';
        var $ = _dereq_('../internals/export');
        var $indexOf = _dereq_('../internals/array-includes').indexOf;
        var arrayMethodIsStrict = _dereq_('../internals/array-method-is-strict');
        var arrayMethodUsesToLength = _dereq_('../internals/array-method-uses-to-length');
        var nativeIndexOf = [
        ].indexOf;
        var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [
          1
        ].indexOf(1, - 0) < 0;
        var STRICT_METHOD = arrayMethodIsStrict('indexOf');
        var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', {
          ACCESSORS: true,
          1: 0
        }); // `Array.prototype.indexOf` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
        $({
          target: 'Array',
          proto: true,
          forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH
        }, {
          indexOf: function indexOf(searchElement          /* , fromIndex = 0 */
          ) {
            return NEGATIVE_ZERO // convert -0 to +0
            ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
          }
        });
      },
      {
        '../internals/array-includes': 13,
        '../internals/array-method-is-strict': 17,
        '../internals/array-method-uses-to-length': 18,
        '../internals/export': 42
      }
    ],
    132: [
      function (_dereq_, module, exports) {
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
            value: [
              index,
              target[index]
            ],
            done: false
          };
        }, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
        // https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
        // https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
        Iterators.Arguments = Iterators.Array; // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
        addToUnscopables('keys');
        addToUnscopables('values');
        addToUnscopables('entries');
      },
      {
        '../internals/add-to-unscopables': 3,
        '../internals/define-iterator': 33,
        '../internals/internal-state': 61,
        '../internals/iterators': 70,
        '../internals/to-indexed-object': 113
      }
    ],
    133: [
      function (_dereq_, module, exports) {
        'use strict';
        var $ = _dereq_('../internals/export');
        var IndexedObject = _dereq_('../internals/indexed-object');
        var toIndexedObject = _dereq_('../internals/to-indexed-object');
        var arrayMethodIsStrict = _dereq_('../internals/array-method-is-strict');
        var nativeJoin = [
        ].join;
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
      },
      {
        '../internals/array-method-is-strict': 17,
        '../internals/export': 42,
        '../internals/indexed-object': 57,
        '../internals/to-indexed-object': 113
      }
    ],
    134: [
      function (_dereq_, module, exports) {
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
          map: function map(callbackfn          /* , thisArg */
          ) {
            return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
          }
        });
      },
      {
        '../internals/array-iteration': 14,
        '../internals/array-method-has-species-support': 16,
        '../internals/array-method-uses-to-length': 18,
        '../internals/export': 42
      }
    ],
    135: [
      function (_dereq_, module, exports) {
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
        var nativeSlice = [
        ].slice;
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
            var Constructor,
            result,
            n;
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
            result = new (Constructor === undefined ? Array : Constructor) (max(fin - k, 0));
            for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
            result.length = n;
            return result;
          }
        });
      },
      {
        '../internals/array-method-has-species-support': 16,
        '../internals/array-method-uses-to-length': 18,
        '../internals/create-property': 32,
        '../internals/export': 42,
        '../internals/is-array': 63,
        '../internals/is-object': 65,
        '../internals/to-absolute-index': 111,
        '../internals/to-indexed-object': 113,
        '../internals/to-length': 115,
        '../internals/well-known-symbol': 127
      }
    ],
    136: [
      function (_dereq_, module, exports) {
        'use strict';
        var $ = _dereq_('../internals/export');
        var toAbsoluteIndex = _dereq_('../internals/to-absolute-index');
        var toInteger = _dereq_('../internals/to-integer');
        var toLength = _dereq_('../internals/to-length');
        var toObject = _dereq_('../internals/to-object');
        var arraySpeciesCreate = _dereq_('../internals/array-species-create');
        var createProperty = _dereq_('../internals/create-property');
        var arrayMethodHasSpeciesSupport = _dereq_('../internals/array-method-has-species-support');
        var arrayMethodUsesToLength = _dereq_('../internals/array-method-uses-to-length');
        var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
        var USES_TO_LENGTH = arrayMethodUsesToLength('splice', {
          ACCESSORS: true,
          0: 0,
          1: 2
        });
        var max = Math.max;
        var min = Math.min;
        var MAX_SAFE_INTEGER = 9007199254740991;
        var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.splice
        // with adding support of @@species
        $({
          target: 'Array',
          proto: true,
          forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH
        }, {
          splice: function splice(start, deleteCount          /* , ...items */
          ) {
            var O = toObject(this);
            var len = toLength(O.length);
            var actualStart = toAbsoluteIndex(start, len);
            var argumentsLength = arguments.length;
            var insertCount,
            actualDeleteCount,
            A,
            k,
            from,
            to;
            if (argumentsLength === 0) {
              insertCount = actualDeleteCount = 0;
            } else if (argumentsLength === 1) {
              insertCount = 0;
              actualDeleteCount = len - actualStart;
            } else {
              insertCount = argumentsLength - 2;
              actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
            }
            if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
              throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
            }
            A = arraySpeciesCreate(O, actualDeleteCount);
            for (k = 0; k < actualDeleteCount; k++) {
              from = actualStart + k;
              if (from in O) createProperty(A, k, O[from]);
            }
            A.length = actualDeleteCount;
            if (insertCount < actualDeleteCount) {
              for (k = actualStart; k < len - actualDeleteCount; k++) {
                from = k + actualDeleteCount;
                to = k + insertCount;
                if (from in O) O[to] = O[from];
                 else delete O[to];
              }
              for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
            } else if (insertCount > actualDeleteCount) {
              for (k = len - actualDeleteCount; k > actualStart; k--) {
                from = k + actualDeleteCount - 1;
                to = k + insertCount - 1;
                if (from in O) O[to] = O[from];
                 else delete O[to];
              }
            }
            for (k = 0; k < insertCount; k++) {
              O[k + actualStart] = arguments[k + 2];
            }
            O.length = len - actualDeleteCount + insertCount;
            return A;
          }
        });
      },
      {
        '../internals/array-method-has-species-support': 16,
        '../internals/array-method-uses-to-length': 18,
        '../internals/array-species-create': 20,
        '../internals/create-property': 32,
        '../internals/export': 42,
        '../internals/to-absolute-index': 111,
        '../internals/to-integer': 114,
        '../internals/to-length': 115,
        '../internals/to-object': 116
      }
    ],
    137: [
      function (_dereq_, module, exports) {
        var DESCRIPTORS = _dereq_('../internals/descriptors');
        var defineProperty = _dereq_('../internals/object-define-property').f;
        var FunctionPrototype = Function.prototype;
        var FunctionPrototypeToString = FunctionPrototype.toString;
        var nameRE = /^\s*function ([^ (]*)/;
        var NAME = 'name'; // Function instances `.name` property
        // https://tc39.github.io/ecma262/#sec-function-instances-name
        if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
          defineProperty(FunctionPrototype, NAME, {
            configurable: true,
            get: function () {
              try {
                return FunctionPrototypeToString.call(this).match(nameRE) [1];
              } catch (error) {
                return '';
              }
            }
          });
        }
      },
      {
        '../internals/descriptors': 35,
        '../internals/object-define-property': 78
      }
    ],
    138: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/descriptors': 35,
        '../internals/export': 42,
        '../internals/fails': 43,
        '../internals/object-get-own-property-descriptor': 79,
        '../internals/to-indexed-object': 113
      }
    ],
    139: [
      function (_dereq_, module, exports) {
        var $ = _dereq_('../internals/export');
        var fails = _dereq_('../internals/fails');
        var toObject = _dereq_('../internals/to-object');
        var nativeGetPrototypeOf = _dereq_('../internals/object-get-prototype-of');
        var CORRECT_PROTOTYPE_GETTER = _dereq_('../internals/correct-prototype-getter');
        var FAILS_ON_PRIMITIVES = fails(function () {
          nativeGetPrototypeOf(1);
        }); // `Object.getPrototypeOf` method
        // https://tc39.github.io/ecma262/#sec-object.getprototypeof
        $({
          target: 'Object',
          stat: true,
          forced: FAILS_ON_PRIMITIVES,
          sham: !CORRECT_PROTOTYPE_GETTER
        }, {
          getPrototypeOf: function getPrototypeOf(it) {
            return nativeGetPrototypeOf(toObject(it));
          }
        });
      },
      {
        '../internals/correct-prototype-getter': 28,
        '../internals/export': 42,
        '../internals/fails': 43,
        '../internals/object-get-prototype-of': 83,
        '../internals/to-object': 116
      }
    ],
    140: [
      function (_dereq_, module, exports) {
        var TO_STRING_TAG_SUPPORT = _dereq_('../internals/to-string-tag-support');
        var redefine = _dereq_('../internals/redefine');
        var toString = _dereq_('../internals/object-to-string'); // `Object.prototype.toString` method
        // https://tc39.github.io/ecma262/#sec-object.prototype.tostring
        if (!TO_STRING_TAG_SUPPORT) {
          redefine(Object.prototype, 'toString', toString, {
            unsafe: true
          });
        }
      },
      {
        '../internals/object-to-string': 88,
        '../internals/redefine': 94,
        '../internals/to-string-tag-support': 120
      }
    ],
    141: [
      function (_dereq_, module, exports) {
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
        var Internal,
        OwnPromiseCapability,
        PromiseWrapper,
        nativeThen;
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
          var constructor = promise.constructor = {
          };
          constructor[SPECIES] = FakePromise;
          return !(promise.then(function () {
            /* empty */
          }) instanceof FakePromise);
        });
        var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
          PromiseConstructor.all(iterable) ['catch'](function () {
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
              var result,
              then,
              exited;
              try {
                if (handler) {
                  if (!ok) {
                    if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
                    state.rejection = HANDLED;
                  }
                  if (handler === true) result = value;
                   else {
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
            state.reactions = [
            ];
            state.notified = false;
            if (isReject && !state.rejection) onUnhandled(promise, state);
          });
        };
        var dispatchEvent = function (name, promise, reason) {
          var event,
          handler;
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
          if (handler = global['on' + name]) handler(event);
           else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
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
            if (promise === value) throw TypeError('Promise can\'t be resolved itself');
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
              reactions: [
              ],
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
              fetch: function fetch(input              /* , init */
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
              var values = [
              ];
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
      },
      {
        '../internals/a-function': 1,
        '../internals/an-instance': 5,
        '../internals/check-correctness-of-iteration': 22,
        '../internals/classof-raw': 23,
        '../internals/engine-v8-version': 40,
        '../internals/export': 42,
        '../internals/get-built-in': 48,
        '../internals/global': 50,
        '../internals/host-report-errors': 53,
        '../internals/inspect-source': 59,
        '../internals/internal-state': 61,
        '../internals/is-forced': 64,
        '../internals/is-object': 65,
        '../internals/is-pure': 66,
        '../internals/iterate': 68,
        '../internals/microtask': 71,
        '../internals/native-promise-constructor': 72,
        '../internals/new-promise-capability': 75,
        '../internals/perform': 91,
        '../internals/promise-resolve': 92,
        '../internals/redefine': 94,
        '../internals/redefine-all': 93,
        '../internals/set-species': 101,
        '../internals/set-to-string-tag': 102,
        '../internals/species-constructor': 106,
        '../internals/task': 110,
        '../internals/well-known-symbol': 127
      }
    ],
    142: [
      function (_dereq_, module, exports) {
        var $ = _dereq_('../internals/export');
        var getBuiltIn = _dereq_('../internals/get-built-in');
        var aFunction = _dereq_('../internals/a-function');
        var anObject = _dereq_('../internals/an-object');
        var isObject = _dereq_('../internals/is-object');
        var create = _dereq_('../internals/object-create');
        var bind = _dereq_('../internals/function-bind');
        var fails = _dereq_('../internals/fails');
        var nativeConstruct = getBuiltIn('Reflect', 'construct'); // `Reflect.construct` method
        // https://tc39.github.io/ecma262/#sec-reflect.construct
        // MS Edge supports only 2 arguments and argumentsList argument is optional
        // FF Nightly sets third argument as `new.target`, but does not create `this` from it
        var NEW_TARGET_BUG = fails(function () {
          function F() {
            /* empty */
          }
          return !(nativeConstruct(function () {
            /* empty */
          }, [
          ], F) instanceof F);
        });
        var ARGS_BUG = !fails(function () {
          nativeConstruct(function () {
            /* empty */
          });
        });
        var FORCED = NEW_TARGET_BUG || ARGS_BUG;
        $({
          target: 'Reflect',
          stat: true,
          forced: FORCED,
          sham: FORCED
        }, {
          construct: function construct(Target, args          /* , newTarget */
          ) {
            aFunction(Target);
            anObject(args);
            var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
            if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
            if (Target == newTarget) {
              // w/o altered newTarget, optimization for 0-4 arguments
              switch (args.length) {
                case 0:
                  return new Target();
                case 1:
                  return new Target(args[0]);
                case 2:
                  return new Target(args[0], args[1]);
                case 3:
                  return new Target(args[0], args[1], args[2]);
                case 4:
                  return new Target(args[0], args[1], args[2], args[3]);
              } // w/o altered newTarget, lot of arguments case

              var $args = [
                null
              ];
              $args.push.apply($args, args);
              return new (bind.apply(Target, $args)) ();
            } // with altered newTarget, not support built-in constructors

            var proto = newTarget.prototype;
            var instance = create(isObject(proto) ? proto : Object.prototype);
            var result = Function.apply.call(Target, instance, args);
            return isObject(result) ? result : instance;
          }
        });
      },
      {
        '../internals/a-function': 1,
        '../internals/an-object': 6,
        '../internals/export': 42,
        '../internals/fails': 43,
        '../internals/function-bind': 47,
        '../internals/get-built-in': 48,
        '../internals/is-object': 65,
        '../internals/object-create': 76
      }
    ],
    143: [
      function (_dereq_, module, exports) {
        var $ = _dereq_('../internals/export');
        var isObject = _dereq_('../internals/is-object');
        var anObject = _dereq_('../internals/an-object');
        var has = _dereq_('../internals/has');
        var getOwnPropertyDescriptorModule = _dereq_('../internals/object-get-own-property-descriptor');
        var getPrototypeOf = _dereq_('../internals/object-get-prototype-of'); // `Reflect.get` method
        // https://tc39.github.io/ecma262/#sec-reflect.get
        function get(target, propertyKey        /* , receiver */
        ) {
          var receiver = arguments.length < 3 ? target : arguments[2];
          var descriptor,
          prototype;
          if (anObject(target) === receiver) return target[propertyKey];
          if (descriptor = getOwnPropertyDescriptorModule.f(target, propertyKey)) return has(descriptor, 'value') ? descriptor.value : descriptor.get === undefined ? undefined : descriptor.get.call(receiver);
          if (isObject(prototype = getPrototypeOf(target))) return get(prototype, propertyKey, receiver);
        }
        $({
          target: 'Reflect',
          stat: true
        }, {
          get: get
        });
      },
      {
        '../internals/an-object': 6,
        '../internals/export': 42,
        '../internals/has': 51,
        '../internals/is-object': 65,
        '../internals/object-get-own-property-descriptor': 79,
        '../internals/object-get-prototype-of': 83
      }
    ],
    144: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/export': 42,
        '../internals/regexp-exec': 96
      }
    ],
    145: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/an-object': 6,
        '../internals/fails': 43,
        '../internals/redefine': 94,
        '../internals/regexp-flags': 97
      }
    ],
    146: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/define-iterator': 33,
        '../internals/internal-state': 61,
        '../internals/string-multibyte': 107
      }
    ],
    147: [
      function (_dereq_, module, exports) {
        'use strict';
        var fixRegExpWellKnownSymbolLogic = _dereq_('../internals/fix-regexp-well-known-symbol-logic');
        var anObject = _dereq_('../internals/an-object');
        var toLength = _dereq_('../internals/to-length');
        var requireObjectCoercible = _dereq_('../internals/require-object-coercible');
        var advanceStringIndex = _dereq_('../internals/advance-string-index');
        var regExpExec = _dereq_('../internals/regexp-exec-abstract'); // @@match logic
        fixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
          return [ // `String.prototype.match` method
          // https://tc39.github.io/ecma262/#sec-string.prototype.match
          function match(regexp) {
            var O = requireObjectCoercible(this);
            var matcher = regexp == undefined ? undefined : regexp[MATCH];
            return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp) [MATCH](String(O));
          }, // `RegExp.prototype[@@match]` method
          // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
          function (regexp) {
            var res = maybeCallNative(nativeMatch, regexp, this);
            if (res.done) return res.value;
            var rx = anObject(regexp);
            var S = String(this);
            if (!rx.global) return regExpExec(rx, S);
            var fullUnicode = rx.unicode;
            rx.lastIndex = 0;
            var A = [
            ];
            var n = 0;
            var result;
            while ((result = regExpExec(rx, S)) !== null) {
              var matchStr = String(result[0]);
              A[n] = matchStr;
              if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
              n++;
            }
            return n === 0 ? null : A;
          }
          ];
        });
      },
      {
        '../internals/advance-string-index': 4,
        '../internals/an-object': 6,
        '../internals/fix-regexp-well-known-symbol-logic': 44,
        '../internals/regexp-exec-abstract': 95,
        '../internals/require-object-coercible': 99,
        '../internals/to-length': 115
      }
    ],
    148: [
      function (_dereq_, module, exports) {
        'use strict';
        var fixRegExpWellKnownSymbolLogic = _dereq_('../internals/fix-regexp-well-known-symbol-logic');
        var anObject = _dereq_('../internals/an-object');
        var toObject = _dereq_('../internals/to-object');
        var toLength = _dereq_('../internals/to-length');
        var toInteger = _dereq_('../internals/to-integer');
        var requireObjectCoercible = _dereq_('../internals/require-object-coercible');
        var advanceStringIndex = _dereq_('../internals/advance-string-index');
        var regExpExec = _dereq_('../internals/regexp-exec-abstract');
        var max = Math.max;
        var min = Math.min;
        var floor = Math.floor;
        var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
        var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;
        var maybeToString = function (it) {
          return it === undefined ? it : String(it);
        }; // @@replace logic
        fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
          var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
          var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
          var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';
          return [ // `String.prototype.replace` method
          // https://tc39.github.io/ecma262/#sec-string.prototype.replace
          function replace(searchValue, replaceValue) {
            var O = requireObjectCoercible(this);
            var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
            return replacer !== undefined ? replacer.call(searchValue, O, replaceValue) : nativeReplace.call(String(O), searchValue, replaceValue);
          }, // `RegExp.prototype[@@replace]` method
          // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
          function (regexp, replaceValue) {
            if (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0 || typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === - 1) {
              var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
              if (res.done) return res.value;
            }
            var rx = anObject(regexp);
            var S = String(this);
            var functionalReplace = typeof replaceValue === 'function';
            if (!functionalReplace) replaceValue = String(replaceValue);
            var global = rx.global;
            if (global) {
              var fullUnicode = rx.unicode;
              rx.lastIndex = 0;
            }
            var results = [
            ];
            while (true) {
              var result = regExpExec(rx, S);
              if (result === null) break;
              results.push(result);
              if (!global) break;
              var matchStr = String(result[0]);
              if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
            }
            var accumulatedResult = '';
            var nextSourcePosition = 0;
            for (var i = 0; i < results.length; i++) {
              result = results[i];
              var matched = String(result[0]);
              var position = max(min(toInteger(result.index), S.length), 0);
              var captures = [
              ]; // NOTE: This is equivalent to
              //   captures = result.slice(1).map(maybeToString)
              // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
              // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
              // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
              for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
              var namedCaptures = result.groups;
              if (functionalReplace) {
                var replacerArgs = [
                  matched
                ].concat(captures, position, S);
                if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
                var replacement = String(replaceValue.apply(undefined, replacerArgs));
              } else {
                replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
              }
              if (position >= nextSourcePosition) {
                accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
                nextSourcePosition = position + matched.length;
              }
            }
            return accumulatedResult + S.slice(nextSourcePosition);
          }
          ]; // https://tc39.github.io/ecma262/#sec-getsubstitution
          function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
            var tailPos = position + matched.length;
            var m = captures.length;
            var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
            if (namedCaptures !== undefined) {
              namedCaptures = toObject(namedCaptures);
              symbols = SUBSTITUTION_SYMBOLS;
            }
            return nativeReplace.call(replacement, symbols, function (match, ch) {
              var capture;
              switch (ch.charAt(0)) {
                case '$':
                  return '$';
                case '&':
                  return matched;
                case '`':
                  return str.slice(0, position);
                case '\'':
                  return str.slice(tailPos);
                case '<':
                  capture = namedCaptures[ch.slice(1, - 1)];
                  break;
                default:
                  // \d\d?
                  var n = + ch;
                  if (n === 0) return match;
                  if (n > m) {
                    var f = floor(n / 10);
                    if (f === 0) return match;
                    if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
                    return match;
                  }
                  capture = captures[n - 1];
              }
              return capture === undefined ? '' : capture;
            });
          }
        });
      },
      {
        '../internals/advance-string-index': 4,
        '../internals/an-object': 6,
        '../internals/fix-regexp-well-known-symbol-logic': 44,
        '../internals/regexp-exec-abstract': 95,
        '../internals/require-object-coercible': 99,
        '../internals/to-integer': 114,
        '../internals/to-length': 115,
        '../internals/to-object': 116
      }
    ],
    149: [
      function (_dereq_, module, exports) {
        'use strict';
        var fixRegExpWellKnownSymbolLogic = _dereq_('../internals/fix-regexp-well-known-symbol-logic');
        var isRegExp = _dereq_('../internals/is-regexp');
        var anObject = _dereq_('../internals/an-object');
        var requireObjectCoercible = _dereq_('../internals/require-object-coercible');
        var speciesConstructor = _dereq_('../internals/species-constructor');
        var advanceStringIndex = _dereq_('../internals/advance-string-index');
        var toLength = _dereq_('../internals/to-length');
        var callRegExpExec = _dereq_('../internals/regexp-exec-abstract');
        var regexpExec = _dereq_('../internals/regexp-exec');
        var fails = _dereq_('../internals/fails');
        var arrayPush = [
        ].push;
        var min = Math.min;
        var MAX_UINT32 = 4294967295; // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
        var SUPPORTS_Y = !fails(function () {
          return !RegExp(MAX_UINT32, 'y');
        }); // @@split logic
        fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
          var internalSplit;
          if ('abbc'.split(/(b)*/) [1] == 'c' || 'test'.split(/(?:)/, - 1).length != 4 || 'ab'.split(/(?:ab)*/).length != 2 || '.'.split(/(.?)(.?)/).length != 4 || '.'.split(/()()/).length > 1 || ''.split(/.?/).length) {
            // based on es5-shim implementation, need to rework it
            internalSplit = function (separator, limit) {
              var string = String(requireObjectCoercible(this));
              var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
              if (lim === 0) return [];
              if (separator === undefined) return [string]; // If `separator` is not a regex, use native split
              if (!isRegExp(separator)) {
                return nativeSplit.call(string, separator, lim);
              }
              var output = [
              ];
              var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
              var lastLastIndex = 0; // Make `global` and avoid `lastIndex` issues by working with a copy
              var separatorCopy = new RegExp(separator.source, flags + 'g');
              var match,
              lastIndex,
              lastLength;
              while (match = regexpExec.call(separatorCopy, string)) {
                lastIndex = separatorCopy.lastIndex;
                if (lastIndex > lastLastIndex) {
                  output.push(string.slice(lastLastIndex, match.index));
                  if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
                  lastLength = match[0].length;
                  lastLastIndex = lastIndex;
                  if (output.length >= lim) break;
                }
                if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
              }
              if (lastLastIndex === string.length) {
                if (lastLength || !separatorCopy.test('')) output.push('');
              } else output.push(string.slice(lastLastIndex));
              return output.length > lim ? output.slice(0, lim) : output;
            }; // Chakra, V8
          } else if ('0'.split(undefined, 0).length) {
            internalSplit = function (separator, limit) {
              return separator === undefined && limit === 0 ? [
              ] : nativeSplit.call(this, separator, limit);
            };
          } else internalSplit = nativeSplit;
          return [ // `String.prototype.split` method
          // https://tc39.github.io/ecma262/#sec-string.prototype.split
          function split(separator, limit) {
            var O = requireObjectCoercible(this);
            var splitter = separator == undefined ? undefined : separator[SPLIT];
            return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
          }, // `RegExp.prototype[@@split]` method
          // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
          //
          // NOTE: This cannot be properly polyfilled in engines that don't support
          // the 'y' flag.
          function (regexp, limit) {
            var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
            if (res.done) return res.value;
            var rx = anObject(regexp);
            var S = String(this);
            var C = speciesConstructor(rx, RegExp);
            var unicodeMatching = rx.unicode;
            var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (SUPPORTS_Y ? 'y' : 'g'); // ^(? + rx + ) is needed, in combination with some S slicing, to
            // simulate the 'y' flag.
            var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
            var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
            if (lim === 0) return [];
            if (S.length === 0) return callRegExpExec(splitter, S) === null ? [
              S
            ] : [
            ];
            var p = 0;
            var q = 0;
            var A = [
            ];
            while (q < S.length) {
              splitter.lastIndex = SUPPORTS_Y ? q : 0;
              var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
              var e;
              if (z === null || (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
                q = advanceStringIndex(S, q, unicodeMatching);
              } else {
                A.push(S.slice(p, q));
                if (A.length === lim) return A;
                for (var i = 1; i <= z.length - 1; i++) {
                  A.push(z[i]);
                  if (A.length === lim) return A;
                }
                q = p = e;
              }
            }
            A.push(S.slice(p));
            return A;
          }
          ];
        }, !SUPPORTS_Y);
      },
      {
        '../internals/advance-string-index': 4,
        '../internals/an-object': 6,
        '../internals/fails': 43,
        '../internals/fix-regexp-well-known-symbol-logic': 44,
        '../internals/is-regexp': 67,
        '../internals/regexp-exec': 96,
        '../internals/regexp-exec-abstract': 95,
        '../internals/require-object-coercible': 99,
        '../internals/species-constructor': 106,
        '../internals/to-length': 115
      }
    ],
    150: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/export': 42,
        '../internals/string-trim': 109,
        '../internals/string-trim-forced': 108
      }
    ],
    151: [
      function (_dereq_, module, exports) {
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
          var EmptyStringDescriptionStore = {
          }; // wrap Symbol constructor for correct work with undefined description
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
              var desc = native ? string.slice(7, - 1) : string.replace(regexp, '$1');
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
      },
      {
        '../internals/copy-constructor-properties': 27,
        '../internals/descriptors': 35,
        '../internals/export': 42,
        '../internals/global': 50,
        '../internals/has': 51,
        '../internals/is-object': 65,
        '../internals/object-define-property': 78
      }
    ],
    152: [
      function (_dereq_, module, exports) {
        var defineWellKnownSymbol = _dereq_('../internals/define-well-known-symbol'); // `Symbol.iterator` well-known symbol
        // https://tc39.github.io/ecma262/#sec-symbol.iterator
        defineWellKnownSymbol('iterator');
      },
      {
        '../internals/define-well-known-symbol': 34
      }
    ],
    153: [
      function (_dereq_, module, exports) {
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
          return nativeObjectCreate(nativeDefineProperty({
          }, 'a', {
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
        }
         : nativeDefineProperty;
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
        }
         : function (it) {
          return Object(it) instanceof $Symbol;
        };
        var $defineProperty = function defineProperty(O, P, Attributes) {
          if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
          anObject(O);
          var key = toPrimitive(P, true);
          anObject(Attributes);
          if (has(AllSymbols, key)) {
            if (!Attributes.enumerable) {
              if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {
              }));
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
          var result = [
          ];
          $forEach(names, function (key) {
            if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
          });
          return result;
        };
        var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
          var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
          var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
          var result = [
          ];
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
              var args = [
                it
              ];
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
      },
      {
        '../internals/an-object': 6,
        '../internals/array-iteration': 14,
        '../internals/create-non-enumerable-property': 30,
        '../internals/create-property-descriptor': 31,
        '../internals/define-well-known-symbol': 34,
        '../internals/descriptors': 35,
        '../internals/export': 42,
        '../internals/fails': 43,
        '../internals/get-built-in': 48,
        '../internals/global': 50,
        '../internals/has': 51,
        '../internals/hidden-keys': 52,
        '../internals/internal-state': 61,
        '../internals/is-array': 63,
        '../internals/is-object': 65,
        '../internals/is-pure': 66,
        '../internals/native-symbol': 73,
        '../internals/object-create': 76,
        '../internals/object-define-property': 78,
        '../internals/object-get-own-property-descriptor': 79,
        '../internals/object-get-own-property-names': 81,
        '../internals/object-get-own-property-names-external': 80,
        '../internals/object-get-own-property-symbols': 82,
        '../internals/object-keys': 85,
        '../internals/object-property-is-enumerable': 86,
        '../internals/redefine': 94,
        '../internals/set-to-string-tag': 102,
        '../internals/shared': 105,
        '../internals/shared-key': 103,
        '../internals/to-indexed-object': 113,
        '../internals/to-object': 116,
        '../internals/to-primitive': 119,
        '../internals/uid': 124,
        '../internals/use-symbol-as-uid': 125,
        '../internals/well-known-symbol': 127,
        '../internals/well-known-symbol-wrapped': 126
      }
    ],
    154: [
      function (_dereq_, module, exports) {
        'use strict';
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var $copyWithin = _dereq_('../internals/array-copy-within');
        var aTypedArray = ArrayBufferViewCore.aTypedArray;
        var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.copyWithin` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.copywithin
        exportTypedArrayMethod('copyWithin', function copyWithin(target, start        /* , end */
        ) {
          return $copyWithin.call(aTypedArray(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
        });
      },
      {
        '../internals/array-buffer-view-core': 8,
        '../internals/array-copy-within': 10
      }
    ],
    155: [
      function (_dereq_, module, exports) {
        'use strict';
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var $every = _dereq_('../internals/array-iteration').every;
        var aTypedArray = ArrayBufferViewCore.aTypedArray;
        var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.every` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.every
        exportTypedArrayMethod('every', function every(callbackfn        /* , thisArg */
        ) {
          return $every(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        });
      },
      {
        '../internals/array-buffer-view-core': 8,
        '../internals/array-iteration': 14
      }
    ],
    156: [
      function (_dereq_, module, exports) {
        'use strict';
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var $fill = _dereq_('../internals/array-fill');
        var aTypedArray = ArrayBufferViewCore.aTypedArray;
        var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.fill` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.fill
        // eslint-disable-next-line no-unused-vars
        exportTypedArrayMethod('fill', function fill(value        /* , start, end */
        ) {
          return $fill.apply(aTypedArray(this), arguments);
        });
      },
      {
        '../internals/array-buffer-view-core': 8,
        '../internals/array-fill': 11
      }
    ],
    157: [
      function (_dereq_, module, exports) {
        'use strict';
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var $filter = _dereq_('../internals/array-iteration').filter;
        var speciesConstructor = _dereq_('../internals/species-constructor');
        var aTypedArray = ArrayBufferViewCore.aTypedArray;
        var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
        var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.filter` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.filter
        exportTypedArrayMethod('filter', function filter(callbackfn        /* , thisArg */
        ) {
          var list = $filter(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
          var C = speciesConstructor(this, this.constructor);
          var index = 0;
          var length = list.length;
          var result = new (aTypedArrayConstructor(C)) (length);
          while (length > index) result[index] = list[index++];
          return result;
        });
      },
      {
        '../internals/array-buffer-view-core': 8,
        '../internals/array-iteration': 14,
        '../internals/species-constructor': 106
      }
    ],
    158: [
      function (_dereq_, module, exports) {
        'use strict';
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var $findIndex = _dereq_('../internals/array-iteration').findIndex;
        var aTypedArray = ArrayBufferViewCore.aTypedArray;
        var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.findIndex` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.findindex
        exportTypedArrayMethod('findIndex', function findIndex(predicate        /* , thisArg */
        ) {
          return $findIndex(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
        });
      },
      {
        '../internals/array-buffer-view-core': 8,
        '../internals/array-iteration': 14
      }
    ],
    159: [
      function (_dereq_, module, exports) {
        'use strict';
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var $find = _dereq_('../internals/array-iteration').find;
        var aTypedArray = ArrayBufferViewCore.aTypedArray;
        var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.find` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.find
        exportTypedArrayMethod('find', function find(predicate        /* , thisArg */
        ) {
          return $find(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
        });
      },
      {
        '../internals/array-buffer-view-core': 8,
        '../internals/array-iteration': 14
      }
    ],
    160: [
      function (_dereq_, module, exports) {
        var createTypedArrayConstructor = _dereq_('../internals/typed-array-constructor'); // `Float32Array` constructor
        // https://tc39.github.io/ecma262/#sec-typedarray-objects
        createTypedArrayConstructor('Float32', function (init) {
          return function Float32Array(data, byteOffset, length) {
            return init(this, data, byteOffset, length);
          };
        });
      },
      {
        '../internals/typed-array-constructor': 121
      }
    ],
    161: [
      function (_dereq_, module, exports) {
        'use strict';
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var $forEach = _dereq_('../internals/array-iteration').forEach;
        var aTypedArray = ArrayBufferViewCore.aTypedArray;
        var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.forEach` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.foreach
        exportTypedArrayMethod('forEach', function forEach(callbackfn        /* , thisArg */
        ) {
          $forEach(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        });
      },
      {
        '../internals/array-buffer-view-core': 8,
        '../internals/array-iteration': 14
      }
    ],
    162: [
      function (_dereq_, module, exports) {
        'use strict';
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var $includes = _dereq_('../internals/array-includes').includes;
        var aTypedArray = ArrayBufferViewCore.aTypedArray;
        var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.includes` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.includes
        exportTypedArrayMethod('includes', function includes(searchElement        /* , fromIndex */
        ) {
          return $includes(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
        });
      },
      {
        '../internals/array-buffer-view-core': 8,
        '../internals/array-includes': 13
      }
    ],
    163: [
      function (_dereq_, module, exports) {
        'use strict';
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var $indexOf = _dereq_('../internals/array-includes').indexOf;
        var aTypedArray = ArrayBufferViewCore.aTypedArray;
        var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.indexOf` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.indexof
        exportTypedArrayMethod('indexOf', function indexOf(searchElement        /* , fromIndex */
        ) {
          return $indexOf(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
        });
      },
      {
        '../internals/array-buffer-view-core': 8,
        '../internals/array-includes': 13
      }
    ],
    164: [
      function (_dereq_, module, exports) {
        'use strict';
        var global = _dereq_('../internals/global');
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var ArrayIterators = _dereq_('../modules/es.array.iterator');
        var wellKnownSymbol = _dereq_('../internals/well-known-symbol');
        var ITERATOR = wellKnownSymbol('iterator');
        var Uint8Array = global.Uint8Array;
        var arrayValues = ArrayIterators.values;
        var arrayKeys = ArrayIterators.keys;
        var arrayEntries = ArrayIterators.entries;
        var aTypedArray = ArrayBufferViewCore.aTypedArray;
        var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
        var nativeTypedArrayIterator = Uint8Array && Uint8Array.prototype[ITERATOR];
        var CORRECT_ITER_NAME = !!nativeTypedArrayIterator && (nativeTypedArrayIterator.name == 'values' || nativeTypedArrayIterator.name == undefined);
        var typedArrayValues = function values() {
          return arrayValues.call(aTypedArray(this));
        }; // `%TypedArray%.prototype.entries` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.entries
        exportTypedArrayMethod('entries', function entries() {
          return arrayEntries.call(aTypedArray(this));
        }); // `%TypedArray%.prototype.keys` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.keys
        exportTypedArrayMethod('keys', function keys() {
          return arrayKeys.call(aTypedArray(this));
        }); // `%TypedArray%.prototype.values` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.values
        exportTypedArrayMethod('values', typedArrayValues, !CORRECT_ITER_NAME); // `%TypedArray%.prototype[@@iterator]` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype-@@iterator
        exportTypedArrayMethod(ITERATOR, typedArrayValues, !CORRECT_ITER_NAME);
      },
      {
        '../internals/array-buffer-view-core': 8,
        '../internals/global': 50,
        '../internals/well-known-symbol': 127,
        '../modules/es.array.iterator': 132
      }
    ],
    165: [
      function (_dereq_, module, exports) {
        'use strict';
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var aTypedArray = ArrayBufferViewCore.aTypedArray;
        var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
        var $join = [
        ].join; // `%TypedArray%.prototype.join` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.join
        // eslint-disable-next-line no-unused-vars
        exportTypedArrayMethod('join', function join(separator) {
          return $join.apply(aTypedArray(this), arguments);
        });
      },
      {
        '../internals/array-buffer-view-core': 8
      }
    ],
    166: [
      function (_dereq_, module, exports) {
        'use strict';
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var $lastIndexOf = _dereq_('../internals/array-last-index-of');
        var aTypedArray = ArrayBufferViewCore.aTypedArray;
        var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.lastIndexOf` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.lastindexof
        // eslint-disable-next-line no-unused-vars
        exportTypedArrayMethod('lastIndexOf', function lastIndexOf(searchElement        /* , fromIndex */
        ) {
          return $lastIndexOf.apply(aTypedArray(this), arguments);
        });
      },
      {
        '../internals/array-buffer-view-core': 8,
        '../internals/array-last-index-of': 15
      }
    ],
    167: [
      function (_dereq_, module, exports) {
        'use strict';
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var $map = _dereq_('../internals/array-iteration').map;
        var speciesConstructor = _dereq_('../internals/species-constructor');
        var aTypedArray = ArrayBufferViewCore.aTypedArray;
        var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
        var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.map` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.map
        exportTypedArrayMethod('map', function map(mapfn        /* , thisArg */
        ) {
          return $map(aTypedArray(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
            return new (aTypedArrayConstructor(speciesConstructor(O, O.constructor))) (length);
          });
        });
      },
      {
        '../internals/array-buffer-view-core': 8,
        '../internals/array-iteration': 14,
        '../internals/species-constructor': 106
      }
    ],
    168: [
      function (_dereq_, module, exports) {
        'use strict';
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var $reduceRight = _dereq_('../internals/array-reduce').right;
        var aTypedArray = ArrayBufferViewCore.aTypedArray;
        var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.reduceRicht` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduceright
        exportTypedArrayMethod('reduceRight', function reduceRight(callbackfn        /* , initialValue */
        ) {
          return $reduceRight(aTypedArray(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
        });
      },
      {
        '../internals/array-buffer-view-core': 8,
        '../internals/array-reduce': 19
      }
    ],
    169: [
      function (_dereq_, module, exports) {
        'use strict';
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var $reduce = _dereq_('../internals/array-reduce').left;
        var aTypedArray = ArrayBufferViewCore.aTypedArray;
        var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.reduce` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduce
        exportTypedArrayMethod('reduce', function reduce(callbackfn        /* , initialValue */
        ) {
          return $reduce(aTypedArray(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
        });
      },
      {
        '../internals/array-buffer-view-core': 8,
        '../internals/array-reduce': 19
      }
    ],
    170: [
      function (_dereq_, module, exports) {
        'use strict';
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var aTypedArray = ArrayBufferViewCore.aTypedArray;
        var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
        var floor = Math.floor; // `%TypedArray%.prototype.reverse` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reverse
        exportTypedArrayMethod('reverse', function reverse() {
          var that = this;
          var length = aTypedArray(that).length;
          var middle = floor(length / 2);
          var index = 0;
          var value;
          while (index < middle) {
            value = that[index];
            that[index++] = that[--length];
            that[length] = value;
          }
          return that;
        });
      },
      {
        '../internals/array-buffer-view-core': 8
      }
    ],
    171: [
      function (_dereq_, module, exports) {
        'use strict';
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var toLength = _dereq_('../internals/to-length');
        var toOffset = _dereq_('../internals/to-offset');
        var toObject = _dereq_('../internals/to-object');
        var fails = _dereq_('../internals/fails');
        var aTypedArray = ArrayBufferViewCore.aTypedArray;
        var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
        var FORCED = fails(function () {
          // eslint-disable-next-line no-undef
          new Int8Array(1).set({
          });
        }); // `%TypedArray%.prototype.set` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.set
        exportTypedArrayMethod('set', function set(arrayLike        /* , offset */
        ) {
          aTypedArray(this);
          var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
          var length = this.length;
          var src = toObject(arrayLike);
          var len = toLength(src.length);
          var index = 0;
          if (len + offset > length) throw RangeError('Wrong length');
          while (index < len) this[offset + index] = src[index++];
        }, FORCED);
      },
      {
        '../internals/array-buffer-view-core': 8,
        '../internals/fails': 43,
        '../internals/to-length': 115,
        '../internals/to-object': 116,
        '../internals/to-offset': 117
      }
    ],
    172: [
      function (_dereq_, module, exports) {
        'use strict';
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var speciesConstructor = _dereq_('../internals/species-constructor');
        var fails = _dereq_('../internals/fails');
        var aTypedArray = ArrayBufferViewCore.aTypedArray;
        var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
        var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
        var $slice = [
        ].slice;
        var FORCED = fails(function () {
          // eslint-disable-next-line no-undef
          new Int8Array(1).slice();
        }); // `%TypedArray%.prototype.slice` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.slice
        exportTypedArrayMethod('slice', function slice(start, end) {
          var list = $slice.call(aTypedArray(this), start, end);
          var C = speciesConstructor(this, this.constructor);
          var index = 0;
          var length = list.length;
          var result = new (aTypedArrayConstructor(C)) (length);
          while (length > index) result[index] = list[index++];
          return result;
        }, FORCED);
      },
      {
        '../internals/array-buffer-view-core': 8,
        '../internals/fails': 43,
        '../internals/species-constructor': 106
      }
    ],
    173: [
      function (_dereq_, module, exports) {
        'use strict';
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var $some = _dereq_('../internals/array-iteration').some;
        var aTypedArray = ArrayBufferViewCore.aTypedArray;
        var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.some` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.some
        exportTypedArrayMethod('some', function some(callbackfn        /* , thisArg */
        ) {
          return $some(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        });
      },
      {
        '../internals/array-buffer-view-core': 8,
        '../internals/array-iteration': 14
      }
    ],
    174: [
      function (_dereq_, module, exports) {
        'use strict';
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var aTypedArray = ArrayBufferViewCore.aTypedArray;
        var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
        var $sort = [
        ].sort; // `%TypedArray%.prototype.sort` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.sort
        exportTypedArrayMethod('sort', function sort(comparefn) {
          return $sort.call(aTypedArray(this), comparefn);
        });
      },
      {
        '../internals/array-buffer-view-core': 8
      }
    ],
    175: [
      function (_dereq_, module, exports) {
        'use strict';
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var toLength = _dereq_('../internals/to-length');
        var toAbsoluteIndex = _dereq_('../internals/to-absolute-index');
        var speciesConstructor = _dereq_('../internals/species-constructor');
        var aTypedArray = ArrayBufferViewCore.aTypedArray;
        var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.subarray` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.subarray
        exportTypedArrayMethod('subarray', function subarray(begin, end) {
          var O = aTypedArray(this);
          var length = O.length;
          var beginIndex = toAbsoluteIndex(begin, length);
          return new (speciesConstructor(O, O.constructor)) (O.buffer, O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex));
        });
      },
      {
        '../internals/array-buffer-view-core': 8,
        '../internals/species-constructor': 106,
        '../internals/to-absolute-index': 111,
        '../internals/to-length': 115
      }
    ],
    176: [
      function (_dereq_, module, exports) {
        'use strict';
        var global = _dereq_('../internals/global');
        var ArrayBufferViewCore = _dereq_('../internals/array-buffer-view-core');
        var fails = _dereq_('../internals/fails');
        var Int8Array = global.Int8Array;
        var aTypedArray = ArrayBufferViewCore.aTypedArray;
        var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
        var $toLocaleString = [
        ].toLocaleString;
        var $slice = [
        ].slice; // iOS Safari 6.x fails here
        var TO_LOCALE_STRING_BUG = !!Int8Array && fails(function () {
          $toLocaleString.call(new Int8Array(1));
        });
        var FORCED = fails(function () {
          return [1,
          2].toLocaleString() != new Int8Array([1,
          2]).toLocaleString();
        }) || !fails(function () {
          Int8Array.prototype.toLocaleString.call([1,
          2]);
        }); // `%TypedArray%.prototype.toLocaleString` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tolocalestring
        exportTypedArrayMethod('toLocaleString', function toLocaleString() {
          return $toLocaleString.apply(TO_LOCALE_STRING_BUG ? $slice.call(aTypedArray(this)) : aTypedArray(this), arguments);
        }, FORCED);
      },
      {
        '../internals/array-buffer-view-core': 8,
        '../internals/fails': 43,
        '../internals/global': 50
      }
    ],
    177: [
      function (_dereq_, module, exports) {
        'use strict';
        var exportTypedArrayMethod = _dereq_('../internals/array-buffer-view-core').exportTypedArrayMethod;
        var fails = _dereq_('../internals/fails');
        var global = _dereq_('../internals/global');
        var Uint8Array = global.Uint8Array;
        var Uint8ArrayPrototype = Uint8Array && Uint8Array.prototype || {
        };
        var arrayToString = [
        ].toString;
        var arrayJoin = [
        ].join;
        if (fails(function () {
          arrayToString.call({
          });
        })) {
          arrayToString = function toString() {
            return arrayJoin.call(this);
          };
        }
        var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString; // `%TypedArray%.prototype.toString` method
        // https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tostring
        exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);
      },
      {
        '../internals/array-buffer-view-core': 8,
        '../internals/fails': 43,
        '../internals/global': 50
      }
    ],
    178: [
      function (_dereq_, module, exports) {
        var createTypedArrayConstructor = _dereq_('../internals/typed-array-constructor'); // `Uint8Array` constructor
        // https://tc39.github.io/ecma262/#sec-typedarray-objects
        createTypedArrayConstructor('Uint8', function (init) {
          return function Uint8Array(data, byteOffset, length) {
            return init(this, data, byteOffset, length);
          };
        });
      },
      {
        '../internals/typed-array-constructor': 121
      }
    ],
    179: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/collection': 26,
        '../internals/collection-weak': 25,
        '../internals/global': 50,
        '../internals/internal-metadata': 60,
        '../internals/internal-state': 61,
        '../internals/is-object': 65,
        '../internals/native-weak-map': 74,
        '../internals/redefine-all': 93
      }
    ],
    180: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/array-for-each': 12,
        '../internals/create-non-enumerable-property': 30,
        '../internals/dom-iterables': 37,
        '../internals/global': 50
      }
    ],
    181: [
      function (_dereq_, module, exports) {
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
      },
      {
        '../internals/create-non-enumerable-property': 30,
        '../internals/dom-iterables': 37,
        '../internals/global': 50,
        '../internals/well-known-symbol': 127,
        '../modules/es.array.iterator': 132
      }
    ],
    182: [
      function (_dereq_, module, exports) {
        /**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
        var runtime = function (exports) {
          'use strict';
          var Op = Object.prototype;
          var hasOwn = Op.hasOwnProperty;
          var undefined; // More compressible than void 0.
          var $Symbol = typeof Symbol === 'function' ? Symbol : {
          };
          var iteratorSymbol = $Symbol.iterator || '@@iterator';
          var asyncIteratorSymbol = $Symbol.asyncIterator || '@@asyncIterator';
          var toStringTagSymbol = $Symbol.toStringTag || '@@toStringTag';
          function wrap(innerFn, outerFn, self, tryLocsList) {
            // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
            var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
            var generator = Object.create(protoGenerator.prototype);
            var context = new Context(tryLocsList || [
            ]); // The ._invoke method unifies the implementations of the .next,
            // .throw, and .return methods.
            generator._invoke = makeInvokeMethod(innerFn, self, context);
            return generator;
          }
          exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
          // record like context.tryEntries[i].completion. This interface could
          // have been (and was previously) designed to take a closure to be
          // invoked without arguments, but in all the cases we care about we
          // already have an existing method we want to call, so there's no need
          // to create a new function object. We can even get away with assuming
          // the method takes exactly one argument, since that happens to be true
          // in every case, so we don't have to touch the arguments object. The
          // only additional allocation required is the completion record, which
          // has a stable shape and so hopefully should be cheap to allocate.
          function tryCatch(fn, obj, arg) {
            try {
              return {
                type: 'normal',
                arg: fn.call(obj, arg)
              };
            } catch (err) {
              return {
                type: 'throw',
                arg: err
              };
            }
          }
          var GenStateSuspendedStart = 'suspendedStart';
          var GenStateSuspendedYield = 'suspendedYield';
          var GenStateExecuting = 'executing';
          var GenStateCompleted = 'completed'; // Returning this object from the innerFn has the same effect as
          // breaking out of the dispatch switch statement.
          var ContinueSentinel = {
          }; // Dummy constructor functions that we use as the .constructor and
          // .constructor.prototype properties for functions that return Generator
          // objects. For full spec compliance, you may wish to configure your
          // minifier not to mangle the names of these two functions.
          function Generator() {
          }
          function GeneratorFunction() {
          }
          function GeneratorFunctionPrototype() {
          } // This is a polyfill for %IteratorPrototype% for environments that
          // don't natively support it.

          var IteratorPrototype = {
          };
          IteratorPrototype[iteratorSymbol] = function () {
            return this;
          };
          var getProto = Object.getPrototypeOf;
          var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
          if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
            // This environment has a native %IteratorPrototype%; use it instead
            // of the polyfill.
            IteratorPrototype = NativeIteratorPrototype;
          }
          var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
          GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
          GeneratorFunctionPrototype.constructor = GeneratorFunction;
          GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = 'GeneratorFunction'; // Helper for defining the .next, .throw, and .return methods of the
          // Iterator interface in terms of a single ._invoke method.
          function defineIteratorMethods(prototype) {
            [
              'next',
              'throw',
              'return'
            ].forEach(function (method) {
              prototype[method] = function (arg) {
                return this._invoke(method, arg);
              };
            });
          }
          exports.isGeneratorFunction = function (genFun) {
            var ctor = typeof genFun === 'function' && genFun.constructor;
            return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
            // do is to check its .name property.
            (ctor.displayName || ctor.name) === 'GeneratorFunction' : false;
          };
          exports.mark = function (genFun) {
            if (Object.setPrototypeOf) {
              Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
            } else {
              genFun.__proto__ = GeneratorFunctionPrototype;
              if (!(toStringTagSymbol in genFun)) {
                genFun[toStringTagSymbol] = 'GeneratorFunction';
              }
            }
            genFun.prototype = Object.create(Gp);
            return genFun;
          }; // Within the body of any async function, `await x` is transformed to
          // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
          // `hasOwn.call(value, "__await")` to determine if the yielded value is
          // meant to be awaited.
          exports.awrap = function (arg) {
            return {
              __await: arg
            };
          };
          function AsyncIterator(generator) {
            function invoke(method, arg, resolve, reject) {
              var record = tryCatch(generator[method], generator, arg);
              if (record.type === 'throw') {
                reject(record.arg);
              } else {
                var result = record.arg;
                var value = result.value;
                if (value && typeof value === 'object' && hasOwn.call(value, '__await')) {
                  return Promise.resolve(value.__await).then(function (value) {
                    invoke('next', value, resolve, reject);
                  }, function (err) {
                    invoke('throw', err, resolve, reject);
                  });
                }
                return Promise.resolve(value).then(function (unwrapped) {
                  // When a yielded Promise is resolved, its final value becomes
                  // the .value of the Promise<{value,done}> result for the
                  // current iteration.
                  result.value = unwrapped;
                  resolve(result);
                }, function (error) {
                  // If a rejected Promise was yielded, throw the rejection back
                  // into the async generator function so it can be handled there.
                  return invoke('throw', error, resolve, reject);
                });
              }
            }
            var previousPromise;
            function enqueue(method, arg) {
              function callInvokeWithMethodAndArg() {
                return new Promise(function (resolve, reject) {
                  invoke(method, arg, resolve, reject);
                });
              }
              return previousPromise = // If enqueue has been called before, then we want to wait until
              // all previous Promises have been resolved before calling invoke,
              // so that results are always delivered in the correct order. If
              // enqueue has not been called before, then it is important to
              // call invoke immediately, without waiting on a callback to fire,
              // so that the async generator function has the opportunity to do
              // any necessary setup in a predictable way. This predictability
              // is why the Promise constructor synchronously invokes its
              // executor callback, and why async functions synchronously
              // execute code before the first await. Since we implement simple
              // async functions in terms of async generators, it is especially
              // important to get this right, even though it requires care.
              previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
              // invocations of the iterator.
              callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            } // Define the unified helper method that is used to implement .next,
            // .throw, and .return (see defineIteratorMethods).

            this._invoke = enqueue;
          }
          defineIteratorMethods(AsyncIterator.prototype);
          AsyncIterator.prototype[asyncIteratorSymbol] = function () {
            return this;
          };
          exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
          // AsyncIterator objects; they just return a Promise for the value of
          // the final result produced by the iterator.
          exports.async = function (innerFn, outerFn, self, tryLocsList) {
            var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
            return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
             : iter.next().then(function (result) {
              return result.done ? result.value : iter.next();
            });
          };
          function makeInvokeMethod(innerFn, self, context) {
            var state = GenStateSuspendedStart;
            return function invoke(method, arg) {
              if (state === GenStateExecuting) {
                throw new Error('Generator is already running');
              }
              if (state === GenStateCompleted) {
                if (method === 'throw') {
                  throw arg;
                } // Be forgiving, per 25.3.3.3.3 of the spec:
                // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume

                return doneResult();
              }
              context.method = method;
              context.arg = arg;
              while (true) {
                var delegate = context.delegate;
                if (delegate) {
                  var delegateResult = maybeInvokeDelegate(delegate, context);
                  if (delegateResult) {
                    if (delegateResult === ContinueSentinel) continue;
                    return delegateResult;
                  }
                }
                if (context.method === 'next') {
                  // Setting context._sent for legacy support of Babel's
                  // function.sent implementation.
                  context.sent = context._sent = context.arg;
                } else if (context.method === 'throw') {
                  if (state === GenStateSuspendedStart) {
                    state = GenStateCompleted;
                    throw context.arg;
                  }
                  context.dispatchException(context.arg);
                } else if (context.method === 'return') {
                  context.abrupt('return', context.arg);
                }
                state = GenStateExecuting;
                var record = tryCatch(innerFn, self, context);
                if (record.type === 'normal') {
                  // If an exception is thrown from innerFn, we leave state ===
                  // GenStateExecuting and loop back for another invocation.
                  state = context.done ? GenStateCompleted : GenStateSuspendedYield;
                  if (record.arg === ContinueSentinel) {
                    continue;
                  }
                  return {
                    value: record.arg,
                    done: context.done
                  };
                } else if (record.type === 'throw') {
                  state = GenStateCompleted; // Dispatch the exception by looping back around to the
                  // context.dispatchException(context.arg) call above.
                  context.method = 'throw';
                  context.arg = record.arg;
                }
              }
            };
          } // Call delegate.iterator[context.method](context.arg) and handle the
          // result, either by returning a { value, done } result from the
          // delegate iterator, or by modifying context.method and context.arg,
          // setting context.delegate to null, and returning the ContinueSentinel.

          function maybeInvokeDelegate(delegate, context) {
            var method = delegate.iterator[context.method];
            if (method === undefined) {
              // A .throw or .return when the delegate iterator has no .throw
              // method always terminates the yield* loop.
              context.delegate = null;
              if (context.method === 'throw') {
                // Note: ["return"] must be used for ES3 parsing compatibility.
                if (delegate.iterator['return']) {
                  // If the delegate iterator has a return method, give it a
                  // chance to clean up.
                  context.method = 'return';
                  context.arg = undefined;
                  maybeInvokeDelegate(delegate, context);
                  if (context.method === 'throw') {
                    // If maybeInvokeDelegate(context) changed context.method from
                    // "return" to "throw", let that override the TypeError below.
                    return ContinueSentinel;
                  }
                }
                context.method = 'throw';
                context.arg = new TypeError('The iterator does not provide a \'throw\' method');
              }
              return ContinueSentinel;
            }
            var record = tryCatch(method, delegate.iterator, context.arg);
            if (record.type === 'throw') {
              context.method = 'throw';
              context.arg = record.arg;
              context.delegate = null;
              return ContinueSentinel;
            }
            var info = record.arg;
            if (!info) {
              context.method = 'throw';
              context.arg = new TypeError('iterator result is not an object');
              context.delegate = null;
              return ContinueSentinel;
            }
            if (info.done) {
              // Assign the result of the finished delegate to the temporary
              // variable specified by delegate.resultName (see delegateYield).
              context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).
              context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
              // exception, let the outer generator proceed normally. If
              // context.method was "next", forget context.arg since it has been
              // "consumed" by the delegate iterator. If context.method was
              // "return", allow the original .return call to continue in the
              // outer generator.
              if (context.method !== 'return') {
                context.method = 'next';
                context.arg = undefined;
              }
            } else {
              // Re-yield the result returned by the delegate method.
              return info;
            } // The delegate iterator is finished, so forget it and continue with
            // the outer generator.

            context.delegate = null;
            return ContinueSentinel;
          } // Define Generator.prototype.{next,throw,return} in terms of the
          // unified ._invoke helper method.

          defineIteratorMethods(Gp);
          Gp[toStringTagSymbol] = 'Generator'; // A Generator should always return itself as the iterator object when the
          // @@iterator function is called on it. Some browsers' implementations of the
          // iterator prototype chain incorrectly implement this, causing the Generator
          // object to not be returned from this call. This ensures that doesn't happen.
          // See https://github.com/facebook/regenerator/issues/274 for more details.
          Gp[iteratorSymbol] = function () {
            return this;
          };
          Gp.toString = function () {
            return '[object Generator]';
          };
          function pushTryEntry(locs) {
            var entry = {
              tryLoc: locs[0]
            };
            if (1 in locs) {
              entry.catchLoc = locs[1];
            }
            if (2 in locs) {
              entry.finallyLoc = locs[2];
              entry.afterLoc = locs[3];
            }
            this.tryEntries.push(entry);
          }
          function resetTryEntry(entry) {
            var record = entry.completion || {
            };
            record.type = 'normal';
            delete record.arg;
            entry.completion = record;
          }
          function Context(tryLocsList) {
            // The root entry object (effectively a try statement without a catch
            // or a finally block) gives us a place to store values thrown from
            // locations where there is no enclosing try statement.
            this.tryEntries = [
              {
                tryLoc: 'root'
              }
            ];
            tryLocsList.forEach(pushTryEntry, this);
            this.reset(true);
          }
          exports.keys = function (object) {
            var keys = [
            ];
            for (var key in object) {
              keys.push(key);
            }
            keys.reverse(); // Rather than returning an object with a next method, we keep
            // things simple and return the next function itself.
            return function next() {
              while (keys.length) {
                var key = keys.pop();
                if (key in object) {
                  next.value = key;
                  next.done = false;
                  return next;
                }
              } // To avoid creating an additional object, we just hang the .value
              // and .done properties off the next function object itself. This
              // also ensures that the minifier will not anonymize the function.

              next.done = true;
              return next;
            };
          };
          function values(iterable) {
            if (iterable) {
              var iteratorMethod = iterable[iteratorSymbol];
              if (iteratorMethod) {
                return iteratorMethod.call(iterable);
              }
              if (typeof iterable.next === 'function') {
                return iterable;
              }
              if (!isNaN(iterable.length)) {
                var i = - 1,
                next = function next() {
                  while (++i < iterable.length) {
                    if (hasOwn.call(iterable, i)) {
                      next.value = iterable[i];
                      next.done = false;
                      return next;
                    }
                  }
                  next.value = undefined;
                  next.done = true;
                  return next;
                };
                return next.next = next;
              }
            } // Return an iterator with no values.

            return {
              next: doneResult
            };
          }
          exports.values = values;
          function doneResult() {
            return {
              value: undefined,
              done: true
            };
          }
          Context.prototype = {
            constructor: Context,
            reset: function (skipTempReset) {
              this.prev = 0;
              this.next = 0; // Resetting context._sent for legacy support of Babel's
              // function.sent implementation.
              this.sent = this._sent = undefined;
              this.done = false;
              this.delegate = null;
              this.method = 'next';
              this.arg = undefined;
              this.tryEntries.forEach(resetTryEntry);
              if (!skipTempReset) {
                for (var name in this) {
                  // Not sure about the optimal order of these conditions:
                  if (name.charAt(0) === 't' && hasOwn.call(this, name) && !isNaN( + name.slice(1))) {
                    this[name] = undefined;
                  }
                }
              }
            },
            stop: function () {
              this.done = true;
              var rootEntry = this.tryEntries[0];
              var rootRecord = rootEntry.completion;
              if (rootRecord.type === 'throw') {
                throw rootRecord.arg;
              }
              return this.rval;
            },
            dispatchException: function (exception) {
              if (this.done) {
                throw exception;
              }
              var context = this;
              function handle(loc, caught) {
                record.type = 'throw';
                record.arg = exception;
                context.next = loc;
                if (caught) {
                  // If the dispatched exception was caught by a catch block,
                  // then let that catch block handle the exception normally.
                  context.method = 'next';
                  context.arg = undefined;
                }
                return !!caught;
              }
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                var record = entry.completion;
                if (entry.tryLoc === 'root') {
                  // Exception thrown outside of any try block that could handle
                  // it, so set the completion value of the entire function to
                  // throw the exception.
                  return handle('end');
                }
                if (entry.tryLoc <= this.prev) {
                  var hasCatch = hasOwn.call(entry, 'catchLoc');
                  var hasFinally = hasOwn.call(entry, 'finallyLoc');
                  if (hasCatch && hasFinally) {
                    if (this.prev < entry.catchLoc) {
                      return handle(entry.catchLoc, true);
                    } else if (this.prev < entry.finallyLoc) {
                      return handle(entry.finallyLoc);
                    }
                  } else if (hasCatch) {
                    if (this.prev < entry.catchLoc) {
                      return handle(entry.catchLoc, true);
                    }
                  } else if (hasFinally) {
                    if (this.prev < entry.finallyLoc) {
                      return handle(entry.finallyLoc);
                    }
                  } else {
                    throw new Error('try statement without catch or finally');
                  }
                }
              }
            },
            abrupt: function (type, arg) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, 'finallyLoc') && this.prev < entry.finallyLoc) {
                  var finallyEntry = entry;
                  break;
                }
              }
              if (finallyEntry && (type === 'break' || type === 'continue') && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
                // Ignore the finally entry if control is not jumping to a
                // location outside the try/catch block.
                finallyEntry = null;
              }
              var record = finallyEntry ? finallyEntry.completion : {
              };
              record.type = type;
              record.arg = arg;
              if (finallyEntry) {
                this.method = 'next';
                this.next = finallyEntry.finallyLoc;
                return ContinueSentinel;
              }
              return this.complete(record);
            },
            complete: function (record, afterLoc) {
              if (record.type === 'throw') {
                throw record.arg;
              }
              if (record.type === 'break' || record.type === 'continue') {
                this.next = record.arg;
              } else if (record.type === 'return') {
                this.rval = this.arg = record.arg;
                this.method = 'return';
                this.next = 'end';
              } else if (record.type === 'normal' && afterLoc) {
                this.next = afterLoc;
              }
              return ContinueSentinel;
            },
            finish: function (finallyLoc) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) {
                  this.complete(entry.completion, entry.afterLoc);
                  resetTryEntry(entry);
                  return ContinueSentinel;
                }
              }
            },
            'catch': function (tryLoc) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                  var record = entry.completion;
                  if (record.type === 'throw') {
                    var thrown = record.arg;
                    resetTryEntry(entry);
                  }
                  return thrown;
                }
              } // The context.catch method must only be called with a location
              // argument that corresponds to a known catch block.

              throw new Error('illegal catch attempt');
            },
            delegateYield: function (iterable, resultName, nextLoc) {
              this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
              };
              if (this.method === 'next') {
                // Deliberately forget the last sent value so that we don't
                // accidentally pass it on to the delegate.
                this.arg = undefined;
              }
              return ContinueSentinel;
            }
          }; // Regardless of whether this script is executing as a CommonJS module
          // or not, return the runtime object so that we can declare the variable
          // regeneratorRuntime in the outer scope, which allows this module to be
          // injected easily by `bin/regenerator --include-runtime script.js`.
          return exports;
        }( // If this script is executing as a CommonJS module, use module.exports
        // as the regeneratorRuntime namespace. Otherwise create a new empty
        // object. Either way, the resulting object will be used to initialize
        // the regeneratorRuntime variable at the top of this file.
        typeof module === 'object' ? module.exports : {
        });
        try {
          regeneratorRuntime = runtime;
        } catch (accidentalStrictMode) {
          // This module should not be running in strict mode, so the above
          // assignment should always work unless something is misconfigured. Just
          // in case runtime.js accidentally runs in strict mode, we can escape
          // strict mode using a global Function call. This could conceivably fail
          // if a Content Security Policy forbids using Function, but in that case
          // the proper solution is to fix the accidental strict mode problem. If
          // you've misconfigured your bundler to force strict mode and applied a
          // CSP to forbid Function, and you're not willing to fix either of those
          // problems, please detail your unique predicament in a GitHub issue.
          Function('r', 'regeneratorRuntime = r') (runtime);
        }
      },
      {
      }
    ],
    183: [
      function (_dereq_, module, exports) {
        'use strict';
        _dereq_('core-js/modules/es.array.index-of');
        _dereq_('core-js/modules/es.array.splice');
        _dereq_('core-js/modules/es.function.name');
        _dereq_('core-js/modules/es.array.index-of');
        _dereq_('core-js/modules/es.array.splice');
        _dereq_('core-js/modules/es.function.name');
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _main = _interopRequireDefault(_dereq_('./main'));
        var _helpers = _dereq_('./helpers');
        var _processorNames = _interopRequireDefault(_dereq_('./audioWorklet/processorNames'));
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }        /**
 *  Amplitude measures volume between 0.0 and 1.0.
 *  Listens to all p5sound by default, or use setInput()
 *  to listen to a specific sound source. Accepts an optional
 *  smoothing value, which defaults to 0.
 *
 *  @class p5sound.Amplitude
 *  @constructor
 *  @param {Number} [smoothing] between 0.0 and .999 to smooth
 *                             amplitude readings (defaults to 0)
 *  @example
 *  <div><code>
 *  let sound, amplitude;
 *
 *  function preload(){
 *    sound = loadSound('assets/beat.mp3');
 *  }
 *  function setup() {
 *    let cnv = createCanvas(100,100);
 *    cnv.mouseClicked(togglePlay);
 *    amplitude = new p5.Amplitude();
 *  }
 *
 *  function draw() {
 *    background(220);
 *    text('tap to play', 20, 20);
 *
 *    let level = amplitude.getLevel();
 *    let size = map(level, 0, 1, 0, 200);
 *    ellipse(width/2, height/2, size, size);
 *  }
 *
 *  function togglePlay() {
 *    if (sound.isPlaying() ){
 *      sound.pause();
 *    } else {
 *      sound.loop();
 *		amplitude = new p5.Amplitude();
 *		amplitude.setInput(sound);
 *    }
 *  }
 *
 *  </code></div>
 */

        var Amplitude =        /*#__PURE__*/
        function () {
          function Amplitude(smoothing) {
            _classCallCheck(this, Amplitude); // Set to 2048 for now. In future iterations, this should be inherited or parsed from p5sound's default
            this.bufferSize = (0, _helpers.safeBufferSize) (2048); // set audio context
            this.audiocontext = _audioContext.default;
            this._workletNode = new AudioWorkletNode(this.audiocontext, _processorNames.default.amplitudeProcessor, {
              outputChannelCount: [
                1
              ],
              parameterData: {
                smoothing: smoothing || 0
              },
              processorOptions: {
                normalize: false,
                smoothing: smoothing || 0,
                numInputChannels: 2,
                bufferSize: this.bufferSize
              }
            });
            this._workletNode.port.onmessage = function (event) {
              if (event.data.name === 'amplitude') {
                this.volume = event.data.volume;
                this.volNorm = event.data.volNorm;
                this.stereoVol = event.data.stereoVol;
                this.stereoVolNorm = event.data.stereoVolNorm;
              }
            }.bind(this); // for connections
            this.input = this._workletNode;
            this.output = this.audiocontext.createGain(); // the variables to return
            this.volume = 0;
            this.volNorm = 0;
            this.stereoVol = [
              0,
              0
            ];
            this.stereoVolNorm = [
              0,
              0
            ];
            this.normalize = false;
            this._workletNode.connect(this.output);
            this.output.gain.value = 0; // this may only be necessary because of a Chrome bug
            this.output.connect(this.audiocontext.destination); // connect to p5sound main output by default, unless set by input()
            _main.default.meter.connect(this._workletNode); // add this p5.SoundFile to the soundArray
            _main.default.soundArray.push(this);
          }          /**
   *  Connects to the p5sound instance (main output) by default.
   *  Optionally, you can pass in a specific source (i.e. a soundfile).
   *
   *  @method setInput
   *  @for p5.Amplitude
   *  @param {soundObject|undefined} [snd] set the sound source
   *                                       (optional, defaults to
   *                                       main output)
   *  @param {Number|undefined} [smoothing] a range between 0.0 and 1.0
   *                                        to smooth amplitude readings
   *  @example
   *  <div><code>
   *  function preload(){
   *    sound1 = loadSound('assets/beat.mp3');
   *    sound2 = loadSound('assets/drum.mp3');
   *  }
   *  function setup(){
   *    cnv = createCanvas(100, 100);
   *    cnv.mouseClicked(toggleSound);
   *
   *    amplitude = new p5.Amplitude();
   *    amplitude.setInput(sound2);
   *  }
   *
   *  function draw() {
   *    background(220);
   *    text('tap to play', 20, 20);
   *
   *    let level = amplitude.getLevel();
   *    let size = map(level, 0, 1, 0, 200);
   *    ellipse(width/2, height/2, size, size);
   *  }
   *
   *  function toggleSound(){
   *    if (sound1.isPlaying() && sound2.isPlaying()) {
   *      sound1.stop();
   *      sound2.stop();
   *    } else {
   *      sound1.play();
   *      sound2.play();
   *    }
   *  }
   *  </code></div>
   */

          _createClass(Amplitude, [
            {
              key: 'setInput',
              value: function setInput(source, smoothing) {
                _main.default.meter.disconnect();
                if (smoothing) {
                  this._workletNode.parameters.get('smoothing').value = smoothing;
                } // connect to the master out of p5s instance if no snd is provided

                if (source == null) {
                  console.log('Amplitude input source is not ready! Connecting to main output instead');
                  _main.default.meter.connect(this._workletNode);
                } // connect to the sound if it is available
                 else if (source) {
                  source.connect(this._workletNode);
                  this._workletNode.disconnect();
                  this._workletNode.connect(this.output);
                } // otherwise, connect to the master out of p5s instance (default)
                 else {
                  _main.default.meter.connect(this._workletNode);
                }
              }              /**
     *  Returns a single Amplitude reading at the moment it is called.
     *  For continuous readings, run in the draw loop.
     *
     *  @method getLevel
     *  @for p5.Amplitude
     *  @param {Number} [channel] Optionally return only channel 0 (left) or 1 (right)
     *  @return {Number}       Amplitude as a number between 0.0 and 1.0
     *  @example
     *  <div><code>
     *  function preload(){
     *    sound = loadSound('assets/beat.mp3');
     *  }
     *
     *  function setup() {
     *    let cnv = createCanvas(100, 100);
     *    cnv.mouseClicked(toggleSound);
     *    amplitude = new p5.Amplitude();
     *  }
     *
     *  function draw() {
     *    background(220, 150);
     *    textAlign(CENTER);
     *    text('tap to play', width/2, 20);
     *
     *    let level = amplitude.getLevel();
     *    let size = map(level, 0, 1, 0, 200);
     *    ellipse(width/2, height/2, size, size);
     *  }
     *
     *  function toggleSound(){
     *    if (sound.isPlaying()) {
     *      sound.stop();
     *    } else {
     *      sound.play();
     *    }
     *  }
     *  </code></div>
     */

            },
            {
              key: 'getLevel',
              value: function getLevel(channel) {
                if (typeof channel !== 'undefined') {
                  if (this.normalize) {
                    return this.stereoVolNorm[channel];
                  } else {
                    return this.stereoVol[channel];
                  }
                } else if (this.normalize) {
                  return this.volNorm;
                } else {
                  return this.volume;
                }
              }              /**
     * Determines whether the results of Amplitude.process() will be
     * Normalized. To normalize, Amplitude finds the difference the
     * loudest reading it has processed and the maximum amplitude of
     * 1.0. Amplitude adds this difference to all values to produce
     * results that will reliably map between 0.0 and 1.0. However,
     * if a louder moment occurs, the amount that Normalize adds to
     * all the values will change. Accepts an optional boolean parameter
     * (true or false). Normalizing is off by default.
     *
     * @method toggleNormalize
     * @for p5.Amplitude
     * @param {boolean} [boolean] set normalize to true (1) or false (0)
     */

            },
            {
              key: 'toggleNormalize',
              value: function toggleNormalize(bool) {
                if (typeof bool === 'boolean') {
                  this.normalize = bool;
                } else {
                  this.normalize = !this.normalize;
                }
                this._workletNode.port.postMessage({
                  name: 'toggleNormalize',
                  normalize: this.normalize
                });
              }              /**
     *  Smooth Amplitude analysis by averaging with the last analysis
     *  frame. Off by default.
     *
     *  @method smooth
     *  @for p5.Amplitude
     *  @param {Number} set smoothing from 0.0 <= 1
     */

            },
            {
              key: 'smooth',
              value: function smooth(s) {
                if (s >= 0 && s < 1) {
                  this._workletNode.port.postMessage({
                    name: 'smoothing',
                    smoothing: s
                  });
                } else {
                  console.log('Error: smoothing must be between 0 and 1');
                }
              }
            },
            {
              key: 'dispose',
              value: function dispose() {
                // remove reference from soundArray
                var index = _main.default.soundArray.indexOf(this);
                _main.default.soundArray.splice(index, 1);
                if (this.input) {
                  this.input.disconnect();
                  delete this.input;
                }
                if (this.output) {
                  this.output.disconnect();
                  delete this.output;
                }
                this._workletNode.disconnect();
                delete this._workletNode;
              }
            }
          ]);
          return Amplitude;
        }();
        var _default = Amplitude;
        exports.default = _default;
      },
      {
        './audioContext': 213,
        './audioWorklet/processorNames': 214,
        './helpers': 217,
        './main': 218,
        'core-js/modules/es.array.index-of': 131,
        'core-js/modules/es.array.splice': 136,
        'core-js/modules/es.function.name': 137
      }
    ],
    184: [
      function (_dereq_, module, exports) {
        'use strict';
        _dereq_('core-js/modules/es.array.index-of');
        _dereq_('core-js/modules/es.array.iterator');
        _dereq_('core-js/modules/es.array.map');
        _dereq_('core-js/modules/es.array.splice');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.typed-array.float32-array');
        _dereq_('core-js/modules/es.typed-array.uint8-array');
        _dereq_('core-js/modules/es.typed-array.copy-within');
        _dereq_('core-js/modules/es.typed-array.every');
        _dereq_('core-js/modules/es.typed-array.fill');
        _dereq_('core-js/modules/es.typed-array.filter');
        _dereq_('core-js/modules/es.typed-array.find');
        _dereq_('core-js/modules/es.typed-array.find-index');
        _dereq_('core-js/modules/es.typed-array.for-each');
        _dereq_('core-js/modules/es.typed-array.includes');
        _dereq_('core-js/modules/es.typed-array.index-of');
        _dereq_('core-js/modules/es.typed-array.iterator');
        _dereq_('core-js/modules/es.typed-array.join');
        _dereq_('core-js/modules/es.typed-array.last-index-of');
        _dereq_('core-js/modules/es.typed-array.map');
        _dereq_('core-js/modules/es.typed-array.reduce');
        _dereq_('core-js/modules/es.typed-array.reduce-right');
        _dereq_('core-js/modules/es.typed-array.reverse');
        _dereq_('core-js/modules/es.typed-array.set');
        _dereq_('core-js/modules/es.typed-array.slice');
        _dereq_('core-js/modules/es.typed-array.some');
        _dereq_('core-js/modules/es.typed-array.sort');
        _dereq_('core-js/modules/es.typed-array.subarray');
        _dereq_('core-js/modules/es.typed-array.to-locale-string');
        _dereq_('core-js/modules/es.typed-array.to-string');
        _dereq_('core-js/modules/es.array.index-of');
        _dereq_('core-js/modules/es.array.iterator');
        _dereq_('core-js/modules/es.array.map');
        _dereq_('core-js/modules/es.array.splice');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.typed-array.float32-array');
        _dereq_('core-js/modules/es.typed-array.uint8-array');
        _dereq_('core-js/modules/es.typed-array.copy-within');
        _dereq_('core-js/modules/es.typed-array.every');
        _dereq_('core-js/modules/es.typed-array.fill');
        _dereq_('core-js/modules/es.typed-array.filter');
        _dereq_('core-js/modules/es.typed-array.find');
        _dereq_('core-js/modules/es.typed-array.find-index');
        _dereq_('core-js/modules/es.typed-array.for-each');
        _dereq_('core-js/modules/es.typed-array.includes');
        _dereq_('core-js/modules/es.typed-array.index-of');
        _dereq_('core-js/modules/es.typed-array.iterator');
        _dereq_('core-js/modules/es.typed-array.join');
        _dereq_('core-js/modules/es.typed-array.last-index-of');
        _dereq_('core-js/modules/es.typed-array.map');
        _dereq_('core-js/modules/es.typed-array.reduce');
        _dereq_('core-js/modules/es.typed-array.reduce-right');
        _dereq_('core-js/modules/es.typed-array.reverse');
        _dereq_('core-js/modules/es.typed-array.set');
        _dereq_('core-js/modules/es.typed-array.slice');
        _dereq_('core-js/modules/es.typed-array.some');
        _dereq_('core-js/modules/es.typed-array.sort');
        _dereq_('core-js/modules/es.typed-array.subarray');
        _dereq_('core-js/modules/es.typed-array.to-locale-string');
        _dereq_('core-js/modules/es.typed-array.to-string');
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        var _main = _interopRequireDefault(_dereq_('./main'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }        /**
 *  <p>FFT (Fast Fourier Transform) is an analysis algorithm that
 *  isolates individual
 *  <a href="https://en.wikipedia.org/wiki/Audio_frequency">
 *  audio frequencies</a> within a waveform.</p>
 *
 *  <p>Once instantiated, a p5.FFT object can return an array based on
 *  two types of analyses: <br> • <code>FFT.waveform()</code> computes
 *  amplitude values along the time domain. The array indices correspond
 *  to samples across a brief moment in time. Each value represents
 *  amplitude of the waveform at that sample of time.<br>
 *  • <code>FFT.analyze() </code> computes amplitude values along the
 *  frequency domain. The array indices correspond to frequencies (i.e.
 *  pitches), from the lowest to the highest that humans can hear. Each
 *  value represents amplitude at that slice of the frequency spectrum.
 *  Use with <code>getEnergy()</code> to measure amplitude at specific
 *  frequencies, or within a range of frequencies. </p>
 *
 *  <p>FFT analyzes a very short snapshot of sound called a sample
 *  buffer. It returns an array of amplitude measurements, referred
 *  to as <code>bins</code>. The array is 1024 bins long by default.
 *  You can change the bin array length, but it must be a power of 2
 *  between 16 and 1024 in order for the FFT algorithm to function
 *  correctly. The actual size of the FFT buffer is twice the
 *  number of bins, so given a standard sample rate, the buffer is
 *  2048/44100 seconds long.</p>
 *
 *
 *  @class p5sound.AnalyzerFFT
 *  @constructor
 *  @param {Number} [smoothing]   Smooth results of Freq Spectrum.
 *                                0.0 < smoothing < 1.0.
 *                                Defaults to 0.8.
 *  @param {Number} [bins]    Length of resulting array.
 *                            Must be a power of two between
 *                            16 and 1024. Defaults to 1024.
 *  @example
 *  <div><code>
 *  function preload(){
 *    sound = loadSound('assets/Damscray_DancingTiger.mp3');
 *  }
 *
 *  function setup(){
 *    let cnv = createCanvas(100,100);
 *    cnv.mouseClicked(togglePlay);
 *    fft = new p5.FFT();
 *    sound.amp(0.2);
 *  }
 *
 *  function draw(){
 *    background(220);
 *
 *    let spectrum = fft.analyze();
 *    noStroke();
 *    fill(255, 0, 255);
 *    for (let i = 0; i< spectrum.length; i++){
 *      let x = map(i, 0, spectrum.length, 0, width);
 *      let h = -height + map(spectrum[i], 0, 255, height, 0);
 *      rect(x, height, width / spectrum.length, h )
 *    }
 *
 *    let waveform = fft.waveform();
 *    noFill();
 *    beginShape();
 *    stroke(20);
 *    for (let i = 0; i < waveform.length; i++){
 *      let x = map(i, 0, waveform.length, 0, width);
 *      let y = map( waveform[i], -1, 1, 0, height);
 *      vertex(x,y);
 *    }
 *    endShape();
 *
 *    text('tap to play', 20, 20);
 *  }
 *
 *  function togglePlay() {
 *    if (sound.isPlaying()) {
 *      sound.pause();
 *    } else {
 *      sound.loop();
 *    }
 *  }
 *  </code></div>
 */

        var AnalyzerFFT =        /*#__PURE__*/
        function () {
          function AnalyzerFFT(smoothing, bins) {
            _classCallCheck(this, AnalyzerFFT);
            this.input = this.analyser = _audioContext.default.createAnalyser();
            Object.defineProperties(this, {
              bins: {
                get: function get() {
                  return this.analyser.fftSize / 2;
                },
                set: function set(b) {
                  this.analyser.fftSize = b * 2;
                },
                configurable: true,
                enumerable: true
              },
              smoothing: {
                get: function get() {
                  return this.analyser.smoothingTimeConstant;
                },
                set: function set(s) {
                  this.analyser.smoothingTimeConstant = s;
                },
                configurable: true,
                enumerable: true
              }
            }); // set default smoothing and bins
            this.smooth(smoothing);
            this.bins = bins || 1024; // default connections to p5sound fftMeter
            _main.default.fftMeter.connect(this.analyser);
            this.freqDomain = new Uint8Array(this.analyser.frequencyBinCount);
            this.timeDomain = new Uint8Array(this.analyser.frequencyBinCount); // predefined frequency ranges, these will be tweakable
            this.bass = [
              20,
              140
            ];
            this.lowMid = [
              140,
              400
            ];
            this.mid = [
              400,
              2600
            ];
            this.highMid = [
              2600,
              5200
            ];
            this.treble = [
              5200,
              14000
            ]; // add this p5.SoundFile to the soundArray
            _main.default.soundArray.push(this);
          }          /**
   *  Set the input source for the FFT analysis. If no source is
   *  provided, FFT will analyze all sound in the sketch.
   *
   *  @method  setInput
   *  @for p5.FFT
   *  @param {Object} [source] p5.sound object (or web audio API source node)
   */

          _createClass(AnalyzerFFT, [
            {
              key: 'setInput',
              value: function setInput(source) {
                if (!source) {
                  _main.default.fftMeter.connect(this.analyser);
                } else {
                  if (source.output) {
                    source.output.connect(this.analyser);
                  } else if (source.connect) {
                    source.connect(this.analyser);
                  }
                  _main.default.fftMeter.disconnect();
                }
              }              /**
     *  Returns an array of amplitude values (between -1.0 and +1.0) that represent
     *  a snapshot of amplitude readings in a single buffer. Length will be
     *  equal to bins (defaults to 1024). Can be used to draw the waveform
     *  of a sound.
     *
     *  @method waveform
     *  @for p5.FFT
     *  @param {Number} [bins]    Must be a power of two between
     *                            16 and 1024. Defaults to 1024.
     *  @param {String} [precision] If any value is provided, will return results
     *                              in a Float32 Array which is more precise
     *                              than a regular array.
     *  @return {Array}  Array    Array of amplitude values (-1 to 1)
     *                            over time. Array length = bins.
     *
     */

            },
            {
              key: 'waveform',
              value: function waveform() {
                var mode;
                var normalArray = new Array();
                for (var i = 0; i < arguments.length; i++) {
                  if (typeof arguments[i] === 'number') {
                    this.bins = arguments[i];
                  }
                  if (typeof arguments[i] === 'string') {
                    mode = arguments[i];
                  }
                } // getFloatFrequencyData doesnt work in Safari as of 5/2015

                if (mode && !p5.prototype._isSafari()) {
                  timeToFloat(this, this.timeDomain);
                  this.analyser.getFloatTimeDomainData(this.timeDomain);
                  return this.timeDomain;
                } else {
                  timeToInt(this, this.timeDomain);
                  this.analyser.getByteTimeDomainData(this.timeDomain);
                  for (var j = 0; j < this.timeDomain.length; j++) {
                    var scaled = p5.prototype.map(this.timeDomain[j], 0, 255, - 1, 1);
                    normalArray.push(scaled);
                  }
                  return normalArray;
                }
              }              /**
     *  Returns an array of amplitude values (between 0 and 255)
     *  across the frequency spectrum. Length is equal to FFT bins
     *  (1024 by default). The array indices correspond to frequencies
     *  (i.e. pitches), from the lowest to the highest that humans can
     *  hear. Each value represents amplitude at that slice of the
     *  frequency spectrum. Must be called prior to using
     *  <code>getEnergy()</code>.
     *
     *  @method analyze
     *  @for p5.FFT
     *  @param {Number} [bins]    Must be a power of two between
     *                             16 and 1024. Defaults to 1024.
     *  @param {Number} [scale]    If "dB," returns decibel
     *                             float measurements between
     *                             -140 and 0 (max).
     *                             Otherwise returns integers from 0-255.
     *  @return {Array} spectrum    Array of energy (amplitude/volume)
     *                              values across the frequency spectrum.
     *                              Lowest energy (silence) = 0, highest
     *                              possible is 255.
     *  @example
     *  <div><code>
     *  let osc, fft;
     *
     *  function setup(){
     *    let cnv = createCanvas(100,100);
     *    cnv.mousePressed(startSound);
     *    osc = new p5.Oscillator();
     *    osc.amp(0);
     *    fft = new p5.FFT();
     *  }
     *
     *  function draw(){
     *    background(220);
     *
     *    let freq = map(mouseX, 0, windowWidth, 20, 10000);
     *    freq = constrain(freq, 1, 20000);
     *    osc.freq(freq);
     *
     *    let spectrum = fft.analyze();
     *    noStroke();
     *    fill(255, 0, 255);
     *    for (let i = 0; i< spectrum.length; i++){
     *      let x = map(i, 0, spectrum.length, 0, width);
     *      let h = -height + map(spectrum[i], 0, 255, height, 0);
     *      rect(x, height, width / spectrum.length, h );
     *    }
     *
     *    stroke(255);
     *    if (!osc.started) {
     *      text('tap here and drag to change frequency', 10, 20, width - 20);
     *    } else {
     *      text(round(freq)+'Hz', 10, 20);
     *    }
     *  }
     *
     *  function startSound() {
     *    osc.start();
     *    osc.amp(0.5, 0.2);
     *  }
     *
     *  function mouseReleased() {
     *    osc.amp(0, 0.2);
     *  }
     *  </code></div>
     *
     *
     */

            },
            {
              key: 'analyze',
              value: function analyze() {
                var mode;
                for (var i = 0; i < arguments.length; i++) {
                  if (typeof arguments[i] === 'number') {
                    this.bins = arguments[i];
                  }
                  if (typeof arguments[i] === 'string') {
                    mode = arguments[i];
                  }
                }
                if (mode && mode.toLowerCase() === 'db') {
                  freqToFloat(this);
                  this.analyser.getFloatFrequencyData(this.freqDomain);
                  return this.freqDomain;
                } else {
                  freqToInt(this, this.freqDomain);
                  this.analyser.getByteFrequencyData(this.freqDomain);
                  var normalArray = Array.apply([], this.freqDomain);
                  return normalArray;
                }
              }              /**
     *  Returns the amount of energy (volume) at a specific
     *  <a href="https://en.wikipedia.org/wiki/Audio_frequency" target="_blank">
     *  frequency</a>, or the average amount of energy between two
     *  frequencies. Accepts Number(s) corresponding
     *  to frequency (in Hz) (frequency must be >= 0), or a "string" corresponding to predefined
     *  frequency ranges ("bass", "lowMid", "mid", "highMid", "treble").
     *  Returns a range between 0 (no energy/volume at that frequency) and
     *  255 (maximum energy).
     *  <em>NOTE: analyze() must be called prior to getEnergy(). analyze()
     *  tells the FFT to analyze frequency data, and getEnergy() uses
     *  the results to determine the value at a specific frequency or
     *  range of frequencies.</em></p>
     *
     *  @method  getEnergy
     *  @for p5sound.FFT
     *  @param  {Number|String} frequency1   Will return a value representing
     *                                energy at this frequency. Alternately,
     *                                the strings "bass", "lowMid" "mid",
     *                                "highMid", and "treble" will return
     *                                predefined frequency ranges.
     *  @param  {Number} [frequency2] If a second frequency is given,
     *                                will return average amount of
     *                                energy that exists between the
     *                                two frequencies.
     *  @return {Number}  Energy (volume/amplitude) from
     *                    0 and 255.
     *
     */

            },
            {
              key: 'getEnergy',
              value: function getEnergy(frequency1, frequency2) {
                var nyquist = _audioContext.default.sampleRate / 2;
                if (frequency1 === 'bass') {
                  frequency1 = this.bass[0];
                  frequency2 = this.bass[1];
                } else if (frequency1 === 'lowMid') {
                  frequency1 = this.lowMid[0];
                  frequency2 = this.lowMid[1];
                } else if (frequency1 === 'mid') {
                  frequency1 = this.mid[0];
                  frequency2 = this.mid[1];
                } else if (frequency1 === 'highMid') {
                  frequency1 = this.highMid[0];
                  frequency2 = this.highMid[1];
                } else if (frequency1 === 'treble') {
                  frequency1 = this.treble[0];
                  frequency2 = this.treble[1];
                }
                if (typeof frequency1 !== 'number') {
                  throw 'invalid input for getEnergy()';
                }
                if (typeof frequency2 !== 'number') {
                  // if only one parameter:
                  var index = Math.round(frequency1 / nyquist * this.freqDomain.length);
                  return this.freqDomain[index];
                }
                if (frequency1 < 0 || frequency2 < 0) {
                  throw 'invalid input for getEnergy(), frequency cannot be a negative number';
                } // if two parameters:
                // if second is higher than first

                if (frequency1 > frequency2) {
                  var swap = frequency2;
                  frequency2 = frequency1;
                  frequency1 = swap;
                }
                var lowIndex = Math.round(frequency1 / nyquist * this.freqDomain.length);
                var highIndex = Math.round(frequency2 / nyquist * this.freqDomain.length);
                var total = 0;
                var numFrequencies = 0; // add up all of the values for the frequencies
                for (var i = lowIndex; i <= highIndex; i++) {
                  total += this.freqDomain[i];
                  numFrequencies += 1;
                } // divide by total number of frequencies

                var toReturn = total / numFrequencies;
                return toReturn;
              }              /**
     *  Returns the
     *  <a href="http://en.wikipedia.org/wiki/Spectral_centroid" target="_blank">
     *  spectral centroid</a> of the input signal.
     *  <em>NOTE: analyze() must be called prior to getCentroid(). Analyze()
     *  tells the FFT to analyze frequency data, and getCentroid() uses
     *  the results determine the spectral centroid.</em></p>
     *
     *  @method  getCentroid
     *  @for p5.FFT
     *  @return {Number}   Spectral Centroid Frequency  of the spectral centroid in Hz.
     *
     *
     * @example
     *  <div><code>
     * function setup(){
     *  cnv = createCanvas(100,100);
     *  cnv.mousePressed(userStartAudio);
     *  sound = new p5.AudioIn();
     *  sound.start();
     *  fft = new p5.FFT();
     *  sound.connect(fft);
     *}
     *
     *function draw() {
     *  if (getAudioContext().state !== 'running') {
     *    background(220);
     *    text('tap here and enable mic to begin', 10, 20, width - 20);
     *    return;
     *  }
     *  let centroidplot = 0.0;
     *  let spectralCentroid = 0;
     *
     *  background(0);
     *  stroke(0,255,0);
     *  let spectrum = fft.analyze();
     *  fill(0,255,0); // spectrum is green
     *
     *  //draw the spectrum
     *  for (let i = 0; i < spectrum.length; i++){
     *    let x = map(log(i), 0, log(spectrum.length), 0, width);
     *    let h = map(spectrum[i], 0, 255, 0, height);
     *    let rectangle_width = (log(i+1)-log(i))*(width/log(spectrum.length));
     *    rect(x, height, rectangle_width, -h )
     *  }
     *  let nyquist = 22050;
     *
     *  // get the centroid
     *  spectralCentroid = fft.getCentroid();
     *
     *  // the mean_freq_index calculation is for the display.
     *  let mean_freq_index = spectralCentroid/(nyquist/spectrum.length);
     *
     *  centroidplot = map(log(mean_freq_index), 0, log(spectrum.length), 0, width);
     *
     *  stroke(255,0,0); // the line showing where the centroid is will be red
     *
     *  rect(centroidplot, 0, width / spectrum.length, height)
     *  noStroke();
     *  fill(255,255,255);  // text is white
     *  text('centroid: ', 10, 20);
     *  text(round(spectralCentroid)+' Hz', 10, 40);
     *}
     * </code></div>
     */

            },
            {
              key: 'getCentroid',
              value: function getCentroid() {
                var nyquist = _audioContext.default.sampleRate / 2;
                var cumulative_sum = 0;
                var centroid_normalization = 0;
                for (var i = 0; i < this.freqDomain.length; i++) {
                  cumulative_sum += i * this.freqDomain[i];
                  centroid_normalization += this.freqDomain[i];
                }
                var mean_freq_index = 0;
                if (centroid_normalization !== 0) {
                  mean_freq_index = cumulative_sum / centroid_normalization;
                }
                var spec_centroid_freq = mean_freq_index * (nyquist / this.freqDomain.length);
                return spec_centroid_freq;
              }              /**
     *  Smooth FFT analysis by averaging with the last analysis frame.
     *
     *  @method smooth
     *  @param {Number} smoothing    0.0 < smoothing < 1.0.
     *                               Defaults to 0.8.
     */

            },
            {
              key: 'smooth',
              value: function smooth(s) {
                if (typeof s !== 'undefined') {
                  this.smoothing = s;
                }
                return this.smoothing;
              }
            },
            {
              key: 'dispose',
              value: function dispose() {
                // remove reference from soundArray
                var index = _main.default.soundArray.indexOf(this);
                _main.default.soundArray.splice(index, 1);
                if (this.analyser) {
                  this.analyser.disconnect();
                  delete this.analyser;
                }
              }              /**
     *  Returns an array of average amplitude values for a given number
     *  of frequency bands split equally. N defaults to 16.
     *  <em>NOTE: analyze() must be called prior to linAverages(). Analyze()
     *  tells the FFT to analyze frequency data, and linAverages() uses
     *  the results to group them into a smaller set of averages.</em></p>
     *
     *  @method  linAverages
     *  @for p5.FFT
     *  @param  {Number}  N                Number of returned frequency groups
     *  @return {Array}   linearAverages   Array of average amplitude values for each group
     */

            },
            {
              key: 'linAverages',
              value: function linAverages(_N) {
                var N = _N || 16; // This prevents undefined, null or 0 values of N
                var spectrum = this.freqDomain;
                var spectrumLength = spectrum.length;
                var spectrumStep = Math.floor(spectrumLength / N);
                var linearAverages = new Array(N); // Keep a second index for the current average group and place the values accordingly
                // with only one loop in the spectrum data
                var groupIndex = 0;
                for (var specIndex = 0; specIndex < spectrumLength; specIndex++) {
                  linearAverages[groupIndex] = linearAverages[groupIndex] !== undefined ? (linearAverages[groupIndex] + spectrum[specIndex]) / 2 : spectrum[specIndex]; // Increase the group index when the last element of the group is processed
                  if (specIndex % spectrumStep === spectrumStep - 1) {
                    groupIndex++;
                  }
                }
                return linearAverages;
              }              /**
     *  Returns an array of average amplitude values of the spectrum, for a given
     *  set of <a href="https://en.wikipedia.org/wiki/Octave_band" target="_blank">
     *  Octave Bands</a>
     *  <em>NOTE: analyze() must be called prior to logAverages(). Analyze()
     *  tells the FFT to analyze frequency data, and logAverages() uses
     *  the results to group them into a smaller set of averages.</em></p>
     *
     *  @method  logAverages
     *  @for p5.FFT
     *  @param  {Array}   octaveBands    Array of Octave Bands objects for grouping
     *  @return {Array}   logAverages    Array of average amplitude values for each group
     */

            },
            {
              key: 'logAverages',
              value: function logAverages(octaveBands) {
                var nyquist = _audioContext.default.sampleRate / 2;
                var spectrum = this.freqDomain;
                var spectrumLength = spectrum.length;
                var logAverages = new Array(octaveBands.length); // Keep a second index for the current average group and place the values accordingly
                // With only one loop in the spectrum data
                var octaveIndex = 0;
                for (var specIndex = 0; specIndex < spectrumLength; specIndex++) {
                  var specIndexFrequency = Math.round(specIndex * nyquist / this.freqDomain.length); // Increase the group index if the current frequency exceeds the limits of the band
                  if (specIndexFrequency > octaveBands[octaveIndex].hi) {
                    octaveIndex++;
                  }
                  logAverages[octaveIndex] = logAverages[octaveIndex] !== undefined ? (logAverages[octaveIndex] + spectrum[specIndex]) / 2 : spectrum[specIndex];
                }
                return logAverages;
              }              /**
     *  Calculates and Returns the 1/N
     *  <a href="https://en.wikipedia.org/wiki/Octave_band" target="_blank">Octave Bands</a>
     *  N defaults to 3 and minimum central frequency to 15.625Hz.
     *  (1/3 Octave Bands ~= 31 Frequency Bands)
     *  Setting fCtr0 to a central value of a higher octave will ignore the lower bands
     *  and produce less frequency groups.
     *
     *  @method   getOctaveBands
     *  @for p5.FFT
     *  @param  {Number}  N             Specifies the 1/N type of generated octave bands
     *  @param  {Number}  fCtr0         Minimum central frequency for the lowest band
     *  @return {Array}   octaveBands   Array of octave band objects with their bounds
     */

            },
            {
              key: 'getOctaveBands',
              value: function getOctaveBands(_N, _fCtr0) {
                var N = _N || 3; // Default to 1/3 Octave Bands
                var fCtr0 = _fCtr0 || 15.625; // Minimum central frequency, defaults to 15.625Hz
                var octaveBands = [
                ];
                var lastFrequencyBand = {
                  lo: fCtr0 / Math.pow(2, 1 / (2 * N)),
                  ctr: fCtr0,
                  hi: fCtr0 * Math.pow(2, 1 / (2 * N))
                };
                octaveBands.push(lastFrequencyBand);
                var nyquist = _audioContext.default.sampleRate / 2;
                while (lastFrequencyBand.hi < nyquist) {
                  var newFrequencyBand = {
                  };
                  newFrequencyBand.lo = lastFrequencyBand.hi;
                  newFrequencyBand.ctr = lastFrequencyBand.ctr * Math.pow(2, 1 / N);
                  newFrequencyBand.hi = newFrequencyBand.ctr * Math.pow(2, 1 / (2 * N));
                  octaveBands.push(newFrequencyBand);
                  lastFrequencyBand = newFrequencyBand;
                }
                return octaveBands;
              }
            },
            {
              key: '_onNewInput',
              value: function _onNewInput() {
                //  disconnect FFT from sketch when something is connected
                _main.default.fftMeter.disconnect();
              }
            }
          ]);
          return AnalyzerFFT;
        }(); // helper methods to convert type from float (dB) to int (0-255)
        function freqToFloat(fft) {
          if (fft.freqDomain instanceof Float32Array === false) {
            fft.freqDomain = new Float32Array(fft.analyser.frequencyBinCount);
          }
        }
        function freqToInt(fft) {
          if (fft.freqDomain instanceof Uint8Array === false) {
            fft.freqDomain = new Uint8Array(fft.analyser.frequencyBinCount);
          }
        }
        function timeToFloat(fft) {
          if (fft.timeDomain instanceof Float32Array === false) {
            fft.timeDomain = new Float32Array(fft.analyser.frequencyBinCount);
          }
        }
        function timeToInt(fft) {
          if (fft.timeDomain instanceof Uint8Array === false) {
            fft.timeDomain = new Uint8Array(fft.analyser.frequencyBinCount);
          }
        }
        var _default = AnalyzerFFT;
        exports.default = _default;
      },
      {
        './audioContext': 213,
        './main': 218,
        'core-js/modules/es.array.index-of': 131,
        'core-js/modules/es.array.iterator': 132,
        'core-js/modules/es.array.map': 134,
        'core-js/modules/es.array.splice': 136,
        'core-js/modules/es.object.to-string': 140,
        'core-js/modules/es.typed-array.copy-within': 154,
        'core-js/modules/es.typed-array.every': 155,
        'core-js/modules/es.typed-array.fill': 156,
        'core-js/modules/es.typed-array.filter': 157,
        'core-js/modules/es.typed-array.find': 159,
        'core-js/modules/es.typed-array.find-index': 158,
        'core-js/modules/es.typed-array.float32-array': 160,
        'core-js/modules/es.typed-array.for-each': 161,
        'core-js/modules/es.typed-array.includes': 162,
        'core-js/modules/es.typed-array.index-of': 163,
        'core-js/modules/es.typed-array.iterator': 164,
        'core-js/modules/es.typed-array.join': 165,
        'core-js/modules/es.typed-array.last-index-of': 166,
        'core-js/modules/es.typed-array.map': 167,
        'core-js/modules/es.typed-array.reduce': 169,
        'core-js/modules/es.typed-array.reduce-right': 168,
        'core-js/modules/es.typed-array.reverse': 170,
        'core-js/modules/es.typed-array.set': 171,
        'core-js/modules/es.typed-array.slice': 172,
        'core-js/modules/es.typed-array.some': 173,
        'core-js/modules/es.typed-array.sort': 174,
        'core-js/modules/es.typed-array.subarray': 175,
        'core-js/modules/es.typed-array.to-locale-string': 176,
        'core-js/modules/es.typed-array.to-string': 177,
        'core-js/modules/es.typed-array.uint8-array': 178
      }
    ],
    185: [
      function (_dereq_, module, exports) {
        'use strict';
        _dereq_('core-js/modules/es.array.filter');
        _dereq_('core-js/modules/es.array.for-each');
        _dereq_('core-js/modules/es.array.index-of');
        _dereq_('core-js/modules/es.array.splice');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.promise');
        _dereq_('core-js/modules/web.dom-collections.for-each');
        _dereq_('core-js/modules/es.array.filter');
        _dereq_('core-js/modules/es.array.for-each');
        _dereq_('core-js/modules/es.array.index-of');
        _dereq_('core-js/modules/es.array.splice');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.promise');
        _dereq_('core-js/modules/web.dom-collections.for-each');
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _main = _interopRequireDefault(_dereq_('./main'));
        var _Amplitude = _interopRequireDefault(_dereq_('./Amplitude'));
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        } // an array of input sources

        _main.default.inputSources = [
        ];
        /**
 *  <p>Get audio from an input, i.e. your computer's microphone.</p>
 *
 *  <p>Turn the mic on/off with the start() and stop() methods. When the mic
 *  is on, its volume can be measured with getLevel or by connecting an
 *  FFT object.</p>
 *
 *  <p>If you want to hear the AudioIn, use the .connect() method.
 *  AudioIn does not connect to p5.sound output by default to prevent
 *  feedback.</p>
 *
 *  <p><em>Note: This uses the <a href="http://caniuse.com/stream">getUserMedia/
 *  Stream</a> API, which is not supported by certain browsers. Access in Chrome browser
 *  is limited to localhost and https, but access over http may be limited.</em></p>
 *
 *  @class p5.AudioIn
 *  @constructor
 *  @param {Function} [errorCallback] A function to call if there is an error
 *                                    accessing the AudioIn. For example,
 *                                    Safari and iOS devices do not
 *                                    currently allow microphone access.
 *  @example
 *  <div><code>
 *  let mic;
 *
 *   function setup(){
 *    let cnv = createCanvas(100, 100);
 *    cnv.mousePressed(userStartAudio);
 *    textAlign(CENTER);
 *    mic = new p5.AudioIn();
 *    mic.start();
 *  }
 *
 *  function draw(){
 *    background(0);
 *    fill(255);
 *    text('tap to start', width/2, 20);
 *
 *    micLevel = mic.getLevel();
 *    let y = height - micLevel * height;
 *    ellipse(width/2, y, 10, 10);
 *  }
 *  </code></div>
 */
        var AudioIn =        /*#__PURE__*/
        function () {
          function AudioIn(errorCallback) {
            _classCallCheck(this, AudioIn);
            /**
     * Set up audio input
     * @property {GainNode} input
     */
            this.input = _audioContext.default.createGain();
            /**
     * Send audio as an output, i.e. your computer's speaker.
     * @property {GainNode} output
     */
            this.output = _audioContext.default.createGain();
            /**
     * Used to store the MediaStream object that is returned from the getUserMedia() API,
     * which allows access to the user's microphone. The stream is used to create a MediaStreamAudioSourceNode,
     * which is used as the audio source for the input and output gain nodes.
     * The stream is also used to check if the browser supports the MediaStreamTrack and mediaDevices API,
     * and if not, an errorCallback function is called or an alert is displayed.
     * @property {MediaStream|null} stream
     */
            this.stream = null;
            /**
     * Used to access the "audio input" from the user's microphone.
     * It creates a MediaStream object that can be used to start and stop the mic and measure its volume using the getLevel() method or by connecting it to an FFT object.
     * MediaStream object can also be use to check if the browser supports MediaStreamTrack and mediaDevices and to add the AudioIn object to the soundArray for disposal on close.
     * @property {MediaStreamAudioSourceNode|null} mediaStream
     */
            this.mediaStream = null;
            /**
     * Used to store the "current source of audio input", such as the user's microphone.
     * Initially set to "null" and can be updated as the user selects different audio sources.
     * Also used in conjunction with the "input" and "mediaStream" properties to control audio input.
     * @property {Number|null} currentSource
     */
            this.currentSource = null;
            /**
     *  Client must allow browser to access their microphone / audioin source.
     *  Default: false. Will become true when the client enables access.
     *  @property {Boolean} enabled
     */
            this.enabled = false;
            /**
     * Input amplitude, connect to it by default but not to master out
     *  @property {p5.Amplitude} amplitude
     */
            this.amplitude = new _Amplitude.default();
            this.output.connect(this.amplitude.input);
            if (!window.MediaStreamTrack || !window.navigator.mediaDevices || !window.navigator.mediaDevices.getUserMedia) {
              errorCallback ? errorCallback() : window.alert('This browser does not support MediaStreamTrack and mediaDevices');
            } // add to soundArray so we can dispose on close

            _main.default.soundArray.push(this);
          }          /**
   *  Start processing audio input. This enables the use of other
   *  AudioIn methods like getLevel(). Note that by default, AudioIn
   *  is not connected to p5.sound's output. So you won't hear
   *  anything unless you use the connect() method.<br/>
   *
   *  Certain browsers limit access to the user's microphone. For example,
   *  Chrome only allows access from localhost and over https. For this reason,
   *  you may want to include an errorCallback—a function that is called in case
   *  the browser won't provide mic access.
   *
   *  @method start
   *  @for p5.AudioIn
   *  @param {Function} [successCallback] Name of a function to call on
   *                                    success.
   *  @param {Function} [errorCallback] Name of a function to call if
   *                                    there was an error. For example,
   *                                    some browsers do not support
   *                                    getUserMedia.
   */

          _createClass(AudioIn, [
            {
              key: 'start',
              value: function start(successCallback, errorCallback) {
                var self = this;
                if (this.stream) {
                  this.stop();
                } // set the audio source

                var audioSource = _main.default.inputSources[self.currentSource];
                var constraints = {
                  audio: {
                    sampleRate: _audioContext.default.sampleRate,
                    echoCancellation: false
                  }
                }; // if developers determine which source to use
                if (_main.default.inputSources[this.currentSource]) {
                  constraints.audio.deviceId = audioSource.deviceId;
                }
                window.navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                  self.stream = stream;
                  self.enabled = true; // Wrap a MediaStreamSourceNode around the live input
                  self.mediaStream = _audioContext.default.createMediaStreamSource(stream);
                  self.mediaStream.connect(self.output); // only send to the Amplitude reader, so we can see it but not hear it.
                  self.amplitude.setInput(self.output);
                  if (successCallback) successCallback();
                }).catch(function (err) {
                  if (errorCallback) errorCallback(err);
                   else console.error(err);
                });
              }              /**
     *  Turn the AudioIn off. If the AudioIn is stopped, it cannot getLevel().
     *  If re-starting, the user may be prompted for permission access.
     *
     *  @method stop
     *  @for p5.AudioIn
     */

            },
            {
              key: 'stop',
              value: function stop() {
                if (this.stream) {
                  this.stream.getTracks().forEach(function (track) {
                    track.stop();
                  });
                  this.mediaStream.disconnect();
                  delete this.mediaStream;
                  delete this.stream;
                }
              }              /**
     *  Connect to an audio unit. If no parameter is provided, will
     *  connect to the main output (i.e. your speakers).<br/>
     *
     *  @method  connect
     *  @for p5.AudioIn
     *  @param  {Object} [unit] An object that accepts audio input,
     *                          such as an FFT
     */

            },
            {
              key: 'connect',
              value: function connect(unit) {
                if (unit) {
                  if (unit.hasOwnProperty('input')) {
                    this.output.connect(unit.input);
                  } else if (unit.hasOwnProperty('analyser')) {
                    this.output.connect(unit.analyser);
                  } else {
                    this.output.connect(unit);
                  }
                } else {
                  this.output.connect(_main.default.input);
                }
                if (unit && unit._onNewInput) {
                  unit._onNewInput(this);
                }
              }              /**
     *  Disconnect the AudioIn from all audio units. For example, if
     *  connect() had been called, disconnect() will stop sending
     *  signal to your speakers.<br/>
     *
     *  @method  disconnect
     *  @for p5.AudioIn
     */

            },
            {
              key: 'disconnect',
              value: function disconnect() {
                if (this.output) {
                  this.output.disconnect(); // stay connected to amplitude even if not outputting to p5
                  this.output.connect(this.amplitude.input);
                }
              }              /**
     *  Read the Amplitude (volume level) of an AudioIn. The AudioIn
     *  class contains its own instance of the Amplitude class to help
     *  make it easy to get a microphone's volume level. Accepts an
     *  optional smoothing value (0.0 < 1.0). <em>NOTE: AudioIn must
     *  .start() before using .getLevel().</em><br/>
     *
     *  @method  getLevel
     *  @for p5.AudioIn
     *  @param  {Number} [smoothing] Smoothing is 0.0 by default.
     *                               Smooths values based on previous values.
     *  @return {Number}           Volume level (between 0.0 and 1.0)
     */

            },
            {
              key: 'getLevel',
              value: function getLevel(smoothing) {
                if (smoothing) {
                  this.amplitude.smooth(smoothing);
                }
                return this.amplitude.getLevel();
              }              /**
     *  Set amplitude (volume) of a mic input between 0 and 1.0. <br/>
     *
     *  @method  amp
     *  @for p5.AudioIn
     *  @param  {Number} vol between 0 and 1.0
     *  @param {Number} [time] ramp time (optional)
     */

            },
            {
              key: 'amp',
              value: function amp(vol, t) {
                if (t) {
                  var rampTime = t || 0;
                  var currentVol = this.output.gain.value;
                  this.output.gain.cancelScheduledValues(_audioContext.default.currentTime);
                  this.output.gain.setValueAtTime(currentVol, _audioContext.default.currentTime);
                  this.output.gain.linearRampToValueAtTime(vol, rampTime + _audioContext.default.currentTime);
                } else {
                  this.output.gain.cancelScheduledValues(_audioContext.default.currentTime);
                  this.output.gain.setValueAtTime(vol, _audioContext.default.currentTime);
                }
              }              /**
     * Returns a list of available input sources. This is a wrapper
     * for <a href="https://developer.mozilla.org/
     * en-US/docs/Web/API/MediaDevices/enumerateDevices" target="_blank">
     * MediaDevices.enumerateDevices() - Web APIs | MDN</a>
     * and it returns a Promise.
     * @method  getSources
     * @for p5.AudioIn
     * @param  {Function} [successCallback] This callback function handles the sources when they
     *                                      have been enumerated. The callback function
     *                                      receives the deviceList array as its only argument
     * @param  {Function} [errorCallback] This optional callback receives the error
     *                                    message as its argument.
     * @returns {Promise} Returns a Promise that can be used in place of the callbacks, similar
     *                            to the enumerateDevices() method
     * @example
     *  <div><code>
     *  let audioIn;
     *
     *  function setup(){
     *    text('getting sources...', 0, 20);
     *    audioIn = new p5.AudioIn();
     *    audioIn.getSources(gotSources);
     *  }
     *
     *  function gotSources(deviceList) {
     *    if (deviceList.length > 0) {
     *      //set the source to the first item in the deviceList array
     *      audioIn.setSource(0);
     *      let currentSource = deviceList[audioIn.currentSource];
     *      text('set source to: ' + currentSource.deviceId, 5, 20, width);
     *    }
     *  }
     *  </code></div>
     */

            },
            {
              key: 'getSources',
              value: function getSources(onSuccess, onError) {
                return new Promise(function (resolve, reject) {
                  window.navigator.mediaDevices.enumerateDevices().then(function (devices) {
                    _main.default.inputSources = devices.filter(function (device) {
                      return device.kind === 'audioinput';
                    });
                    resolve(_main.default.inputSources);
                    if (onSuccess) {
                      onSuccess(_main.default.inputSources);
                    }
                  }).catch(function (error) {
                    reject(error);
                    if (onError) {
                      onError(error);
                    } else {
                      console.error('This browser does not support MediaStreamTrack.getSources()');
                    }
                  });
                });
              }              /**
     *  Set the input source. Accepts a number representing a
     *  position in the array returned by getSources().
     *  This is only available in browsers that support
     * <a href="https://developer.mozilla.org/
     * en-US/docs/Web/API/MediaDevices/enumerateDevices" target="_blank">
     * navigator.mediaDevices.enumerateDevices()</a>
     *
     *  @method setSource
     *  @for p5.AudioIn
     *  @param {number} num position of input source in the array
     *  @example
     *  <div><code>
     *  let audioIn;
     *
     *  function setup(){
     *    text('getting sources...', 0, 20);
     *    audioIn = new p5.AudioIn();
     *    audioIn.getSources(gotSources);
     *  }
     *
     *  function gotSources(deviceList) {
     *    if (deviceList.length > 0) {
     *      //set the source to the first item in the deviceList array
     *      audioIn.setSource(0);
     *      let currentSource = deviceList[audioIn.currentSource];
     *      text('set source to: ' + currentSource.deviceId, 5, 20, width);
     *    }
     *  }
     *  </code></div>
     */

            },
            {
              key: 'setSource',
              value: function setSource(num) {
                if (_main.default.inputSources.length > 0 && num < _main.default.inputSources.length) {
                  // set the current source
                  this.currentSource = num;
                  console.log('set source to ', _main.default.inputSources[this.currentSource]);
                } else {
                  console.log('unable to set input source');
                } // restart stream if currently active

                if (this.stream && this.stream.active) {
                  this.start();
                }
              } // private method

            },
            {
              key: 'dispose',
              value: function dispose() {
                // remove reference from soundArray
                var index = _main.default.soundArray.indexOf(this);
                _main.default.soundArray.splice(index, 1);
                this.stop();
                if (this.output) {
                  this.output.disconnect();
                }
                if (this.amplitude) {
                  this.amplitude.dispose();
                }
                delete this.amplitude;
                delete this.output;
              }
            }
          ]);
          return AudioIn;
        }();
        var _default = AudioIn;
        exports.default = _default;
      },
      {
        './Amplitude': 183,
        './audioContext': 213,
        './main': 218,
        'core-js/modules/es.array.filter': 129,
        'core-js/modules/es.array.for-each': 130,
        'core-js/modules/es.array.index-of': 131,
        'core-js/modules/es.array.splice': 136,
        'core-js/modules/es.object.to-string': 140,
        'core-js/modules/es.promise': 141,
        'core-js/modules/web.dom-collections.for-each': 180
      }
    ],
    186: [
      function (_dereq_, module, exports) {
        'use strict';
        _dereq_('core-js/modules/es.symbol');
        _dereq_('core-js/modules/es.symbol.description');
        _dereq_('core-js/modules/es.symbol.iterator');
        _dereq_('core-js/modules/es.array.iterator');
        _dereq_('core-js/modules/es.object.get-own-property-descriptor');
        _dereq_('core-js/modules/es.object.get-prototype-of');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.reflect.construct');
        _dereq_('core-js/modules/es.reflect.get');
        _dereq_('core-js/modules/es.regexp.to-string');
        _dereq_('core-js/modules/es.string.iterator');
        _dereq_('core-js/modules/web.dom-collections.iterator');
        function _typeof2(obj) {
          if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
            _typeof2 = function _typeof2(obj) {
              return typeof obj;
            };
          } else {
            _typeof2 = function _typeof2(obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
            };
          }
          return _typeof2(obj);
        }
        _dereq_('core-js/modules/es.symbol');
        _dereq_('core-js/modules/es.symbol.description');
        _dereq_('core-js/modules/es.symbol.iterator');
        _dereq_('core-js/modules/es.array.iterator');
        _dereq_('core-js/modules/es.object.get-own-property-descriptor');
        _dereq_('core-js/modules/es.object.get-prototype-of');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.reflect.construct');
        _dereq_('core-js/modules/es.reflect.get');
        _dereq_('core-js/modules/es.regexp.to-string');
        _dereq_('core-js/modules/es.string.iterator');
        _dereq_('core-js/modules/web.dom-collections.iterator');
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.BandPass = exports.HighPass = exports.LowPass = exports.default = void 0;
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        var _Effect2 = _interopRequireDefault(_dereq_('./Effect'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }
        function _typeof(obj) {
          if (typeof Symbol === 'function' && _typeof2(Symbol.iterator) === 'symbol') {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : _typeof2(obj);
            };
          }
          return _typeof(obj);
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }
        function _get(target, property, receiver) {
          if (typeof Reflect !== 'undefined' && Reflect.get) {
            _get = Reflect.get;
          } else {
            _get = function _get(target, property, receiver) {
              var base = _superPropBase(target, property);
              if (!base) return;
              var desc = Object.getOwnPropertyDescriptor(base, property);
              if (desc.get) {
                return desc.get.call(receiver);
              }
              return desc.value;
            };
          }
          return _get(target, property, receiver || target);
        }
        function _superPropBase(object, property) {
          while (!Object.prototype.hasOwnProperty.call(object, property)) {
            object = _getPrototypeOf(object);
            if (object === null) break;
          }
          return object;
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function');
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }
        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };
          return _setPrototypeOf(o, p);
        }
        function _createSuper(Derived) {
          function isNativeReflectConstruct() {
            if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if (typeof Proxy === 'function') return true;
            try {
              Date.prototype.toString.call(Reflect.construct(Date, [
              ], function () {
              }));
              return true;
            } catch (e) {
              return false;
            }
          }
          return function () {
            var Super = _getPrototypeOf(Derived),
            result;
            if (isNativeReflectConstruct()) {
              var NewTarget = _getPrototypeOf(this).constructor;
              result = Reflect.construct(Super, arguments, NewTarget);
            } else {
              result = Super.apply(this, arguments);
            }
            return _possibleConstructorReturn(this, result);
          };
        }
        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
            return call;
          }
          return _assertThisInitialized(self);
        }
        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
          }
          return self;
        }
        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }
        var BiquadFilter =        /*#__PURE__*/
        function (_Effect) {
          _inherits(BiquadFilter, _Effect);
          var _super = _createSuper(BiquadFilter);
          function BiquadFilter(type) {
            var _this;
            _classCallCheck(this, BiquadFilter);
            _this = _super.call(this);
            _this.biquad = _audioContext.default.createBiquadFilter();
            _this.input.connect(_this.biquad);
            _this.biquad.connect(_this.output);
            if (type) {
              _this.setType(type);
            }
            _this._on = true;
            _this._untoggledType = _this.biquad.type;
            return _this;
          }
          _createClass(BiquadFilter, [
            {
              key: 'process',
              value: function process(src, freq, res, time) {
                src.connect(this.input);
                this.set(freq, res, time);
              }              /**
     *  Set the frequency and the resonance of the filter.
     *
     *  @method  set
     *  @param {Number} [freq] Frequency in Hz, from 10 to 22050
     *  @param {Number} [res]  Resonance (Q) from 0.001 to 1000
     *  @param {Number} [timeFromNow] schedule this event to happen
     *                                seconds from now
     */

            },
            {
              key: 'set',
              value: function set(freq, res, time) {
                if (freq) {
                  this.freq(freq, time);
                }
                if (res) {
                  this.res(res, time);
                }
              }
            },
            {
              key: 'freq',
              value: function freq(_freq, time) {
                var t = time || 0;
                if (_freq <= 0) {
                  _freq = 1;
                }
                if (typeof _freq === 'number') {
                  this.biquad.frequency.cancelScheduledValues(_audioContext.default.currentTime + 0.01 + t);
                  this.biquad.frequency.exponentialRampToValueAtTime(_freq, _audioContext.default.currentTime + 0.02 + t);
                } else if (_freq) {
                  _freq.connect(this.biquad.frequency);
                }
                return this.biquad.frequency.value;
              }
            },
            {
              key: 'res',
              value: function res(_res, time) {
                var t = time || 0;
                if (typeof _res === 'number') {
                  this.biquad.Q.value = _res;
                  this.biquad.Q.cancelScheduledValues(_audioContext.default.currentTime + 0.01 + t);
                  this.biquad.Q.linearRampToValueAtTime(_res, _audioContext.default.currentTime + 0.02 + t);
                } else if (_res) {
                  _res.connect(this.biquad.Q);
                }
                return this.biquad.Q.value;
              }
            },
            {
              key: 'gain',
              value: function gain(_gain, time) {
                var t = time || 0;
                if (typeof _gain === 'number') {
                  this.biquad.gain.value = _gain;
                  this.biquad.gain.cancelScheduledValues(_audioContext.default.currentTime + 0.01 + t);
                  this.biquad.gain.linearRampToValueAtTime(_gain, _audioContext.default.currentTime + 0.02 + t);
                } else if (_gain) {
                  _gain.connect(this.biquad.gain);
                }
                return this.biquad.gain.value;
              }
            },
            {
              key: 'toggle',
              value: function toggle() {
                this._on = !this._on;
                if (this._on === true) {
                  this.biquad.type = this._untoggledType;
                } else if (this._on === false) {
                  this.biquad.type = 'allpass';
                }
                return this._on;
              }
            },
            {
              key: 'setType',
              value: function setType(t) {
                this.biquad.type = t;
                this._untoggledType = this.biquad.type;
              }
            },
            {
              key: 'dispose',
              value: function dispose() {
                // remove reference from soundArray
                _get(_getPrototypeOf(BiquadFilter.prototype), 'dispose', this).call(this);
                if (this.biquad) {
                  this.biquad.disconnect();
                  delete this.biquad;
                }
              }
            }
          ]);
          return BiquadFilter;
        }(_Effect2.default);
        /**
 *  Constructor: <code>new p5.LowPass()</code> BiquadFilter.
 *  This is the same as creating a p5.BiquadFilter and then calling
 *  its method <code>setType('lowpass')</code>.
 *  See p5.BiquadFilter for methods.
 *
 *  @class p5.LowPass
 *  @constructor
 *  @extends p5.BiquadFilter
 */
        var LowPass =        /*#__PURE__*/
        function (_BiquadFilter) {
          _inherits(LowPass, _BiquadFilter);
          var _super2 = _createSuper(LowPass);
          function LowPass() {
            _classCallCheck(this, LowPass);
            return _super2.call(this, 'lowpass');
          }
          return LowPass;
        }(BiquadFilter);
        /**
*  Constructor: <code>new p5.HighPass()</code> BiquadFilter.
*  This is the same as creating a p5.BiquadFilter and then calling
*  its method <code>setType('highpass')</code>.
*  See p5.BiquadFilter for methods.
*
*  @class p5.HighPass
*  @constructor
*  @extends p5.BiquadFilter
*/
        exports.LowPass = LowPass;
        var HighPass =        /*#__PURE__*/
        function (_BiquadFilter2) {
          _inherits(HighPass, _BiquadFilter2);
          var _super3 = _createSuper(HighPass);
          function HighPass() {
            _classCallCheck(this, HighPass);
            return _super3.call(this, 'highpass');
          }
          return HighPass;
        }(BiquadFilter);
        /**
*  Constructor: <code>new p5.BandPass()</code> BiquadFilter.
*  This is the same as creating a p5.BiquadFilter and then calling
*  its method <code>setType('bandpass')</code>.
*  See p5.BiquadFilter for methods.
*
*  @class p5.BandPass
*  @constructor
*  @extends p5.BiquadFilter
*/
        exports.HighPass = HighPass;
        var BandPass =        /*#__PURE__*/
        function (_BiquadFilter3) {
          _inherits(BandPass, _BiquadFilter3);
          var _super4 = _createSuper(BandPass);
          function BandPass() {
            _classCallCheck(this, BandPass);
            return _super4.call(this, 'bandpass');
          }
          return BandPass;
        }(BiquadFilter);
        exports.BandPass = BandPass;
        var _default = BiquadFilter;
        exports.default = _default;
      },
      {
        './Effect': 189,
        './audioContext': 213,
        'core-js/modules/es.array.iterator': 132,
        'core-js/modules/es.object.get-own-property-descriptor': 138,
        'core-js/modules/es.object.get-prototype-of': 139,
        'core-js/modules/es.object.to-string': 140,
        'core-js/modules/es.reflect.construct': 142,
        'core-js/modules/es.reflect.get': 143,
        'core-js/modules/es.regexp.to-string': 145,
        'core-js/modules/es.string.iterator': 146,
        'core-js/modules/es.symbol': 153,
        'core-js/modules/es.symbol.description': 151,
        'core-js/modules/es.symbol.iterator': 152,
        'core-js/modules/web.dom-collections.iterator': 181
      }
    ],
    187: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _Signal = _interopRequireDefault(_dereq_('./Signal'));
        var _SignalExpr = _interopRequireDefault(_dereq_('./SignalExpr'));
        var _SignalEqualPowerGain = _interopRequireDefault(_dereq_('./SignalEqualPowerGain'));
        var _Gain = _interopRequireDefault(_dereq_('./Gain'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }        /**
* @class  Tone.Crossfade provides equal power fading between two inputs.
*         More on crossfading technique [here](https://en.wikipedia.org/wiki/Fade_(audio_engineering)#Crossfading).
*
* @constructor
* @extends {Tone}
* @param {NormalRange} [initialFade=0.5]
* @example
* var crossFade = new Tone.CrossFade(0.5);
* //connect effect A to crossfade from
* //effect output 0 to crossfade input 0
* effectA.connect(crossFade, 0, 0);
* //connect effect B to crossfade from
* //effect output 0 to crossfade input 1
* effectB.connect(crossFade, 0, 1);
* crossFade.fade.value = 0;
* // ^ only effectA is output
* crossFade.fade.value = 1;
* // ^ only effectB is output
* crossFade.fade.value = 0.5;
* // ^ the two signals are mixed equally.
*/

        var CrossFade =        /*#__PURE__*/
        function () {
          function CrossFade(initialFade) {
            _classCallCheck(this, CrossFade);
            this.createInsOuts(2, 1);
            /**
    *  Alias for <code>input[0]</code>.
    *  @type {Gain}
    */
            this.a = this.input[0] = new _Gain.default();
            /**
    *  Alias for <code>input[1]</code>.
    *  @type {Gain}
    */
            this.b = this.input[1] = new _Gain.default();
            /**
    *  equal power gain cross fade
    *  @private
    *  @type {EqualPowerGain}
    */
            this._equalPowerA = new _SignalEqualPowerGain.default();
            /**
    *  equal power gain cross fade
    *  @private
    *  @type {Tone.EqualPowerGain}
    */
            this._equalPowerB = new _SignalEqualPowerGain.default();
            /**
    *  invert the incoming signal
    *  @private
    *  @type {Tone}
    */
            this._invert = new _SignalExpr.default('1 - $0'); //connections
            this.a.connect(this.output);
            this.b.connect(this.output);
            this.fade.chain(this._equalPowerB, this.b.gain);
            this.fade.chain(this._invert, this._equalPowerA, this.a.gain);
            this._readOnly('fade');
            /**
    * The mix between the two inputs. A fade value of 0
    * will output 100% <code>input[0]</code> and
    * a value of 1 will output 100% <code>input[1]</code>.
    * @type {NormalRange}
    * @signal
    */
            this.fade = new _Signal.default(this.defaultArg(initialFade, 0.5), Type.NormalRange);
          }          /**
  *  clean up
  *  @returns {Tone.CrossFade} this
  */

          _createClass(CrossFade, [
            {
              key: 'dispose',
              value: function dispose() {
                this._writable('fade');
                this._equalPowerA.dispose();
                this._equalPowerA = null;
                this._equalPowerB.dispose();
                this._equalPowerB = null;
                this.fade.dispose();
                this.fade = null;
                this._invert.dispose();
                this._invert = null;
                this.a.dispose();
                this.a = null;
                this.b.dispose();
                this.b = null;
                return this;
              }
            }
          ]);
          return CrossFade;
        }();
        var _default = CrossFade;
        exports.default = _default;
      },
      {
        './Gain': 191,
        './Signal': 195,
        './SignalEqualPowerGain': 200,
        './SignalExpr': 201
      }
    ],
    188: [
      function (_dereq_, module, exports) {
        'use strict';
        _dereq_('core-js/modules/es.symbol');
        _dereq_('core-js/modules/es.symbol.description');
        _dereq_('core-js/modules/es.symbol.iterator');
        _dereq_('core-js/modules/es.array.iterator');
        _dereq_('core-js/modules/es.object.get-own-property-descriptor');
        _dereq_('core-js/modules/es.object.get-prototype-of');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.reflect.construct');
        _dereq_('core-js/modules/es.reflect.get');
        _dereq_('core-js/modules/es.regexp.to-string');
        _dereq_('core-js/modules/es.string.iterator');
        _dereq_('core-js/modules/web.dom-collections.iterator');
        function _typeof2(obj) {
          if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
            _typeof2 = function _typeof2(obj) {
              return typeof obj;
            };
          } else {
            _typeof2 = function _typeof2(obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
            };
          }
          return _typeof2(obj);
        }
        _dereq_('core-js/modules/es.symbol');
        _dereq_('core-js/modules/es.symbol.description');
        _dereq_('core-js/modules/es.symbol.iterator');
        _dereq_('core-js/modules/es.array.iterator');
        _dereq_('core-js/modules/es.object.get-own-property-descriptor');
        _dereq_('core-js/modules/es.object.get-prototype-of');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.reflect.construct');
        _dereq_('core-js/modules/es.reflect.get');
        _dereq_('core-js/modules/es.regexp.to-string');
        _dereq_('core-js/modules/es.string.iterator');
        _dereq_('core-js/modules/web.dom-collections.iterator');
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        var _Effect2 = _interopRequireDefault(_dereq_('./Effect'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }
        function _typeof(obj) {
          if (typeof Symbol === 'function' && _typeof2(Symbol.iterator) === 'symbol') {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : _typeof2(obj);
            };
          }
          return _typeof(obj);
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }
        function _get(target, property, receiver) {
          if (typeof Reflect !== 'undefined' && Reflect.get) {
            _get = Reflect.get;
          } else {
            _get = function _get(target, property, receiver) {
              var base = _superPropBase(target, property);
              if (!base) return;
              var desc = Object.getOwnPropertyDescriptor(base, property);
              if (desc.get) {
                return desc.get.call(receiver);
              }
              return desc.value;
            };
          }
          return _get(target, property, receiver || target);
        }
        function _superPropBase(object, property) {
          while (!Object.prototype.hasOwnProperty.call(object, property)) {
            object = _getPrototypeOf(object);
            if (object === null) break;
          }
          return object;
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function');
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }
        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };
          return _setPrototypeOf(o, p);
        }
        function _createSuper(Derived) {
          function isNativeReflectConstruct() {
            if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if (typeof Proxy === 'function') return true;
            try {
              Date.prototype.toString.call(Reflect.construct(Date, [
              ], function () {
              }));
              return true;
            } catch (e) {
              return false;
            }
          }
          return function () {
            var Super = _getPrototypeOf(Derived),
            result;
            if (isNativeReflectConstruct()) {
              var NewTarget = _getPrototypeOf(this).constructor;
              result = Reflect.construct(Super, arguments, NewTarget);
            } else {
              result = Super.apply(this, arguments);
            }
            return _possibleConstructorReturn(this, result);
          };
        }
        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
            return call;
          }
          return _assertThisInitialized(self);
        }
        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
          }
          return self;
        }
        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }        /**
 * Delay is an echo effect. it processes an existing sound source,
 * and outputs a delayed version of that sound. the p5.Delay can
 * produce different effects depending on the delayTime, feedback,
 * filter, and type. in the example below, a feedback of 0.5 (the
 * default value) will produce a looping delay that decreases in
 * volume by 50% each repeat. a filter will cut out the high
 * frequencies so that the delay does nto sound as piercing as the
 * original source.
 *
 *
 * This class extends p5sound.Effect
 *
 * @class p5.Delay
 * @extends p5.Effect
 * @constructor
 * @example
 * <div><code>
 * let osc;
 *
 * function setup() {
 *   let cnv = createCanvas(100, 100);
 *   background(220);
 *   textAlign(CENTER);
 *   text('tap to play', width/2, height/2);
 *
 *   osc = new p5.Oscillator('square');
 *   osc.amp(0.5);
 *   delay = new p5.Delay();
 *
 *   // delay.process() accepts 4 parameters:
 *   // source, delaytime (in seconds), feedback, filter frequency
 *   delay.process(osc, 0.12, 0.7, 2300);
 *   cnv.mousePressed(oscStart);
 * }
 *
 * function oscStart() {
 *   osc.start();
 * }
 *
 * function mouseReleased() {
 *   osc.stop();
 * }
 * </code></div>
 */

        var Delay =        /*#__PURE__*/
        function (_Effect) {
          _inherits(Delay, _Effect);
          var _super = _createSuper(Delay);
          function Delay() {
            var _this;
            _classCallCheck(this, Delay);
            _this = _super.call(this);
            _this.gain = _audioContext.default.createGain();
            _this.delay = _audioContext.default.createDelay();
            _this.input.connect(_this.gain);
            _this.gain.connect(_this.delay);
            _this.delay.connect(_this.output); // this._split = audioContext.createChannelSplitter(2);
            // this._merge = audioContext.createChannelMerger(2);
            // this._leftGain = audioContext.createGain();
            // this._rightGain = audioContext.createGain();
            // this.leftDelay = audioContext.createDelay();
            // this.rightDelay = audioContext.createDelay();
            // graph routing
            // this.input.connect(this._split);
            // this.leftDelay.connect(this._lefttGain);
            // this.rightDelay.connect(this._rightGain);
            // this._leftGain.connect(this._merge, 0, 0);
            _this._maxDelay = _this.delay.delayTime.maxValue;
            _this.feedback(0.5);
            return _this;
          }
          _createClass(Delay, [
            {
              key: 'process',
              value: function process(src, _delayTime, _feedback) {
                var feedback = _feedback || 0;
                var delayTime = _delayTime || 0;
                if (feedback >= 1) {
                  throw new Error('Feedback value will force a positive feedback loop.');
                }
                if (delayTime >= this._maxDelay) {
                  throw new Error('Delay Time exceeds maximum delay time of ' + this._maxDelay + ' second.');
                }
                src.connect(this.input);
                this.delay.delayTime.value = delayTime;
                this.gain.gain.value = feedback;
              }
            },
            {
              key: 'delayTime',
              value: function delayTime(t) {
                // if t is an audio node...
                if (typeof t !== 'number') {
                  t.connect(this.delay.delayTime);
                } else {
                  this.delay.delayTime.cancelScheduledValues(_audioContext.default.currentTime);
                  this.delay.delayTime.value = t;
                }
              }
            },
            {
              key: 'feedback',
              value: function feedback(f) {
                // if f is an audio node...
                if (f && typeof f !== 'number') {
                  f.connect(this.gain.gain);
                } else if (f >= 1) {
                  throw new Error('Feedback value will force a positive feedback loop.');
                } else if (typeof f === 'number') {
                  this.gain.gain.value = f;
                } // return value of feedback

                return this.gain.gain.value;
              } // setType(t) {
              //   this._split.disconnect();
              //   this._split.connect(this.leftDelay, 0);
              //   this._split.connect(this.rightDelay, 1);
              //   if (t === 0) {
              //     this._merge.output.connect(this.leftDelay, 0, 0);
              //     this._merge.output.connect(this.rightDelay, 0, 1);
              //   }
              // }

            },
            {
              key: 'dispose',
              value: function dispose() {
                _get(_getPrototypeOf(Delay.prototype), 'dispose', this).call(this);
                if (this.delay) {
                  this.delay.disconnect();
                  delete this.delay;
                } // this._split.disconnect();
                // this._merge.disconnect();
                // this._leftGain.disconnect();
                // this._rightGain.disconnect();
                // this.leftDelay.disconnect();
                // this.rightDelay.disconnect();
                // this._split = undefined;
                // this._merge = undefined;
                // this._leftGain = undefined;
                // this._rightGain = undefined;
                // this.leftDelay = undefined;
                // this.rightDelay = undefined;

              }
            }
          ]);
          return Delay;
        }(_Effect2.default);
        var _default = Delay;
        exports.default = _default;
      },
      {
        './Effect': 189,
        './audioContext': 213,
        'core-js/modules/es.array.iterator': 132,
        'core-js/modules/es.object.get-own-property-descriptor': 138,
        'core-js/modules/es.object.get-prototype-of': 139,
        'core-js/modules/es.object.to-string': 140,
        'core-js/modules/es.reflect.construct': 142,
        'core-js/modules/es.reflect.get': 143,
        'core-js/modules/es.regexp.to-string': 145,
        'core-js/modules/es.string.iterator': 146,
        'core-js/modules/es.symbol': 153,
        'core-js/modules/es.symbol.description': 151,
        'core-js/modules/es.symbol.iterator': 152,
        'core-js/modules/web.dom-collections.iterator': 181
      }
    ],
    189: [
      function (_dereq_, module, exports) {
        'use strict';
        _dereq_('core-js/modules/es.array.index-of');
        _dereq_('core-js/modules/es.array.splice');
        _dereq_('core-js/modules/es.array.index-of');
        _dereq_('core-js/modules/es.array.splice');
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        var _main = _interopRequireDefault(_dereq_('./main'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }        /**
 * Effect is a base class for audio effects in p5sound.
 * This module handles the nodes and methods that are
 * common and useful for current and future effects.
 *
 *
 * This class is extended by other effects.
 *
 * @class p5sound.Effect
 * @constructor
 *
 * @param {Object} [audioContext] reference to the audio context of the p5 object
 * @param {AudioNode} [input] gain node effect wrapper
 * @param {AudioNode} [output] gain node effect wrapper
 *
 */

        var Effect =        /*#__PURE__*/
        function () {
          function Effect() {
            _classCallCheck(this, Effect);
            this.input = _audioContext.default.createGain();
            this.output = _audioContext.default.createGain();
            this.input.gain.value = 0.5;
            this.output.gain.value = 0.5;
            this.input.connect(this.output);
            this.output.connect(_main.default.input);
            _main.default.soundArray.push(this);
          }          /**
   * set the output volume of the filter
   *  @method amp
   * @for p5sound.Effect
   * @param {Number} [vol] amplitude between 0.0 and 1.0
   * @param {Number} [rampTime] create a fade that lasts until rampTime
   * @param {Number} [tFromNow] schedule this event to happen in tFromNow
   */

          _createClass(Effect, [
            {
              key: 'amp',
              value: function amp(vol) {
                var rampTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                var tFromNow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
                var now = _audioContext.default.currentTime;
                var startTime = now + tFromNow;
                var endTime = startTime + rampTime * 0.001;
                var currentVol = this.output.gain.value;
                this.output.gain.cancelScheduledValues(now);
                this.output.gain.linearRampToValueAtTime(currentVol, startTime + 0.001);
                this.output.gain.linearRampToValueAtTime(vol, endTime);
              }              /**
     * link effects together in a chain
     * example usage: filter.chain(reverb, delay, panner)
     * may be used with an open-ended number of arguments
     */

            },
            {
              key: 'chain',
              value: function chain() {
                if (arguments.length > 0) {
                  this.connect(arguments[0]);
                  for (var i = 0; i < arguments.length; i += 1) {
                    arguments[i - 1].connect(arguments[i]);
                  }
                }
                return this;
              }              /**
     * send output to a p5sound, Web Audio Node, or use signal to
     * control an AudioParam
     * @method connect
     * @for p5.Effect
     * @param {Object} unit
     */

            },
            {
              key: 'connect',
              value: function connect(unit) {
                if (!unit) {
                  this.output.connect(_main.default.input);
                } else if (unit.hasOwnProperty('input')) {
                  this.output.connect(unit.input);
                } else {
                  this.output.connect(unit);
                }
                if (unit && unit._onNewInput) {
                  unit._onNewInput(this);
                }
              }              /**
     * disconnect all outputs
     * @method disconnect
     * @for p5.Effect
     */

            },
            {
              key: 'disconnect',
              value: function disconnect() {
                if (this.output) {
                  this.output.disconnect();
                }
              }
            },
            {
              key: 'dispose',
              value: function dispose() {
                // remove reference form soundArray
                var index = _main.default.soundArray.indexOf(this);
                _main.default.soundArray.splice(index, 1);
                if (this.input) {
                  this.input.disconnect();
                  delete this.input;
                }
                if (this.output) {
                  this.output.disconnect();
                  delete this.output;
                }
              }
            }
          ]);
          return Effect;
        }();
        var _default = Effect;
        exports.default = _default;
      },
      {
        './audioContext': 213,
        './main': 218,
        'core-js/modules/es.array.index-of': 131,
        'core-js/modules/es.array.splice': 136
      }
    ],
    190: [
      function (_dereq_, module, exports) {
        'use strict';
        _dereq_('core-js/modules/es.array.splice');
        _dereq_('core-js/modules/es.array.splice');
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        var _main = _interopRequireDefault(_dereq_('./main'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }
        var Envelope =        /*#__PURE__*/
        function () {
          function Envelope(t1, l1, t2, l2, t3, l3) {
            _classCallCheck(this, Envelope);
            /**
     * Time until envelope reaches attackLevel
     * @property attackTime
     */
            this.aTime = t1 || 0.1;
            /**
     * Level once attack is complete.
     * @property attackLevel
     */
            this.aLevel = l1 || 1;
            /**
     * Time until envelope reaches decayLevel.
     * @property decayTime
     */
            this.dTime = t2 || 0.5;
            /**
     * Level after decay. The envelope will sustain here until it is released.
     * @property decayLevel
     */
            this.dLevel = l2 || 0;
            /**
     * Duration of the release portion of the envelope.
     * @property releaseTime
     */
            this.rTime = t3 || 0;
            /**
     * Level at the end of the release.
     * @property releaseLevel
     */
            this.rLevel = l3 || 0;
            this._rampHighPercentage = 0.98;
            this._rampLowPercentage = 0.02;
            this.output = _audioContext.default.createGain();
            this.control = new TimelineSignal();
            this._init(); // this makes sure the envelope starts at zero
            this.control.connect(this.output); // connect to the output
            this.connection = null; // store connection
            //array of math operation signal chaining
            this.mathOps = [
              this.control
            ]; //whether envelope should be linear or exponential curve
            this.isExponential = false; // oscillator or buffer source to clear on env complete
            // to save resources if/when it is retriggered
            this.sourceToClear = null; // set to true if attack is set, then false on release
            this.wasTriggered = false; // add to the soundArray so we can dispose of the env later
            _main.default.soundArray.push(this);
          }          /**
   *  Set values like a traditional
   *  <a href="https://en.wikipedia.org/wiki/Synthesizer#/media/File:ADSR_parameter.svg">
   *  ADSR envelope
   *  </a>.
   *
   *  @method  setADSR
   *  @for p5.Envelope
   *  @param {Number} attackTime    Time (in seconds before envelope
   *                                reaches Attack Level
   *  @param {Number} [decayTime]    Time (in seconds) before envelope
   *                                reaches Decay/Sustain Level
   *  @param {Number} [susRatio]    Ratio between attackLevel and releaseLevel, on a scale from 0 to 1,
   *                                where 1.0 = attackLevel, 0.0 = releaseLevel.
   *                                The susRatio determines the decayLevel and the level at which the
   *                                sustain portion of the envelope will sustain.
   *                                For example, if attackLevel is 0.4, releaseLevel is 0,
   *                                and susAmt is 0.5, the decayLevel would be 0.2. If attackLevel is
   *                                increased to 1.0 (using <code>setRange</code>),
   *                                then decayLevel would increase proportionally, to become 0.5.
   *  @param {Number} [releaseTime]   Time in seconds from now (defaults to 0)
   *  @example
   *  <div><code>
   *  let attackLevel = 1.0;
   *  let releaseLevel = 0;
   *
   *  let attackTime = 0.001;
   *  let decayTime = 0.2;
   *  let susPercent = 0.2;
   *  let releaseTime = 0.5;
   *
   *  let env, triOsc;
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(playEnv);
   *
   *    env = new p5.Envelope();
   *    triOsc = new p5.Oscillator('triangle');
   *    triOsc.amp(env);
   *    triOsc.freq(220);
   *  }
   *
   *  function draw() {
   *    background(220);
   *    text('tap here to play', 5, 20);
   *    attackTime = map(mouseX, 0, width, 0, 1.0);
   *    text('attack time: ' + attackTime, 5, height - 40);
   *  }
   *
   *  function playEnv() {
   *    triOsc.start();
   *    env.setADSR(attackTime, decayTime, susPercent, releaseTime);
   *    env.play();
   *  }
   *  </code></div>
   */

          _createClass(Envelope, [
            {
              key: 'setADSR',
              value: function setADSR(aTime, dTime, sPercent, rTime) {
                this.aTime = aTime;
                this.dTime = dTime || 0; // lerp
                this.sPercent = sPercent || 0;
                this.dLevel = typeof sPercent !== 'undefined' ? sPercent * (this.aLevel - this.rLevel) + this.rLevel : 0;
                this.rTime = rTime || 0; // also set time constants for ramp
                this._setRampAD(aTime, dTime);
              }              /**
     *  Set max (attackLevel) and min (releaseLevel) of envelope.
     *
     *  @method  setRange
     *  @for p5.Envelope
     *  @param {Number} aLevel attack level (defaults to 1)
     *  @param {Number} rLevel release level (defaults to 0)
     *  @example
     *  <div><code>
     *  let attackLevel = 1.0;
     *  let releaseLevel = 0;
     *
     *  let attackTime = 0.001;
     *  let decayTime = 0.2;
     *  let susPercent = 0.2;
     *  let releaseTime = 0.5;
     *
     *  let env, triOsc;
     *
     *  function setup() {
     *    let cnv = createCanvas(100, 100);
     *    cnv.mousePressed(playEnv);
     *
     *    env = new p5.Envelope();
     *    triOsc = new p5.Oscillator('triangle');
     *    triOsc.amp(env);
     *    triOsc.freq(220);
     *  }
     *
     *  function draw() {
     *    background(220);
     *    text('tap here to play', 5, 20);
     *    attackLevel = map(mouseY, height, 0, 0, 1.0);
     *    text('attack level: ' + attackLevel, 5, height - 20);
     *  }
     *
     *  function playEnv() {
     *    triOsc.start();
     *    env.setRange(attackLevel, releaseLevel);
     *    env.play();
     *  }
     *  </code></div>
     */

            },
            {
              key: 'setRange',
              value: function setRange(aLevel, rLevel) {
                this.aLevel = aLevel || 1;
                this.rLevel = rLevel || 0; // not sure if this belongs here:
                // {Number} [dLevel] decay/sustain level (optional)
                // if (typeof(dLevel) !== 'undefined') {
                //   this.dLevel = dLevel
                // } else if (this.sPercent) {
                //   this.dLevel = this.sPercent ? this.sPercent * (this.aLevel - this.rLevel) + this.rLevel : 0;
                // }
              } //  private (undocumented) method called when ADSR is set to set time constants for ramp
              //
              //  Set the <a href="https://en.wikipedia.org/wiki/RC_time_constant">
              //  time constants</a> for simple exponential ramps.
              //  The larger the time constant value, the slower the
              //  transition will be.
              //
              //  method  _setRampAD
              //  param {Number} attackTimeConstant  attack time constant
              //  param {Number} decayTimeConstant   decay time constant
              //

            },
            {
              key: '_setRampAD',
              value: function _setRampAD(t1, t2) {
                this._rampAttackTime = this.checkExpInput(t1);
                this._rampDecayTime = this.checkExpInput(t2);
                var TCDenominator = 1; /// Aatish Bhatia's calculation for time constant for rise(to adjust 1/1-e calculation to any percentage)
                TCDenominator = Math.log(1 / this.checkExpInput(1 - this._rampHighPercentage));
                this._rampAttackTC = t1 / this.checkExpInput(TCDenominator);
                TCDenominator = Math.log(1 / this._rampLowPercentage);
                this._rampDecayTC = t2 / this.checkExpInput(TCDenominator);
              }              /**
     *  <p>Play tells the envelope to start acting on a given input.
     *  If the input is a p5.sound object (i.e. AudioIn, Oscillator,
     *  SoundFile), then Envelope will control its output volume.
     *  Envelopes can also be used to control any <a href="
     *  http://docs.webplatform.org/wiki/apis/webaudio/AudioParam">
     *  Web Audio Audio Param.</a></p>
     *
     *  @method  play
     *  @for p5.Envelope
     *  @param  {Object} unit         A p5.sound object or
     *                                Web Audio Param.
     *  @param  {Number} [startTime]  time from now (in seconds) at which to play
     *  @param  {Number} [sustainTime] time to sustain before releasing the envelope
     *  @example
     *  <div><code>
     *  let attackLevel = 1.0;
     *  let releaseLevel = 0;
     *
     *  let attackTime = 0.001;
     *  let decayTime = 0.2;
     *  let susPercent = 0.2;
     *  let releaseTime = 0.5;
     *
     *  let env, triOsc;
     *
     *  function setup() {
     *    let cnv = createCanvas(100, 100);
     *    cnv.mousePressed(playEnv);
     *
     *    env = new p5.Envelope();
     *    triOsc = new p5.Oscillator('triangle');
     *    triOsc.amp(env);
     *    triOsc.freq(220);
     *    triOsc.start();
     *  }
     *
     *  function draw() {
     *    background(220);
     *    text('tap here to play', 5, 20);
     *    attackTime = map(mouseX, 0, width, 0, 1.0);
     *    attackLevel = map(mouseY, height, 0, 0, 1.0);
     *    text('attack time: ' + attackTime, 5, height - 40);
     *    text('attack level: ' + attackLevel, 5, height - 20);
     *  }
     *
     *  function playEnv() {
     *    // ensure that audio is enabled
     *    userStartAudio();
     *
     *    env.setADSR(attackTime, decayTime, susPercent, releaseTime);
     *    env.setRange(attackLevel, releaseLevel);
     *    env.play();
     *  }
     *  </code></div>
     */

            },
            {
              key: 'play',
              value: function play(unit, secondsFromNow, susTime) {
                var tFromNow = secondsFromNow || 0;
                if (unit) {
                  if (this.connection !== unit) {
                    this.connect(unit);
                  }
                }
                this.triggerAttack(unit, tFromNow);
                this.triggerRelease(unit, tFromNow + this.aTime + this.dTime + ~~susTime);
              } //helper method to protect against zero values being sent to exponential functions

            },
            {
              key: 'checkExpInput',
              value: function checkExpInput(value) {
                if (value <= 0) {
                  value = 1e-8;
                }
                return value;
              }              /**
     *  Trigger the Attack, and Decay portion of the Envelope.
     *  Similar to holding down a key on a piano, but it will
     *  hold the sustain level until you let go. Input can be
     *  any p5.sound object, or a <a href="
     *  http://docs.webplatform.org/wiki/apis/webaudio/AudioParam">
     *  Web Audio Param</a>.
     *
     *  @method  triggerAttack
     *  @for p5.Envelope
     *  @param  {Object} unit p5.sound Object or Web Audio Param
     *  @param  {Number} secondsFromNow time from now (in seconds)
     *  @example
     *  <div><code>
     *  let attackTime = 0.001;
     *  let decayTime = 0.2;
     *  let susPercent = 0.3;
     *  let releaseTime = 0.4;
     *  let env, triOsc;
     *
     *  function setup() {
     *    let cnv = createCanvas(100, 100);
     *    background(220);
     *    textAlign(CENTER);
     *    textSize(10);
     *    text('tap to triggerAttack', width/2, height/2);
     *
     *    env = new p5.Envelope();
     *    env.setADSR(attackTime, decayTime, susPercent, releaseTime);
     *    env.setRange(1.0, 0.0);
     *    triOsc = new p5.Oscillator('triangle');
     *    triOsc.freq(220);
     *
     *    cnv.mousePressed(envAttack);
     *  }
     *
     *  function envAttack()  {
     *    background(0, 255, 255);
     *    text('release to release', width/2, height/2);
     *
     *    // ensures audio is enabled. See also: `userStartAudio`
     *    triOsc.start();
     *
     *    env.triggerAttack(triOsc);
     *  }
     *
     *  function mouseReleased() {
     *    background(220);
     *    text('tap to triggerAttack', width/2, height/2);
     *
     *    env.triggerRelease(triOsc);
     *  }
     *  </code></div>
     */

            },
            {
              key: 'triggerAttack',
              value: function triggerAttack(unit, secondsFromNow) {
                var now = _audioContext.default.currentTime;
                var tFromNow = secondsFromNow || 0;
                var t = now + tFromNow;
                this.lastAttack = t;
                this.wasTriggered = true;
                if (unit) {
                  if (this.connection !== unit) {
                    this.connect(unit);
                  }
                } // get and set value (with linear ramp) to anchor automation

                var valToSet = this.control.getValueAtTime(t);
                if (this.isExponential === true) {
                  this.control.exponentialRampToValueAtTime(this.checkExpInput(valToSet), t);
                } else {
                  this.control.linearRampToValueAtTime(valToSet, t);
                } // after each ramp completes, cancel scheduled values
                // (so they can be overridden in case env has been re-triggered)
                // then, set current value (with linearRamp to avoid click)
                // then, schedule the next automation...
                // attack

                t += this.aTime;
                if (this.isExponential === true) {
                  this.control.exponentialRampToValueAtTime(this.checkExpInput(this.aLevel), t);
                  valToSet = this.checkExpInput(this.control.getValueAtTime(t));
                  this.control.cancelScheduledValues(t);
                  this.control.exponentialRampToValueAtTime(valToSet, t);
                } else {
                  this.control.linearRampToValueAtTime(this.aLevel, t);
                  valToSet = this.control.getValueAtTime(t);
                  this.control.cancelScheduledValues(t);
                  this.control.linearRampToValueAtTime(valToSet, t);
                } // decay to decay level (if using ADSR, then decay level == sustain level)

                t += this.dTime;
                if (this.isExponential === true) {
                  this.control.exponentialRampToValueAtTime(this.checkExpInput(this.dLevel), t);
                  valToSet = this.checkExpInput(this.control.getValueAtTime(t));
                  this.control.cancelScheduledValues(t);
                  this.control.exponentialRampToValueAtTime(valToSet, t);
                } else {
                  this.control.linearRampToValueAtTime(this.dLevel, t);
                  valToSet = this.control.getValueAtTime(t);
                  this.control.cancelScheduledValues(t);
                  this.control.linearRampToValueAtTime(valToSet, t);
                }
              }              /**
     *  Trigger the Release of the Envelope. This is similar to releasing
     *  the key on a piano and letting the sound fade according to the
     *  release level and release time.
     *
     *  @method  triggerRelease
     *  @for p5.Envelope
     *  @param  {Object} unit p5.sound Object or Web Audio Param
     *  @param  {Number} secondsFromNow time to trigger the release
     *  @example
     *  <div><code>
     *  let attackTime = 0.001;
     *  let decayTime = 0.2;
     *  let susPercent = 0.3;
     *  let releaseTime = 0.4;
     *  let env, triOsc;
     *
     *  function setup() {
     *    let cnv = createCanvas(100, 100);
     *    background(220);
     *    textAlign(CENTER);
     *    textSize(10);
     *    text('tap to triggerAttack', width/2, height/2);
     *
     *    env = new p5.Envelope();
     *    env.setADSR(attackTime, decayTime, susPercent, releaseTime);
     *    env.setRange(1.0, 0.0);
     *    triOsc = new p5.Oscillator('triangle');
     *    triOsc.freq(220);
     *
     *    cnv.mousePressed(envAttack);
     *  }
     *
     *  function envAttack()  {
     *    background(0, 255, 255);
     *    text('release to release', width/2, height/2);
     *
     *    // ensures audio is enabled. See also: `userStartAudio`
     *    triOsc.start();
     *
     *    env.triggerAttack(triOsc);
     *  }
     *
     *  function mouseReleased() {
     *    background(220);
     *    text('tap to triggerAttack', width/2, height/2);
     *
     *    env.triggerRelease(triOsc);
     *  }
     *  </code></div>
     */

            },
            {
              key: 'triggerRelease',
              value: function triggerRelease(unit, secondsFromNow) {
                // only trigger a release if an attack was triggered
                if (!this.wasTriggered) {
                  // this currently causes a bit of trouble:
                  // if a later release has been scheduled (via the play function)
                  // a new earlier release won't interrupt it, because
                  // this.wasTriggered has already been set to false.
                  // If we want new earlier releases to override, then we need to
                  // keep track of the last release time, and if the new release time is
                  // earlier, then use it.
                  return;
                }
                var now = _audioContext.default.currentTime;
                var tFromNow = secondsFromNow || 0;
                var t = now + tFromNow;
                if (unit) {
                  if (this.connection !== unit) {
                    this.connect(unit);
                  }
                } // get and set value (with linear or exponential ramp) to anchor automation

                var valToSet = this.control.getValueAtTime(t);
                if (this.isExponential === true) {
                  this.control.exponentialRampToValueAtTime(this.checkExpInput(valToSet), t);
                } else {
                  this.control.linearRampToValueAtTime(valToSet, t);
                } // release

                t += this.rTime;
                if (this.isExponential === true) {
                  this.control.exponentialRampToValueAtTime(this.checkExpInput(this.rLevel), t);
                  valToSet = this.checkExpInput(this.control.getValueAtTime(t));
                  this.control.cancelScheduledValues(t);
                  this.control.exponentialRampToValueAtTime(valToSet, t);
                } else {
                  this.control.linearRampToValueAtTime(this.rLevel, t);
                  valToSet = this.control.getValueAtTime(t);
                  this.control.cancelScheduledValues(t);
                  this.control.linearRampToValueAtTime(valToSet, t);
                }
                this.wasTriggered = false;
              }              /**
     *  Exponentially ramp to a value using the first two
     *  values from <code><a href="#/p5.Envelope/setADSR">setADSR(attackTime, decayTime)</a></code>
     *  as <a href="https://en.wikipedia.org/wiki/RC_time_constant">
     *  time constants</a> for simple exponential ramps.
     *  If the value is higher than current value, it uses attackTime,
     *  while a decrease uses decayTime.
     *
     *  @method  ramp
     *  @for p5.Envelope
     *  @param  {Object} unit           p5.sound Object or Web Audio Param
     *  @param  {Number} secondsFromNow When to trigger the ramp
     *  @param  {Number} v              Target value
     *  @param  {Number} [v2]           Second target value
     *  @example
     *  <div><code>
     *  let env, osc, amp;
     *
     *  let attackTime = 0.001;
     *  let decayTime = 0.2;
     *  let attackLevel = 1;
     *  let decayLevel = 0;
     *
     *  function setup() {
     *    let cnv = createCanvas(100, 100);
     *    fill(0,255,0);
     *    noStroke();
     *
     *    env = new p5.Envelope();
     *    env.setADSR(attackTime, decayTime);
     *    osc = new p5.Oscillator();
     *    osc.amp(env);
     *    amp = new p5.Amplitude();
     *
     *    cnv.mousePressed(triggerRamp);
     *  }
     *
     *  function triggerRamp() {
     *    // ensures audio is enabled. See also: `userStartAudio`
     *    osc.start();
     *
     *    env.ramp(osc, 0, attackLevel, decayLevel);
     *  }
     *
     *  function draw() {
     *    background(20);
     *    text('tap to play', 10, 20);
     *    let h = map(amp.getLevel(), 0, 0.4, 0, height);;
     *    rect(0, height, width, -h);
     *  }
     *  </code></div>
     */

            },
            {
              key: 'ramp',
              value: function ramp(unit, secondsFromNow, v1, v2) {
                var now = _audioContext.default.currentTime;
                var tFromNow = secondsFromNow || 0;
                var t = now + tFromNow;
                var destination1 = this.checkExpInput(v1);
                var destination2 = typeof v2 !== 'undefined' ? this.checkExpInput(v2) : undefined; // connect env to unit if not already connected
                if (unit) {
                  if (this.connection !== unit) {
                    this.connect(unit);
                  }
                } //get current value

                var currentVal = this.checkExpInput(this.control.getValueAtTime(t)); // this.control.cancelScheduledValues(t);
                //if it's going up
                if (destination1 > currentVal) {
                  this.control.setTargetAtTime(destination1, t, this._rampAttackTC);
                  t += this._rampAttackTime;
                } //if it's going down
                 else if (destination1 < currentVal) {
                  this.control.setTargetAtTime(destination1, t, this._rampDecayTC);
                  t += this._rampDecayTime;
                } // Now the second part of envelope begins

                if (destination2 === undefined) return; //if it's going up
                if (destination2 > destination1) {
                  this.control.setTargetAtTime(destination2, t, this._rampAttackTC);
                } //if it's going down
                 else if (destination2 < destination1) {
                  this.control.setTargetAtTime(destination2, t, this._rampDecayTC);
                }
              }
            },
            {
              key: 'connect',
              value: function connect(unit) {
                this.connection = unit; // assume we're talking about output gain
                // unless given a different audio param
                if (unit instanceof Oscillator || unit instanceof p5.SoundFile || unit instanceof p5.AudioIn || unit instanceof p5.Reverb || unit instanceof p5.Noise || unit instanceof p5.Filter || unit instanceof p5.Delay) {
                  unit = unit.output.gain;
                }
                if (unit instanceof AudioParam) {
                  //set the initial value
                  unit.setValueAtTime(0, _audioContext.default.currentTime);
                }
                this.output.connect(unit);
                if (unit && unit._onNewInput) {
                  unit._onNewInput(this);
                }
              }
            },
            {
              key: 'disconnect',
              value: function disconnect() {
                if (this.output) {
                  this.output.disconnect();
                }
              }
            },
            {
              key: '_init',
              value: function _init() {
                var now = _audioContext.default.currentTime;
                var t = now;
                this.control.setTargetAtTime(0.00001, t, 0.001); //also, compute the correct time constants
                this._setRampAD(this.aTime, this.dTime);
              }
            },
            {
              key: 'dispose',
              value: function dispose() {
                var index = _main.default.soundArray.indefOf(this);
                _main.default.soundArray.splice(index, 1);
                this.disconnect();
              }
            }
          ]);
          return Envelope;
        }();
        var _default = Envelope;
        exports.default = _default;
      },
      {
        './audioContext': 213,
        './main': 218,
        'core-js/modules/es.array.splice': 136
      }
    ],
    191: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        } // https://github.com/Tonejs/Tone.js/blob/r10/Tone/core/Gain.js

        var Gain = function Gain() {
          _classCallCheck(this, Gain);
        };
        var _default = Gain; // define(["Tone/core/Tone", "Tone/core/Param", "Tone/type/Type"], function (Tone) {
        // 	"use strict";
        // 	/**
        // 	 *  createGain shim
        // 	 *  @private
        // 	 */
        // 	if (window.GainNode && !AudioContext.prototype.createGain){
        // 		AudioContext.prototype.createGain = AudioContext.prototype.createGainNode;
        // 	}
        // 	/**
        // 	 *  @class A thin wrapper around the Native Web Audio GainNode.
        // 	 *         The GainNode is a basic building block of the Web Audio
        // 	 *         API and is useful for routing audio and adjusting gains.
        // 	 *  @extends {Tone}
        // 	 *  @param  {Number=}  gain  The initial gain of the GainNode
        // 	 *  @param {Tone.Type=} units The units of the gain parameter.
        // 	 */
        // 	Tone.Gain = function(){
        // 		var options = this.optionsObject(arguments, ["gain", "units"], Tone.Gain.defaults);
        // 		/**
        // 		 *  The GainNode
        // 		 *  @type  {GainNode}
        // 		 *  @private
        // 		 */
        // 		this.input = this.output = this._gainNode = this.context.createGain();
        // 		/**
        // 		 *  The gain parameter of the gain node.
        // 		 *  @type {Tone.Param}
        // 		 *  @signal
        // 		 */
        // 		this.gain = new Tone.Param({
        // 			"param" : this._gainNode.gain,
        // 			"units" : options.units,
        // 			"value" : options.gain,
        // 			"convert" : options.convert
        // 		});
        // 		this._readOnly("gain");
        // 	};
        // 	Tone.extend(Tone.Gain);
        // 	/**
        // 	 *  The defaults
        // 	 *  @const
        // 	 *  @type  {Object}
        // 	 */
        // 	Tone.Gain.defaults = {
        // 		"gain" : 1,
        // 		"convert" : true,
        // 	};
        // 	/**
        // 	 *  Clean up.
        // 	 *  @return  {Tone.Gain}  this
        // 	 */
        // 	Tone.Gain.prototype.dispose = function(){
        // 		Tone.Param.prototype.dispose.call(this);
        // 		this._gainNode.disconnect();
        // 		this._gainNode = null;
        // 		this._writable("gain");
        // 		this.gain.dispose();
        // 		this.gain = null;
        // 	};
        // 	//STATIC///////////////////////////////////////////////////////////////////
        // 	/**
        // 	 *  Create input and outputs for this object.
        // 	 *  @param  {Number}  input   The number of inputs
        // 	 *  @param  {Number=}  outputs  The number of outputs
        // 	 *  @return  {Tone}  this
        // 	 *  @internal
        // 	 */
        // 	Tone.prototype.createInsOuts = function(inputs, outputs){
        // 		if (inputs === 1){
        // 			this.input = new Tone.Gain();
        // 		} else if (inputs > 1){
        // 			this.input = new Array(inputs);
        // 		}
        // 		if (outputs === 1){
        // 			this.output = new Tone.Gain();
        // 		} else if (outputs > 1){
        // 			this.output = new Array(inputs);
        // 		}
        // 	};
        // 	///////////////////////////////////////////////////////////////////////////
        // 	return Tone.Gain;
        // });
        exports.default = _default;
      },
      {
      }
    ],
    192: [
      function (_dereq_, module, exports) {
        'use strict';
        _dereq_('core-js/modules/es.symbol');
        _dereq_('core-js/modules/es.symbol.description');
        _dereq_('core-js/modules/es.symbol.iterator');
        _dereq_('core-js/modules/es.array.index-of');
        _dereq_('core-js/modules/es.array.iterator');
        _dereq_('core-js/modules/es.array.splice');
        _dereq_('core-js/modules/es.object.get-prototype-of');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.reflect.construct');
        _dereq_('core-js/modules/es.regexp.to-string');
        _dereq_('core-js/modules/es.string.iterator');
        _dereq_('core-js/modules/web.dom-collections.iterator');
        function _typeof2(obj) {
          if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
            _typeof2 = function _typeof2(obj) {
              return typeof obj;
            };
          } else {
            _typeof2 = function _typeof2(obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
            };
          }
          return _typeof2(obj);
        }
        _dereq_('core-js/modules/es.symbol');
        _dereq_('core-js/modules/es.symbol.description');
        _dereq_('core-js/modules/es.symbol.iterator');
        _dereq_('core-js/modules/es.array.index-of');
        _dereq_('core-js/modules/es.array.iterator');
        _dereq_('core-js/modules/es.array.splice');
        _dereq_('core-js/modules/es.object.get-prototype-of');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.reflect.construct');
        _dereq_('core-js/modules/es.regexp.to-string');
        _dereq_('core-js/modules/es.string.iterator');
        _dereq_('core-js/modules/web.dom-collections.iterator');
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _Oscillator2 = _interopRequireDefault(_dereq_('./Oscillator'));
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        var _main = _interopRequireDefault(_dereq_('./main'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }
        function _typeof(obj) {
          if (typeof Symbol === 'function' && _typeof2(Symbol.iterator) === 'symbol') {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : _typeof2(obj);
            };
          }
          return _typeof(obj);
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function');
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }
        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };
          return _setPrototypeOf(o, p);
        }
        function _createSuper(Derived) {
          function isNativeReflectConstruct() {
            if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if (typeof Proxy === 'function') return true;
            try {
              Date.prototype.toString.call(Reflect.construct(Date, [
              ], function () {
              }));
              return true;
            } catch (e) {
              return false;
            }
          }
          return function () {
            var Super = _getPrototypeOf(Derived),
            result;
            if (isNativeReflectConstruct()) {
              var NewTarget = _getPrototypeOf(this).constructor;
              result = Reflect.construct(Super, arguments, NewTarget);
            } else {
              result = Super.apply(this, arguments);
            }
            return _possibleConstructorReturn(this, result);
          };
        }
        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
            return call;
          }
          return _assertThisInitialized(self);
        }
        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
          }
          return self;
        }
        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        } // generate noise buffers

        var _whiteNoiseBuffer = function () {
          var bufferSize = 2 * _audioContext.default.sampleRate;
          var whiteBuffer = _audioContext.default.createBuffer(1, bufferSize, _audioContext.default.sampleRate);
          var noiseData = whiteBuffer.getChannelData(0);
          for (var i = 0; i < bufferSize; i++) {
            noiseData[i] = Math.random() * 2 - 1;
          }
          whiteBuffer.type = 'white';
          return whiteBuffer;
        }();
        var _pinkNoiseBuffer = function () {
          var bufferSize = 2 * _audioContext.default.sampleRate;
          var pinkBuffer = _audioContext.default.createBuffer(1, bufferSize, _audioContext.default.sampleRate);
          var noiseData = pinkBuffer.getChannelData(0);
          var b0,
          b1,
          b2,
          b3,
          b4,
          b5,
          b6;
          b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0;
          for (var i = 0; i < bufferSize; i++) {
            var white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.969 * b2 + white * 0.153852;
            b3 = 0.8665 * b3 + white * 0.3104856;
            b4 = 0.55 * b4 + white * 0.5329522;
            b5 = - 0.7616 * b5 - white * 0.016898;
            noiseData[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            noiseData[i] *= 0.11; // (roughly) compensate for gain
            b6 = white * 0.115926;
          }
          pinkBuffer.type = 'pink';
          return pinkBuffer;
        }();
        var _brownNoiseBuffer = function () {
          var bufferSize = 2 * _audioContext.default.sampleRate;
          var brownBuffer = _audioContext.default.createBuffer(1, bufferSize, _audioContext.default.sampleRate);
          var noiseData = brownBuffer.getChannelData(0);
          var lastOut = 0;
          for (var i = 0; i < bufferSize; i++) {
            var white = Math.random() * 2 - 1;
            noiseData[i] = (lastOut + 0.02 * white) / 1.02;
            lastOut = noiseData[i];
            noiseData[i] *= 3.5;
          }
          brownBuffer.type = 'brown';
          return brownBuffer;
        }();
        var Noise =        /*#__PURE__*/
        function (_Oscillator) {
          _inherits(Noise, _Oscillator);
          var _super = _createSuper(Noise);
          function Noise(type) {
            var _this;
            _classCallCheck(this, Noise);
            _this = _super.call(this);
            var assignType;
            delete _this.f;
            delete _this.freq;
            delete _this.oscillator;
            if (type === 'brown') {
              assignType = _brownNoiseBuffer;
            } else if (type === 'pink') {
              assignType = _pinkNoiseBuffer;
            } else {
              assignType = _whiteNoiseBuffer;
            }
            _this.buffer = assignType;
            return _this;
          }
          _createClass(Noise, [
            {
              key: 'setType',
              value: function setType(type) {
                switch (type) {
                  case 'white':
                    this.buffer = _whiteNoiseBuffer;
                    break;
                  case 'pink':
                    this.buffer = _pinkNoiseBuffer;
                    break;
                  case 'brown':
                    this.buffer = _brownNoiseBuffer;
                    break;
                  default:
                    this.buffer = _whiteNoiseBuffer;
                }
                if (this.started) {
                  var now = _audioContext.default.currentTime;
                  this.stop(now);
                  this.start(now + 0.01);
                }
              }
            },
            {
              key: 'getType',
              value: function getType() {
                return this.buffer.type;
              }
            },
            {
              key: 'start',
              value: function start() {
                if (this.started) {
                  this.stop();
                }
                this.noise = _audioContext.default.createBufferSource();
                this.noise.buffer = this.buffer;
                this.noise.loop = true;
                this.noise.connect(this.output);
                var now = _audioContext.default.currentTime;
                this.noise.start(now);
                this.started = true;
              }
            },
            {
              key: 'stop',
              value: function stop() {
                var now = _audioContext.default.currentTime;
                if (this.noise) {
                  this.noise.stop(now);
                  this.started = false;
                }
              }
            },
            {
              key: 'dispose',
              value: function dispose() {
                var now = _audioContext.default.currentTime; // remove reference from soundArray
                var index = _main.default.soundArray.indexOf(this);
                _main.default.soundArray.splice(index, 1);
                if (this.noise) {
                  this.noise.disconnect();
                  this.stop(now);
                }
                if (this.output) {
                  this.output.disconnect();
                }
                if (this.panner) {
                  this.panner.disconnect();
                }
                this.output = null;
                this.panner = null;
                this.buffer = null;
                this.noise = null;
              }
            }
          ]);
          return Noise;
        }(_Oscillator2.default);
        var _default = Noise;
        exports.default = _default;
      },
      {
        './Oscillator': 193,
        './audioContext': 213,
        './main': 218,
        'core-js/modules/es.array.index-of': 131,
        'core-js/modules/es.array.iterator': 132,
        'core-js/modules/es.array.splice': 136,
        'core-js/modules/es.object.get-prototype-of': 139,
        'core-js/modules/es.object.to-string': 140,
        'core-js/modules/es.reflect.construct': 142,
        'core-js/modules/es.regexp.to-string': 145,
        'core-js/modules/es.string.iterator': 146,
        'core-js/modules/es.symbol': 153,
        'core-js/modules/es.symbol.description': 151,
        'core-js/modules/es.symbol.iterator': 152,
        'core-js/modules/web.dom-collections.iterator': 181
      }
    ],
    193: [
      function (_dereq_, module, exports) {
        'use strict';
        _dereq_('core-js/modules/es.symbol');
        _dereq_('core-js/modules/es.symbol.description');
        _dereq_('core-js/modules/es.symbol.iterator');
        _dereq_('core-js/modules/es.array.index-of');
        _dereq_('core-js/modules/es.array.iterator');
        _dereq_('core-js/modules/es.array.splice');
        _dereq_('core-js/modules/es.object.get-prototype-of');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.reflect.construct');
        _dereq_('core-js/modules/es.regexp.to-string');
        _dereq_('core-js/modules/es.string.iterator');
        _dereq_('core-js/modules/web.dom-collections.iterator');
        function _typeof2(obj) {
          if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
            _typeof2 = function _typeof2(obj) {
              return typeof obj;
            };
          } else {
            _typeof2 = function _typeof2(obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
            };
          }
          return _typeof2(obj);
        }
        _dereq_('core-js/modules/es.symbol');
        _dereq_('core-js/modules/es.symbol.description');
        _dereq_('core-js/modules/es.symbol.iterator');
        _dereq_('core-js/modules/es.array.index-of');
        _dereq_('core-js/modules/es.array.iterator');
        _dereq_('core-js/modules/es.array.splice');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.reflect.construct');
        _dereq_('core-js/modules/es.regexp.to-string');
        _dereq_('core-js/modules/es.string.iterator');
        _dereq_('core-js/modules/web.dom-collections.iterator');
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.SqrOsc = exports.SawOsc = exports.TriOsc = exports.SinOsc = exports.default = void 0;
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        var _main = _interopRequireDefault(_dereq_('./main'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }
        function _typeof(obj) {
          if (typeof Symbol === 'function' && _typeof2(Symbol.iterator) === 'symbol') {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : _typeof2(obj);
            };
          }
          return _typeof(obj);
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function');
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }
        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };
          return _setPrototypeOf(o, p);
        }
        function _createSuper(Derived) {
          function isNativeReflectConstruct() {
            if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if (typeof Proxy === 'function') return true;
            try {
              Date.prototype.toString.call(Reflect.construct(Date, [
              ], function () {
              }));
              return true;
            } catch (e) {
              return false;
            }
          }
          return function () {
            var Super = _getPrototypeOf(Derived),
            result;
            if (isNativeReflectConstruct()) {
              var NewTarget = _getPrototypeOf(this).constructor;
              result = Reflect.construct(Super, arguments, NewTarget);
            } else {
              result = Super.apply(this, arguments);
            }
            return _possibleConstructorReturn(this, result);
          };
        }
        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
            return call;
          }
          return _assertThisInitialized(self);
        }
        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
          }
          return self;
        }
        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }        /**
 * @module Sound
 * @submodule Oscillator
 * @for p5
 * @requires core
 */
        /**
 * Creates a  new <a href="#/p5sound.Oscillator">p5sound.Oscillator</a>
 *
 * Example coming soon...
 */
        // ========================== //
        // SIGNAL MATH FOR MODULATION //
        // ========================== //
        // function sigChain(nodes, newNode, nodeType, input, output) {
        //   let prevNode = null;
        //   let nextNode = null;
        //   let replacedNode = null;
        //   // If nodes already contains an node of type nodeType, replace that node
        //   // with newNode.
        //   for (let i = 0; i < nodes.length; i++) {
        //     if (nodes[i] instanceof nodeType) {
        //       prevNode = i === 0 ? input : nodes[i - 1];
        //       nextNode = i === nodes.length - 1 ? output : nodes[i + 1];
        //       replacedNode = nodes[i];
        //       nodes[i] = newNode;
        //       break;
        //     }
        //   }
        //   // Otherwise, add newMathOp to the end of mathOps.
        //   if (replacedNode === null) {
        //     prevNode = nodes.length === 0 ? input : nodes[nodes.length - 1];
        //     nextNode = output;
        //     nodes.push(newNode);
        //   }
        //   // Connect the newMathOp to the previous and next nodes.
        //   prevNode.disconnect();
        //   if (replacedNode !== null) {
        //     replacedNode.disconnect();
        //     replacedNode.dispose();
        //   }
        //   prevNode.connect(newNode);
        //   newNode.connect(nextNode);
        // }
        // reference
        // https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/destination
        // jason recommends to play with the web audio api on the console
        // on google chrome
        /*
 * Class methods
 */
        /**
*
* @class Oscillator
* @constructor
* @param {Number} type
*/

        var Oscillator =        /*#__PURE__*/
        function () {
          function Oscillator(freq, type) {
            _classCallCheck(this, Oscillator); // proofing the constructor
            if (typeof freq === 'string') {
              var f = type;
              type = freq;
              freq = f;
            }
            if (typeof type === 'number') {
              var _f = type;
              type = freq;
              freq = _f;
            } // sine, triangle, square, saw, pulse

            this.type = type;
            this.started = false; // components
            //this.phaseAmount = undefined;
            this.oscillator = _audioContext.default.createOscillator();
            this.f = freq || 440; // frequency
            this.oscillator.type = type || 'sine';
            this.oscillator.frequency.setValueAtTime(this.f, _audioContext.default.currentTime); // connections
            this.output = _audioContext.default.createGain(); // set default output gain to 0.5
            // TODO: maybe think of a constant that people can tweak
            // for max volume
            this.output.gain.value = 0.5; // this.output.gain.setValueAtTime(0.5, audioContext.currentTime);
            this.oscillator.connect(this.output); // stereo panning
            //this.connection = p5.input; // connect to p5sound by default
            //this.panner = new Panner();
            //this.output.connect(this.panner);
            // this.output.connect(audioContext.destination);
            this.output.connect(_main.default.input); // if you wanna do 3D node panners
            // please do it with web audio api,
            // everything we are doing here its compatible
            // add to the soundArray so we can dispose of the osc later
            _main.default.soundArray.push(this); // TODO: try a different approach
            // not create references to the audio nodes
            // so that we dont use up so much memory
            // array of math operation signal chaining
            this.mathOps = [
            ]; // these methods are now the same thing
            //this.fade = this.amp;
          }          /**
   *  Start an oscillator.
   *
   *  Starting an oscillator on a user gesture will enable audio in browsers
   *  that have a strict autoplay policy, including Chrome and most mobile
   *  devices. See also: <a href="#/p5/userStartAudio">userStartAudio()</a>.
   *
   *  @method  start
   *  @for p5.Oscillator
   *  @param  {Number} [time] startTime in seconds from now.
   *  @param  {Number} [frequency] frequency in Hz.
   */

          _createClass(Oscillator, [
            {
              key: 'start',
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
                  this.oscillator.start(time + _audioContext.default.currentTime); // this.freqNode = this.oscillator.frequency;
                  // // if other oscillators are already connected to this osc's freq
                  // for (let i in this._freqMods) {
                  //   if (typeof this._freqMods[i].connect !== 'undefined') {
                  //     this._freqMods[i].connect(this.oscillator.frequency);
                  //   }
                  // }
                  this.started = true;
                }
              }              /**
     *  Stop an oscillator. Accepts an optional parameter
     *  to determine how long (in seconds from now) until the
     *  oscillator stops.
     *
     *  @method  stop
     *  @for p5.Oscillator
     *  @param  {Number} [secondsFromNow] Time, in seconds from now.
     */
              // hopefully we can get rid of the started variable

            },
            {
              key: 'stop',
              value: function stop(time) {
                if (this.started) {
                  var t = time || 0;
                  var now = _audioContext.default.currentTime;
                  this.oscillator.stop(t + now);
                  this.started = false;
                }
              }              /**
     *  Set the amplitude between 0 and 1.0. Or, pass in an object
     *  such as an oscillator to modulate amplitude with an audio signal.
     *
     *  @method  amp
     *  @for p5.Oscillator
     *  @param  {Number|Object} vol between 0 and 1.0
     *                              or a modulating signal/oscillator
     *  @param {Number} [rampTime] create a fade that lasts rampTime
     *  @param {Number} [timeFromNow] schedule this event to happen
     *                                seconds from now
     *  @return  {AudioParam} gain  If no value is provided,
     *                              returns the Web Audio API
     *                              AudioParam that controls
     *                              this oscillator's
     *                              gain/amplitude/volume)
     */

            },
            {
              key: 'amp',
              value: function amp(vol) {
                var rampTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                var tFromNow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
                if (typeof vol === 'number') {
                  var now = _audioContext.default.currentTime;
                  this.output.gain.linearRampToValueAtTime(vol, now + tFromNow + rampTime);
                } else if (vol) {
                  vol.connect(this.output.gain);
                } else {
                  // return the Gain Node
                  return this.output.gain;
                }
              }              /**
     *  Set frequency of an oscillator to a value. Or, pass in an object
     *  such as an oscillator to modulate the frequency with an audio signal.
     *
     *  @method  freq
     *  @for p5.Oscillator
     *  @param  {Number|Object} Frequency Frequency in Hz
     *                                        or modulating signal/oscillator
     *  @param  {Number} [rampTime] Ramp time (in seconds)
     *  @param  {Number} [timeFromNow] Schedule this event to happen
     *                                   at x seconds from now
     *  @return  {AudioParam} Frequency If no value is provided,
     *                                  returns the Web Audio API
     *                                  AudioParam that controls
     *                                  this oscillator's frequency
     *  @example
     *  <div><code>
     *  let osc;
     *
     *  function setup() {
     *    let cnv = createCanvas(100, 100);
     *    cnv.mousePressed(playOscillator);
     *    osc = new p5.Oscillator(300);
     *    background(220);
     *    text('tap to play', 20, 20);
     *  }
     *
     *  function playOscillator() {
     *    osc.start();
     *    osc.amp(0.5);
     *    // start at 700Hz
     *    osc.freq(700);
     *    // ramp to 60Hz over 0.7 seconds
     *    osc.freq(60, 0.7);
     *    osc.amp(0, 0.1, 0.7);
     *  }
     *  </code></div>
     */

            },
            {
              key: 'freq',
              value: function freq(val) {
                var rampTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                var tFromNow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
                if (typeof val === 'number' && !isNaN(val)) {
                  this.f = val;
                  var now = _audioContext.default.currentTime;
                  if (rampTime === 0) {
                    this.oscillator.frequency.setValueAtTime(val, tFromNow + now);
                  } else {
                    if (val > 0) {
                      this.oscillator.frequency.exponentialRampToValueAtTime(val, tFromNow + rampTime + now);
                    } else {
                      this.oscillator.frequency.linearRampToValueAtTime(val, tFromNow + rampTime + now);
                    }
                  } // reset phase if oscillator has a phase

                  if (this.phaseAmount) {
                    this.phase(this.phaseAmount);
                  }
                } else if (val) {
                  if (val.output) {
                    val = val.output;
                  }
                  val.connect(this.oscillator.frequency); // keep track of what is modulating this param
                  // so it can be re-connected if
                  this._freqMods.push(val);
                } else {
                  // return the Frequency Node
                  return this.oscillator.frequency;
                }
              }              /**
     * Returns the value of frequency of oscillator
     *
     *  @method  getFreq
     *  @for p5.Oscillator
     *  @returns {number} Frequency of oscillator in Hertz
     */

            },
            {
              key: 'getFreq',
              value: function getFreq() {
                return this.oscillator.frequency.value;
              }              /**
     *  Set type to 'sine', 'triangle', 'sawtooth' or 'square'.
     *
     *  @method  setType
     *  @for p5.Oscillator
     *  @param {String} type 'sine', 'triangle', 'sawtooth' or 'square'.
     */

            },
            {
              key: 'setType',
              value: function setType(type) {
                this.oscillator.type = type;
              }              /**
       *  Returns  current type of oscillator eg. 'sine', 'triangle', 'sawtooth' or 'square'.
       *
       *  @method  getType
       *  @for p5.Oscillator
       *  @returns {String} type of oscillator  eg . 'sine', 'triangle', 'sawtooth' or 'square'.
       */

            },
            {
              key: 'getType',
              value: function getType() {
                return this.oscillator.type;
              }              /**
     *  Connect to a p5.sound / Web Audio object.
     *
     *  @method  connect
     *  @for p5.Oscillator
     *  @param  {Object} unit A p5.sound or Web Audio object
     */

            },
            {
              key: 'connect',
              value: function connect(unit) {
                if (!unit) {
                  this.output.connect(_main.default.input);
                } else if (unit.hasOwnProperty('input')) {
                  this.output.connect(unit.input);
                } else {
                  this.output.connect(unit);
                }
                if (unit && unit._onNewInput) {
                  unit._onNewInput(this);
                }
              }              /**
     *  Disconnect all outputs
     *
     *  @method  disconnect
     *  @for p5.Oscillator
     */

            },
            {
              key: 'disconnect',
              value: function disconnect() {
                if (this.output) {
                  this.output.disconnect();
                } // if (this.panner) {
                //   this.panner.disconnect();
                //   if (this.output) {
                //     this.output.connect(this.panner);
                //   }
                // }

              } // get rid of the oscillator

            },
            {
              key: 'dispose',
              value: function dispose() {
                // remove reference from soundArray
                var index = _main.default.soundArray.indexOf(this);
                _main.default.soundArray.splice(index, 1);
                if (this.oscillator) {
                  var now = this.audiocontext.currentTime;
                  this.stop(now);
                  this.disconnect(); // this.panner.dispose();
                  // this.panner = null;
                  this.oscillator = null;
                } // if it is a Pulse
                // if (this.osc2) {
                // this.osc2.dispose();
                // }

              }              /**
     *  Set the phase of an oscillator between 0.0 and 1.0.
     *  In this implementation, phase is a delay time
     *  based on the oscillator's current frequency.
     *
     *  @method  phase
     *  @for p5.Oscillator
     *  @param  {Number} phase float between 0.0 and 1.0
     */
              // phase(p) {
              //   let delayAmt = p5.prototype.map(p, 0, 1.0, 0, 1 / this.f);
              //   let now = this.audioContext.currentTime;
              //   this.phaseAmount = p;
              //   if (!this.dNode) {
              //     // create a delay node
              //     this.dNode = p5sound.audiocontext.createDelay();
              //     // put the delay node in between output and panner
              //     this.oscillator.disconnect();
              //     this.oscillator.connect(this.dNode);
              //     this.dNode.connect(this.output);
              //   }
              //   // set delay time to match phase:
              //   this.dNode.delayTime.setValueAtTime(delayAmt, now);
              // }

            }
          ]);
          return Oscillator;
        }();
        var SinOsc =        /*#__PURE__*/
        function (_Oscillator) {
          _inherits(SinOsc, _Oscillator);
          var _super = _createSuper(SinOsc);
          function SinOsc(freq) {
            _classCallCheck(this, SinOsc);
            return _super.call(this, freq, 'sine');
          }
          return SinOsc;
        }(Oscillator);
        /**
 *  Constructor: <code>new p5.TriOsc()</code>.
 *  This creates a Triangle Wave Oscillator and is
 *  equivalent to <code>new p5.Oscillator('triangle')
 *  </code> or creating a p5.Oscillator and then calling
 *  its method <code>setType('triangle')</code>.
 *  See p5.Oscillator for methods.
 *
 *  @class  p5.TriOsc
 *  @constructor
 *  @extends p5.Oscillator
 *  @param {Number} [freq] Set the frequency
 */
        exports.SinOsc = SinOsc;
        var TriOsc =        /*#__PURE__*/
        function (_Oscillator2) {
          _inherits(TriOsc, _Oscillator2);
          var _super2 = _createSuper(TriOsc);
          function TriOsc(freq) {
            _classCallCheck(this, TriOsc);
            return _super2.call(this, freq, 'triangle');
          }
          return TriOsc;
        }(Oscillator);
        /**
 *  Constructor: <code>new p5.SawOsc()</code>.
 *  This creates a SawTooth Wave Oscillator and is
 *  equivalent to <code> new p5.Oscillator('sawtooth')
 *  </code> or creating a p5.Oscillator and then calling
 *  its method <code>setType('sawtooth')</code>.
 *  See p5.Oscillator for methods.
 *
 *  @class  p5.SawOsc
 *  @constructor
 *  @extends p5.Oscillator
 *  @param {Number} [freq] Set the frequency
 */
        exports.TriOsc = TriOsc;
        var SawOsc =        /*#__PURE__*/
        function (_Oscillator3) {
          _inherits(SawOsc, _Oscillator3);
          var _super3 = _createSuper(SawOsc);
          function SawOsc(freq) {
            _classCallCheck(this, SawOsc);
            return _super3.call(this, freq, 'sawtooth');
          }
          return SawOsc;
        }(Oscillator);
        /**
 *  Constructor: <code>new p5.SqrOsc()</code>.
 *  This creates a Square Wave Oscillator and is
 *  equivalent to <code> new p5.Oscillator('square')
 *  </code> or creating a p5.Oscillator and then calling
 *  its method <code>setType('square')</code>.
 *  See p5.Oscillator for methods.
 *
 *  @class  p5.SqrOsc
 *  @constructor
 *  @extends p5.Oscillator
 *  @param {Number} [freq] Set the frequency
 */
        exports.SawOsc = SawOsc;
        var SqrOsc =        /*#__PURE__*/
        function (_Oscillator4) {
          _inherits(SqrOsc, _Oscillator4);
          var _super4 = _createSuper(SqrOsc);
          function SqrOsc(freq) {
            _classCallCheck(this, SqrOsc);
            return _super4.call(this, freq, 'square');
          }
          return SqrOsc;
        }(Oscillator);
        exports.SqrOsc = SqrOsc;
        var _default = Oscillator;
        exports.default = _default;
      },
      {
        './audioContext': 213,
        './main': 218,
        'core-js/modules/es.array.index-of': 131,
        'core-js/modules/es.array.iterator': 132,
        'core-js/modules/es.array.splice': 136,
        'core-js/modules/es.object.get-prototype-of': 139,
        'core-js/modules/es.object.to-string': 140,
        'core-js/modules/es.reflect.construct': 142,
        'core-js/modules/es.regexp.to-string': 145,
        'core-js/modules/es.string.iterator': 146,
        'core-js/modules/es.symbol': 153,
        'core-js/modules/es.symbol.description': 151,
        'core-js/modules/es.symbol.iterator': 152,
        'core-js/modules/web.dom-collections.iterator': 181
      }
    ],
    194: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        } // https://raw.githubusercontent.com/Tonejs/Tone.js/r10/Tone/core/Param.js

        var Param = function Param() {
          _classCallCheck(this, Param);
        };
        var _default = Param; // define(['Tone/core/Tone', 'Tone/type/Type'], function(Tone){
        //   'use strict';
        //   /**
        // 	 *  @class Tone.Param wraps the native Web Audio's AudioParam to provide
        // 	 *         additional unit conversion functionality. It also
        // 	 *         serves as a base-class for classes which have a single,
        // 	 *         automatable parameter.
        // 	 *  @extends {Tone}
        // 	 *  @param  {AudioParam}  param  The parameter to wrap.
        // 	 *  @param  {Tone.Type} units The units of the audio param.
        // 	 *  @param  {Boolean} convert If the param should be converted.
        // 	 */
        //   Tone.Param = function(){
        //     var options = this.optionsObject(arguments, ['param', 'units', 'convert'], Tone.Param.defaults);
        //     /**
        // 		 *  The native parameter to control
        // 		 *  @type  {AudioParam}
        // 		 *  @private
        // 		 */
        //     this._param = this.input = options.param;
        //     /**
        // 		 *  The units of the parameter
        // 		 *  @type {Tone.Type}
        // 		 */
        //     this.units = options.units;
        //     /**
        // 		 *  If the value should be converted or not
        // 		 *  @type {Boolean}
        // 		 */
        //     this.convert = options.convert;
        //     /**
        // 		 *  True if the signal value is being overridden by
        // 		 *  a connected signal.
        // 		 *  @readOnly
        // 		 *  @type  {boolean}
        // 		 *  @private
        // 		 */
        //     this.overridden = false;
        //     /**
        // 		 *  If there is an LFO, this is where it is held.
        // 		 *  @type  {Tone.LFO}
        // 		 *  @private
        // 		 */
        //     this._lfo = null;
        //     if (this.isObject(options.lfo)){
        //       this.value = options.lfo;
        //     } else if (!this.isUndef(options.value)){
        //       this.value = options.value;
        //     }
        //   };
        //   Tone.extend(Tone.Param);
        //   /**
        // 	 *  Defaults
        // 	 *  @type  {Object}
        // 	 *  @const
        // 	 */
        //   Tone.Param.defaults = {
        //     'units' : Tone.Type.Default,
        //     'convert' : true,
        //     'param' : undefined
        //   };
        //   /**
        // 	 * The current value of the parameter.
        // 	 * @memberOf Tone.Param#
        // 	 * @type {Number}
        // 	 * @name value
        // 	 */
        //   Object.defineProperty(Tone.Param.prototype, 'value', {
        //     get : function(){
        //       return this._toUnits(this._param.value);
        //     },
        //     set : function(value){
        //       if (this.isObject(value)){
        //         //throw an error if the LFO needs to be included
        //         if (this.isUndef(Tone.LFO)){
        //           throw new Error("Include 'Tone.LFO' to use an LFO as a Param value.");
        //         }
        //         //remove the old one
        //         if (this._lfo){
        //           this._lfo.dispose();
        //         }
        //         this._lfo = new Tone.LFO(value).start();
        //         this._lfo.connect(this.input);
        //       } else {
        //         var convertedVal = this._fromUnits(value);
        //         this._param.cancelScheduledValues(0);
        //         this._param.value = convertedVal;
        //       }
        //     }
        //   });
        //   /**
        // 	 *  Convert the given value from the type specified by Tone.Param.units
        // 	 *  into the destination value (such as Gain or Frequency).
        // 	 *  @private
        // 	 *  @param  {*} val the value to convert
        // 	 *  @return {number}     the number which the value should be set to
        // 	 */
        //   Tone.Param.prototype._fromUnits = function(val){
        //     if (this.convert || this.isUndef(this.convert)){
        //       switch(this.units){
        //         case Tone.Type.Time:
        //           return this.toSeconds(val);
        //         case Tone.Type.Frequency:
        //           return this.toFrequency(val);
        //         case Tone.Type.Decibels:
        //           return this.dbToGain(val);
        //         case Tone.Type.NormalRange:
        //           return Math.min(Math.max(val, 0), 1);
        //         case Tone.Type.AudioRange:
        //           return Math.min(Math.max(val, -1), 1);
        //         case Tone.Type.Positive:
        //           return Math.max(val, 0);
        //         default:
        //           return val;
        //       }
        //     } else {
        //       return val;
        //     }
        //   };
        //   /**
        // 	 * Convert the parameters value into the units specified by Tone.Param.units.
        // 	 * @private
        // 	 * @param  {number} val the value to convert
        // 	 * @return {number}
        // 	 */
        //   Tone.Param.prototype._toUnits = function(val){
        //     if (this.convert || this.isUndef(this.convert)){
        //       switch(this.units){
        //         case Tone.Type.Decibels:
        //           return this.gainToDb(val);
        //         default:
        //           return val;
        //       }
        //     } else {
        //       return val;
        //     }
        //   };
        //   /**
        // 	 *  the minimum output value
        // 	 *  @type {Number}
        // 	 *  @private
        // 	 */
        //   Tone.Param.prototype._minOutput = 0.00001;
        //   /**
        // 	 *  Schedules a parameter value change at the given time.
        // 	 *  @param {*}	value The value to set the signal.
        // 	 *  @param {Time}  time The time when the change should occur.
        // 	 *  @returns {Tone.Param} this
        // 	 *  @example
        // 	 * //set the frequency to "G4" in exactly 1 second from now.
        // 	 * freq.setValueAtTime("G4", "+1");
        // 	 */
        //   Tone.Param.prototype.setValueAtTime = function(value, time){
        //     value = this._fromUnits(value);
        //     time = this.toSeconds(time);
        //     if (time <= this.now() + this.blockTime){
        //       this._param.value = value;
        //     } else {
        //       this._param.setValueAtTime(value, time);
        //     }
        //     return this;
        //   };
        //   /**
        // 	 *  Creates a schedule point with the current value at the current time.
        // 	 *  This is useful for creating an automation anchor point in order to
        // 	 *  schedule changes from the current value.
        // 	 *
        // 	 *  @param {number=} now (Optionally) pass the now value in.
        // 	 *  @returns {Tone.Param} this
        // 	 */
        //   Tone.Param.prototype.setRampPoint = function(now){
        //     now = this.defaultArg(now, this.now());
        //     var currentVal = this._param.value;
        //     // exponentialRampToValueAt cannot ever ramp from or to 0
        //     // More info: https://bugzilla.mozilla.org/show_bug.cgi?id=1125600#c2
        //     if (currentVal === 0){
        //       currentVal = this._minOutput;
        //     }
        //     this._param.setValueAtTime(currentVal, now);
        //     return this;
        //   };
        //   /**
        // 	 *  Schedules a linear continuous change in parameter value from the
        // 	 *  previous scheduled parameter value to the given value.
        // 	 *
        // 	 *  @param  {number} value
        // 	 *  @param  {Time} endTime
        // 	 *  @returns {Tone.Param} this
        // 	 */
        //   Tone.Param.prototype.linearRampToValueAtTime = function(value, endTime){
        //     value = this._fromUnits(value);
        //     this._param.linearRampToValueAtTime(value, this.toSeconds(endTime));
        //     return this;
        //   };
        //   /**
        // 	 *  Schedules an exponential continuous change in parameter value from
        // 	 *  the previous scheduled parameter value to the given value.
        // 	 *
        // 	 *  @param  {number} value
        // 	 *  @param  {Time} endTime
        // 	 *  @returns {Tone.Param} this
        // 	 */
        //   Tone.Param.prototype.exponentialRampToValueAtTime = function(value, endTime){
        //     value = this._fromUnits(value);
        //     value = Math.max(this._minOutput, value);
        //     this._param.exponentialRampToValueAtTime(value, this.toSeconds(endTime));
        //     return this;
        //   };
        //   /**
        // 	 *  Schedules an exponential continuous change in parameter value from
        // 	 *  the current time and current value to the given value over the
        // 	 *  duration of the rampTime.
        // 	 *
        // 	 *  @param  {number} value   The value to ramp to.
        // 	 *  @param  {Time} rampTime the time that it takes the
        // 	 *                               value to ramp from it's current value
        // 	 *  @param {Time}	[startTime=now] 	When the ramp should start.
        // 	 *  @returns {Tone.Param} this
        // 	 *  @example
        // 	 * //exponentially ramp to the value 2 over 4 seconds.
        // 	 * signal.exponentialRampToValue(2, 4);
        // 	 */
        //   Tone.Param.prototype.exponentialRampToValue = function(value, rampTime, startTime){
        //     startTime = this.toSeconds(startTime);
        //     this.setRampPoint(startTime);
        //     this.exponentialRampToValueAtTime(value, startTime + this.toSeconds(rampTime));
        //     return this;
        //   };
        //   /**
        // 	 *  Schedules an linear continuous change in parameter value from
        // 	 *  the current time and current value to the given value over the
        // 	 *  duration of the rampTime.
        // 	 *
        // 	 *  @param  {number} value   The value to ramp to.
        // 	 *  @param  {Time} rampTime the time that it takes the
        // 	 *                               value to ramp from it's current value
        // 	 *  @param {Time}	[startTime=now] 	When the ramp should start.
        // 	 *  @returns {Tone.Param} this
        // 	 *  @example
        // 	 * //linearly ramp to the value 4 over 3 seconds.
        // 	 * signal.linearRampToValue(4, 3);
        // 	 */
        //   Tone.Param.prototype.linearRampToValue = function(value, rampTime, startTime){
        //     startTime = this.toSeconds(startTime);
        //     this.setRampPoint(startTime);
        //     this.linearRampToValueAtTime(value, startTime + this.toSeconds(rampTime));
        //     return this;
        //   };
        //   /**
        // 	 *  Start exponentially approaching the target value at the given time with
        // 	 *  a rate having the given time constant.
        // 	 *  @param {number} value
        // 	 *  @param {Time} startTime
        // 	 *  @param {number} timeConstant
        // 	 *  @returns {Tone.Param} this
        // 	 */
        //   Tone.Param.prototype.setTargetAtTime = function(value, startTime, timeConstant){
        //     value = this._fromUnits(value);
        //     // The value will never be able to approach without timeConstant > 0.
        //     // http://www.w3.org/TR/webaudio/#dfn-setTargetAtTime, where the equation
        //     // is described. 0 results in a division by 0.
        //     value = Math.max(this._minOutput, value);
        //     timeConstant = Math.max(this._minOutput, timeConstant);
        //     this._param.setTargetAtTime(value, this.toSeconds(startTime), timeConstant);
        //     return this;
        //   };
        //   /**
        // 	 *  Sets an array of arbitrary parameter values starting at the given time
        // 	 *  for the given duration.
        // 	 *
        // 	 *  @param {Array} values
        // 	 *  @param {Time} startTime
        // 	 *  @param {Time} duration
        // 	 *  @returns {Tone.Param} this
        // 	 */
        //   Tone.Param.prototype.setValueCurveAtTime = function(values, startTime, duration){
        //     for (var i = 0; i < values.length; i++){
        //       values[i] = this._fromUnits(values[i]);
        //     }
        //     this._param.setValueCurveAtTime(values, this.toSeconds(startTime), this.toSeconds(duration));
        //     return this;
        //   };
        //   /**
        // 	 *  Cancels all scheduled parameter changes with times greater than or
        // 	 *  equal to startTime.
        // 	 *
        // 	 *  @param  {Time} startTime
        // 	 *  @returns {Tone.Param} this
        // 	 */
        //   Tone.Param.prototype.cancelScheduledValues = function(startTime){
        //     this._param.cancelScheduledValues(this.toSeconds(startTime));
        //     return this;
        //   };
        //   /**
        // 	 *  Ramps to the given value over the duration of the rampTime.
        // 	 *  Automatically selects the best ramp type (exponential or linear)
        // 	 *  depending on the `units` of the signal
        // 	 *
        // 	 *  @param  {number} value
        // 	 *  @param  {Time} rampTime 	The time that it takes the
        // 	 *                              value to ramp from it's current value
        // 	 *  @param {Time}	[startTime=now] 	When the ramp should start.
        // 	 *  @returns {Tone.Param} this
        // 	 *  @example
        // 	 * //ramp to the value either linearly or exponentially
        // 	 * //depending on the "units" value of the signal
        // 	 * signal.rampTo(0, 10);
        // 	 *  @example
        // 	 * //schedule it to ramp starting at a specific time
        // 	 * signal.rampTo(0, 10, 5)
        // 	 */
        //   Tone.Param.prototype.rampTo = function(value, rampTime, startTime){
        //     rampTime = this.defaultArg(rampTime, 0);
        //     if (this.units === Tone.Type.Frequency || this.units === Tone.Type.BPM || this.units === Tone.Type.Decibels){
        //       this.exponentialRampToValue(value, rampTime, startTime);
        //     } else {
        //       this.linearRampToValue(value, rampTime, startTime);
        //     }
        //     return this;
        //   };
        //   /**
        // 	 *  The LFO created by the signal instance. If none
        // 	 *  was created, this is null.
        // 	 *  @type {Tone.LFO}
        // 	 *  @readOnly
        // 	 *  @memberOf Tone.Param#
        // 	 *  @name lfo
        // 	 */
        //   Object.defineProperty(Tone.Param.prototype, 'lfo', {
        //     get : function(){
        //       return this._lfo;
        //     }
        //   });
        //   /**
        // 	 *  Clean up
        // 	 *  @returns {Tone.Param} this
        // 	 */
        //   Tone.Param.prototype.dispose = function(){
        //     Tone.prototype.dispose.call(this);
        //     this._param = null;
        //     if (this._lfo){
        //       this._lfo.dispose();
        //       this._lfo = null;
        //     }
        //     return this;
        //   };
        //   return Tone.Param;
        // });
        exports.default = _default;
      },
      {
      }
    ],
    195: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _Param = _interopRequireDefault(_dereq_('./Param'));
        var _SignalBase = _interopRequireDefault(_dereq_('./SignalBase'));
        var _Type = _interopRequireDefault(_dereq_('./Type'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        } // import SignalWaveShaper from './SignalWaveShaper';
        /**
	 *  @class  A signal is an audio-rate value. Tone.Signal is a core component of the library.
	 *          Unlike a number, Signals can be scheduled with sample-level accuracy. Tone.Signal
	 *          has all of the methods available to native Web Audio
	 *          [AudioParam](http://webaudio.github.io/web-audio-api/#the-audioparam-interface)
	 *          as well as additional conveniences. Read more about working with signals
	 *          [here](https://github.com/Tonejs/Tone.js/wiki/Signals).
	 *
	 *  @constructor
	 *  @extends {Tone.Param}
	 *  @param {Number|AudioParam} [value] Initial value of the signal. If an AudioParam
	 *                                     is passed in, that parameter will be wrapped
	 *                                     and controlled by the Signal.
	 *  @param {string} [units=Number] unit The units the signal is in.
	 *  @example
	 * var signal = new Tone.Signal(10);
	 */

        var Signal =        /*#__PURE__*/
        function () {
          function Signal() {
            _classCallCheck(this, Signal);
            this.defaults = {
              'value': 0,
              'units': _Type.default.Default,
              'convert': true
            };
            var options = this.optionsObject(arguments, [
              'value',
              'units'
            ], Signal.defaults);
            /**
    * The node where the constant signal value is scaled.
    * @type {GainNode}
    * @private
    */
            this.output = this._gain = this.audioContext.createGain();
            options.param = this._gain.gain;
            _Param.default.call(this, options);
            /**
    * The node where the value is set.
    * @type {Tone.Param}
    * @private
    */
            this.input = this._param = this._gain.gain;
            /**
    * The node where the value is set.
    * @type {Tone.Param}
    * @private
    */
            this.input = this._param = this._gain.gain; //connect the const output to the node output
            this.audioContext.getConstant(1).chain(this._gain);
          }          /**
  	 *  When signals connect to other signals or AudioParams,
  	 *  they take over the output value of that signal or AudioParam.
  	 *  For all other nodes, the behavior is the same as a default <code>connect</code>.
  	 *
  	 *  @override
  	 *  @param {AudioParam|AudioNode|Tone.Signal|Tone} node
  	 *  @param {number} [outputNumber=0] The output number to connect from.
  	 *  @param {number} [inputNumber=0] The input number to connect to.
  	 *  @returns {Tone.SignalBase} this
  	 *  @method
  	 */

          _createClass(Signal, [
            {
              key: 'connect',
              value: function connect() {
                _SignalBase.default.prototype.connect;
              }              /**
    *  dispose and disconnect
    *  @returns {Tone.Signal} this
    */

            },
            {
              key: 'dispose',
              value: function dispose() {
                _Param.default.prototype.dispose.call(this);
                this._param = null;
                this._gain.disconnect();
                this._gain = null;
                return this;
              }
            }
          ]);
          return Signal;
        }();
        var _default = Signal;
        exports.default = _default;
      },
      {
        './Param': 194,
        './SignalBase': 199,
        './Type': 211
      }
    ],
    196: [
      function (_dereq_, module, exports) {
        'use strict';
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.regexp.to-string');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.regexp.to-string');
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _SignalWaveShaper = _interopRequireDefault(_dereq_('./SignalWaveShaper'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }        /**
*  @class Return the absolute value of an incoming signal.
*
*  @constructor
*  @extends {SignalBase}
*  @example
* let signal = new Tone.Signal(-1);
* let abs = new Tone.Abs();
* signal.connect(abs);
* //the output of abs is 1.
*/

        var SignalAbs =        /*#__PURE__*/
        function () {
          /**
  *  @type {Tone.LessThan}
  *  @private
  */
          function SignalAbs() {
            _classCallCheck(this, SignalAbs);
            this._abs = this.input = this.output = new _SignalWaveShaper.default(function (val) {
              if (val === 0) {
                return 0;
              } else {
                return Math.abs(val);
              }
            }, 127);
          }          /**
  *  dispose method
  *  @returns {Tone.Abs} this
  */

          _createClass(SignalAbs, [
            {
              key: 'dispose',
              value: function (_dispose) {
                function dispose() {
                  return _dispose.apply(this, arguments);
                }
                dispose.toString = function () {
                  return _dispose.toString();
                };
                return dispose;
              }(function () {
                dispose.call(this);
                this._abs.dispose();
                this._abs = null;
                return this;
              })
            }
          ]);
          return SignalAbs;
        }();
        var _default = SignalAbs;
        exports.default = _default;
      },
      {
        './SignalWaveShaper': 209,
        'core-js/modules/es.object.to-string': 140,
        'core-js/modules/es.regexp.to-string': 145
      }
    ],
    197: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        } // https://github.com/Tonejs/Tone.js/blob/r10/Tone/signal/Add.js
        // import Signal from './Signal';
        // import Gain from './Gain';

        var SignalAdd = function SignalAdd() {
          _classCallCheck(this, SignalAdd);
        };
        var _default = SignalAdd; // define(['Tone/core/Tone', 'Tone/signal/Signal', 'Tone/core/Gain'], function (Tone) {
        //   'use strict';
        //   /**
        // 	 *  @class Add a signal and a number or two signals. When no value is
        // 	 *         passed into the constructor, Tone.Add will sum <code>input[0]</code>
        // 	 *         and <code>input[1]</code>. If a value is passed into the constructor,
        // 	 *         the it will be added to the input.
        // 	 *
        // 	 *  @constructor
        // 	 *  @extends {Tone.Signal}
        // 	 *  @param {number=} value If no value is provided, Tone.Add will sum the first
        // 	 *                         and second inputs.
        // 	 *  @example
        // 	 * var signal = new Tone.Signal(2);
        // 	 * var add = new Tone.Add(2);
        // 	 * signal.connect(add);
        // 	 * //the output of add equals 4
        // 	 *  @example
        // 	 * //if constructed with no arguments
        // 	 * //it will add the first and second inputs
        // 	 * var add = new Tone.Add();
        // 	 * var sig0 = new Tone.Signal(3).connect(add, 0, 0);
        // 	 * var sig1 = new Tone.Signal(4).connect(add, 0, 1);
        // 	 * //the output of add equals 7.
        // 	 */
        //   Tone.Add = function(value){
        //     this.createInsOuts(2, 0);
        //     /**
        // 		 *  the summing node
        // 		 *  @type {GainNode}
        // 		 *  @private
        // 		 */
        //     this._sum = this.input[0] = this.input[1] = this.output = new Tone.Gain();
        //     /**
        // 		 *  @private
        // 		 *  @type {Tone.Signal}
        // 		 */
        //     this._param = this.input[1] = new Tone.Signal(value);
        //     this._param.connect(this._sum);
        //   };
        //   Tone.extend(Tone.Add, Tone.Signal);
        //   /**
        // 	 *  Clean up.
        // 	 *  @returns {Tone.Add} this
        // 	 */
        //   Tone.Add.prototype.dispose = function(){
        //     Tone.prototype.dispose.call(this);
        //     this._sum.dispose();
        //     this._sum = null;
        //     this._param.dispose();
        //     this._param = null;
        //     return this;
        //   };
        //   return Tone.Add;
        // });
        exports.default = _default;
      },
      {
      }
    ],
    198: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        } // https://github.com/Tonejs/Tone.js/blob/r10/Tone/signal/AudioToGain.js

        var SignalAudioToGain = function SignalAudioToGain() {
          _classCallCheck(this, SignalAudioToGain);
        };
        var _default = SignalAudioToGain; // define(["Tone/core/Tone", "Tone/signal/WaveShaper", "Tone/signal/Signal"], function(Tone){
        // 	"use strict";
        // 	/**
        // 	 *  @class AudioToGain converts an input in AudioRange [-1,1] to NormalRange [0,1].
        // 	 *         See Tone.GainToAudio.
        // 	 *
        // 	 *  @extends {Tone.SignalBase}
        // 	 *  @constructor
        // 	 *  @example
        // 	 *  var a2g = new Tone.AudioToGain();
        // 	 */
        // 	Tone.AudioToGain = function(){
        // 		/**
        // 		 *  @type {WaveShaperNode}
        // 		 *  @private
        // 		 */
        // 		this._norm = this.input = this.output = new Tone.WaveShaper(function(x){
        // 			return (x + 1) / 2;
        // 		});
        // 	};
        // 	Tone.extend(Tone.AudioToGain, Tone.SignalBase);
        // 	/**
        // 	 *  clean up
        // 	 *  @returns {Tone.AudioToGain} this
        // 	 */
        // 	Tone.AudioToGain.prototype.dispose = function(){
        // 		Tone.prototype.dispose.call(this);
        // 		this._norm.dispose();
        // 		this._norm = null;
        // 		return this;
        // 	};
        // 	return Tone.AudioToGain;
        // });
        exports.default = _default;
      },
      {
      }
    ],
    199: [
      function (_dereq_, module, exports) {
        'use strict';
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.regexp.to-string');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.regexp.to-string');
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _Signal = _interopRequireDefault(_dereq_('./Signal'));
        var _SignalTimeLineSignal = _interopRequireDefault(_dereq_('./SignalTimeLineSignal'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }        /**
*  When signals connect to other signals or AudioParams,
*  they take over the output value of that signal or AudioParam.
*  For all other nodes, the behavior is the same as a default <code>connect</code>.
*
*  @override
*  @param {AudioParam|AudioNode|Tone.Signal|Tone} node
*  @param {number} [outputNumber=0] The output number to connect from.
*  @param {number} [inputNumber=0] The input number to connect to.
*  @returns {Tone.SignalBase} this
*/

        var SignalBase =        /*#__PURE__*/
        function () {
          function SignalBase() {
            _classCallCheck(this, SignalBase);
          }
          _createClass(SignalBase, [
            {
              key: 'connect',
              value: function (_connect) {
                function connect(_x, _x2, _x3) {
                  return _connect.apply(this, arguments);
                }
                connect.toString = function () {
                  return _connect.toString();
                };
                return connect;
              }(function (node, outputNumber, inputNumber) {
                //zero it out so that the signal can have full control
                if (_Signal.default && _Signal.default === node.constructor || //  (Tone.Param && Tone.Param === node.constructor) ||
                _SignalTimeLineSignal.default && _SignalTimeLineSignal.default === node.constructor) {
                  //cancel changes
                  node._param.cancelScheduledValues(0); //reset the value
                  node._param.value = 0; //mark the value as overridden
                  node.overridden = true;
                } else if (node instanceof AudioParam) {
                  node.cancelScheduledValues(0);
                  node.value = 0;
                } // Tone.prototype.connect.call(this, node, outputNumber, inputNumber);

                connect.call(this, node, outputNumber, inputNumber);
                return this;
              })
            }
          ]);
          return SignalBase;
        }();
        var _default = SignalBase;
        exports.default = _default;
      },
      {
        './Signal': 195,
        './SignalTimeLineSignal': 208,
        'core-js/modules/es.object.to-string': 140,
        'core-js/modules/es.regexp.to-string': 145
      }
    ],
    200: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _SignalWaveShaper = _interopRequireDefault(_dereq_('./SignalWaveShaper'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }        /**
 *  @class Convert an incoming signal between 0, 1 to an equal power gain scale.
 *
 *  @extends {SignalBase}
 *  @constructor
 *  @example
 * let eqPowGain = new EqualPowerGain();
 */

        var SignalEqualPowerGain =        /*#__PURE__*/
        function () {
          function SignalEqualPowerGain() {
            _classCallCheck(this, SignalEqualPowerGain);
            this._eqPower = this.input = this.output = new _SignalWaveShaper.default(function (val) {
              if (Math.abs(val) < 0.001) {
                return 0;
              } else {
                return this.equalPowerScale(val);
              }
            }.bind(this), 4096);
          }
          _createClass(SignalEqualPowerGain, [
            {
              key: 'dispose',
              value: function dispose() {
                this._eqPower.dispose();
                this._eqPower = null;
                return this;
              }
            }
          ]);
          return SignalEqualPowerGain;
        }();
        var _default = SignalEqualPowerGain;
        exports.default = _default;
      },
      {
        './SignalWaveShaper': 209
      }
    ],
    201: [
      function (_dereq_, module, exports) {
        'use strict';
        _dereq_('core-js/modules/es.array.slice');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.regexp.exec');
        _dereq_('core-js/modules/es.regexp.to-string');
        _dereq_('core-js/modules/es.string.match');
        _dereq_('core-js/modules/es.string.replace');
        _dereq_('core-js/modules/es.string.trim');
        _dereq_('core-js/modules/es.array.slice');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.regexp.exec');
        _dereq_('core-js/modules/es.regexp.to-string');
        _dereq_('core-js/modules/es.string.match');
        _dereq_('core-js/modules/es.string.replace');
        _dereq_('core-js/modules/es.string.trim');
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        var _SignalAbs = _interopRequireDefault(_dereq_('./SignalAbs'));
        var _SignalAudioToGain = _interopRequireDefault(_dereq_('./SignalAudioToGain'));
        var _SignalModulo = _interopRequireDefault(_dereq_('./SignalModulo'));
        var _SignalMultiply = _interopRequireDefault(_dereq_('./SignalMultiply'));
        var _SignalNegate = _interopRequireDefault(_dereq_('./SignalNegate'));
        var _SignalPow = _interopRequireDefault(_dereq_('./SignalPow'));
        var _SignalSubtract = _interopRequireDefault(_dereq_('./SignalSubtract'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }        /**
*  @class Evaluate an expression at audio rate. <br><br>
*         Parsing code modified from https://code.google.com/p/tapdigit/
*         Copyright 2011 2012 Ariya Hidayat, New BSD License
*
*  @extends {SignalBase}
*  @constructor
*  @param {string} expr the expression to generate
*  @example
* //adds the signals from input[0] and input[1].
* let expr = new SignalExpr("$0 + $1");
*/

        var SignalExpr =        /*#__PURE__*/
        function () {
          function SignalExpr() {
            _classCallCheck(this, SignalExpr);
            this.audioContext = _audioContext.default;
            /*
    *  the Expressions that SignalExpr can parse.
    *
    *  each expression belongs to a group and contains a regexp
    *  for selecting the operator as well as that operators method
    *
    *  @type {Object}
    *  @private
    */
            this._expressions = {
              //values
              'value': {
                'signal': {
                  regexp: /^\d+\.\d+|^\d+/,
                  method: function method(arg) {
                    var sig = new Signal(getNumber(arg));
                    return sig;
                  }
                },
                'input': {
                  regexp: /^\$\d/,
                  method: function method(arg, self) {
                    return self.input[getNumber(arg.substr(1))];
                  }
                }
              },
              //syntactic glue
              'glue': {
                '(': {
                  regexp: /^\(/
                },
                ')': {
                  regexp: /^\)/
                },
                ',': {
                  regexp: /^,/
                }
              },
              //functions
              'func': {
                'abs': {
                  regexp: /^abs/,
                  method: applyUnary.bind(this, _SignalAbs.default)
                },
                'mod': {
                  regexp: /^mod/,
                  method: function method(args, self) {
                    var modulus = literalNumber(args[1]);
                    var op = new _SignalModulo.default(modulus);
                    self._eval(args[0]).connect(op);
                    return op;
                  }
                },
                'pow': {
                  regexp: /^pow/,
                  method: function method(args, self) {
                    var exp = literalNumber(args[1]);
                    var op = new _SignalPow.default(exp);
                    self._eval(args[0]).connect(op);
                    return op;
                  }
                },
                'a2g': {
                  regexp: /^a2g/,
                  method: function method(args, self) {
                    var op = new _SignalAudioToGain.default();
                    self._eval(args[0]).connect(op);
                    return op;
                  }
                }
              },
              //binary expressions
              'binary': {
                '+': {
                  regexp: /^\+/,
                  precedence: 1,
                  method: applyBinary.bind(this, SignalAdd)
                },
                '-': {
                  // regexp: /^\-/,
                  regexp: /^-/,
                  precedence: 1,
                  method: function method(args, self) {
                    //both unary and binary op
                    if (args.length === 1) {
                      return applyUnary(_SignalNegate.default, args, self);
                    } else {
                      return applyBinary(_SignalSubtract.default, args, self);
                    }
                  }
                },
                '*': {
                  regexp: /^\*/,
                  precedence: 0,
                  method: applyBinary.bind(this, _SignalMultiply.default)
                }
              },
              //unary expressions
              'unary': {
                '-': {
                  // regexp: /^\-/,
                  regexp: /^-/,
                  method: applyUnary.bind(this, _SignalNegate.default)
                },
                '!': {
                  // regexp : /^\!/,
                  regexp: /^!/,
                  method: applyUnary.bind(this, NOT)
                }
              }
            };
            var expr = this._replacements(Array.prototype.slice.call(arguments));
            var inputCount = this._parseInputs(expr);
            /**
    *  hold onto all of the nodes for disposal
    *  @type {Array}
    *  @private
    */
            this._nodes = [
            ];
            /**
    *  The inputs. The length is determined by the expression.
    *  @type {Array}
    */
            this.input = new Array(inputCount); // create a gain for each input
            for (var i = 0; i < inputCount; i++) {
              this.input[i] = this.audioContext.createGain();
            } // parse the syntax tree

            var tree = this._parseTree(expr); // evaluate the results
            var result;
            try {
              result = this._eval(tree);
            } catch (e) {
              this._disposeNodes();
              throw new Error('SignalExpr: Could evaluate expression: ' + expr);
            }            /**
    *  The output node is the result of the expression
    *  @type {Tone}
    */

            this.output = result;
          } //some helpers to cut down the amount of code

          _createClass(SignalExpr, [
            {
              key: 'applyBinary',
              value: function applyBinary(Constructor, args, self) {
                var op = new Constructor();
                self._eval(args[0]).connect(op, 0, 0);
                self._eval(args[1]).connect(op, 0, 1);
                return op;
              }
            },
            {
              key: 'applyUnary',
              value: function applyUnary(Constructor, args, self) {
                var op = new Constructor();
                self._eval(args[0]).connect(op, 0, 0);
                return op;
              }
            },
            {
              key: 'getNumber',
              value: function getNumber(arg) {
                return arg ? parseFloat(arg) : undefined;
              }
            },
            {
              key: 'literalNumber',
              value: function literalNumber(arg) {
                return arg && arg.args ? parseFloat(arg.args) : undefined;
              }              /**
    *  @param   {string} expr the expression string
    *  @return  {number}      the input count
    *  @private
    */

            },
            {
              key: '_parseInputs',
              value: function _parseInputs(expr) {
                var inputArray = expr.match(/\$\d/g);
                var inputMax = 0;
                if (inputArray !== null) {
                  for (var i = 0; i < inputArray.length; i++) {
                    var inputNum = parseInt(inputArray[i].substr(1)) + 1;
                    inputMax = Math.max(inputMax, inputNum);
                  }
                }
                return inputMax;
              }              /**
    *  @param   {Array} args 	an array of arguments
    *  @return  {string} the results of the replacements being replaced
    *  @private
    */

            },
            {
              key: '_replacements',
              value: function _replacements(args) {
                var expr = args.shift();
                for (var i = 0; i < args.length; i++) {
                  // expr = expr.replace(/\%/i, args[i]);
                  expr = expr.replace(/%/i, args[i]);
                }
                return expr;
              }              /**
    *  tokenize the expression based on the Expressions object
    *  @param   {string} expr
    *  @return  {Object}      returns two methods on the tokenized list, next and peek
    *  @private
    */

            },
            {
              key: '_tokenize',
              value: function _tokenize(expr) {
                var position = - 1;
                var tokens = [
                ];
                while (expr.length > 0) {
                  expr = expr.trim();
                  var token = getNextToken(expr);
                  tokens.push(token);
                  expr = expr.substr(token.value.length);
                }
                function getNextToken(expr) {
                  for (var type in SignalExpr._Expressions) {
                    var group = SignalExpr.Expr._Expressions[type];
                    for (var opName in group) {
                      var op = group[opName];
                      var reg = op.regexp;
                      var match = expr.match(reg);
                      if (match !== null) {
                        return {
                          type: type,
                          value: match[0],
                          method: op.method
                        };
                      }
                    }
                  }
                  throw new SyntaxError('SignalExpr: Unexpected token ' + expr);
                }
                return {
                  next: function next() {
                    return tokens[++position];
                  },
                  peek: function peek() {
                    return tokens[position + 1];
                  }
                };
              }              /**
    *  recursively parse the string expression into a syntax tree
    *
    *  @param   {string} expr
    *  @return  {Object}
    *  @private
    */

            },
            {
              key: '_parseTree',
              value: function _parseTree(expr) {
                var lexer = this._tokenize(expr);
                var isUndef = this.isUndef.bind(this);
                function matchSyntax(token, syn) {
                  return !isUndef(token) && token.type === 'glue' && token.value === syn;
                }
                function matchGroup(token, groupName, prec) {
                  var ret = false;
                  var group = SignalExpr._Expressions[groupName];
                  if (!isUndef(token)) {
                    for (var opName in group) {
                      var op = group[opName];
                      if (op.regexp.test(token.value)) {
                        if (!isUndef(prec)) {
                          if (op.precedence === prec) {
                            return true;
                          }
                        } else {
                          return true;
                        }
                      }
                    }
                  }
                  return ret;
                }
                function parseExpression(precedence) {
                  if (isUndef(precedence)) {
                    precedence = 5;
                  }
                  var expr;
                  if (precedence < 0) {
                    expr = parseUnary();
                  } else {
                    expr = parseExpression(precedence - 1);
                  }
                  var token = lexer.peek();
                  while (matchGroup(token, 'binary', precedence)) {
                    token = lexer.next();
                    expr = {
                      operator: token.value,
                      method: token.method,
                      args: [
                        expr,
                        parseExpression(precedence - 1)
                      ]
                    };
                    token = lexer.peek();
                  }
                  return expr;
                }
                function parseUnary() {
                  var token,
                  expr;
                  token = lexer.peek();
                  if (matchGroup(token, 'unary')) {
                    token = lexer.next();
                    expr = parseUnary();
                    return {
                      operator: token.value,
                      method: token.method,
                      args: [
                        expr
                      ]
                    };
                  }
                  return parsePrimary();
                }
                function parsePrimary() {
                  var token,
                  expr;
                  token = lexer.peek();
                  if (isUndef(token)) {
                    throw new SyntaxError('SignalExpr: Unexpected termination of expression');
                  }
                  if (token.type === 'func') {
                    token = lexer.next();
                    return parseFunctionCall(token);
                  }
                  if (token.type === 'value') {
                    token = lexer.next();
                    return {
                      method: token.method,
                      args: token.value
                    };
                  }
                  if (matchSyntax(token, '(')) {
                    lexer.next();
                    expr = parseExpression();
                    token = lexer.next();
                    if (!matchSyntax(token, ')')) {
                      throw new SyntaxError('Expected )');
                    }
                    return expr;
                  }
                  throw new SyntaxError('SignalExpr: Parse error, cannot process token ' + token.value);
                }
                function parseFunctionCall(func) {
                  var token,
                  args = [
                  ];
                  token = lexer.next();
                  if (!matchSyntax(token, '(')) {
                    throw new SyntaxError('SignalExpr: Expected ( in a function call "' + func.value + '"');
                  }
                  token = lexer.peek();
                  if (!matchSyntax(token, ')')) {
                    args = parseArgumentList();
                  }
                  token = lexer.next();
                  if (!matchSyntax(token, ')')) {
                    throw new SyntaxError('SignalExpr: Expected ) in a function call "' + func.value + '"');
                  }
                  return {
                    method: func.method,
                    args: args,
                    name: name
                  };
                }
                function parseArgumentList() {
                  var token,
                  expr,
                  args = [
                  ]; // while (true) {
                  expr = parseExpression();
                  if (isUndef(expr)) { // TODO maybe throw exception?
                    // break;
                  }
                  args.push(expr);
                  token = lexer.peek();
                  if (!matchSyntax(token, ',')) { // break;
                  }
                  lexer.next(); // }
                  return args;
                }
                return parseExpression();
              }              /**
    *  recursively evaluate the expression tree
    *  @param   {Object} tree
    *  @return  {AudioNode}      the resulting audio node from the expression
    *  @private
    */

            },
            {
              key: '_eval',
              value: function _eval(tree) {
                if (!this.isUndef(tree)) {
                  var node = tree.method(tree.args, this);
                  this._nodes.push(node);
                  return node;
                }
              }              /**
    *  dispose all the nodes
    *  @private
    */

            },
            {
              key: '_disposeNodes',
              value: function _disposeNodes() {
                for (var i = 0; i < this._nodes.length; i++) {
                  var node = this._nodes[i];
                  if (this.isFunction(node.dispose)) {
                    node.dispose();
                  } else if (this.isFunction(node.disconnect)) {
                    node.disconnect();
                  }
                  node = null;
                  this._nodes[i] = null;
                }
                this._nodes = null;
              }              /**
    *  clean up
    */

            },
            {
              key: 'dispose',
              value: function (_dispose) {
                function dispose() {
                  return _dispose.apply(this, arguments);
                }
                dispose.toString = function () {
                  return _dispose.toString();
                };
                return dispose;
              }(function () {
                dispose.call(this);
                this._disposeNodes();
              })
            }
          ]);
          return SignalExpr;
        }();
        var _default = SignalExpr;
        exports.default = _default;
      },
      {
        './SignalAbs': 196,
        './SignalAudioToGain': 198,
        './SignalModulo': 202,
        './SignalMultiply': 203,
        './SignalNegate': 204,
        './SignalPow': 205,
        './SignalSubtract': 207,
        './audioContext': 213,
        'core-js/modules/es.array.slice': 135,
        'core-js/modules/es.object.to-string': 140,
        'core-js/modules/es.regexp.exec': 144,
        'core-js/modules/es.regexp.to-string': 145,
        'core-js/modules/es.string.match': 147,
        'core-js/modules/es.string.replace': 148,
        'core-js/modules/es.string.trim': 150
      }
    ],
    202: [
      function (_dereq_, module, exports) {
        // https://github.com/Tonejs/Tone.js/blob/r10/Tone/signal/Modulo.js
        // define(["Tone/core/Tone", "Tone/signal/WaveShaper", "Tone/signal/Multiply", "Tone/signal/Subtract"],
        // function(Tone){
        // 	"use strict";
        // 	/**
        // 	 *  @class Signal-rate modulo operator. Only works in AudioRange [-1, 1] and for modulus
        // 	 *         values in the NormalRange.
        // 	 *
        // 	 *  @constructor
        // 	 *  @extends {Tone.SignalBase}
        // 	 *  @param {NormalRange} modulus The modulus to apply.
        // 	 *  @example
        // 	 * var mod = new Tone.Modulo(0.2)
        // 	 * var sig = new Tone.Signal(0.5).connect(mod);
        // 	 * //mod outputs 0.1
        // 	 */
        // 	Tone.Modulo = function(modulus){
        // 		this.createInsOuts(1, 0);
        // 		/**
        // 		 *  A waveshaper gets the integer multiple of
        // 		 *  the input signal and the modulus.
        // 		 *  @private
        // 		 *  @type {Tone.WaveShaper}
        // 		 */
        // 		this._shaper = new Tone.WaveShaper(Math.pow(2, 16));
        // 		/**
        // 		 *  the integer multiple is multiplied by the modulus
        // 		 *  @type  {Tone.Multiply}
        // 		 *  @private
        // 		 */
        // 		this._multiply = new Tone.Multiply();
        // 		/**
        // 		 *  and subtracted from the input signal
        // 		 *  @type  {Tone.Subtract}
        // 		 *  @private
        // 		 */
        // 		this._subtract = this.output = new Tone.Subtract();
        // 		/**
        // 		 *  the modulus signal
        // 		 *  @type  {Tone.Signal}
        // 		 *  @private
        // 		 */
        // 		this._modSignal = new Tone.Signal(modulus);
        // 		//connections
        // 		this.input.fan(this._shaper, this._subtract);
        // 		this._modSignal.connect(this._multiply, 0, 0);
        // 		this._shaper.connect(this._multiply, 0, 1);
        // 		this._multiply.connect(this._subtract, 0, 1);
        // 		this._setWaveShaper(modulus);
        // 	};
        // 	Tone.extend(Tone.Modulo, Tone.SignalBase);
        // 	/**
        // 	 *  @param  {number}  mod  the modulus to apply
        // 	 *  @private
        // 	 */
        // 	Tone.Modulo.prototype._setWaveShaper = function(mod){
        // 		this._shaper.setMap(function(val){
        // 			var multiple = Math.floor((val + 0.0001) / mod);
        // 			return multiple;
        // 		});
        // 	};
        // 	/**
        // 	 * The modulus value.
        // 	 * @memberOf Tone.Modulo#
        // 	 * @type {NormalRange}
        // 	 * @name value
        // 	 */
        // 	Object.defineProperty(Tone.Modulo.prototype, "value", {
        // 		get : function(){
        // 			return this._modSignal.value;
        // 		},
        // 		set : function(mod){
        // 			this._modSignal.value = mod;
        // 			this._setWaveShaper(mod);
        // 		}
        // 	});
        // 	/**
        // 	 * clean up
        // 	 *  @returns {Tone.Modulo} this
        // 	 */
        // 	Tone.Modulo.prototype.dispose = function(){
        // 		Tone.prototype.dispose.call(this);
        // 		this._shaper.dispose();
        // 		this._shaper = null;
        // 		this._multiply.dispose();
        // 		this._multiply = null;
        // 		this._subtract.dispose();
        // 		this._subtract = null;
        // 		this._modSignal.dispose();
        // 		this._modSignal = null;
        // 		return this;
        // 	};
        // 	return Tone.Modulo;
        // });
        'use strict';
      },
      {
      }
    ],
    203: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _Gain = _interopRequireDefault(_dereq_('./Gain'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        } // import Signal from './Signal';
        /**
*  @class  Multiply two incoming signals. Or, if a number is given in the constructor,
*          multiplies the incoming signal by that value.
*
*  @constructor
*  @extends {Tone.Signal}
*  @param {number=} value Constant value to multiple. If no value is provided,
*                         it will return the product of the first and second inputs
*  @example
* var mult = new Tone.Multiply();
* var sigA = new Tone.Signal(3);
* var sigB = new Tone.Signal(4);
* sigA.connect(mult, 0, 0);
* sigB.connect(mult, 0, 1);
* //output of mult is 12.
*  @example
* var mult = new Tone.Multiply(10);
* var sig = new Tone.Signal(2).connect(mult);
* //the output of mult is 20.
*/

        var SignalMultiply =        /*#__PURE__*/
        function () {
          function SignalMultiply() {
            _classCallCheck(this, SignalMultiply);
            this.createInsOuts(2, 0);
            /**
    *  the input node is the same as the output node
    *  it is also the GainNode which handles the scaling of incoming signal
    *
    *  @type {GainNode}
    *  @private
    */
            this._mult = this.input[0] = this.output = new _Gain.default();
            /**
    *  the scaling parameter
    *  @type {AudioParam}
    *  @private
    */
            this._param = this.input[1] = this.output.gain;
            this._param.value = this.defaultArg(value, 0);
          }          /**
  *  clean up
  *  @returns {Multiply} this
  */

          _createClass(SignalMultiply, [
            {
              key: 'dispose',
              value: function dispose() {
                this._mult.dispose();
                this._mult = null;
                this._param = null;
                return this;
              }
            }
          ]);
          return SignalMultiply;
        }();
        var _default = SignalMultiply;
        exports.default = _default;
      },
      {
        './Gain': 191
      }
    ],
    204: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        } // https://github.com/Tonejs/Tone.js/blob/r10/Tone/signal/Negate.js

        var SignalNegate = function SignalNegate() {
          _classCallCheck(this, SignalNegate);
        };
        var _default = SignalNegate; // define(['Tone/core/Tone', 'Tone/signal/Multiply', 'Tone/signal/Signal'], function(Tone){
        //   'use strict';
        //   /**
        // 	 *  @class Negate the incoming signal. i.e. an input signal of 10 will output -10
        // 	 *
        // 	 *  @constructor
        // 	 *  @extends {Tone.SignalBase}
        // 	 *  @example
        // 	 * var neg = new Tone.Negate();
        // 	 * var sig = new Tone.Signal(-2).connect(neg);
        // 	 * //output of neg is positive 2.
        // 	 */
        //   Tone.Negate = function(){
        //     /**
        // 		 *  negation is done by multiplying by -1
        // 		 *  @type {Tone.Multiply}
        // 		 *  @private
        // 		 */
        //     this._multiply = this.input = this.output = new Tone.Multiply(-1);
        //   };
        //   Tone.extend(Tone.Negate, Tone.SignalBase);
        //   /**
        // 	 *  clean up
        // 	 *  @returns {Tone.Negate} this
        // 	 */
        //   Tone.Negate.prototype.dispose = function(){
        //     Tone.prototype.dispose.call(this);
        //     this._multiply.dispose();
        //     this._multiply = null;
        //     return this;
        //   };
        //   return Tone.Negate;
        // });
        exports.default = _default;
      },
      {
      }
    ],
    205: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        } // https://github.com/Tonejs/Tone.js/blob/r10/Tone/signal/Pow.js

        var SignalPow = function SignalPow() {
          _classCallCheck(this, SignalPow);
        };
        var _default = SignalPow; // define(['Tone/core/Tone', 'Tone/signal/WaveShaper'], function(Tone){
        //   'use strict';
        //   /**
        // 	 *  @class Pow applies an exponent to the incoming signal. The incoming signal
        // 	 *         must be AudioRange.
        // 	 *
        // 	 *  @extends {Tone.SignalBase}
        // 	 *  @constructor
        // 	 *  @param {Positive} exp The exponent to apply to the incoming signal, must be at least 2.
        // 	 *  @example
        // 	 * var pow = new Tone.Pow(2);
        // 	 * var sig = new Tone.Signal(0.5).connect(pow);
        // 	 * //output of pow is 0.25.
        // 	 */
        //   Tone.Pow = function(exp){
        //     /**
        // 		 * the exponent
        // 		 * @private
        // 		 * @type {number}
        // 		 */
        //     this._exp = this.defaultArg(exp, 1);
        //     /**
        // 		 *  @type {WaveShaperNode}
        // 		 *  @private
        // 		 */
        //     this._expScaler = this.input = this.output = new Tone.WaveShaper(this._expFunc(this._exp), 8192);
        //   };
        //   Tone.extend(Tone.Pow, Tone.SignalBase);
        //   /**
        // 	 * The value of the exponent.
        // 	 * @memberOf Tone.Pow#
        // 	 * @type {number}
        // 	 * @name value
        // 	 */
        //   Object.defineProperty(Tone.Pow.prototype, 'value', {
        //     get : function(){
        //       return this._exp;
        //     },
        //     set : function(exp){
        //       this._exp = exp;
        //       this._expScaler.setMap(this._expFunc(this._exp));
        //     }
        //   });
        //   /**
        // 	 *  the function which maps the waveshaper
        // 	 *  @param   {number} exp
        // 	 *  @return {function}
        // 	 *  @private
        // 	 */
        //   Tone.Pow.prototype._expFunc = function(exp){
        //     return function(val){
        //       return Math.pow(Math.abs(val), exp);
        //     };
        //   };
        //   /**
        // 	 *  Clean up.
        // 	 *  @returns {Tone.Pow} this
        // 	 */
        //   Tone.Pow.prototype.dispose = function(){
        //     Tone.prototype.dispose.call(this);
        //     this._expScaler.dispose();
        //     this._expScaler = null;
        //     return this;
        //   };
        //   return Tone.Pow;
        // });
        exports.default = _default;
      },
      {
      }
    ],
    206: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        } // https://github.com/Tonejs/Tone.js/blob/r10/Tone/signal/Scale.js

        var SignalScale = function SignalScale() {
          _classCallCheck(this, SignalScale);
        };
        var _default = SignalScale; // define(["Tone/core/Tone", "Tone/signal/Add", "Tone/signal/Multiply", "Tone/signal/Signal"], function(Tone){
        // 	"use strict";
        // 	/**
        // 	 *  @class  Performs a linear scaling on an input signal.
        // 	 *          Scales a NormalRange input to between
        // 	 *          outputMin and outputMax.
        // 	 *
        // 	 *  @constructor
        // 	 *  @extends {Tone.SignalBase}
        // 	 *  @param {number} [outputMin=0] The output value when the input is 0.
        // 	 *  @param {number} [outputMax=1]	The output value when the input is 1.
        // 	 *  @example
        // 	 * var scale = new Tone.Scale(50, 100);
        // 	 * var signal = new Tone.Signal(0.5).connect(scale);
        // 	 * //the output of scale equals 75
        // 	 */
        // 	Tone.Scale = function(outputMin, outputMax){
        // 		/**
        // 		 *  @private
        // 		 *  @type {number}
        // 		 */
        // 		this._outputMin = this.defaultArg(outputMin, 0);
        // 		/**
        // 		 *  @private
        // 		 *  @type {number}
        // 		 */
        // 		this._outputMax = this.defaultArg(outputMax, 1);
        // 		/**
        // 		 *  @private
        // 		 *  @type {Tone.Multiply}
        // 		 *  @private
        // 		 */
        // 		this._scale = this.input = new Tone.Multiply(1);
        // 		/**
        // 		 *  @private
        // 		 *  @type {Tone.Add}
        // 		 *  @private
        // 		 */
        // 		this._add = this.output = new Tone.Add(0);
        // 		this._scale.connect(this._add);
        // 		this._setRange();
        // 	};
        // 	Tone.extend(Tone.Scale, Tone.SignalBase);
        // 	/**
        // 	 * The minimum output value. This number is output when
        // 	 * the value input value is 0.
        // 	 * @memberOf Tone.Scale#
        // 	 * @type {number}
        // 	 * @name min
        // 	 */
        // 	Object.defineProperty(Tone.Scale.prototype, "min", {
        // 		get : function(){
        // 			return this._outputMin;
        // 		},
        // 		set : function(min){
        // 			this._outputMin = min;
        // 			this._setRange();
        // 		}
        // 	});
        // 	/**
        // 	 * The maximum output value. This number is output when
        // 	 * the value input value is 1.
        // 	 * @memberOf Tone.Scale#
        // 	 * @type {number}
        // 	 * @name max
        // 	 */
        // 	Object.defineProperty(Tone.Scale.prototype, "max", {
        // 		get : function(){
        // 			return this._outputMax;
        // 		},
        // 		set : function(max){
        // 			this._outputMax = max;
        // 			this._setRange();
        // 		}
        // 	});
        // 	/**
        // 	 *  set the values
        // 	 *  @private
        // 	 */
        // 	Tone.Scale.prototype._setRange = function() {
        // 		this._add.value = this._outputMin;
        // 		this._scale.value = this._outputMax - this._outputMin;
        // 	};
        // 	/**
        // 	 *  Clean up.
        // 	 *  @returns {Tone.Scale} this
        // 	 */
        // 	Tone.Scale.prototype.dispose = function(){
        // 		Tone.prototype.dispose.call(this);
        // 		this._add.dispose();
        // 		this._add = null;
        // 		this._scale.dispose();
        // 		this._scale = null;
        // 		return this;
        // 	};
        // 	return Tone.Scale;
        // });
        exports.default = _default;
      },
      {
      }
    ],
    207: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        } // https://github.com/Tonejs/Tone.js/blob/r10/Tone/signal/Subtract.js

        var SignalSubtract = function SignalSubtract() {
          _classCallCheck(this, SignalSubtract);
        };
        var _default = SignalSubtract; // define(["Tone/core/Tone", "Tone/signal/Add", "Tone/signal/Negate", "Tone/signal/Signal", "Tone/core/Gain"], function(Tone){
        // 	"use strict";
        // 	/**
        // 	 *  @class Subtract the signal connected to <code>input[1]</code> from the signal connected
        // 	 *         to <code>input[0]</code>. If an argument is provided in the constructor, the
        // 	 *         signals <code>.value</code> will be subtracted from the incoming signal.
        // 	 *
        // 	 *  @extends {Tone.Signal}
        // 	 *  @constructor
        // 	 *  @param {number=} value The value to subtract from the incoming signal. If the value
        // 	 *                         is omitted, it will subtract the second signal from the first.
        // 	 *  @example
        // 	 * var sub = new Tone.Subtract(1);
        // 	 * var sig = new Tone.Signal(4).connect(sub);
        // 	 * //the output of sub is 3.
        // 	 *  @example
        // 	 * var sub = new Tone.Subtract();
        // 	 * var sigA = new Tone.Signal(10);
        // 	 * var sigB = new Tone.Signal(2.5);
        // 	 * sigA.connect(sub, 0, 0);
        // 	 * sigB.connect(sub, 0, 1);
        // 	 * //output of sub is 7.5
        // 	 */
        // 	Tone.Subtract = function(value){
        // 		this.createInsOuts(2, 0);
        // 		/**
        // 		 *  the summing node
        // 		 *  @type {GainNode}
        // 		 *  @private
        // 		 */
        // 		this._sum = this.input[0] = this.output = new Tone.Gain();
        // 		/**
        // 		 *  negate the input of the second input before connecting it
        // 		 *  to the summing node.
        // 		 *  @type {Tone.Negate}
        // 		 *  @private
        // 		 */
        // 		this._neg = new Tone.Negate();
        // 		/**
        // 		 *  the node where the value is set
        // 		 *  @private
        // 		 *  @type {Tone.Signal}
        // 		 */
        // 		this._param = this.input[1] = new Tone.Signal(value);
        // 		this._param.chain(this._neg, this._sum);
        // 	};
        // 	Tone.extend(Tone.Subtract, Tone.Signal);
        // 	/**
        // 	 *  Clean up.
        // 	 *  @returns {Tone.SignalBase} this
        // 	 */
        // 	Tone.Subtract.prototype.dispose = function(){
        // 		Tone.prototype.dispose.call(this);
        // 		this._neg.dispose();
        // 		this._neg = null;
        // 		this._sum.disconnect();
        // 		this._sum = null;
        // 		this._param.dispose();
        // 		this._param = null;
        // 		return this;
        // 	};
        // 	return Tone.Subtract;
        // });
        exports.default = _default;
      },
      {
      }
    ],
    208: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        } // TimeLineSignal adapted from Tone.js v0.10.0

        var TimeLineSignal = function TimeLineSignal() {
          _classCallCheck(this, TimeLineSignal);
        };
        var _default = TimeLineSignal; // define(['Tone/core/Tone', 'Tone/signal/Signal', 'Tone/core/Timeline'], function (Tone) {
        //   /**
        // 	 *  @class A signal which adds the method getValueAtTime.
        // 	 *         Code and inspiration from https://github.com/jsantell/web-audio-automation-timeline
        // 	 *  @extends {Tone.Param}
        // 	 *  @param {Number=} value The initial value of the signal
        // 	 *  @param {String=} units The conversion units of the signal.
        // 	 */
        //   Tone.TimelineSignal = function(){
        //     var options = this.optionsObject(arguments, ['value', 'units'], Tone.Signal.defaults);
        //     /**
        // 		 *  The scheduled events
        // 		 *  @type {Tone.Timeline}
        // 		 *  @private
        // 		 */
        //     this._events = new Tone.Timeline(10);
        //     //constructors
        //     Tone.Signal.apply(this, options);
        //     options.param = this._param;
        //     Tone.Param.call(this, options);
        //     /**
        // 		 *  The initial scheduled value
        // 		 *  @type {Number}
        // 		 *  @private
        // 		 */
        //     this._initial = this._fromUnits(this._param.value);
        //   };
        //   Tone.extend(Tone.TimelineSignal, Tone.Param);
        //   /**
        // 	 *  The event types of a schedulable signal.
        // 	 *  @enum {String}
        // 	 *  @private
        // 	 */
        //   Tone.TimelineSignal.Type = {
        //     Linear : 'linear',
        //     Exponential : 'exponential',
        //     Target : 'target',
        //     Curve : 'curve',
        //     Set : 'set'
        //   };
        //   /**
        // 	 * The current value of the signal.
        // 	 * @memberOf Tone.TimelineSignal#
        // 	 * @type {Number}
        // 	 * @name value
        // 	 */
        //   Object.defineProperty(Tone.TimelineSignal.prototype, 'value', {
        //     get : function(){
        //       var now = this.now();
        //       var val = this.getValueAtTime(now);
        //       return this._toUnits(val);
        //     },
        //     set : function(value){
        //       var convertedVal = this._fromUnits(value);
        //       this._initial = convertedVal;
        //       this.cancelScheduledValues();
        //       this._param.value = convertedVal;
        //     }
        //   });
        //   ///////////////////////////////////////////////////////////////////////////
        //   //	SCHEDULING
        //   ///////////////////////////////////////////////////////////////////////////
        //   /**
        // 	 *  Schedules a parameter value change at the given time.
        // 	 *  @param {*}	value The value to set the signal.
        // 	 *  @param {Time}  time The time when the change should occur.
        // 	 *  @returns {Tone.TimelineSignal} this
        // 	 *  @example
        // 	 * //set the frequency to "G4" in exactly 1 second from now.
        // 	 * freq.setValueAtTime("G4", "+1");
        // 	 */
        //   Tone.TimelineSignal.prototype.setValueAtTime = function (value, startTime) {
        //     value = this._fromUnits(value);
        //     startTime = this.toSeconds(startTime);
        //     this._events.add({
        //       'type' : Tone.TimelineSignal.Type.Set,
        //       'value' : value,
        //       'time' : startTime
        //     });
        //     //invoke the original event
        //     this._param.setValueAtTime(value, startTime);
        //     return this;
        //   };
        //   /**
        // 	 *  Schedules a linear continuous change in parameter value from the
        // 	 *  previous scheduled parameter value to the given value.
        // 	 *
        // 	 *  @param  {number} value
        // 	 *  @param  {Time} endTime
        // 	 *  @returns {Tone.TimelineSignal} this
        // 	 */
        //   Tone.TimelineSignal.prototype.linearRampToValueAtTime = function (
        //     value, endTime) {
        //     value = this._fromUnits(value);
        //     endTime = this.toSeconds(endTime);
        //     this._events.add({
        //       'type' : Tone.TimelineSignal.Type.Linear,
        //       'value' : value,
        //       'time' : endTime
        //     });
        //     this._param.linearRampToValueAtTime(value, endTime);
        //     return this;
        //   };
        //   /**
        // 	 *  Schedules an exponential continuous change in parameter value from
        // 	 *  the previous scheduled parameter value to the given value.
        // 	 *
        // 	 *  @param  {number} value
        // 	 *  @param  {Time} endTime
        // 	 *  @returns {Tone.TimelineSignal} this
        // 	 */
        //   Tone.TimelineSignal.prototype.exponentialRampToValueAtTime = function (
        //     value, endTime) {
        //     //get the previous event and make sure it's not starting from 0
        //     endTime = this.toSeconds(endTime);
        //     var beforeEvent = this._searchBefore(endTime);
        //     if (beforeEvent && beforeEvent.value === 0){
        //       //reschedule that event
        //       this.setValueAtTime(this._minOutput, beforeEvent.time);
        //     }
        //     value = this._fromUnits(value);
        //     var setValue = Math.max(value, this._minOutput);
        //     this._events.add({
        //       'type' : Tone.TimelineSignal.Type.Exponential,
        //       'value' : setValue,
        //       'time' : endTime
        //     });
        //     //if the ramped to value is 0, make it go to the min output, and then set to 0.
        //     if (value < this._minOutput){
        //       this._param.exponentialRampToValueAtTime(
        //         this._minOutput, endTime - this.sampleTime
        //       );
        //       this.setValueAtTime(0, endTime);
        //     } else {
        //       this._param.exponentialRampToValueAtTime(value, endTime);
        //     }
        //     return this;
        //   };
        //   /**
        // 	 *  Start exponentially approaching the target value at the given time with
        // 	 *  a rate having the given time constant.
        // 	 *  @param {number} value
        // 	 *  @param {Time} startTime
        // 	 *  @param {number} timeConstant
        // 	 *  @returns {Tone.TimelineSignal} this
        // 	 */
        //   Tone.TimelineSignal.prototype.setTargetAtTime = function (
        //     value, startTime, timeConstant) {
        //     value = this._fromUnits(value);
        //     value = Math.max(this._minOutput, value);
        //     timeConstant = Math.max(this._minOutput, timeConstant);
        //     startTime = this.toSeconds(startTime);
        //     this._events.add({
        //       'type' : Tone.TimelineSignal.Type.Target,
        //       'value' : value,
        //       'time' : startTime,
        //       'constant' : timeConstant
        //     });
        //     this._param.setTargetAtTime(value, startTime, timeConstant);
        //     return this;
        //   };
        //   /**
        // 	 *  Set an array of arbitrary values starting at the given time for the given duration.
        // 	 *  @param {Float32Array} values
        // 	 *  @param {Time} startTime
        // 	 *  @param {Time} duration
        // 	 *  @param {NormalRange} [scaling=1] If the values in the curve should be scaled by some value
        // 	 *  @returns {Tone.TimelineSignal} this
        // 	 */
        //   Tone.TimelineSignal.prototype.setValueCurveAtTime = function (
        //     values, startTime, duration, scaling) {
        //     scaling = this.defaultArg(scaling, 1);
        //     //copy the array
        //     var floats = new Array(values.length);
        //     for (var i = 0; i < floats.length; i++){
        //       floats[i] = this._fromUnits(values[i]) * scaling;
        //     }
        //     startTime = this.toSeconds(startTime);
        //     duration = this.toSeconds(duration);
        //     this._events.add({
        //       'type' : Tone.TimelineSignal.Type.Curve,
        //       'value' : floats,
        //       'time' : startTime,
        //       'duration' : duration
        //     });
        //     //set the first value
        //     this._param.setValueAtTime(floats[0], startTime);
        //     //schedule a lienar ramp for each of the segments
        //     for (var j = 1; j < floats.length; j++){
        //       var segmentTime = startTime + (j / (floats.length - 1) * duration);
        //       this._param.linearRampToValueAtTime(floats[j], segmentTime);
        //     }
        //     return this;
        //   };
        //   /**
        // 	 *  Cancels all scheduled parameter changes with times greater than or
        // 	 *  equal to startTime.
        // 	 *
        // 	 *  @param  {Time} startTime
        // 	 *  @returns {Tone.TimelineSignal} this
        // 	 */
        //   Tone.TimelineSignal.prototype.cancelScheduledValues = function (after) {
        //     after = this.toSeconds(after);
        //     this._events.cancel(after);
        //     this._param.cancelScheduledValues(after);
        //     return this;
        //   };
        //   /**
        // 	 *  Sets the computed value at the given time. This provides
        // 	 *  a point from which a linear or exponential curve
        // 	 *  can be scheduled after. Will cancel events after
        // 	 *  the given time and shorten the currently scheduled
        // 	 *  linear or exponential ramp so that it ends at `time` .
        // 	 *  This is to avoid discontinuities and clicks in envelopes.
        // 	 *  @param {Time} time When to set the ramp point
        // 	 *  @returns {Tone.TimelineSignal} this
        // 	 */
        //   Tone.TimelineSignal.prototype.setRampPoint = function (time) {
        //     time = this.toSeconds(time);
        //     //get the value at the given time
        //     var val = this._toUnits(this.getValueAtTime(time));
        //     //if there is an event at the given time
        //     //and that even is not a "set"
        //     var before = this._searchBefore(time);
        //     if (before && before.time === time){
        //       //remove everything after
        //       this.cancelScheduledValues(time + this.sampleTime);
        //     } else if (before &&
        //         before.type === Tone.TimelineSignal.Type.Curve &&
        // 		before.time + before.duration > time){
        //       //if the curve is still playing
        //       //cancel the curve
        //       this.cancelScheduledValues(time);
        //       this.linearRampToValueAtTime(val, time);
        //     } else {
        //       //reschedule the next event to end at the given time
        //       var after = this._searchAfter(time);
        //       if (after){
        //         //cancel the next event(s)
        //         this.cancelScheduledValues(time);
        //         if (after.type === Tone.TimelineSignal.Type.Linear){
        //           this.linearRampToValueAtTime(val, time);
        //         } else if (after.type === Tone.TimelineSignal.Type.Exponential){
        //           this.exponentialRampToValueAtTime(val, time);
        //         }
        //       }
        //       this.setValueAtTime(val, time);
        //     }
        //     return this;
        //   };
        //   /**
        // 	 *  Do a linear ramp to the given value between the start and finish times.
        // 	 *  @param {Number} value The value to ramp to.
        // 	 *  @param {Time} start The beginning anchor point to do the linear ramp
        // 	 *  @param {Time} finish The ending anchor point by which the value of
        // 	 *                       the signal will equal the given value.
        // 	 *  @returns {Tone.TimelineSignal} this
        // 	 */
        //   Tone.TimelineSignal.prototype.linearRampToValueBetween = function (
        //     value, start, finish) {
        //     this.setRampPoint(start);
        //     this.linearRampToValueAtTime(value, finish);
        //     return this;
        //   };
        //   /**
        // 	 *  Do a exponential ramp to the given value between the start and finish times.
        // 	 *  @param {Number} value The value to ramp to.
        // 	 *  @param {Time} start The beginning anchor point to do the exponential ramp
        // 	 *  @param {Time} finish The ending anchor point by which the value of
        // 	 *                       the signal will equal the given value.
        // 	 *  @returns {Tone.TimelineSignal} this
        // 	 */
        //   Tone.TimelineSignal.prototype.exponentialRampToValueBetween = function (
        //     value, start, finish) {
        //     this.setRampPoint(start);
        //     this.exponentialRampToValueAtTime(value, finish);
        //     return this;
        //   };
        //   ///////////////////////////////////////////////////////////////////////////
        //   //	GETTING SCHEDULED VALUES
        //   ///////////////////////////////////////////////////////////////////////////
        //   /**
        // 	 *  Returns the value before or equal to the given time
        // 	 *  @param  {Number}  time  The time to query
        // 	 *  @return  {Object}  The event at or before the given time.
        // 	 *  @private
        // 	 */
        //   Tone.TimelineSignal.prototype._searchBefore = function(time){
        //     return this._events.get(time);
        //   };
        //   /**
        // 	 *  The event after the given time
        // 	 *  @param  {Number}  time  The time to query.
        // 	 *  @return  {Object}  The next event after the given time
        // 	 *  @private
        // 	 */
        //   Tone.TimelineSignal.prototype._searchAfter = function(time){
        //     return this._events.getAfter(time);
        //   };
        //   /**
        // 	 *  Get the scheduled value at the given time. This will
        // 	 *  return the unconverted (raw) value.
        // 	 *  @param  {Number}  time  The time in seconds.
        // 	 *  @return  {Number}  The scheduled value at the given time.
        // 	 */
        //   Tone.TimelineSignal.prototype.getValueAtTime = function(time){
        //     time = this.toSeconds(time);
        //     var after = this._searchAfter(time);
        //     var before = this._searchBefore(time);
        //     var value = this._initial;
        //     //if it was set by
        //     if (before === null){
        //       value = this._initial;
        //     } else if (before.type === Tone.TimelineSignal.Type.Target){
        //       var previous = this._events.getBefore(before.time);
        //       var previouVal;
        //       if (previous === null){
        //         previouVal = this._initial;
        //       } else {
        //         previouVal = previous.value;
        //       }
        //       value = this._exponentialApproach(
        //         before.time, previouVal, before.value, before.constant, time
        //       );
        //     } else if (before.type === Tone.TimelineSignal.Type.Curve){
        //       value = this._curveInterpolate(
        //         before.time, before.value, before.duration, time
        //       );
        //     } else if (after === null){
        //       value = before.value;
        //     } else if (after.type === Tone.TimelineSignal.Type.Linear){
        //       value = this._linearInterpolate(
        //         before.time, before.value, after.time, after.value, time
        //       );
        //     } else if (after.type === Tone.TimelineSignal.Type.Exponential){
        //       value = this._exponentialInterpolate(
        //         before.time, before.value, after.time, after.value, time
        //       );
        //     } else {
        //       value = before.value;
        //     }
        //     return value;
        //   };
        //   /**
        // 	 *  When signals connect to other signals or AudioParams,
        // 	 *  they take over the output value of that signal or AudioParam.
        // 	 *  For all other nodes, the behavior is the same as a default <code>connect</code>.
        // 	 *
        // 	 *  @override
        // 	 *  @param {AudioParam|AudioNode|Tone.Signal|Tone} node
        // 	 *  @param {number} [outputNumber=0] The output number to connect from.
        // 	 *  @param {number} [inputNumber=0] The input number to connect to.
        // 	 *  @returns {Tone.TimelineSignal} this
        // 	 *  @method
        // 	 */
        //   Tone.TimelineSignal.prototype.connect = Tone.SignalBase.prototype.connect;
        //   ///////////////////////////////////////////////////////////////////////////
        //   //	AUTOMATION CURVE CALCULATIONS
        //   //	MIT License, copyright (c) 2014 Jordan Santell
        //   ///////////////////////////////////////////////////////////////////////////
        //   /**
        // 	 *  Calculates the the value along the curve produced by setTargetAtTime
        // 	 *  @private
        // 	 */
        //   Tone.TimelineSignal.prototype._exponentialApproach = function (
        //     t0, v0, v1, timeConstant, t) {
        //     return v1 + (v0 - v1) * Math.exp(-(t - t0) / timeConstant);
        //   };
        //   /**
        // 	 *  Calculates the the value along the curve produced by linearRampToValueAtTime
        // 	 *  @private
        // 	 */
        //   Tone.TimelineSignal.prototype._linearInterpolate = function (
        //     t0, v0, t1, v1, t) {
        //     return v0 + (v1 - v0) * ((t - t0) / (t1 - t0));
        //   };
        //   /**
        // 	 *  Calculates the the value along the curve produced by exponentialRampToValueAtTime
        // 	 *  @private
        // 	 */
        //   Tone.TimelineSignal.prototype._exponentialInterpolate = function (
        //     t0, v0, t1, v1, t) {
        //     v0 = Math.max(this._minOutput, v0);
        //     return v0 * Math.pow(v1 / v0, (t - t0) / (t1 - t0));
        //   };
        //   /**
        // 	 *  Calculates the the value along the curve produced by setValueCurveAtTime
        // 	 *  @private
        // 	 */
        //   Tone.TimelineSignal.prototype._curveInterpolate = function (
        //     start, curve, duration, time) {
        //     var len = curve.length;
        //     // If time is after duration, return the last curve value
        //     if (time >= start + duration) {
        //       return curve[len - 1];
        //     } else if (time <= start){
        //       return curve[0];
        //     } else {
        //       var progress = (time - start) / duration;
        //       var lowerIndex = Math.floor((len - 1) * progress);
        //       var upperIndex = Math.ceil((len - 1) * progress);
        //       var lowerVal = curve[lowerIndex];
        //       var upperVal = curve[upperIndex];
        //       if (upperIndex === lowerIndex){
        //         return lowerVal;
        //       } else {
        //         return this._linearInterpolate(
        //           lowerIndex, lowerVal, upperIndex, upperVal, progress * (len - 1)
        //         );
        //       }
        //     }
        //   };
        //   /**
        // 	 *  Clean up.
        // 	 *  @return {Tone.TimelineSignal} this
        // 	 */
        //   Tone.TimelineSignal.prototype.dispose = function(){
        //     Tone.Signal.prototype.dispose.call(this);
        //     Tone.Param.prototype.dispose.call(this);
        //     this._events.dispose();
        //     this._events = null;
        //   };
        //   return Tone.TimelineSignal;
        // });
        exports.default = _default;
      },
      {
      }
    ],
    209: [
      function (_dereq_, module, exports) {
        'use strict';
        _dereq_('core-js/modules/es.array.index-of');
        _dereq_('core-js/modules/es.array.iterator');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.typed-array.float32-array');
        _dereq_('core-js/modules/es.typed-array.copy-within');
        _dereq_('core-js/modules/es.typed-array.every');
        _dereq_('core-js/modules/es.typed-array.fill');
        _dereq_('core-js/modules/es.typed-array.filter');
        _dereq_('core-js/modules/es.typed-array.find');
        _dereq_('core-js/modules/es.typed-array.find-index');
        _dereq_('core-js/modules/es.typed-array.for-each');
        _dereq_('core-js/modules/es.typed-array.includes');
        _dereq_('core-js/modules/es.typed-array.index-of');
        _dereq_('core-js/modules/es.typed-array.iterator');
        _dereq_('core-js/modules/es.typed-array.join');
        _dereq_('core-js/modules/es.typed-array.last-index-of');
        _dereq_('core-js/modules/es.typed-array.map');
        _dereq_('core-js/modules/es.typed-array.reduce');
        _dereq_('core-js/modules/es.typed-array.reduce-right');
        _dereq_('core-js/modules/es.typed-array.reverse');
        _dereq_('core-js/modules/es.typed-array.set');
        _dereq_('core-js/modules/es.typed-array.slice');
        _dereq_('core-js/modules/es.typed-array.some');
        _dereq_('core-js/modules/es.typed-array.sort');
        _dereq_('core-js/modules/es.typed-array.subarray');
        _dereq_('core-js/modules/es.typed-array.to-locale-string');
        _dereq_('core-js/modules/es.typed-array.to-string');
        _dereq_('core-js/modules/es.array.index-of');
        _dereq_('core-js/modules/es.array.iterator');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.typed-array.float32-array');
        _dereq_('core-js/modules/es.typed-array.copy-within');
        _dereq_('core-js/modules/es.typed-array.every');
        _dereq_('core-js/modules/es.typed-array.fill');
        _dereq_('core-js/modules/es.typed-array.filter');
        _dereq_('core-js/modules/es.typed-array.find');
        _dereq_('core-js/modules/es.typed-array.find-index');
        _dereq_('core-js/modules/es.typed-array.for-each');
        _dereq_('core-js/modules/es.typed-array.includes');
        _dereq_('core-js/modules/es.typed-array.index-of');
        _dereq_('core-js/modules/es.typed-array.iterator');
        _dereq_('core-js/modules/es.typed-array.join');
        _dereq_('core-js/modules/es.typed-array.last-index-of');
        _dereq_('core-js/modules/es.typed-array.map');
        _dereq_('core-js/modules/es.typed-array.reduce');
        _dereq_('core-js/modules/es.typed-array.reduce-right');
        _dereq_('core-js/modules/es.typed-array.reverse');
        _dereq_('core-js/modules/es.typed-array.set');
        _dereq_('core-js/modules/es.typed-array.slice');
        _dereq_('core-js/modules/es.typed-array.some');
        _dereq_('core-js/modules/es.typed-array.sort');
        _dereq_('core-js/modules/es.typed-array.subarray');
        _dereq_('core-js/modules/es.typed-array.to-locale-string');
        _dereq_('core-js/modules/es.typed-array.to-string');
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }
        var WaveShaper =        /*#__PURE__*/
        function () {
          function WaveShaper(mapping, bufferLen) {
            _classCallCheck(this, WaveShaper);
            this._shaper = this.input = this.output = _audioContext.default.createWaveShaper();
            this._curve = null;
            if (Array.isArray(mapping)) {
              this.curve = mapping;
            } else if (isFinite(mapping) || this.isUndef(mapping)) {
              this._curve = new Float32Array(this.defaultArg(mapping, 1024));
            } else if (this.isFunction(mapping)) {
              this._curve = new Float32Array(this.defaultArg(bufferLen, 1024));
              this.setMap(mapping);
            }
          }
          _createClass(WaveShaper, [
            {
              key: 'setMap',
              value: function setMap(mapping) {
                for (var i = 0, len = this._curve.length; i < len; i++) {
                  var normalized = i / (len - 1) * 2 - 1;
                  this._curve[i] = mapping(normalized, i);
                }
                this._shaper.curve = this._curve;
                return this;
              }              /**
    * Specifies what type of oversampling (if any) should be used when
    * applying the shaping curve. Can either be "none", "2x" or "4x".
    * @memberOf WaveShaper
    * @type {string}
    * @name oversample
    */

            },
            {
              key: 'dispose',
              value: function dispose() {
                this._shaper.disconnect();
                this._shaper = null;
                this._curve = null;
              }
            },
            {
              key: 'curve',
              get: function get() {
                return this._shaper.curve;
              },
              set: function set(mapping) {
                this._curve = new Float32Array(mapping);
                this._shaper.curve = this._curve;
              }
            },
            {
              key: 'oversample',
              get: function get() {
                return this._shaper.oversample;
              },
              set: function set(oversampling) {
                if (['none',
                '2x',
                '4x'].indexOf(oversampling) !== - 1) {
                  this._shaper.oversample = oversampling;
                } else {
                  throw new RangeError('WaveShaper: oversampling must be either \'none\', \'2x\', or \'4x\'');
                }
              }
            }
          ]);
          return WaveShaper;
        }();
        var _default = WaveShaper; // original code
        // define(['Tone/core/Tone', 'Tone/signal/SignalBase'], function(Tone){
        //   'use strict';
        //   /**
        // 	 *  @class Wraps the native Web Audio API
        // 	 *         [WaveShaperNode](http://webaudio.github.io/web-audio-api/#the-waveshapernode-interface).
        // 	 *
        // 	 *  @extends {Tone.SignalBase}
        // 	 *  @constructor
        // 	 *  @param {function|Array|Number} mapping The function used to define the values.
        // 	 *                                    The mapping function should take two arguments:
        // 	 *                                    the first is the value at the current position
        // 	 *                                    and the second is the array position.
        // 	 *                                    If the argument is an array, that array will be
        // 	 *                                    set as the wave shaping function. The input
        // 	 *                                    signal is an AudioRange [-1, 1] value and the output
        // 	 *                                    signal can take on any numerical values.
        // 	 *
        // 	 *  @param {Number} [bufferLen=1024] The length of the WaveShaperNode buffer.
        // 	 *  @example
        // 	 * var timesTwo = new Tone.WaveShaper(function(val){
        // 	 * 	return val * 2;
        // 	 * }, 2048);
        // 	 *  @example
        // 	 * //a waveshaper can also be constructed with an array of values
        // 	 * var invert = new Tone.WaveShaper([1, -1]);
        // 	 */
        //   Tone.WaveShaper = function(mapping, bufferLen){
        //     /**
        // 		 *  the waveshaper
        // 		 *  @type {WaveShaperNode}
        // 		 *  @private
        // 		 */
        //     this._shaper = this.input = this.output = this.context.createWaveShaper();
        //     /**
        // 		 *  the waveshapers curve
        // 		 *  @type {Float32Array}
        // 		 *  @private
        // 		 */
        //     this._curve = null;
        //     if (Array.isArray(mapping)){
        //       this.curve = mapping;
        //     } else if (isFinite(mapping) || this.isUndef(mapping)){
        //       this._curve = new Float32Array(this.defaultArg(mapping, 1024));
        //     } else if (this.isFunction(mapping)){
        //       this._curve = new Float32Array(this.defaultArg(bufferLen, 1024));
        //       this.setMap(mapping);
        //     }
        //   };
        //   Tone.extend(Tone.WaveShaper, Tone.SignalBase);
        //   /**
        // 	 *  Uses a mapping function to set the value of the curve.
        // 	 *  @param {function} mapping The function used to define the values.
        // 	 *                            The mapping function take two arguments:
        // 	 *                            the first is the value at the current position
        // 	 *                            which goes from -1 to 1 over the number of elements
        // 	 *                            in the curve array. The second argument is the array position.
        // 	 *  @returns {Tone.WaveShaper} this
        // 	 *  @example
        // 	 * //map the input signal from [-1, 1] to [0, 10]
        // 	 * shaper.setMap(function(val, index){
        // 	 * 	return (val + 1) * 5;
        // 	 * })
        // 	 */
        //   Tone.WaveShaper.prototype.setMap = function(mapping){
        //     for (var i = 0, len = this._curve.length; i < len; i++){
        //       var normalized = (i / (len - 1)) * 2 - 1;
        //       this._curve[i] = mapping(normalized, i);
        //     }
        //     this._shaper.curve = this._curve;
        //     return this;
        //   };
        //   /**
        // 	 * The array to set as the waveshaper curve. For linear curves
        // 	 * array length does not make much difference, but for complex curves
        // 	 * longer arrays will provide smoother interpolation.
        // 	 * @memberOf Tone.WaveShaper#
        // 	 * @type {Array}
        // 	 * @name curve
        // 	 */
        //   Object.defineProperty(Tone.WaveShaper.prototype, 'curve', {
        //     get : function(){
        //       return this._shaper.curve;
        //     },
        //     set : function(mapping){
        //       this._curve = new Float32Array(mapping);
        //       this._shaper.curve = this._curve;
        //     }
        //   });
        //   /**
        // 	 * Specifies what type of oversampling (if any) should be used when
        // 	 * applying the shaping curve. Can either be "none", "2x" or "4x".
        // 	 * @memberOf Tone.WaveShaper#
        // 	 * @type {string}
        // 	 * @name oversample
        // 	 */
        //   Object.defineProperty(Tone.WaveShaper.prototype, 'oversample', {
        //     get : function(){
        //       return this._shaper.oversample;
        //     },
        //     set : function(oversampling){
        //       if (['none', '2x', '4x'].indexOf(oversampling) !== -1){
        //         this._shaper.oversample = oversampling;
        //       } else {
        //         throw new RangeError("Tone.WaveShaper: oversampling must be either 'none', '2x', or '4x'");
        //       }
        //     }
        //   });
        //   /**
        // 	 *  Clean up.
        // 	 *  @returns {Tone.WaveShaper} this
        // 	 */
        //   Tone.WaveShaper.prototype.dispose = function(){
        //     Tone.prototype.dispose.call(this);
        //     this._shaper.disconnect();
        //     this._shaper = null;
        //     this._curve = null;
        //     return this;
        //   };
        //   return Tone.WaveShaper;
        // });
        exports.default = _default;
      },
      {
        './audioContext': 213,
        'core-js/modules/es.array.index-of': 131,
        'core-js/modules/es.array.iterator': 132,
        'core-js/modules/es.object.to-string': 140,
        'core-js/modules/es.typed-array.copy-within': 154,
        'core-js/modules/es.typed-array.every': 155,
        'core-js/modules/es.typed-array.fill': 156,
        'core-js/modules/es.typed-array.filter': 157,
        'core-js/modules/es.typed-array.find': 159,
        'core-js/modules/es.typed-array.find-index': 158,
        'core-js/modules/es.typed-array.float32-array': 160,
        'core-js/modules/es.typed-array.for-each': 161,
        'core-js/modules/es.typed-array.includes': 162,
        'core-js/modules/es.typed-array.index-of': 163,
        'core-js/modules/es.typed-array.iterator': 164,
        'core-js/modules/es.typed-array.join': 165,
        'core-js/modules/es.typed-array.last-index-of': 166,
        'core-js/modules/es.typed-array.map': 167,
        'core-js/modules/es.typed-array.reduce': 169,
        'core-js/modules/es.typed-array.reduce-right': 168,
        'core-js/modules/es.typed-array.reverse': 170,
        'core-js/modules/es.typed-array.set': 171,
        'core-js/modules/es.typed-array.slice': 172,
        'core-js/modules/es.typed-array.some': 173,
        'core-js/modules/es.typed-array.sort': 174,
        'core-js/modules/es.typed-array.subarray': 175,
        'core-js/modules/es.typed-array.to-locale-string': 176,
        'core-js/modules/es.typed-array.to-string': 177
      }
    ],
    210: [
      function (_dereq_, module, exports) {
        'use strict';
        _dereq_('core-js/modules/es.symbol');
        _dereq_('core-js/modules/es.symbol.description');
        _dereq_('core-js/modules/es.symbol.iterator');
        _dereq_('core-js/modules/es.array.for-each');
        _dereq_('core-js/modules/es.array.index-of');
        _dereq_('core-js/modules/es.array.iterator');
        _dereq_('core-js/modules/es.array.map');
        _dereq_('core-js/modules/es.array.splice');
        _dereq_('core-js/modules/es.function.name');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.promise');
        _dereq_('core-js/modules/es.string.iterator');
        _dereq_('core-js/modules/web.dom-collections.for-each');
        _dereq_('core-js/modules/web.dom-collections.iterator');
        function _typeof2(obj) {
          if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
            _typeof2 = function _typeof2(obj) {
              return typeof obj;
            };
          } else {
            _typeof2 = function _typeof2(obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
            };
          }
          return _typeof2(obj);
        }
        _dereq_('core-js/modules/es.symbol');
        _dereq_('core-js/modules/es.symbol.description');
        _dereq_('core-js/modules/es.symbol.iterator');
        _dereq_('core-js/modules/es.array.for-each');
        _dereq_('core-js/modules/es.array.index-of');
        _dereq_('core-js/modules/es.array.iterator');
        _dereq_('core-js/modules/es.array.map');
        _dereq_('core-js/modules/es.array.splice');
        _dereq_('core-js/modules/es.function.name');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.promise');
        _dereq_('core-js/modules/es.string.iterator');
        _dereq_('core-js/modules/web.dom-collections.for-each');
        _dereq_('core-js/modules/web.dom-collections.iterator');
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.loadSound = loadSound;
        exports.default = void 0;
        _dereq_('regenerator-runtime/runtime');
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        var _processorNames = _interopRequireDefault(_dereq_('./audioWorklet/processorNames'));
        var _errorHandler = _interopRequireDefault(_dereq_('./errorHandler'));
        var _main = _interopRequireDefault(_dereq_('./main'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }
        function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }
          if (info.done) {
            resolve(value);
          } else {
            Promise.resolve(value).then(_next, _throw);
          }
        }
        function _asyncToGenerator(fn) {
          return function () {
            var self = this,
            args = arguments;
            return new Promise(function (resolve, reject) {
              var gen = fn.apply(self, args);
              function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
              }
              function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
              }
              _next(undefined);
            });
          };
        }
        function _typeof(obj) {
          if (typeof Symbol === 'function' && _typeof2(Symbol.iterator) === 'symbol') {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : _typeof2(obj);
            };
          }
          return _typeof(obj);
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }        /**
 * SoundFile object with a path to a file.
 * The p5sound.SoundFile may not be available immediately because it loads the file information asynchronously.
 * To do something with the sound as soon as it loads pass the name of a function as the second parameter.
 * @module Sound
 * @submodule SoundFile
 * @for p5
 * @requires core
 */
        // let _createCounterBuffer = function (buffer) {
        //   const len = buffer.length;
        //   const audioBuf = ac.createBuffer(1, buffer.length, ac.sampleRate);
        //   const arrayBuffer = audioBuf.getChannelData(0);
        //   for (let index = 0; index < len; index++) {
        //     arrayBuffer[index] = index;
        //   }
        //   return audioBuf;
        // };
        // event handler to remove references to the bufferSourceNode when it is done playing

        function _clearOnEnd(e) {
          var thisBufferSourceNode = e.target;
          var soundFile = this; // delete this.bufferSourceNode from the sources array when it is done playing:
          thisBufferSourceNode._playing = false;
          thisBufferSourceNode.removeEventListener('ended', soundFile._clearOnEnd); // call the onended callback
          soundFile._onended(soundFile); // delete bufferSourceNode(s) in soundFile.bufferSourceNodes
          // iterate in reverse order because the index changes by splice
          soundFile.bufferSourceNodes.map(function (_, i) {
            return i;
          }).reverse().forEach(function (i) {
            var n = soundFile.bufferSourceNodes[i];
            if (n._playing === false) {
              soundFile.bufferSourceNodes.splice(i, 1);
            }
          });
          if (soundFile.bufferSourceNodes.length === 0) {
            soundFile._playing = false;
          }
        }
        var SoundFile =        /*#__PURE__*/
        function () {
          function SoundFile(paths, onload, onerror, whileLoading) {
            _classCallCheck(this, SoundFile);
            if (typeof paths !== 'undefined') {
              if (typeof paths === 'string' || typeof paths[0] === 'string') {
                var path = p5.prototype._checkFileFormats(paths);
                this.url = path;
              } else if (_typeof(paths) === 'object') {
                if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
                  // The File API isn't supported in this browser
                  throw 'Unable to load file because the File API is not supported';
                }
              } // if type is a p5.File...get the actual file

              if (paths.file) {
                paths = paths.file;
              }
              this.file = paths;
            } // private _onended callback, set by the method: onended(callback)

            this._onended = function () {
            };
            this._looping = false;
            this._playing = false;
            this._paused = false;
            this._pauseTime = 0; // cues for scheduling events with addCue() removeCue()
            this._cues = [
            ];
            this._cueIDCounter = 0; //  position of the most recently played sample
            this._lastPos = 0; // this._counterNode = null;
            this._workletNode = null; // array of sources so that they can all be stopped!
            this.bufferSourceNodes = [
            ]; // current source
            this.bufferSourceNode = null;
            this.buffer = null;
            this.playbackRate = 1;
            this.input = _audioContext.default.createGain();
            this.output = _audioContext.default.createGain();
            this.reversed = false; // start and end of playback / loop
            this.startTime = 0;
            this.endTime = null;
            this.pauseTime = 0; // "restart" would stop playback before retriggering
            this.mode = 'sustain'; // time that playback was started, in millis
            this.startMillis = null; // stereo panning
            // this.panner = new Panner();
            // this.output.connect(this.panner);
            // this.output.connect(audioContext.destination);
            this.output.connect(_main.default.input); // it is possible to instantiate a soundfile with no path
            if (this.url || this.file) {
              this.load(onload, onerror);
            } // add this p5.SoundFile to the soundArray

            _main.default.soundArray.push(this);
            if (typeof whileLoading === 'function') {
              this._whileLoading = whileLoading;
            } else {
              this._whileLoading = function () {
              };
            }
            this._clearOnEnd = _clearOnEnd.bind(this); // same as setVolume, to match Processing Sound
            this.amp = this.setVolume; // these are the same thing
            this.fade = this.setVolume;
          }          /**
   * This is a helper function that the p5.SoundFile calls to load
   * itself. Accepts a callback (the name of another function)
   * as an optional parameter.
   *
   * @private
   * @for p5.SoundFile
   * @param {Function} [successCallback]   Name of a function to call once file loads
   * @param {Function} [errorCallback]   Name of a function to call if there is an error
   */

          _createClass(SoundFile, [
            {
              key: 'load',
              value: function load(callback, errorCallback) {
                var self = this;
                var errorTrace = new Error().stack;
                if (this.url !== undefined && this.url !== '') {
                  var request = new XMLHttpRequest();
                  request.addEventListener('progress', function (evt) {
                    self._updateProgress(evt);
                  }, false);
                  request.open('GET', this.url, true);
                  request.responseType = 'arraybuffer';
                  request.onload = function () {
                    if (request.status === 200) {
                      // on sucess loading file:
                      // if (!self.panner) return;
                      _audioContext.default.decodeAudioData(request.response, // success decoding buffer:
                      function (buff) {
                        // if (!self.panner) return;
                        self.buffer = buff;
                        if (callback) {
                          callback(self);
                        }
                      }, // error decoding buffer. "e" is undefined in Chrome 11/22/2015
                      function () {
                        // if (!self.panner) return;
                        var err = new _errorHandler.default('decodeAudioData', errorTrace, self.url);
                        var msg = 'AudioContext error at decodeAudioData for ' + self.url;
                        if (errorCallback) {
                          err.msg = msg;
                          errorCallback(err);
                        } else {
                          console.error(msg + '\n The error stack trace includes: \n' + err.stack);
                        }
                      });
                    } // if request status != 200, it failed
                     else {
                      // if (!self.panner) return;
                      var err = new _errorHandler.default('loadSound', errorTrace, self.url);
                      var msg = 'Unable to load ' + self.url + '. The request status was: ' + request.status + ' (' + request.statusText + ')';
                      if (errorCallback) {
                        err.message = msg;
                        errorCallback(err);
                      } else {
                        console.error(msg + '\n The error stack trace includes: \n' + err.stack);
                      }
                    }
                  }; // if there is another error, aside from 404...
                  request.onerror = function () {
                    var err = new _errorHandler.default('loadSound', errorTrace, self.url);
                    var msg = 'There was no response from the server at ' + self.url + '. Check the url and internet connectivity.';
                    if (errorCallback) {
                      err.message = msg;
                      errorCallback(err);
                    } else {
                      console.error(msg + '\n The error stack trace includes: \n' + err.stack);
                    }
                  };
                  request.send();
                } else if (this.file !== undefined) {
                  var reader = new FileReader();
                  reader.onload = function () {
                    // if (!self.panner) return;
                    _audioContext.default.decodeAudioData(reader.result, function (buff) {
                      // if (!self.panner) return;
                      self.buffer = buff;
                      if (callback) {
                        callback(self);
                      }
                    });
                  };
                  reader.onerror = function (e) {
                    // if (!self.panner) return;
                    if (onerror) {
                      onerror(e);
                    }
                  };
                  reader.readAsArrayBuffer(this.file);
                }
              }              /**
     *  Returns true if the sound file finished loading successfully.
     *
     *  @method  isLoaded
     *  @for p5.SoundFile
     *  @return {Boolean}
     */

            },
            {
              key: 'isLoaded',
              value: function isLoaded() {
                if (this.buffer) {
                  return true;
                } else {
                  return false;
                }
              }              /**
     * Play the p5.SoundFile
     *
     * @method play
     * @for p5.SoundFile
     * @param {Number} [startTime]            (optional) schedule playback to start (in seconds from now).
     * @param {Number} [rate]             (optional) playback rate
     * @param {Number} [amp]              (optional) amplitude (volume)
     *                                     of playback
     * @param {Number} [cueStart]        (optional) cue start time in seconds
     * @param {Number} [duration]          (optional) duration of playback in seconds
     */

            },
            {
              key: 'play',
              value: function play(startTime, rate, amp, _cueStart, duration) {
                if (!this.output) {
                  console.warn('SoundFile.play() called after dispose');
                  return;
                }
                var now = _audioContext.default.currentTime;
                var cueStart,
                cueEnd;
                var time = startTime || 0;
                if (time < 0) {
                  time = 0;
                }
                time = time + now;
                if (typeof rate !== 'undefined') {
                  this.rate(rate);
                }
                if (typeof amp !== 'undefined') {
                  this.setVolume(amp);
                } // TO DO: if already playing, create array of buffers for easy stop()

                if (this.buffer) {
                  // reset the pause time (if it was paused)
                  this._pauseTime = 0; // handle restart playmode
                  if (this.mode === 'restart' && this.buffer && this.bufferSourceNode) {
                    this.bufferSourceNode.stop(time); // this._counterNode.stop(time);
                  } //dont create another instance if already playing

                  if (this.mode === 'untildone' && this.isPlaying()) {
                    return;
                  } // make a new source and counter. They are automatically assigned playbackRate and buffer

                  this.bufferSourceNode = this._initSourceNode(); // garbage collect counterNode and create a new one
                  // delete this._counterNode;
                  // this._counterNode = this._initCounterNode();
                  if (_cueStart) {
                    if (_cueStart >= 0 && _cueStart < this.buffer.duration) {
                      // this.startTime = cueStart;
                      cueStart = _cueStart;
                    } else {
                      throw 'start time out of range';
                    }
                  } else {
                    cueStart = 0;
                  }
                  if (duration) {
                    // if duration is greater than buffer.duration, just play entire file anyway rather than throw an error
                    duration = duration <= this.buffer.duration - cueStart ? duration : this.buffer.duration;
                  } // if it was paused, play at the pause position

                  if (this._paused) {
                    this.bufferSourceNode.start(time, this.pauseTime, duration); // this._counterNode.start(time, this.pauseTime, duration);
                  } else {
                    this.bufferSourceNode.start(time, cueStart, duration); // this._counterNode.start(time, cueStart, duration);
                  }
                  this._playing = true;
                  this._paused = false; // add source to sources array, which is used in stopAll()
                  this.bufferSourceNodes.push(this.bufferSourceNode);
                  this.bufferSourceNode._arrayIndex = this.bufferSourceNodes.length - 1;
                  this.bufferSourceNode.addEventListener('ended', this._clearOnEnd);
                } // If soundFile hasn't loaded the buffer yet, throw an error
                 else {
                  throw 'not ready to play file, buffer has yet to load. Try preload()';
                } // if looping, will restart at original time

                this.bufferSourceNode.loop = this._looping; // this._counterNode.loop = this._looping;
                if (this._looping === true) {
                  cueEnd = duration ? duration : cueStart - 1e-15;
                  this.bufferSourceNode.loopStart = cueStart;
                  this.bufferSourceNode.loopEnd = cueEnd; // this._counterNode.loopStart = cueStart;
                  // this._counterNode.loopEnd = cueEnd;
                }
              }
            },
            {
              key: 'playMode',
              value: function playMode() {
                console.log('playMode');
              }
            },
            {
              key: 'pause',
              value: function pause() {
                console.log('pause');
              }              /**
     * Stop soundfile playback.
     *
     * @method stop
     * @for p5.SoundFile
     * @param {Number} [startTime] (optional) schedule event to occur
     *                             in seconds from now
     */

            },
            {
              key: 'stop',
              value: function stop(timeFromNow) {
                var time = timeFromNow || 0;
                if (this.mode === 'sustain' || this.mode === 'untildone') {
                  this.stopAll(time);
                  this._playing = false;
                  this.pauseTime = 0;
                  this._paused = false;
                } else if (this.buffer && this.bufferSourceNode) {
                  var now = _audioContext.default.currentTime;
                  this.pauseTime = 0;
                  this.bufferSourceNode.stop(now + time); // this._counterNode.stop(now + time);
                  this._playing = false;
                  this._paused = false;
                }
              }              /**
     *  Stop playback on all of this soundfile's sources.
     *  @private
     */

            },
            {
              key: 'stopAll',
              value: function stopAll(_time) {
                var now = _audioContext.default.currentTime;
                var time = _time || 0;
                if (this.buffer && this.bufferSourceNode) {
                  for (var i in this.bufferSourceNodes) {
                    var bufferSourceNode = this.bufferSourceNodes[i];
                    if (bufferSourceNode) {
                      try {
                        bufferSourceNode.stop(now + time);
                      } catch (e) { // this was throwing errors only on Safari
                      }
                    }
                  } // this._counterNode.stop(now + time);

                }
              }              /**
       *  Connect to a p5.sound / Web Audio object.
       *
       *  @method  connect
       *  @for p5.Oscillator
       *  @param  {Object} unit A p5.sound or Web Audio object
       */

            },
            {
              key: 'connect',
              value: function connect(unit) {
                if (!unit) {
                  this.output.connect(_main.default.input);
                } else if (unit.hasOwnProperty('input')) {
                  this.output.connect(unit.input);
                } else {
                  this.output.connect(unit);
                }
                if (unit && unit._onNewInput) {
                  unit._onNewInput(this);
                }
              }
            },
            {
              key: 'disconnect',
              value: function disconnect() {
                if (this.output) {
                  this.output.disconnect();
                }
              }              /**
     * Loop the p5.SoundFile. Accepts optional parameters to set the
     * playback rate, playback volume, loopStart, loopEnd.
     *
     * @method loop
     * @for p5.SoundFile
     * @param {Number} [startTime] (optional) schedule event to occur
     *                             seconds from now
     * @param {Number} [rate]        (optional) playback rate
     * @param {Number} [amp]         (optional) playback volume
     * @param {Number} [cueLoopStart] (optional) startTime in seconds
     * @param {Number} [duration]  (optional) loop duration in seconds
     * @example
     *  <div><code>
     *  let soundFile;
     *  let loopStart = 0.5;
     *  let loopDuration = 0.2;
     *  function preload() {
     *    soundFormats('ogg', 'mp3');
     *    soundFile = loadSound('assets/Damscray_-_Dancing_Tiger_02.mp3');
     *  }
     *  function setup() {
     *    let cnv = createCanvas(100, 100);
     *    cnv.mousePressed(canvasPressed);
     *    background(220);
     *    text('tap to play, release to pause', 10, 20, width - 20);
     *  }
     *  function canvasPressed() {
     *    soundFile.loop();
     *    background(0, 200, 50);
     *  }
     *  function mouseReleased() {
     *    soundFile.pause();
     *    background(220);
     *  }
     *  </code>
     *  </div>
     */

            },
            {
              key: 'loop',
              value: function loop(startTime, rate, amp, loopStart, duration) {
                this._looping = true;
                this.play(startTime, rate, amp, loopStart, duration);
              }
            },
            {
              key: '_initCounterNode',
              value: function () {
                var _initCounterNode2 = _asyncToGenerator(                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee() {
                  var _this = this;
                  var self,
                  workletBufferSize;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          self = this;
                          console.log('this ', JSON.stringify(self)); // let now = audioContext.currentTime;
                          // let cNode = audioContext.createBufferSource();
                          // Reuse the worklet node rather than creating a new one. Even if we
                          // disconnect it, it seems to leak and cause choppy audio after a
                          // while.
                          if (self._workletNode) {
                            _context.next = 14;
                            break;
                          }
                          workletBufferSize = 256; //safeBufferSize(256);
                          self._workletNode = new AudioWorkletNode(_audioContext.default, _processorNames.default.soundFileProcessor, {
                            processorOptions: {
                              bufferSize: workletBufferSize
                            }
                          });
                          console.log('self._workletNode', JSON.stringify(self._workletNode, null, 2));
                          _context.next = 8;
                          return self._workletNode.addModule('recorderProcessor.js');
                        case 8:
                          _context.next = 10;
                          return self._workletNode.addModule('amplitudeProcessor.js');
                        case 10:
                          _context.next = 12;
                          return self._workletNode.addModule('soundfileProcessor.js');
                        case 12:
                          self._workletNode.port.onmessage = function (event) {
                            if (event.data.name === 'position') {
                              // event.data.position should only be 0 when paused
                              if (event.data.position === 0) {
                                return;
                              }
                              _this._lastPos = event.data.position; // do any callbacks that have been scheduled
                              _this._onTimeUpdate(self._lastPos);
                            }
                          };
                          self._workletNode.connect(p5.soundOut._silentNode);
                        case 14:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));
                function _initCounterNode() {
                  return _initCounterNode2.apply(this, arguments);
                }
                return _initCounterNode;
              }() // initialize sourceNode, set its initial buffer and playbackRate
            },
            {
              key: '_initSourceNode',
              value: function _initSourceNode() {
                var bufferSourceNode = _audioContext.default.createBufferSource();
                bufferSourceNode.buffer = this.buffer;
                bufferSourceNode.playbackRate.value = this.playbackRate;
                bufferSourceNode.connect(this.output);
                return bufferSourceNode;
              }              /**
     *  Returns true if a p5.SoundFile is playing, false if not (i.e.
     *  paused or stopped).
     *
     *  @method isPlaying
     *  @for p5.SoundFile
     *  @return {Boolean}
     */

            },
            {
              key: 'isPlaying',
              value: function isPlaying() {
                return this._playing;
              }              /**
     *  Returns true if a p5.SoundFile is paused, false if not (i.e.
     *  playing or stopped).
     *
     *  @method  isPaused
     *  @for p5.SoundFile
     *  @return {Boolean}
     */

            },
            {
              key: 'isPaused',
              value: function isPaused() {
                return this._paused;
              } // TO DO: use this method to create a loading bar that shows progress during file upload/decode.

            },
            {
              key: '_updateProgress',
              value: function _updateProgress(evt) {
                if (evt.lengthComputable) {
                  var percentComplete = evt.loaded / evt.total * 0.99;
                  this._whileLoading(percentComplete, evt); // ...
                } else {
                  // Unable to compute progress information since the total size is unknown
                  this._whileLoading('size unknown');
                }
              }
            }
          ]);
          return SoundFile;
        }();
        /**
 *  loadSound() returns a new p5.SoundFile from a specified
 *  path. If called during preload(), the p5.SoundFile will be ready
 *  to play in time for setup() and draw(). If called outside of
 *  preload, the p5.SoundFile will not be ready immediately, so
 *  loadSound accepts a callback as the second parameter. Using a
 *  <a href="https://github.com/processing/p5.js/wiki/Local-server">
 *  local server</a> is recommended when loading external files.
 *
 *  @method loadSound
 *  @for p5
 *  @param  {String|Array}   path     Path to the sound file, or an array with
 *                                    paths to soundfiles in multiple formats
 *                                    i.e. ['sound.ogg', 'sound.mp3'].
 *                                    Alternately, accepts an object: either
 *                                    from the HTML5 File API, or a p5.File.
 *  @param {Function} [successCallback]   Name of a function to call once file loads
 *  @param {Function} [errorCallback]   Name of a function to call if there is
 *                                      an error loading the file.
 *  @param {Function} [whileLoading] Name of a function to call while file is loading.
 *                                 This function will receive the percentage loaded
 *                                 so far, from 0.0 to 1.0.
 *  @return {SoundFile}            Returns a p5.SoundFile
 *  @example
 *  <div><code>
 *  let mySound;
 *  function preload() {
 *    soundFormats('mp3', 'ogg');
 *    mySound = loadSound('assets/doorbell');
 *  }
 *
 *  function setup() {
 *    let cnv = createCanvas(100, 100);
 *    cnv.mousePressed(canvasPressed);
 *    background(220);
 *    text('tap here to play', 10, 20);
 *  }
 *
 *  function canvasPressed() {
 *    // playing a sound file on a user gesture
 *    // is equivalent to `userStartAudio()`
 *    mySound.play();
 *  }
 *  </code></div>
 */
        function loadSound(path, callback, onerror, whileLoading) {
          // if loading locally without a server
          if (window.location.origin.indexOf('file://') > - 1 && window.cordova === 'undefined') {
            window.alert('This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS');
          }
          var self = this;
          var s = new SoundFile(path, function () {
            if (typeof callback === 'function') {
              callback.apply(self, arguments);
            }
            if (typeof self._decrementPreload === 'function') {
              self._decrementPreload();
            }
          }, onerror, whileLoading);
          return s;
        }
        var _default = SoundFile;
        exports.default = _default;
      },
      {
        './audioContext': 213,
        './audioWorklet/processorNames': 214,
        './errorHandler': 216,
        './main': 218,
        'core-js/modules/es.array.for-each': 130,
        'core-js/modules/es.array.index-of': 131,
        'core-js/modules/es.array.iterator': 132,
        'core-js/modules/es.array.map': 134,
        'core-js/modules/es.array.splice': 136,
        'core-js/modules/es.function.name': 137,
        'core-js/modules/es.object.to-string': 140,
        'core-js/modules/es.promise': 141,
        'core-js/modules/es.string.iterator': 146,
        'core-js/modules/es.symbol': 153,
        'core-js/modules/es.symbol.description': 151,
        'core-js/modules/es.symbol.iterator': 152,
        'core-js/modules/web.dom-collections.for-each': 180,
        'core-js/modules/web.dom-collections.iterator': 181,
        'regenerator-runtime/runtime': 182
      }
    ],
    211: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        } // https://raw.githubusercontent.com/Tonejs/Tone.js/r10/Tone/type/Type.js

        var Type = function Type() {
          _classCallCheck(this, Type);
        };
        var _default = Type; // define(['Tone/core/Tone', 'Tone/type/Time', 'Tone/type/Frequency', 'Tone/type/TransportTime', 'Tone/core/Context'],
        //   function (Tone) {
        //     ///////////////////////////////////////////////////////////////////////////
        //     //	TYPES
        //     ///////////////////////////////////////////////////////////////////////////
        //     /**
        // 	 * Units which a value can take on.
        // 	 * @enum {String}
        // 	 */
        //     Tone.Type = {
        //       /**
        // 		 *  Default units
        // 		 *  @typedef {Default}
        // 		 */
        //       Default : 'number',
        //       /**
        // 		 *  Time can be described in a number of ways. Read more [Time](https://github.com/Tonejs/Tone.js/wiki/Time).
        // 		 *
        // 		 *  <ul>
        // 		 *  <li>Numbers, which will be taken literally as the time (in seconds).</li>
        // 		 *  <li>Notation, ("4n", "8t") describes time in BPM and time signature relative values.</li>
        // 		 *  <li>TransportTime, ("4:3:2") will also provide tempo and time signature relative times
        // 		 *  in the form BARS:QUARTERS:SIXTEENTHS.</li>
        // 		 *  <li>Frequency, ("8hz") is converted to the length of the cycle in seconds.</li>
        // 		 *  <li>Now-Relative, ("+1") prefix any of the above with "+" and it will be interpreted as
        // 		 *  "the current time plus whatever expression follows".</li>
        // 		 *  <li>Expressions, ("3:0 + 2 - (1m / 7)") any of the above can also be combined
        // 		 *  into a mathematical expression which will be evaluated to compute the desired time.</li>
        // 		 *  <li>No Argument, for methods which accept time, no argument will be interpreted as
        // 		 *  "now" (i.e. the currentTime).</li>
        // 		 *  </ul>
        // 		 *
        // 		 *  @typedef {Time}
        // 		 */
        //       Time : 'time',
        //       /**
        // 		 *  Frequency can be described similar to time, except ultimately the
        // 		 *  values are converted to frequency instead of seconds. A number
        // 		 *  is taken literally as the value in hertz. Additionally any of the
        // 		 *  Time encodings can be used. Note names in the form
        // 		 *  of NOTE OCTAVE (i.e. C4) are also accepted and converted to their
        // 		 *  frequency value.
        // 		 *  @typedef {Frequency}
        // 		 */
        //       Frequency : 'frequency',
        //       /**
        // 		 *  TransportTime describes a position along the Transport's timeline. It is
        // 		 *  similar to Time in that it uses all the same encodings, but TransportTime specifically
        // 		 *  pertains to the Transport's timeline, which is startable, stoppable, loopable, and seekable.
        // 		 *  [Read more](https://github.com/Tonejs/Tone.js/wiki/TransportTime)
        // 		 *  @typedef {TransportTime}
        // 		 */
        //       TransportTime : 'transportTime',
        //       /**
        // 		 *  Ticks are the basic subunit of the Transport. They are
        // 		 *  the smallest unit of time that the Transport supports.
        // 		 *  @typedef {Ticks}
        // 		 */
        //       Ticks : 'ticks',
        //       /**
        // 		 *  Normal values are within the range [0, 1].
        // 		 *  @typedef {NormalRange}
        // 		 */
        //       NormalRange : 'normalRange',
        //       /**
        // 		 *  AudioRange values are between [-1, 1].
        // 		 *  @typedef {AudioRange}
        // 		 */
        //       AudioRange : 'audioRange',
        //       /**
        // 		 *  Decibels are a logarithmic unit of measurement which is useful for volume
        // 		 *  because of the logarithmic way that we perceive loudness. 0 decibels
        // 		 *  means no change in volume. -10db is approximately half as loud and 10db
        // 		 *  is twice is loud.
        // 		 *  @typedef {Decibels}
        // 		 */
        //       Decibels : 'db',
        //       /**
        // 		 *  Half-step note increments, i.e. 12 is an octave above the root. and 1 is a half-step up.
        // 		 *  @typedef {Interval}
        // 		 */
        //       Interval : 'interval',
        //       /**
        // 		 *  Beats per minute.
        // 		 *  @typedef {BPM}
        // 		 */
        //       BPM : 'bpm',
        //       /**
        // 		 *  The value must be greater than or equal to 0.
        // 		 *  @typedef {Positive}
        // 		 */
        //       Positive : 'positive',
        //       /**
        // 		 *  A cent is a hundredth of a semitone.
        // 		 *  @typedef {Cents}
        // 		 */
        //       Cents : 'cents',
        //       /**
        // 		 *  Angle between 0 and 360.
        // 		 *  @typedef {Degrees}
        // 		 */
        //       Degrees : 'degrees',
        //       /**
        // 		 *  A number representing a midi note.
        // 		 *  @typedef {MIDI}
        // 		 */
        //       MIDI : 'midi',
        //       /**
        // 		 *  A colon-separated representation of time in the form of
        // 		 *  Bars:Beats:Sixteenths.
        // 		 *  @typedef {BarsBeatsSixteenths}
        // 		 */
        //       BarsBeatsSixteenths : 'barsBeatsSixteenths',
        //       /**
        // 		 *  Sampling is the reduction of a continuous signal to a discrete signal.
        // 		 *  Audio is typically sampled 44100 times per second.
        // 		 *  @typedef {Samples}
        // 		 */
        //       Samples : 'samples',
        //       /**
        // 		 *  Hertz are a frequency representation defined as one cycle per second.
        // 		 *  @typedef {Hertz}
        // 		 */
        //       Hertz : 'hertz',
        //       /**
        // 		 *  A frequency represented by a letter name,
        // 		 *  accidental and octave. This system is known as
        // 		 *  [Scientific Pitch Notation](https://en.wikipedia.org/wiki/Scientific_pitch_notation).
        // 		 *  @typedef {Note}
        // 		 */
        //       Note : 'note',
        //       /**
        // 		 *  One millisecond is a thousandth of a second.
        // 		 *  @typedef {Milliseconds}
        // 		 */
        //       Milliseconds : 'milliseconds',
        //       /**
        // 		 *  Seconds are the time unit of the AudioContext. In the end,
        // 		 *  all values need to be evaluated to seconds.
        // 		 *  @typedef {Seconds}
        // 		 */
        //       Seconds : 'seconds',
        //       /**
        // 		 *  A string representing a duration relative to a measure.
        // 		 *  <ul>
        // 		 *  	<li>"4n" = quarter note</li>
        // 		 *   	<li>"2m" = two measures</li>
        // 		 *    	<li>"8t" = eighth-note triplet</li>
        // 		 *  </ul>
        // 		 *  @typedef {Notation}
        // 		 */
        //       Notation : 'notation'
        //     };
        //     ///////////////////////////////////////////////////////////////////////////
        //     // AUGMENT TONE's PROTOTYPE
        //     ///////////////////////////////////////////////////////////////////////////
        //     /**
        // 	 *  Convert Time into seconds.
        // 	 *
        // 	 *  Unlike the method which it overrides, this takes into account
        // 	 *  transporttime and musical notation.
        // 	 *
        // 	 *  Time : 1.40
        // 	 *  Notation: 4n|1m|2t
        // 	 *  Now Relative: +3n
        // 	 *  Math: 3n+16n or even complicated expressions ((3n*2)/6 + 1)
        // 	 *
        // 	 *  @param  {Time} time
        // 	 *  @return {Seconds}
        // 	 */
        //     Tone.prototype.toSeconds = function(time){
        //       if (this.isNumber(time)){
        //         return time;
        //       } else if (this.isUndef(time)){
        //         return this.now();
        //       } else if (this.isString(time)){
        //         return (new Tone.Time(time)).toSeconds();
        //       } else if (time instanceof Tone.TimeBase){
        //         return time.toSeconds();
        //       }
        //     };
        //     /**
        // 	 *  Convert a frequency representation into a number.
        // 	 *  @param  {Frequency} freq
        // 	 *  @return {Hertz}      the frequency in hertz
        // 	 */
        //     Tone.prototype.toFrequency = function(freq){
        //       if (this.isNumber(freq)){
        //         return freq;
        //       } else if (this.isString(freq) || this.isUndef(freq)){
        //         return (new Tone.Frequency(freq)).valueOf();
        //       } else if (freq instanceof Tone.TimeBase){
        //         return freq.toFrequency();
        //       }
        //     };
        //     /**
        // 	 *  Convert a time representation into ticks.
        // 	 *  @param  {Time} time
        // 	 *  @return {Ticks}  the time in ticks
        // 	 */
        //     Tone.prototype.toTicks = function(time){
        //       if (this.isNumber(time) || this.isString(time)){
        //         return (new Tone.TransportTime(time)).toTicks();
        //       } else if (this.isUndef(time)){
        //         return Tone.Transport.ticks;
        //       } else if (time instanceof Tone.TimeBase){
        //         return time.toTicks();
        //       }
        //     };
        //     return Tone;
        //   });
        exports.default = _default;
      },
      {
      }
    ],
    212: [
      function (_dereq_, module, exports) {
        'use strict';
        _dereq_('core-js/modules/es.symbol');
        _dereq_('core-js/modules/es.symbol.description');
        _dereq_('core-js/modules/es.symbol.iterator');
        _dereq_('core-js/modules/es.array.iterator');
        _dereq_('core-js/modules/es.object.get-own-property-descriptor');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.string.iterator');
        _dereq_('core-js/modules/es.weak-map');
        _dereq_('core-js/modules/web.dom-collections.iterator');
        function _typeof2(obj) {
          if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
            _typeof2 = function _typeof2(obj) {
              return typeof obj;
            };
          } else {
            _typeof2 = function _typeof2(obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
            };
          }
          return _typeof2(obj);
        }
        function _typeof(obj) {
          if (typeof Symbol === 'function' && _typeof2(Symbol.iterator) === 'symbol') {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : _typeof2(obj);
            };
          }
          return _typeof(obj);
        }
        _dereq_('./constants');
        _dereq_('./shims');
        var _audioContext = _dereq_('./audioContext');
        var _main = _interopRequireDefault(_dereq_('./main'));
        var _helpers = _dereq_('./helpers');
        var _SoundFile = _interopRequireWildcard(_dereq_('./SoundFile'));
        var _Oscillator = _interopRequireWildcard(_dereq_('./Oscillator'));
        var _Noise = _interopRequireDefault(_dereq_('./Noise'));
        var _Amplitude = _interopRequireDefault(_dereq_('./Amplitude'));
        var _AudioIn = _interopRequireDefault(_dereq_('./AudioIn'));
        var _Effect = _interopRequireDefault(_dereq_('./Effect'));
        var _BiquadFilter = _interopRequireWildcard(_dereq_('./BiquadFilter'));
        var _Delay = _interopRequireDefault(_dereq_('./Delay'));
        var _AnalyzerFFT = _interopRequireDefault(_dereq_('./AnalyzerFFT'));
        var _Envelope = _interopRequireDefault(_dereq_('./Envelope'));
        var _CrossFade = _interopRequireDefault(_dereq_('./CrossFade'));
        var _SignalEqualPowerGain = _interopRequireDefault(_dereq_('./SignalEqualPowerGain'));
        var _Gain = _interopRequireDefault(_dereq_('./Gain'));
        var _Param = _interopRequireDefault(_dereq_('./Param'));
        var _Signal = _interopRequireDefault(_dereq_('./Signal'));
        var _SignalAbs = _interopRequireDefault(_dereq_('./SignalAbs'));
        var _SignalAdd = _interopRequireDefault(_dereq_('./SignalAdd'));
        var _SignalAudioToGain = _interopRequireDefault(_dereq_('./SignalAudioToGain'));
        var _SignalBase = _interopRequireDefault(_dereq_('./SignalBase'));
        var _SignalExpr = _interopRequireDefault(_dereq_('./SignalExpr'));
        var _SignalModulo = _interopRequireDefault(_dereq_('./SignalModulo'));
        var _SignalMultiply = _interopRequireDefault(_dereq_('./SignalMultiply'));
        var _SignalNegate = _interopRequireDefault(_dereq_('./SignalNegate'));
        var _SignalPow = _interopRequireDefault(_dereq_('./SignalPow'));
        var _SignalScale = _interopRequireDefault(_dereq_('./SignalScale'));
        var _SignalSubtract = _interopRequireDefault(_dereq_('./SignalSubtract'));
        var _SignalTimeLineSignal = _interopRequireDefault(_dereq_('./SignalTimeLineSignal'));
        var _SignalWaveShaper = _interopRequireDefault(_dereq_('./SignalWaveShaper'));
        var _Type = _interopRequireDefault(_dereq_('./Type'));
        function _getRequireWildcardCache() {
          if (typeof WeakMap !== 'function') return null;
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
          if (obj === null || _typeof(obj) !== 'object' && typeof obj !== 'function') {
            return {
            default:
              obj
            };
          }
          var cache = _getRequireWildcardCache();
          if (cache && cache.has(obj)) {
            return cache.get(obj);
          }
          var newObj = {
          };
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
          default:
            obj
          };
        } // core

        p5.prototype.getAudioContext = _audioContext.getAudioContext;
        p5.prototype._checkFileFormats = _helpers._checkFileFormats;
        p5.prototype.midiToFreq = _helpers.midiToFreq;
        p5.prototype.soundFormats = _helpers.soundFormats;
        p5.prototype.safeBufferSize = _helpers.safeBufferSize;
        p5.prototype.SoundFile = _SoundFile.default;
        p5.prototype.loadSound = _SoundFile.loadSound; // register preload handling of loadSound
        p5.prototype.registerPreloadMethod('loadSound', p5.prototype);
        p5.prototype.Oscillator = _Oscillator.default;
        p5.prototype.SinOsc = _Oscillator.SinOsc;
        p5.prototype.TriOsc = _Oscillator.TriOsc;
        p5.prototype.SawOsc = _Oscillator.SawOsc;
        p5.prototype.SqrOsc = _Oscillator.SqrOsc;
        p5.prototype.Noise = _Noise.default;
        p5.prototype.Amplitude = _Amplitude.default;
        p5.prototype.AudioIn = _AudioIn.default;
        p5.prototype.Effect = _Effect.default;
        p5.prototype.BiquadFilter = _BiquadFilter.default;
        p5.prototype.LowPass = _BiquadFilter.LowPass;
        p5.prototype.HighPass = _BiquadFilter.HighPass;
        p5.prototype.BandPass = _BiquadFilter.BandPass;
        p5.prototype.Delay = _Delay.default;
        p5.prototype.AnalyzerFFT = _AnalyzerFFT.default;
        p5.prototype.Envelope = _Envelope.default; // new modules adapted from Tone.js v0.10.0
        p5.prototype.CrossFade = _CrossFade.default;
        p5.prototype.EqualPowerGain = _SignalEqualPowerGain.default;
        p5.prototype.Gain = _Gain.default;
        p5.prototype.Param = _Param.default;
        p5.prototype.Signal = _Signal.default;
        p5.prototype.SignalAbs = _SignalAbs.default;
        p5.prototype.SignalAdd = _SignalAdd.default;
        p5.prototype.SignalAudioToGain = _SignalAudioToGain.default;
        p5.prototype.SignalBase = _SignalBase.default;
        p5.prototype.SignalExpr = _SignalExpr.default;
        p5.prototype.SignalModulo = _SignalModulo.default;
        p5.prototype.SignalMultiply = _SignalMultiply.default;
        p5.prototype.SignalNegate = _SignalNegate.default;
        p5.prototype.SignalPow = _SignalPow.default;
        p5.prototype.SignalScale = _SignalScale.default;
        p5.prototype.SignalSubtract = _SignalSubtract.default;
        p5.prototype.SignalTimeLineSignal = _SignalTimeLineSignal.default;
        p5.prototype.SignalWaveShaper = _SignalWaveShaper.default;
        p5.prototype.Type = _Type.default;
        module.exports = _main.default;
      },
      {
        './Amplitude': 183,
        './AnalyzerFFT': 184,
        './AudioIn': 185,
        './BiquadFilter': 186,
        './CrossFade': 187,
        './Delay': 188,
        './Effect': 189,
        './Envelope': 190,
        './Gain': 191,
        './Noise': 192,
        './Oscillator': 193,
        './Param': 194,
        './Signal': 195,
        './SignalAbs': 196,
        './SignalAdd': 197,
        './SignalAudioToGain': 198,
        './SignalBase': 199,
        './SignalEqualPowerGain': 200,
        './SignalExpr': 201,
        './SignalModulo': 202,
        './SignalMultiply': 203,
        './SignalNegate': 204,
        './SignalPow': 205,
        './SignalScale': 206,
        './SignalSubtract': 207,
        './SignalTimeLineSignal': 208,
        './SignalWaveShaper': 209,
        './SoundFile': 210,
        './Type': 211,
        './audioContext': 213,
        './constants': 215,
        './helpers': 217,
        './main': 218,
        './shims': 219,
        'core-js/modules/es.array.iterator': 132,
        'core-js/modules/es.object.get-own-property-descriptor': 138,
        'core-js/modules/es.object.to-string': 140,
        'core-js/modules/es.string.iterator': 146,
        'core-js/modules/es.symbol': 153,
        'core-js/modules/es.symbol.description': 151,
        'core-js/modules/es.symbol.iterator': 152,
        'core-js/modules/es.weak-map': 179,
        'core-js/modules/web.dom-collections.iterator': 181
      }
    ],
    213: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
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
      },
      {
      }
    ],
    214: [
      function (_dereq_, module, exports) {
        'use strict';
        module.exports = {
          recorderProcessor: 'recorder-processor',
          soundFileProcessor: 'sound-file-processor',
          amplitudeProcessor: 'amplitude-processor'
        };
      },
      {
      }
    ],
    215: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.VERSION = void 0;
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
        var VERSION = '0.0.1';
        exports.VERSION = VERSION;
      },
      {
      }
    ],
    216: [
      function (_dereq_, module, exports) {
        'use strict';
        _dereq_('core-js/modules/es.array.filter');
        _dereq_('core-js/modules/es.array.join');
        _dereq_('core-js/modules/es.function.name');
        _dereq_('core-js/modules/es.regexp.exec');
        _dereq_('core-js/modules/es.string.match');
        _dereq_('core-js/modules/es.string.split');
        _dereq_('core-js/modules/es.array.filter');
        _dereq_('core-js/modules/es.array.join');
        _dereq_('core-js/modules/es.function.name');
        _dereq_('core-js/modules/es.regexp.exec');
        _dereq_('core-js/modules/es.string.match');
        _dereq_('core-js/modules/es.string.split');
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        /*
    Helper function to generate an error
    with a custom stack trace that points to the sketch
    and removes other parts of the stack trace.

    @private
    @class customError
    @constructor
    @param  {String} name         custom  error name
    @param  {String} errorTrace   custom error trace
    @param  {String} failedPath     path to the file that failed to load
    @property {String} name custom error name
    @property {String} message custom error message
    @property {String} stack trace the error back to a line in the user's sketch.
                             Note: this edits out stack trace within p5.js and p5.sound.
    @property {String} originalStack unedited, original stack trace
    @property {String} failedPath path to the file that failed to load
    @return {Error}     returns a custom Error object
   */
        var CustomError = function CustomError(name, errorTrace, failedPath) {
          var err = new Error();
          var tempStack,
          splitStack;
          err.name = name;
          err.originalStack = err.stack + errorTrace;
          tempStack = err.stack + errorTrace;
          err.failedPath = failedPath; // only print the part of the stack trace that refers to the user code:
          splitStack = tempStack.split('\n').filter(function (ln) {
            return !ln.match(/(p5.|native code|globalInit)/g);
          });
          err.stack = splitStack.join('\n');
          return err; // TODO: is this really a constructor?
        };
        var _default = CustomError;
        exports.default = _default;
      },
      {
        'core-js/modules/es.array.filter': 129,
        'core-js/modules/es.array.join': 133,
        'core-js/modules/es.function.name': 137,
        'core-js/modules/es.regexp.exec': 144,
        'core-js/modules/es.string.match': 147,
        'core-js/modules/es.string.split': 149
      }
    ],
    217: [
      function (_dereq_, module, exports) {
        'use strict';
        _dereq_('core-js/modules/es.symbol');
        _dereq_('core-js/modules/es.symbol.description');
        _dereq_('core-js/modules/es.symbol.iterator');
        _dereq_('core-js/modules/es.array.index-of');
        _dereq_('core-js/modules/es.array.iterator');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.regexp.exec');
        _dereq_('core-js/modules/es.string.iterator');
        _dereq_('core-js/modules/es.string.split');
        _dereq_('core-js/modules/web.dom-collections.iterator');
        function _typeof2(obj) {
          if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
            _typeof2 = function _typeof2(obj) {
              return typeof obj;
            };
          } else {
            _typeof2 = function _typeof2(obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
            };
          }
          return _typeof2(obj);
        }
        _dereq_('core-js/modules/es.symbol');
        _dereq_('core-js/modules/es.symbol.description');
        _dereq_('core-js/modules/es.symbol.iterator');
        _dereq_('core-js/modules/es.array.index-of');
        _dereq_('core-js/modules/es.array.iterator');
        _dereq_('core-js/modules/es.object.to-string');
        _dereq_('core-js/modules/es.regexp.exec');
        _dereq_('core-js/modules/es.string.iterator');
        _dereq_('core-js/modules/es.string.split');
        _dereq_('core-js/modules/web.dom-collections.iterator');
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports._checkFileFormats = _checkFileFormats;
        exports.midiToFreq = midiToFreq;
        exports.soundFormats = soundFormats;
        exports.safeBufferSize = safeBufferSize;
        var _main = _interopRequireDefault(_dereq_('./main'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }
        function _typeof(obj) {
          if (typeof Symbol === 'function' && _typeof2(Symbol.iterator) === 'symbol') {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : _typeof2(obj);
            };
          }
          return _typeof(obj);
        }
        function safeBufferSize(idealBufferSize) {
          var bufferSize = idealBufferSize; // if the AudioWorkletNode is actually a ScriptProcessorNode created via polyfill,
          // make sure that our chosen buffer size isn't smaller than the buffer size automatically
          // selected by the polyfill
          // reference: https://github.com/GoogleChromeLabs/audioworklet-polyfill/issues/13#issuecomment-425014930
          // let tempAudioWorkletNode = new AudioWorkletNode(
          //   audioContext,
          //   processorNames.soundFileProcessor
          // );
          // if (tempAudioWorkletNode instanceof ScriptProcessorNode) {
          //   bufferSize = tempAudioWorkletNode.bufferSize;
          // }
          // tempAudioWorkletNode.disconnect();
          // tempAudioWorkletNode = null;
          return bufferSize;
        }        /**
 *  List the SoundFile formats that you will include. LoadSound
 *  will search your directory for these extensions, and will pick
 *  a format that is compatable with the client's web browser.
 *  <a href="http://media.io/">Here</a> is a free online file
 *  converter.
 *
 *  @method soundFormats
 *  @param {String} [...formats] i.e. 'mp3', 'wav', 'ogg'
 *  @example
 *  <div><code>
 *  function preload() {
 *    // set the global sound formats
 *    soundFormats('mp3', 'ogg');
 *
 *    // load either beatbox.mp3, or .ogg, depending on browser
 *    mySound = loadSound('assets/beatbox.mp3');
 *  }
 *
 *  function setup() {
 *       let cnv = createCanvas(100, 100);
 *       background(220);
 *       text('sound loaded! tap to play', 10, 20, width - 20);
 *       cnv.mousePressed(function() {
 *         mySound.play();
 *       });
 *     }
 *  </code></div>
 */

        function soundFormats() {
          // reset extensions array
          _main.default.extensions = [
          ]; // add extensions
          for (var i = 0; i < arguments.length; i++) {
            arguments[i] = arguments[i].toLowerCase();
            if (['mp3',
            'wav',
            'ogg',
            'm4a',
            'aac'].indexOf(arguments[i]) > - 1) {
              _main.default.extensions.push(arguments[i]);
            } else {
              throw arguments[i] + ' is not a valid sound format!';
            }
          }
        }
        function _checkFileFormats(paths) {
          var path; // if path is a single string, check to see if extension is provided
          if (typeof paths === 'string') {
            path = paths; // see if extension is provided
            var extTest = path.split('.').pop(); // if an extension is provided...
            if (['mp3',
            'wav',
            'ogg',
            'm4a',
            'aac'].indexOf(extTest) > - 1) {
              if (!p5.prototype.isFileSupported(extTest)) {
                var pathSplit = path.split('.');
                var pathCore = pathSplit[pathSplit.length - 1];
                for (var i = 0; i < _main.default.extensions.length; i++) {
                  var extension = _main.default.extensions[i];
                  var supported = p5.prototype.isFileSupported(extension);
                  if (supported) {
                    pathCore = '';
                    if (pathSplit.length === 2) {
                      pathCore += pathSplit[0];
                    }
                    for (var _i = 1; _i <= pathSplit.length - 2; _i++) {
                      var p = pathSplit[_i];
                      pathCore += '.' + p;
                    }
                    path = pathCore += '.';
                    path = path += extension;
                    break;
                  }
                }
              }
            } // if no extension is provided...
             else {
              for (var _i2 = 0; _i2 < _main.default.extensions.length; _i2++) {
                var _extension = _main.default.extensions[_i2];
                var _supported = p5.prototype.isFileSupported(_extension);
                if (_supported) {
                  path = path + '.' + _extension;
                  break;
                }
              }
            }
          } // end 'if string'
          // path can either be a single string, or an array
           else if (_typeof(paths) === 'object') {
            for (var _i3 = 0; _i3 < paths.length; _i3++) {
              var _extension2 = paths[_i3].split('.').pop();
              var _supported2 = p5.prototype.isFileSupported(_extension2);
              if (_supported2) {
                // console.log('.'+extension + ' is ' + supported +
                //  ' supported by your browser.');
                path = paths[_i3];
                break;
              }
            }
          }
          return path;
        }        /**
 *  Returns the frequency value of a MIDI note value.
 *  General MIDI treats notes as integers where middle C
 *  is 60, C# is 61, D is 62 etc. Useful for generating
 *  musical frequencies with oscillators.
 *
 *  @method  midiToFreq
 *  @param  {Number} midiNote The number of a MIDI note
 *  @return {Number} Frequency value of the given MIDI note
 *  @example
 *  <div><code>
 *  let midiNotes = [60, 64, 67, 72];
 *  let noteIndex = 0;
 *  let midiVal, freq;
 *
 *  function setup() {
 *    let cnv = createCanvas(100, 100);
 *    cnv.mousePressed(startSound);
 *    osc = new p5.TriOsc();
 *    env = new p5.Envelope();
 *  }
 *
 *  function draw() {
 *    background(220);
 *    text('tap to play', 10, 20);
 *    if (midiVal) {
 *      text('MIDI: ' + midiVal, 10, 40);
 *      text('Freq: ' + freq, 10, 60);
 *    }
 *  }
 *
 *  function startSound() {
 *    // see also: userStartAudio();
 *    osc.start();
 *
 *    midiVal = midiNotes[noteIndex % midiNotes.length];
 *    freq = midiToFreq(midiVal);
 *    osc.freq(freq);
 *    env.ramp(osc, 0, 1.0, 0);
 *
 *    noteIndex++;
 *  }
 *  </code></div>
 */

        function midiToFreq(m) {
          return 440 * Math.pow(2, (m - 69) / 12);
        }
      },
      {
        './main': 218,
        'core-js/modules/es.array.index-of': 131,
        'core-js/modules/es.array.iterator': 132,
        'core-js/modules/es.object.to-string': 140,
        'core-js/modules/es.regexp.exec': 144,
        'core-js/modules/es.string.iterator': 146,
        'core-js/modules/es.string.split': 149,
        'core-js/modules/es.symbol': 153,
        'core-js/modules/es.symbol.description': 151,
        'core-js/modules/es.symbol.iterator': 152,
        'core-js/modules/web.dom-collections.iterator': 181
      }
    ],
    218: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext.js'));
        var _constants = _dereq_('./constants.js');
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        } // p5sound contains the final sound output bus.

        var Main = function Main() {
          _classCallCheck(this, Main);
          this.input = _audioContext.default.createGain();
          this.output = _audioContext.default.createGain(); // //put a hard limiter on the output
          this.limiter = _audioContext.default.createDynamicsCompressor();
          this.limiter.threshold.value = - 3;
          this.limiter.ratio.value = 20;
          this.limiter.knee.value = 1;
          this.audioContext = _audioContext.default;
          this.output.disconnect(); // connect input to limiter
          this.input.connect(this.limiter); // connect limiter to output
          this.limiter.connect(this.output); // meter is just for global Amplitude / FFT analysis
          this.meter = _audioContext.default.createGain();
          this.fftMeter = _audioContext.default.createGain();
          this.output.connect(this.meter);
          this.output.connect(this.fftMeter); // connect output to destination
          this.output.connect(this.audioContext.destination); // an array of all sounds in the sketch
          this.soundArray = [
          ]; // file extensions to search for
          this.extensions = [
          ];
          this.VERSION = _constants.VERSION;
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
        //     var now = p5sound.audioContext.currentTime;
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
        p5.prototype.soundOut = p5.soundOut = p5sound; // // a silent connection to the DesinationNode
        // // which will ensure that anything connected to it
        // // will not be garbage collected
        p5.soundOut._silentNode = _audioContext.default.createGain();
        p5.soundOut._silentNode.gain.value = 0;
        p5.soundOut._silentNode.connect(_audioContext.default.destination);
        var _default = p5sound;
        exports.default = _default;
      },
      {
        './audioContext.js': 213,
        './constants.js': 215
      }
    ],
    219: [
      function (_dereq_, module, exports) {
        'use strict';
        /**
 * This module has shims
 */
        /* AudioContext Monkeypatch
     Copyright 2013 Chris Wilson
     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at
         http://www.apache.org/licenses/LICENSE-2.0
     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
  */
        /**
 * Determine which filetypes are supported (inspired by buzz.js)
 * The audio element (el) will only be used to test browser support for various audio formats
 */
        var el = document.createElement('audio');
        p5.prototype.isSupported = function () {
          return !!el.canPlayType;
        };
        var isOGGSupported = function isOGGSupported() {
          return !!el.canPlayType && el.canPlayType('audio/ogg; codecs="vorbis"');
        };
        var isMP3Supported = function isMP3Supported() {
          return !!el.canPlayType && el.canPlayType('audio/mpeg;');
        };
        var isWAVSupported = function isWAVSupported() {
          return !!el.canPlayType && el.canPlayType('audio/wav; codecs="1"');
        };
        var isAACSupported = function isAACSupported() {
          return !!el.canPlayType && (el.canPlayType('audio/x-m4a;') || el.canPlayType('audio/aac;'));
        };
        var isAIFSupported = function isAIFSupported() {
          return !!el.canPlayType && el.canPlayType('audio/x-aiff;');
        };
        p5.prototype.isFileSupported = function (extension) {
          switch (extension.toLowerCase()) {
            case 'mp3':
              return isMP3Supported();
            case 'wav':
              return isWAVSupported();
            case 'ogg':
              return isOGGSupported();
            case 'aac':
            case 'm4a':
            case 'mp4':
              return isAACSupported();
            case 'aif':
            case 'aiff':
              return isAIFSupported();
            default:
              return false;
          }
        };
      },
      {
      }
    ]
  }, {
  }, [
    212
  ]) (212)
});
