let __generate__Id: number = 0;
function generateId(): string {
    return "xml2js-callbacks.test_" + ++__generate__Id;
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
import testItems from '../../xml_js_util/test-items';
import { describe, expect, it } from '@ohos/hypium';
let args: any;
function manipulate(val: string) {
    args = arguments;
    args[0] = val.toUpperCase();
    return val.toUpperCase();
}
function manipulateAttribute(obj: any): any {
    args = arguments;
    let key: string = '';
    let temp: string = '';
    let objKeys = Object.keys(obj);
    for (let i = 0; i < objKeys.length; i++) {
        try {
            key = objKeys[i];
            temp = obj[key];
            obj[key] = null;
            obj[key.toUpperCase()] = temp.toUpperCase();
        }
        catch (e) {
        }
    }
    return obj;
}
export default function testingXml2js() {
    describe('testingXml2js', () => {
        it('baseCase', 0, () => {
        });
        class DocTypeOptions {
            compact: boolean = false;
            doctypeFn: Function = manipulate;
        }
        let doctype_options: DocTypeOptions = {
            compact: false, doctypeFn: manipulate
        };
        testItems('xml2js', doctype_options).forEach((test: any) => {
            it('doctype_options_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, doctype_options))).assertEqual(JSON.stringify(test.js));
            });
            if (test.js.elements && test.js.elements[0].doctype) {
                it('doctype_options_should_provide_correct_arguments', 0, () => {
                    expect(JSON.stringify(args))
                        .assertContain(JSON.stringify(test.js.elements[test.js.elements.length - 1].doctype));
                    expect(JSON.stringify(args)).assertContain(JSON.stringify(test.js));
                });
            }
        });
        class InstructionOptions {
            compact: boolean = false;
            instructionFn: Function = manipulate;
        }
        let instruction_options: InstructionOptions = {
            compact: false, instructionFn: manipulate
        };
        testItems('xml2js', instruction_options).forEach((test: any) => {
            it('instruction_options_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, instruction_options))).assertEqual(JSON.stringify(test.js));
                // console.log(JSON.stringify(convert.xml2js(test.xml, options)));
            });
            if (test.js.elements && test.js.elements[0].instruction) {
                it('instruction_options_should_provide_correct_arguments', 0, () => {
                    expect(JSON.stringify(args))
                        .assertContain(JSON.stringify(test.js.elements[test.js.elements.length - 1].instruction));
                    expect(JSON.stringify(args)).assertContain(JSON.stringify(test.js));
                    // console.log(JSON.stringify(args), '---------', test.js.elements[0].instruction);
                });
            }
        });
        class CDataOptions {
            compact: boolean = false;
            cdataFn: Function = manipulate;
        }
        let cdata_options: CDataOptions = {
            compact: false, cdataFn: manipulate
        };
        testItems('xml2js', cdata_options).forEach((test: any) => {
            it('cdata_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, cdata_options))).assertEqual(JSON.stringify(test.js));
            });
            if (test.js.elements && test.js.elements[0].cdata) {
                it('cdata_should_provide_correct_arguments', 0, () => {
                    expect(JSON.stringify(args)).assertContain(JSON.stringify(test.js.elements[test.js.elements.length - 1].cdata));
                    expect(JSON.stringify(args)).assertContain(JSON.stringify(test.js));
                });
            }
        });
        class CommentOptions {
            compact: boolean = false;
            commentFn: Function = manipulate;
        }
        let comment_options: CommentOptions = {
            compact: false, commentFn: manipulate
        };
        testItems('xml2js', comment_options).forEach((test: any) => {
            it('comment_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, comment_options))).assertEqual(JSON.stringify(test.js));
            });
            if (test.js.elements && test.js.elements[0].comment) {
                it('comment_should_provide_correct_arguments', 0, () => {
                    expect(JSON.stringify(args))
                        .assertContain(JSON.stringify(test.js.elements[test.js.elements.length - 1].comment));
                    expect(JSON.stringify(args)).assertContain(JSON.stringify(test.js));
                });
            }
        });
        class TextOptions {
            compact: boolean = false;
            textFn: Function = manipulate;
        }
        let text_options: TextOptions = {
            compact: false, textFn: manipulate
        };
        testItems('xml2js', text_options).forEach((test: any) => {
            it('text_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, text_options))).assertEqual(JSON.stringify(test.js));
            });
            if (test.js.elements && test.js.elements[0].text) {
                it('text_should_provide_correct_arguments', 0, () => {
                    expect(JSON.stringify(args)).assertContain(JSON.stringify(test.js.elements[test.js.elements.length - 1].text));
                    expect(JSON.stringify(args)).assertContain(JSON.stringify(test.js));
                });
            }
        });
        class InstructionNameOptions {
            compact: boolean = false;
            instructionNameFn: Function = manipulate;
        }
        let instructionName_options: InstructionNameOptions = {
            compact: false, instructionNameFn: manipulate
        };
        testItems('xml2js', instructionName_options).forEach((test: any) => {
            it('instructionName_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, instructionName_options))).assertEqual(JSON.stringify(test.js));
            });
            if (test.js.elements && test.js.elements[0].instruction) {
                it('instructionName_should_provide_correct_arguments', 0, () => {
                    expect(JSON.stringify(args)).assertContain(JSON.stringify(test.js.elements[test.js.elements.length - 1].name));
                    expect(JSON.stringify(args)).assertContain(JSON.stringify(test.js));
                });
            }
        });
        class ElementNameOptions {
            compact: boolean = false;
            elementNameFn: Function = manipulate;
        }
        let elementName_options: ElementNameOptions = {
            compact: false, elementNameFn: manipulate
        };
        testItems('xml2js', elementName_options).forEach((test: any) => {
            it('elementName_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, elementName_options))).assertEqual(JSON.stringify(test.js));
            });
            if (test.js.elements && test.js.elements[test.js.elements.length - 1].type === 'element' && !test.js.elements[test.js.elements.length - 1].elements) {
                it('elementName_should_provide_correct_arguments', 0, () => {
                    expect(JSON.stringify(args)).assertContain(JSON.stringify(test.js.elements[test.js.elements.length - 1].name));
                    expect(JSON.stringify(args)).assertContain(JSON.stringify(test.js));
                });
            }
        });
        class AttributeNameOptions {
            compact: boolean = false;
            attributeNameFn: Function = manipulate;
        }
        let attributeName_options: AttributeNameOptions = {
            compact: false, attributeNameFn: manipulate
        };
        testItems('xml2js', attributeName_options).forEach((test: any) => {
            it('attributeName_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, attributeName_options))).assertEqual(JSON.stringify(test.js));
            });
        });
        class AttributeValueOptions {
            compact: boolean = false;
            attributeValueFn: Function = manipulate;
        }
        let attributeValue_options: AttributeValueOptions = {
            compact: false, attributeValueFn: manipulate
        };
        testItems('xml2js', attributeValue_options).forEach((test: any) => {
            it('attributeValue_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, attributeValue_options))).assertEqual(JSON.stringify(test.js));
            });
        });
        class AttributesOptions {
            compact: boolean = false;
            attributesFn: Function = manipulateAttribute;
        }
        let attributes_options: AttributesOptions = {
            compact: false, attributesFn: manipulateAttribute
        };
        testItems('xml2js', attributes_options).forEach((test: any) => {
            it('attributes_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, attributes_options))).assertEqual(JSON.stringify(test.js));
            });
            if (test.js.elements && test.js.elements[test.js.elements.length - 1].attributes) {
                it('attributes_should_provide_correct_arguments', 0, () => {
                    expect(JSON.stringify(args))
                        .assertContain(JSON.stringify(test.js.elements[test.js.elements.length - 1].attributes));
                    expect(JSON.stringify(args)).assertContain(JSON.stringify(test.js));
                });
            }
        });
        class CompactFalseOptions {
            compact: boolean = false;
            doctypeFn: Function = manipulate;
            instructionFn: Function = manipulate;
            cdataFn: Function = manipulate;
            commentFn: Function = manipulate;
            textFn: Function = manipulate;
        }
        let compact_false_options: CompactFalseOptions = {
            compact: false,
            doctypeFn: manipulate,
            instructionFn: manipulate,
            cdataFn: manipulate,
            commentFn: manipulate,
            textFn: manipulate
        };
        testItems('xml2js', compact_false_options).forEach((test: any) => {
            it('compact_false_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, compact_false_options))).assertEqual(JSON.stringify(test.js));
            });
        });
        class CompactFalseOptions2 {
            compact: boolean = false;
            instructionNameFn: Function = manipulate;
            elementNameFn: Function = manipulate;
            attributeNameFn: Function = manipulate;
            attributeValueFn: Function = manipulate;
        }
        let compact_false_options2: CompactFalseOptions2 = {
            compact: false,
            instructionNameFn: manipulate,
            elementNameFn: manipulate,
            attributeNameFn: manipulate,
            attributeValueFn: manipulate
        };
        testItems('xml2js', compact_false_options2).forEach((test: any) => {
            it('compact_false_options2_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, compact_false_options2))).assertEqual(JSON.stringify(test.js));
            });
        });
        class DocTypeCallbackOptions {
            compact: boolean = true;
            doctypeFn: Function = manipulate;
        }
        let doctype_callback_options: DocTypeCallbackOptions = {
            compact: true, doctypeFn: manipulate
        };
        testItems('xml2js', doctype_callback_options).forEach((test: any) => {
            it('doctype_callback_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, doctype_callback_options))).assertEqual(JSON.stringify(test.js));
            });
            if (test.js._doctype) {
                it('doctype_callback_should_provide_correct_arguments', 0, () => {
                    expect(JSON.stringify(args))
                        .assertContain(JSON.stringify(test.js._doctype instanceof Array ? test.js._doctype[1] : test.js._doctype));
                    expect(JSON.stringify(args)).assertContain(JSON.stringify(test.js));
                });
            }
        });
        class InstructionCallbackOptions {
            compact: boolean = true;
            instructionFn: Function = manipulate;
        }
        let instruction_callback_options: InstructionCallbackOptions = {
            compact: true, instructionFn: manipulate
        };
        testItems('xml2js', instruction_callback_options).forEach((test: any) => {
            it('instruction_callback_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, instruction_callback_options)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class CDataCallbackOptions {
            compact: boolean = true;
            cdataFn: Function = manipulate;
        }
        let cdata_callback_options: CDataCallbackOptions = {
            compact: true, cdataFn: manipulate
        };
        testItems('xml2js', cdata_callback_options).forEach((test: any) => {
            it('cdata_callback_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, cdata_callback_options))).assertEqual(JSON.stringify(test.js));
            });
            if (test.js._cdata) {
                it('cdata_callback_should_provide_correct_arguments', 0, () => {
                    expect(JSON.stringify(args))
                        .assertContain(JSON.stringify(test.js._cdata instanceof Array ? test.js._cdata[1] : test.js._cdata));
                    expect(JSON.stringify(args)).assertContain(JSON.stringify(test.js));
                });
            }
        });
        class CommentCallbackOptions {
            compact: boolean = true;
            commentFn: Function = manipulate;
        }
        let comment_callback_options: CommentCallbackOptions = {
            compact: true, commentFn: manipulate
        };
        testItems('xml2js', comment_callback_options).forEach((test: any) => {
            it('comment_callback_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, comment_callback_options))).assertEqual(JSON.stringify(test.js));
            });
            if (test.js._comment) {
                it('comment_callback_should_provide_correct_arguments', 0, () => {
                    expect(JSON.stringify(args))
                        .assertContain(JSON.stringify(test.js._comment instanceof Array ? test.js._comment[1] : test.js._comment));
                    expect(JSON.stringify(args)).assertContain(JSON.stringify(test.js));
                });
            }
        });
        class TextCallbackOptions {
            compact: boolean = true;
            textFn: Function = manipulate;
        }
        let text_callback_options: TextCallbackOptions = {
            compact: true, textFn: manipulate
        };
        testItems('xml2js', text_callback_options).forEach((test: any) => {
            it('text_callback_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, text_callback_options))).assertEqual(JSON.stringify(test.js));
            });
            if (test.js.a && test.js.a._text) {
                it('text_callback_should_provide_correct_arguments', 0, () => {
                    expect(JSON.stringify(args)).assertContain(JSON.stringify(test.js.a._text));
                    expect(JSON.stringify(args)).assertContain(JSON.stringify(test.js.a));
                });
            }
        });
        class InstructionNameCallbackOptions {
            compact: boolean = true;
            instructionNameFn: Function = manipulate;
        }
        let instructionName_callback_options: InstructionNameCallbackOptions = {
            compact: true, instructionNameFn: manipulate
        };
        testItems('xml2js', instructionName_callback_options).forEach((test: any) => {
            it('instructionName_callback_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, instructionName_callback_options)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class ElementNameCallbackOptions {
            compact: boolean = true;
            elementNameFn: Function = manipulate;
        }
        let elementName_callback_options: ElementNameCallbackOptions = {
            compact: true, elementNameFn: manipulate
        };
        testItems('xml2js', elementName_callback_options).forEach((test: any) => {
            it('elementName_callback_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, elementName_callback_options)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class AttributeNameCallbackOptions {
            compact: boolean = true;
            attributeNameFn: Function = manipulate;
        }
        let attributeName_callback_options: AttributeNameCallbackOptions = {
            compact: true, attributeNameFn: manipulate
        };
        testItems('xml2js', attributeName_callback_options).forEach((test: any) => {
            it('attributeName_callback_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, attributeName_callback_options)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class AttributeValueCallbackOptions {
            compact: boolean = true;
            attributeValueFn: Function = manipulate;
        }
        let attributeValue_callback_options: AttributeValueCallbackOptions = {
            compact: true, attributeValueFn: manipulate
        };
        testItems('xml2js', attributeValue_callback_options).forEach((test: any) => {
            it('attributeValue_callback_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, attributeValue_callback_options)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class AttributesCallbackOptions {
            compact: boolean = true;
            attributesFn: Function = manipulateAttribute;
        }
        let attributes_callback_options: AttributesCallbackOptions = {
            compact: true, attributesFn: manipulateAttribute
        };
        testItems('xml2js', attributes_callback_options).forEach((test: any) => {
            it('attributes_callback_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, attributes_callback_options)))
                    .assertEqual(JSON.stringify(test.js));
            });
            if (test.js.a && test.js.a._attributes) {
                it('attributes_callback_should_provide_correct_arguments', 0, () => {
                    expect(JSON.stringify(args)).assertContain(JSON.stringify(test.js.a._attributes));
                    expect(JSON.stringify(args)).assertContain(JSON.stringify(test.js));
                });
            }
        });
        class CompactTrueOptions {
            compact: boolean = true;
            doctypeFn: Function = manipulate;
            instructionFn: Function = manipulate;
            cdataFn: Function = manipulate;
            commentFn: Function = manipulate;
            textFn: Function = manipulate;
        }
        let compact_true_options: CompactTrueOptions = {
            compact: true,
            doctypeFn: manipulate,
            instructionFn: manipulate,
            cdataFn: manipulate,
            commentFn: manipulate,
            textFn: manipulate
        };
        testItems('xml2js', compact_true_options).forEach((test: any) => {
            it('compact_true_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, compact_true_options))).assertEqual(JSON.stringify(test.js));
            });
        });
        class CompactTrueOptions2 {
            compact: boolean = true;
            instructionNameFn: Function = manipulate;
            elementNameFn: Function = manipulate;
            attributeNameFn: Function = manipulate;
            attributeValueFn: Function = manipulate;
        }
        let compact_true_options2: CompactTrueOptions2 = {
            compact: true,
            instructionNameFn: manipulate,
            elementNameFn: manipulate,
            attributeNameFn: manipulate,
            attributeValueFn: manipulate
        };
        testItems('xml2js', compact_true_options2).forEach((test: any) => {
            it('compact_true2_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, compact_true_options2))).assertEqual(JSON.stringify(test.js));
            });
        });
    });
}
