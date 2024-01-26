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
import { it as _it, describe, expect } from '../utils/utils';
import { compareVersions } from 'compare-versions';
import { data } from '../utils/module';

export default function compareTest() {
  describe('invalid_input', () => {
    _it('invalid_inputRun', () => {

    })
    for (let i = 0;i < data.length - 1; i++) {
      let v1 = data[i][0];
      let v2 = data[i][1]
      _it(`should throw on ${v1}`, () => {
        expect(() => {
          compareVersions(v1 as string, v1 as string);
        }).to.throw(v2 as number)
      });
    }
  });
}