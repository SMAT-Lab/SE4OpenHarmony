let __generate__Id: number = 0;
function generateId(): string {
    return "List.test_" + ++__generate__Id;
}
/*
* Copyright (C) 2022 Huawei Device Co., Ltd.
* Licensed under the BSD License, (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     https://opensource.org/licenses/BSD-3-Clause
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import abilityTest from './Ability.test';
export default function testsuite() {
    abilityTest();
}
