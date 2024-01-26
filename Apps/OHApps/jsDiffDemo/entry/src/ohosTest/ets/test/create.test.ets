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
import { createPatch, createTwoFilesPatch } from 'diff'

export default function createPathTest() {
  describe('createPathTest', () => {
    it('createPatch_should_handle_files_with_the_last_line_changed', 0, () => {
      expect(createPatch('test', 'line2\nline3\nline5\n', 'line2\nline3\nline4\nline5\n', 'header1', 'header2'))
        .assertEqual(
          'Index: test\n'
            + '===================================================================\n'
            + '--- test\theader1\n'
            + '+++ test\theader2\n'
            + '@@ -1,3 +1,4 @@\n'
            + ' line2\n'
            + ' line3\n'
            + '+line4\n'
            + ' line5\n');

      expect(createPatch('test', 'line2\nline3\nline4\n', 'line2\nline3\nline4\nline5\n', 'header1', 'header2'))
        .assertEqual(
          'Index: test\n'
            + '===================================================================\n'
            + '--- test\theader1\n'
            + '+++ test\theader2\n'
            + '@@ -1,3 +1,4 @@\n'
            + ' line2\n'
            + ' line3\n'
            + ' line4\n'
            + '+line5\n');

      expect(createPatch('test', 'line1\nline2\nline3\nline4\n', 'line1\nline2\nline3\nline44\n', 'header1', 'header2'))
        .assertEqual(
          'Index: test\n'
            + '===================================================================\n'
            + '--- test\theader1\n'
            + '+++ test\theader2\n'
            + '@@ -1,4 +1,4 @@\n'
            + ' line1\n'
            + ' line2\n'
            + ' line3\n'
            + '-line4\n'
            + '+line44\n');

      expect(createPatch('test', 'line1\nline2\nline3\nline4\n', 'line1\nline2\nline3\nline44\nline5\n', 'header1', 'header2'))
        .assertEqual(
          'Index: test\n'
            + '===================================================================\n'
            + '--- test\theader1\n'
            + '+++ test\theader2\n'
            + '@@ -1,4 +1,5 @@\n'
            + ' line1\n'
            + ' line2\n'
            + ' line3\n'
            + '-line4\n'
            + '+line44\n'
            + '+line5\n');
    });

    it('createPatch_should_output_no_newline_at_end_of_file_message_on_new_missing_nl', 0, () => {
      expect(createPatch('test', 'line1\nline2\nline3\nline4\n', 'line1\nline2\nline3\nline4', 'header1', 'header2'))
        .assertEqual(
          'Index: test\n'
            + '===================================================================\n'
            + '--- test\theader1\n'
            + '+++ test\theader2\n'
            + '@@ -1,4 +1,4 @@\n'
            + ' line1\n'
            + ' line2\n'
            + ' line3\n'
            + '-line4\n'
            + '+line4\n'
            + '\\ No newline at end of file\n');
    });


    it('createPatch_should_output_no_newline_at_end_of_file_message_on_both_missing_nl', 0, () => {
      expect(createPatch('test', 'line1\nline2\nline3\nline4', 'line1\nline2\nline3\nline44', 'header1', 'header2'))
        .assertEqual(
          'Index: test\n'
            + '===================================================================\n'
            + '--- test\theader1\n'
            + '+++ test\theader2\n'
            + '@@ -1,4 +1,4 @@\n'
            + ' line1\n'
            + ' line2\n'
            + ' line3\n'
            + '-line4\n'
            + '\\ No newline at end of file\n'
            + '+line44\n'
            + '\\ No newline at end of file\n');
    });


    it('createPatch_should_output_no_no_newline_at_end_of_fil_message_on_empty_file', 0, () => {
      expect(createPatch('test', '', 'line1\nline2\nline3\nline4', 'header1', 'header2')).assertEqual(
        'Index: test\n'
          + '===================================================================\n'
          + '--- test\theader1\n'
          + '+++ test\theader2\n'
          + '@@ -0,0 +1,4 @@\n'
          + '+line1\n'
          + '+line2\n'
          + '+line3\n'
          + '+line4\n'
          + '\\ No newline at end of file\n');

      expect(createPatch('test', 'line1\nline2\nline3\nline4', '', 'header1', 'header2')).assertEqual(
        'Index: test\n'
          + '===================================================================\n'
          + '--- test\theader1\n'
          + '+++ test\theader2\n'
          + '@@ -1,4 +0,0 @@\n'
          + '-line1\n'
          + '-line2\n'
          + '-line3\n'
          + '-line4\n'
          + '\\ No newline at end of file\n');
    });

    it('createPatch_should_not_output_no_newline_at_end_of_file_message_when_eof_outside_hunk', 0, () => {
      expect(createPatch('test', 'line11\nline2\nline3\nline4\nline4\nline4\nline4', 'line1\nline2\nline3\nline4\nline4\nline4\nline4', 'header1', 'header2'))
        .assertEqual(
          'Index: test\n'
            + '===================================================================\n'
            + '--- test\theader1\n'
            + '+++ test\theader2\n'
            + '@@ -1,5 +1,5 @@\n'
            + '-line11\n'
            + '+line1\n'
            + ' line2\n'
            + ' line3\n'
            + ' line4\n'
            + ' line4\n');
    });


    it('createTwoFilesPatch_should_omit_index_with_multiple_file_names', 0, () => {
      const expectedResult =
        '===================================================================\n'
          + '--- foo\n'
          + '+++ bar\n';
      const diffResult: string = createTwoFilesPatch('foo', 'bar', '', '');
      expect(diffResult).assertEqual(expectedResult);
    });

  })
}