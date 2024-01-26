let __generate__Id: number = 0;
function generateId(): string {
    return "Provide_in_when_on_syntax.test_" + ++__generate__Id;
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
// import { it as _it, afterAll, afterEach, beforeAll, beforeEach, describe, expect } from '../util'
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { DeleteMetadata, provideInSyntax, provideWhenSyntax, provideOnSyntax, getProvideInSyntax, getProvideWhenSyntax, getProvideOnSyntax } from '../interface';
export default function provideInWhenOnSyntaxTest() {
    describe("ProvideInWhenOnSyntax", () => {
        beforeEach(() => {
            DeleteMetadata();
        });
        afterEach(() => {
        });
        it("Should_set_its_on_properties_correctly", 0, () => {
            // expect(getProvideInSyntax()).eql(provideInSyntax);
            expect(getProvideInSyntax()).assertEqual(provideInSyntax);
            // expect(getProvideWhenSyntax()).eql(provideWhenSyntax);
            expect(getProvideWhenSyntax()).assertEqual(provideWhenSyntax);
            // expect(getProvideOnSyntax()).eql(provideOnSyntax);
            expect(getProvideOnSyntax()).assertEqual(provideOnSyntax);
        });
    });
}
