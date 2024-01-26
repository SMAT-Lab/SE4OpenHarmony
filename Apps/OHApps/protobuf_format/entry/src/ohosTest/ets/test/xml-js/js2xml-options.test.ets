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
import convert from '@ohos/xml_js'
import testItems from '../../xml_js_util/test-items'
import { describe, expect, it } from '@ohos/hypium'
import buffer from '@ohos.buffer';
import { js2xmlData1, js2xmlData2 } from './XmlJSData'

export default function js2xmlOptionsTest() {
  describe('Js2xmlOptionsTest', () => {
    interface Options {}

    let options: Options = {};
    testItems('js2xml', options).forEach((test: ESObject) => {
      it('No_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, options)).assertEqual(test.xml);
      });
    });

    class DefaultOptions {
      compact: boolean = false;
      spaces: number = 0;
      ignoreText: boolean = false;
      ignoreComment: boolean = false;
      ignoreCdata: boolean = false;
      fullTagEmptyElement: boolean = false;
    }

    let default_options: DefaultOptions = {
      compact: false,
      spaces: 0,
      ignoreText: false,
      ignoreComment: false,
      ignoreCdata: false,
      fullTagEmptyElement: false
    };
    testItems('js2xml', default_options).forEach((test: ESObject) => {
      it('default_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, default_options)).assertEqual(test.xml);
      });
    });

    class Spaces4Options {
      spaces: number = 4;
      onlyItem: number = 8;
    }

    let spaces4_options: Spaces4Options = {
      spaces: 4, onlyItem: 8
    };
    testItems('js2xml', spaces4_options).forEach((test: ESObject) => {
      it('spaces4_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, spaces4_options)).assertEqual(test.xml);
      });
    });

    class Spaces0Options {
      spaces: number = 0;
    }

    let spaces0_options: Spaces0Options = {
      spaces: 0
    };
    testItems('js2xml', spaces0_options).forEach((test: ESObject) => {
      it('spaces0_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, spaces0_options)).assertEqual(test.xml);
      });
    });

    class Spaces0IgnoreTextTrueOptions {
      spaces: number = 0;
      ignoreText: boolean = true;
    }

    let spaces_0_ignoreText_true_options: Spaces0IgnoreTextTrueOptions = {
      spaces: 0, ignoreText: true
    };
    testItems('js2xml', spaces_0_ignoreText_true_options).forEach((test: ESObject) => {
      it('spaces_0_ignoreText_true_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, spaces_0_ignoreText_true_options)).assertEqual(test.xml);
      });
    });

    class Spaces0IgnoreCommentTrueOptions {
      spaces: number = 0;
      ignoreComment: boolean = true;
    }

    let spaces_0_ignoreComment_true_options: Spaces0IgnoreCommentTrueOptions = {
      spaces: 0, ignoreComment: true
    };
    testItems('js2xml', spaces_0_ignoreComment_true_options).forEach((test: ESObject) => {
      it('spaces_0_ignoreComment_true_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, spaces_0_ignoreComment_true_options)).assertEqual(test.xml);
      });
    });

    class Spaces0IgnoreCdataTrueOptions {
      spaces: number = 0;
      ignoreCdata: boolean = true;
    }

    let spaces_0_ignoreCdata_true_options: Spaces0IgnoreCdataTrueOptions = {
      spaces: 0, ignoreCdata: true
    };
    testItems('js2xml', spaces_0_ignoreCdata_true_options).forEach((test: ESObject) => {
      it('spaces_0_ignoreCdata_true_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, spaces_0_ignoreCdata_true_options)).assertEqual(test.xml);
      });
    });

    class Spaces0IgnoreDocTypeTrueOptions {
      spaces: number = 0;
      ignoreDoctype: boolean = true;
    }

    let spaces_0_ignore_Doctype_true_options: Spaces0IgnoreDocTypeTrueOptions = {
      spaces: 0, ignoreDoctype: true
    };
    testItems('js2xml', spaces_0_ignore_Doctype_true_options).forEach((test: ESObject) => {
      it('spaces_0_ignore_Doctype_true_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, spaces_0_ignore_Doctype_true_options)).assertEqual(test.xml);
      });
    });

    class Spaces0IgnoreDeclarationTrueOptions {
      spaces: number = 0;
      ignoreDeclaration: boolean = true;
    }

    let spaces_0_ignoreDeclaration_true_options: Spaces0IgnoreDeclarationTrueOptions = {
      spaces: 0, ignoreDeclaration: true
    };
    testItems('js2xml', spaces_0_ignoreDeclaration_true_options).forEach((test: ESObject) => {
      it('spaces_0_ignoreDeclaration_true_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, spaces_0_ignoreDeclaration_true_options)).assertEqual(test.xml);
      });
    });

    class Spaces0IgnoreInstructionTrueOptions {
      spaces: number = 0;
      ignoreInstruction: boolean = true;
    }

    let spaces_0_ignoreInstruction_true_options: Spaces0IgnoreInstructionTrueOptions = {
      spaces: 0, ignoreInstruction: true
    };
    testItems('js2xml', spaces_0_ignoreInstruction_true_options).forEach((test: ESObject) => {
      it('spaces_0_ignoreInstruction_true_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, spaces_0_ignoreInstruction_true_options)).assertEqual(test.xml);
      });
    });

    class Spaces0FullTagEmptyElementTrueOptions {
      spaces: number = 0;
      fullTagEmptyElement: boolean = true;
    }

    let spaces_0_fullTagEmptyElement_true_options: Spaces0FullTagEmptyElementTrueOptions = {
      spaces: 0, fullTagEmptyElement: true
    };
    testItems('js2xml', spaces_0_fullTagEmptyElement_true_options).forEach((test: ESObject) => {
      it('spaces_0_fullTagEmptyElement_true_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, spaces_0_fullTagEmptyElement_true_options)).assertEqual(test.xml);
      });
    });

    class CompactTrueOptions {
      compact: boolean = true;
      spaces: number = 0;
      ignoreText: boolean = false;
      ignoreComment: boolean = false;
      ignoreCdata: boolean = false;
      fullTagEmptyElement: boolean = false;
    }

    let compact_true_options: CompactTrueOptions = {
      compact: true,
      spaces: 0,
      ignoreText: false,
      ignoreComment: false,
      ignoreCdata: false,
      fullTagEmptyElement: false
    };
    testItems('js2xml', compact_true_options).forEach((test: ESObject) => {
      it('compact_true_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, compact_true_options)).assertEqual(test.xml);
      });
    });

    class CompactTrueSpaces4Options {
      compact: boolean = true;
      spaces: number = 4;
    }

    let compact_true_spaces4_options: CompactTrueSpaces4Options = {
      compact: true, spaces: 4
    };
    testItems('js2xml', compact_true_spaces4_options).forEach((test: ESObject) => {
      it('compact_true_spaces4_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, compact_true_spaces4_options)).assertEqual(test.xml);
      });
    });

    class CompactTrueSpaces0Options {
      compact: boolean = true;
      spaces: number = 0;
    }

    let compact_true_spaces0_options: CompactTrueSpaces0Options = {
      compact: true, spaces: 0
    };
    testItems('js2xml', compact_true_spaces0_options).forEach((test: ESObject) => {
      it('compact_true_spaces0_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, compact_true_spaces0_options)).assertEqual(test.xml);
      });
    });

    class CompactTrueSpaces0IgnoreTextTrueOptions {
      compact: boolean = true;
      spaces: number = 0;
      ignoreText: boolean = true;
    }

    let compact_true_spaces0_ignoreText_true_options: CompactTrueSpaces0IgnoreTextTrueOptions = {
      compact: true, spaces: 0, ignoreText: true
    };
    testItems('js2xml', compact_true_spaces0_ignoreText_true_options).forEach((test: ESObject) => {
      it('compact_true_spaces0_ignoreText_true_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, compact_true_spaces0_ignoreText_true_options)).assertEqual(test.xml);
      });
    });

    class CompactTrueSpaces0IgnoreCommentTrueOptions {
      compact: boolean = true;
      spaces: number = 0;
      ignoreComment: boolean = true;
    }

    let compact_true_spaces0_ignoreComment_true_options: CompactTrueSpaces0IgnoreCommentTrueOptions = {
      compact: true, spaces: 0, ignoreComment: true
    };
    testItems('js2xml', compact_true_spaces0_ignoreComment_true_options).forEach((test: ESObject) => {
      it('compact_true_spaces0_ignoreComment_true_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, compact_true_spaces0_ignoreComment_true_options)).assertEqual(test.xml);
      });
    });

    class CompactTrueSpaces0IgnoreCdataTrueOptions {
      compact: boolean = true;
      spaces: number = 0;
      ignoreCdata: boolean = true;
    }

    let compact_true_spaces0_ignoreCdata_true_options: CompactTrueSpaces0IgnoreCdataTrueOptions = {
      compact: true, spaces: 0, ignoreCdata: true
    };
    testItems('js2xml', compact_true_spaces0_ignoreCdata_true_options).forEach((test: ESObject) => {
      it('compact_true_spaces0_ignoreCdata_true_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, compact_true_spaces0_ignoreCdata_true_options)).assertEqual(test.xml);
      });
    });

    class CompactTrueSpaces0IgnoreDocTypeTrueOptions {
      compact: boolean = true;
      spaces: number = 0;
      ignoreDoctype: boolean = true;
    }

    let compact_true_spaces0_ignore_Doctype_true_options: CompactTrueSpaces0IgnoreDocTypeTrueOptions = {
      compact: true, spaces: 0, ignoreDoctype: true
    };
    testItems('js2xml', compact_true_spaces0_ignore_Doctype_true_options).forEach((test: ESObject) => {
      it('compact_true_spaces0_ignore_Doctype_true_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, compact_true_spaces0_ignore_Doctype_true_options)).assertEqual(test.xml);
      });
    });

    class CompactTrueSpaces0IgnoreDeclarationTrueOptions {
      compact: boolean = true;
      spaces: number = 0;
      ignoreDeclaration: boolean = true;
    }

    let compact_true_spaces0_ignoreDeclaration_true_options: CompactTrueSpaces0IgnoreDeclarationTrueOptions = {
      compact: true, spaces: 0, ignoreDeclaration: true
    };
    testItems('js2xml', compact_true_spaces0_ignoreDeclaration_true_options).forEach((test: ESObject) => {
      it('compact_true_spaces0_ignoreDeclaration_true_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, compact_true_spaces0_ignoreDeclaration_true_options)).assertEqual(test.xml);
      });
    });

    class CompactTrueSpaces0IgnoreInstructionTrueOptions {
      compact: boolean = true;
      spaces: number = 0;
      ignoreInstruction: boolean = true;
    }

    let compact_true_spaces0_ignoreInstruction_true_options: CompactTrueSpaces0IgnoreInstructionTrueOptions = {
      compact: true, spaces: 0, ignoreInstruction: true
    };
    testItems('js2xml', compact_true_spaces0_ignoreInstruction_true_options).forEach((test: ESObject) => {
      it('compact_true_spaces0_ignoreInstruction_true_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, compact_true_spaces0_ignoreInstruction_true_options)).assertEqual(test.xml);
      });
    });

    class CompactTrueSpaces0FullTagEmptyElementTrueOptions {
      compact: boolean = true;
      spaces: number = 0;
      fullTagEmptyElement: boolean = true;
    }

    let compact_true_spaces0_fullTagEmptyElement_true_options: CompactTrueSpaces0FullTagEmptyElementTrueOptions = {
      compact: true, spaces: 0, fullTagEmptyElement: true
    };
    testItems('js2xml', compact_true_spaces0_fullTagEmptyElement_true_options).forEach((test: ESObject) => {
      it('compact_true_spaces0_fullTagEmptyElement_true_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, compact_true_spaces0_fullTagEmptyElement_true_options)).assertEqual(test.xml);
      });
    });


    interface VaryingSpacesOptions {}

    let varying_spaces_options: VaryingSpacesOptions = {};
    testItems('js2xml', varying_spaces_options).forEach((test: ESObject) => {
      it('varying_spaces_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, varying_spaces_options)).assertEqual(test.xml);
      });
    });

    class VaryingSpacesTrueOptions {
      spaces: boolean = true;
    }

    let varying_spaces_true_options: VaryingSpacesTrueOptions = {
      spaces: true
    };
    testItems('js2xml', varying_spaces_true_options).forEach((test: ESObject) => {
      it('varying_spaces_true_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, varying_spaces_true_options)).assertEqual(test.xml);
      });
    });

    class VaryingSpaces2Options {
      spaces: number = 2;
    }

    let varying_spaces2_options: VaryingSpaces2Options = {
      spaces: 2
    };
    testItems('js2xml', varying_spaces2_options).forEach((test: ESObject) => {
      it('varying_spaces2_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, varying_spaces2_options)).assertEqual(test.xml);
      });
    });

    class VaryingSpaces4Options {
      spaces: number = 4
    }

    let varying_spaces4_options: VaryingSpaces4Options = {
      spaces: 4
    };
    testItems('js2xml', varying_spaces4_options).forEach((test: ESObject) => {
      it('varying_spaces4_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, varying_spaces4_options)).assertEqual(test.xml);
      });
    });

    class VaryingSpaces2WhitespacesOptions {
      spaces: string = '  '
    }

    let varying_spaces_2whitespaces_options: VaryingSpaces2WhitespacesOptions = {
      spaces: '  '
    };
    testItems('js2xml', varying_spaces_2whitespaces_options).forEach((test: ESObject) => {
      it('varying_spaces_2whitespaces_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, varying_spaces_2whitespaces_options)).assertEqual(test.xml);
      });
    });

    class VaryingSpacesTOptions {
      spaces: string = '\t'
    }

    let varying_spaces_t_options: VaryingSpacesTOptions = {
      spaces: '\t'
    };
    testItems('js2xml', varying_spaces_t_options).forEach((test: ESObject) => {
      it('varying_spaces_t_options_' + test.desc, 0, () => {
        expect(convert.js2xml(test.js, varying_spaces_t_options)).assertEqual(test.xml);
      });
    });

    interface UsingDefaultOptions {}

    let using_default_options: UsingDefaultOptions = {};
    testItems('js2xml', using_default_options).forEach((test: ESObject) => {
      it('using_default_options_' + test.desc, 0, () => {
        expect(convert.json2xml(JSON.stringify(test.js), using_default_options)).assertEqual(test.xml);
      });
    });

    interface SubmittingJsonAsJavascriptObjectOptions {};
    let submitting_json_as_javascript_object_options: SubmittingJsonAsJavascriptObjectOptions = {};
    testItems('js2xml', submitting_json_as_javascript_object_options).forEach((test: ESObject) => {
      it('submitting_json_as_javascript_object_options_' + test.desc, 0, () => {
        expect(convert.json2xml(test.js, submitting_json_as_javascript_object_options)).assertEqual(test.xml);
      });
    });

    it('Write_processing_instruction_attributes_compact_true', 0, () => {
      expect(convert.js2xml(js2xmlData1, {
        compact: true
      })).assertEqual('<?go to="there"?>');
    });

    it('Write_processing_instruction_attributes_compact_false', 0, () => {
      expect(convert.js2xml(js2xmlData2)).assertEqual('<?go to="there"?>');
    });
  });
}