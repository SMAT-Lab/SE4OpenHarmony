/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import required from 'requires-port'
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'

export default function abilityTest() {
  describe('ActsAbilityTest',  ()=> {
    // Defines a test suite. Two parameters are supported: test suite name and test suite function.
    beforeAll(()=> {
      // Presets an action, which is performed only once before all test cases of the test suite start.
      // This API supports only one parameter: preset action function.
    })
    beforeEach(()=> {
      // Presets an action, which is performed before each unit test case starts.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: preset action function.
    })
    afterEach(()=> {
      // Presets a clear action, which is performed after each unit test case ends.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: clear action function.
    })
    afterAll(()=> {
      // Presets a clear action, which is performed after all test cases of the test suite end.
      // This API supports only one parameter: clear action function.
    })
    it('required_number',0, ()=> {

      expect(required(8080,'http')).assertTrue()
      expect(required(8080,'ws')).assertTrue()
      expect(required(8080,'ftp')).assertTrue()
      expect(required(8080,'gopher')).assertTrue()
      expect(required(8080,'file')).assertFalse()
    })
    it('required_str',0, ()=> {

      expect(required('8080','http')).assertTrue()
      expect(required('8080','ws')).assertTrue()
      expect(required('8080','ftp')).assertTrue()
      expect(required('8080','gopher')).assertTrue()
      expect(required('8080','file')).assertFalse()
    })
    it('is_exported_as_a_function',0, ()=> {
      expect(typeof required).assertEqual('function');
    });

    it('does_not_require_empty_ports',0, ()=> {
      expect(required('', 'http')).assertFalse();
      expect(required('', 'wss')).assertFalse();
      expect(required('', 'ws')).assertFalse();
      expect(required('', 'cowsack')).assertFalse();
    });

    it('expects_true_for_unknown_protocols',0,()=> {
      expect(required('808', 'foo')).assertTrue();
      expect(required('80', 'bar')).assertTrue();
    });

    it('never_requires_port_numbers_for_file',0, ()=> {
      expect(required(8080, 'file')).assertFalse();
    });

    it('does_not_require_port_80_for_http',0, ()=> {
      expect(required('80', 'http')).assertFalse();
      expect(required(80, 'http')).assertFalse();
      expect(required(80, 'http://')).assertFalse();
      expect(required(80, 'http://www.google.com')).assertFalse();

      expect(required('8080', 'http')).assertTrue();
      expect(required(8080, 'http')).assertTrue();
      expect(required(8080, 'http://')).assertTrue();
      expect(required(8080, 'http://www.google.com')).assertTrue();
    });

    it('does_not_require_port_80_for_ws',0, ()=> {
      expect(required('80', 'ws')).assertFalse();
      expect(required(80, 'ws')).assertFalse();
      expect(required(80, 'ws://')).assertFalse();
      expect(required(80, 'ws://www.google.com')).assertFalse();

      expect(required('8080', 'ws')).assertTrue();
      expect(required(8080, 'ws')).assertTrue();
      expect(required(8080, 'ws://')).assertTrue();
      expect(required(8080, 'ws://www.google.com')).assertTrue();
    });

    it('does_not_require_port_443_for_https',0, ()=> {
      expect(required('443', 'https')).assertFalse();
      expect(required(443, 'https')).assertFalse();
      expect(required(443, 'https://')).assertFalse();
      expect(required(443, 'https://www.google.com')).assertFalse();

      expect(required('8080', 'https')).assertTrue();
      expect(required(8080, 'https')).assertTrue();
      expect(required(8080, 'https://')).assertTrue();
      expect(required(8080, 'https://www.google.com')).assertTrue();
    });

    it('does_not_require_port_443_for_wss',0, ()=> {
      expect(required('443', 'wss')).assertFalse();
      expect(required(443, 'wss')).assertFalse();
      expect(required(443, 'wss://')).assertFalse();
      expect(required(443, 'wss://www.google.com')).assertFalse();

      expect(required('8080', 'wss')).assertTrue();
      expect(required(8080, 'wss')).assertTrue();
      expect(required(8080, 'wss://')).assertTrue();
      expect(required(8080, 'wss://www.google.com')).assertTrue();
    });

    it('does_not_require_port_21_for_ftp',0, ()=> {
      expect(required('21', 'ftp')).assertFalse();
      expect(required(21, 'ftp')).assertFalse();
      expect(required(21, 'ftp://')).assertFalse();
      expect(required(21, 'ftp://www.google.com')).assertFalse();

      expect(required('8080', 'ftp')).assertTrue();
      expect(required(8080, 'ftp')).assertTrue();
      expect(required(8080, 'ftp://')).assertTrue();
      expect(required(8080, 'ftp://www.google.com')).assertTrue();
    });

    it('does_not_require_port_70_for_gopher',0, ()=> {
      expect(required('70', 'gopher')).assertFalse();
      expect(required(70, 'gopher')).assertFalse();
      expect(required(70, 'gopher://')).assertFalse();
      expect(required(70, 'gopher://www.google.com')).assertFalse();

      expect(required('8080', 'gopher')).assertTrue();
      expect(required(8080, 'gopher')).assertTrue();
      expect(required(8080, 'gopher://')).assertTrue();
      expect(required(8080, 'gopher://www.google.com')).assertTrue();
    });
  })
}