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
import { TargetTypeEnum } from 'inversify';
import { Container } from 'inversify';
import { interfaces } from 'inversify';
import { Context } from 'inversify/lib/planning/context';
import { Request } from 'inversify/lib/planning/request';
import { Target } from 'inversify/lib/planning/target';
export default function requestTest() {
  interface identifier
  {     Katana: string;
        KatanaBlade: string;
        KatanaHandler: string;
        Ninja: string;
        Shuriken: string;
  }
  const identifiers:identifier = {
    Katana: 'Katana',
    KatanaBlade: 'KatanaBlade',
    KatanaHandler: 'KatanaHandler',
    Ninja: 'Ninja',
    Shuriken: 'Shuriken',
  };
  describe('requestTest',  ()=> {
    _it('Should_set_its_own_properties_correctly', () => {

      const container = new Container();
      const context = new Context(container);

      const request1: Request = new Request(
        identifiers.Ninja,
        context,
        null,
        [],
        new Target(TargetTypeEnum.Variable, '', identifiers.Ninja)
      );

      const request2 = new Request(
        identifiers.Ninja,
        context,
        null,
        [],
        new Target(TargetTypeEnum.Variable, '', identifiers.Ninja)
      );

      expect(request1.serviceIdentifier).eql(identifiers.Ninja);
      expect(Array.isArray(request1.bindings)).eql(true);
      expect(Array.isArray(request2.bindings)).eql(true);
      expect(request1.id).to.be.a('number');
      expect(request2.id).to.be.a('number');
      expect(request1.id).not.eql(request2.id);

    });

    _it('Should_be_able_to_add_a_child_request', () => {

      const container = new Container();
      const context = new Context(container);

      const ninjaRequest: Request = new Request(
        identifiers.Ninja,
        context,
        null,
        [],
        new Target(TargetTypeEnum.Variable, 'Ninja', identifiers.Ninja)
      );

      ninjaRequest.addChildRequest(
        identifiers.Katana,
        [],
        new Target(TargetTypeEnum.ConstructorArgument, 'Katana', identifiers.Katana)
      );

      const katanaRequest = ninjaRequest.childRequests[0];

      expect(katanaRequest?.serviceIdentifier).eql(identifiers.Katana);
      expect(katanaRequest?.target.name.value()).eql('Katana');
      expect(katanaRequest?.childRequests.length).eql(0);

      const katanaParentRequest: interfaces.Request = katanaRequest?.parentRequest as Request;
      expect(katanaParentRequest.serviceIdentifier).eql(identifiers.Ninja);
      expect(katanaParentRequest.target.name.value()).eql('Ninja');
      expect(katanaParentRequest.target.serviceIdentifier).eql(identifiers.Ninja);

    });
  })
}