let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import Mustache from 'mustache';
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { Data, Partials, Data1 } from './interface';
export default function abilityTest() {
    describe('ActsAbilityTest', () => {
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
        it('parse_001', 0, () => {
            let data: Data = {
                name: "hello"
            };
            let render: string = "{{name}}";
            let res: string = Mustache.render(render, data);
            expect(res).assertEqual('hello');
        });
        it('emptyParse_002', 0, () => {
            let data: Data = {
                name: "hello"
            };
            let render: string = "{{hello}}";
            let res: string = Mustache.render(render, data);
            expect(res).assertEqual('');
        });
        it('HTMLParse_003', 0, () => {
            let data: Data = {
                text: "<span>hello<span>"
            };
            let render: string = "{{text}}";
            let res: string = Mustache.render(render, data);
            expect(res).assertEqual('&lt;span&gt;hello&lt;span&gt;');
        });
        it('NoHTMLParse_004', 0, () => {
            let data: Data = {
                text: "<span>hello<span>"
            };
            let render: string = "{{{text}}}";
            let res: string = Mustache.render(render, data);
            expect(res).assertEqual('<span>hello<span>');
        });
        it('forbiddenHTMLParse_005', 0, () => {
            let data: Data = {
                text: "<span>hello<span>"
            };
            let render: string = "{{&text}}";
            let res: string = Mustache.render(render, data);
            expect(res).assertEqual('<span>hello<span>');
        });
        it('functionParse_006', 0, () => {
            let data: Data1 = {
                text: () => {
                    return 2 + 6;
                }
            };
            let render: string = "{{text}}";
            let res: string = Mustache.render(render, data);
            expect(res).assertEqual('8');
        });
        it('keyParse_007', 0, () => {
            let data: Data = {
                text: {
                    name: "hello"
                }
            };
            let render: string = "{{text.name}}";
            let res: string = Mustache.render(render, data);
            expect(res).assertEqual('hello');
        });
        it('blockParse_008', 0, () => {
            let data: Data = {
                text: {
                    name: "hello",
                    other: "world"
                }
            };
            let render: string = "{{#text}}{{name}} {{other}}{{/text}}";
            let res: string = Mustache.render(render, data);
            expect(res).assertEqual('hello world');
        });
        it('elseParse_009', 0, () => {
            let data: Data = {
                text: []
            };
            let render: string = "{{^text}}hello world{{/text}}";
            let res: string = Mustache.render(render, data);
            expect(res).assertEqual('hello world');
        });
        it('enumParse', 0, () => {
            let data: Data = {
                text: ["hello", "world"]
            };
            let render: string = "{{#text}}{{.}}{{/text}}";
            let res: string = Mustache.render(render, data);
            expect(res).assertEqual('helloworld');
        });
        it('annotationParse_011', 0, () => {
            let data: Data = {
                text: "hello world"
            };
            let render: string = "{{!text}}";
            let res: string = Mustache.render(render, data);
            expect(res).assertEqual('');
        });
        it('templateParse_012', 0, () => {
            let data: Data = {
                name: "hello",
                msg: {
                    sex: "male",
                    age: "18",
                    hobby: "read"
                }
            };
            let partials: Partials = {
                template: "{{#msg}}{{sex}};{{age}};{{hobby}}{{/msg}}"
            };
            let render: string = "{{name}};{{>template}}";
            let res: string = Mustache.render(render, data, partials);
            expect(res).assertEqual('hello;male;18;read');
        });
        it('customTags_013', 0, () => {
            let data: Data = {
                name: "hello"
            };
            let customTags: string[] = ['<%', '%>'];
            let render: string = "{{name}}";
            let obj: Data = {};
            let res: string = Mustache.render(render, data, obj, customTags);
            expect(res).assertEqual('{{name}}');
            let render2: string = "<%name%>";
            let res2: string = Mustache.render(render2, data, obj, customTags);
            expect(res2).assertEqual('hello');
        });
        it('clearCache_014', 0, () => {
            let data: Data = {
                name: "hello"
            };
            let customTags: string[] = ['<%', '%>'];
            let render: string = "{{name}}";
            let obj: Data = {};
            let res: string = Mustache.render(render, data, obj, customTags);
            expect(res).assertEqual('{{name}}');
            let render2: string = "<%name%>";
            let res2: string = Mustache.render(render2, data, obj, customTags);
            Mustache.clearCache();
            expect(res2).assertEqual('hello');
        });
    });
}
