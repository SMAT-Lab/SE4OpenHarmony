let __generate__Id: number = 0;
function generateId(): string {
    return "not-string.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { describe, expect, it } from '@ohos/hypium';
import buffer from '@ohos.buffer';
import sax from '@ohos/sax';
export default function notStringTest() {
    describe('NotStringTest', () => {
        it('notStringTest', 0, () => {
            let parser: any = sax.parser(true);
            interface Obj {
            }
            class ValueType {
                name: string = 'x';
                attributes: Obj = {};
                isSelfClosing: boolean = false;
            }
            let value: ValueType = {
                name: 'x', attributes: {}, isSelfClosing: false
            };
            parser.onopentag = (node: any) => {
                expect(JSON.stringify(node)).assertEqual(JSON.stringify(value));
            };
            let xml = buffer.from('<x>y</x>');
            parser.write(xml).close();
        });
    });
}
