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

import { describe, it, expect } from '@ohos/hypium'
import { merge } from 'diff'
import { Patch } from './interface'

export default function mergeTest() {
  describe('mergeTest', () => {

    it('merge_should_update_line_numbers_for_no_conflicts', 0, () => {
      const mine =
        'Index: test\n'
          + '===================================================================\n'
          + '--- test\theader1\n'
          + '+++ test\theader2\n'
          + '@@ -1,3 +1,4 @@\n'
          + ' line2\n'
          + ' line3\n'
          + '+line4\n'
          + ' line5\n';
      const theirs =
        'Index: test\n'
          + '===================================================================\n'
          + '--- test\theader1\n'
          + '+++ test\theader2\n'
          + '@@ -25,3 +25,4 @@\n'
          + ' foo2\n'
          + ' foo3\n'
          + '+foo4\n'
          + ' foo5\n';

      const expected: Patch = {
        index: 'test',
        oldFileName: 'test',
        oldHeader: 'header1',
        newFileName: 'test',
        newHeader: 'header2',
        hunks: [
          {
            oldStart: 1,
            oldLines: 3,
            newStart: 1,
            newLines: 4,
            lines: [
              ' line2',
              ' line3',
              '+line4',
              ' line5'
            ]
          },
          {
            oldStart: 25,
            oldLines: 3,
            newStart: 26,
            newLines: 4,
            lines: [
              ' foo2',
              ' foo3',
              '+foo4',
              ' foo5'
            ]
          }
        ]
      };
      expect(merge(mine, theirs, undefined)).assertDeepEquals(expected);
      expect(merge(theirs, mine, undefined)).assertDeepEquals(expected);
    });

    it('merge_should_merge_adjacent_additions_with_context_removal', 0, () => {
      const mine =
        'Index: test\n'
          + '===================================================================\n'
          + '--- test\theader1\n'
          + '+++ test\theader2\n'
          + '@@ -1,3 +1,4 @@\n'
          + ' line2\n'
          + ' line3\n'
          + '+line4-1\n'
          + '+line4-2\n'
          + '+line4-3\n'
          + '-line5\n';
      const theirs =
        'Index: test\n'
          + '===================================================================\n'
          + '--- test\theader1\n'
          + '+++ test\theader2\n'
          + '@@ -2,2 +2,3 @@\n'
          + ' line3\n'
          + ' line5\n'
          + '+line4-4\n';

      const expected: Patch = {
        index: 'test',
        oldFileName: 'test',
        oldHeader: 'header1',
        newFileName: 'test',
        newHeader: 'header2',
        hunks: [
          {
            oldStart: 1,
            oldLines: 3,
            newStart: 1,
            newLines: 6,
            lines: [
              ' line2',
              ' line3',
              '+line4-1',
              '+line4-2',
              '+line4-3',
              '-line5',
              '+line4-4'
            ]
          }
        ]
      };
      expect(merge(mine, theirs, undefined)).assertDeepEquals(expected);
      expect(merge(theirs, mine, undefined)).assertDeepEquals(expected);
    });

    it('merge_should_merge_removal_supersets', 0, () => {
      const mine =
        '@@ -1,3 +1,4 @@\n'
          + ' line2\n'
          + ' line3\n'
          + '-line4\n'
          + '-line4\n'
          + ' line5\n';
      const theirs =
        '@@ -1,3 +1,4 @@\n'
          + ' line2\n'
          + ' line3\n'
          + '-line4\n'
          + ' line4\n'
          + ' line5\n';

      const expected: Patch = {
        hunks: [
          {
            oldStart: 1,
            oldLines: 5,
            newStart: 1,
            newLines: 3,
            lines: [
              ' line2',
              ' line3',
              '-line4',
              '-line4',
              ' line5'
            ]
          }
        ]
      };

      expect(merge(mine, theirs, undefined)).assertDeepEquals(expected);
      expect(merge(theirs, mine, undefined)).assertDeepEquals(expected);
    });
  })
}