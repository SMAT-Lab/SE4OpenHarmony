/**
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * */

import { describe, it, expect } from '@ohos/hypium'
import parse from 'minimist'

export default function defaultBoolTest() {
  describe('minimist_default_bool', ()=> {
    it('boolean_default_true', 0, ()=> {
      let argv: ESObject = parse([], {
        boolean: 'sometrue',string:"_",
        default: {
          sometrue: true
        }
      });
      expect(argv.sometrue).assertTrue()
    });

    it('boolean_default_false', 0, ()=> {
      let argv: ESObject = parse([], {
        boolean: 'somefalse',string:"_",
        default: {
          somefalse: false
        }
      });
      expect(argv.somefalse).assertFalse()
    });

    it('boolean_default_to_null', 0, ()=> {
      let argv: ESObject = parse([], {
        boolean: 'maybe',string:"_",
        default: {
          maybe: null
        }
      });
      expect(argv.maybe).assertNull()
      let argv1: ESObject = parse(['--maybe'], {
        boolean: 'maybe',string:"_",
        default: {
          maybe: null
        }
      });
      expect(argv1.maybe).assertTrue()
    })
  })
}