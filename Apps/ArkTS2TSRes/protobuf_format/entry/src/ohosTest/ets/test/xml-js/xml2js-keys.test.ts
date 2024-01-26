let __generate__Id: number = 0;
function generateId(): string {
    return "xml2js-keys.test_" + ++__generate__Id;
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
export default function testingXml2jsKey() {
    describe('TestingXml2jsKey', () => {
        it('baseCase', 0, () => {
        });
        class ChangingOptionsDeclarationKey {
            compact: boolean = false;
            declarationKey: string = '';
        }
        let Changing_options_declarationKey: ChangingOptionsDeclarationKey = {
            compact: false, declarationKey: 'declaration'.slice(0, 3)
        };
        testItems('xml2js', Changing_options_declarationKey).forEach((test: any) => {
            it('Changing_options_declarationKey_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, Changing_options_declarationKey)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class ChangingOptionsInstructionKey {
            compact: boolean = false;
            instructionKey: string = '';
        }
        let Changing_options_instructionKey: ChangingOptionsInstructionKey = {
            compact: false, instructionKey: 'instruction'.slice(0, 3)
        };
        testItems('xml2js', Changing_options_instructionKey).forEach((test: any) => {
            it('Changing_options_instructionKey_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, Changing_options_instructionKey)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class ChangingOptionsAttributesKey {
            compact: boolean = false;
            attributesKey: string = '';
        }
        let Changing_options_attributesKey: ChangingOptionsAttributesKey = {
            compact: false, attributesKey: 'attributes'.slice(0, 3)
        };
        testItems('xml2js', Changing_options_attributesKey).forEach((test: any) => {
            it('Changing_options_attributesKey_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, Changing_options_attributesKey)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class ChangingOptionsTextKey {
            compact: boolean = false;
            textKey: string = '';
        }
        let Changing_options_textKey: ChangingOptionsTextKey = {
            compact: false, textKey: 'text'.slice(0, 3)
        };
        testItems('xml2js', Changing_options_textKey).forEach((test: any) => {
            it('Changing_options_textKey_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, Changing_options_textKey))).assertEqual(JSON.stringify(test.js));
            });
        });
        class ChangingOptionsCDataKey {
            compact: boolean = false;
            cdataKey: string = '';
        }
        let Changing_options_cdataKey: ChangingOptionsCDataKey = {
            compact: false, cdataKey: 'cdata'.slice(0, 3)
        };
        testItems('xml2js', Changing_options_cdataKey).forEach((test: any) => {
            it('Changing_options_cdataKey_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, Changing_options_cdataKey)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class ChangingOptionsDocTypeKey {
            compact: boolean = false;
            doctypeKey: string = '';
        }
        let Changing_options_doctype_Key: ChangingOptionsDocTypeKey = {
            compact: false, doctypeKey: 'doctype'.slice(0, 3)
        };
        testItems('xml2js', Changing_options_doctype_Key).forEach((test: any) => {
            it('Changing_options_doctype_Key_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, Changing_options_doctype_Key)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class ChangingOptionsCommentKey {
            compact: boolean = false;
            commentKey: string = '';
        }
        let changing_options_commentKey: ChangingOptionsCommentKey = {
            compact: false, commentKey: 'comment'.slice(0, 3)
        };
        testItems('xml2js', changing_options_commentKey).forEach((test: any) => {
            it('changing_options_commentKey_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, changing_options_commentKey)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class ChangingOptionsParentKey {
            compact: boolean = false;
            parentKey: string = '';
        }
        let changing_options_parentKey: ChangingOptionsParentKey = {
            compact: false, parentKey: 'parent'.slice(0, 3)
        };
        testItems('xml2js', changing_options_parentKey).forEach((test: any) => {
            it('changing_options_parentKey_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, changing_options_parentKey)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class ChangingOptionsTypeKey {
            compact: boolean = false;
            typeKey: string = '';
        }
        let changing_options_typeKey: ChangingOptionsTypeKey = {
            compact: false, typeKey: 'type'.slice(0, 3)
        };
        testItems('xml2js', changing_options_typeKey).forEach((test: any) => {
            it('changing_options_typeKey_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, changing_options_typeKey))).assertEqual(JSON.stringify(test.js));
            });
        });
        class ChangingOptionsNameKey {
            compact: boolean = false;
            nameKey: string = '';
        }
        let changing_options_nameKey: ChangingOptionsNameKey = {
            compact: false, nameKey: 'name'.slice(0, 3)
        };
        testItems('xml2js', changing_options_nameKey).forEach((test: any) => {
            it('changing_options_nameKey_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, changing_options_nameKey))).assertEqual(JSON.stringify(test.js));
            });
        });
        class ChangingOptionsElementsKey {
            compact: boolean = false;
            elementsKey: string = '';
        }
        let changing_options_elementsKey: ChangingOptionsElementsKey = {
            compact: false, elementsKey: 'elements'.slice(0, 3)
        };
        testItems('xml2js', changing_options_elementsKey).forEach((test: any) => {
            it('changing_options_elementsKey_ ' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, changing_options_elementsKey)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class CompactTrueChangingOptionsDeclarationKey {
            compact: boolean = true;
            declarationKey: string = '';
        }
        let compact_true_changing_options_declarationKey: CompactTrueChangingOptionsDeclarationKey = {
            compact: true, declarationKey: 'declaration'.slice(0, 3)
        };
        testItems('xml2js', compact_true_changing_options_declarationKey).forEach((test: any) => {
            it('compact_true_changing_options_declarationKey_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, compact_true_changing_options_declarationKey)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class CompactTrueChangingOptionsInstructionKey {
            compact: boolean = true;
            instructionKey: string = '';
        }
        let compact_true_changing_options_instructionKey: CompactTrueChangingOptionsInstructionKey = {
            compact: true, instructionKey: 'instruction'.slice(0, 3)
        };
        testItems('xml2js', compact_true_changing_options_instructionKey).forEach((test: any) => {
            it('compact_true_changing_options_instructionKey_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, compact_true_changing_options_instructionKey)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class CompactTrueChangingOptionsAttributesKey {
            compact: boolean = true;
            attributesKey: string = '';
        }
        let compact_true_changing_options_attributesKey: CompactTrueChangingOptionsAttributesKey = {
            compact: true, attributesKey: 'attributes'.slice(0, 3)
        };
        testItems('xml2js', compact_true_changing_options_attributesKey).forEach((test: any) => {
            it('compact_true_changing_options_attributesKey_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, compact_true_changing_options_attributesKey)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class CompactTrueChangingOptionsTextKey {
            compact: boolean = true;
            textKey: string = '';
        }
        let compact_true_changing_options_textKey: CompactTrueChangingOptionsTextKey = {
            compact: true, textKey: 'text'.slice(0, 3)
        };
        testItems('xml2js', compact_true_changing_options_textKey).forEach((test: any) => {
            it('compact_true_changing_options_textKey_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, compact_true_changing_options_textKey)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class CompactTrueChangingOptionsCDataKey {
            compact: boolean = true;
            cdataKey: string = '';
        }
        let compact_true_changing_options_cdata_key: CompactTrueChangingOptionsCDataKey = {
            compact: true, cdataKey: 'cdata'.slice(0, 3)
        };
        testItems('xml2js', compact_true_changing_options_cdata_key).forEach((test: any) => {
            it('compact_true_changing_options_cdata_key_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, compact_true_changing_options_cdata_key)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class CompactTrueChangingOptionsDocTypeKey {
            compact: boolean = true;
            doctypeKey: string = '';
        }
        let compact_true_changing_options_doctype_key: CompactTrueChangingOptionsDocTypeKey = {
            compact: true, doctypeKey: 'doctype'.slice(0, 3)
        };
        testItems('xml2js', compact_true_changing_options_doctype_key).forEach((test: any) => {
            it('compact_true_changing_options_doctype_key_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, compact_true_changing_options_doctype_key)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class CompactTrueChangingOptionsCommentKey {
            compact: boolean = true;
            commentKey: string = '';
        }
        let compact_true_changing_options_comment_key: CompactTrueChangingOptionsCommentKey = {
            compact: true, commentKey: 'comment'.slice(0, 3)
        };
        testItems('xml2js', compact_true_changing_options_comment_key).forEach((test: any) => {
            it('compact_true_changing_options_comment_key_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, compact_true_changing_options_comment_key)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class CompactTrueChangingOptionsParentKey {
            compact: boolean = true;
            parentKey: string = '';
        }
        let compact_true_changing_options_parent_key: CompactTrueChangingOptionsParentKey = {
            compact: true, parentKey: 'parent'.slice(0, 3)
        };
        testItems('xml2js', compact_true_changing_options_parent_key).forEach((test: any) => {
            it('compact_true_changing_options_parent_key_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, compact_true_changing_options_parent_key)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class CompactTrueChangingOptionsTypeKey {
            compact: boolean = true;
            typeKey: string = '';
        }
        let compact_true_changing_options_type_key: CompactTrueChangingOptionsTypeKey = {
            compact: true, typeKey: 'type'.slice(0, 3)
        };
        testItems('xml2js', compact_true_changing_options_type_key).forEach((test: any) => {
            it('compact_true_changing_options_type_key_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, compact_true_changing_options_type_key)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class CompactTrueChangingOptionsNameKey {
            compact: boolean = true;
            nameKey: string = '';
        }
        let compact_true_changing_options_name_key: CompactTrueChangingOptionsNameKey = {
            compact: true, nameKey: 'name'.slice(0, 3)
        };
        testItems('xml2js', compact_true_changing_options_name_key).forEach((test: any) => {
            it('compact_true_changing_options_name_key_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, compact_true_changing_options_name_key)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
        class CompactTrueChangingOptionsElementsKey {
            compact: boolean = true;
            elementsKey: string = '';
        }
        let compact_true_changing_options_elements_key: CompactTrueChangingOptionsElementsKey = {
            compact: true, elementsKey: 'elements'.slice(0, 3)
        };
        testItems('xml2js', compact_true_changing_options_elements_key).forEach((test: any) => {
            it('compact_true_changing_options_elements_key_' + test.desc, 0, () => {
                expect(JSON.stringify(convert.xml2js(test.xml, compact_true_changing_options_elements_key)))
                    .assertEqual(JSON.stringify(test.js));
            });
        });
    });
}
