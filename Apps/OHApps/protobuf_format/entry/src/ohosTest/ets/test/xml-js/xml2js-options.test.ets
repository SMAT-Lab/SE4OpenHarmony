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
import {
  Xml2JsData1,
  Xml2JsData2,
  Xml2JsData3,
  Xml2JsData4,
  Xml2JsData5,
  Xml2JsData6,
  Xml2JsData7,
  Xml2JsData8,
  xml_js_issue_3_json,
  xml_js_issue_26_js,
  xml_js_issue_26_js2,
  xml_js_issue_29_js,
  xml_js_issue_34_js
} from './XmlJSData'

export default function testingXml2jsOptions() {
  describe('TestingXml2jsOptions', () => {
    it('baseCase', 0, () => {

    })

    interface Options {}

    let options: Options = {};
    testItems('xml2js', options).forEach((test: ESObject) => {
      it('no_options_supplied' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, options))).assertEqual(JSON.stringify(test.js));
      });
    });

    class CompactFalseDefaultOptions {
      singleLine?: boolean;
      compact?: boolean;
      trim?: boolean;
      sanitize?: boolean;
      nativeType?: boolean;
      alwaysChildren?: boolean;
      addParent?: boolean;
      nativeTypeAttributes?: boolean;
      ignoreText?: boolean;
      ignoreComment?: boolean;
      ignoreCdata?: boolean;
      ignoreDoctype?: boolean;
      ignoreDeclaration?: boolean;
      ignoreInstruction?: boolean;
      alwaysArray?: string[] | boolean;
      spaces?: number | boolean | string;
      instructionHasAttributes?: boolean;
      onlyItem?: number;
    }

    let compact_false_default_options: CompactFalseDefaultOptions = {
      singleLine: false,
      compact: false,
      trim: false,
      sanitize: false,
      nativeType: false,
      alwaysChildren: false,
      addParent: false
    };
    testItems('xml2js', compact_false_default_options).forEach((test: ESObject) => {
      it('compact_false_default_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_false_default_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_false_options: CompactFalseDefaultOptions = {
      compact: false
    };
    testItems('xml2js', compact_false_options).forEach((test: ESObject) => {
      it('compact_false_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_false_options))).assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_false_trim_true_options: CompactFalseDefaultOptions = {
      compact: false, trim: true
    };
    testItems('xml2js', compact_false_trim_true_options).forEach((test: ESObject) => {
      it('compact_false_trim_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_false_trim_true_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_false_sanitize_true_options: CompactFalseDefaultOptions = {
      compact: false, sanitize: true
    };
    testItems('xml2js', compact_false_sanitize_true_options).forEach((test: ESObject) => {
      it('compact_false_sanitize_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_false_sanitize_true_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_false_nativeType_true_options: CompactFalseDefaultOptions = {
      compact: false, nativeType: true
    };
    testItems('xml2js', compact_false_nativeType_true_options).forEach((test: ESObject) => {
      it('compact_false_nativeType_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_false_nativeType_true_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_false_nativeTypeAttributes_true_options: CompactFalseDefaultOptions = {
      compact: false, nativeTypeAttributes: true
    };
    testItems('xml2js', compact_false_nativeTypeAttributes_true_options).forEach((test: ESObject) => {
      it('compact_false_nativeTypeAttributes_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_false_nativeTypeAttributes_true_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_false_alwaysChildren_true_options: CompactFalseDefaultOptions = {
      compact: false, alwaysChildren: true
    };
    testItems('xml2js', compact_false_alwaysChildren_true_options).forEach((test: ESObject) => {
      it('compact_false_alwaysChildren_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_false_alwaysChildren_true_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_false_addParent_true_options: CompactFalseDefaultOptions = {
      compact: false, addParent: true
    };
    testItems('xml2js', compact_false_addParent_true_options).forEach((test: ESObject) => {
      it('compact_false_addParent_true_options_' + test.desc, 0, () => {
        expect(!!(convert.xml2js(test.xml, compact_false_addParent_true_options))).assertTrue();
      });
    });


    let compact_false_ignoreText_true_options: CompactFalseDefaultOptions = {
      compact: false, ignoreText: true
    };
    testItems('xml2js', compact_false_ignoreText_true_options).forEach((test: ESObject) => {
      it('compact_false_ignoreText_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_false_ignoreText_true_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_false_ignoreComment_true_options: CompactFalseDefaultOptions = {
      compact: false, ignoreComment: true
    };
    testItems('xml2js', compact_false_ignoreComment_true_options).forEach((test: ESObject) => {
      it('compact_false_ignoreComment_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_false_ignoreComment_true_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_false_ignoreCdata_true_options: CompactFalseDefaultOptions = {
      compact: false, ignoreCdata: true
    };
    testItems('xml2js', compact_false_ignoreCdata_true_options).forEach((test: ESObject) => {
      it('compact_false_ignoreCdata_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_false_ignoreCdata_true_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_false_ignoreDoctype_true_options: CompactFalseDefaultOptions = {
      compact: false, ignoreDoctype: true
    };
    testItems('xml2js', compact_false_ignoreDoctype_true_options).forEach((test: ESObject) => {
      it('compact_false_ignoreDoctype_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_false_ignoreDoctype_true_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_false_ignoreDeclaration_true_options: CompactFalseDefaultOptions = {
      compact: false, ignoreDeclaration: true
    };
    testItems('xml2js', compact_false_ignoreDeclaration_true_options).forEach((test: ESObject) => {
      it('compact_false_ignoreDeclaration_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_false_ignoreDeclaration_true_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_false_ignoreInstruction_true_options: CompactFalseDefaultOptions = {
      compact: false, ignoreInstruction: true
    };
    testItems('xml2js', compact_false_ignoreInstruction_true_options).forEach((test: ESObject) => {
      it('compact_false_ignoreInstruction_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_false_ignoreInstruction_true_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_true_default_options: CompactFalseDefaultOptions = {
      compact: true,
      trim: false,
      sanitize: false,
      nativeType: false,
      alwaysChildren: false,
      addParent: false
    };
    testItems('xml2js', compact_true_default_options).forEach((test: ESObject) => {
      it('compact_true_default_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_true_default_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_true_options: CompactFalseDefaultOptions = {
      compact: true
    };
    testItems('xml2js', compact_true_options).forEach((test: ESObject) => {
      it('compact_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_true_options))).assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_true_trim_true_options: CompactFalseDefaultOptions = {
      compact: true, trim: true
    };
    testItems('xml2js', compact_true_trim_true_options).forEach((test: ESObject) => {
      it('compact_true_trim_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_true_trim_true_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_true_sanitize_true_options: CompactFalseDefaultOptions = {
      compact: true, sanitize: true
    };
    testItems('xml2js', compact_true_sanitize_true_options).forEach((test: ESObject) => {
      it('compact_true_sanitize_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_true_sanitize_true_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_true_alwaysArray_true_options: CompactFalseDefaultOptions = {
      compact: true, alwaysArray: true
    };
    testItems('xml2js', compact_true_alwaysArray_true_options).forEach((test: ESObject) => {
      it('compact_true_alwaysArray_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_true_alwaysArray_true_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_true_alwaysArray_options: CompactFalseDefaultOptions = {
      compact: true, alwaysArray: ['a', 'c']
    };
    testItems('xml2js', compact_true_alwaysArray_options).forEach((test: ESObject) => {
      it('compact_true_alwaysArray_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_true_alwaysArray_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_true_addParent_true_options: CompactFalseDefaultOptions = {
      compact: true, addParent: true
    };
    testItems('xml2js', compact_true_addParent_true_options).forEach((test: ESObject) => {
      it('compact_true_addParent_true_options_' + test.desc, 0, () => {
        expect(!!convert.xml2js(test.xml, compact_true_addParent_true_options)).assertTrue();
      });
    });

    let compact_true_ignoreText_true_options: CompactFalseDefaultOptions = {
      compact: true, ignoreText: true
    };
    testItems('xml2js', compact_true_ignoreText_true_options).forEach((test: ESObject) => {
      it('compact_true_ignoreText_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_true_ignoreText_true_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });


    let compact_true_ignoreComment_true_options: CompactFalseDefaultOptions = {
      compact: true, ignoreComment: true
    };
    testItems('xml2js', compact_true_ignoreComment_true_options).forEach((test: ESObject) => {
      it('compact_true_ignoreComment_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_true_ignoreComment_true_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_true_ignoreCdata_true_options: CompactFalseDefaultOptions = {
      compact: true, ignoreCdata: true
    };
    testItems('xml2js', compact_true_ignoreCdata_true_options).forEach((test: ESObject) => {
      it('compact_true_ignoreCdata_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_true_ignoreCdata_true_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_true_ignoreDoctype_true_options: CompactFalseDefaultOptions = {
      compact: true, ignoreDoctype: true
    };
    testItems('xml2js', compact_true_ignoreDoctype_true_options).forEach((test: ESObject) => {
      it('compact_true_ignoreDoctype_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_true_ignoreDoctype_true_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_true_ignoreDeclaration_true_options: CompactFalseDefaultOptions = {
      compact: true, ignoreDeclaration: true
    };
    testItems('xml2js', compact_true_ignoreDeclaration_true_options).forEach((test: ESObject) => {
      it('compact_true_ignoreDeclaration_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_true_ignoreDeclaration_true_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_true_ignoreInstruction_true_options: CompactFalseDefaultOptions = {
      compact: true, ignoreInstruction: true
    };
    testItems('xml2js', compact_true_ignoreInstruction_true_options).forEach((test: ESObject) => {
      it('compact_true_ignoreInstruction_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, compact_true_ignoreInstruction_true_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let varying_spaces_options: CompactFalseDefaultOptions = {};
    testItems('xml2js', varying_spaces_options).forEach((test: ESObject) => {
      it('varying_spaces_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, varying_spaces_options))).assertEqual(JSON.stringify(test.js));
      });
    });

    let varying_spaces_true_options: CompactFalseDefaultOptions = {
      spaces: true
    };
    testItems('xml2js', varying_spaces_true_options).forEach((test: ESObject) => {
      it('varying_spaces_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, varying_spaces_true_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let varying_spaces2_options: CompactFalseDefaultOptions = {
      spaces: 2
    };
    testItems('xml2js', varying_spaces2_options).forEach((test: ESObject) => {
      it('varying_spaces2_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, varying_spaces2_options))).assertEqual(JSON.stringify(test.js));
      });
    });

    let varying_spaces4_options: CompactFalseDefaultOptions = {
      spaces: 4
    };
    testItems('xml2js', varying_spaces4_options).forEach((test: ESObject) => {
      it('varying_spaces4_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, varying_spaces4_options))).assertEqual(JSON.stringify(test.js));
      });
    });

    let varying_spaces_whitespace_options: CompactFalseDefaultOptions = {
      spaces: '  '
    };
    testItems('xml2js', varying_spaces_whitespace_options).forEach((test: ESObject) => {
      it('varying_spaces_whitespace_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, varying_spaces_whitespace_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let varying_spaces_t_options: CompactFalseDefaultOptions = {
      spaces: '\t'
    };
    testItems('xml2js', varying_spaces_t_options).forEach((test: ESObject) => {
      it('varying_spaces_t_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, varying_spaces_t_options))).assertEqual(JSON.stringify(test.js));
      });
    });


    let various_trim_true_options: CompactFalseDefaultOptions = {
      trim: true
    };
    testItems('xml2js', various_trim_true_options).forEach((test: ESObject) => {
      it('various_trim_true_options_' + test.desc, 0, () => {
        expect(JSON.stringify(convert.xml2js(test.xml, various_trim_true_options)))
          .assertEqual(JSON.stringify(test.js));
      });
    });

    let various_nativeType_true_options: CompactFalseDefaultOptions = {
      nativeType: true
    };

    it('various_nativeType_true_options_parse_number', 0, () => {
      expect(JSON.stringify(convert.xml2js('<a>123</a>', various_nativeType_true_options)))
        .assertEqual(JSON.stringify(Xml2JsData1));
    });
    it('various_nativeType_true_options_parse_true', 0, () => {
      expect(JSON.stringify(convert.xml2js('<a>true</a>', various_nativeType_true_options)))
        .assertEqual(JSON.stringify(Xml2JsData2));
    });
    it('various_nativeType_true_options_parse_false', 0, () => {
      expect(JSON.stringify(convert.xml2js('<a>false</a>', various_nativeType_true_options)))
        .assertEqual(JSON.stringify(Xml2JsData3));
    });

    let various_nativeTypeAttributes_true_options: CompactFalseDefaultOptions = {
      nativeTypeAttributes: true
    };

    it('various_nativeTypeAttributes_true_options_parse_number', 0, () => {
      expect(JSON.stringify(convert.xml2js('<a data-value="123"></a>', various_nativeTypeAttributes_true_options)))
        .assertEqual(JSON.stringify(Xml2JsData4));
    });
    it('various_nativeTypeAttributes_true_options_parse_true', 0, () => {
      expect(JSON.stringify(convert.xml2js('<a data-value="true"></a>', various_nativeTypeAttributes_true_options)))
        .assertEqual(JSON.stringify(Xml2JsData5));
    });
    it('various_nativeTypeAttributes_true_options_parse_false', 0, () => {
      expect(JSON.stringify(convert.xml2js('<a data-value="false"></a>', various_nativeTypeAttributes_true_options)))
        .assertEqual(JSON.stringify(Xml2JsData6));
    });

    let various_instructionHasAttributes_true_options: CompactFalseDefaultOptions = {
      compact: true, instructionHasAttributes: true
    };

    it('various_instructionHasAttributes_true_options_Parse_attributes_in_processing_instruction', 0, () => {
      expect(JSON.stringify(convert.xml2js('<?go to="there"?>', various_instructionHasAttributes_true_options)))
        .assertEqual(JSON.stringify(Xml2JsData7));
    });

    it('various_instructionHasAttributes_true_options_parse_attributes_in_processing_instruction', 0, () => {
      expect(JSON.stringify(convert.xml2js('<?go to="there"?>', {
        instructionHasAttributes: true
      }))).assertEqual(JSON.stringify(Xml2JsData8));
    });

    let xml2json_default_options: CompactFalseDefaultOptions = {};
    testItems('xml2js', xml2json_default_options).forEach((test: ESObject) => {
      it('xml2json_default_options_' + test.desc, 0, () => {
        expect(convert.xml2json(test.xml, xml2json_default_options)).assertEqual(JSON.stringify(test.js));
      });
    });

    let compact_true_addParent_true_options2: CompactFalseDefaultOptions = {
      onlyItem: 6, compact: true, addParent: true
    };
    testItems('xml2js', compact_true_addParent_true_options2).forEach((test: ESObject) => {
      it('compact_true_addParent_true_options2_' + test.desc, 0, () => {
        expect(convert.xml2json(test.xml, compact_true_addParent_true_options2))
          .assertEqual(JSON.stringify(test.js, (k: string, v: string) => {
            return k === '_parent' ? '_' : v;
          }));
      });
    });

    let issue_3_xml =
      '<?xml version="1.0" encoding="utf-8"?>\n' +
      '<dp:ListServicesReply ReturnCode="0" xmlns:dp="http://www.cisco.com/vtg/diagnosticportal">\n' +
      '  <dp:Schema Version="1.0" />\n' +
      '  <dp:ServiceList>\n' +
      '    <dp:Service Name="Cisco ICM usgd1 LoggerA" Description="Provides Call Logging services for Instance usgd1" Status="Running" StartupType="Auto" LogOnAs="****" />\n' +
      '    <dp:Service Name="Cisco ICM Diagnostic Framework" Description="Provides a web-based diagnostic service for Cisco Unified ICM, Contact Center Enterprise application." Status="Running" StartupType="Auto" LogOnAs="LocalSystem" />\n' +
      '  </dp:ServiceList>\n' +
      '</dp:ListServicesReply>';

    it('issue_3_should_output_as_expected_json', 0, () => {
      expect(convert.xml2json(issue_3_xml, {
        compact: true
      })).assertEqual(JSON.stringify(xml_js_issue_3_json));
    });

    let issue_6_xml =
      '<ZohoCreator>\n' +
      '    <applicationslist>\n' +
      '        <application name="testapp">\n' +
      '            <formlist>\n' +
      '                <form name="Untitled_Form">\n' +
      '                    <add>\n' +
      '                        <field name="Subform_Single_Line">\n' +
      '                            <value>BEUHBALUGU</value>\n' +
      '                        </field>\n' +
      '                    </add>\n' +
      '                </form>\n' +
      '                <form name="Untitled_Form">\n' +
      '                    <add>\n' +
      '                        <field name="Subform_Single_Line">\n' +
      '                            <value>IF YOU CAN SEE THIS YOU DESERVE THE SUCC</value>\n' +
      '                        </field>\n' +
      '                    </add>\n' +
      '                </form>\n' +
      '            </formlist>\n' +
      '        </application>\n' +
      '        <application name="derp">\n' +
      '            <formlist></formlist>\n' +
      '        </application>\n' +
      '    </applicationslist>\n' +
      '</ZohoCreator>';

    let issue_6_json: ESObject = convert.xml2json(issue_6_xml, {
      compact: true, spaces: 4
    });

    it('issue_6_should_output_json_and_reverse_it_back_to_xml', 0, () => {
      expect(convert.json2xml(issue_6_json, {
        compact: true, spaces: 4, fullTagEmptyElement: true
      })).assertEqual(issue_6_xml);
    });

    let issue_13_xml = '<!DOCTYPE svc_init SYSTEM "MLP_SVC_INIT_300.DTD" [<!ENTITY % extension SYSTEM "PIF_EXTENSION_100.DTD">%extension;]>';
    let issue_13_json: Record<string, string> = {
      "_doctype": "svc_init SYSTEM \"MLP_SVC_INIT_300.DTD\" [<!ENTITY % extension SYSTEM \"PIF_EXTENSION_100.DTD\">%extension;]"
    };

    it('issue_13_should_output_as_expected_json', 0, () => {
      expect(JSON.stringify(convert.xml2js(issue_13_xml, {
        compact: true
      }))).assertEqual(JSON.stringify(issue_13_json));
    });

    let issue_26_xml =
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<note>\n' +
      '\v<to>xml-js</to>\n' +
      '\v<from>ACraig</from>\n' +
      '\v<heading>Min Example</heading>\n' +
      '\v<body>Here are some characters that get sanitized: " \'</body>\n' +
      '</note>';

    it('issue_26_should_convert_xml_object_to_js_and_back_to_xml_correctly', 0, () => {
      issue_26_xml = issue_26_xml.replace(new RegExp('\v', 'g'), '  ');
      let js_: ESObject = convert.xml2js(issue_26_xml, {
        compact: true
      });
      expect(JSON.stringify(js_)).assertEqual(JSON.stringify(xml_js_issue_26_js));
      expect(convert.js2xml(js_, {
        spaces: 2, compact: true
      })).assertEqual(issue_26_xml);
    });

    let issue_26_xml2 = '<title>Support &amp; resistance</title>';

    it('issue_26_2_should_convert_xml_object_to_js_and_back_to_xml_correctly', 0, () => {
      let js_: ESObject = convert.xml2js(issue_26_xml2);
      expect(JSON.stringify(js_)).assertEqual(JSON.stringify(xml_js_issue_26_js2));
      expect(convert.js2xml(js_)).assertEqual(issue_26_xml2);
    });

    let issue_29_xml = '<outer> This is <inner> some</inner> <inner>Text </inner> </outer>';
    it('issue_29_should_convert_xml_object_to_js_and_back_to_xml_correctly', 0, () => {
      let js_: ESObject = convert.xml2js(issue_29_xml, {
        captureSpacesBetweenElements: true
      });
      expect(JSON.stringify(js_)).assertEqual(JSON.stringify(xml_js_issue_29_js));
      expect(convert.js2xml(js_)).assertEqual(issue_29_xml);
    });
  });

  let issue_34_xml = '<?xml version=\'1.0\' encoding=\'UTF-8\'?>';
  it('issue_34_should_accept_XML_declarations_that_use_single_quotes', 0, () => {
    expect(JSON.stringify(convert.xml2js(issue_34_xml))).assertEqual(JSON.stringify(xml_js_issue_34_js));
  });

}