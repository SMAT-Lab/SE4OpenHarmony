let __generate__Id: number = 0;
function generateId(): string {
    return "issue-86.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import test from '../../../sax_util/TestUtil';
import { describe, expect, it } from '@ohos/hypium';
import { issue86TestData1, issue86TestData2 } from '../SaxData';
export default function issue_86Test() {
    describe('Issue_86Test', () => {
        it('issue_86Test_1', 0, () => {
            test(issue86TestData1, expect);
        });
        it('issue_86Test_2', 0, () => {
            test(issue86TestData2, expect);
        });
    });
}
