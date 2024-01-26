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

import { describe, expect, it, TestType } from '@ohos/hypium'

export default function InterfaceTime() {
  describe("InterfaceTime", () => {

    const BASE_COUNT = 500
    const BASELINE_CREATEHTTP = 2000
    const METADATA_KEY = 'test-metadata';

    it("hasMetadata", TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        import("reflect-metadata").then((reflectMetadata) => {
          @Reflect.metadata(METADATA_KEY, 'John Doe')
          class Person {
            name: string = 'John Doe';
          }
          Reflect.hasMetadata(METADATA_KEY, Person)
        })
      }
      let endTime = new Date().getTime()
      console.log("reflect-metadata hasMetadata:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("reflect-metadata hasMetadata:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it("hasOwnMetadata", TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        import("reflect-metadata").then((reflectMetadata) => {
          @Reflect.metadata(METADATA_KEY, 'John Doe')
          class Person {
            name: string = 'John Doe';
          }
          Reflect.hasOwnMetadata(METADATA_KEY, Person)
        })
      }
      let endTime = new Date().getTime()
      console.log("reflect-metadata hasOwnMetadata:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("reflect-metadata hasOwnMetadata:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it("getMetadata", TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        import("reflect-metadata").then((reflectMetadata) => {
          @Reflect.metadata(METADATA_KEY, 'John Doe')
          class Person {
            name: string = 'John Doe';
          }
          Reflect.getMetadata(METADATA_KEY, Person);
        })
      }
      let endTime = new Date().getTime()
      console.log("reflect-metadata getMetadata:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("reflect-metadata getMetadata:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it("getOwnMetadata", TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        import("reflect-metadata").then((reflectMetadata) => {
          @Reflect.metadata(METADATA_KEY, 'John Doe')
          class Person {
            name: string = 'John Doe';
          }
          Reflect.getOwnMetadata(METADATA_KEY, Person);
        })
      }
      let endTime = new Date().getTime()
      console.log("reflect-metadata getOwnMetadata:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("reflect-metadata getOwnMetadata:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it("getMetadataKeys", TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        import("reflect-metadata").then((reflectMetadata) => {
          @Reflect.metadata(METADATA_KEY, 'John Doe')
          class Person {
            name: string = 'John Doe';
          }
          Reflect.getMetadataKeys(Person)
        })
      }
      let endTime = new Date().getTime()
      console.log("reflect-metadata getMetadataKeys:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("reflect-metadata getMetadataKeys:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it("getOwnMetadataKeys", TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        import("reflect-metadata").then((reflectMetadata) => {
          @Reflect.metadata(METADATA_KEY, 'John Doe')
          class Person {
            name: string = 'John Doe';
          }
          Reflect.getOwnMetadataKeys(Person)
        })
      }
      let endTime = new Date().getTime()
      console.log("reflect-metadata getOwnMetadataKeys:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("reflect-metadata getOwnMetadataKeys:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it("deleteMetadata", TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        import("reflect-metadata").then((reflectMetadata) => {
          @Reflect.metadata(METADATA_KEY, 'John Doe')
          class Person {
            name: string = 'John Doe';
          }
          Reflect.deleteMetadata(METADATA_KEY, Person)
        })
      }
      let endTime = new Date().getTime()
      console.log("reflect-metadata deleteMetadata:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("reflect-metadata deleteMetadata:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    });
  });
}