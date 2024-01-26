/*
  * Copyright (c) 2023 Huawei Device Co., Ltd.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
    *
  * http://www.apache.org/licenses/LICENSE-2.0
    *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
import { inquiry } from '@ohos/dataorm';
import { Note } from './Note';
export async function QueryTest(str1, str2) {
    let arr;
    let data = await new inquiry<Function>().from(Note).eq(str1, str2).querySingle(Note);
    if (data)
        arr = data;
    else
        arr = [];
    return arr;
}
export async function QueryClass<T>(t: T) {
    let arr;
    let data = await new inquiry<T>().from(t).query(t);
    if (data)
        arr = data;
    else
        arr = [];
    return arr;
}
