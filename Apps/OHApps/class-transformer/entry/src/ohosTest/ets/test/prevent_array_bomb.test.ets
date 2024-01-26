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
import * as rm from 'reflect-metadata';

import {
  plainToInstance,
} from 'class-transformer';
import { defaultMetadataStorage } from 'class-transformer/esm2015/storage';

import { describe,it as _it,expect } from "../utils/utils";
import { model6 } from '../utils/model';
import { BasicTypes } from "../utils/type";

export default function prevent_array_bombTest() {
  describe('prevent_array_bombTest', () =>  {
    _it('should not convert specially crafted evil JS object to array', () => {
      defaultMetadataStorage.clear();

      class TestClass {
        readonly categories!: string[];
      }

      /**
       * We use the prototype of values to guess what is the type of the property. This behavior can be used
       * to pass a specially crafted array like object what would be transformed into an array.
       *
       * Because arrays are numerically indexed, specifying a big enough numerical property as key
       * would cause other libraries to iterate over each (undefined) element until the specified value is reached.
       * This can be used to cause denial-of-service attacks.
       *
       * An example of such scenario is the following:
       *
       * ```ts
       * class TestClass {
       *   @IsArray()
       *   @IsString({ each: true })
       *   readonly categories!: string[];
       * }
       * ```
       *
       * Using the above class definition with class-validator and receiving the following specially crafted payload without
       * the correct protection in place:
       *
       * `{ '9007199254740990': '9007199254740990', __proto__: [] };`
       *
       * would result in the creation of an array with length of 9007199254740991 (MAX_SAFE_INTEGER) looking like this:
       *
       * `[ <9007199254740989 empty elements>, 9007199254740990 ]`
       *
       * Iterating over this array would take significant time and cause the server to become unresponsive.
       */

      const sourceValue:Record<string,Record<string,string|Array<BasicTypes>>> = { "categories": { '100000000': '100000000', "__proto__": [] } }
      const result:TestClass = plainToInstance(TestClass, sourceValue);
      console.log("ddd--" + JSON.stringify(result.categories) + Array.isArray(result.categories) + "")
      console.log("ddd--" + JSON.stringify(model6))
      expect(Array.isArray(result.categories)).toBe(false);


      expect(result.categories).toEqual(model6);
    });
  })
}