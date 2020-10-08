'use strict';

var React = require('react');
var ky = require('ky/umd');
var reactFontawesome = require('@fortawesome/react-fontawesome');
var freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');
var timeago_js = require('timeago.js');
var core = require('@emotion/core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var ky__default = /*#__PURE__*/_interopDefaultLegacy(ky);

/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

function memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = memoize(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

if (process.env.NODE_ENV !== 'production') {
  var contentValuePattern = /(attr|calc|counters?|url)\(/;
  var contentValues = ['normal', 'none', 'counter', 'open-quote', 'close-quote', 'no-open-quote', 'no-close-quote', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        console.error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    var processed = oldProcessStyleValue(key, value);

    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }

    return processed;
  };
}

var shouldWarnAboutInterpolatingClassNameFromCss = true;

function handleInterpolation(mergedProps, registered, interpolation, couldBeSelectorInterpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if (process.env.NODE_ENV !== 'production' && interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
      throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
    }

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if (process.env.NODE_ENV !== 'production' && interpolation.map !== undefined) {
            styles += interpolation.map;
          }

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result, couldBeSelectorInterpolation);
        } else if (process.env.NODE_ENV !== 'production') {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }

        break;
      }

    case 'string':
      if (process.env.NODE_ENV !== 'production') {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });

        if (matched.length) {
          console.error('`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\n' + 'Instead of doing this:\n\n' + [].concat(matched, ["`" + replaced + "`"]).join('\n') + '\n\nYou should wrap it with `css` like this:\n\n' + ("css`" + replaced + "`"));
        }
      }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];

  if (process.env.NODE_ENV !== 'production' && couldBeSelectorInterpolation && shouldWarnAboutInterpolatingClassNameFromCss && cached !== undefined) {
    console.error('Interpolating a className from css`` is not recommended and will cause problems with composition.\n' + 'Interpolating a className from css`` will be completely unsupported in a future major version of Emotion');
    shouldWarnAboutInterpolatingClassNameFromCss = false;
  }

  return cached !== undefined && !couldBeSelectorInterpolation ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i], false);
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && process.env.NODE_ENV !== 'production') {
          throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value, false);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if (process.env.NODE_ENV !== 'production' && _key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;
var sourceMapPattern;

if (process.env.NODE_ENV !== 'production') {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//;
} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings, false);
  } else {
    if (process.env.NODE_ENV !== 'production' && strings[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i], styles.charCodeAt(styles.length - 1) === 46);

    if (stringMode) {
      if (process.env.NODE_ENV !== 'production' && strings[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles += strings[i];
    }
  }

  var sourceMap;

  if (process.env.NODE_ENV !== 'production') {
    styles = styles.replace(sourceMapPattern, function (match) {
      sourceMap = match;
      return '';
    });
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = murmur2(styles) + identifierName;

  if (process.env.NODE_ENV !== 'production') {
    // $FlowFixMe SerializedStyles type doesn't have toString property (and we don't want to add it)
    return {
      name: name,
      styles: styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};

function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return serializeStyles(args);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var arrayLikeToArray = _arrayLikeToArray;

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

var arrayWithoutHoles = _arrayWithoutHoles;

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

var iterableToArray = _iterableToArray;

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

var unsupportedIterableToArray = _unsupportedIterableToArray;

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var nonIterableSpread = _nonIterableSpread;

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

var toConsumableArray = _toConsumableArray;

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
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
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
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
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
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

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

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
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
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

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

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
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

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
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var regenerator = runtime_1;

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
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var asyncToGenerator = _asyncToGenerator;

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var arrayWithHoles = _arrayWithHoles;

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

var iterableToArrayLimit = _iterableToArrayLimit;

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var nonIterableRest = _nonIterableRest;

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

var slicedToArray = _slicedToArray;

var wrapper = {
  display: 'flex',
  '& + &': {
    marginTop: 20
  },
  '& &': {
    marginLeft: 20
  }
};
var avatar = {
  borderRadius: 5,
  height: 64,
  width: 64
};
var body = {
  marginLeft: 12
};
var bullet = {
  color: '#c2c6cc',
  padding: '0 5px'
};
var childrenWrapper = {
  marginBottom: 20,
  marginTop: 20,
  '.comment-container > &': {
    marginLeft: 76
  },
  '.comment-container > & > &': {
    marginLeft: 76
  },
  '.comment-container > & > & > &': {
    marginLeft: 76
  },
  '.comment-container > & > & > & > &': {
    marginLeft: 76
  },
  '.comment-container > & > & > & > & > &': {
    marginLeft: 76
  }
};

var myLocale = function myLocale(_number, index) {
  return [['just now', 'right now'], ['less than a minute ago', 'in less than a minute'], ['1 minute ago', 'in 1 minute'], ['%s minutes ago', 'in %s minutes'], ['1 hour ago', 'in 1 hour'], ['%s hours ago', 'in %s hours'], ['1 day ago', 'in 1 day'], ['%s days ago', 'in %s days'], ['1 week ago', 'in 1 week'], ['%s weeks ago', 'in %s weeks'], ['1 month ago', 'in 1 month'], ['%s months ago', 'in %s months'], ['1 year ago', 'in 1 year'], ['%s years ago', 'in %s years']][index];
};

var timeAgo = {
  color: 'rgba(104, 122, 134, .8)',
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 500
};
var locale = 'my-locale';
timeago_js.register(locale, myLocale);
function TimeAgoWrapper(props) {
  var timeRef = React.useRef(null); // render(timeRef.current, locale)

  return core.jsx("span", {
    css: timeAgo
  }, core.jsx("time", {
    ref: timeRef,
    dateTime: props.datetime
  }, timeago_js.format("".concat(props.datetime, ".000Z"), locale)));
}

var authorLink = {
  color: '#ff642b',
  fontSize: 17,
  fontWeight: 700,
  letterSpacing: '.01em',
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline'
  }
};
var header = {
  marginBottom: 5
};
var replyTo = {
  color: '#687a86'
};
var replyArrow = {
  fontSize: 15,
  height: 15,
  padding: '0 5px',
  transform: 'rotateY(180deg)'
};
function CommentHeader(_ref) {
  var comment = _ref.comment,
      parent = _ref.parent;
  return core.jsx("header", {
    css: header
  }, core.jsx("a", {
    href: "",
    css: authorLink
  }, comment.author.name), parent && core.jsx("span", {
    css: replyTo
  }, core.jsx(reactFontawesome.FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faReply,
    css: replyArrow
  }), parent.author.name), core.jsx("span", {
    css: bullet
  }, "\u2022"), core.jsx(TimeAgoWrapper, {
    datetime: comment.createdAt
  }));
}

if (process.browser) {
  window.twttr = (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://platform.twitter.com/widgets.js';
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function (f) {
      t._e.push(f);
    };

    return t
  })(document, 'script', 'twitter-wjs');
}

var wrapper$1 = {
  img: {
    maxWidth: '100%'
  }
};
var messageWrapper = {
  color: 'rgba(0, 10, 0, .70)',
  fontFamily: 'Lora, serif',
  fontSize: 20,
  letterSpacing: '.01em',
  lineHeight: 1.5,
  p: {
    margin: '0 0 15px',
    ':last-child': {
      marginBottom: 0
    }
  },
  a: {
    color: '#ff642b',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline'
    }
  }
};
function CommentMessage(_ref) {
  var comment = _ref.comment;

  var getMedia = function getMedia(media) {
    var _window, _window$twttr, _window$twttr$widgets;

    switch (media.providerName) {
      case 'Disquscdn':
        return "<img src=\"".concat(media.thumbnailUrl, "\" />");

      case 'Twitter':
        (_window = window) === null || _window === void 0 ? void 0 : (_window$twttr = _window.twttr) === null || _window$twttr === void 0 ? void 0 : (_window$twttr$widgets = _window$twttr.widgets) === null || _window$twttr$widgets === void 0 ? void 0 : _window$twttr$widgets.load();
        return media.html;

      default:
        return '';
    }
  };

  var message = comment.message;
  var media = comment.media.map(function (m) {
    return getMedia(m);
  }).join('');
  return core.jsx("div", {
    css: messageWrapper
  }, core.jsx("div", {
    dangerouslySetInnerHTML: {
      __html: message
    }
  }), core.jsx("div", {
    dangerouslySetInnerHTML: {
      __html: media
    },
    css: wrapper$1
  }));
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var footer = {
  alignItems: 'center',
  color: '#656c7a',
  display: 'flex',
  marginBottom: 20,
  marginTop: 10
};
var votelink = {
  fontSize: 16,
  opacity: 0.5,
  padding: '0 5px',
  ':hover': {
    cursor: 'pointer',
    opacity: 0.8
  }
};

var upvote = _objectSpread(_objectSpread({}, votelink), {}, {
  marginLeft: -5
});

var voteIcon = {
  fontSize: 14,
  height: 14,
  verticalAlign: -1
};
var separator = {
  borderRight: '2px solid #656c7a',
  height: 14,
  margin: '0 9px',
  opacity: 0.7
};
var likes = {
  marginRight: 7
};
var dislikes = {
  marginLeft: 7
};
function CommentFooter(_ref) {
  var comment = _ref.comment;
  return core.jsx("div", {
    css: footer
  }, core.jsx("button", {
    css: upvote
  }, !!comment.likes && core.jsx("span", {
    css: likes
  }, comment.likes), core.jsx("span", null, core.jsx(reactFontawesome.FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faChevronUp,
    css: voteIcon
  }))), core.jsx("span", {
    css: separator
  }), core.jsx("button", {
    css: votelink
  }, core.jsx("span", null, core.jsx(reactFontawesome.FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faChevronDown,
    css: voteIcon
  })), !!comment.dislikes && core.jsx("span", {
    css: dislikes
  }, comment.dislikes)));
}

function Comment(_ref) {
  var comment = _ref.comment,
      allComments = _ref.allComments;
  var parent = allComments === null || allComments === void 0 ? void 0 : allComments.find(function (c) {
    var _comment$parent;

    return ((_comment$parent = comment.parent) === null || _comment$parent === void 0 ? void 0 : _comment$parent.toString()) === c.id;
  });
  var children = allComments === null || allComments === void 0 ? void 0 : allComments.filter(function (c) {
    var _c$parent;

    return ((_c$parent = c.parent) === null || _c$parent === void 0 ? void 0 : _c$parent.toString()) === comment.id;
  });
  return core.jsx(React__default['default'].Fragment, null, core.jsx("div", {
    css: wrapper
  }, core.jsx("img", {
    css: avatar,
    src: comment.author.avatar.large.cache
  }), core.jsx("div", {
    css: body
  }, core.jsx(CommentHeader, {
    comment: comment,
    parent: parent
  }), core.jsx(CommentMessage, {
    comment: comment
  }), core.jsx(CommentFooter, {
    comment: comment
  }))), children === null || children === void 0 ? void 0 : children.map(function (child) {
    return core.jsx("div", {
      css: childrenWrapper,
      key: child.id
    }, core.jsx(Comment, {
      comment: child,
      allComments: allComments
    }));
  }));
}

var global = {
  fontFamily: 'Roboto, sans-serif',
  button: {
    backgroundColor: 'unset',
    border: 0,
    fontWeight: 700,
    outline: 0
  }
};

var normalize = /*#__PURE__*/

/*#__PURE__*/
core.css("\n  /*! modern-normalize v1.0.0 | MIT License | https://github.com/sindresorhus/modern-normalize */\n  *,\n  ::after,\n  ::before {\n    box-sizing: border-box;\n  }\n  :root {\n    -moz-tab-size: 4;\n    tab-size: 4;\n  }\n  html {\n    line-height: 1.15;\n    -webkit-text-size-adjust: 100%;\n  }\n  body {\n    margin: 0;\n  }\n  body {\n    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',\n      'Segoe UI Emoji';\n  }\n  hr {\n    height: 0;\n    color: inherit;\n  }\n  abbr[title] {\n    text-decoration: underline dotted;\n  }\n  b,\n  strong {\n    font-weight: bolder;\n  }\n  code,\n  kbd,\n  pre,\n  samp {\n    font-family: ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;\n    font-size: 1em;\n  }\n  small {\n    font-size: 80%;\n  }\n  sub,\n  sup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n  }\n  sub {\n    bottom: -0.25em;\n  }\n  sup {\n    top: -0.5em;\n  }\n  table {\n    text-indent: 0;\n    border-color: inherit;\n  }\n  button,\n  input,\n  optgroup,\n  select,\n  textarea {\n    font-family: inherit;\n    font-size: 100%;\n    line-height: 1.15;\n    margin: 0;\n  }\n  button,\n  select {\n    text-transform: none;\n  }\n  [type='button'],\n  [type='reset'],\n  [type='submit'],\n  button {\n    -webkit-appearance: button;\n  }\n  ::-moz-focus-inner {\n    border-style: none;\n    padding: 0;\n  }\n  :-moz-focusring {\n    outline: 1px dotted ButtonText;\n  }\n  :-moz-ui-invalid {\n    box-shadow: none;\n  }\n  legend {\n    padding: 0;\n  }\n  progress {\n    vertical-align: baseline;\n  }\n  ::-webkit-inner-spin-button,\n  ::-webkit-outer-spin-button {\n    height: auto;\n  }\n  [type='search'] {\n    -webkit-appearance: textfield;\n    outline-offset: -2px;\n  }\n  ::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n  ::-webkit-file-upload-button {\n    -webkit-appearance: button;\n    font: inherit;\n  }\n  summary {\n    display: list-item;\n  }\n  /*# sourceMappingURL=/sm/3c8a72540b353e8066a63580fff1b7fbff35925789e51ac52bb6794c81144ab3.map */\n", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vcm1hbGl6ZS5jc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ2UiLCJmaWxlIjoibm9ybWFsaXplLmNzcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xyXG5leHBvcnQgZGVmYXVsdCBjc3MoYFxuICAvKiEgbW9kZXJuLW5vcm1hbGl6ZSB2MS4wLjAgfCBNSVQgTGljZW5zZSB8IGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvbW9kZXJuLW5vcm1hbGl6ZSAqL1xuICAqLFxuICA6OmFmdGVyLFxuICA6OmJlZm9yZSB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgfVxuICA6cm9vdCB7XG4gICAgLW1vei10YWItc2l6ZTogNDtcbiAgICB0YWItc2l6ZTogNDtcbiAgfVxuICBodG1sIHtcbiAgICBsaW5lLWhlaWdodDogMS4xNTtcbiAgICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7XG4gIH1cbiAgYm9keSB7XG4gICAgbWFyZ2luOiAwO1xuICB9XG4gIGJvZHkge1xuICAgIGZvbnQtZmFtaWx5OiBzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sICdTZWdvZSBVSScsIFJvYm90bywgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZiwgJ0FwcGxlIENvbG9yIEVtb2ppJyxcbiAgICAgICdTZWdvZSBVSSBFbW9qaSc7XG4gIH1cbiAgaHIge1xuICAgIGhlaWdodDogMDtcbiAgICBjb2xvcjogaW5oZXJpdDtcbiAgfVxuICBhYmJyW3RpdGxlXSB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkO1xuICB9XG4gIGIsXG4gIHN0cm9uZyB7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcbiAgfVxuICBjb2RlLFxuICBrYmQsXG4gIHByZSxcbiAgc2FtcCB7XG4gICAgZm9udC1mYW1pbHk6IHVpLW1vbm9zcGFjZSwgU0ZNb25vLVJlZ3VsYXIsIENvbnNvbGFzLCAnTGliZXJhdGlvbiBNb25vJywgTWVubG8sIG1vbm9zcGFjZTtcbiAgICBmb250LXNpemU6IDFlbTtcbiAgfVxuICBzbWFsbCB7XG4gICAgZm9udC1zaXplOiA4MCU7XG4gIH1cbiAgc3ViLFxuICBzdXAge1xuICAgIGZvbnQtc2l6ZTogNzUlO1xuICAgIGxpbmUtaGVpZ2h0OiAwO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XG4gIH1cbiAgc3ViIHtcbiAgICBib3R0b206IC0wLjI1ZW07XG4gIH1cbiAgc3VwIHtcbiAgICB0b3A6IC0wLjVlbTtcbiAgfVxuICB0YWJsZSB7XG4gICAgdGV4dC1pbmRlbnQ6IDA7XG4gICAgYm9yZGVyLWNvbG9yOiBpbmhlcml0O1xuICB9XG4gIGJ1dHRvbixcbiAgaW5wdXQsXG4gIG9wdGdyb3VwLFxuICBzZWxlY3QsXG4gIHRleHRhcmVhIHtcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgICBmb250LXNpemU6IDEwMCU7XG4gICAgbGluZS1oZWlnaHQ6IDEuMTU7XG4gICAgbWFyZ2luOiAwO1xuICB9XG4gIGJ1dHRvbixcbiAgc2VsZWN0IHtcbiAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgfVxuICBbdHlwZT0nYnV0dG9uJ10sXG4gIFt0eXBlPSdyZXNldCddLFxuICBbdHlwZT0nc3VibWl0J10sXG4gIGJ1dHRvbiB7XG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XG4gIH1cbiAgOjotbW96LWZvY3VzLWlubmVyIHtcbiAgICBib3JkZXItc3R5bGU6IG5vbmU7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuICA6LW1vei1mb2N1c3Jpbmcge1xuICAgIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcbiAgfVxuICA6LW1vei11aS1pbnZhbGlkIHtcbiAgICBib3gtc2hhZG93OiBub25lO1xuICB9XG4gIGxlZ2VuZCB7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuICBwcm9ncmVzcyB7XG4gICAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xuICB9XG4gIDo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcbiAgOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcbiAgICBoZWlnaHQ6IGF1dG87XG4gIH1cbiAgW3R5cGU9J3NlYXJjaCddIHtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDtcbiAgICBvdXRsaW5lLW9mZnNldDogLTJweDtcbiAgfVxuICA6Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgfVxuICA6Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjtcbiAgICBmb250OiBpbmhlcml0O1xuICB9XG4gIHN1bW1hcnkge1xuICAgIGRpc3BsYXk6IGxpc3QtaXRlbTtcbiAgfVxuICAvKiMgc291cmNlTWFwcGluZ1VSTD0vc20vM2M4YTcyNTQwYjM1M2U4MDY2YTYzNTgwZmZmMWI3ZmJmZjM1OTI1Nzg5ZTUxYWM1MmJiNjc5NGM4MTE0NGFiMy5tYXAgKi9cbmApO1xyXG4iXX0= */", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vcm1hbGl6ZS5jc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ2UiLCJmaWxlIjoibm9ybWFsaXplLmNzcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xyXG5leHBvcnQgZGVmYXVsdCBjc3MoYFxuICAvKiEgbW9kZXJuLW5vcm1hbGl6ZSB2MS4wLjAgfCBNSVQgTGljZW5zZSB8IGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvbW9kZXJuLW5vcm1hbGl6ZSAqL1xuICAqLFxuICA6OmFmdGVyLFxuICA6OmJlZm9yZSB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgfVxuICA6cm9vdCB7XG4gICAgLW1vei10YWItc2l6ZTogNDtcbiAgICB0YWItc2l6ZTogNDtcbiAgfVxuICBodG1sIHtcbiAgICBsaW5lLWhlaWdodDogMS4xNTtcbiAgICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7XG4gIH1cbiAgYm9keSB7XG4gICAgbWFyZ2luOiAwO1xuICB9XG4gIGJvZHkge1xuICAgIGZvbnQtZmFtaWx5OiBzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sICdTZWdvZSBVSScsIFJvYm90bywgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZiwgJ0FwcGxlIENvbG9yIEVtb2ppJyxcbiAgICAgICdTZWdvZSBVSSBFbW9qaSc7XG4gIH1cbiAgaHIge1xuICAgIGhlaWdodDogMDtcbiAgICBjb2xvcjogaW5oZXJpdDtcbiAgfVxuICBhYmJyW3RpdGxlXSB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkO1xuICB9XG4gIGIsXG4gIHN0cm9uZyB7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcbiAgfVxuICBjb2RlLFxuICBrYmQsXG4gIHByZSxcbiAgc2FtcCB7XG4gICAgZm9udC1mYW1pbHk6IHVpLW1vbm9zcGFjZSwgU0ZNb25vLVJlZ3VsYXIsIENvbnNvbGFzLCAnTGliZXJhdGlvbiBNb25vJywgTWVubG8sIG1vbm9zcGFjZTtcbiAgICBmb250LXNpemU6IDFlbTtcbiAgfVxuICBzbWFsbCB7XG4gICAgZm9udC1zaXplOiA4MCU7XG4gIH1cbiAgc3ViLFxuICBzdXAge1xuICAgIGZvbnQtc2l6ZTogNzUlO1xuICAgIGxpbmUtaGVpZ2h0OiAwO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XG4gIH1cbiAgc3ViIHtcbiAgICBib3R0b206IC0wLjI1ZW07XG4gIH1cbiAgc3VwIHtcbiAgICB0b3A6IC0wLjVlbTtcbiAgfVxuICB0YWJsZSB7XG4gICAgdGV4dC1pbmRlbnQ6IDA7XG4gICAgYm9yZGVyLWNvbG9yOiBpbmhlcml0O1xuICB9XG4gIGJ1dHRvbixcbiAgaW5wdXQsXG4gIG9wdGdyb3VwLFxuICBzZWxlY3QsXG4gIHRleHRhcmVhIHtcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgICBmb250LXNpemU6IDEwMCU7XG4gICAgbGluZS1oZWlnaHQ6IDEuMTU7XG4gICAgbWFyZ2luOiAwO1xuICB9XG4gIGJ1dHRvbixcbiAgc2VsZWN0IHtcbiAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgfVxuICBbdHlwZT0nYnV0dG9uJ10sXG4gIFt0eXBlPSdyZXNldCddLFxuICBbdHlwZT0nc3VibWl0J10sXG4gIGJ1dHRvbiB7XG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XG4gIH1cbiAgOjotbW96LWZvY3VzLWlubmVyIHtcbiAgICBib3JkZXItc3R5bGU6IG5vbmU7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuICA6LW1vei1mb2N1c3Jpbmcge1xuICAgIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcbiAgfVxuICA6LW1vei11aS1pbnZhbGlkIHtcbiAgICBib3gtc2hhZG93OiBub25lO1xuICB9XG4gIGxlZ2VuZCB7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuICBwcm9ncmVzcyB7XG4gICAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xuICB9XG4gIDo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcbiAgOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcbiAgICBoZWlnaHQ6IGF1dG87XG4gIH1cbiAgW3R5cGU9J3NlYXJjaCddIHtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDtcbiAgICBvdXRsaW5lLW9mZnNldDogLTJweDtcbiAgfVxuICA6Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgfVxuICA6Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjtcbiAgICBmb250OiBpbmhlcml0O1xuICB9XG4gIHN1bW1hcnkge1xuICAgIGRpc3BsYXk6IGxpc3QtaXRlbTtcbiAgfVxuICAvKiMgc291cmNlTWFwcGluZ1VSTD0vc20vM2M4YTcyNTQwYjM1M2U4MDY2YTYzNTgwZmZmMWI3ZmJmZjM1OTI1Nzg5ZTUxYWM1MmJiNjc5NGM4MTE0NGFiMy5tYXAgKi9cbmApO1xyXG4iXX0= */");

function Forum(props) {
  var apiKey = props.apiKey,
      forumName = props.forumName,
      link = props.link,
      _props$limit = props.limit,
      limit = _props$limit === void 0 ? 100 : _props$limit,
      _props$proxy = props.proxy,
      proxy = _props$proxy === void 0 ? '' : _props$proxy;

  var _useState = React.useState([]),
      _useState2 = slicedToArray(_useState, 2),
      comments = _useState2[0],
      setComments = _useState2[1];

  React.useEffect(function () {
    authenticateUser();
  }, []);
  React.useEffect(function () {
    if (!link) return;
    setComments([]);
    fetchComments();
  }, [link]);
  React.useEffect(function () {// This will run each time we fetch any comments, we could probably make this run once after we know all comments have been fetched
    // fetchCurrentUserLikes()
  }, [comments]);

  var authenticateUser = /*#__PURE__*/function () {
    var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function authenticateUser() {
      return _ref.apply(this, arguments);
    };
  }();

  var fetchComments = /*#__PURE__*/function () {
    var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
      var cursor,
          res,
          _args2 = arguments;
      return regenerator.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              cursor = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : '';
              _context2.next = 3;
              return ky__default['default'].get("".concat(proxy, "https://disqus.com/api/3.0/posts/list.json?api_key=").concat(apiKey, "&forum=").concat(forumName, "&thread=link:").concat(link, "&limit=").concat(limit, "&cursor=").concat(cursor)).json();

            case 3:
              res = _context2.sent;
              setComments(function (comments) {
                return [].concat(toConsumableArray(comments), toConsumableArray(res['response']));
              });
              if (res['response'].length === limit) fetchComments(res['cursor']['next']);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function fetchComments() {
      return _ref2.apply(this, arguments);
    };
  }(); // const fetchCurrentUserLikes = async (): Promise<void> => {
  //   const posts = comments
  //     .filter((comment) => comment.likes > 0 || comment.dislikes > 0)
  //     .map((comment) => `&post=${comment.id}`)
  //     .join('')
  //   const res = await ky
  //     .get(`https://disqus.com/api/3.0/embed/threadDetails.json?api_key=${key}&thread=8126951959${posts}`, {
  //       credentials: 'include',
  //     })
  //     .json()
  // }


  return core.jsx("div", {
    css: /*#__PURE__*/css([normalize, global], process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZvcnVtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUErQ2lCIiwiZmlsZSI6IkZvcnVtLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQga3kgZnJvbSAna3kvdW1kJztcclxuaW1wb3J0IENvbW1lbnQgZnJvbSAnLi4vQ29tbWVudC9Db21tZW50JztcclxuaW1wb3J0IGdsb2JhbCBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgbm9ybWFsaXplIGZyb20gJy4uLy4uL2xpYi9ub3JtYWxpemUuY3NzJztcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRm9ydW0ocHJvcHMpIHtcclxuICAgIGNvbnN0IHsgYXBpS2V5LCBmb3J1bU5hbWUsIGxpbmssIGxpbWl0ID0gMTAwLCBwcm94eSA9ICcnIH0gPSBwcm9wcztcclxuICAgIGNvbnN0IFtjb21tZW50cywgc2V0Q29tbWVudHNdID0gdXNlU3RhdGUoW10pO1xyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBhdXRoZW50aWNhdGVVc2VyKCk7XHJcbiAgICB9LCBbXSk7XHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmICghbGluaylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHNldENvbW1lbnRzKFtdKTtcclxuICAgICAgICBmZXRjaENvbW1lbnRzKCk7XHJcbiAgICB9LCBbbGlua10pO1xyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICAvLyBUaGlzIHdpbGwgcnVuIGVhY2ggdGltZSB3ZSBmZXRjaCBhbnkgY29tbWVudHMsIHdlIGNvdWxkIHByb2JhYmx5IG1ha2UgdGhpcyBydW4gb25jZSBhZnRlciB3ZSBrbm93IGFsbCBjb21tZW50cyBoYXZlIGJlZW4gZmV0Y2hlZFxyXG4gICAgICAgIC8vIGZldGNoQ3VycmVudFVzZXJMaWtlcygpXHJcbiAgICB9LCBbY29tbWVudHNdKTtcclxuICAgIGNvbnN0IGF1dGhlbnRpY2F0ZVVzZXIgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgLy8gY29uc3QgcmVzID0gYXdhaXQga3lcclxuICAgICAgICAvLyAgIC5wb3N0KFxyXG4gICAgICAgIC8vICAgICBgaHR0cHM6Ly9kaXNxdXMuY29tL2FwaS8zLjAvcG9zdHMvbGlzdC5qc29uP2FwaV9rZXk9JHthcGlLZXl9JmZvcnVtPSR7Zm9ydW19JnRocmVhZD1saW5rOiR7cm91dGVyLnF1ZXJ5Py5saW5rfWAsXHJcbiAgICAgICAgLy8gICApXHJcbiAgICAgICAgLy8gICAuanNvbigpXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZmV0Y2hDb21tZW50cyA9IGFzeW5jIChjdXJzb3IgPSAnJykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGt5XHJcbiAgICAgICAgICAgIC5nZXQoYCR7cHJveHl9aHR0cHM6Ly9kaXNxdXMuY29tL2FwaS8zLjAvcG9zdHMvbGlzdC5qc29uP2FwaV9rZXk9JHthcGlLZXl9JmZvcnVtPSR7Zm9ydW1OYW1lfSZ0aHJlYWQ9bGluazoke2xpbmt9JmxpbWl0PSR7bGltaXR9JmN1cnNvcj0ke2N1cnNvcn1gKVxyXG4gICAgICAgICAgICAuanNvbigpO1xyXG4gICAgICAgIHNldENvbW1lbnRzKChjb21tZW50cykgPT4gWy4uLmNvbW1lbnRzLCAuLi5yZXNbJ3Jlc3BvbnNlJ11dKTtcclxuICAgICAgICBpZiAocmVzWydyZXNwb25zZSddLmxlbmd0aCA9PT0gbGltaXQpXHJcbiAgICAgICAgICAgIGZldGNoQ29tbWVudHMocmVzWydjdXJzb3InXVsnbmV4dCddKTtcclxuICAgIH07XHJcbiAgICAvLyBjb25zdCBmZXRjaEN1cnJlbnRVc2VyTGlrZXMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICAvLyAgIGNvbnN0IHBvc3RzID0gY29tbWVudHNcclxuICAgIC8vICAgICAuZmlsdGVyKChjb21tZW50KSA9PiBjb21tZW50Lmxpa2VzID4gMCB8fCBjb21tZW50LmRpc2xpa2VzID4gMClcclxuICAgIC8vICAgICAubWFwKChjb21tZW50KSA9PiBgJnBvc3Q9JHtjb21tZW50LmlkfWApXHJcbiAgICAvLyAgICAgLmpvaW4oJycpXHJcbiAgICAvLyAgIGNvbnN0IHJlcyA9IGF3YWl0IGt5XHJcbiAgICAvLyAgICAgLmdldChgaHR0cHM6Ly9kaXNxdXMuY29tL2FwaS8zLjAvZW1iZWQvdGhyZWFkRGV0YWlscy5qc29uP2FwaV9rZXk9JHtrZXl9JnRocmVhZD04MTI2OTUxOTU5JHtwb3N0c31gLCB7XHJcbiAgICAvLyAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxyXG4gICAgLy8gICAgIH0pXHJcbiAgICAvLyAgICAgLmpzb24oKVxyXG4gICAgLy8gfVxyXG4gICAgcmV0dXJuICg8ZGl2IGNzcz17W25vcm1hbGl6ZSwgZ2xvYmFsXX0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbW1lbnQtY29udGFpbmVyXCI+XG4gICAgICAgIHtjb21tZW50c1xyXG4gICAgICAgIC5maWx0ZXIoKGNvbW1lbnQpID0+ICFjb21tZW50LnBhcmVudClcclxuICAgICAgICAubWFwKChjb21tZW50KSA9PiAoPENvbW1lbnQga2V5PXtjb21tZW50LmlkfSBjb21tZW50PXtjb21tZW50fSBhbGxDb21tZW50cz17Y29tbWVudHN9Lz4pKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2Pik7XHJcbn1cclxuIl19 */")
  }, core.jsx("div", {
    className: "comment-container"
  }, comments.filter(function (comment) {
    return !comment.parent;
  }).map(function (comment) {
    return core.jsx(Comment, {
      key: comment.id,
      comment: comment,
      allComments: comments
    });
  })));
}

module.exports = Forum;
