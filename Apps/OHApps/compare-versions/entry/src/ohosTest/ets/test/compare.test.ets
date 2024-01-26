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

export default function compareTest() {
  describe('compareTest', () => {
    const cmp = {
      '1': '>',
      '0': '=',
      '-1': '<',
    } as Record<string, string>;

    const runTests = (dataSet: Array<[string, string, number]>) => {
      dataSet.forEach((data) => {
        const v1 = data[0];
        const v2 = data[1];
        const expected = data[2];
        _it(`${v1} ${cmp[expected]} ${v2}`, () => {
          const r1 = compareVersions(v1, v2);
          const r2 = expected;
          expect(r1 === r2).to.equal(true)
        });
      });
    };

    _it('single-segment_versions', () => {
      runTests([
        ['10', '9', 1],
        ['10', '10', 0],
        ['9', '10', -1],
      ]);
    });

    _it('two-segment_versions', () => {
      runTests([
        ['10.8', '10.4', 1],
        ['10.1', '10.1', 0],
        ['10.1', '10.2', -1],
      ]);
    });

    _it('three-segment versions', () => {
      runTests([
        ['10.1.8', '10.0.4', 1],
        ['10.0.1', '10.0.1', 0],
        ['10.1.1', '10.2.2', -1],
        ['11.0.10', '11.0.2', 1],
        ['11.0.2', '11.0.10', -1],
      ]);
    });

    _it('four-segment_versions', () => {
      runTests([
        ['1.0.0.0', '1', 0],
        ['1.0.0.0', '1.0', 0],
        ['1.0.0.0', '1.0.0', 0],
        ['1.0.0.0', '1.0.0.0', 0],
        ['1.2.3.4', '1.2.3.4', 0],
        ['1.2.3.4', '1.2.3.04', 0],
        ['v1.2.3.4', '01.2.3.4', 0],
        ['1.2.3.4', '1.2.3.5', -1],
        ['1.2.3.5', '1.2.3.4', 1],
        ['1.0.0.0-alpha', '1.0.0-alpha', 0],
        ['1.0.0.0-alpha', '1.0.0.0-beta', -1],
      ]);
    });

    _it('different segment versions', () => {
      runTests([
        ['11.1.10', '11.0', 1],
        ['1.1.1', '1', 1],
        ['01.1.0', '1.01', 0],
        ['1.0.0', '1', 0],
        ['10.0.0', '10.114', -1],
        ['1.0', '1.4.1', -1],
      ]);
    });

    _it('pre-release versions - https://semver.org/#spec-item-9', () => {
      runTests([
        ['1.0.0-alpha.1', '1.0.0-alpha', 1],
        ['1.0.0-alpha', '1.0.0-alpha.1', -1],
        ['1.0.0-alpha.1', '1.0.0-alpha.beta', -1],
        ['1.0.0-alpha.beta', '1.0.0-beta', -1],
        ['1.0.0-beta', '1.0.0-beta.2', -1],
        ['1.0.0-beta.2', '1.0.0-beta.11', -1],
        ['1.0.0-beta.11', '1.0.0-rc.1', -1],
        ['1.0.0-rc.1', '1.0.0', -1],
        ['1.0.0-alpha', '1', -1],
        ['1.0.0-beta.11', '1.0.0-beta.1', 1],
        ['1.0.0-beta.10', '1.0.0-beta.9', 1],
        ['1.0.0-beta.10', '1.0.0-beta.90', -1],
      ]);
    });

    _it('ignore build metadata - https://semver.org/#spec-item-10', () => {
      runTests([
        ['1.4.0-build.3928', '1.4.0-build.3928+sha.a8d9d4f', 0],
        ['1.4.0-build.3928+sha.b8dbdb0', '1.4.0-build.3928+sha.a8d9d4f', 0],
        ['1.0.0-alpha+001', '1.0.0-alpha', 0],
        ['1.0.0-beta+exp.sha.5114f85', '1.0.0-beta+exp.sha.999999', 0],
        ['1.0.0+20130313144700', '1.0.0', 0],
        ['1.0.0+20130313144700', '2.0.0', -1],
        ['1.0.0+20130313144700', '1.0.1+11234343435', -1],
        ['1.0.1+1', '1.0.1+2', 0],
        ['1.0.0+a-a', '1.0.0+a-b', 0],
      ]);
    });

    _it('ignore leading `v`', () => {
      runTests([
        ['v1.0.0', '1.0.0', 0],
        ['v1.0.0', 'v1.0.0', 0],
        ['v1.0.0', 'v1.0.0', 0],
        ['v1.0.0-alpha', '1.0.0-alpha', 0],
      ]);
    });

    _it('ignore leading `0`', () => {
      runTests([
        ['01.0.0', '1', 0],
        ['01.0.0', '1.0.0', 0],
        ['1.01.0', '1.01.0', 0],
        ['1.0.03', '1.0.3', 0],
        ['1.0.03-alpha', '1.0.3-alpha', 0],
        ['v01.0.0', '1.0.0', 0],
        ['v01.0.0', '2.0.0', -1],
      ]);
    });

    _it('wildcards', () => {
      runTests([
        ['3', '3.x.x', 0],
        ['3.3', '3.x.x', 0],
        ['3.3.3', '3.x.x', 0],
        ['3.x.x', '3.3.3', 0],
        ['3.3.3', '3.X.X', 0],
        ['3.3.3', '3.3.x', 0],
        ['3.3.3', '3.*.*', 0],
        ['3.3.3', '3.3.*', 0],
        ['3.0.3', '3.0.*', 0],
        ['0.7.x', '0.6.0', 1],
        ['0.7.x', '0.6.0-asdf', 1],
        ['0.7.x', '0.6.2', 1],
        ['0.7.x', '0.7.0-asdf', 1],
        ['1.2.*', '1.1.3', 1],
        ['1.2.*', '1.1.9999', 1],
        ['1.2.x', '1.0.0', 1],
        ['1.2.x', '1.1.0', 1],
        ['1.2.x', '1.1.3', 1],
        ['2.*.*', '1.0.1', 1],
        ['2.*.*', '1.1.3', 1],
        ['2.x.x', '1.0.0', 1],
        ['2.x.x', '1.1.3', 1],
      ]);
    });


    _it("default input", () => {
      runTests([
        ['0.1.20', '0.1.5', 1],
        ['0.6.1-1', '0.6.1-0', 1],
        ['1', '0.0.0-beta', 1],
        ['1', '0.2.3', 1],
        ['1', '0.2.4', 1],
        ['1', '1.0.0-0', 1],
        ['1', '1.0.0-beta', 1],
        ['1.0', '0.0.0', 1],
        ['1.0', '0.1.0', 1],
        ['1.0', '0.1.2', 1],
        ['1.0.0', '0.0.0', 1],
        ['1.0.0', '0.0.1', 1],
        ['1.0.0', '0.2.3', 1],
        ['1.0.0-beta.2', '1.0.0-beta.1', 1],
        ['1.2.2', '1.2.1', 1],
        ['2', '1.0.0', 1],
        ['2', '1.0.0-beta', 1],
        ['2', '1.9999.9999', 1],
        ['2.0.0', '1.0.0', 1],
        ['2.0.0', '1.1.1', 1],
        ['2.0.0', '1.2.9', 1],
        ['2.0.0', '1.9999.9999', 1],
        ['2.3', '2.2.1', 1],
        ['2.3', '2.2.2', 1],
        ['2.4', '2.3.0', 1],
        ['2.4', '2.3.5', 1],
        ['3.2.1', '2.3.2', 1],
        ['3.2.1', '3.2.0', 1],
        ['v0.5.4-pre', '0.5.4-alpha', 1],
        ['v3.2.1', 'v2.3.2', 1],
      ]);
    })

  })
}