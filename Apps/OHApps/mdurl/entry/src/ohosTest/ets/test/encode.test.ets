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

import { describe, it, expect } from '@ohos/hypium'
import { encode } from 'mdurl'

export default function encodeTest() {
  describe('encode', ()=> {
    it('should_encode_percent',0, ()=> {
      expect(encode('%%%')).assertEqual('%25%25%25');
    });

    it('should_encode_control_chars',0, ()=> {
      expect(encode('\r\n')).assertEqual('%0D%0A');
    });

    it('should_not_encode_parts_of_an_url',0, ()=> {
      expect(encode('?#')).assertEqual('?#');
    });

    it('should_not_encode_commonmark_tests',0, ()=> {
      expect(encode('[]^')).assertEqual('%5B%5D%5E');
    });

    it('should_encode_spaces',0, ()=> {
      expect(encode('my url')).assertEqual('my%20url');
    });

    it('should_encode_unicode',0, ()=> {
      expect(encode('φου')).assertEqual('%CF%86%CE%BF%CF%85');
    });

    it('should_encode_if_it_doesn_t_start_a_valid_escape_seq',0, ()=> {
      expect(encode('%FG')).assertEqual('%25FG');
    });

    it('should_preserve_non_utf8_encoded_characters',0, ()=> {
      expect(encode('%00%FF')).assertEqual( '%00%FF');
    });

    it('should_encode_characters_on_the_cache_borders',0, ()=> {
      // protects against off-by-one in cache implementation
      expect(encode('\x00\x7F\x80')).assertEqual('%00%7F%C2%80');
    });

    it('encode_string.unescapedSet_',0, ()=> {
      expect(encode('!@#$', '@$')).assertEqual( '%21@%23$');
    });

    it('encode_string.keepEscaped_true_',0, ()=> {
      expect(encode('%20%2G', true)).assertEqual('%20%252G');
    });

    it('encode_string.keepEscaped_false_',0, ()=> {
      expect(encode('%20%2G', false)).assertEqual( '%2520%252G');
    });

    it('encode_string.unescapedSet.keepEscaped_',0, ()=> {
      expect(encode('!@%25', '@', false)).assertEqual('%21@%2525');
    });
    it('bad_surrogates.high',0, ()=> {
      expect(encode('\uD800foo')).assertEqual('%EF%BF%BDfoo');
      expect(encode('foo\uD800')).assertEqual('foo%EF%BF%BD');
    });

    it('bad_surrogates.low',0, ()=> {
      expect(encode('\uDD00foo')).assertEqual( '%EF%BF%BDfoo');
      expect(encode('foo\uDD00')).assertEqual( 'foo%EF%BF%BD');
    });

    it('valid_one',0, ()=> {
      expect(encode('\uD800\uDD00')).assertEqual('%F0%90%84%80');
    });
  })
}