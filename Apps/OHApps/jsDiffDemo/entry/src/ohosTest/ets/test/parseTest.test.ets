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
import { parsePatch } from 'diff'
import { Patch } from './interface'

export default function parseTest() {
  describe('parseTest', () => {
    it('parsePatch_should_parse_basic_patches', 0, () => {
      let expected: Patch[] = [{
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
            ],
            linedelimiters: [
              '\n',
              '\n',
              '\n',
              '\n'
            ]
          }
        ]
      }]
      expect(parsePatch(
        `@@ -1,3 +1,4 @@
 line2
 line3
+line4
 line5`)).assertDeepEquals(expected);
    });
    it('parsePatch_should_parse_single_line_hunks', 0, () => {
      let expected: Patch[] = [{
        hunks: [
          {
            oldStart: 1,
            oldLines: 1,
            newStart: 1,
            newLines: 1,
            lines: [
              '-line3',
              '+line4'
            ],
            linedelimiters: [
              '\n',
              '\n'
            ]
          }
        ]
      }]
      expect(parsePatch(
        `@@ -1 +1 @@
-line3
+line4`))
        .assertDeepEquals(expected);
    });
    it('parsePatch_should_parse_multiple_hunks', 0, () => {
      let expected: Patch[] = [{
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
            ],
            linedelimiters: [
              '\n',
              '\n',
              '\n',
              '\n'
            ]
          },
          {
            oldStart: 4,
            oldLines: 3,
            newStart: 1,
            newLines: 4,
            lines: [
              ' line2',
              ' line3',
              '-line4',
              ' line5'
            ],
            linedelimiters: [
              '\n',
              '\n',
              '\n',
              '\n'
            ]
          }
        ]
      }]
      expect(parsePatch(
        `@@ -1,3 +1,4 @@
 line2
 line3
+line4
 line5
@@ -4,3 +1,4 @@
 line2
 line3
-line4
 line5`))
        .assertDeepEquals(expected);
    });
  })
}