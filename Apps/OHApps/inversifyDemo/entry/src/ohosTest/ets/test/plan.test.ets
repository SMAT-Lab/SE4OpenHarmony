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

export default function planTest() {
  describe('planTest',  ()=> {
    _it('Should_set_its_own_properties_correctly', () => {

      const container = new Container();
      const context = new Context(container);
      const runtimeId = 'Something';

      const request: Request = new Request(
        runtimeId,
        context,
        null,
        [],
        new Target(TargetTypeEnum.Variable, '', runtimeId)
      );

      const plan = new Plan(context, request);

      expect(plan.parentContext).eql(context);
      expect(plan.rootRequest.serviceIdentifier).eql(request.serviceIdentifier);
      expect(plan.rootRequest.parentContext).eql(request.parentContext);
      expect(plan.rootRequest.parentRequest).eql(request.parentRequest);
      expect(plan.rootRequest.childRequests).eql(request.childRequests);
      expect(plan.rootRequest.target).eql(request.target);
    });
  })
}