let __generate__Id: number = 0;
function generateId(): string {
    return "Functions.test_" + ++__generate__Id;
}
/*
 * MIT License
 *
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { bind, bindAll, partial, memoize, delay, defer, throttle, once, after, before, wrap, negate, compose, restArguments, iteratee } from 'underscore';
export default function functionTest() {
    describe('FunctionTest', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
        beforeAll(() => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
        });
        beforeEach(() => {
            // Presets an action, which is performed before each unit test case starts.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: preset action function.
        });
        afterEach(() => {
            // Presets a clear action, which is performed after each unit test case ends.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: clear action function.
        });
        afterAll(() => {
            // Presets a clear action, which is performed after all test cases of the test suite end.
            // This API supports only one parameter: clear action function.
        });
        it('assertContain', 0, () => {
            // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
            hilog.info(0x0000, 'testTag', '%{public}s', 'it begin');
            let a = 'abc';
            let b = 'b';
            // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
            expect(a).assertContain(b);
            expect(a).assertEqual(a);
        });
        it('test02', 0, () => {
            ;
            let func: any = partial(() => {
                return arguments.length;
            }, {
                name: 'moe'
            }, 'b', {
                name: 'moe'
            }, 'd');
            expect(func('a')).assertDeepEquals(0);
        });
        it('test22', 0, () => {
            let func: any = partial(() => {
                return arguments.length;
            }, {
                name: 'moe1'
            }, 'b', {
                name: 'moe1'
            }, 'd');
            expect(func('a')).assertDeepEquals(0);
        });
        it('test23', 0, () => {
            let func: any = partial(() => {
                return arguments.length;
            }, {
                name: 'your'
            }, 'b', {
                name: 'your'
            }, 'd');
            expect(func('a')).assertDeepEquals(0);
        });
        it('test24', 0, () => {
            let func: any = partial(() => {
                return arguments.length;
            }, {
                name: 'null'
            }, 'b', {
                name: 'null'
            }, 'd');
            expect(func('a')).assertDeepEquals(0);
        });
        it('test25', 0, () => {
            let func: any = partial(() => {
                return arguments.length;
            }, {
                name: 'me'
            }, 'b', {
                name: 'me'
            }, 'd');
            expect(func('a')).assertDeepEquals(0);
        });
        it('test04', 0, () => {
            let fib = (n: number): any => {
                return n < 2 ? n : fib(n - 1) + fib(n - 2);
            };
            expect(fib(10)).assertDeepEquals(55);
        });
        it('test30', 0, () => {
            let fib = (n: number): any => {
                return n < 2 ? n : fib(n - 1) + fib(n - 2);
            };
            expect(fib(5)).assertDeepEquals(5);
        });
        it('test31', 0, () => {
            let fib = (n: number): any => {
                return n < 2 ? n : fib(n - 1) + fib(n - 2);
            };
            expect(fib(6)).assertDeepEquals(8);
        });
        it('test32', 0, () => {
            let fib = (n: number): any => {
                return n < 2 ? n : fib(n - 1) + fib(n - 2);
            };
            expect(fib(7)).assertDeepEquals(13);
        });
        it('test33', 0, () => {
            let fib = (n: number): any => {
                return n < 2 ? n : fib(n - 1) + fib(n - 2);
            };
            expect(fib(8)).assertDeepEquals(21);
        });
        it('test05', 0, () => {
            let delayed = false;
            delay(() => {
                delayed = true;
            }, 100);
            setTimeout(() => {
                expect(!delayed).assertDeepEquals(true);
            }, 50);
        });
        it('test34', 0, () => {
            let delayed = false;
            delay(() => {
                delayed = true;
            }, 100);
            setTimeout(() => {
                expect(!delayed).assertDeepEquals(true);
            }, 20);
        });
        it('test35', 0, () => {
            let delayed = false;
            delay(() => {
                delayed = true;
            }, 100);
            setTimeout(() => {
                expect(!delayed).assertDeepEquals(true);
            }, 10);
        });
        it('test36', 0, () => {
            let delayed = false;
            delay(() => {
                delayed = true;
            }, 100);
            setTimeout(() => {
                expect(!delayed).assertDeepEquals(true);
            }, 30);
        });
        it('test37', 0, () => {
            let delayed = false;
            delay(() => {
                delayed = true;
            }, 100);
            setTimeout(() => {
                expect(!delayed).assertDeepEquals(true);
            }, 40);
        });
        it('test06', 0, () => {
            let deferred = false;
            defer((bool: boolean) => {
                deferred = bool;
            }, true);
            delay(() => {
                expect(deferred).assertDeepEquals(true);
            }, 50);
        });
        it('test38', 0, () => {
            let deferred = false;
            defer((bool: boolean) => {
                deferred = bool;
            }, true);
            delay(() => {
                expect(deferred).assertDeepEquals(true);
            }, 40);
        });
        it('test39', 0, () => {
            let deferred = false;
            defer((bool: boolean) => {
                deferred = bool;
            }, true);
            delay(() => {
                expect(deferred).assertDeepEquals(true);
            }, 30);
        });
        it('test40', 0, () => {
            let deferred = false;
            defer((bool: boolean) => {
                deferred = bool;
            }, true);
            delay(() => {
                expect(deferred).assertDeepEquals(true);
            }, 20);
        });
        it('test41', 0, () => {
            let deferred = false;
            defer((bool: boolean) => {
                deferred = bool;
            }, true);
            delay(() => {
                expect(deferred).assertDeepEquals(true);
            }, 10);
        });
        it('test07', 0, () => {
            let counter = 0;
            let incr = () => {
                counter++;
            };
            let throttledIncr: any = throttle(incr, 32);
            throttledIncr();
            throttledIncr();
            expect(counter).assertDeepEquals(1);
        });
        it('test42', 0, () => {
            let counter = 0;
            let incr = () => {
                counter++;
            };
            let throttledIncr: any = throttle(incr, 12);
            throttledIncr();
            throttledIncr();
            expect(counter).assertDeepEquals(1);
        });
        it('test43', 0, () => {
            let counter = 1;
            let incr = () => {
                counter++;
            };
            let throttledIncr: any = throttle(incr, 12);
            throttledIncr();
            throttledIncr();
            expect(counter).assertDeepEquals(2);
        });
        it('test44', 0, () => {
            let counter = 2;
            let incr = () => {
                counter++;
            };
            let throttledIncr: any = throttle(incr, 12);
            throttledIncr();
            throttledIncr();
            expect(counter).assertDeepEquals(3);
        });
        it('test45', 0, () => {
            let counter = 3;
            let incr = () => {
                counter++;
            };
            let throttledIncr: any = throttle(incr, 12);
            throttledIncr();
            throttledIncr();
            expect(counter).assertDeepEquals(4);
        });
        it('test08', 0, () => {
            let num = 0;
            let increment: any = once(() => {
                return ++num;
            });
            increment();
            increment();
            expect(num).assertEqual(1);
        });
        it('test46', 0, () => {
            let num = 1;
            let increment: any = once(() => {
                return ++num;
            });
            increment();
            increment();
            expect(num).assertEqual(2);
        });
        it('test47', 0, () => {
            let num = 2;
            let increment: any = once(() => {
                return ++num;
            });
            increment();
            increment();
            expect(num).assertEqual(3);
        });
        it('test48', 0, () => {
            let num = 3;
            let increment: any = once(() => {
                return ++num;
            });
            increment();
            increment();
            expect(num).assertEqual(4);
        });
        it('test49', 0, () => {
            let num = 4;
            let increment: any = once(() => {
                return ++num;
            });
            increment();
            increment();
            expect(num).assertEqual(5);
        });
        it('test09', 0, () => {
            let greet = (name: string) => {
                return 'hi: ' + name;
            };
            let backwards: any = wrap(greet, (func: any, name: string) => {
                return func(name) + ' ' + name.split('').reverse().join('');
            });
            expect(backwards('moe')).assertEqual('hi: moe eom');
        });
        it('test50', 0, () => {
            let greet = (name: string) => {
                return 'he: ' + name;
            };
            let backwards: any = wrap(greet, (func: any, name: string) => {
                return func(name) + ' ' + name.split('').reverse().join('');
            });
            expect(backwards('moe')).assertEqual('he: moe eom');
        });
        it('test51', 0, () => {
            let greet = (name: string) => {
                return 'me: ' + name;
            };
            let backwards: any = wrap(greet, (func: any, name: string) => {
                return func(name) + ' ' + name.split('').reverse().join('');
            });
            expect(backwards('moe')).assertEqual('me: moe eom');
        });
        it('test52', 0, () => {
            let greet = (name: string) => {
                return 'show: ' + name;
            };
            let backwards: any = wrap(greet, (func: any, name: string) => {
                return func(name) + ' ' + name.split('').reverse().join('');
            });
            expect(backwards('moe')).assertEqual('show: moe eom');
        });
        it('test53', 0, () => {
            let greet = (name: string) => {
                return 'sh: ' + name;
            };
            let backwards: any = wrap(greet, (func: any, name: string) => {
                return func(name) + ' ' + name.split('').reverse().join('');
            });
            expect(backwards('moe')).assertEqual('sh: moe eom');
        });
        it('test10', 0, () => {
            let isOdd = (n: number) => {
                return n & 1;
            };
            expect(negate(isOdd)(2)).assertEqual(true);
        });
        it('test54', 0, () => {
            let isOdd = (n: number) => {
                return n & 1;
            };
            expect(negate(isOdd)(3)).assertEqual(false);
        });
        it('test55', 0, () => {
            let isOdd = (n: number) => {
                return n & 1;
            };
            expect(negate(isOdd)(4)).assertEqual(true);
        });
        it('test56', 0, () => {
            let isOdd = (n: number) => {
                return n & 1;
            };
            expect(negate(isOdd)(5)).assertEqual(false);
        });
        it('test57', 0, () => {
            let isOdd = (n: number) => {
                return n & 1;
            };
            expect(negate(isOdd)(6)).assertEqual(true);
        });
        it('test11', 0, () => {
            let greet = (name: string) => {
                return 'hi: ' + name;
            };
            let exclaim = (sentence: string) => {
                return sentence + '!';
            };
            let composed: any = compose(exclaim, greet);
            expect(composed('moe')).assertEqual('hi: moe!');
        });
        it('test58', 0, () => {
            let greet = (name: string) => {
                return 'hi: ' + name;
            };
            let exclaim = (sentence: string) => {
                return sentence + '!';
            };
            let composed: any = compose(exclaim, greet);
            expect(composed('mo')).assertEqual('hi: mo!');
        });
        it('test59', 0, () => {
            let greet = (name: string) => {
                return 'he: ' + name;
            };
            let exclaim = (sentence: string) => {
                return sentence + '!';
            };
            let composed: any = compose(exclaim, greet);
            expect(composed('mo')).assertEqual('he: mo!');
        });
        it('test60', 0, () => {
            let greet = (name: string) => {
                return 'show: ' + name;
            };
            let exclaim = (sentence: string) => {
                return sentence + '!';
            };
            let composed: any = compose(exclaim, greet);
            expect(composed('mo')).assertEqual('show: mo!');
        });
        it('test61', 0, () => {
            let greet = (name: string) => {
                return 'show: ' + name;
            };
            let exclaim = (sentence: string) => {
                return sentence + '!';
            };
            let composed: any = compose(exclaim, greet);
            expect(composed('we')).assertEqual('show: we!');
        });
        it('test12', 0, () => {
            let testAfter = (afterAmount: any, timesCalled: any) => {
                let afterCalled = 0;
                let after1: any = after(afterAmount, () => {
                    afterCalled++;
                });
                while (timesCalled--)
                    after1();
                return afterCalled;
            };
            expect(testAfter(5, 5)).assertEqual(1);
        });
        it('test62', 0, () => {
            let testAfter = (afterAmount: any, timesCalled: any) => {
                let afterCalled = 0;
                let after1: any = after(afterAmount, () => {
                    afterCalled++;
                });
                while (timesCalled--)
                    after1();
                return afterCalled;
            };
            expect(testAfter(4, 4)).assertEqual(1);
        });
        it('test63', 0, () => {
            let testAfter = (afterAmount: any, timesCalled: any) => {
                let afterCalled = 0;
                let after1: any = after(afterAmount, () => {
                    afterCalled++;
                });
                while (timesCalled--)
                    after1();
                return afterCalled;
            };
            expect(testAfter(3, 3)).assertEqual(1);
        });
        it('test64', 0, () => {
            let testAfter = (afterAmount: any, timesCalled: any) => {
                let afterCalled = 0;
                let after1: any = after(afterAmount, () => {
                    afterCalled++;
                });
                while (timesCalled--)
                    after1();
                return afterCalled;
            };
            expect(testAfter(2, 2)).assertEqual(1);
        });
        it('test65', 0, () => {
            let testAfter = (afterAmount: any, timesCalled: any) => {
                let afterCalled = 0;
                let after1: any = after(afterAmount, () => {
                    afterCalled++;
                });
                while (timesCalled--)
                    after1();
                return afterCalled;
            };
            expect(testAfter(1, 1)).assertEqual(1);
        });
        it('test13', 0, () => {
            let testBefore = (beforeAmount: any, timesCalled: any) => {
                let beforeCalled = 0;
                let before1: any = before(beforeAmount, () => {
                    beforeCalled++;
                });
                while (timesCalled--)
                    before1();
                return beforeCalled;
            };
            expect(testBefore(5, 5)).assertEqual(4);
        });
        it('test66', 0, () => {
            let testBefore = (beforeAmount: any, timesCalled: any) => {
                let beforeCalled = 0;
                let before1: any = before(beforeAmount, () => {
                    beforeCalled++;
                });
                while (timesCalled--)
                    before1();
                return beforeCalled;
            };
            expect(testBefore(4, 4)).assertEqual(3);
        });
        it('test67', 0, () => {
            let testBefore = (beforeAmount: any, timesCalled: any) => {
                let beforeCalled = 0;
                let before1: any = before(beforeAmount, () => {
                    beforeCalled++;
                });
                while (timesCalled--)
                    before1();
                return beforeCalled;
            };
            expect(testBefore(3, 3)).assertEqual(2);
        });
        it('test68', 0, () => {
            let testBefore = (beforeAmount: any, timesCalled: any) => {
                let beforeCalled = 0;
                let before1: any = before(beforeAmount, () => {
                    beforeCalled++;
                });
                while (timesCalled--)
                    before1();
                return beforeCalled;
            };
            expect(testBefore(2, 2)).assertEqual(1);
        });
        it('test69', 0, () => {
            let testBefore = (beforeAmount: any, timesCalled: any) => {
                let beforeCalled = 0;
                let before1: any = before(beforeAmount, () => {
                    beforeCalled++;
                });
                while (timesCalled--)
                    before1();
                return beforeCalled;
            };
            expect(testBefore(1, 1)).assertEqual(0);
        });
        it('test14', 0, () => {
            let identity: any = iteratee();
            expect(identity).assertEqual(identity);
        });
        it('test70', 0, () => {
            let id: any = iteratee();
            expect(id).assertEqual(id);
        });
        it('test71', 0, () => {
            let ab: any = iteratee();
            expect(ab).assertEqual(ab);
        });
        it('test72', 0, () => {
            let me: any = iteratee();
            expect(me).assertEqual(me);
        });
        it('test73', 0, () => {
            let hi: any = iteratee();
            expect(hi).assertEqual(hi);
        });
        it('test16', 0, () => {
            let fib = (n: number): any => {
                return n < 2 ? n : fib(n - 1) + fib(n - 2);
            };
            fib = memoize(fib); // Redefine `fib` for memoization
            expect(fib(10)).assertDeepEquals(55);
        });
        it('test78', 0, () => {
            let fib = (n: number): any => {
                return n < 2 ? n : fib(n - 1) + fib(n - 2);
            };
            fib = memoize(fib); // Redefine `fib` for memoization
            expect(fib(1)).assertDeepEquals(1);
        });
        it('test79', 0, () => {
            let fib = (n: number): any => {
                return n < 2 ? n : fib(n - 1) + fib(n - 2);
            };
            fib = memoize(fib); // Redefine `fib` for memoization
            expect(fib(2)).assertDeepEquals(1);
        });
        it('test80', 0, () => {
            let fib = (n: number): any => {
                return n < 2 ? n : fib(n - 1) + fib(n - 2);
            };
            fib = memoize(fib); // Redefine `fib` for memoization
            expect(fib(3)).assertDeepEquals(2);
        });
        it('test81', 0, () => {
            let fib = (n: number): any => {
                return n < 2 ? n : fib(n - 1) + fib(n - 2);
            };
            fib = memoize(fib); // Redefine `fib` for memoization
            expect(fib(4)).assertDeepEquals(3);
        });
    });
}
