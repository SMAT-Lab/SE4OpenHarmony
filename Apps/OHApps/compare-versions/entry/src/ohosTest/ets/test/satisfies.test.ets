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
import { satisfies } from 'compare-versions';

export default function satisfiesTest() {
  describe('satisfiesTest', () => {

    const runTests = (dataSet: Array<[string, string, boolean]>) => {
      dataSet.forEach((data) => {
        const v = data[0];
        const m = data[1];
        const expected = data[2];
        _it(`${v} ${expected ? 'satisfies' : 'violates'} ${m}`, () => {
          expect(satisfies(v, m)).to.equal(expected)
          // assert.strictEqual(satisfies(v, m), expected);
        });
      });
    };
    _it('tilde - https://docs.npmjs.com/cli/v6/using-npm/semver#tilde-ranges-123-12-1', () => {
      runTests([
        ['1.0.0', '~1.0.1', false],
        ['1.0.1', '~1.0.1', true],
        ['1.2.5', '~1.2.3', true],
        ['1.3.0', '~1.2.3', false],
        ['1.2.5', '~1.2', true], // (Same as 1.2.x)
        ['1.3.0', '~1.2', false], // (Same as 1.2.x)
        ['1.0.0', '~1', true], // (Same as 1.x)
        ['2.0.0', '~1', false], // (Same as 1.x)
        ['0.2.5', '~0.2.3', true],
        ['0.3.0', '~0.2.3', false],
        ['0.2.5', '~0.2', true], // (Same as 0.2.x)
        ['0.3.0', '~0.2', false], // (Same as 0.2.x)
        ['0.0.0', '~0', true], // (Same as 0.x)
        ['0.1.2', '~0', true], // (Same as 0.x)
        ['1.0.0', '~0', false],// (Same as 0.x)
      ]);
    });
    _it('caret - https://docs.npmjs.com/cli/v6/using-npm/semver#caret-ranges-123-025-004', () => {
      runTests([
        ['1.0.0', '^1', true],
        ['1.0.0', '^1.0', true],
        ['1.0.0', '^1.0.0', true],
        ['1.2.0', '^1.0.0', true],
        ['v1.2.0', '^1.0.0', true],
        ['2.0.0', '^1.0.0', false],
        ['1.0.0', '^1.2.0', false],
        ['1.0.1', '^1.2.0', false],
        ['1.3.4', '^1.2.3', true],
        ['2.0.0', '^1.2.3', false],
        ['0.3.0', '^0.2.3', false],
        ['0.0.4', '^0.0.3', false],
      ]);
    });

    _it("default satisfies", () => {
      runTests([
        ['1.2.0', '>1.0.0', true],
        ['1.2.0', '<1.0.0', false],
        ['1.0.0', '<=1.0.0', true],
        ['1.0.0', '<=2.0.0', true],
        ['1.0.1', '1.0.0', false],
        ['1.0.0', '1.0.0', true],
        ['10.1.8', '>10.0.4', true],
        ['10.1.8', '>=10.0.4', true],
        ['10.0.1', '=10.0.1', true],
        ['10.0.1', '=10.1.*', false],
        ['10.1.1', '<10.2.2', true],
        ['10.1.1', '<10.0.2', false],
        ['10.1.1', '<=10.2.2', true],
        ['10.1.1', '<=10.1.1', true],
        ['10.1.1', '<=10.0.2', false],
        ['10.1.1', '>=10.0.2', true],
        ['10.1.1', '>=10.1.1', true],
        ['10.1.1', '>=10.2.2', false],
        ['11.0.0', '>=10.1.1', true],
        ['3', '3.x.x', true],
        ['3.3', '3.x.x', true],
        ['3.3.3', '3.x.x', true],
        ['3.x.x', '3.3.3', true],
        ['3.3.3', '3.X.X', true],
        ['3.3.3', '3.3.x', true],
        ['3.3.3', '3.*.*', true],
        ['3.3.3', '3.3.*', true],
        ['3.0.3', '3.0.*', true],
        ['1.1.0', '1.2.x', false],
        ['1.1.0', '2.x.x', false],
        ['2.0.0', '<2.x.x', false],
        ['2.0.0', '<=2.x.x', true],
        ['2.0.0', '>2.x.x', false],
      ]);
    })


    _it('pre-release versions - https://semver.org/#spec-item-9', () => {
      runTests([
        ['1.2.3-beta.4', '~1.2.3-beta.2', true],
        ['1.2.3-beta.1', '~1.2.3-beta.2', false],
        ['1.2.4-beta.2', '~1.2.3-beta.2', false],
        ['1.2.3-beta.4', '^1.2.3-beta.2', true],
        ['1.2.4-beta.2', '^1.2.3-beta.2', false],
        ['2.0.0', '^1.2.3-beta.2', false],
        ['0.0.3-beta.2', '^0.0.3-beta', true],
        ['0.0.3-pr.2', '^0.0.3-beta', true],
        ['0.0.4', '^0.0.3-beta', false],
      ]);
    });

    _it('comparator sets - https://docs.npmjs.com/cli/v6/using-npm/semver#ranges', () => {
      runTests([
        ['1.1.0', '>=1.2.7 <1.3.0', false],
        ['1.2.9', '>=1.2.7 <1.3.0', true],
        ['1.3.0', '>=1.2.7 <1.3.0', false],
        ['1.2.9', '   >=1.2.7     <1.3.0 ', true],
        ['1.3.0', '   >=1.2.7     <1.3.0 ', false],
        ['1.2.7', '1.2.7 || >=1.2.9 <2.0.0', true],
        ['1.2.9', '1.2.7 || >=1.2.9 <2.0.0', true],
        ['1.4.6', '1.2.7 || >=1.2.9 <2.0.0', true],
        ['1.2.8', '1.2.7 || >=1.2.9 <2.0.0', false],
        ['2.0.0', '1.2.7 || >=1.2.9 <2.0.0', false],
        ['2.0.0', '1.2.7 || >=1.2.9 <2.0.0', false],
        ['1.4.6', '  1.2.7  || >=1.2.9    <2.0.0   ', true],
        ['2.0.0', '  1.2.7  || >=1.2.9    <2.0.0   ', false],
        ['1.0.0', '1.2.3 - 2.3.4', false],
        ['1.2.3', '1.2.3 - 2.3.4', true],
        ['1.5.1', '1.2.3 - 2.3.4', true],
        ['2.3.4', '1.2.3 - 2.3.4', true],
        ['2.4.0', '1.2.3 - 2.3.4', false],
        ['12.25.0', '^12.22.0 || ^14.17.0 || >=16.0.0', true],
        ['14.25.0', '^12.22.0 || ^14.17.0 || >=16.0.0', true],
        ['17', '^12.22.0 || ^14.17.0 || >=16.0.0', true],
        ['15', '^12.22.0 || ^14.17.0 || >=16.0.0', false],
      ]);
    });

    _it('malformed input - https://docs.npmjs.com/cli/v6/using-npm/semver#hyphen-ranges-xyz---abc', () => {
      runTests([
        ['1.2.3', '> 1.2.3', false],
        ['1.2.4', '> 1.2.3', true],
        ['1.2.3', '> 1.2.3 < 1.2.5', false],
        ['1.2.4', '> 1.2.3 < 1.2.5', true],
        ['0.0.0', '> 1.2.3 <=  1.2.5   ||   0.0.0', true],
        ['1.2.5', '> 1.2.3 <=  1.2.5   ||   0.0.0', true],
        ['1.3.0', '> 1.2.3 <=  1.2.5   ||   0.0.0', false],
      ]);
    });

  })
}