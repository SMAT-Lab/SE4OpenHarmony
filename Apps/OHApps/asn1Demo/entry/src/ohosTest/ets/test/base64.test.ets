/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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

import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import {btoa,atob} from 'Base64'

export default function Base64Test() {
  describe('Base64Test', ()=> {

    it('encode', 0, ()=> {
      // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
      expect(btoa('hello')).assertEqual('aGVsbG8=')
    });
    it('decode', 0, ()=>  {
      // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
      expect(atob('aGVsbG8=')).assertEqual('hello')
    });
    it('encode_01', 0, ()=> {
      // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
      expect(btoa('132900')).assertEqual('MTMyOTAw')
    });
    it('decode_01', 0, ()=> {
      // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
      expect(atob('MTMyOTAw')).assertEqual('132900')
    });
  });
}