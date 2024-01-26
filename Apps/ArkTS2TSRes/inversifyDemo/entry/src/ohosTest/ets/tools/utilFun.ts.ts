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
import { Container, decorate, inject, injectable, multiInject, postConstruct } from 'inversify';
import * as METADATA_KEY from 'inversify/lib/constants/metadata_keys';
import { Metadata } from 'inversify/lib/planning/metadata';
import * as ns from "reflect-metadata";
ns;
export function VanillaJSWarrior1() {
    const VanillaJSWarrior = function () {
        // ...
    };
    VanillaJSWarrior.prototype.testMethod = function () {
        // ..
    };
    decorate(postConstruct(), VanillaJSWarrior.prototype, 'testMethod');
    const metadata: Metadata = Reflect.getMetadata(METADATA_KEY.POST_CONSTRUCT, VanillaJSWarrior);
    return metadata.value;
}
export function arrayConversion(Katana, Shuriken) {
    return [Katana, Shuriken];
}
export function compilerGeneratedMetadataTest(a, b) {
    return a == b;
}
