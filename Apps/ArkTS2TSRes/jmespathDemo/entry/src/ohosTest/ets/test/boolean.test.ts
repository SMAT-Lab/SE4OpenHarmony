let __generate__Id: number = 0;
function generateId(): string {
    return "boolean.test_" + ++__generate__Id;
}
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
import addTestSuitesFromFile from './addTestSuitesFromFile';
import { describe, it } from '@ohos/hypium';
export default function boolean() {
    describe('booleanTest', () => {
        it('JsonDataTest', 0, () => {
            addTestSuitesFromFile('boolean.json');
        });
    });
}