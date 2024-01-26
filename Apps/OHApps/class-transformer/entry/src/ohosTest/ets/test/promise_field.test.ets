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
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { defaultMetadataStorage } from 'class-transformer/esm2015/storage';

import { Type } from 'class-transformer';
import { describe,it as _it,expect } from "../utils/utils";

interface SourceValue<T> {
  promise: Promise<T>;
}

export default function promise_fieldTest() {
  describe('promise_fieldTest', () =>  {
    _it('should transform plan to class with promise field', async () => {
      defaultMetadataStorage.clear();

      class PromiseClass {
        promise: Promise<string >;

        constructor(promise: Promise<string>) {
          this.promise = promise;
        }
      }

      const sourceValue:SourceValue<string> = {promise:Promise.resolve("hi")};
      const instance:PromiseClass = plainToInstance(PromiseClass, sourceValue);
      expect(instance.promise instanceof Promise).toBe(true);
      const value:string = await instance.promise;
      expect(value).toBe('hi');
    });

    _it('should transform class with promise field to plain', async () => {
      class PromiseClass {
        promise: Promise<string>;

        constructor(promise: Promise<string>) {
          this.promise = promise;
        }
      }

      const instance:PromiseClass = new PromiseClass(Promise.resolve('hi'));
      const plain:PromiseClass = instanceToPlain(instance) as PromiseClass;
      expect(plain).toHaveProperty('promise');
      const value:string = await plain.promise;
      expect(value).toBe('hi');
    });

    _it('should clone promise result', async () => {
      defaultMetadataStorage.clear();

      class PromiseClass {
        promise: Promise<string[]>;
        constructor(promise: Promise<string[]>) {
          this.promise = promise;
        }
      }

      const array:Array<string> = ['hi', 'my', 'name'];

      const sourceValue:SourceValue<Array<string>> = {
        promise: Promise.resolve(array),
      }
      const instance:PromiseClass = plainToInstance(PromiseClass, sourceValue);
      const value:Array<string> = await instance.promise;
      expect(value).toEqual(array);

      // modify transformed array to prove it's not referencing original array
      value.push('is');
      expect(value).not.toEqual(array);
    });

    _it('should support Type decorator', async () => {
      class PromiseClass {
        @Type(() => InnerClass)
        promise: Promise<InnerClass>;
        constructor(promise: Promise<InnerClass>) {
          this.promise = promise;
        }
      }

      class InnerClass {
        position: string;

        constructor(position: string) {
          this.position = position;
        }
      }


      const sourceValue:SourceValue<InnerClass> = {
        promise: Promise.resolve(new InnerClass('developer')),
      }
      const instance:PromiseClass = plainToInstance(PromiseClass, sourceValue);
      const value:InnerClass = await instance.promise;
      expect(value instanceof InnerClass).toBe(true);
      expect(value.position).toBe('developer');
    });
  })
}