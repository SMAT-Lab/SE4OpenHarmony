let __generate__Id: number = 0;
function generateId(): string {
    return "classToPlainFromExist_" + ++__generate__Id;
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
import { classToPlainFromExist } from "class-transformer";
import { log } from "./log";
class User {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    constructor() {
        this.id = 0;
        this.firstName = "";
        this.lastName = "";
        this.password = "";
    }
    getName() {
        return this.firstName;
    }
}
const user = new User();
user.id = 4;
user.firstName = 'Umed';
user.lastName = 'Khudoiberdiev';
user.password = 'imnosuperman';
interface ExistUser {
    id: number;
    age: number;
}
const existUser: ExistUser = { id: 1, age: 27 };
export function classToPlainFromExistDemo() {
    log(JSON.stringify(classToPlainFromExist(user, existUser)));
}
