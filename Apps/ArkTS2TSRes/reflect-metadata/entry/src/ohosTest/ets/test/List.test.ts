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
import decorateTest from './reflect-decorate.test';
import definemetadataTest from './reflect-definemetadata.test';
import deletemetadataTest from './reflect-deletemetadata.test';
import getmetadataTest from './reflect-getmetadata.test';
import getmetadatakeysTest from './reflect-getmetadatakeys.test';
import getownmetadataTest from './reflect-getownmetadata.test';
import getownmetadatakeysTest from './reflect-getownmetadatakeys.test';
import hasmetadataTest from './reflect-hasmetadata.test';
import hasownmetadataTest from './reflect-hasownmetadata.test';
import metadataTest from './reflect-metadata.test';
import InterfaceTime from './InterfaceTime.test';
export default function testsuite() {
    decorateTest();
    definemetadataTest();
    deletemetadataTest();
    getmetadataTest();
    getmetadatakeysTest();
    getownmetadataTest();
    getownmetadatakeysTest();
    hasmetadataTest();
    hasownmetadataTest();
    metadataTest();
    InterfaceTime();
}
