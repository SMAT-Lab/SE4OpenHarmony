let __generate__Id: number = 0;
function generateId(): string {
    return "List.test_" + ++__generate__Id;
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
import JamaTest01 from './JamaTest01.test';
import JamaTest10 from './JamaTest10.test';
import JamaTest11 from './JamaTest11.test';
import JamaTest02 from './JamaTest2.test';
import JamaTest03 from './JamaTest3.test';
import JamaTest04 from './JamaTest4.test';
import JamaTest05 from './JamaTest5.test';
import JamaTest06 from './JamaTest6.test';
import JamaTest07 from './JamaTest7.test';
import JamaTest08 from './JamaTest8.test';
import JamaTest09 from './JamaTest9.test';
export default function testsuite() {
    JamaTest01();
    JamaTest02();
    JamaTest03();
    JamaTest04();
    JamaTest05();
    JamaTest06();
    JamaTest07();
    JamaTest08();
    JamaTest09();
    JamaTest10();
    JamaTest11();
}
