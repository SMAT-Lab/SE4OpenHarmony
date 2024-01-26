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

import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import {encode,decode} from 'hex-encode-decode'
export default function Hex_Encode_DecodeTest() {
  describe('Hex_Encode_DecodeTest', ()=>{

    it('encode',0,()=>{
      expect(encode('hello')).assertEqual('68656c6c6f')
      expect(decode('68656c6c6f')).assertEqual('hello')
    });
    it('decode',0,()=>{
      expect(decode('68656c6c6f')).assertEqual('hello')
    });
  })}