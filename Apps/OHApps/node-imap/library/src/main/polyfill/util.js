import _ohos$1 from '@ohos.util';
// import esAggregateError from 'es-aggregate-error';
import _ohos from '@ohos.process';
import _ohos$2 from '@ohos.hilog';
import buffer from './buffer';

/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// var AggregateError_1 = esAggregateError;

/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var primordials = {
  uncurryThis: (function () {
    const { apply, bind, call } = Function.prototype;
    return bind.bind(call);
  })(),

  JSONParse(self) {
    return JSON.parse(self);
  },

 

  /**
   * Math start
   */
  MathAbs(self) {
    return Math.abs(self);
  }, //typeof Math.abs
  MathAcos(self) {
    return Math.acos(self);
  }, // typeof Math.acos
  MathAcosh(self) {
    return Math.acosh(self);
  }, //typeof Math.acosh
  MathAsin(self) {
    return Math.asin(self);
  }, //typeof Math.asin
  MathAsinh(self) {
    return Math.asinh(self);
  }, //typeof Math.asinh
  MathAtan(self) {
    return Math.atan(self);
  }, //typeof Math.atan
  MathAtanh(self) {
    return Math.atanh(self);
  }, //typeof Math.atanh
  MathAtan2(self) {
    return Math.atan2(self);
  }, //typeof Math.atan2
  MathCeil(self) {
    return Math.ceil(self);
  }, //typeof Math.ceil
  MathCbrt(self) {
    return Math.cbrt(self);
  }, //typeof Math.cbrt
  MathExpm1(self) {
    return Math.expm1(self);
  }, //typeof Math.expm1
  MathClz32(self) {
    return Math.clz32(self);
  }, //typeof Math.clz32
  MathCos(self) {
    return Math.cos(self);
  }, //typeof Math.cos
  MathCosh(self) {
    return Math.cosh(self);
  }, //typeof Math.cosh
  MathExp(self) {
    return Math.exp(self);
  }, //typeof Math.exp

  MathFround(self) {
    return Math.fround(self);
  }, //typeof Math.fround
  MathHypot(self) {
    return Math.hypot(self);
  }, //typeof Math.hypot
  MathImul(self) {
    return Math.imul(self);
  }, //typeof Math.imul
  MathLog(self) {
    return Math.log(self);
  }, //typeof Math.log
  MathLog1p(self) {
    return Math.log(self);
  }, //typeof Math.log1p
  MathLog2(self) {
    return Math.log2(self);
  }, //typeof Math.log2
  MathLog10(self) {
    return Math.log10(self);
  }, //typeof Math.log10
  MathMax(...selfs) {
    return Math.max(...selfs);
  }, //typeof Math.max
  MathMaxApply(self) {
    return Math.max.apply(null, self);
  }, //StaticApply<typeof Math.max>
  MathMin(self) {
    return Math.min(self);
  }, //typeof Math.min
  MathPow(self) {
    return Math.pow(self);
  }, //typeof Math.pow
  MathRandom() {
    return Math.random();
  }, //typeof Math.random
  MathRound(self) {
    return Math.round(self);
  }, //typeof Math.round
  MathSign(self) {
    return Math.sign(self);
  }, //typeof Math.sign
  MathSin(self) {
    return Math.sin(self);
  }, //typeof Math.sin
  MathSinh(self) {
    return Math.sinh(self);
  }, //typeof Math.sinh
  MathSqrt(self) {
    return Math.sqrt(self);
  }, //typeof Math.sqrt
  MathTan(self) {
    return Math.tan(self);
  }, //typeof Math.tan
  MathTanh(self) {
    return Math.tanh(self);
  }, //typeof Math.tanh
  MathTrunc(self) {
    return Math.trunc(self);
  }, //typeof Math.trunc
  MathE() {
    return Math.E;
  }, //typeof Math.E
  MathLN10() {
    return Math.LN10;
  }, //typeof Math.LN10
  MathLN2() {
    return Math.LN2;
  }, //typeof Math.LN2
  MathLOG10E() {
    return Math.LOG10E;
  }, //typeof Math.LOG10E
  MathLOG2E() {
    return Math.LOG2E;
  }, //typeof Math.LOG2E
  MathPI() {
    return Math.PI;
  }, //typeof Math.PI
  MathSQRT1_2() {
    return Math.SQRT1_2;
  }, //typeof Math.SQRT1_2
  MathSQRT2() {
    return Math.SQRT2;
  }, //typeof Math.SQRT2

  /**
   * Math end
   */

  /**
   * Reflect start
   */
  ReflectDefineProperty: Reflect.defineProperty, //typeof Reflect.defineProperty
  ReflectDeleteProperty: Reflect.deleteProperty, // typeof Reflect.deleteProperty
  ReflectApply: Reflect.apply,
  ReflectConstruct: Reflect.construct, // typeof Reflect.construct
  ReflectGet: Reflect.get, // typeof Reflect.get
  ReflectGetOwnPropertyDescriptor: Reflect.getOwnPropertyDescriptor, // typeof Reflect.getOwnPropertyDescriptor
  ReflectGetPrototypeOf: Reflect.getPrototypeOf, // typeof Reflect.getPrototypeOf
  ReflectHas: Reflect.has, // typeof Reflect.has
  ReflectIsExtensible: Reflect.isExtensible, // typeof Reflect.isExtensible
  ReflectOwnKeys: Reflect.ownKeys, // typeof Reflect.ownKeys
  ReflectPreventExtensions: Reflect.preventExtensions, // typeof Reflect.preventExtensions
  ReflectSet: Reflect.set, //typeof Reflect.set
  ReflectSetPrototypeOf: Reflect.setPrototypeOf, // typeof Reflect.setPrototypeOf
  /**
   * Reflect end
   */

  // AggregateError: AggregateError_1,

  /**
   * Array start
   */
  ArrayFrom(self, fn) {
    return Array.from(self, fn);
  },

  ArrayIsArray(self) {
    return Array.isArray(self);
  },

  ArrayPrototypeIncludes(self, el) {
    return self.includes(el);
  },

  ArrayPrototypeFilter(self, fn) {
    return self.filter(fn);
  },

  ArrayPrototypeIndexOf(self, el) {
    return self.indexOf(el);
  },

  ArrayPrototypeJoin(self, sep) {
    return self.join(sep);
  },

  ArrayPrototypeMap(self, fn) {
    return self.map(fn);
  },

  ArrayPrototypePop(self, el) {
    return self.pop(el);
  },

  ArrayPrototypePush(self, el) {
    return self.push(el);
  },

  ArrayPrototypeSlice(self, start, end) {
    return self.slice(start, end);
  },

  ArrayPrototypeSplice(self, start, end, ...args) {
    return self.splice(start, end, ...args);
  },

  ArrayPrototypeUnshift(self, value) {
    return self.unshift(value);
  },

  /**
   * Array end
   */

  /**
   * Map start
   */

  MapPrototypeGet: Map.prototype.get,
  /**
   * Map end
   */
  /**
   * Error start
   */
  Error,
  ErrorCaptureStackTrace: Error.captureStackTrace,
  ErrorPrototypeToString: Error.prototype.toString,
  RangeError,
  /**
   * Error end
   */

  /**
   * JSON start
   */
  JSONStringify: JSON.stringify,

  /**
   * JSON end
   */
  FunctionPrototypeCall(fn, thisArgs, ...args) {
    return fn.call(thisArgs, ...args);
  },

  FunctionPrototypeBind(fn, thisArgs, ...args) {
    return fn.bind(thisArgs, ...args);
  },

  FunctionPrototypeSymbolHasInstance(self, instance) {
    return Function.prototype[Symbol.hasInstance].call(self, instance);
  },

  MathFloor: Math.floor,
  Number,
  NumberIsInteger: Number.isInteger,
  NumberIsNaN: Number.isNaN,
  NumberMAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER,
  NumberMIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER,
  NumberParseInt: Number.parseInt,
  NumberIsFinite: Number.isFinite,

  NumberPrototypeToString(value, radix) {
    return value.toString(radix);
  },

  /**
   * Object start
   */

  ObjectPrototypeHasOwnProperty(self, name) {
    return Object.prototype.hasOwnProperty.call(self, name);
  },

  ObjectAssign: Object.assign,

  ObjectDefineProperties(self, props) {
    return Object.defineProperties(self, props);
  },

  ObjectDefineProperty(self, name, prop) {
    return Object.defineProperty(self, name, prop);
  },

  ObjectGetOwnPropertyDescriptor(self, name) {
    return Object.getOwnPropertyDescriptor(self, name);
  },

  ObjectKeys(obj) {
    return Object.keys(obj);
  },

  ObjectCreate(obj) {
    return Object.create(obj);
  },

  ObjectFreeze(obj) {
    return Object.freeze(obj);
  },

  ObjectEntries(obj) {
    return Object.entries(obj);
  },

  ObjectSetPrototypeOf(target, proto) {
    return Object.setPrototypeOf(target, proto);
  },

  ObjectPrototypeToString(obj) {
    return obj.toString();
  },

  ObjectPrototypePropertyIsEnumerable(self, val) {
    return self.propertyIsEnumerable(val);
  },

  ObjectIsExtensible: Object.isExtensible,

  /**
   * Object end
   */
  Promise,

  PromisePrototypeCatch(self, fn) {
    return self.catch(fn);
  },

  PromisePrototypeThen(self, thenFn, catchFn) {
    return self.then(thenFn, catchFn);
  },

  PromiseReject(err) {
    return Promise.reject(err);
  },

  RegExpPrototypeTest(self, value) {
    return self.test(value);
  },

  SafeSet: Set,
  String,

  StringPrototypeSlice(self, start, end) {
    return self.slice(start, end);
  },

  StringPrototypeToLowerCase(self) {
    return self.toLowerCase();
  },

  StringPrototypeToUpperCase(self) {
    return self.toUpperCase();
  },

  StringPrototypeTrim(self) {
    return self.trim();
  },

  StringPrototypeCharCodeAt(value, index) {
    return value.charCodeAt(index);
  },

  StringPrototypeLastIndexOf(value, separator) {
    return value.lastIndexOf(separator);
  },

  StringPrototypeCharAt(value, index) {
    return value.charAt(index);
  },

  StringPrototypeIndexOf(value, index) {
    return value.indexOf(index);
  },

  StringPrototypeStartsWith(value, index) {
    return value.startsWith(index);
  },

  StringPrototypeIncludes(self, value, start) {
    return self.includes(value, start);
  },

  StringPrototypePadStart(self, targetLength, padString) {
    return self.padStart(targetLength, padString);
  },

  StringPrototypeReplace(self, searchValue, replaceValue) {
    return self.replace(searchValue, replaceValue);
  },

  DatePrototypeGetDate(date) {
    return date.getDate();
  },

  DatePrototypeGetHours(date) {
    return date.getHours();
  },

  DatePrototypeGetMinutes(date) {
    return date.getMinutes();
  },

  DatePrototypeGetMonth(date) {
    return date.getMonth();
  },

  DatePrototypeGetSeconds(date) {
    return date.getSeconds();
  },

  Symbol,
  SymbolAsyncIterator: Symbol.asyncIterator,
  SymbolHasInstance: Symbol.hasInstance,
  SymbolIterator: Symbol.iterator,

  TypedArrayPrototypeSet(self, buf, len) {
    return self.set(buf, len);
  },

  decodeURIComponent,

  Uint8Array,
  Int8Array,
  Array,
  Date,

};

const nodeInternalPrefix = "__node_internal_";
const {
  ObjectDefineProperty: ObjectDefineProperty$2,
  ArrayIsArray: ArrayIsArray$1,
  ArrayPrototypeIncludes,
  NumberIsNaN,
} = primordials;
const hideStackFrames = (fn) => {
  // We rename the functions that will be hidden to cut off the stacktrace
  // at the outermost one
  const hidden = nodeInternalPrefix + fn.name;
  ObjectDefineProperty$2(fn, "name", { __proto__: null, value: hidden });
  return fn;
};
var validateString$1 = hideStackFrames((value, name) => {
  if (typeof value !== "string") {
    throw new Error("ERR_INVALID_ARG_TYPE value:" + value + " name:" + name);
  }
});
var validateFunction = hideStackFrames((value, name) => {
  if (typeof value !== "function")
    throw new Error("ERR_INVALID_ARG_TYPE value:" + value + " name:" + name);
});
var validateAbortSignal = hideStackFrames((signal, name) => {
  if (
    signal !== undefined &&
    (signal === null || typeof signal !== "object" || !("aborted" in signal))
  ) {
    throw new Error("ERR_INVALID_ARG_TYPE value:" + value + " name:" + name);
  }
});

var validateObject = hideStackFrames((value, name, options) => {
  const useDefaultOptions = options == null;
  const allowArray = useDefaultOptions ? false : options.allowArray;
  const allowFunction = useDefaultOptions ? false : options.allowFunction;
  const nullable = useDefaultOptions ? false : options.nullable;
  if (
    (!nullable && value === null) ||
    (!allowArray && ArrayIsArray$1(value)) ||
    (typeof value !== "object" &&
      (!allowFunction || typeof value !== "function"))
  ) {
    throw new Error("ERR_INVALID_ARG_TYPE value:" + value + " name:" + name);
  }
});

var validateNumber = function validateNumber(
  value,
  name,
  min = undefined,
  max
) {
  if (typeof value !== "number")
    throw new Error("ERR_INVALID_ARG_TYPE value:" + value + " name:" + name);

  if (
    (min != null && value < min) ||
    (max != null && value > max) ||
    ((min != null || max != null) && NumberIsNaN(value))
  ) {
    throw new Error(
      "ERR_OUT_OF_RANGE, name:" +
        name +
        ", " +
        `${min != null ? `>= ${min}` : ""}${
          min != null && max != null ? " && " : ""
        }${max != null ? `<= ${max}` : ""}` +
        value
    );
  }
};

var validateBoolean = function validateBoolean(value, name) {
  if (typeof value !== "boolean")
    throw new Error("ERR_INVALID_ARG_TYPE value:" + value + " name:" + name);
};

var validateArray = hideStackFrames((value, name, minLength = 0) => {
  if (!Array.isArray(value)) {
    throw new Error("Array:" + name);
  }
  if (value.length < minLength) {
    const reason = `must be longer than ${minLength}`;
    throw new Error(
      "ERR_INVALID_ARG_VALUE name:" +
        name +
        ",value:" +
        value +
        ",reason:" +
        reason
    );
  }
});

var validateUnion = function validateUnion(value, name, union) {
  if (!ArrayPrototypeIncludes(union, value)) {
    throw new Error(
      "ERR_INVALID_ARG_TYPE, name:" +
        name +
        ",union:" +
        union +
        ",value:" +
        value
    );
  }
};

var validator = {
	validateString: validateString$1,
	validateFunction: validateFunction,
	validateAbortSignal: validateAbortSignal,
	validateObject: validateObject,
	validateNumber: validateNumber,
	validateBoolean: validateBoolean,
	validateArray: validateArray,
	validateUnion: validateUnion
};

const {
  ObjectCreate,
  ObjectDefineProperty: ObjectDefineProperty$1,
  StringPrototypeToUpperCase,
  ArrayPrototypeSlice,
} = primordials;

let debugImpls = ObjectCreate(null);

const noop = () => {};

function debuglogImpl(enabled, set) {
  if (debugImpls[set] === undefined) {
    if (enabled) {
      const pid = _ohos.pid;
      debugImpls[set] = function debug(format, ...args) {
        var msg = _ohos$1.printf(format, ...args);
        _ohos$2.debug(
          pid,
          set,
          "%{public}s %{public}s: %{public}s",
          set,
          pid,
          msg
        );
      };
    } else {
      debugImpls[set] = noop;
    }
  }
  return debugImpls[set];
}

function debuglog$1(set, cb) {
  function init() {
    set = StringPrototypeToUpperCase(set);
    enabled = true;
  }

  let debug = (...args) => {
    init();
    debug = debuglogImpl(enabled, set);
    if (typeof cb === "function") {
      cb(debug);
    }
    switch (args.length) {
      case 1:
        return debug(args[0]);
      case 2:
        return debug(args[0], args[1]);
      default:
        return debug(args[0], ...ArrayPrototypeSlice(args, 1));
    }
  };
  let enabled;
  let test = () => {
    init();
    test = () => enabled;
    return enabled;
  };
  const logger = (...args) => {
    switch (args.length) {
      case 1:
        return debug(args[0]);
      case 2:
        return debug(args[0], args[1]);
      default:
        return debug(args[0], ...ArrayPrototypeSlice(args, 1));
    }
  };
  ObjectDefineProperty$1(logger, "enabled", {
    __proto__: null,
    get() {
      return test();
    },
    configurable: true,
    enumerable: true,
  });
  return logger;
}

var debuglog_1$1 = {
  debuglog: debuglog$1,
};

var pSlice = Array.prototype.slice;
var Object_keys = typeof Object.keys === 'function'
    ? Object.keys
    : function (obj) {
        var keys = [];
        for (var key in obj) keys.push(key);
        return keys;
    }
;

function deepEqual(actual, expected) {
    if (actual === 0 && expected === 0) {
        return areZerosEqual(actual, expected);
    } else if (actual === expected) {
        return true;
    } else if (actual instanceof Date && expected instanceof Date) {
        try{
            return actual.getTime() === expected.getTime();
        } catch (e) {
            return false;
        }
    } else if (isNumberNaN(actual)) {
        return isNumberNaN(expected);
    } else if (typeof actual != 'object' && typeof expected != 'object') {
        return actual === expected;
    } else if (isBoxedPrimitive(actual) || isBoxedPrimitive(expected)) {
        return isEqualBoxedPrimitive(actual, expected);
    } else {
        return objEquiv(actual, expected);
    }
}
function isUndefinedOrNull(value) {
    return value === null || value === undefined;
}

function isArgumentsObject(object) {
    return Object.prototype.toString.call(object) == '[object Arguments]';
}

function isNumberObject(object) {
    return Object.prototype.toString.call(object) == '[object Number]';
}

function isStringObject(object) {
    return Object.prototype.toString.call(object) == '[object String]';
}

function isBooleanObject(object) {
    return Object.prototype.toString.call(object) == '[object Boolean]';
}

function isBigIntObject(object) {
    return Object.prototype.toString.call(object) == '[object BigInt]';
}

function isSymbolObject(object) {
    return Object.prototype.toString.call(object) == '[object Symbol]';
}

function isBoxedPrimitive(object) {
    return object === null ||
    typeof object === 'boolean' ||
    typeof object === 'number' ||
    typeof object === 'string' ||
    typeof object === 'symbol' ||  // ES6 symbol
    typeof object === 'undefined';
}


function isEqualBoxedPrimitive(val1, val2) {
    if (!isBoxedPrimitive(val1) || !isBoxedPrimitive(val2)) {
        return false;
    }

    if (isNumberObject(val1)) {
        return isNumberObject(val2) && ObjectIs(val1.valueOf(), val2.valueOf());
    }
    if (isStringObject(val1)) {
        return isStringObject(val2) && val1.valueOf() === val2.valueOf();
    }
    if (isBooleanObject(val1)) {
        return isBooleanObject(val2) && val1.valueOf() === val2.valueOf();
    }
    if (isBigIntObject(val1)) {
        return isBigIntObject(val2) && val1.valueOf() === val2.valueOf();
    }
    if (isSymbolObject(val1)) {
        return isSymbolObject(val2) && Object(val1).toString() === Object(val2).toString();
    }
    return objEquiv(val1, val2);
}

function ObjectIs(x, y) {
    if (x === y) {
        // 针对+0 不等于 -0的情况
        return x !== 0 || 1 / x === 1 / y;
    } else {
        // 针对NaN的情况
        return x !== x && y !== y;
    }
}

function isNumberNaN(value) {
    // NaN === NaN -> false
    return typeof value == 'number' && value !== value;
}

function areZerosEqual(zeroA, zeroB) {
    // (1 / +0|0) -> Infinity, but (1 / -0) -> -Infinity and (Infinity !== -Infinity)
    return (1 / zeroA) === (1 / zeroB);
}

function objEquiv(a, b) {
    if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;

    if (a.prototype !== b.prototype) return false;
    if (isArgumentsObject(a)) {
        if (!isArgumentsObject(b)) {
            return false;
        }
        a = pSlice.call(a);
        b = pSlice.call(b);
        return deepEqual(a, b);
    }

    try {
        var ka = Object_keys(a),
            kb = Object_keys(b),
            key, i;
    } catch (e) {
        return false;
    }

    if (ka.length != kb.length)
    return false;

    ka.sort();
    kb.sort();

    for (i = ka.length - 1; i >= 0; i--) {
        if (ka[i] != kb[i])
        return false;
    }

    for (i = ka.length - 1; i >= 0; i--) {
        key = ka[i];
        if (!deepEqual(a[key], b[key])) return false;
    }

    return true;
}

var comparisons = {
    isDeepStrictEqual: deepEqual
};

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



const {
  ArrayIsArray,
  ArrayPrototypeJoin,
  Date: Date$1,
  DatePrototypeGetDate,
  DatePrototypeGetHours,
  DatePrototypeGetMinutes,
  DatePrototypeGetMonth,
  DatePrototypeGetSeconds,
  Error: Error$1,
  ObjectDefineProperty,
  ObjectKeys,
  ObjectPrototypeToString,
  ObjectSetPrototypeOf,
  StringPrototypePadStart,
} = primordials;

const { validateString } = validator;

const { debuglog } = debuglog_1$1;
const { isDeepStrictEqual } = comparisons;
const { isBuffer } = buffer.Buffer;

/**
 * @param {any} arg
 * @returns {arg is boolean}
 */
function isBoolean(arg) {
  return typeof arg === "boolean";
}

/**
 * @param {any} arg
 * @returns {arg is null}
 */
function isNull(arg) {
  return arg === null;
}

/**
 * @param {any} arg
 * @returns {arg is (null | undefined)}
 */
function isNullOrUndefined(arg) {
  return arg === null || arg === undefined;
}

/**
 * @param {any} arg
 * @returns {arg is number}
 */
function isNumber(arg) {
  return typeof arg === "number";
}

/**
 * @param {any} arg
 * @returns {arg is string}
 */
function isString(arg) {
  return typeof arg === "string";
}

/**
 * @param {any} arg
 * @returns {arg is symbol}
 */
function isSymbol(arg) {
  return typeof arg === "symbol";
}

/**
 * @param {any} arg
 * @returns {arg is undefined}
 */
function isUndefined(arg) {
  return arg === undefined;
}

/**
 * @param {any} arg
 * @returns {a is NonNullable<object>}
 */
function isObject(arg) {
  return arg !== null && typeof arg === "object";
}

/**
 * @param {any} e
 * @returns {arg is Error}
 */
function isError(e) {
  return ObjectPrototypeToString(e) === "[object Error]" || e instanceof Error$1;
}

/**
 * @param {any} arg
 * @returns {arg is Function}
 */
function isFunction(arg) {
  return typeof arg === "function";
}

/**
 * @param {any} arg
 * @returns {arg is (boolean | null | number | string | symbol | undefined)}
 */
function isPrimitive(arg) {
  return arg === null || (typeof arg !== "object" && typeof arg !== "function");
}

/**
 * @param {number} n
 * @returns {string}
 */
function pad(n) {
  return StringPrototypePadStart(n.toString(), 2, "0");
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * @returns {string}  26 Feb 16:19:34
 */
function timestamp() {
  const d = new Date$1();
  const t = ArrayPrototypeJoin(
    [
      pad(DatePrototypeGetHours(d)),
      pad(DatePrototypeGetMinutes(d)),
      pad(DatePrototypeGetSeconds(d)),
    ],
    ":"
  );
  return `${DatePrototypeGetDate(d)} ${months[DatePrototypeGetMonth(d)]} ${t}`;
}

/**
 * Log is just a thin wrapper to console.log that prepends a timestamp
 * @type {(...args: any[]) => void}
 */
function log(...args) {
  console.log("%s - %s", timestamp(), ...args);
}

/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {Function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {Function} superCtor Constructor function to inherit prototype from.
 * @throws {TypeError} Will error if either constructor is null, or if
 *     the super constructor lacks a prototype.
 */
function inherits(ctor, superCtor) {
  if (ctor === undefined || ctor === null)
    throw new Error$1("ERR_INVALID_ARG_TYPE, ctor:" + ctor);

  if (superCtor === undefined || superCtor === null)
    throw new Error$1("ERR_INVALID_ARG_TYPE, superCtor:" + superCtor);

  if (superCtor.prototype === undefined) {
    throw new Error$1(
      "ERR_INVALID_ARG_TYPE, superCtor.prototype:" + superCtor.prototype
    );
  }
  ObjectDefineProperty(ctor, "super_", {
    __proto__: null,
    value: superCtor,
    writable: true,
    configurable: true,
  });
  ObjectSetPrototypeOf(ctor.prototype, superCtor.prototype);
}

/**
 * @template T
 * @template S
 * @param {T} target
 * @param {S} source
 * @returns {S extends null ? T : (T & S)}
 */
function _extend(target, source) {
  // Don't do anything if source isn't an object
  if (source === null || typeof source !== "object") return target;

  const keys = ObjectKeys(source);
  let i = keys.length;
  while (i--) {
    target[keys[i]] = source[keys[i]];
  }
  return target;
}

function isRegExp(value) {
  return new _ohos$1.types().isRegExp(value);
}

function isDate(value) {
  return new _ohos$1.types().isDate(value);
}

function types() {
  return new _ohos$1.types();
}

const ansiPattern =
  "[\\u001B\\u009B][[\\]()#;?]*" +
  "(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*" +
  "|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)" +
  "|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))";
const ansi = new RegExp(ansiPattern, "g");

/**
 * Remove all VT control characters. Use to estimate displayed string width.
 */
function stripVTControlCharacters(str) {
  validateString(str, "str");

  return str.replace(ansi, "");
}

const {
  printf,
  getErrorString,
  callbackWrapper,
  promiseWrapper,
  TextDecoder,
  TextEncoder,
} = _ohos$1;

var default_1 = {
  _extend,
  callbackify: callbackWrapper,
  debug: debuglog,
  debuglog,
  format: printf,
  getSystemErrorName: getErrorString,
  inherits,
  isArray: ArrayIsArray,
  isBoolean,
  isBuffer,
  isDeepStrictEqual,
  isNull,
  isNullOrUndefined,
  isNumber,
  isString,
  isSymbol,
  isUndefined,
  isRegExp,
  isObject,
  isDate,
  isError,
  isFunction,
  isPrimitive,
  log,
  promisify: promiseWrapper,
  stripVTControlCharacters,
  TextDecoder,
  TextEncoder,
  types: types(),
  inspect: function () {},
};

var _extend_1 = _extend;
var callbackify = callbackWrapper;
var debug = debuglog;
var debuglog_1 = debuglog;
var format = printf;
var getSystemErrorName = getErrorString;
var inherits_1 = inherits;
var isArray = ArrayIsArray;
var isBoolean_1 = isBoolean;
var isBuffer_1 = isBuffer;
var isDeepStrictEqual_1 = isDeepStrictEqual;
var isNull_1 = isNull;
var isNullOrUndefined_1 = isNullOrUndefined;
var isNumber_1 = isNumber;
var isString_1 = isString;
var isSymbol_1 = isSymbol;
var isUndefined_1 = isUndefined;
var isRegExp_1 = isRegExp;
var isObject_1 = isObject;
var isDate_1 = isDate;
var isError_1 = isError;
var isFunction_1 = isFunction;
var isPrimitive_1 = isPrimitive;
var log_1 = log;
var promisify = promiseWrapper;
var stripVTControlCharacters_1 = stripVTControlCharacters;
var TextDecoder_1 = TextDecoder;
var TextEncoder_1 = TextEncoder;
var types_1 = types();
var inspect = function () {};

var util_1 = {
	default: default_1,
	_extend: _extend_1,
	callbackify: callbackify,
	debug: debug,
	debuglog: debuglog_1,
	format: format,
	getSystemErrorName: getSystemErrorName,
	inherits: inherits_1,
	isArray: isArray,
	isBoolean: isBoolean_1,
	isBuffer: isBuffer_1,
	isDeepStrictEqual: isDeepStrictEqual_1,
	isNull: isNull_1,
	isNullOrUndefined: isNullOrUndefined_1,
	isNumber: isNumber_1,
	isString: isString_1,
	isSymbol: isSymbol_1,
	isUndefined: isUndefined_1,
	isRegExp: isRegExp_1,
	isObject: isObject_1,
	isDate: isDate_1,
	isError: isError_1,
	isFunction: isFunction_1,
	isPrimitive: isPrimitive_1,
	log: log_1,
	promisify: promisify,
	stripVTControlCharacters: stripVTControlCharacters_1,
	TextDecoder: TextDecoder_1,
	TextEncoder: TextEncoder_1,
	types: types_1,
	inspect: inspect
};

export { TextDecoder_1 as TextDecoder, TextEncoder_1 as TextEncoder, _extend_1 as _extend, callbackify, debug, debuglog_1 as debuglog, util_1 as default, format, getSystemErrorName, inherits_1 as inherits, inspect, isArray, isBoolean_1 as isBoolean, isBuffer_1 as isBuffer, isDate_1 as isDate, isDeepStrictEqual_1 as isDeepStrictEqual, isError_1 as isError, isFunction_1 as isFunction, isNull_1 as isNull, isNullOrUndefined_1 as isNullOrUndefined, isNumber_1 as isNumber, isObject_1 as isObject, isPrimitive_1 as isPrimitive, isRegExp_1 as isRegExp, isString_1 as isString, isSymbol_1 as isSymbol, isUndefined_1 as isUndefined, log_1 as log, promisify, stripVTControlCharacters_1 as stripVTControlCharacters, types_1 as types };
