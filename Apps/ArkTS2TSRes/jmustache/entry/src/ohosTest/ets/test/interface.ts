let __generate__Id: number = 0;
function generateId(): string {
    return "interface_" + ++__generate__Id;
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
interface Msg {
    sex: string;
    age: string;
    hobby: string;
}
export interface Data {
    name?: string;
    text?: string | string[] | Text;
    msg?: Msg;
}
export interface Data1 {
    text: () => number;
}
export interface Text {
    name?: string;
    other?: string;
}
export interface Partials {
    template: string;
}
