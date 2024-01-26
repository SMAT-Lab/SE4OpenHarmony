let __generate__Id: number = 0;
function generateId(): string {
    return "previous-map.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import postcss from '@ohos/postcss';
export default function previousMapTest() {
    describe('previousMapTest', () => {
        class obj {
            version: number = 3;
            file: any = null;
            sources: any = [];
            names: any = [];
            mappings: string = '';
        }
        let mapObj: obj = {
            version: 3,
            file: null,
            sources: [],
            names: [],
            mappings: ''
        };
        let map = JSON.stringify(mapObj);
        it('test01', 0, () => {
            expect(postcss.parse('a{}').source?.input.map).assertUndefined();
        });
        it('test02', 0, () => {
            let root = postcss.parse('a{}', {
                map: {
                    prev: map
                }
            });
            expect(root.source?.input.map.text).assertDeepEquals(map);
        });
        it('test03', 0, () => {
            let root1 = postcss.parse('a{}', {
                map: {
                    prev: map
                }
            });
            expect(root1.source?.input.map.annotation).assertUndefined();
            let root2 = postcss.parse('a{}/*# sourceMappingURL=a.css.map */', {
                map: {
                    prev: map
                }
            });
            expect(root2.source?.input.map.annotation).assertDeepEquals('a.css.map');
        });
        it('test04', 0, () => {
            let map2: any = {
                version: 3,
                file: 'b',
                sources: ['a'],
                names: [],
                mappings: ''
            };
            expect(postcss.parse('a{}', {
                map: {
                    prev: map2
                }
            }).source?.input.map.withContent()).assertDeepEquals(true);
        });
    });
}
