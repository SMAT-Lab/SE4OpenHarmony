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

import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'

export default function decorateTest() {
  describe('ActsDecorateTest', () => {
    // Defines a test suite. Two parameters are supported: test suite name and test suite function.
    beforeAll(() => {
      // Presets an action, which is performed only once before all test cases of the test suite start.
      // This API supports only one parameter: preset action function.
    })
    beforeEach(() => {
      // Presets an action, which is performed before each unit test case starts.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: preset action function.
    })
    afterEach(() => {
      // Presets a clear action, which is performed after each unit test case ends.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: clear action function.
    })
    afterAll(() => {
      // Presets a clear action, which is performed after all test cases of the test suite end.
      // This API supports only one parameter: clear action function.
    })

    class type {}

    it('ExecutesDecoratorsInReverseOrderForPropertyOverload',0, () => {
      import("reflect-metadata").then((reflectMetadata) => {
        let order: number[] = [];
        let decorators = [
          (target: Object, name: ESObject): void => { order.push(1); },
          (target: Object, name: ESObject): void => { order.push(0); }
        ];
        let target = new type();
        let name = "name";
        Reflect.decorate(decorators, target, name, undefined);
        expect(order[0]).assertEqual(0);
      })
    });
    it('ExecutesDecoratorsInReverseOrderForPropertyDescriptorOverload',0, () => {
      import("reflect-metadata").then((reflectMetadata) => {
        let order: number[] = [];
        let decorators = [
          (target: Object, name: ESObject): void => { order.push(1); },
          (target: Object, name: ESObject): void => { order.push(0); }
        ];
        let target = new type();
        let name = "name";
        let descriptor!: PropertyDescriptor;
        Reflect.decorate(decorators, target, name, descriptor);
        expect(order[0]).assertEqual(0);
      })
    });
    it('DecoratorPipelineForFunctionOverload',0, () => {
      import("reflect-metadata").then((reflectMetadata) => {
        let A = () => { };
        let B = () => { };
        let decorators = [
          (target: Function): ESObject => { return undefined; },
          (target: Function): ESObject => { return A; },
          (target: Function): ESObject => { return B; }
        ];
        let target = () => { };
        let result = Reflect.decorate(decorators, target);
        expect(result).assertEqual(A);
      })
    });
    it('DecoratorPipelineForPropertyOverload',0, () => {
      import("reflect-metadata").then((reflectMetadata) => {
        let A = new type();
        let B = new type();
        let decorators = [
          (target: Object, name: ESObject): ESObject => { return undefined; },
          (target: Object, name: ESObject): ESObject => { return A; },
          (target: Object, name: ESObject): ESObject => { return B; }
        ];
        let target = new type();
        let result = Reflect.decorate(decorators, target, "name", undefined);
        expect(result).assertEqual(A);
      })
    });
    it('DecoratorPipelineForPropertyDescriptorOverload',0, () => {
      import("reflect-metadata").then((reflectMetadata) => {
        let A = new type();
        let B = new type();
        let C!: PropertyDescriptor;
        let decorators = [
          (target: Object, name: ESObject): ESObject => { return undefined; },
          (target: Object, name: ESObject): ESObject => { return A; },
          (target: Object, name: ESObject): ESObject => { return B; }
        ];
        let target = new type();
        let result = Reflect.decorate(decorators, target, "name", C);
        expect(result).assertEqual(A);
      })
    });
    it('DecoratorCorrectTargetInPipelineForFunctionOverload',0, () => {
      import("reflect-metadata").then((reflectMetadata) => {
        let sent: Function[] = [];
        let A = () => { };
        let B = () => { };
        let decorators = [
          (target: Function): ESObject => { sent.push(target); return undefined; },
          (target: Function): ESObject => { sent.push(target); return undefined; },
          (target: Function): ESObject => { sent.push(target); return A; },
          (target: Function): ESObject => { sent.push(target); return B; }
        ];
        let target = () => { };
        Reflect.decorate(decorators, target);
        expect(sent).assertDeepEquals([target, B, A, A]);
      })
    });
    it('DecoratorCorrectTargetInPipelineForPropertyOverload',0, () => {
      import("reflect-metadata").then((reflectMetadata) => {
        let sent: Object[] = [];
        let decorators = [
          (target: Object, name: ESObject): ESObject => { sent.push(target); },
          (target: Object, name: ESObject): ESObject => { sent.push(target); },
          (target: Object, name: ESObject): ESObject => { sent.push(target); },
          (target: Object, name: ESObject): ESObject => { sent.push(target); }
        ];
        let target = new type();
        Reflect.decorate(decorators, target, "name");
        expect(sent).assertDeepEquals([target, target, target, target]);
      })
    });
    it('DecoratorCorrectNameInPipelineForPropertyOverload',0, () => {
      import("reflect-metadata").then((reflectMetadata) => {
        let sent: (string)[] = [];
        let decorators = [
          (target: Object, name: ESObject): ESObject => { sent.push(name); },
          (target: Object, name: ESObject): ESObject => { sent.push(name); },
          (target: Object, name: ESObject): ESObject => { sent.push(name); },
          (target: Object, name: ESObject): ESObject => { sent.push(name); }
        ];
        let target = new type();
        Reflect.decorate(decorators, target, "name");
        expect(sent).assertDeepEquals(["name", "name", "name", "name"]);
      })
    });
    it('DecoratorCorrectTargetInPipelineForPropertyDescriptorOverload',0, () => {
      import("reflect-metadata").then((reflectMetadata) => {
        let sent: Object[] = [];
        let A = new type();
        let B = new type();
        let C!: PropertyDescriptor;
        let decorators = [
          (target: Object, name: ESObject): ESObject => { sent.push(target); return undefined; },
          (target: Object, name: ESObject): ESObject => { sent.push(target); return undefined; },
          (target: Object, name: ESObject): ESObject => { sent.push(target); return A; },
          (target: Object, name: ESObject): ESObject => { sent.push(target); return B; }
        ];
        let target = new type();
        Reflect.decorate(decorators, target, "name", C);
        expect(sent).assertDeepEquals([target, target, target, target]);
      })
    });
    it('DecoratorCorrectNameInPipelineForPropertyDescriptorOverload',0, () => {
      import("reflect-metadata").then((reflectMetadata) => {
        let sent: (string)[] = [];
        let A = new type();
        let B = new type();
        let C!: PropertyDescriptor;
        let decorators = [
          (target: Object, name: ESObject): ESObject => { sent.push(name); return undefined; },
          (target: Object, name: ESObject): ESObject => { sent.push(name); return undefined; },
          (target: Object, name: ESObject): ESObject => { sent.push(name); return A; },
          (target: Object, name: ESObject): ESObject => { sent.push(name); return B; }
        ];
        let target = new type();
        Reflect.decorate(decorators, target, "name", C);
        expect(sent).assertDeepEquals(["name", "name", "name", "name"]);
      })
    });
    it('DecoratorCorrectDescriptorInPipelineForPropertyDescriptorOverload',0, () => {
      import("reflect-metadata").then((reflectMetadata) => {
        let sent: PropertyDescriptor[] = [];
        let A = new type();
        let B = new type();
        let C!: PropertyDescriptor;
        let decorators = [
          (target: Object, name: ESObject, descriptor: PropertyDescriptor): ESObject => { sent.push(descriptor); return undefined; },
          (target: Object, name: ESObject, descriptor: PropertyDescriptor): ESObject => { sent.push(descriptor); return undefined; },
          (target: Object, name: ESObject, descriptor: PropertyDescriptor): ESObject => { sent.push(descriptor); return A; },
          (target: Object, name: ESObject, descriptor: PropertyDescriptor): ESObject => { sent.push(descriptor); return B; }
        ];
        let target = new type();
        Reflect.decorate(decorators, target, "name", C);
        expect(sent).assertDeepEquals([C, B, A, A]);
      })
    });
  })
}