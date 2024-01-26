let __generate__Id: number = 0;
function generateId(): string {
    return "List.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import abilityTest from './Ability.test';
import bodyTest1 from './Body1.test';
import bodyTest2 from './Body2.test';
import bodyTest3 from './Body3.test';
import contactTest from './Contact.test';
import fixtureTest from './Fixture.test';
import islandTest from './Island.test';
import jointTest from './Joint.test';
import shapeTest from './Shape.test';
import worldTest1 from './World1.test';
import worldTest2 from './World2.test';
export default function testsuite() {
    abilityTest();
    bodyTest1();
    bodyTest2();
    bodyTest3();
    contactTest();
    fixtureTest();
    islandTest();
    jointTest();
    shapeTest();
    worldTest1();
    worldTest2();
}
