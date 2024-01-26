let __generate__Id: number = 0;
function generateId(): string {
    return "VariablesAsParameters.test_" + ++__generate__Id;
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
import { xmlParse } from 'xslt-processor/src/dom';
import { xsltProcess } from 'xslt-processor/src/xslt';
export default function variablesAsParametersTest() {
    describe('VariablesAsParametersTest', () => {
        it('variables_as_parameters_1', 0, () => {
            const xmlString = `<root>
      <test name="test1"/>
    </root> `;
            const xsltString = `<?xml version="1.0"?>
      <xsl:stylesheet version="1.0">
        <xsl:template match="test">
          <span> <xsl:value-of select="$test" /> </span>
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
            const expectedOutString = `<root><span>hugo</span></root>`;
            expect(xsltProcess(xmlParse(xmlString), xmlParse(xsltString), {
                test: "hugo"
            })).assertEqual(expectedOutString);
        });
    });
}
