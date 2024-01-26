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
import { decode } from 'mdurl'

export default function decodeTest() {
  describe('decode', ()=> {
    it('should_decode_xx',0, ()=> {
      expect(decode('x%20xx%20%2520')).assertEqual('x xx %20')
    });

    it('should_not_decode_invalid_sequences',0, ()=> {
      expect(decode('%2g%z1%%')).assertEqual( '%2g%z1%%')
    });

    it('should_not_decode_reservedSet',0, ()=> {
      expect(decode('%20%25%20', '%')).assertEqual(' %25 ');
      expect(decode('%20%25%20', ' ')).assertEqual('%20%%20');
      expect(decode('%20%25%20', ' %')).assertEqual('%20%25%20');
    });
  })
}