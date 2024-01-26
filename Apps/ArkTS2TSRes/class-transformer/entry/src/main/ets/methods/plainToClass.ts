let __generate__Id: number = 0;
function generateId(): string {
    return "plainToClass_" + ++__generate__Id;
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
import { plainToClass } from "class-transformer";
import { log } from "./log";
interface UserJson {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
}
const userJson: UserJson = {
    id: 1,
    firstName: "Johny",
    lastName: "Cage",
    age: 27
};
class User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    constructor() {
        this.id = 0;
        this.firstName = "";
        this.lastName = "";
        this.age = 0;
    }
    getName() {
        return this.firstName + ' ' + this.lastName;
    }
    isAdult() {
        return this.age > 36 && this.age < 60;
    }
}
export function plainToClassDemo() {
    const user: User = plainToClass(User, userJson);
    log(user.getName());
    log(user.isAdult() + "");
}
