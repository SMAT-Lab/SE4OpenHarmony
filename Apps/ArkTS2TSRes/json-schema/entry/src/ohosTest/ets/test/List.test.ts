let __generate__Id: number = 0;
function generateId(): string {
    return "List.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import jsonSChemaTest from './JsonSChema.test';
import arraysTest from './Arrays.test';
import attributesTest from './Attributes.test';
import combinatorsTest from './Combinators.test';
import constTest from './Const.test';
import formatsTest from './Formats.test';
import i18nTest from './I18n.test';
import interfaceTest from './Interface.test';
import loadingTest from './Loading.test';
import metaschemaTest from './Metaschema.test';
import mixedTest from './Mixed.test';
import objectsTest from './Objects.test';
import pureTest from './Pure.test';
import requiredWithRefTest from './RequiredWithRef.test';
import suiteTest from './Suite.test';
import unionTest from './Union.test';
import validatorTest from './Validator.test';
export default function testsuite() {
    jsonSChemaTest(); //一个
    arraysTest(); //
    attributesTest(); //
    combinatorsTest(); //
    constTest(); //
    formatsTest(); //一个
    i18nTest();
    interfaceTest(); //
    loadingTest(); //
    metaschemaTest(); //
    mixedTest(); //
    objectsTest(); //
    pureTest(); //
    requiredWithRefTest(); //
    unionTest(); //
    validatorTest(); //
    suiteTest(); //
}
