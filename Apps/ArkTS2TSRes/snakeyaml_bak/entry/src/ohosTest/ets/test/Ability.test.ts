let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/*
* Copyright (c) 2022 Huawei Device Co., Ltd.

* Permission to use, copy, modify, and/or distribute this software for any purpose
* with or without fee is hereby granted, provided that the above copyright notice
* and this permission notice appear in all copies.

* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
* REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
* FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
* INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
* OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
* TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
* THIS SOFTWARE.
*/
import YAML from 'yaml';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { nullOptions, Pair, Scalar, YAMLMap, YAMLSeq } from 'yaml/types';
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
        it('document', 0, () => {
            const doc = new YAML.Document();
            doc.version = "true";
            doc.commentBefore = ' A commented document';
            doc.contents = ['some', 'values', {
                    balloons: 99
                }];
            expect(String(doc)).assertEqual('# A commented document\n\n%YAML 1.2\n---\n- some\n- values\n- balloons: 99\n');
        });
        it('parseDocument', 0, () => {
            const src = '[{ a: A }, { b: B }]';
            const doc = YAML.parseDocument(src);
            expect(JSON.stringify(doc.contents)).assertEqual('[{"a":"A"},{"b":"B"}]');
        });
        it('parseDocument_null', 0, () => {
            const src = '[{ a: A }, { b: B }]';
            const doc = YAML.parseDocument(src, null);
            expect(JSON.stringify(doc)).assertEqual('[{"a":"A"},{"b":"B"}]');
        });
        it('parse', 0, () => {
            const src = '3.1415926';
            const doc: any = YAML.parse(src);
            expect(JSON.stringify(doc)).assertEqual(src);
        });
        it('parse_null', 0, () => {
            const src = '[ true, false, maybe, null ]\n';
            const doc: any = YAML.parse(src);
            expect(String(doc)).assertEqual('true,false,maybe,');
        });
        it('stringify_arr', 0, () => {
            const src = [true, false, 'maybe', null];
            const doc = YAML.stringify(src);
            expect(doc).assertEqual('- true\n- false\n- maybe\n- null\n');
        });
        it('stringify_obj', 0, () => {
            class plainBean {
                number: number = 0;
                plain: string = '';
                block: string = '';
            }
            const src: plainBean = {
                number: 3, plain: 'string', block: 'two\nlines\n'
            } as plainBean;
            const doc = YAML.stringify(src);
            expect(doc).assertEqual('number: 3\nplain: string\nblock: |\n  two\n  lines\n');
        });
        const src = '[{ a: A }, { b: B }]';
        const doc = YAML.parseDocument(src);
        const anchors = doc.anchors;
        const contents = doc.contents;
        let a: any = contents == null ? null : contents["items"][0];
        let b: any = contents == null ? null : contents["items"][1];
        const alias = anchors.createAlias(a, 'AA');
        if (contents)
            contents["items"].push(alias);
        expect(anchors.getName(a)).assertEqual('AA');
        anchors.setAnchor(a.items[0].value);
        anchors.setAnchor(b.items[0].value);
        anchors.setAnchor(null, 'a1');
        anchors.getName(a);
        anchors.getNode('a2');
        const merge = anchors.createMergePair(alias);
        b.items.push(merge);
        it('createAlias', 0, () => {
            expect(alias != null).assertTrue();
        });
        it('doc_string', 0, () => {
            expect(String(doc)).assertEqual('[ &AA { a: A }, { b: &a2 B, <<: *AA }, *AA ]\n');
        });
        it('doc_stringify', 0, () => {
            expect(JSON.stringify(doc.toJSON())).assertEqual('[{"a":"A"},{"b":"B","a":"A"},{"a":"A"}]');
        });
        const map: YAMLMap | YAMLSeq | Scalar = YAML.createNode({
            a: 1, b: [2, 3]
        }) as YAMLMap;
        map.add({
            key: 'c', value: 4
        });
        it('createNode_get_c', 0, () => {
            expect(map.get('c') === 4 && map.has('c') === true).assertTrue();
        });
        it('createNode_get_in', 0, () => {
            map.addIn(['b'], 5);
            expect(map.getIn(['b', 2]) === 5).assertTrue();
        });
        it('createNode_delete', 0, () => {
            expect(map.delete('c')).assertTrue();
        });
        it('createNode_deleteIn', 0, () => {
            expect(map.deleteIn(['c'])).assertFalse();
        });
        it('createNode_get_a', 0, () => {
            expect(map.get('a')).assertEqual(1);
        });
        it('createNode_get_createNode', 0, () => {
            expect(map.get(YAML.createNode('a'), true) == 1).assertTrue();
        });
        it('createNode_get_In_arr', 0, () => {
            expect(map.getIn(['b', 1])).assertEqual(3);
        });
        it('createNode_has_c', 0, () => {
            expect(map.has('c')).assertFalse();
        });
        it('createNode_has_In', 0, () => {
            expect(map.hasIn(['b', '0'])).assertTrue();
        });
        it('createNode_set', 0, () => {
            map.set('c', null);
            expect(map.get('c') === null && map.has('c') === true).assertTrue();
        });
        it('YAMLSeq', 0, () => {
            class includeBean {
                including: string = '';
                content: string = '';
            }
            const doc = new YAML.Document();
            doc.contents = new YAMLSeq();
            doc.contents.items = ['some values', 42, {
                    including: 'objects', content: 'a string'
                } as includeBean] as any[];
            doc.contents.items.push(new Pair(1, 'a number'));
            expect(doc.toString()).assertEqual('- some values\n- 42\n- including: objects\n  content: a string\n- 1: a number\n');
        });
        it('long_multiline', 0, () => {
            expect(YAML.stringify('blah blah\nblah blah blah blah blah blah blah blah blah blah\n')).assertEqual("|\nblah blah\nblah blah blah blah blah blah blah blah blah blah\n");
        });
        it('plain', 0, () => {
            expect(YAML.stringify('STR')).assertEqual('STR\n');
        });
        it('double_quoted', 0, () => {
            expect(YAML.stringify('"x"')).assertEqual('\'"x"\'\n');
        });
        it('single_quoted', 0, () => {
            expect(YAML.stringify("'x'")).assertEqual('"\'x\'"\n');
        });
        it('escaped', 0, () => {
            expect(YAML.stringify('null: \u0000')).assertEqual('"null: \\0"\n');
        });
        it('short_multiline', 0, () => {
            expect(YAML.stringify('blah\nblah\nblah')).assertEqual('|-\nblah\nblah\nblah\n');
        });
        it('integer', 0, () => {
            expect(YAML.stringify(3)).assertEqual('3\n');
        });
        it('float', 0, () => {
            expect(YAML.stringify(3.141)).assertEqual('3.141\n');
        });
        it('zero', 0, () => {
            expect(YAML.stringify(0)).assertEqual('0\n');
        });
        it('float_with_trailing_zeros', 0, () => {
            const doc = new YAML.Document();
            doc.contents = YAML.createNode(3, true);
            doc.contents.minFractionDigits = 2;
            expect(String(doc)).assertEqual('3.00\n');
        });
        it('scientific_float_ignores_minFractionDigits', 0, () => {
            const doc = new YAML.Document();
            doc.contents = YAML.createNode(3, true);
            doc.contents.format = 'EXP';
            doc.contents.minFractionDigits = 2;
            expect(String(doc)).assertEqual('3e+0\n');
        });
        it('integer_with_HEX_format', 0, () => {
            const doc = new YAML.Document();
            doc.contents = YAML.createNode(42, true);
            doc.contents.format = 'HEX';
            expect(String(doc)).assertEqual('0x2a\n');
        });
        it('float_with_HEX_format', 0, () => {
            const doc = new YAML.Document();
            doc.contents = YAML.createNode(4.2, true);
            doc.contents.format = 'HEX';
            expect(String(doc)).assertEqual('4.2\n');
        });
        it('negative_integer_with_HEX_format', 0, () => {
            const doc = new YAML.Document();
            doc.contents = YAML.createNode(-42, true);
            doc.contents.format = 'HEX';
            const exp = '-42\n';
            expect(String(doc)).assertEqual(exp);
        });
        it('BigInt', 0, () => {
            expect(YAML.stringify(BigInt('-42'))).assertEqual('-42\n');
        });
        it('BigInt_with_HEX_format', 0, () => {
            const doc = new YAML.Document();
            doc.contents = YAML.createNode(BigInt('42'), true);
            doc.contents.format = 'HEX';
            expect(String(doc)).assertEqual('0x2a\n');
        });
        it('BigInt_with_OCT_format', 0, () => {
            const doc = new YAML.Document();
            doc.contents = YAML.createNode(BigInt('42'), true);
            doc.contents.format = 'OCT';
            const exp = '0o52\n';
            expect(String(doc)).assertEqual(exp);
        });
        it('negative_BigInt_with_OCT_format', 0, () => {
            const doc = new YAML.Document();
            doc.contents = YAML.createNode(BigInt('-42'), true);
            doc.contents.format = 'OCT';
            const exp = '-42\n';
            expect(String(doc)).assertEqual(exp);
        });
        it('true', 0, () => {
            expect(YAML.stringify(true)).assertEqual('true\n');
        });
        it('false', 0, () => {
            expect(YAML.stringify(false)).assertEqual('false\n');
        });
        it('map', 0, () => {
            const src = 'a:\n  # 123';
            const doc = YAML.parseDocument(src);
            expect(String(doc)).assertEqual('? a\n\n# 123\n');
        });
        it('seq', 0, () => {
            const src = '- a: # 123';
            const doc = YAML.parseDocument(src);
            expect(String(doc)).assertEqual('- ? a # 123\n');
        });
        it('eemeli_yaml_empty', 0, () => {
            expect(YAML.parse('[ ? ]')).assertDeepEquals([{
                    '': null
                }]);
        });
        it('eemeli_yaml_placeholder_pty', 0, () => {
            expect(YAML.parse('[? 123]')).assertDeepEquals([{
                    123: null
                }]);
        });
        it('eemeli_yaml_placeholder_val', 0, () => {
            expect(YAML.parse('[ 123, ? ]')).assertDeepEquals([123, {
                    '': null
                }]);
        });
        it('eemeli_yaml_special', 0, () => {
            expect(YAML.parse('[ 123, ? 456 ]')).assertDeepEquals([123, {
                    456: null
                }]);
        });
        it('eemeli_yaml934', 0, () => {
            expect(YAML.parse('|')).assertEqual('');
        });
    });
}
