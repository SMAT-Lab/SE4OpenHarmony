let __generate__Id: number = 0;
function generateId(): string {
    return "Simple.test_" + ++__generate__Id;
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
export default function simpleTest() {
    describe('SimpleTest', () => {
        it('simple_test', 0, () => {
            const xmlString = `<root>
			<test name="test1" />
			<test name="test2" />
			<test name="test3" />
			<test name="test4" />
		</root>`;
            const xsltString = `'<?xml version="1.0"?>' +
			<xsl:stylesheet version="1.0">
				<xsl:template match="test">
				  <span> <xsl:value-of select="@name" /> </span>
				</xsl:template>
				<xsl:template match="/">
					<div>
						<xsl:apply-templates select="//test" />
					</div>
				</xsl:template>
			</xsl:stylesheet>`;
            const expectedOutString = '<div>' +
                '<span>test1</span>' +
                '<span>test2</span>' +
                '<span>test3</span>' +
                '<span>test4</span>' +
                '</div>';
            let xml1: XDocument = xmlParse(xmlString);
            let xml2: XDocument = xmlParse(xsltString);
            const outXmlString: string = xsltProcess(xml1, xml2);
            expect(outXmlString).assertEqual(expectedOutString);
        });
    });
}
