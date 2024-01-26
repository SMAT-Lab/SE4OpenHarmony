let __generate__Id: number = 0;
function generateId(): string {
    return "constraint_helpers.test_" + ++__generate__Id;
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect } from '../utils/util';
import { typeConstraint } from 'inversify';
export default function constraint_helpersTest() {
    describe('constraint_helpersTest', () => {
        _it('Should_be_return_false_when_a_request_object_is_not_provided', () => {
            const result = typeConstraint('TYPE')(null);
            expect(result).to.eql(false);
        });
    });
}
