/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:

 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { encode, decode, format, parse } from 'mdurl'

export default function abilityTest() {
  describe('ActsAbilityTest', () => {
    // Defines a test suite. Two parameters are supported: test suite name and test suite function.
    beforeAll(() => {
      // Presets an action, which is performed only once before all test cases of the test suite start.
      // This API supports only one parameter: preset action function.
    })
    beforeEach(() => {
      // Presets an action, which is performed before each unit test case starts.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: preset action function.
    })
    afterEach(() => {
      // Presets a clear action, which is performed after each unit test case ends.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: clear action function.
    })
    afterAll(() => {
      // Presets a clear action, which is performed after all test cases of the test suite end.
      // This API supports only one parameter: clear action function.
    })
    it('should_encode_a_URL', 0, () => {
      const encoded: ESObject = encode('Hello, world!');
      expect(encoded).assertEqual('Hello,%20world!');
    });

    it('should_decode_a_URL', 0, () => {
      const decoded: ESObject = decode('Hello%20world%21');
      expect(decoded).assertEqual('Hello world!');
    });

    it('should_encode_a_URL_with_custom_options', 0, () => {
      const encoded: ESObject = encode('Hello, world!', {
        encodeEverything: true
      });
      expect(encoded).assertEqual('Hello,%20world!');
    });

    it('should_decode_a_URL_with_custom_options', 0, () => {
      const decoded: ESObject = decode('Hello%2C%20world%21', {
        decodeEverything: true
      });
      expect(decoded).assertEqual('Hello%2C world!');
    });

    it('should_format_a_URL_object_to_a_string', 0, () => {
      const urlObject: ESObject = {
        protocol: 'https',
        hostname: 'www.example.com',
        pathname: '/path/to/resource',
        search: 'query=value',
      };
      const formattedUrl: ESObject = format(urlObject);
      expect(formattedUrl).assertEqual('httpswww.example.com/path/to/resourcequery=value');
    });

    it('should_parse_a_URL_string_to_an_object', 0, () => {
      const urlString = 'https://www.example.com/path/to/resource?query=value';
      const parsedUrl: ESObject = parse(urlString);
      expect(parsedUrl.protocol).assertEqual('https:')
      expect(parsedUrl.hostname).assertEqual('www.example.com')
      expect(parsedUrl.pathname).assertEqual('/path/to/resource')
      expect(parsedUrl.search).assertEqual('?query=value')
    });
  })
}