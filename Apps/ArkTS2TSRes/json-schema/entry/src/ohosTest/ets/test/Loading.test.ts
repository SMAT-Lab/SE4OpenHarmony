let __generate__Id: number = 0;
function generateId(): string {
    return "Loading.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { SchemaError, validate, ValidationError, Validator, ValidatorResult } from '@ohos/jsonschema';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium';
import dataSchema from '../../fixtures/data_schema.json';
import dataCollectionSchema from '../../fixtures/data_collection_schema.json';
import typesSchema from '../../fixtures/types.json';
import dataCollection from '../../fixtures/data_collection.json';
let validator: any;
const BASE_COUNT = 1;
export default function loadingTest() {
    describe('loadingTest', () => {
        beforeAll(() => {
        });
        beforeEach(() => {
            validator = new Validator();
        });
        afterEach(() => {
        });
        afterAll(() => {
        });
        it('TheFirstShouldNotBeRemovedIfReferencedByTheSecond', 0, () => {
            validator.addSchema(dataSchema, '/data_schema.json');
            validator.addSchema(dataCollectionSchema, '/data_collection_schema.json');
            let propertySchema: object = validator.schemas['/data_schema.json'];
            expect(propertySchema).not().assertNull();
        });
        it('ASchemaShouldNotBeAddedToUnresolvedRefsIfItExists', 0, () => {
            validator.addSchema(dataSchema, '/data_schema.json');
            validator.addSchema(dataCollectionSchema, '/data_collection_schema.json');
            let isHas: object = validator.unresolvedRefs.indexOf('/data_schema.json');
            expect(isHas).assertEqual(-1);
        });
        it('TheSecondSchemaShouldBeAbleToUseAReferenceToTheFirst', 0, () => {
            validator.addSchema(dataSchema, '/data_schema.json');
            validator.addSchema(dataCollectionSchema, '/data_collection_schema.json');
            validator.addSchema(typesSchema, '/types.json');
            let result: boolean = validator.validate(dataCollection, {
                $ref: '/data_collection_schema.json'
            }).valid;
            expect(result).assertTrue();
        });
        it('MultipleSchemasWithTheSameIdShouldThrowAnError', 0, () => {
            try {
                validator.addSchema({
                    properties: {
                        a: {
                            id: 'http://example.com/schema.json', type: 'string'
                        },
                        b: {
                            $id: 'http://example.com/schema.json', type: 'number'
                        },
                    },
                });
            }
            catch (err) {
                // This may be changed as necessary
                expect(err.message)
                    .assertEqual('Schema <http://example.com/schema.json#> already exists with different definition');
            }
        });
    });
}
