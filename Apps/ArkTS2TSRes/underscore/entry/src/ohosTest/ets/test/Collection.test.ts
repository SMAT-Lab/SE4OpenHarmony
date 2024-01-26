let __generate__Id: number = 0;
function generateId(): string {
    return "Collection.test_" + ++__generate__Id;
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
import { each, map, reduce, reduceRight, find, filter, where, findWhere, reject, every, some, contains, invoke, pluck, max, min, sortBy, groupBy, indexBy, countBy, shuffle, sample, toArray, size, partition, identity, all, any, includes } from 'underscore';
export default function collectionTest() {
    describe('CollectionTest', () => {
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
        it('test29', 0, () => {
            each([1, 2, 3], (num: number, i: number) => {
                expect(num).assertDeepEquals(i + 1);
            });
        });
        it('test33', 0, () => {
            let answers = 0;
            each(null, () => {
                ++answers;
            });
            expect(answers).assertDeepEquals(0);
        });
        it('test34', 0, () => {
            let a = [1, 2, 3];
            expect(each(a, () => {
            })).assertDeepEquals(a);
        });
        it('test02', 0, () => {
            let doubled: any = map([1, 2, 3], (num: number) => {
                return num * 2;
            });
            expect(doubled).assertDeepEquals([2, 4, 6]);
        });
        it('test30', 0, () => {
            let ids: string[] = map({
                length: 2, 0: {
                    id: '1'
                }, 1: {
                    id: '2'
                }
            }, (n: any): any => {
                return n.id;
            });
            expect(ids).assertDeepEquals(['1', '2']);
        });
        it('test35', 0, () => {
            let ids: string[] = map({
                length: 2, 0: {
                    id: '1'
                }, 1: {
                    id: '3'
                }
            }, (n: any): any => {
                return n.id;
            });
            expect(ids).assertDeepEquals(['1', '3']);
        });
        it('test36', 0, () => {
            let ids: string[] = map({
                length: 2, 0: {
                    id: '2'
                }, 1: {
                    id: '3'
                }
            }, (n: any): any => {
                return n.id;
            });
            expect(ids).assertDeepEquals(['2', '3']);
        });
        it('test37', 0, () => {
            let ids: string[] = map({
                length: 2, 0: {
                    id: '2'
                }, 1: {
                    id: '0'
                }
            }, (n: any): any => {
                return n.id;
            });
            expect(ids).assertDeepEquals(['2', '0']);
        });
        it('test03', 0, () => {
            let sum: number = reduce([1, 2, 3], (memo: number, num: number): number => {
                return memo + num;
            }, 0);
            expect(sum).assertEqual(6);
        });
        it('test31', 0, () => {
            let sum: number = reduce([1, 2, 3], (memo: number, num: number): number => {
                return memo + num;
            });
            expect(sum).assertEqual(6);
        });
        it('test38', 0, () => {
            let sum: number = reduce([1, 2, 4], (memo: number, num: number): number => {
                return memo + num;
            });
            expect(sum).assertEqual(7);
        });
        it('test126', 0, () => {
            let sum: number = reduce([1, 3, 4], (memo: number, num: number): number => {
                return memo + num;
            });
            expect(sum).assertEqual(8);
        });
        it('test39', 0, () => {
            let sum: number = reduce([2, 3, 4], (memo: number, num: number): number => {
                return memo + num;
            });
            expect(sum).assertEqual(9);
        });
        it('test04', 0, () => {
            let list: any = reduceRight(['foo', 'bar', 'baz'], (memo: any, str: any): any => {
                return memo + str;
            }, '');
            expect(list).assertDeepEquals('bazbarfoo');
        });
        it('test40', 0, () => {
            let list: any = reduceRight(['foo', 'bar', 'ba0'], (memo: any, str: any): any => {
                return memo + str;
            }, '');
            expect(list).assertDeepEquals('ba0barfoo');
        });
        it('test41', 0, () => {
            let list: any = reduceRight(['fo1', 'bar', 'ba0'], (memo: any, str: any): any => {
                return memo + str;
            }, '');
            expect(list).assertDeepEquals('ba0barfo1');
        });
        it('test42', 0, () => {
            let list: any = reduceRight(['fo1', 'bar', 'ba1'], (memo: any, str: any): any => {
                return memo + str;
            }, '');
            expect(list).assertDeepEquals('ba1barfo1');
        });
        it('test43', 0, () => {
            let list: any = reduceRight(['fo1', 'bar', 'ba11'], (memo: any, str: any): any => {
                return memo + str;
            }, '');
            expect(list).assertDeepEquals('ba11barfo1');
        });
        it('test05', 0, () => {
            let array = [1, 2, 3, 4];
            expect(find(array, (n: any) => {
                return n > 2;
            })).assertDeepEquals(3);
        });
        it('test44', 0, () => {
            let array = [1, 1, 3, 4];
            expect(find(array, (n: any) => {
                return n > 2;
            })).assertDeepEquals(3);
        });
        it('test45', 0, () => {
            let array = [0, 1, 3, 4];
            expect(find(array, (n: any) => {
                return n > 2;
            })).assertDeepEquals(3);
        });
        it('test46', 0, () => {
            let array = [0, 0, 3, 4];
            expect(find(array, (n: any) => {
                return n > 2;
            })).assertDeepEquals(3);
        });
        it('test47', 0, () => {
            let array = [1, 0, 3, 4];
            expect(find(array, (n: any) => {
                return n > 2;
            })).assertDeepEquals(3);
        });
        it('test06', 0, () => {
            let evenArray = [1, 2, 3, 4, 5, 6];
            let isEven = (num: any) => {
                return num % 2 === 0;
            };
            expect(filter(evenArray, isEven)).assertDeepEquals([2, 4, 6]);
        });
        it('test48', 0, () => {
            let evenArray = [1, 2, 1, 4, 5, 6];
            let isEven = (num: any) => {
                return num % 2 === 0;
            };
            expect(filter(evenArray, isEven)).assertDeepEquals([2, 4, 6]);
        });
        it('test49', 0, () => {
            let evenArray = [1, 2, 1, 4, 1, 6];
            let isEven = (num: any) => {
                return num % 2 === 0;
            };
            expect(filter(evenArray, isEven)).assertDeepEquals([2, 4, 6]);
        });
        it('test50', 0, () => {
            let evenArray = [3, 2, 1, 4, 1, 6];
            let isEven = (num: any) => {
                return num % 2 === 0;
            };
            expect(filter(evenArray, isEven)).assertDeepEquals([2, 4, 6]);
        });
        it('test51', 0, () => {
            let evenArray = [3, 2, 3, 4, 1, 6];
            let isEven = (num: any) => {
                return num % 2 === 0;
            };
            expect(filter(evenArray, isEven)).assertDeepEquals([2, 4, 6]);
        });
        it('test07', 0, () => {
            let result: any = where([{
                    a: 1, b: 2
                }, {
                    a: 2, b: 2
                }, {
                    a: 1, b: 3
                }, {
                    a: 1, b: 4
                }], {
                a: 1
            });
            expect(result.length).assertDeepEquals(3);
        });
        it('test52', 0, () => {
            let result: any = where([{
                    a: 1, b: 1
                }, {
                    a: 2, b: 2
                }, {
                    a: 1, b: 3
                }, {
                    a: 1, b: 4
                }], {
                a: 1
            });
            expect(result.length).assertDeepEquals(3);
        });
        it('test53', 0, () => {
            let result: any = where([{
                    a: 1, b: 1
                }, {
                    a: 2, b: 1
                }, {
                    a: 1, b: 3
                }, {
                    a: 1, b: 4
                }], {
                a: 1
            });
            expect(result.length).assertDeepEquals(3);
        });
        it('test54', 0, () => {
            let result: any = where([{
                    a: 1, b: 1
                }, {
                    a: 2, b: 1
                }, {
                    a: 1, b: 1
                }, {
                    a: 1, b: 4
                }], {
                a: 1
            });
            expect(result.length).assertDeepEquals(3);
        });
        it('test55', 0, () => {
            let result: any = where([{
                    a: 1, b: 1
                }, {
                    a: 2, b: 1
                }, {
                    a: 1, b: 1
                }, {
                    a: 1, b: 2
                }], {
                a: 1
            });
            expect(result.length).assertDeepEquals(3);
        });
        it('test08', 0, () => {
            let odds: string[] = reject([1, 2, 3, 4, 5, 6], (num: number) => {
                return num % 2 === 0;
            });
            expect(odds).assertDeepEquals([1, 3, 5]);
        });
        it('test56', 0, () => {
            let odds: string[] = reject([1, 3, 3, 4, 5, 6], (num: number) => {
                return num % 2 === 0;
            });
            expect(odds).assertDeepEquals([1, 3, 3, 5]);
        });
        it('test57', 0, () => {
            let odds: string[] = reject([1, 3, 3, 1, 5, 6], (num: number) => {
                return num % 2 === 0;
            });
            expect(odds).assertDeepEquals([1, 3, 3, 1, 5]);
        });
        it('test58', 0, () => {
            let odds: string[] = reject([3, 3, 1, 5, 6], (num: number) => {
                return num % 2 === 0;
            });
            expect(odds).assertDeepEquals([3, 3, 1, 5]);
        });
        it('test59', 0, () => {
            let odds: string[] = reject([3, 3, 1, 5, 1], (num: number) => {
                return num % 2 === 0;
            });
            expect(odds).assertDeepEquals([3, 3, 1, 5, 1]);
        });
        it('test09', 0, () => {
            expect(every([1], identity)).assertDeepEquals(true);
        });
        it('test60', 0, () => {
            expect(every([2], identity)).assertDeepEquals(true);
        });
        it('test61', 0, () => {
            expect(every([3], identity)).assertDeepEquals(true);
        });
        it('test62', 0, () => {
            expect(every([4], identity)).assertDeepEquals(true);
        });
        it('test63', 0, () => {
            expect(every([5], identity)).assertDeepEquals(true);
        });
        it('test10', 0, () => {
            expect(all).assertDeepEquals(every);
        });
        it('test11', 0, () => {
            expect(some([1], identity)).assertDeepEquals(true);
        });
        it('test64', 0, () => {
            expect(some([2], identity)).assertDeepEquals(true);
        });
        it('test65', 0, () => {
            expect(some([3], identity)).assertDeepEquals(true);
        });
        it('test66', 0, () => {
            expect(some([4], identity)).assertDeepEquals(true);
        });
        it('test67', 0, () => {
            expect(some([5], identity)).assertDeepEquals(true);
        });
        it('test12', 0, () => {
            expect(any).assertDeepEquals(some);
        });
        it('test13', 0, () => {
            expect(includes([5, 4, 3, 2, 1], 5, true)).assertDeepEquals(true);
        });
        it('test68', 0, () => {
            expect(includes([5, 4, 3, 2, 1], 4, true)).assertDeepEquals(true);
        });
        it('test69', 0, () => {
            expect(includes([5, 4, 3, 2, 1], 3, true)).assertDeepEquals(true);
        });
        it('test70', 0, () => {
            expect(includes([5, 4, 3, 2, 1], 2, true)).assertDeepEquals(true);
        });
        it('test71', 0, () => {
            expect(includes([5, 4, 3, 2, 1], 1, true)).assertDeepEquals(true);
        });
        it('test14', 0, () => {
            let result: any = findWhere([{
                    a: 1, b: 2
                }, {
                    a: 2, b: 2
                }, {
                    a: 1, b: 3
                }, {
                    a: 1, b: 4
                }, {
                    a: 2, b: 4
                }], {
                a: 1
            });
            expect(result).assertDeepEquals({
                a: 1, b: 2
            });
        });
        it('test72', 0, () => {
            let result: any = findWhere([{
                    a: 1, b: 2
                }, {
                    a: 2, b: 3
                }, {
                    a: 1, b: 3
                }, {
                    a: 1, b: 4
                }, {
                    a: 2, b: 4
                }], {
                a: 1
            });
            expect(result).assertDeepEquals({
                a: 1, b: 2
            });
        });
        it('test73', 0, () => {
            let result: any = findWhere([{
                    a: 1, b: 2
                }, {
                    a: 2, b: 3
                }, {
                    a: 1, b: 3
                }, {
                    a: 1, b: 5
                }, {
                    a: 2, b: 4
                }], {
                a: 1
            });
            expect(result).assertDeepEquals({
                a: 1, b: 2
            });
        });
        it('test74', 0, () => {
            let result: any = findWhere([{
                    a: 1, b: 2
                }, {
                    a: 2, b: 3
                }, {
                    a: 1, b: 3
                }, {
                    a: 1, b: 5
                }, {
                    a: 2, b: 1
                }], {
                a: 1
            });
            expect(result).assertDeepEquals({
                a: 1, b: 2
            });
        });
        it('test75', 0, () => {
            let result: any = findWhere([{
                    a: 1, b: 2
                }, {
                    a: 2, b: 3
                }, {
                    a: 1, b: 3
                }, {
                    a: 1, b: 5
                }, {
                    a: 2, b: 2
                }], {
                a: 1
            });
            expect(result).assertDeepEquals({
                a: 1, b: 2
            });
        });
        it('test15', 0, () => {
            expect(contains).assertDeepEquals(includes);
        });
        it('test16', 0, () => {
            let list = [[5, 1, 7], [3, 2, 1]];
            let result: any = invoke(list, 'sort');
            expect(result[0]).assertDeepEquals([1, 5, 7]);
        });
        it('test76', 0, () => {
            let list = [[5, 2, 7], [3, 2, 1]];
            let result: any = invoke(list, 'sort');
            expect(result[0]).assertDeepEquals([2, 5, 7]);
        });
        it('test77', 0, () => {
            let list = [[5, 3, 7], [3, 2, 1]];
            let result: any = invoke(list, 'sort');
            expect(result[0]).assertDeepEquals([3, 5, 7]);
        });
        it('test127', 0, () => {
            let list = [[5, 4, 7], [3, 2, 1]];
            let result: any = invoke(list, 'sort');
            expect(result[0]).assertDeepEquals([4, 5, 7]);
        });
        it('test78', 0, () => {
            let list = [[5, 0, 7], [3, 2, 1]];
            let result: any = invoke(list, 'sort');
            expect(result[0]).assertDeepEquals([0, 5, 7]);
        });
        it('test17', 0, () => {
            expect(pluck([{
                    name: 'moe', age: 30
                }, {
                    name: 'curly', age: 50
                }], 'name')).assertDeepEquals(['moe', 'curly']);
        });
        it('test79', 0, () => {
            expect(pluck([{
                    name: 'moe', age: 10
                }, {
                    name: 'curly', age: 50
                }], 'name')).assertDeepEquals(['moe', 'curly']);
        });
        it('test80', 0, () => {
            expect(pluck([{
                    name: 'moe', age: 20
                }, {
                    name: 'curly', age: 50
                }], 'name')).assertDeepEquals(['moe', 'curly']);
        });
        it('test81', 0, () => {
            expect(pluck([{
                    name: 'moe', age: 40
                }, {
                    name: 'curly', age: 50
                }], 'name')).assertDeepEquals(['moe', 'curly']);
        });
        it('test82', 0, () => {
            expect(pluck([{
                    name: 'moe', age: 50
                }, {
                    name: 'curly', age: 50
                }], 'name')).assertDeepEquals(['moe', 'curly']);
        });
        it('test18', 0, () => {
            let neg: number = max([1, 2, 3], (num: number) => {
                return -num;
            });
            expect(neg).assertDeepEquals(1);
        });
        it('test83', 0, () => {
            let neg: number = max([1, 3, 3], (num: number) => {
                return -num;
            });
            expect(neg).assertDeepEquals(1);
        });
        it('test84', 0, () => {
            let neg: number = max([1, 4, 3], (num: number) => {
                return -num;
            });
            expect(neg).assertDeepEquals(1);
        });
        it('test85', 0, () => {
            let neg: number = max([1, 4, 2], (num: number) => {
                return -num;
            });
            expect(neg).assertDeepEquals(1);
        });
        it('test86', 0, () => {
            let neg: number = max([1, 4, 4], (num: number) => {
                return -num;
            });
            expect(neg).assertDeepEquals(1);
        });
        it('test19', 0, () => {
            let neg: number = min([1, 2, 3], (num: number) => {
                return -num;
            });
            expect(neg).assertDeepEquals(3);
        });
        it('test87', 0, () => {
            let neg: number = min([1, 1, 3], (num: number) => {
                return -num;
            });
            expect(neg).assertDeepEquals(3);
        });
        it('test88', 0, () => {
            let neg: number = min([0, 1, 3], (num: number) => {
                return -num;
            });
            expect(neg).assertDeepEquals(3);
        });
        it('test89', 0, () => {
            let neg: number = min([0, 0, 3], (num: number) => {
                return -num;
            });
            expect(neg).assertDeepEquals(3);
        });
        it('test90', 0, () => {
            let neg: number = min([1, 0, 3], (num: number) => {
                return -num;
            });
            expect(neg).assertDeepEquals(3);
        });
        it('test20', 0, () => {
            let people: any = sortBy([{
                    name: 'curly', age: 50
                }, {
                    name: 'moe', age: 30
                }], (person: any): number => {
                return person.age;
            });
            expect(pluck(people, 'name')).assertDeepEquals(['moe', 'curly']);
        });
        it('test91', 0, () => {
            let people: any = sortBy([{
                    name: 'curly', age: 40
                }, {
                    name: 'moe', age: 30
                }], (person: any): number => {
                return person.age;
            });
            expect(pluck(people, 'name')).assertDeepEquals(['moe', 'curly']);
        });
        it('test92', 0, () => {
            let people: any = sortBy([{
                    name: 'curly', age: 60
                }, {
                    name: 'moe', age: 30
                }], (person: any): number => {
                return person.age;
            });
            expect(pluck(people, 'name')).assertDeepEquals(['moe', 'curly']);
        });
        it('test93', 0, () => {
            let people: any = sortBy([{
                    name: 'curly', age: 70
                }, {
                    name: 'moe', age: 30
                }], (person: any): number => {
                return person.age;
            });
            expect(pluck(people, 'name')).assertDeepEquals(['moe', 'curly']);
        });
        it('test94', 0, () => {
            let people: any = sortBy([{
                    name: 'curly', age: 80
                }, {
                    name: 'moe', age: 30
                }], (person: any): number => {
                return person.age;
            });
            expect(pluck(people, 'name')).assertDeepEquals(['moe', 'curly']);
        });
        it('test21', 0, () => {
            let list = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
            let grouped: any = groupBy(list, 'length');
            expect(grouped['3']).assertDeepEquals(['one', 'two', 'six', 'ten']);
        });
        it('test95', 0, () => {
            let list = ['two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
            let grouped: any = groupBy(list, 'length');
            expect(grouped['3']).assertDeepEquals(['two', 'six', 'ten']);
        });
        it('test96', 0, () => {
            let list = ['two', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
            let grouped: any = groupBy(list, 'length');
            expect(grouped['3']).assertDeepEquals(['two', 'six', 'ten']);
        });
        it('test97', 0, () => {
            let list = ['two', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
            let grouped: any = groupBy(list, 'length');
            expect(grouped['3']).assertDeepEquals(['two', 'six', 'ten']);
        });
        it('test98', 0, () => {
            let list = ['two', 'five', 'six', 'eight', 'nine', 'ten'];
            let grouped: any = groupBy(list, 'length');
            expect(grouped['3']).assertDeepEquals(['two', 'six', 'ten']);
        });
        it('test22', 0, () => {
            let parity: any = indexBy([1, 2, 3, 4, 5], (num: any) => {
                return num % 2 === 0;
            });
            expect(parity['true']).assertDeepEquals(4);
        });
        it('test99', 0, () => {
            let parity: any = indexBy([2, 3, 4, 5], (num: any) => {
                return num % 2 === 0;
            });
            expect(parity['true']).assertDeepEquals(4);
        });
        it('test100', 0, () => {
            let parity: any = indexBy([3, 4, 5], (num: any) => {
                return num % 2 === 0;
            });
            expect(parity['true']).assertDeepEquals(4);
        });
        it('test101', 0, () => {
            let parity: any = indexBy([4, 5], (num: any) => {
                return num % 2 === 0;
            });
            expect(parity['true']).assertDeepEquals(4);
        });
        it('test102', 0, () => {
            let parity: any = indexBy([4], (num: any) => {
                return num % 2 === 0;
            });
            expect(parity['true']).assertDeepEquals(4);
        });
        it('test23', 0, () => {
            let parity: any = countBy([1, 2, 3, 4, 5], (num: any) => {
                return num % 2 === 0;
            });
            expect(parity['true']).assertDeepEquals(2);
        });
        it('test103', 0, () => {
            let parity: any = countBy([2, 3, 4, 5], (num: any) => {
                return num % 2 === 0;
            });
            expect(parity['true']).assertDeepEquals(2);
        });
        it('test104', 0, () => {
            let parity: any = countBy([2, 4, 5], (num: any) => {
                return num % 2 === 0;
            });
            expect(parity['true']).assertDeepEquals(2);
        });
        it('test105', 0, () => {
            let parity: any = countBy([2, 4], (num: any) => {
                return num % 2 === 0;
            });
            expect(parity['true']).assertDeepEquals(2);
        });
        it('test106', 0, () => {
            let parity: any = countBy([2, 4, 1], (num: any) => {
                return num % 2 === 0;
            });
            expect(parity['true']).assertDeepEquals(2);
        });
        it('test24', 0, () => {
            expect(shuffle([1])).assertDeepEquals([1]);
        });
        it('test107', 0, () => {
            expect(shuffle([2])).assertDeepEquals([2]);
        });
        it('test108', 0, () => {
            expect(shuffle([3])).assertDeepEquals([3]);
        });
        it('test109', 0, () => {
            expect(shuffle([4])).assertDeepEquals([4]);
        });
        it('test110', 0, () => {
            expect(shuffle([5])).assertDeepEquals([5]);
        });
        it('test25', 0, () => {
            expect(sample([1])).assertDeepEquals(1);
        });
        it('test111', 0, () => {
            expect(sample([2])).assertDeepEquals(2);
        });
        it('test112', 0, () => {
            expect(sample([3])).assertDeepEquals(3);
        });
        it('test113', 0, () => {
            expect(sample([4])).assertDeepEquals(4);
        });
        it('test114', 0, () => {
            expect(sample([5])).assertDeepEquals(5);
        });
        it('test26', 0, () => {
            let a = [1, 2, 3];
            expect(toArray(a)).assertDeepEquals([1, 2, 3]);
        });
        it('test115', 0, () => {
            let a = [1, 1, 3];
            expect(toArray(a)).assertDeepEquals([1, 1, 3]);
        });
        it('test116', 0, () => {
            let a = [1, 1, 1];
            expect(toArray(a)).assertDeepEquals([1, 1, 1]);
        });
        it('test117', 0, () => {
            let a = [2, 1, 1];
            expect(toArray(a)).assertDeepEquals([2, 1, 1]);
        });
        it('test118', 0, () => {
            let a = [2, 2, 1];
            expect(toArray(a)).assertDeepEquals([2, 2, 1]);
        });
        it('test27', 0, () => {
            expect(size({
                one: 1, two: 2, three: 3
            })).assertDeepEquals(3);
        });
        it('test119', 0, () => {
            expect(size({
                one: 2, two: 2, three: 3
            })).assertDeepEquals(3);
        });
        it('test120', 0, () => {
            expect(size({
                one: 4, two: 2, three: 3
            })).assertDeepEquals(3);
        });
        it('test121', 0, () => {
            expect(size({
                one: 2, two: 3, three: 3
            })).assertDeepEquals(3);
        });
        it('test122', 0, () => {
            expect(size({
                one: 2, two: 3, three: 4
            })).assertDeepEquals(3);
        });
        it('test28', 0, () => {
            let list = [0, 1, 2, 3, 4, 5];
            expect(partition(list, (x: number) => {
                return x < 4;
            })).assertDeepEquals([[0, 1, 2, 3], [4, 5]]);
        });
        it('test123', 0, () => {
            let list = [1, 2, 3, 4, 5];
            expect(partition(list, (x: number) => {
                return x < 4;
            })).assertDeepEquals([[1, 2, 3], [4, 5]]);
        });
        it('test128', 0, () => {
            let list = [1, 3, 4, 5];
            expect(partition(list, (x: number) => {
                return x < 4;
            })).assertDeepEquals([[1, 3], [4, 5]]);
        });
        it('test124', 0, () => {
            let list = [1, 1, 3, 4, 5];
            expect(partition(list, (x: number) => {
                return x < 4;
            })).assertDeepEquals([[1, 1, 3], [4, 5]]);
        });
        it('test125', 0, () => {
            let list = [2, 1, 3, 4, 5];
            expect(partition(list, (x: number) => {
                return x < 4;
            })).assertDeepEquals([[2, 1, 3], [4, 5]]);
        });
    });
}
