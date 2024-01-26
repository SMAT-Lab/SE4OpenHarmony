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

import { it as _it, describe, expect } from '@ohos/hypium'
import EventEmitter from 'eventemitter3'
import Beast from '../Beast'
import Utils from './Utils'

export default function originTest() {

  describe('originTest', () => {
    _it('exposes a `prefixed` property', 0, () => {
      let arr = [false, '~']
      expect(EventEmitter.prefixed === arr[0] || EventEmitter.prefixed === arr[1]).assertTrue()
    });

    _it('exposes a module namespace object', 0, () => {
      Utils.exposesNamespace(expect);
    });

    _it('inherits when used with `require("util").inherits`', 0, () => {

      let moop = new Beast()
        , meap = new Beast();

      expect(moop instanceof Beast).assertTrue();
      expect(moop instanceof EventEmitter).assertTrue();

      moop.on('data', () => {
        throw new Error('I should not emit');
      });

      meap.emit('data', 'rawr');
      meap.removeListener('foo');
      meap.removeAllListeners();
    });

    if ('undefined' !== typeof Symbol) {
      _it('works with ES6 symbols', 0, () => {
        let e = new EventEmitter<string, Object>()
          , event = 'cows'
          , unknown = 'moo';

        let foo: (arg: string) => void = (arg: string) => {
          expect(e.listenerCount(unknown)).assertEqual(0)
          expect(e.listeners(unknown)).assertDeepEquals([])
          expect(arg).assertEqual('bar')

          let bar: (onced: string) => void = (onced: string) => {
            expect(e.listenerCount(unknown)).assertEqual(0)
            expect(e.listeners(unknown)).assertDeepEquals([])
            expect(onced).assertEqual('foo')
          }

          e.once(unknown, bar);

          expect(e.listenerCount(event)).assertEqual(1)
          expect(e.listeners(event)).assertDeepEquals([foo])
          expect(e.listenerCount(unknown)).assertEqual(1)
          expect(e.listeners(unknown)).assertDeepEquals([bar])

          e.removeListener(event);

          expect(e.listenerCount(event)).assertEqual(0)
          expect(e.listeners(event)).assertDeepEquals([])
          expect(e.emit(unknown, 'foo')).assertTrue()
        }
        e.on(event, foo);
        expect(e.emit(unknown, 'bar')).assertFalse()
        expect(e.emit(event, 'bar')).assertTrue()
      });
    }

    _it('should return false when there are not events to emit', 0, () => {
      let e = new EventEmitter<string, Object>();
      expect(e.emit('foo')).assertFalse()
      expect(e.emit('bar')).assertFalse()
    });

    _it('emits with context', 0, (done: Function) => {
      class ContextClass {
        bar: string = '';
      }

      let context: ContextClass = {
        bar: 'baz'
      }, e = new EventEmitter<string, Object>();

      Utils.emitsContext(e, context, expect, done);
    });

    _it('emits with context, multiple arguments (force apply)', 0, (done: Function) => {
      class ContextClass {
        bar: string = '';
      }

      let context: ContextClass = {
        bar: 'baz'
      }, e = new EventEmitter<string, Object>();

      Utils.emitsContextArguments(e, context, expect, done);
    });

    _it('can emit the function with multiple arguments', 0, () => {
      let e = new EventEmitter<string, Object>();

      for (let i = 0; i < 100; i++) {
        ((j) => {
          let args: string[] = [];
          for (let i = 0; i < j; i++) {
            args.push(String(j));
          }
          Utils.emitsFunctionArguments(e, args, expect);
        })(i);
      }
    });

    _it('can emit the function with multiple arguments, multiple listeners', 0, () => {
      let e = new EventEmitter<string, Object>();

      for (let i = 0; i < 100; i++) {
        ((j) => {
          let args: string[] = [];
          for (let i = 0; i < j; i++) {
            args.push(String(j));
          }
          Utils.emitsFunctionArgumentsListeners(e, args, expect);
        })(i);
      }
    });

    _it('emits with context, multiple listeners (force loop)', 0, () => {
      let e = new EventEmitter<string, Object>();

      Utils.emitsContextListeners(e, expect);

      e.emit('foo', 'bar');
    });

    _it('emits with different contexts', 0, () => {
      Utils.emitsDifferentContext(expect);
    });

    _it('should return true when there are events to emit', 0, () => {
      let e = new EventEmitter<string, Object>()
        , called: number = 0;

      e.on('foo', () => {
        called++;
      });
      expect(e.emit('foo')).assertTrue()
      expect(e.emit('foob')).assertFalse()
      expect(called).assertEqual(1)
    });

    _it('receives the emitted events', 0, (done: Function) => {
      Utils.receivesEmitsEvents(expect, done);
    });

    _it('emits to all event listeners', 0, () => {
      let e = new EventEmitter<string, Object>()
        , pattern: string[] = [];

      e.on('foo', () => {
        pattern.push('foo1');
      });

      e.on('foo', () => {
        pattern.push('foo2');
      });

      e.emit('foo');
      expect(pattern.join(';')).assertEqual('foo1;foo2')
    });

    _it('can store event which is a known property enter', 0, () => {
      let dataArray: string[] = [
        'hasOwnProperty',
        'constructor',
        '__proto__',
        'toString',
        'toValue',
        'unwatch',
        'watch'
      ]
      let each: (keys: string[]) => void = (keys: string[]) => {
        let key = keys.shift();

        if (!key) {
          return;
        }

        _it('can store event which is a known property: ' + key, 0, (next: Function) => {
          let e = new EventEmitter<string, Object>();

          if (key) {
            e.on(key, (k: string) => {
              expect(k).assertEqual(key)
              next();
            }).emit(key, key);
          }
        });
        each(keys);
      }

      each(dataArray);
    });


    _it('returns an empty array if no listeners are specified', 0, () => {
      let e = new EventEmitter<string, Object>();
      expect(e.listeners('foo') instanceof Array).assertTrue()
      expect(e.listeners('foo').length).assertEqual(0)
    });

    _it('returns an array of function', 0, () => {
      let e = new EventEmitter<string, Object>();

      let foo: () => void = () => {
      }

      e.on('foo', foo);
      expect(e.listeners('foo') instanceof Array).assertTrue()
      expect(e.listeners('foo').length).assertEqual(1)
      expect(e.listeners('foo')).assertDeepEquals([foo])
    });

    _it('is not vulnerable to modifications', 0, () => {
      let e = new EventEmitter<string, Object>();

      let foo: () => void = () => {
      }

      e.on('foo', foo);
      expect(e.listeners('foo')).assertDeepEquals([foo])

      e.listeners('foo').length = 0;
      expect(e.listeners('foo')).assertDeepEquals([foo])
    });

    _it('returns the number of listeners for a given event', 0, () => {
      Utils.returnsListenersCount(expect);
    });

    _it('throws an error if the listener is not a function', 0, () => {
      Utils.throwError(expect);
    });

    _it('only emits it once', 0, () => {
      let e = new EventEmitter<string, Object>()
        , calls: number = 0;

      e.once('foo', () => {
        calls++;
      });

      e.emit('foo');
      e.emit('foo');
      e.emit('foo');
      e.emit('foo');
      e.emit('foo');
      expect(e.listeners('foo').length).assertEqual(0)
      expect(calls).assertEqual(1)
    });

    _it('only emits once if emits are nested inside the listener', 0, () => {
      let e = new EventEmitter<string, Object>()
        , calls: number = 0;

      e.once('foo', () => {
        calls++;
        e.emit('foo');
      });

      e.emit('foo');
      expect(e.listeners('foo').length).assertEqual(0)
      expect(calls).assertEqual(1)
    });

    _it('only emits once for multiple events', 0, () => {
      let e = new EventEmitter<string, Object>()
        , multi: number = 0
        , foo: number = 0
        , bar: number = 0;

      e.once('foo', () => {
        foo++;
      });

      e.once('foo', () => {
        bar++;
      });

      e.on('foo', () => {
        multi++;
      });

      e.emit('foo');
      e.emit('foo');
      e.emit('foo');
      e.emit('foo');
      e.emit('foo');
      expect(e.listeners('foo').length).assertEqual(1)
      expect(multi).assertEqual(5)
      expect(foo).assertEqual(1)
      expect(bar).assertEqual(1)
    });

    _it('only emits once with context', 0, (done: Function) => {
      class ContextClass {
        foo: string = '';
      }

      let context: ContextClass = {
        foo: 'bar'
      }
        , e = new EventEmitter<string, Object>();

      Utils.emitsOnce(e, context, expect, done);
    });
    _it('removes all listeners when the listener is not specified', 0, () => {
      let e = new EventEmitter<string, Object>();

      e.on('foo', () => {
      });
      e.on('foo', () => {
      });
      expect(e.removeListener('foo')).assertEqual(e)
      let result = Utils.comparisonObject(e.listeners('foo'), [])
      expect(result).assertTrue();
    });

    _it('removes only the listeners matching the specified listener', 0, () => {
      Utils.removesMatchListeners(expect);
    });

    _it('removes only the once listeners when using the once flag', 0, () => {
      Utils.removesOnceListener(expect);
    });

    _it('removes only the listeners matching the correct context', 0, () => {
      Utils.removesMatchContext(expect);
    });

    _it('removes all events for the specified events', 0, () => {
      Utils.removesAllEvents(expect);
    });

    _it('just nukes the fuck out of everything', 0, () => {
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
      expect(e.removeAllListeners()).assertEqual(e)
      expect(e.listeners('foo').length).assertEqual(0)
      expect(e.listeners('bar').length).assertEqual(0)
      expect(e.listeners('aaa').length).assertEqual(0)
      Utils.nukes(e, expect);

      expect(e.emit('foo')).assertFalse()
      expect(e.emit('bar')).assertFalse()
      expect(e.emit('aaa')).assertFalse()
    });
    _it('returns an empty array when there are no events', 0, () => {
      let e = new EventEmitter<string, Object>();
      let resutl0 = Utils.comparisonObject(e.eventNames(), [])
      expect(resutl0).assertTrue()

      e.on('foo', () => {
      });
      e.removeAllListeners('foo');

      let resutl1 = Utils.comparisonObject(e.eventNames(), [])
      expect(resutl1).assertTrue()
    });

    _it('returns an array listing the events that have listeners', 0, () => {
      Utils.listenerArray(expect);
    });

    _it('does not return inherited property identifiers', 0, () => {
      let e = new EventEmitter<string, Object>();

      Utils.identifiers(e, expect);
      let resutl0 = Utils.comparisonObject(e.eventNames(), [])
      expect(resutl0).assertTrue()
    });

    if ('undefined' !== typeof Symbol) {
      _it('includes ES6 symbols', 0, () => {
        let e = new EventEmitter<string, Object>()
          , s = 's';

        let foo: () => void = () => {
        }

        e.on('foo', foo);
        e.on(s, () => {
        });
        let resutl0 = Utils.comparisonObject(e.eventNames(), ['foo', s])
        expect(resutl0).assertTrue()

        e.removeListener('foo', foo);
        let resutl1 = Utils.comparisonObject(e.eventNames(), [s])
        expect(resutl1).assertTrue()
      });
    }
  })
}