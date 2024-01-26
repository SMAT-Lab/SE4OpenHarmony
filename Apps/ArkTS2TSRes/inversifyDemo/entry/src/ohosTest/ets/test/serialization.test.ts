let __generate__Id: number = 0;
function generateId(): string {
    return "serialization.test_" + ++__generate__Id;
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
import { TargetTypeEnum } from 'inversify';
import { Target } from 'inversify/lib/planning/target';
import { getFunctionName, getSymbolDescription, listMetadataForTarget } from 'inversify/lib/utils/serialization';
import * as ns from "reflect-metadata";
import { symbol, symbolStr } from '../tools/symbol';
ns;
export default function serializationTest() {
    describe('serializationTest', () => {
        _it('Should_return_a_good_function_name', () => {
            let testFunction: () => boolean = (): boolean => {
                return false;
            };
            expect(getFunctionName(testFunction)).eql('testFunction');
        });
        _it('Should_return_a_good_function_name_by_using_the_regex', () => {
            let obj: any = { name: null };
            const testFunction: any = obj;
            testFunction.toString = () => 'function testFunction';
            expect(getFunctionName(testFunction)).eql('testFunction');
        });
        _it('Should_not_fail_when_target_is_not_named_or_tagged', () => {
            const serviceIdentifier = 'SomeTypeId';
            const target = new Target(TargetTypeEnum.Variable, '', serviceIdentifier);
            const list = listMetadataForTarget(serviceIdentifier, target);
            expect(list).to.eql(` ${serviceIdentifier}`);
        });
        _it('Should_extract_symbol_description', () => {
            const symbolWithDescription: any = symbolStr('description');
            expect(getSymbolDescription(symbolWithDescription)).to.equal('description');
            const symbolWithoutDescription: any = symbol();
            expect(getSymbolDescription(symbolWithoutDescription)).to.equal('');
        });
    });
}
