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
function test(options, ex) {
    var xml = options.xml;
    var parser = sax.parser(options.strict, options.opt);
    var expect = options.expect;
    var e = 0;
    sax.EVENTS.forEach(function (ev) {
        parser['on' + ev] = function (n) {
            if (e >= expect.length && (ev === 'end' || ev === 'ready')) {
                return;
            }
            ex(e < expect.length).assertTrue();
            if (!expect[e]) {
                ex('did not expect this event', {
                    event: ev,
                    expect: expect,
                    data: n
                }).assertFail();
                return;
            }
            ex(ev).assertEqual(expect[e][0]);
            if (ev === 'error') {
                ex(n.message).assertEqual(expect[e][1]);
            }
            else {
                if (Array.isArray(n) && Array.isArray(expect[e][1])) {
                    n.sort();
                    expect[e][1].sort();
                    ex(JSON.stringify(n)).assertEqual(JSON.stringify(expect[e][1]));
                }
            }
            e++;
            if (ev === 'error') {
                parser.resume();
            }
        };
    });
    if (xml) {
        parser.write(xml).close();
    }
    return parser;
}
export default test;
