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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect } from '../utils/util'
import { Container, injectable, interfaces } from "inversify";
import * as ns from "reflect-metadata"
import { tryGetNinjaFun,ninjaContainerFun } from '../tools/reflectMetadata';
ns
export default function resolve_unbindedTest() {
  describe('resolve_unbindedTest',  ()=> {
    _it("Should_be_able_to_resolve_a_class_that_has_not_binded", () => {

      let tryGetNinj=tryGetNinjaFun()

      const tryGet =tryGetNinj.tryGet
      expect(tryGet).to.throw("No matching bindings found for serviceIdentifier: Ninja");

      const ninja = tryGetNinj.ninja
      expect(ninja.fight()).to.eql("cut!");
      expect(tryGetNinj.container.isBound(tryGetNinj.Ninja)).to.equal(false);

    });

    _it("Should_be_able_to_resolve_a_class_that_has_already_been_bound", () => {

      let  ninja= ninjaContainerFun()
      expect(ninja.fight()).to.eql("cut!");
    })


  })
}