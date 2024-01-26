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
import indexTest from './Index.test';
import autoWireTest from './utils/Auto_wire.test';
import provideDoneSyntaxTest from './syntax/Provide_done_syntax.test';
import provideInWhenOnSyntaxTest from './syntax/Provide_in_when_on_syntax.test';
import provideWhenOnSyntaxTest from './syntax/Provide_when_on_syntax.test';
import fluentProvideTest from './decorator/Fluent_provide.test';
import provideTest from './decorator/Provide.test';
export default function testsuite() {
    indexTest();
    autoWireTest();
    provideDoneSyntaxTest();
    provideWhenOnSyntaxTest();
    provideInWhenOnSyntaxTest();
    fluentProvideTest();
    provideTest();
}
