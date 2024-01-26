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

import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium'
import { xmlParse } from 'xslt-processor/src/dom.js'
import { xmlText } from 'xslt-processor/src/util.js'

export default function escapeTest() {
  describe('EscapeTest', () => {
    it('accepts_already_escaped_ampersand', 0, () => {
      const xmlString: string = '<root>Fish&amp;pie</root>';
      const outXmlString: string = xmlText(xmlParse(xmlString))
      expect(outXmlString).assertEqual(xmlString);
    })

    it('escapes_non_escaped_ampersand', 0, () => {
      const xmlString: string = '<root>Fish&pie</root>';
      const outXmlString: string = xmlText(xmlParse(xmlString))
      expect(outXmlString).assertEqual('<root>Fish&amp;pie</root>');
    })

    it('accepts_non_escaped_greater_than_sign_between_elements', 0, () => {
      const xmlString = '<root>Fish>pie</root>';
      const outXmlString: string = xmlText(xmlParse(xmlString))
      expect(outXmlString).assertEqual('<root>Fish&gt;pie</root>');
    })

    it('accepts_non_escaped_single_quotation_mark_between_elements', 0, () => {
      const xmlString = '<root>Fish\'pie</root>';
      const outXmlString: string = xmlText(xmlParse(xmlString))
      expect(outXmlString).assertEqual('<root>Fish\'pie</root>');
    })

    it('accepts_non_escaped_double_quotation_mark_between_elements', 0, () => {
      const xmlString = '<root>Fish"pie</root>';
      const outXmlString: string = xmlText(xmlParse(xmlString))
      expect(outXmlString).assertEqual('<root>Fish"pie</root>');
    })

    it('accepts_non_escaped_greater_than_sign_in_attributes', 0, () => {
      const xmlString = '<root dish="eat>hunger">Fish</root>';
      const outXmlString: string = xmlText(xmlParse(xmlString))
      expect(outXmlString).assertEqual('<root dish="eat&gt;hunger">Fish</root>');
    })

    it('accepts_non_escaped_single_quotation_mark_in_attributes', 0, () => {
      const xmlString = '<root dish="eat\'hunger">Fish</root>';
      const outXmlString:string = xmlText(xmlParse(xmlString))
      expect(outXmlString).assertEqual('<root dish="eat\'hunger">Fish</root>');
    })

    it('accepts_non_escaped_double_quotation_mark_in_attributes', 0, () => {
      const xmlString = "<root dish='eat\"hunger'>Fish</root>";
      const outXmlString: string = xmlText(xmlParse(xmlString))
      expect(outXmlString).assertEqual('<root dish="eat&quot;hunger">Fish</root>');
    })
  })
}