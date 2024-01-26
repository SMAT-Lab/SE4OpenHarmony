let __generate__Id: number = 0;
function generateId(): string {
    return "apply.test_" + ++__generate__Id;
}
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
import { describe, it, expect } from '@ohos/hypium';
import { createPatch, applyPatch, applyPatches, parsePatch } from 'diff';
import { Patch, Options } from './interface';
export default function applyTest() {
    describe('applyTest', () => {
        it('applyPatch_accept_parsed_patches', 0, () => {
            const patch: Patch[] = parsePatch('Index: test\n'
                + '===================================================================\n'
                + '--- test\theader1\n'
                + '+++ test\theader2\n'
                + '@@ -1,3 +1,4 @@\n'
                + ' line2\n'
                + ' line3\n'
                + '+line4\n'
                + ' line5\n');
            let result: string = applyPatch('line2\n'
                + 'line3\n'
                + 'line5\n', patch[0]);
            let str = 'line2\n'
                + 'line3\n'
                + 'line4\n'
                + 'line5\n';
            expect(str)
                .assertEqual(result);
        });
        it('should_merge_EOFNL', 0, () => {
            expect(applyPatch('line1\nline2\nline3\nline4\n', 'Index: test\n'
                + '===================================================================\n'
                + '--- test\theader1\n'
                + '+++ test\theader2\n'
                + '@@ -1,4 +1,4 @@\n'
                + ' line1\n'
                + ' line2\n'
                + ' line3\n'
                + '+line4\n'
                + '\\ No newline at end of file\n'
                + '-line4\n'))
                .assertEqual('line1\nline2\nline3\nline4');
            expect(applyPatch('line1\nline2\nline3\nline4', 'Index: test\n'
                + '===================================================================\n'
                + '--- test\theader1\n'
                + '+++ test\theader2\n'
                + '@@ -1,4 +1,4 @@\n'
                + ' line1\n'
                + ' line2\n'
                + ' line3\n'
                + '+line4\n'
                + '-line4\n'
                + '\\ No newline at end of file\n'))
                .assertEqual('line1\nline2\nline3\nline4\n');
            expect(applyPatch('line11\nline2\nline3\nline4', 'Index: test\n'
                + '===================================================================\n'
                + '--- test\theader1\n'
                + '+++ test\theader2\n'
                + '@@ -1,4 +1,4 @@\n'
                + '+line1\n'
                + '-line11\n'
                + ' line2\n'
                + ' line3\n'
                + ' line4\n'
                + '\\ No newline at end of file\n'))
                .assertEqual('line1\nline2\nline3\nline4');
            expect(applyPatch('line11\nline2\nline3\nline4\nline4\nline4\nline4', 'Index: test\n'
                + '===================================================================\n'
                + '--- test\theader1\n'
                + '+++ test\theader2\n'
                + '@@ -1,5 +1,5 @@\n'
                + '+line1\n'
                + '-line11\n'
                + ' line2\n'
                + ' line3\n'
                + ' line4\n'
                + ' line4\n'))
                .assertEqual('line1\nline2\nline3\nline4\nline4\nline4\nline4');
            // Test empty lines in patches
            expect(applyPatch('line11\nline2\n\nline4', 'Index: test\n'
                + '===================================================================\n'
                + '--- test\theader1\n'
                + '+++ test\theader2\n'
                + '@@ -1,4 +1,4 @@\n'
                + '+line1\n'
                + '-line11\n'
                + ' line2\n'
                + '\n'
                + ' line4\n'
                + '\\ No newline at end of file\n'))
                .assertEqual('line1\nline2\n\nline4');
        });
        it('should_apply_patches', 0, () => {
            const oldFile = 'value\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'remove value\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'remove value\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'value\n'
                + 'context\n'
                + 'context';
            const newFile = 'new value\n'
                + 'new value 2\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'add value\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'context\n'
                + 'new value\n'
                + 'new value 2\n'
                + 'context\n'
                + 'context';
            const diffFile = 'Index: testFileName\n'
                + '===================================================================\n'
                + '--- testFileName\tOld Header\n'
                + '+++ testFileName\tNew Header\n'
                + '@@ -1,5 +1,6 @@\n'
                + '+new value\n'
                + '+new value 2\n'
                + '-value\n'
                + ' context\n'
                + ' context\n'
                + ' context\n'
                + ' context\n'
                + '@@ -7,9 +8,8 @@\n'
                + ' context\n'
                + ' context\n'
                + ' context\n'
                + ' context\n'
                + '-remove value\n'
                + ' context\n'
                + ' context\n'
                + ' context\n'
                + ' context\n'
                + '@@ -17,20 +17,21 @@\n'
                + ' context\n'
                + ' context\n'
                + ' context\n'
                + ' context\n'
                + '-remove value\n'
                + ' context\n'
                + ' context\n'
                + ' context\n'
                + ' context\n'
                + ' context\n'
                + ' context\n'
                + ' context\n'
                + ' context\n'
                + '+add value\n'
                + ' context\n'
                + ' context\n'
                + ' context\n'
                + ' context\n'
                + '+new value\n'
                + '+new value 2\n'
                + '-value\n'
                + ' context\n'
                + ' context\n'
                + '\\ No newline at end of file\n';
            expect(applyPatch(oldFile, diffFile)).assertEqual(newFile);
            const identityFile = 'Index: testFileName\n'
                + '===================================================================\n'
                + '--- testFileName\tOld Header\n'
                + '+++ testFileName\tNew Header\n';
            expect(applyPatch(oldFile, identityFile)).assertEqual(oldFile);
        });
        it('should_apply_multiline_patches_with_zero_context_and_zero_removed', 0, () => {
            expect(applyPatch('line2\n'
                + 'line3\n'
                + 'line7\n', '--- test\theader1\n'
                + '+++ test\theader2\n'
                + '@@ -2,0 +3,3 @@\n'
                + '+line4\n'
                + '+line5\n'
                + '+line6\n'))
                .assertEqual('line2\n'
                + 'line3\n'
                + 'line4\n'
                + 'line5\n'
                + 'line6\n'
                + 'line7\n');
        });
        it('should_apply_single_line_patches_with_zero_context_and_zero_removed_at_start_of_file', 0, () => {
            expect(applyPatch('line2\n'
                + 'line3\n', '--- test\theader1\n'
                + '+++ test\theader2\n'
                + '@@ -0,0 +1 @@\n'
                + '+line1\n'))
                .assertEqual('line1\n'
                + 'line2\n'
                + 'line3\n');
        });
        it('should_apply_multi_line_patches_with_zero_context_and_zero_removed_at_start_of_file', 0, () => {
            expect(applyPatch('line3\n'
                + 'line4\n', '--- test\theader1\n'
                + '+++ test\theader2\n'
                + '@@ -0,0 +1,2 @@\n'
                + '+line1\n'
                + '+line2\n'))
                .assertEqual('line1\n'
                + 'line2\n'
                + 'line3\n'
                + 'line4\n');
        });
        it('should_apply_multi_line_patches_with_zero_context_and_zero_removed_at_end_of_file', 0, () => {
            expect(applyPatch('line1\n', '--- test\theader1\n'
                + '+++ test\theader2\n'
                + '@@ -1,0 +2 @@\n'
                + '+line2\n'))
                .assertEqual('line1\n'
                + 'line2\n');
        });
        it('should_apply_single_line_patches_with_zero_context_and_zero_added_at_beginning_of_file', 0, () => {
            expect(applyPatch('line1\n'
                + 'line2\n', '--- test\theader1\n'
                + '+++ test\theader2\n'
                + '@@ -1 +0,0 @@\n'
                + '-line1\n'))
                .assertEqual('line2\n');
        });
        it('should_apply_multi_line_patches_with_zero_context_and_zero_added_at_beginning_of_file', 0, () => {
            expect(applyPatch('line1\n'
                + 'line2\n'
                + 'line3\n', '--- test\theader1\n'
                + '+++ test\theader2\n'
                + '@@ -1,2 +0,0 @@\n'
                + '-line1\n'
                + '-line2\n'))
                .assertEqual('line3\n');
        });
        it('should_apply_single_line_patches_with_zero_context_and_zero_added_at_end_of_file', 0, () => {
            expect(applyPatch('line1\n'
                + 'line2\n', '--- test\theader1\n'
                + '+++ test\theader2\n'
                + '@@ -2 +1,0 @@\n'
                + '-line2\n'))
                .assertEqual('line1\n');
        });
        it('should_apply_multi_line_patches_with_zero_context_and_zero_added_at_end_of_file', 0, () => {
            expect(applyPatch('line1\n'
                + 'line2\n'
                + 'line3\n', '--- test\theader1\n'
                + '+++ test\theader2\n'
                + '@@ -2,2 +1,0 @@\n'
                + '-line2\n'
                + '-line3\n'))
                .assertEqual('line1\n');
        });
        it('should_fail_on_mismatch', 0, () => {
            expect(applyPatch('line2\n'
                + 'line2\n'
                + 'line5\n', '--- test\theader1\n'
                + '+++ test\theader2\n'
                + '@@ -1,3 +1,4 @@\n'
                + ' line2\n'
                + ' line3\n'
                + '+line4\n'
                + ' line5\n'))
                .assertEqual(false);
        });
        it('should_succeed_within_fuzz_factor', 0, () => {
            let options: Options = {
                fuzzFactor: 1
            };
            expect(applyPatch('line2\n'
                + 'line2\n'
                + 'line5\n', '--- test\theader1\n'
                + '+++ test\theader2\n'
                + '@@ -1,3 +1,4 @@\n'
                + ' line2\n'
                + ' line3\n'
                + '+line4\n'
                + ' line5\n', options))
                .assertEqual('line2\n'
                + 'line2\n'
                + 'line4\n'
                + 'line5\n');
        });
        it('should_succeed_when_hunk_needs_a_negative_offset', 0, () => {
            expect(applyPatch('line1\n'
                + 'line3\n'
                + 'line4\n'
                + 'line5\n', '--- test\theader1\n'
                + '+++ test\theader2\n'
                + '@@ -3,2 +3,3 @@\n'
                + ' line1\n'
                + '+line2\n'
                + ' line3\n'))
                .assertEqual('line1\n'
                + 'line2\n'
                + 'line3\n'
                + 'line4\n'
                + 'line5\n');
        });
        it('should_succeed_when_1st_hunk_specifies_invalid_newStart', 0, () => {
            expect(applyPatch('line1\n'
                + 'line2\n'
                + 'line3\n'
                + 'line5\n', '--- test\theader1\n'
                + '+++ test\theader2\n'
                + '@@ -1,2 +2,3 @@\n'
                + ' line3\n'
                + '+line4\n'
                + ' line5\n'))
                .assertEqual('line1\n'
                + 'line2\n'
                + 'line3\n'
                + 'line4\n'
                + 'line5\n');
        });
        it('should_create_a_file', 0, () => {
            expect(applyPatch('', '--- test\theader1\n'
                + '+++ test\theader2\n'
                + '@@ -0,0 +1,4 @@\n'
                + '+line1\n'
                + '+line2\n'
                + '+line3\n'
                + '+line4\n'))
                .assertEqual('line1\n'
                + 'line2\n'
                + 'line3\n'
                + 'line4\n');
        });
        it('should_work_with_unicode_newline_characters', 0, () => {
            const oldtext: string = 'AAAAAAAAAAAAAAAA\n\n';
            const newtext: string = 'AAAAAAAAAAAAAAAA\nBBBBBB' + String.fromCharCode(0x2028) + '\nCCCCCCCCCCCCCCCCCC\n\n';
            const diffed: string = createPatch('test', oldtext, newtext);
            expect(applyPatch(oldtext, diffed)).assertEqual(newtext);
        });
        it('handle_empty_text', 0, () => {
            const oldtext: string = '';
            const newtext: string = 'asdasd\n';
            const diffed: string = createPatch('test', oldtext, newtext);
            expect(applyPatch(oldtext, diffed)).assertEqual(newtext);
        });
        it('handle_two_common_text', 0, () => {
            const oldtext: string = 's';
            const newtext: string = 'sdfsdf\n';
            const diffed: string = createPatch('test', oldtext, newtext);
            expect(applyPatch(oldtext, diffed)).assertEqual(newtext);
        });
        it('applyPatches', 0, () => {
            const patch: string = 'Index: test\n'
                + '===================================================================\n'
                + '--- test\theader1\n'
                + '+++ test\theader2\n'
                + '@@ -1,3 +1,4 @@\n'
                + ' line2\n'
                + ' line3\n'
                + '+line4\n'
                + ' line5\n'
                + 'Index: test2\n'
                + '===================================================================\n'
                + '--- test\theader1\n'
                + '+++ test\theader2\n'
                + '@@ -1,3 +1,4 @@\n'
                + ' foo2\n'
                + ' foo3\n'
                + '+foo4\n'
                + ' foo5\n';
            const contents: Options = {
                test: 'line2\n'
                    + 'line3\n'
                    + 'line5\n',
                test2: 'foo2\n'
                    + 'foo3\n'
                    + 'foo5\n'
            };
            const expected: Options = {
                test: 'line2\n'
                    + 'line3\n'
                    + 'line4\n'
                    + 'line5\n',
                test2: 'foo2\n'
                    + 'foo3\n'
                    + 'foo4\n'
                    + 'foo5\n'
            };
            let data: Data = new Data(contents, expected);
            applyPatches(patch, data);
        });
    });
}
class Data {
    private contents: Options = {};
    private expected: Options = {};
    loadFile(index: Patch, callback: Function) {
        if (index.index !== undefined) {
            callback(undefined, this.contents[index.index]);
        }
    }
    patched(index: Patch, content: boolean, callback: Function) {
        callback(this.expected);
    }
    complete(err: Options) {
        expect(err).assertEqual(this.expected);
    }
    constructor(contents: Options, expected: Options) {
        this.contents = contents;
        this.expected = expected;
    }
}
