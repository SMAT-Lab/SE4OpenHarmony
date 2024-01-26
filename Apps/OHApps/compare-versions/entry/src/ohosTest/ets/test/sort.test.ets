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
import { it as _it, describe, diff, expect } from '../utils/utils';
import { compareVersions } from 'compare-versions';

export default function sortTest() {
  describe('sortTest', () => {

    _it('should sort versions', () => {
      const versions = [
        '1.2.3',
        '4.11.6',
        '4.2.0',
        '1.5.19',
        '1.5.5',
        '4.1.3',
        '2.3.1',
        '10.5.5',
        '11.3.0',
      ];
      expect(diff(versions.sort(compareVersions), [
        '1.2.3',
        '1.5.5',
        '1.5.19',
        '2.3.1',
        '4.1.3',
        '4.2.0',
        '4.11.6',
        '10.5.5',
        '11.3.0',
      ])).to.equal(true)
    });

    _it('should sort different digits', () => {
      const versions = ['1.0', '1.0.0', '1.0.1'];

      expect(diff(versions.sort(compareVersions), ['1.0', '1.0.0', '1.0.1'])).to.equal(true);
    });

    _it('should sort pre-release', () => {
      const versions = ['1.0.0', '1.0.1', '1.0.1-gamma', '1.0.1-alpha'];

      expect(diff(versions.sort(compareVersions), [
        '1.0.0',
        '1.0.1-alpha',
        '1.0.1-gamma',
        '1.0.1',
      ])).to.equal(true);
    });
  })
}