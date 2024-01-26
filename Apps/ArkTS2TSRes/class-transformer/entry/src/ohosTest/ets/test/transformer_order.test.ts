let __generate__Id: number = 0;
function generateId(): string {
    return "transformer_order.test_" + ++__generate__Id;
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
import * as rm from 'reflect-metadata';
import { instanceToInstance, classToClassFromExist, instanceToPlain, classToPlainFromExist, plainToInstance, plainToClassFromExist, } from 'class-transformer';
import { defaultMetadataStorage } from 'class-transformer/esm2015/storage';
import { Exclude, Expose, Type, Transform } from 'class-transformer';
import { describe, it as _it, expect } from "../utils/utils";
export default function transformer_orderTest() {
    describe('transformer_orderTest', () => {
        _it('should keep the order of the applied decorators after several plainToInstance() calls', () => {
            class User {
                @Transform(() => 'Jonathan')
                @Transform(() => 'John')
                @Expose()
                name: string;
                constructor() {
                    this.name = "";
                }
            }
            const sourceValue: Record<string, string> = { "name": 'Joe' };
            const firstUser: User = plainToInstance(User, sourceValue);
            expect(firstUser.name).toEqual('John');
            // Prior to this pull request [#355](https://github.com/typestack/class-transformer/pull/355)
            // the order of the transformations was reversed after every `plainToInstance()` call
            // So after consecutive calls `User#name` would be "John" - "Jonathan" - "John" - "Jonathan"...
            // This test ensures the last transformation is always the last one to be applied
            const secondUser: User = plainToInstance(User, sourceValue);
            expect(secondUser.name).toEqual('John');
        });
    });
}
