let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/*
 * MIT License
 *
 * Copyright (C) 2024 Huawei Device Co., Ltd.
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
import { describe, it, expect } from '@ohos/hypium';
import isEqual from 'lodash.isequal';
import a2dp from '@ohos.bluetooth.a2dp';
export default function abilityTest() {
    describe('ActsAbilityTest', () => {
        it("test1", 0, () => {
            let array1: any[] = [true, null, 1, 'a', undefined];
            let array2: any[] = [true, null, 1, 'a', undefined];
            expect(isEqual(array1, array2)).assertTrue();
            array1 = [[1, 2, 3], new Date(2012, 4, 23), '/x/', {
                    e: 1
                }];
            array2 = [[1, 2, 3], new Date(2012, 4, 23), '/x/', {
                    e: 1
                }];
            expect(isEqual(array1, array2)).assertTrue();
            array1 = [1];
            array1[2] = 3;
            array2 = [1];
            array2[1] = undefined;
            array2[2] = 3;
            expect(isEqual(array1, array2)).assertTrue();
            array1 = [
                Object(1),
                false,
                Object('a'),
                '/x/',
                new Date(2012, 4, 23),
                ['a', 'b', [Object('c')]],
                {
                    a: 1
                },
            ];
            array2 = [
                1,
                Object(false),
                'a',
                '/x/',
                new Date(2012, 4, 23),
                ['a', Object('b'), ['c']],
                {
                    a: 1
                },
            ];
            expect(isEqual(array1, array2)).assertTrue();
            array1 = [1, 2, 3];
            array2 = [3, 2, 1];
            expect(isEqual(array1, array2)).assertFalse();
            array1 = [1, 2];
            array2 = [1, 2, 3];
            expect(isEqual(array1, array2)).assertFalse();
        });
        it("test2", 0, () => {
            let array1: any[] = [1, 2, 3];
            let array2: any[] = [1, 2, 3];
            let temp: any | null = new RegExp('c').exec('abcde');
            if (temp !== null) {
                array1 = temp;
            }
            array2 = ['c'];
            expect(isEqual(array1, array2)).assertTrue();
        });
        it("test3", 0, () => {
            let array1: any[] = Array(1);
            expect(isEqual(array1, Array(1))).assertTrue();
            expect(isEqual(array1, [undefined])).assertTrue();
            expect(isEqual(array1, Array(2))).assertFalse();
        });
        it("test4", 0, () => {
            let object1: any = {
                a: true,
                b: null,
                c: 1,
                d: 'a',
                e: undefined
            };
            let object2: any = {
                a: true,
                b: null,
                c: 1,
                d: 'a',
                e: undefined
            };
            expect(isEqual(object1, object2)).assertTrue();
            object1 = {
                a: [1, 2, 3], b: new Date(2012, 4, 23), c: '/x/', d: {
                    e: 1
                } as any
            };
            object2 = {
                a: [1, 2, 3], b: new Date(2012, 4, 23), c: '/x/', d: {
                    e: 1
                } as any
            };
            expect(isEqual(object1, object2)).assertTrue();
            object1 = {
                a: 1, b: 2, c: 3
            };
            object2 = {
                a: 3, b: 2, c: 1
            };
            expect(isEqual(object1, object2)).assertFalse();
            object1 = {
                a: 1, b: 2, c: 3
            };
            object2 = {
                d: 1, e: 2, f: 3
            };
            expect(isEqual(object1, object2)).assertFalse();
            object1 = {
                a: 1, b: 2
            };
            object2 = {
                a: 1, b: 2, c: 3
            };
            expect(isEqual(object1, object2)).assertFalse();
        });
        it('test5', 0, () => {
            let object1: any = {
                a: 1, b: 2, c: 3
            };
            let object2: any = {
                c: 3, a: 1, b: 2
            };
            expect(isEqual(object1, object2)).assertTrue();
        });
        it('test6', 0, () => {
            let object1: any = {
                a: [1, 2, 3],
                b: true,
                c: Object(1),
                d: 'a',
                e: {
                    f: ['a', Object('b'), 'c'],
                    g: Object(false),
                    h: new Date(2012, 4, 23),
                    j: 'a',
                } as any,
            };
            let object2: any = {
                a: [1, Object(2), 3],
                b: Object(true),
                c: 1,
                d: Object('a'),
                e: {
                    f: ['a', 'b', 'c'],
                    g: false,
                    h: new Date(2012, 4, 23),
                    j: 'a',
                } as any,
            };
            expect(isEqual(object1, object2)).assertTrue();
        });
        it('test7', 0, () => {
            expect(isEqual({
                constructor: 1
            }, {
                constructor: 1
            })).assertTrue();
            expect(isEqual({
                constructor: 1
            }, {
                constructor: '1'
            })).assertFalse();
            expect(isEqual({
                constructor: [1]
            }, {
                constructor: [1]
            })).assertTrue();
            expect(isEqual({
                constructor: [1]
            }, {
                constructor: ['1']
            })).assertFalse();
            expect(isEqual({
                constructor: Object
            }, {})).assertFalse();
        });
        it("test8", 0, () => {
            let array1: any = [];
            let array2: any = [];
            array1.push(array1);
            array2.push(array2);
            expect(isEqual(array1, array2)).assertTrue();
            array1.push('b');
            array2.push('b');
            expect(isEqual(array1, array2)).assertTrue();
            array1.push('c');
            array2.push('d');
            expect(isEqual(array1, array2)).assertFalse();
            array1 = ['a', 'b', 'c'];
            array1[1] = array1;
            array2 = ['a', ['a', 'b', 'c'], 'c'];
            expect(isEqual(array1, array2)).assertFalse();
        });
        it("test9", 0, () => {
            let array1: any = [];
            let array2: any = [array1];
            let array3: any = [array2];
            array1[0] = array1;
            expect(isEqual(array1, array2)).assertTrue();
            expect(isEqual(array2, array3)).assertTrue();
            expect(isEqual(array1, array3)).assertTrue();
        });
        it("test10", 0, () => {
            let object1: any = {};
            let object2: any = {};
            object1.a = object1;
            object2.a = object2;
            expect(isEqual(object1, object2)).assertTrue();
            object1.b = 0;
            object2.b = Object(0);
            expect(isEqual(object1, object2)).assertTrue();
            object1.c = Object(1);
            object2.c = Object(2);
            expect(isEqual(object1, object2)).assertFalse();
            object1 = {
                a: 1, b: 2, c: 3
            };
            object1.b = object1;
            object2 = {
                a: 1, b: {
                    a: 1, b: 2, c: 3
                } as any, c: 3
            };
            expect(isEqual(object1, object2)).assertFalse();
        });
        it("test11", 0, () => {
            let object1: any = {};
            let object2: any = {
                a: object1
            };
            let object3: any = {
                a: object2
            };
            object1.a = object1;
            expect(isEqual(object1, object2)).assertTrue();
            expect(isEqual(object2, object3)).assertTrue();
            expect(isEqual(object1, object3)).assertTrue();
        });
        it("test12", 0, () => {
            let array1: any = [{}];
            let array2: any = [{}];
            (array1[0].a = array1).push(array1);
            (array2[0].a = array2).push(array2);
            expect(isEqual(array1, array2)).assertTrue();
            array1[0].b = 0;
            array2[0].b = Object(0);
            expect(isEqual(array1, array2)).assertTrue();
            array1[0].c = Object(1);
            array2[0].c = Object(2);
            expect(isEqual(array1, array2)).assertFalse();
        });
        it("test13", 0, () => {
            let object1: any = {
                a: [1, 2],
            };
            let object2: any = {
                a: [1, 2],
                b: [1, 2],
            };
            object1.b = object1.a;
            expect(isEqual(object1, object2)).assertTrue();
        });
        it("test14", 0, () => {
            expect(isEqual(true, Object(false))).assertFalse();
            expect(isEqual(Object(false), Object(0))).assertFalse();
            expect(isEqual(false, Object(''))).assertFalse();
            expect(isEqual(Object(36), Object('36'))).assertFalse();
            expect(isEqual(0, '')).assertFalse();
            expect(isEqual(1, true)).assertFalse();
            expect(isEqual(1337756400000, new Date(2012, 4, 23))).assertFalse();
            expect(isEqual('36', 36)).assertFalse();
            expect(isEqual(36, '36')).assertFalse();
        });
        it("test15", 0, () => {
            if (ArrayBuffer) {
                const buffer = new Int8Array([-1]).buffer;
                expect(isEqual(buffer, new Uint8Array([255]).buffer)).assertTrue();
                expect(isEqual(buffer, new ArrayBuffer(1))).assertFalse();
            }
        });
        it("test16", 0, () => {
            let date: Date = new Date(2012, 4, 23);
            expect(isEqual(date, new Date(2012, 4, 23))).assertTrue();
            expect(isEqual(new Date('a'), new Date('b'))).assertTrue();
            expect(isEqual(date, new Date(2013, 3, 25))).assertFalse();
        });
        it("test17", 0, () => {
            let a = () => {
                return 1 + 2;
            };
            let b = () => {
                return 1 + 2;
            };
            expect(isEqual(a, a)).assertTrue();
            expect(isEqual(a, b)).assertFalse();
        });
        it("test18", 0, () => {
            if (Map) {
                let map1: Map<any, any> = new Map();
                let map2: Map<any, any> = new Map();
                map1.set('a', map1);
                map2.set('a', map2);
                expect(isEqual(map1, map2)).assertTrue();
                map1.set('b', 1);
                map2.set('b', 2);
                expect(isEqual(map1, map2)).assertFalse();
            }
        });
        it("test19", 0, () => {
            if (Set) {
                const set1: Set<any> = new Set<any>();
                const set2: Set<any> = new Set<any>();
                set1.add(set1);
                set2.add(set2);
                expect(isEqual(set1, set2)).assertTrue();
                set1.add(1);
                set2.add(2);
                expect(isEqual(set1, set2)).assertFalse();
            }
        });
    });
}
