let __generate__Id: number = 0;
function generateId(): string {
    return "ignore_decorators.test_" + ++__generate__Id;
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
import { instanceToPlain, } from 'class-transformer';
import { defaultMetadataStorage } from 'class-transformer/esm2015/storage';
import { Exclude, Expose, Type, Transform } from 'class-transformer';
import { describe, it as _it, expect } from "../utils/utils";
import { model2 } from "../utils/model";
export default function ignore_decoratorsTest() {
    describe('ignore_decoratorsTest', () => {
        _it('when ignoreDecorators is set to true it should ignore all decorators', () => {
            defaultMetadataStorage.clear();
            class User {
                id: number = 0;
                @Expose({ name: 'lala' })
                firstName: string = "";
                @Expose({ groups: ['user'] })
                lastName: string = "";
                @Exclude()
                password: string = "";
            }
            const user: User = new User();
            user.firstName = 'Umed';
            user.lastName = 'Khudoiberdiev';
            user.password = 'imnosuperman';
            const plainedUser: User = instanceToPlain(user, { ignoreDecorators: true }) as User;
            expect(plainedUser).toEqual(model2);
        });
    });
}