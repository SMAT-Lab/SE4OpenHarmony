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
import { Context } from 'inversify/lib/planning/context';
import { Plan } from 'inversify/lib/planning/plan';
import { Request } from 'inversify/lib/planning/request';
import { Target } from 'inversify/lib/planning/target';
export default function contextTest() {
  describe('contextTest',  ()=> {
    _it('Should_set_its_own_properties_correctly', () => {

      const container = new Container();
      const context1 = new Context(container);
      const invalid:ESObject = null;
      const context2: Context = new Context(invalid as ESObject as Container);

      expect(context1.container).not.to.eql(null);
      expect(context2.container).eql(null);
      expect(context1.id).to.be.a('number');
      expect(context2.id).to.be.a('number');
      expect(context1.id).not.eql(context2.id);

    });

    _it('Should_be_linkable_to_a_Plan', () => {

      const container = new Container();
      const context = new Context(container);
      const target = new Target(TargetTypeEnum.Variable, '', 'Ninja');

      const ninjaRequest = new Request(
        'Ninja',
        context,
        null,
        [],
        target
      );

      const plan = new Plan(context, ninjaRequest);
      context.addPlan(plan);

      expect(context.plan.rootRequest.serviceIdentifier).eql('Ninja');
    });
  })
}