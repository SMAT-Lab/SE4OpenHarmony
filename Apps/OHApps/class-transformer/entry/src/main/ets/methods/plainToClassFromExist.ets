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
import {plainToClassFromExist } from "class-transformer"
import {log} from "./log";

interface CompareValue {
  role:string;
}
class User {
  role:string;

  constructor() {
    this.role = ""
  }
  getRole(){
    return this.role
  }
}

const defaultUser:User = new User();
defaultUser.role = 'user';

export function plainToClassFromExistDemo (){
  const compareValue:CompareValue = {role:"superUser"}
  let mixedUser:User = plainToClassFromExist(defaultUser, compareValue);
  log(mixedUser.getRole())
}

