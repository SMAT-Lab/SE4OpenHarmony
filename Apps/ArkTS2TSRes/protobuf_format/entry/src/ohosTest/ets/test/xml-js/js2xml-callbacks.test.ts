let __generate__Id: number = 0;
function generateId(): string {
    return "js2xml-callbacks.test_" + ++__generate__Id;
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
import convert from '@ohos/xml_js';
import { afterEach, beforeEach, describe, expect, it } from '@ohos/hypium';
import { entity_compact_false_js, instruction_compact_false_js, cdata_compact_false_js, comment_compact_false_js, text_compact_false_js, instruction_2_compact_false_js, element_compact_false_js, attributeName_compact_false_js, attributeValue_compact_false_js, attributes_compact_false_js, doctype_compact_true_js, instructionFn_compact_true_js, CDATA_compact_true_js, comment_compact_true_js, text_compact_true_js, instruction_compact_true_js, elementName_compact_true_js, attributeName_compact_true_js, attributeValue_compact_true_js, attributes_compact_true_js, fullTagEmptyElement_elements_js, fullTagEmptyElement_elements_compact_true_js } from './XmlJSData';
let args: any;
function manipulate(val: string) {
    args = arguments;
    return val.toUpperCase();
}
function manipulateAttribute(obj: any): any {
    args = arguments;
    let key: string = '';
    let temp: string = '';
    let objKeys = Object.keys(obj);
    for (let i = 0; i < objKeys.length; i++) {
        key = objKeys[i];
        temp = obj[key];
        obj[key] = null;
        obj[key.toUpperCase()] = temp.toUpperCase();
    }
    return obj;
}
function fullTag(name: string) {
    args = arguments;
    return name === 'b';
}
export default function testing_js2xml() {
    describe('Testing_js2xml', () => {
        let entity_compact_false_xml = '<!DOCTYPE ' + manipulate('note [\n<!ENTITY foo "baa">]') + '>';
        it('entity_compact_false', 0, () => {
            expect(convert.js2xml(entity_compact_false_js, {
                compact: false, doctypeFn: manipulate
            })).assertEqual(entity_compact_false_xml);
        });
        it('entity_compact_false_should_provide_correct_arguments', 0, () => {
            expect(args).assertContain('note [\n<!ENTITY foo "baa">]');
            expect(args).assertContain('_root_');
            expect(args).assertContain(entity_compact_false_js);
        });
        let instruction_compact_false_xml = '<?go ' + manipulate('there') + '?>';
        it('instruction_compact_false', 0, () => {
            expect(convert.js2xml(instruction_compact_false_js, {
                compact: false, instructionFn: manipulate
            })).assertEqual(instruction_compact_false_xml);
        });
        it('instruction_compact_false_should_provide_correct_arguments', 0, () => {
            expect(args).assertContain('there');
            expect(args).assertContain('go');
            expect(args).assertContain('_root_');
            expect(args).assertContain(instruction_compact_false_js);
        });
        let cdata_compact_false_xml = '<![CDATA[' + manipulate(' \t <foo></bar> \t ') + ']]>';
        it('cdata_compact_false', 0, () => {
            expect(convert.js2xml(cdata_compact_false_js, {
                compact: false, cdataFn: manipulate
            })).assertEqual(cdata_compact_false_xml);
        });
        it('cdata_compact_false_should_provide_correct_arguments', 0, () => {
            expect(args).assertContain(' \t <foo></bar> \t ');
            expect(args).assertContain('_root_');
            expect(args).assertContain(cdata_compact_false_js);
        });
        let comment_compact_false_xml = '<!--' + manipulate(' \t Hello, World! \t ') + '-->';
        it('comment_compact_false', 0, () => {
            expect(convert.js2xml(comment_compact_false_js, {
                compact: false, commentFn: manipulate
            })).assertEqual(comment_compact_false_xml);
        });
        it('comment_compact_false_should_provide_correct_arguments', 0, () => {
            expect(args).assertContain(' \t Hello, World! \t ');
            expect(args).assertContain('_root_');
            expect(args).assertContain(comment_compact_false_js);
        });
        let text_compact_false_xml = '<a>' + manipulate(' \t Hi \t ') + '</a>';
        it('text_compact_false', 0, () => {
            expect(convert.js2xml(text_compact_false_js, {
                compact: false, textFn: manipulate
            })).assertEqual(text_compact_false_xml);
        });
        it('text_compact_false_should_provide_correct_arguments', 0, () => {
            expect(args).assertContain(' \t Hi \t ');
            expect(args).assertContain('a');
            expect(args).assertContain(text_compact_false_js.elements[0]);
        });
        let instruction_2_compact_false_xml = '<?' + manipulate('go') + ' there?>';
        it('instruction_2_compact_false', 0, () => {
            expect(convert.js2xml(instruction_2_compact_false_js, {
                compact: false, instructionNameFn: manipulate
            })).assertEqual(instruction_2_compact_false_xml);
        });
        it('instruction_2_compact_false_should_provide_correct_arguments', 0, () => {
            expect(args).assertContain('go');
            expect(args).assertContain('_root_');
            expect(args).assertContain(instruction_2_compact_false_js);
        });
        let element_compact_false_xml = '<' + manipulate('a') + ' x="hello"/>';
        it('element_compact_false', 0, () => {
            expect(convert.js2xml(element_compact_false_js, {
                compact: false, elementNameFn: manipulate
            })).assertEqual(element_compact_false_xml);
        });
        it('element_compact_false_should_provide_correct_arguments', 0, () => {
            expect(args).assertContain('a');
            expect(args).assertContain(element_compact_false_js.elements[0]);
        });
        let attributeName_compact_false_xml = '<a ' + manipulate('x') + '="1.234" ' + manipulate('y') + '="It\'s"/>';
        it('attributeName_compact_false', 0, () => {
            expect(convert.js2xml(attributeName_compact_false_js, {
                compact: false, attributeNameFn: manipulate
            })).assertEqual(attributeName_compact_false_xml);
        });
        it('attribute_name_compact_false_should_provide_correct_arguments', 0, () => {
            expect(args).assertContain('y');
            expect(args).assertContain('It\'s');
            expect(args).assertContain('a');
            expect(args).assertContain(attributeName_compact_false_js.elements[0]);
        });
        let attributeValue_compact_false_xml = '<a x="' + manipulate('1.234') + '" y="' + manipulate('It\'s') + '"/>';
        it('attributeValue_compact_false', 0, () => {
            expect(convert.js2xml(attributeValue_compact_false_js, {
                compact: false, attributeValueFn: manipulate
            })).assertEqual(attributeValue_compact_false_xml);
        });
        it('attributeValue_compact_false_should_provide_correct_arguments', 0, () => {
            expect(args).assertContain('It\'s');
            expect(args).assertContain('y');
            expect(args).assertContain('a');
            expect(args).assertContain(attributeValue_compact_false_js.elements[0]);
        });
        let attributes_compact_false_xml = '<a ' + manipulate('x="1.234" y="It\'s"') + '/>';
        it('attributes_compact_false', 0, () => {
            expect(convert.js2xml(attributes_compact_false_js, {
                compact: false, attributesFn: manipulateAttribute
            })).assertEqual(attributes_compact_false_xml);
        });
        it('attributes_compact_false_should_provide_correct_arguments', 0, () => {
            // expect(JSON.stringify(args["0"])).assertContain(`{"X":"1.234","Y":"IT'S"}`);
            expect(JSON.stringify(args["1"])).assertContain("a");
            expect(JSON.stringify(args)).assertContain(JSON.stringify(attributes_compact_false_js.elements[0]));
        });
        let doctype_compact_true_xml = '<!DOCTYPE ' + manipulate('note [\n<!ENTITY foo "baa">]') + '>';
        it('doctype_compact_true', 0, () => {
            expect(convert.js2xml(doctype_compact_true_js, {
                compact: true, doctypeFn: manipulate
            })).assertEqual(doctype_compact_true_xml);
        });
        it('doctype_compact_true_should_provide_correct_arguments', 0, () => {
            expect(args).assertContain('note [\n<!ENTITY foo "baa">]');
            expect(args).assertContain('_root_');
            expect(args).assertContain(doctype_compact_true_js);
        });
        let instructionFn_compact_true_xml = '<?go ' + manipulate('there') + '?>';
        it('_compact_true', 0, () => {
            expect(convert.js2xml(instructionFn_compact_true_js, {
                compact: true, instructionFn: manipulate
            })).assertEqual(instructionFn_compact_true_xml);
        });
        it('instructionFn_compact_true_should_provide_correct_arguments', 0, () => {
            expect(args).assertContain('there');
            expect(args).assertContain('go');
            expect(args).assertContain('_root_');
            expect(args).assertContain(instructionFn_compact_true_js);
        });
        let CDATA_compact_true_xml = '<![CDATA[' + manipulate(' \t <foo></bar> \t ') + ']]>';
        it('CDATA_compact_true', 0, () => {
            expect(convert.js2xml(CDATA_compact_true_js, {
                compact: true, cdataFn: manipulate
            })).assertEqual(CDATA_compact_true_xml);
        });
        it('CDATA_compact_true_should_provide_correct_arguments', 0, () => {
            expect(args).assertContain(' \t <foo></bar> \t ');
            expect(args).assertContain('_root_');
            expect(args).assertContain(CDATA_compact_true_js);
        });
        let comment_compact_true_xml = '<!--' + manipulate(' \t Hello, World! \t ') + '-->';
        it('comment_compact_true', 0, () => {
            expect(convert.js2xml(comment_compact_true_js, {
                compact: true, commentFn: manipulate
            })).assertEqual(comment_compact_true_xml);
        });
        it('comment_compact_true_should_provide_correct_arguments', 0, () => {
            expect(args).assertContain(' \t Hello, World! \t ');
            expect(args).assertContain('_root_');
            expect(args).assertContain(comment_compact_true_js);
        });
        let text_compact_true_xml = '<a>' + manipulate(' \t Hi \t ') + '</a>';
        it('text_compact_true', 0, () => {
            expect(convert.js2xml(text_compact_true_js, {
                compact: true, textFn: manipulate
            })).assertEqual(text_compact_true_xml);
        });
        it('text_compact_true_should_provide_correct_arguments', 0, () => {
            expect(args).assertContain(' \t Hi \t ');
            expect(args).assertContain('a');
            expect(args).assertContain(text_compact_true_js.a);
        });
        let instruction_compact_true_xml = '<?' + manipulate('go') + ' there?>';
        it('instruction_compact_true', 0, () => {
            expect(convert.js2xml(instruction_compact_true_js, {
                compact: true, instructionNameFn: manipulate
            })).assertEqual(instruction_compact_true_xml);
        });
        it('instruction_compact_true_should_provide_correct_arguments', 0, () => {
            expect(args).assertContain('go');
            expect(args).assertContain('there');
            expect(args).assertContain('_root_');
            expect(args).assertContain(instruction_compact_true_js);
        });
        let elementName_compact_true_xml = '<' + manipulate('a') + ' x="hello"/>';
        it('elementName_compact_true', 0, () => {
            expect(convert.js2xml(elementName_compact_true_js, {
                compact: true, elementNameFn: manipulate
            })).assertEqual(elementName_compact_true_xml);
        });
        it('elementName_compact_true_should_provide_correct_arguments', 0, () => {
            expect(args).assertContain('a');
            expect(args).assertContain(elementName_compact_true_js.a);
        });
        let attributeName_compact_true_xml = '<a ' + manipulate('x') + '="1.234" ' + manipulate('y') + '="It\'s"/>';
        it('attributeName_compact_true', 0, () => {
            expect(convert.js2xml(attributeName_compact_true_js, {
                compact: true, attributeNameFn: manipulate
            })).assertEqual(attributeName_compact_true_xml);
        });
        it('attributeName_compact_true_should_provide_correct_arguments', 0, () => {
            expect(args).assertContain('y');
            expect(args).assertContain('It\'s');
            expect(args).assertContain('a');
            expect(args).assertContain(attributeName_compact_true_js.a);
        });
        let attributeValue_compact_true_xml = '<a x="' + manipulate('1.234') + '" y="' + manipulate('It\'s') + '"/>';
        it('attributeValue_compact_true', 0, () => {
            expect(convert.js2xml(attributeValue_compact_true_js, {
                compact: true, attributeValueFn: manipulate
            })).assertEqual(attributeValue_compact_true_xml);
        });
        it('attributeValue_compact_true_should_provide_correct_arguments', 0, () => {
            expect(args).assertContain('It\'s');
            expect(args).assertContain('y');
            expect(args).assertContain('a');
            expect(args).assertContain(attributeValue_compact_true_js.a);
        });
        let attributes_compact_true_xml = '<a ' + manipulate('x="1.234" y="It\'s"') + '/>';
        it('attributes_compact_true', 0, () => {
            expect(convert.js2xml(attributes_compact_true_js, {
                compact: true, attributesFn: manipulateAttribute
            })).assertEqual(attributes_compact_true_xml);
        });
        it('attributes_compact_true_should_provide_correct_arguments', 0, () => {
            // expect(JSON.stringify(args["0"])).assertContain(`{"X":"1.234","Y":"IT'S"}`);
            expect(JSON.stringify(args["1"])).assertContain("a");
            expect(JSON.stringify(args)).assertContain(JSON.stringify(attributes_compact_true_js.a));
        });
        let fullTagEmptyElement_elements_xml = '<a/><b></b>';
        it('fullTagEmptyElement_elements', 0, () => {
            expect(convert.js2xml(fullTagEmptyElement_elements_js, {
                compact: false, fullTagEmptyElementFn: fullTag
            })).assertEqual(fullTagEmptyElement_elements_xml);
        });
        it('fullTagEmptyElement_elements_should_provide_correct_arguments', 0, () => {
            expect(args).assertContain('b');
            expect(args).assertContain(fullTagEmptyElement_elements_js.elements[1]);
        });
        let fullTagEmptyElement_elements_compact_true_xml = '<a/><b></b>';
        it('fullTagEmptyElement_elements_compact_true', 0, () => {
            expect(convert.js2xml(fullTagEmptyElement_elements_compact_true_js, {
                compact: true, fullTagEmptyElementFn: fullTag
            })).assertEqual(fullTagEmptyElement_elements_compact_true_xml);
        });
        it('fullTagEmptyElement_elements_compact_true_should_provide_correct_arguments', 0, () => {
            expect(args).assertContain('b');
            expect(args).assertContain(fullTagEmptyElement_elements_compact_true_js.b);
        });
    });
}
