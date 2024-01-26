let __generate__Id: number = 0;
function generateId(): string {
    return "LocalName.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium';
import { XDocument, xmlParse } from 'xslt-processor/src/dom';
import { xsltProcess } from 'xslt-processor/src/xslt';
export default function localNameTest() {
    describe('LocalNameTest', () => {
        it('localname_without_namespace_test', 0, () => {
            const xmlString = `<root>
      <test name="test1" />
      <test name="test2" />
      <test name="test3" />
      <test name="test4" />
    </root>`;
            const xsltString = `<?xml version="1.0"?>
      <xsl:stylesheet version="1.0">
        <xsl:template match="test">
          <span> <xsl:value-of select="@name" /> </span>
        </xsl:template>
        <xsl:template match="root">
          <xsl:element name="{local-name()}">
            <xsl:apply-templates select="test"/>
          </xsl:element>
        </xsl:template>
        <xsl:template match="/">
          <xsl:apply-templates select="root"/>
        </xsl:template>
      </xsl:stylesheet>`;
            const expectedOutString = '<root>' +
                '<span>test1</span>' +
                '<span>test2</span>' +
                '<span>test3</span>' +
                '<span>test4</span>' +
                '</root>';
            let xml1: XDocument = xmlParse(xmlString);
            let xml2: XDocument = xmlParse(xsltString);
            const outXmlString: string = xsltProcess(xml1, xml2);
            expect(outXmlString).assertEqual(expectedOutString);
        });
        it('local_name_with_namespace_test', 0, () => {
            const xmlString = `<xhtml:root xmlns:xhtml="http://www.w3.org/1999/xhtml">
      <test name="test1" />
      <test name="test2" />
      <test name="test3" />
      <test name="test4" />
    </xhtml:root>`;
            const xsltString = `<?xml version="1.0"?>
      <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xhtml="http://www.w3.org/1999/xhtml">
        <xsl:template match="test">
          <span> <xsl:value-of select="@name" /> </span>
        </xsl:template>
        <xsl:template match="xhtml:root">
          <xsl:element name="{local-name()}">
            <xsl:apply-templates select="test"/>
          </xsl:element>
        </xsl:template>
        <xsl:template match="/">
          <xsl:apply-templates select="xhtml:root"/>
        </xsl:template>
      </xsl:stylesheet>`;
            const expectedOutString = '<root>' +
                '<span>test1</span>' +
                '<span>test2</span>' +
                '<span>test3</span>' +
                '<span>test4</span>' +
                '</root>';
            let xml1: XDocument = xmlParse(xmlString);
            let xml2: XDocument = xmlParse(xsltString);
            const outXmlString: string = xsltProcess(xml1, xml2);
            expect(outXmlString).assertEqual(expectedOutString);
        });
    });
}
