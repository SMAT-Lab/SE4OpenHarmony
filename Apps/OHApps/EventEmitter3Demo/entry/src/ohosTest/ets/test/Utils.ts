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

import EventEmitter from 'eventemitter3';

export default class Utils {
  /**
   *
   * 返回对相应的数据类型
   */
  public static getType(data) {
    return Object.prototype.toString.call(data)
      .substring(8)
      .split(/]/)[0]
  }

  /**
   *
   * @param {*} sourceObj
   * @param {*} compareObj
   *
   * 比较对象深度是否相等
   *
   */
  public static comparisonObject(sourceObj, compareObj) {
    if (arguments.length < 2) throw "Incorrect number of parameters";
    let sourceType = Utils.getType(sourceObj);
    if (sourceType !== Utils.getType(compareObj)) return false;
    // Not objects and arrays
    if (sourceType !== "Array" && sourceType !== "Object" && sourceType !== "Set" && sourceType !== "Map") {
      if (sourceType === "Number" && sourceObj.toString() === "NaN") {
        return compareObj.toString() === "NaN"
      }
      if (sourceType === "Date" || sourceType === "RegExp") {
        return sourceObj.toString() === compareObj.toString()
      }
      return sourceObj === compareObj
    } else if (sourceType === "Array") {
      if (sourceObj.length !== compareObj.length) return false;
      if (sourceObj.length === 0) return true;
      for (let i = 0; i < sourceObj.length; i++) {
        if (!Utils.comparisonObject(sourceObj[i], compareObj[i])) return false;
      }
    } else if (sourceType === "Object") {
      let sourceKeyList = Reflect.ownKeys(sourceObj);
      let compareKeyList = Reflect.ownKeys(compareObj);
      let key;
      if (sourceKeyList.length !== compareKeyList.length) return false;
      for (let i = 0; i < sourceKeyList.length; i++) {
        key = sourceKeyList[i];
        if (key !== compareKeyList[i]) return false;
        if (!Utils.comparisonObject(sourceObj[key], compareObj[key])) return false;
      }
    } else if (sourceType === "Set" || sourceType === "Map") {
      // 把 Set Map 转为 Array
      if (!Utils.comparisonObject(Array.from(sourceObj), Array.from(compareObj))) return false;
    }
    return true;
  }


  public static call(thisFunc: Function, thisArg: object): void {
    thisFunc.call(thisArg);
  }

  public static exposesNamespace(expect: Function): void {
    expect(EventEmitter.EventEmitter).assertEqual(EventEmitter);
  }

  public static emitsContext(emitter: EventEmitter<string, Object>, context: Object, expect: Function, done: Function): void {
    emitter.on('foo', function (bar: string) {
      expect(bar).assertEqual('bar')
      expect(JSON.stringify(this)).assertEqual(JSON.stringify(context));
      done();
    }, context).emit('foo', 'bar');
  }

  public static emitsContextArguments(emitter: EventEmitter<string, Object>, context: Object, expect: Function, done: Function): void {
    emitter.on('foo', function (bar: string) {
      expect(bar).assertEqual('bar')
      expect(JSON.stringify(this)).assertEqual(JSON.stringify(context));
      done();
    }, context).emit('foo', 'bar', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0);
  }

  public static emitsFunctionArguments(emitter: EventEmitter<string, Object>, args: string[], expect: Function): void {
    emitter.once('args', function () {
      expect(arguments.length).assertEqual(args.length)
    });

    emitter.emit.apply(emitter, ['args'].concat(args));
  }

  public static emitsFunctionArgumentsListeners(emitter: EventEmitter<string, Object>, args: string[], expect: Function): void {
    emitter.once('args', function () {
      expect(arguments.length).assertEqual(args.length)
    });

    emitter.once('args', function () {
      expect(arguments.length).assertEqual(args.length)
    });

    emitter.once('args', function () {
      expect(arguments.length).assertEqual(args.length)
    });

    emitter.once('args', function () {
      expect(arguments.length).assertEqual(args.length)
    });

    emitter.emit.apply(emitter, ['args'].concat(args));
  }

  public static emitsContextListeners(emitter: EventEmitter<string, Object>, expect: Function): void {
    emitter.on('foo', function (bar: string) {
      let result = Utils.comparisonObject(this, {
        foo: 'bar'
      })
      expect(result).assertTrue()
      expect(bar).assertEqual('bar')
    }, {
      foo: 'bar'
    });

    emitter.on('foo', function (bar: string) {
      let result = Utils.comparisonObject(this, {
        bar: 'baz'
      })
      expect(result).assertTrue()
      expect(bar).assertEqual('bar')
    }, {
      bar: 'baz'
    });
  }

  public static emitsDifferentContext(expect: Function): void {
    let emitter = new EventEmitter<string, Object>()
      , pattern: string = '';

    function writerFunc() {
      pattern += this;
    }

    emitter.on('write', writerFunc, 'foo');
    emitter.on('write', writerFunc, 'baz');
    emitter.once('write', writerFunc, 'bar');
    emitter.once('write', writerFunc, 'banana');

    emitter.emit('write');
    expect(pattern).assertEqual('foobazbarbanana')
  }

  public static receivesEmitsEvents(expect: Function, done: Function): void {
    let e = new EventEmitter<string, Object>();

    e.on('data', function (a: string, b: EventEmitter<string, Object>, c: Date, d: Object, undef: undefined) {
      expect(a).assertEqual('foo')
      expect(b).assertEqual(e)
      expect(c instanceof Date).assertTrue()
      expect(undef).assertEqual(undefined)
      expect(arguments.length).assertEqual(3)

      done();
    });

    e.emit('data', 'foo', e, new Date());
  }

  public static returnsListenersCount(expect: Function): void {
    let e = new EventEmitter<string, Object>();
    // @ts-ignore
    expect(e.listenerCount()).assertEqual(0)
    expect(e.listenerCount('foo')).assertEqual(0)

    e.on('foo', () => {
    });
    expect(e.listenerCount('foo')).assertEqual(1)
    e.on('foo', () => {
    });
    expect(e.listenerCount('foo')).assertEqual(2)
  }

  public static throwError(expect: Function): void {
    let e = new EventEmitter<string, string>();

    try {
      // @ts-ignore
      e.on('foo', 'bar');
    } catch (exError) {
      let ex: Error = exError as Error;
      expect(ex instanceof TypeError).assertTrue()
      expect(ex.message).assertEqual('The listener must be a function')
      return;
    }

    throw new Error('oops');
  }

  public static emitsOnce(emitter: EventEmitter<string, Object>, context: Object, expect: Function, done: Function): void {
    emitter.once('foo', function (bar) {
      expect(this).assertEqual(context)
      expect(bar).assertEqual('bar')

      done();
    }, context).emit('foo', 'bar');
  }

  public static removesMatchListeners(expect: Function) {
    let e = new EventEmitter<string, Object>();

    let foo: () => void = () => {
    }

    let bar: () => void = () => {
    }

    let baz: () => void = () => {
    }

    e.on('foo', foo);
    e.on('bar', bar);
    e.on('bar', baz);
    expect(e.removeListener('foo', bar)).assertEqual(e)
    let result0 = Utils.comparisonObject(e.listeners('bar'), [bar, baz])
    expect(result0).assertTrue();

    let result1 = Utils.comparisonObject(e.listeners('foo'), [foo])
    expect(result1).assertTrue();
    // @ts-ignore
    expect(e._eventsCount).assertEqual(2)

    expect(e.removeListener('foo', foo)).assertEqual(e)
    let result2 = Utils.comparisonObject(e.listeners('bar'), [bar, baz])
    expect(result2).assertTrue();

    let result3 = Utils.comparisonObject(e.listeners('foo'), [])
    expect(result3).assertTrue();
    // @ts-ignore
    expect(e._eventsCount).assertEqual(1)

    expect(e.removeListener('bar', bar)).assertEqual(e)
    let result4 = Utils.comparisonObject(e.listeners('bar'), [baz])
    expect(result4).assertTrue();
    // @ts-ignore
    expect(e._eventsCount).assertEqual(1)

    expect(e.removeListener('bar', baz)).assertEqual(e)
    let result5 = Utils.comparisonObject(e.listeners('bar'), [])
    expect(result5).assertTrue();
    // @ts-ignore
    expect(e._eventsCount).assertEqual(0)

    e.on('foo', foo);
    e.on('foo', foo);
    e.on('bar', bar);

    expect(e.removeListener('foo', foo)).assertEqual(e)
    let result6 = Utils.comparisonObject(e.listeners('bar'), [bar])
    expect(result6).assertTrue();

    let result7 = Utils.comparisonObject(e.listeners('foo'), [])
    expect(result7).assertTrue();
    // @ts-ignore
    expect(e._eventsCount).assertEqual(1)
  }

  public static removesOnceListener(expect: Function): void {
    let e = new EventEmitter<string, Object>();

    let foo: () => void = () => {
    }

    e.on('foo', foo);
    expect(e.removeListener('foo', () => {
    }, undefined, true)).assertEqual(e)
    let result0 = Utils.comparisonObject(e.listeners('foo'), [foo])
    expect(result0).assertTrue();
    // @ts-ignore
    expect(e._eventsCount).assertEqual(1)

    expect(e.removeListener('foo', foo, undefined, true)).assertEqual(e)
    let result1 = Utils.comparisonObject(e.listeners('foo'), [foo])
    expect(result1).assertTrue();
    // @ts-ignore
    expect(e._eventsCount).assertEqual(1)

    expect(e.removeListener('foo', foo)).assertEqual(e)
    let result2 = Utils.comparisonObject(e.listeners('foo'), [])
    expect(result2).assertTrue();
    // @ts-ignore
    expect(e._eventsCount).assertEqual(0)

    e.once('foo', foo);
    e.on('foo', foo);

    expect(e.removeListener('foo', () => {
    }, undefined, true)).assertEqual(e)
    let result3 = Utils.comparisonObject(e.listeners('foo'), [foo, foo])
    expect(result3).assertTrue();

    // @ts-ignore
    expect(e._eventsCount).assertEqual(1)

    expect(e.removeListener('foo', foo, undefined, true)).assertEqual(e)
    let result4 = Utils.comparisonObject(e.listeners('foo'), [foo])
    expect(result4).assertTrue();
    // @ts-ignore
    expect(e._eventsCount).assertEqual(1)

    e.once('foo', foo);

    expect(e.removeListener('foo', foo)).assertEqual(e)
    let result5 = Utils.comparisonObject(e.listeners('foo'), [])
    expect(result5).assertTrue();
    // @ts-ignore
    expect(e._eventsCount).assertEqual(0)
  }

  public static removesMatchContext(expect: Function): void {

    class ContextClass {
      foo: string = '';
    }

    let context: ContextClass = {
      foo: 'bar'
    }
      , e = new EventEmitter<string, Object>();

    let foo: () => void = () => {
    }

    let bar: () => void = () => {
    }

    e.on('foo', foo, context);
    expect(e.removeListener('foo', () => {
    }, context)).assertEqual(e)
    let result0 = Utils.comparisonObject(e.listeners('foo'), [foo])
    expect(result0).assertTrue();
    // @ts-ignore
    expect(e._eventsCount).assertEqual(1)

    expect(e.removeListener('foo', foo, {
      baz: 'quux'
    })).assertEqual(e)
    let result1 = Utils.comparisonObject(e.listeners('foo'), [foo])
    expect(result1).assertTrue();
    // @ts-ignore
    expect(e._eventsCount).assertEqual(1)

    expect(e.removeListener('foo', foo, context)).assertEqual(e)
    let result2 = Utils.comparisonObject(e.listeners('foo'), [])
    expect(result2).assertTrue();
    // @ts-ignore
    expect(e._eventsCount).assertEqual(0)

    e.on('foo', foo, context);
    e.on('foo', bar);

    expect(e.removeListener('foo', foo, {
      baz: 'quux'
    })).assertEqual(e)
    let result3 = Utils.comparisonObject(e.listeners('foo'), [foo, bar])
    expect(result3).assertTrue();
    // @ts-ignore
    expect(e._eventsCount).assertEqual(1)

    expect(e.removeListener('foo', foo, context)).assertEqual(e)
    let result4 = Utils.comparisonObject(e.listeners('foo'), [bar])
    expect(result4).assertTrue();
    // @ts-ignore
    expect(e._eventsCount).assertEqual(1)

    e.on('foo', bar, context);

    expect(e.removeListener('foo', bar)).assertEqual(e)
    let result5 = Utils.comparisonObject(e.listeners('foo'), [])
    expect(result5).assertTrue();
    // @ts-ignore
    expect(e._eventsCount).assertEqual(0)
  }

  public static nukes(e: EventEmitter<string, Object>, expect: Function): void {
    // @ts-ignore
    expect(e._eventsCount).assertEqual(0)
  }

  public static removesAllEvents(expect: Function): void {
    let e = new EventEmitter<string, Object>();

    e.on('foo', () => {
      throw new Error('oops');
    });
    e.on('foo', () => {
      throw new Error('oops');
    });
    e.on('bar', () => {
      throw new Error('oops');
    });
    e.on('aaa', () => {
      throw new Error('oops');
    });
    expect(e.removeAllListeners('foo')).assertEqual(e)
    expect(e.listeners('foo').length).assertEqual(0)
    expect(e.listeners('bar').length).assertEqual(1)
    expect(e.listeners('aaa').length).assertEqual(1)
    // @ts-ignore
    expect(e._eventsCount).assertEqual(2)

    expect(e.removeAllListeners('bar')).assertEqual(e)
    // @ts-ignore
    expect(e._eventsCount).assertEqual(1)
    expect(e.removeAllListeners('aaa')).assertEqual(e)
    // @ts-ignore
    expect(e._eventsCount).assertEqual(0)

    expect(e.emit('foo')).assertFalse()
    expect(e.emit('bar')).assertFalse()
    expect(e.emit('aaa')).assertFalse()
  }

  public static listenerArray(expect: Function): void {
    var e = new EventEmitter<string, Object>()
      , original;

    let bar: () => void = () => {
    }

    if (Object.getOwnPropertySymbols) {
      //
      // Monkey patch `Object.getOwnPropertySymbols()` to increase coverage
      // on Node.js > 0.10.
      //
      original = Object.getOwnPropertySymbols;
      Object.getOwnPropertySymbols = undefined;
    }

    e.on('foo', () => {
    });
    e.on('bar', bar);

    try {
      let resutl0 = Utils.comparisonObject(e.eventNames(), ['foo', 'bar'])
      expect(resutl0).assertTrue()
      e.removeListener('bar', bar);
      let resutl1 = Utils.comparisonObject(e.eventNames(), ['foo'])
      expect(resutl1).assertTrue()
    } catch (ex) {
      let exError: Error = ex as Error;
      throw exError;
    } finally {
      if (original) Object.getOwnPropertySymbols = original;
    }
  }

  public static identifiers(e: EventEmitter<string, Object>, expect: Function): void {
    class Collection {
      foo = () => {
        return 'foo';
      };
    }

    // @ts-ignore
    e._events = new Collection();
    // @ts-ignore
    expect(e._events.foo()).assertEqual('foo')
  }
}