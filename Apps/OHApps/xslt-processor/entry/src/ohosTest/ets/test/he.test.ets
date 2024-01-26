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
import he from 'he'
import { xmlText } from 'xslt-processor/src/util.js'
import { forOwn, officialData, encodeData, A, D, E, S, U, IA, AE, AS, AU, DA, DE, DS, DU, ED, EU, SiA,
  DAS,
  DAU,
  DEA,
  forEach,
  heDataInterface
} from './Stdlib'


export default function heTest() {
  describe('heTest', () => {



    // function forOwn(object: object, fn) {
    //   for (let key in object) {
    //     if (object.hasOwnProperty(key)) {
    //       fn(key, object[key]);
    //     }
    //   }
    // }

    it('decode', 0, () => {
      // let arr:object[] = forOwn()
      // for (let index = 0; index<forOwn().length;index++){
      //   let encoded = 'a ' + index + ' b';
      //   let decoded = 'a ' + arr[index].characters + ' b';
      //   // Decode all the official test data
      //   expect(he.decode(encoded)).assertEqual(decoded);
      //
      //   // Test if `decode(encode(decoded) == decoded`
      //   expect(he.decode(he.encode(decoded))).assertEqual(decoded);
      // }

      forOwn(officialData, (key: string, value: heDataInterface) => {
        let encoded = 'a ' + key + ' b';
        let decoded = 'a ' + value.characters + ' b';
        // Decode all the official test data
        expect(he.decode(encoded)).assertEqual(decoded);

        // Test if `decode(encode(decoded) == decoded`
        expect(he.decode(he.encode(decoded))).assertEqual(decoded);
      });

      expect(he.decode('&amp;amp;amp;')).assertEqual('&amp;amp;');
      expect(he.decode('&#x26;amp;')).assertEqual('&amp;');
      expect(he.decode('a&foololthisdoesntexist;b')).assertEqual('a&foololthisdoesntexist;b');
      expect(he.decode('foo &lolwat; bar')).assertEqual('foo &lolwat; bar');
      try {
        (() => {
          he.decode('foo &lolwat; bar', sT);
        })()
      } catch (error) {
        expect(false).assertFalse();
      }
      expect(he.decode('&notin; &noti &notin &copy123')).assertEqual('\u2209 \xACi \xACin \xA9123');
      expect(he.decode('&amp;xxx; &amp;xxx &ampthorn; &ampthorn &ampcurren;t &ampcurrent'))
        .assertEqual('&xxx; &xxx &thorn; &thorn &curren;t &current');
      expect(he.decode('a&#x1D306;b&#X0000000000001d306;c')).assertEqual('a\uD834\uDF06b\uD834\uDF06c');
      expect(he.decode('a&#119558;b&#169;c&#00000000000000000169;d')).assertEqual('a\uD834\uDF06b\xA9c\xA9d');
      expect(he.decode('a&#xD834;&#xDF06;b&#55348;&#57094;c a&#x0;b&#0;c'))
        .assertEqual('a\uFFFD\uFFFDb\uFFFD\uFFFDc a\uFFFDb\uFFFDc');

      try {
        (() => {
          he.decode('a&#xD834;b', sT);
        })()
      } catch (error) {
        expect(false).assertFalse();
      }
      expect(he.decode('a&#x9999999999999999;b')).assertEqual('a\uFFFDb');
      try {
        (() => {
          he.decode('a&#x9999999999999999;b', sT);
        })()
      } catch (error) {
        expect(false).assertFalse();
      }
      expect(he.decode('a&#x110000;b')).assertEqual('a\uFFFDb');
      try {
        (() => {
          he.decode('a&#x110000;b', sT);
        })()
      } catch (error) {
        expect(false).assertFalse();
      }
      expect(he.decode('foo&ampbar')).assertEqual('foo&bar');
      try {
        (() => {
          he.decode('foo&ampbar', sT);
        })()
      } catch (error) {
        expect(false).assertFalse();
      }
      expect(he.decode('foo&#x1D306qux')).assertEqual('foo\uD834\uDF06qux');
      try {
        (() => {
          he.decode('foo&#x1D306qux', sT);
        })()
      } catch (error) {
        expect(false).assertFalse();
      }
      expect(he.decode('foo&#119558qux')).assertEqual('foo\uD834\uDF06qux');
      try {
        (() => {
          he.decode('foo&#119558qux', sT);
        })()
      } catch (error) {
        expect(false).assertFalse();
      }
      expect(he.decode('foo&ampbar', iaT)).assertEqual('foo&ampbar');
      expect(he.decode('foo&amp;bar', iaT)).assertEqual('foo&bar');
      expect(he.decode('foo&amp;', iaT)).assertEqual('foo&');

      he.decode.options.isAttributeValue = true;
      expect(he.decode('foo&amp=')).assertEqual('foo&amp=');
      try {
        (() => {
          he.decode('foo&amp=', sT);
        })()
      } catch (error) {
        expect(false).assertFalse();
      }

      he.decode.options.isAttributeValue = false;
      expect(he.decode('foo&amp', iaT)).assertEqual('foo&');
      expect(he.decode('foo&amplol', sTiaT)).assertEqual('foo&amplol');
      try {
        (() => {
          he.decode('foo&amplol', sTiaF);
        })()
      } catch (error) {
        expect(false).assertFalse();
      }

      he.decode.options.strict = true;
      try {
        (() => {
          he.decode('I\'m &notit; I tell you', iaF);
        })()
      } catch (error) {
        expect(false).assertFalse();
      }

      he.decode.options.strict = false;
      // https://html.spec.whatwg.org/multipage/parsing.html#named-character-reference-state
      expect(he.decode('I\'m &notit; I tell you', sTiaT)).assertEqual('I\'m &notit; I tell you');
      expect(he.decode('I\'m &notit; I tell you', sFiaT)).assertEqual('I\'m &notit; I tell you');
      expect(he.decode('I\'m &notin; I tell you', sT)).assertEqual('I\'m \u2209 I tell you');
      expect(he.decode('&#x8D;')).assertEqual('\x8D');
      try {
        (() => {
          he.decode('&#x8D;', sT);
        })()
      } catch (error) {
        expect(false).assertFalse();
      }
      expect(he.decode('&#xD;')).assertEqual('\x0D');
      try {
        (() => {
          he.decode('&#xD;', sT);
        })()
      } catch (error) {
        expect(false).assertFalse();
      }
      expect(he.decode('&#x94;')).assertEqual('\u201D');
      try {
        (() => {
          he.decode('&#x94;', sT);
        })()
      } catch (error) {
        expect(false).assertFalse();
      }
      expect(he.decode('&#x1;')).assertEqual('\x01');
      try {
        (() => {
          he.decode('&#x1;', sT);
        })()
      } catch (error) {
        expect(false).assertFalse();
      }
      expect(he.decode('&#x10FFFF;')).assertEqual('\uDBFF\uDFFF');
      try {
        (() => {
          he.decode('&#x10FFFF;', sT);
        })()
      } catch (error) {
        expect(false).assertFalse();
      }
      expect(he.decode('&#196605;', sT)).assertEqual('\uD87F\uDFFD');
      try {
        (() => {
          he.decode('&#196607;', sT);
        })()
      } catch (error) {
        expect(false).assertFalse();
      }

      // “If no characters match the range, then don't consume any characters
      // (and unconsume the U+0023 NUMBER SIGN character and, if appropriate,
      // the X character). This is a parse error […].”
      expect(he.decode('&#xZ', sF)).assertEqual('&#xZ');
      try {
        (() => {
          he.decode('&#xZ', sT);
        })()
      } catch (error) {
        expect(false).assertFalse();
      }
      expect(he.decode('&#Z', sF)).assertEqual('&#Z');
      try {
        (() => {
          he.decode('&#Z', sT);
        })()
      } catch (error) {
        expect(false).assertFalse();
      }
      expect(he.decode('&#00')).assertEqual('\uFFFD');
      expect(he.decode('&#0128;')).assertEqual('\u20AC');
    })

    it('encode', 0, () => {
      expect(typeof he.encode.options).assertEqual('object');
      expect(he.encode.options.useNamedReferences).assertEqual(false);

      // Test encoding
      forEach(encodeData, (encodeData: heDataInterface) => {
        he.encode.options.useNamedReferences = true;
        expect(he.encode(encodeData.decoded)).assertEqual(encodeData.encoded);
        he.encode.options.useNamedReferences = false;
      });

      // forOwn(encodeData, (key:string,item) => {
      //   he.encode.options.useNamedReferences = true;
      //   expect(he.encode(item.decoded)).assertEqual(item.encoded);
      //   he.encode.options.useNamedReferences = false;
      // })

      expect(he.encode('foo\xA9bar\uD834\uDF06baz\u2603qux')).assertEqual('foo&#xA9;bar&#x1D306;baz&#x2603;qux');
      expect(
        he.encode('foo\xA9bar\uD834\uDF06baz\u2603qux', uT)).assertEqual(
        'foo&copy;bar&#x1D306;baz&#x2603;qux');
      expect(
        he.encode('foo\xA9bar\uD834\uDF06baz\u2603qux', dTuT)).assertEqual(
        'foo&copy;bar&#119558;baz&#9731;qux');
      expect(
        he.encode('\'"<>&', uF)).assertEqual('&#x27;&#x22;&#x3C;&#x3E;&#x26;');
      expect(
        he.encode('\'"<>&', dTuF)).assertEqual('&#39;&#34;&#60;&#62;&#38;');
      expect(he.encode('a\tb', eT)).assertEqual('&#x61;&#x9;&#x62;');
      expect(he.encode('a\tb', eTdT)).assertEqual('&#97;&#9;&#98;');
      expect(he.encode('a\tb', eTuT)).assertEqual('&#x61;&Tab;&#x62;');
      expect(
        he.encode('a\uD834\uDF06b', eTuF)).assertEqual('&#x61;&#x1D306;&#x62;');
      expect(
        he.encode('a\uD834\uDF06b', eTuT)).assertEqual('&#x61;&#x1D306;&#x62;');
      expect(
        he.encode('a&b123;+\xA9>\u20D2<\u20D2\nfja', eTuF)).assertEqual(
        '&#x61;&#x26;&#x62;&#x31;&#x32;&#x33;&#x3B;&#x2B;&#xA9;&#x3E;&#x20D2;&#x3C;&#x20D2;&#xA;&#x66;&#x6A;&#x61;');
      expect(
        he.encode('a&b123;+\xA9>\u20D2<\u20D2\nfja', eTuT)).assertEqual(
        '&#x61;&amp;&#x62;&#x31;&#x32;&#x33;&semi;&plus;&copy;&nvgt;&nvlt;&NewLine;&fjlig;&#x61;');
      expect(he.encode('foo\uD800bar')).assertEqual('foo&#xD800;bar');
      try {
        (() => {
          he.encode('foo\uD800bar', sT);
        })()
      } catch (error) {
        expect(false).assertFalse()
      }

      expect(he.encode('\uD800bar')).assertEqual('&#xD800;bar');

      try {
        (() => {
          he.encode('\uD800bar', sT);
        })()
      } catch (error) {
        expect(false).assertFalse()
      }
      expect(he.encode('foo\uD800')).assertEqual('foo&#xD800;');
      try {
        (() => {
          he.encode('foo\uD800', sT);
        })()
      } catch (error) {
        expect(false).assertFalse()
      }
      expect(he.encode('foo\uDBFFbar')).assertEqual('foo&#xDBFF;bar');
      try {
        (() => {
          he.encode('foo\uDBFFbar', sT);
        })()
      } catch (error) {
        expect(false).assertFalse()
      }
      expect(
        he.encode('\uDBFFbar')).assertEqual(
        '&#xDBFF;bar');
      try {
        (() => {
          he.encode('\uDBFFbar', sT);
        })()
      } catch (error) {
        expect(false).assertFalse()
      }

      expect(
        he.encode('foo\uDBFF')).assertEqual(
        'foo&#xDBFF;');

      try {
        (() => {
          he.encode('foo\uDBFF', sT);
        })()
      } catch (error) {
        expect(false).assertFalse()
      }

      expect(
        he.encode('foo\uDC00bar')).assertEqual(
        'foo&#xDC00;bar');
      try {
        (() => {
          he.encode('foo\uDC00bar', sT);
        })()
      } catch (error) {
        expect(false).assertFalse()
      }
      expect(
        he.encode('\uDC00bar')).assertEqual(
        '&#xDC00;bar');
      try {
        (() => {
          he.encode('\uDC00bar', sT);
        })()
      } catch (error) {
        expect(false).assertFalse()
      }
      expect(
        he.encode('foo\uDC00')).assertEqual(
        'foo&#xDC00;');
      try {
        (() => {
          he.encode('foo\uDC00', sT);
        })()
      } catch (error) {
        expect(false).assertFalse()
      }

      expect(
        he.encode('foo\uDFFFbar')).assertEqual(
        'foo&#xDFFF;bar');
      try {
        (() => {
          he.encode('foo\uDFFFbar', sT);
        })()
      } catch (error) {
        expect(false).assertFalse()
      }

      expect(
        he.encode('\uDFFFbar')).assertEqual(
        '&#xDFFF;bar');
      try {
        (() => {
          he.encode('\uDFFFbar', sT);
        })()
      } catch (error) {
        expect(false).assertFalse()
      }

      expect(
        he.encode('foo\uDFFF')).assertEqual(
        'foo&#xDFFF;');
      try {
        (() => {
          he.encode('foo\uDFFF', sT);
        })()
      } catch (error) {
        expect(false).assertFalse()
      }

      expect(
        he.encode('\0\x01\x02\x03\x04\x05\x06\x07\b\x0B\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F\x7F\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C\x8D\x8E\x8F\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C\x9D\x9E\x9F\uFDD0\uFDD1\uFDD2\uFDD3\uFDD4\uFDD5\uFDD6\uFDD7\uFDD8\uFDD9\uFDDA\uFDDB\uFDDC\uFDDD\uFDDE\uFDDF\uFDE0\uFDE1\uFDE2\uFDE3\uFDE4\uFDE5\uFDE6\uFDE7\uFDE8\uFDE9\uFDEA\uFDEB\uFDEC\uFDED\uFDEE\uFDEF\uFFFE\uFFFF\uD83F\uDFFE\uD83F\uDFFF\uD87F\uDFFE\uD87F\uDFFF\uD8BF\uDFFE\uD8BF\uDFFF\uD8FF\uDFFE\uD8FF\uDFFF\uD93F\uDFFE\uD93F\uDFFF\uD97F\uDFFE\uD97F\uDFFF\uD9BF\uDFFE\uD9BF\uDFFF\uD9FF\uDFFE\uD9FF\uDFFF\uDA3F\uDFFE\uDA3F\uDFFF\uDA7F\uDFFE\uDA7F\uDFFF\uDABF\uDFFE\uDABF\uDFFF\uDAFF\uDFFE\uDAFF\uDFFF\uDB3F\uDFFE\uDB3F\uDFFF\uDB7F\uDFFE\uDB7F\uDFFF\uDBBF\uDFFE\uDBBF\uDFFF\uDBFF\uDFFE\uDBFF\uDFFF'))
        .assertEqual(
          '\0&#x1;&#x2;&#x3;&#x4;&#x5;&#x6;&#x7;&#x8;&#xB;&#xE;&#xF;&#x10;&#x11;&#x12;&#x13;&#x14;&#x15;&#x16;&#x17;&#x18;&#x19;&#x1A;&#x1B;&#x1C;&#x1D;&#x1E;&#x1F;&#x7F;\x80&#x81;\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C&#x8D;\x8E&#x8F;&#x90;\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C&#x9D;\x9E\x9F&#xFDD0;&#xFDD1;&#xFDD2;&#xFDD3;&#xFDD4;&#xFDD5;&#xFDD6;&#xFDD7;&#xFDD8;&#xFDD9;&#xFDDA;&#xFDDB;&#xFDDC;&#xFDDD;&#xFDDE;&#xFDDF;&#xFDE0;&#xFDE1;&#xFDE2;&#xFDE3;&#xFDE4;&#xFDE5;&#xFDE6;&#xFDE7;&#xFDE8;&#xFDE9;&#xFDEA;&#xFDEB;&#xFDEC;&#xFDED;&#xFDEE;&#xFDEF;&#xFFFE;&#xFFFF;&#x1FFFE;&#x1FFFF;&#x2FFFE;&#x2FFFF;&#x3FFFE;&#x3FFFF;&#x4FFFE;&#x4FFFF;&#x5FFFE;&#x5FFFF;&#x6FFFE;&#x6FFFF;&#x7FFFE;&#x7FFFF;&#x8FFFE;&#x8FFFF;&#x9FFFE;&#x9FFFF;&#xAFFFE;&#xAFFFF;&#xBFFFE;&#xBFFFF;&#xCFFFE;&#xCFFFF;&#xDFFFE;&#xDFFFF;&#xEFFFE;&#xEFFFF;&#xFFFFE;&#xFFFFF;&#x10FFFE;&#x10FFFF;');
      expect(
        he.encode('\0\x01\x02\x03\x04\x05\x06\x07\b\x0B\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F\x7F\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C\x8D\x8E\x8F\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C\x9D\x9E\x9F\uFDD0\uFDD1\uFDD2\uFDD3\uFDD4\uFDD5\uFDD6\uFDD7\uFDD8\uFDD9\uFDDA\uFDDB\uFDDC\uFDDD\uFDDE\uFDDF\uFDE0\uFDE1\uFDE2\uFDE3\uFDE4\uFDE5\uFDE6\uFDE7\uFDE8\uFDE9\uFDEA\uFDEB\uFDEC\uFDED\uFDEE\uFDEF\uFFFE\uFFFF\uD83F\uDFFE\uD83F\uDFFF\uD87F\uDFFE\uD87F\uDFFF\uD8BF\uDFFE\uD8BF\uDFFF\uD8FF\uDFFE\uD8FF\uDFFF\uD93F\uDFFE\uD93F\uDFFF\uD97F\uDFFE\uD97F\uDFFF\uD9BF\uDFFE\uD9BF\uDFFF\uD9FF\uDFFE\uD9FF\uDFFF\uDA3F\uDFFE\uDA3F\uDFFF\uDA7F\uDFFE\uDA7F\uDFFF\uDABF\uDFFE\uDABF\uDFFF\uDAFF\uDFFE\uDAFF\uDFFF\uDB3F\uDFFE\uDB3F\uDFFF\uDB7F\uDFFE\uDB7F\uDFFF\uDBBF\uDFFE\uDBBF\uDFFF\uDBFF\uDFFE\uDBFF\uDFFF',
          eT)).assertEqual(
        '\0&#x1;&#x2;&#x3;&#x4;&#x5;&#x6;&#x7;&#x8;&#xB;&#xE;&#xF;&#x10;&#x11;&#x12;&#x13;&#x14;&#x15;&#x16;&#x17;&#x18;&#x19;&#x1A;&#x1B;&#x1C;&#x1D;&#x1E;&#x1F;&#x7F;\x80&#x81;\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C&#x8D;\x8E&#x8F;&#x90;\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C&#x9D;\x9E\x9F&#xFDD0;&#xFDD1;&#xFDD2;&#xFDD3;&#xFDD4;&#xFDD5;&#xFDD6;&#xFDD7;&#xFDD8;&#xFDD9;&#xFDDA;&#xFDDB;&#xFDDC;&#xFDDD;&#xFDDE;&#xFDDF;&#xFDE0;&#xFDE1;&#xFDE2;&#xFDE3;&#xFDE4;&#xFDE5;&#xFDE6;&#xFDE7;&#xFDE8;&#xFDE9;&#xFDEA;&#xFDEB;&#xFDEC;&#xFDED;&#xFDEE;&#xFDEF;&#xFFFE;&#xFFFF;&#x1FFFE;&#x1FFFF;&#x2FFFE;&#x2FFFF;&#x3FFFE;&#x3FFFF;&#x4FFFE;&#x4FFFF;&#x5FFFE;&#x5FFFF;&#x6FFFE;&#x6FFFF;&#x7FFFE;&#x7FFFF;&#x8FFFE;&#x8FFFF;&#x9FFFE;&#x9FFFF;&#xAFFFE;&#xAFFFF;&#xBFFFE;&#xBFFFF;&#xCFFFE;&#xCFFFF;&#xDFFFE;&#xDFFFF;&#xEFFFE;&#xEFFFF;&#xFFFFE;&#xFFFFF;&#x10FFFE;&#x10FFFF;');
      try {
        (() => {
          he.encode('\0\x01\x02\x03\x04\x05\x06\x07\b\x0B\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F\x7F\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C\x8D\x8E\x8F\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C\x9D\x9E\x9F\uFDD0\uFDD1\uFDD2\uFDD3\uFDD4\uFDD5\uFDD6\uFDD7\uFDD8\uFDD9\uFDDA\uFDDB\uFDDC\uFDDD\uFDDE\uFDDF\uFDE0\uFDE1\uFDE2\uFDE3\uFDE4\uFDE5\uFDE6\uFDE7\uFDE8\uFDE9\uFDEA\uFDEB\uFDEC\uFDED\uFDEE\uFDEF\uFFFE\uFFFF\uD83F\uDFFE\uD83F\uDFFF\uD87F\uDFFE\uD87F\uDFFF\uD8BF\uDFFE\uD8BF\uDFFF\uD8FF\uDFFE\uD8FF\uDFFF\uD93F\uDFFE\uD93F\uDFFF\uD97F\uDFFE\uD97F\uDFFF\uD9BF\uDFFE\uD9BF\uDFFF\uD9FF\uDFFE\uD9FF\uDFFF\uDA3F\uDFFE\uDA3F\uDFFF\uDA7F\uDFFE\uDA7F\uDFFF\uDABF\uDFFE\uDABF\uDFFF\uDAFF\uDFFE\uDAFF\uDFFF\uDB3F\uDFFE\uDB3F\uDFFF\uDB7F\uDFFE\uDB7F\uDFFF\uDBBF\uDFFE\uDBBF\uDFFF\uDBFF\uDFFE\uDBFF\uDFFF',
            sT);
        })()
      } catch (error) {
        expect(false).assertFalse()
      }

      expect(
        he.encode('\0\x89')).assertEqual(
        '\0\x89');
      expect(
        he.encode('\0\x89', eT)).assertEqual(
        '\0\x89');
      expect(
        he.encode('foo\xA9<bar\uD834\uDF06>baz\u2603"qux', aT)).assertEqual(
        'foo&#xA9;<bar&#x1D306;>baz&#x2603;"qux');
      expect(
        he.encode('a<b', aTeT)).assertEqual(
        '&#x61;&#x3C;&#x62;');
      expect(
        he.encode('a<\u223E>', aTuT)).assertEqual(
        'a<&ac;>');
      try {
        (() => {
          he.encode('\0\x01\x02\x03\x04\x05\x06\x07\b\x0B\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F\x7F\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C\x8D\x8E\x8F\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C\x9D\x9E\x9F\uFDD0\uFDD1\uFDD2\uFDD3\uFDD4\uFDD5\uFDD6\uFDD7\uFDD8\uFDD9\uFDDA\uFDDB\uFDDC\uFDDD\uFDDE\uFDDF\uFDE0\uFDE1\uFDE2\uFDE3\uFDE4\uFDE5\uFDE6\uFDE7\uFDE8\uFDE9\uFDEA\uFDEB\uFDEC\uFDED\uFDEE\uFDEF\uFFFE\uFFFF\uD83F\uDFFE\uD83F\uDFFF\uD87F\uDFFE\uD87F\uDFFF\uD8BF\uDFFE\uD8BF\uDFFF\uD8FF\uDFFE\uD8FF\uDFFF\uD93F\uDFFE\uD93F\uDFFF\uD97F\uDFFE\uD97F\uDFFF\uD9BF\uDFFE\uD9BF\uDFFF\uD9FF\uDFFE\uD9FF\uDFFF\uDA3F\uDFFE\uDA3F\uDFFF\uDA7F\uDFFE\uDA7F\uDFFF\uDABF\uDFFE\uDABF\uDFFF\uDAFF\uDFFE\uDAFF\uDFFF\uDB3F\uDFFE\uDB3F\uDFFF\uDB7F\uDFFE\uDB7F\uDFFF\uDBBF\uDFFE\uDBBF\uDFFF\uDBFF\uDFFE\uDBFF\uDFFF',
            aTsT);
        })()
      } catch (error) {
        expect(false).assertFalse()
      }

      expect(
        he.encode('\xE4\xF6\xFC\xC4\xD6\xDC', dT)).assertEqual(
        '&#228;&#246;&#252;&#196;&#214;&#220;');
      expect(
        he.encode('\xE4\xF6\xFC\xC4\xD6\xDC', dTuT)).assertEqual(
        '&auml;&ouml;&uuml;&Auml;&Ouml;&Uuml;');
      expect(
        he.encode('a<b', dTeT)).assertEqual(
        '&#97;&#60;&#98;');
      expect(
        he.encode('\0\x89', dT)).assertEqual(
        '\0\x89');
      expect(
        he.encode('\0\x89', dTeT)).assertEqual(
        '\0\x89');
      expect(
        he.encode('foo\xA9<bar\uD834\uDF06>baz\u2603"qux', dTaT)).assertEqual(
        'foo&#169;<bar&#119558;>baz&#9731;"qux');
      expect(
        he.encode('a<b', dTeTaT)).assertEqual(
        '&#97;&#60;&#98;');
      expect(
        he.encode('a<\xE4>', dTaTuT)).assertEqual(
        'a<&auml;>');
      expect(
        he.encode('a<\u223E>', dTaT)).assertEqual(
        'a<&#8766;>');
      try {
        (he.encode('a<\xE4>', dTaF))()
      } catch (error) {
        expect(false).assertFalse()
      }
      ;
      try {
        (() => {
          he.encode('\0\x01\x02\x03\x04\x05\x06\x07\b\x0B\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F\x7F\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C\x8D\x8E\x8F\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C\x9D\x9E\x9F\uFDD0\uFDD1\uFDD2\uFDD3\uFDD4\uFDD5\uFDD6\uFDD7\uFDD8\uFDD9\uFDDA\uFDDB\uFDDC\uFDDD\uFDDE\uFDDF\uFDE0\uFDE1\uFDE2\uFDE3\uFDE4\uFDE5\uFDE6\uFDE7\uFDE8\uFDE9\uFDEA\uFDEB\uFDEC\uFDED\uFDEE\uFDEF\uFFFE\uFFFF\uD83F\uDFFE\uD83F\uDFFF\uD87F\uDFFE\uD87F\uDFFF\uD8BF\uDFFE\uD8BF\uDFFF\uD8FF\uDFFE\uD8FF\uDFFF\uD93F\uDFFE\uD93F\uDFFF\uD97F\uDFFE\uD97F\uDFFF\uD9BF\uDFFE\uD9BF\uDFFF\uD9FF\uDFFE\uD9FF\uDFFF\uDA3F\uDFFE\uDA3F\uDFFF\uDA7F\uDFFE\uDA7F\uDFFF\uDABF\uDFFE\uDABF\uDFFF\uDAFF\uDFFE\uDAFF\uDFFF\uDB3F\uDFFE\uDB3F\uDFFF\uDB7F\uDFFE\uDB7F\uDFFF\uDBBF\uDFFE\uDBBF\uDFFF\uDBFF\uDFFE\uDBFF\uDFFF',
          dTsT);
        })()
      } catch (error) {
        expect(false).assertFalse()
      }

      try {
        (() => {
          he.encode('\0\x01\x02\x03\x04\x05\x06\x07\b\x0B\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F\x7F\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C\x8D\x8E\x8F\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C\x9D\x9E\x9F\uFDD0\uFDD1\uFDD2\uFDD3\uFDD4\uFDD5\uFDD6\uFDD7\uFDD8\uFDD9\uFDDA\uFDDB\uFDDC\uFDDD\uFDDE\uFDDF\uFDE0\uFDE1\uFDE2\uFDE3\uFDE4\uFDE5\uFDE6\uFDE7\uFDE8\uFDE9\uFDEA\uFDEB\uFDEC\uFDED\uFDEE\uFDEF\uFFFE\uFFFF\uD83F\uDFFE\uD83F\uDFFF\uD87F\uDFFE\uD87F\uDFFF\uD8BF\uDFFE\uD8BF\uDFFF\uD8FF\uDFFE\uD8FF\uDFFF\uD93F\uDFFE\uD93F\uDFFF\uD97F\uDFFE\uD97F\uDFFF\uD9BF\uDFFE\uD9BF\uDFFF\uD9FF\uDFFE\uD9FF\uDFFF\uDA3F\uDFFE\uDA3F\uDFFF\uDA7F\uDFFE\uDA7F\uDFFF\uDABF\uDFFE\uDABF\uDFFF\uDAFF\uDFFE\uDAFF\uDFFF\uDB3F\uDFFE\uDB3F\uDFFF\uDB7F\uDFFE\uDB7F\uDFFF\uDBBF\uDFFE\uDBBF\uDFFF\uDBFF\uDFFE\uDBFF\uDFFF',
            dTaTsT);
        })()
      } catch (error) {
        expect(false).assertFalse()
      }
    })

    it('escape', 0, () => {
      expect(he.escape('<img src=\'x\' onerror="prompt(1)"><script>alert(1)</script><img src="x` `<script>alert(1)</script>"` `>'))
        .assertEqual(
          '&lt;img src=&#x27;x&#x27; onerror=&quot;prompt(1)&quot;&gt;&lt;script&gt;alert(1)&lt;/script&gt;&lt;img src=&quot;x&#x60; &#x60;&lt;script&gt;alert(1)&lt;/script&gt;&quot;&#x60; &#x60;&gt;');
      expect(he.unescape('&lt;img src=&#x27;x&#x27; onerror=&quot;prompt(1)&quot;&gt;&lt;script&gt;alert(1)&lt;/script&gt;&lt;img src=&quot;x&#x60; &#x60;&lt;script&gt;alert(1)&lt;/script&gt;&quot;&#x60; &#x60;&gt;'))
        .assertEqual(
          '<img src=\'x\' onerror="prompt(1)"><script>alert(1)</script><img src="x` `<script>alert(1)</script>"` `>');
      expect(he.decode).assertEqual(he.unescape);
    })
  })
}



let aT: A = { allowUnsafeSymbols: true }
let dT: D = { decimal: true }
let eT: E = { encodeEverything: true }
let sT: S = { strict: true }
let sF: S = { strict: false }
let uT: U = {  useNamedReferences: true }
let uF: U = {  useNamedReferences: false }
let iaF: IA = { isAttributeValue: false }
let iaT: IA = { isAttributeValue: true }

let aTeT: AE = { allowUnsafeSymbols: true, encodeEverything: true }
let aTsT: AS = { allowUnsafeSymbols: true, strict: true }
let aTuT: AU = { allowUnsafeSymbols: true, useNamedReferences: true }
let dTaT: DA = { decimal: true, allowUnsafeSymbols: true }
let dTaF: DA = { decimal: true, allowUnsafeSymbols: false }
let dTeT: DE = { decimal: true, encodeEverything: true }
let dTsT: DS = { decimal: true, strict: true }
let dTuT: DU = { decimal: true, useNamedReferences: true }
let dTuF: DU = { decimal: true, useNamedReferences: false }
let eTdT: ED = { encodeEverything: true, decimal: true }
let eTuT: EU = { encodeEverything: true, useNamedReferences: true }
let eTuF: EU = { encodeEverything: true, useNamedReferences: false }
let sFiaT: SiA = {  strict: false, isAttributeValue: true }
let sTiaT: SiA = {  strict: true, isAttributeValue: true }
let sTiaF: SiA = {  strict: true, isAttributeValue: true }

let dTaTsT: DAS = { decimal: true, allowUnsafeSymbols: true, strict: true }
let dTaTuT: DAU = { decimal: true, allowUnsafeSymbols: true, useNamedReferences: true }
let dTeTaT: DEA = { decimal: true, encodeEverything: true, allowUnsafeSymbols: true }
