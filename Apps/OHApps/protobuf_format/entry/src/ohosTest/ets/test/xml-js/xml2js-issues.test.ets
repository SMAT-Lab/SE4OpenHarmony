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
import { describe, expect, it } from '@ohos/hypium'
import {
  xml2js_issue_3_json,
  xml2js_issue_26_js,
  xml2js_issue_26_js1,
  xml2js_issue_29_js,
  xml2js_issue_34_js,
  xml2js_issue_41_js1,
  xml2js_issue_41_js2,
  xml2js_issue_41_js,
  xml2js_issue_26_js_2,
  xml2js_issue_44_js,
} from './XmlJSData'

export default function testingXml2jsIssue() {
  describe('TestingXml2jsIssue', () => {

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
      })).assertEqual(JSON.stringify(xml2js_issue_3_json));
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
      expect(JSON.stringify(convert.json2xml(issue_6_json, {
        compact: true, spaces: 4, fullTagEmptyElement: true
      }))).assertEqual(JSON.stringify(issue_6_xml));
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
      expect(JSON.stringify(js_)).assertEqual(JSON.stringify(xml2js_issue_26_js));
      expect(convert.js2xml(js_, {
        spaces: 2, compact: true
      })).assertEqual(issue_26_xml);
    });


    let issue_26_xml1 = '<title>Support &amp; resistance</title>';
    it('issue_26_2_should_convert_xml_object_to_js_and_back_to_xml_correctly', 0, () => {
      let js_: ESObject = convert.xml2js(issue_26_xml1);
      expect(JSON.stringify(js_)).assertEqual(JSON.stringify(xml2js_issue_26_js1));
      expect(convert.js2xml(js_)).assertEqual(issue_26_xml1);
    });


    let issue_29_xml = '<outer> This is <inner> some</inner> <inner>Text </inner> </outer>';
    it('issue_29_should_convert_xml_object_to_js_and_back_to_xml_correctly', 0, () => {
      let js_: ESObject = convert.xml2js(issue_29_xml, {
        captureSpacesBetweenElements: true
      });
      expect(JSON.stringify(js_)).assertEqual(JSON.stringify(xml2js_issue_29_js));
      expect(JSON.stringify(convert.js2xml(js_))).assertEqual('"' + issue_29_xml + '"');
    });

    let issue_34_xml = '<?xml version=\'1.0\' encoding=\'UTF-8\'?>';
    it('issue_34_should_accept_XML_declarations_that_use_single_quotes', 0, () => {
      expect(JSON.stringify(convert.xml2js(issue_34_xml))).assertEqual(JSON.stringify(xml2js_issue_34_js));
    });

    let issue_41_xml1 =
      '<d:multistatus xmlns="DAV:">\n' +
      '  <response>\n' +
      '    <href>/</href>\n' +
      '        <propstat>\n' +
      '          <prop>\n' +
      '          <current-user-principal>\n' +
      '            <href>/principals/users/johndoe/</href>\n' +
      '          </current-user-principal>\n' +
      '          </prop>\n' +
      '      <status>HTTP/1.1 200 OK</status>\n' +
      '    </propstat>\n' +
      '  </response>\n' +
      '</d:multistatus>';
    let issue_41_xml2 =
      '<d:multistatus xmlns:d="DAV:">\n' +
      '  <d:response>\n' +
      '      <d:href>/</d:href>\n' +
      '      <d:propstat>\n' +
      '          <d:prop>\n' +
      '              <d:current-user-principal>\n' +
      '                  <d:href>/principals/users/johndoe/</d:href>\n' +
      '              </d:current-user-principal>\n' +
      '          </d:prop>\n' +
      '          <d:status>HTTP/1.1 200 OK</d:status>\n' +
      '      </d:propstat>\n' +
      '  </d:response>\n' +
      '</d:multistatus>';

    it('issue_41_should_convert_without_resolving_namespace', 0, () => {
      expect(JSON.stringify(convert.xml2js(issue_41_xml1, {
        compact: true, resolveNamespace: false
      }))).assertEqual(JSON.stringify(xml2js_issue_41_js1));
      expect(JSON.stringify(convert.xml2js(issue_41_xml2, {
        compact: true, resolveNamespace: false
      }))).assertEqual(JSON.stringify(xml2js_issue_41_js2));
    });

    it('issue_41_should_convert_and_resolve_namespace', 0, () => {
      expect(JSON.stringify(convert.xml2js(issue_41_xml1, {
        compact: true, resolveNamespace: true
      }))).assertEqual(JSON.stringify(xml2js_issue_41_js1));
    });

    let issue_26_xml2 = '<parser start="^\\s*?&lt;name&gt;regex&lt;/name&gt;$"/>';
    it('issue_26_should_xml_to_json_and_back_to_xml', 0, () => {
      expect(JSON.stringify(convert.xml2js(issue_26_xml2, {
        compact: true
      }))).assertEqual(JSON.stringify(xml2js_issue_26_js_2));
      expect(convert.js2xml(xml2js_issue_26_js_2, {
        compact: true, attributeValueFn: (value: string) => {
          return value.replace(new RegExp('<', 'g'), '&lt;').replace(new RegExp('>', 'g'), '&gt;');
        }
      })).assertEqual(issue_26_xml2);
    });

    let issue_44_xml = '<material><font size="14"/></material><material><font size="14"/></material>';
    it('issue_44_should_json_to_xml_and_back_to_json', 0, () => {
      expect(JSON.stringify(convert.xml2json(issue_44_xml, {
        compact: true
      }))).assertEqual(JSON.stringify(JSON.stringify(xml2js_issue_44_js)));
    });
  });
}