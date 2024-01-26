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
import * as ERROR_MSGS from 'inversify/lib/constants/error_msgs';
import { Container, inject, injectable } from 'inversify';
import * as ns from "reflect-metadata"
ns

export default function exceptionsTest() {
  describe('exceptionsTest',  ()=> {
    _it('Should_throw_if_circular_dependencies_found', () => {

      interface IA { }
      interface IB { }
      interface IC { }
      interface ID { }

      @injectable()
      class A implements IA {
        public b: IB;
        public c: IC;
        public constructor(
          @inject('B') b: IB,
          @inject('C') c: IC,
        ) {
          this.b = b;
          this.c = c;
        }
      }

      @injectable()
      class B implements IB { }

      @injectable()
      class C implements IC {
        public d: ID;
        public constructor(@inject('D') d: ID) {
          this.d = d;
        }
      }

      @injectable()
      class D implements ID {
        public a: IA;
        public constructor(@inject('A') a: IA) {
          this.a = a;
        }
      }

      const container = new Container();
      container.bind<A>('A').to(A);
      container.bind<B>('B').to(B);
      container.bind<C>('C').to(C);
      container.bind<D>('D').to(D);

      let willThrow=()=> {
        const a = container.get<A>('A');
        return a;
      }

      expect(willThrow).to.throw(
        `${ERROR_MSGS.CIRCULAR_DEPENDENCY} A --> C --> D --> A`
      );

    });
  })
}