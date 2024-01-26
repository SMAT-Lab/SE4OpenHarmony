let __generate__Id: number = 0;
function generateId(): string {
    return "serialize_" + ++__generate__Id;
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
import { serialize, Exclude } from "class-transformer";
import { log } from "./log";
class User {
    firstName: string;
    lastName: string;
    @Exclude()
    password: string;
    constructor() {
        this.firstName = "";
        this.lastName = "";
        this.password = "";
    }
}
const user = new User();
user.firstName = 'Umed';
user.lastName = 'Khudoiberdiev';
user.password = 'imnosuperman';
export function serializeDemo() {
    const plainedUser = serialize(user);
    log(plainedUser);
}
