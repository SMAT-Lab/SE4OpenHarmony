let __generate__Id: number = 0;
function generateId(): string {
    return "parser-position.test_" + ++__generate__Id;
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
import sax from '@ohos/sax';
import { describe, expect, it } from '@ohos/hypium';
function testPosition(chunks: string[], expectedEvents: any, testFunc: Function) {
    let parser: any = sax.parser();
    expectedEvents.forEach((expectation: string[] | any[]) => {
        parser['on' + expectation[0]] = () => {
            let objKeys = Object.keys(expectation[1]);
            for (let i = 0; i < objKeys.length; i++) {
                testFunc(parser[objKeys[i]]).assertEqual(expectation[1][objKeys[i]]);
            }
        };
    });
    chunks.forEach((chunk: string) => {
        parser.write(chunk);
    });
}
export default function parserPositionTest() {
    describe('ParserPositionTest', () => {
        it('parserPositionTest_1', 0, () => {
            testPosition(['<div>abcdefgh</div>'], [
                ['opentagstart', {
                        position: 5, startTagPosition: 1
                    }],
                ['opentag', {
                        position: 5, startTagPosition: 1
                    }],
                ['text', {
                        position: 19, startTagPosition: 14
                    }],
                ['closetag', {
                        position: 19, startTagPosition: 14
                    }]
            ], expect);
        });
        it('parserPositionTest_2', 0, () => {
            testPosition(['<div>abcde', 'fgh</div>'], [
                ['opentagstart', {
                        position: 5, startTagPosition: 1
                    }],
                ['opentag', {
                        position: 5, startTagPosition: 1
                    }],
                ['text', {
                        position: 19, startTagPosition: 14
                    }],
                ['closetag', {
                        position: 19, startTagPosition: 14
                    }]
            ], expect);
        });
    });
}
