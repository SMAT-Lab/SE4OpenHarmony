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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect } from '../utils/util'
import { Metadata } from 'inversify/lib/planning/metadata';

export default function metadataTest() {
  describe('metadataTest',  ()=> {
    _it('Should_set_its_own_properties_correctly', () => {
      const m = new Metadata('power', 5);
      expect(m.key).to.equals('power');
      expect(m.value).to.equals(5);
    });
  })
}