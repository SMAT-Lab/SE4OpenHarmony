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

import {  Type, Transform } from 'class-transformer';
import { describe,it as _it,expect } from "../utils/utils";

export default function inheritenceTest() {
  describe('inheritenceTest', () =>  {
    _it('decorators should work inside a base class', () => {
      defaultMetadataStorage.clear();
      interface Param {
        value:string;
      }
      class Contact {
        @Transform((param:Param):string => param.value.toUpperCase())
        name: string = "sss";
        @Type(() => Date)
        birthDate: Date|string = new Date();
      }

      class User extends Contact {
        @Type(() => Number)
        id: number = 0;
        email: string = "";
      }

      class Student extends User {
        @Transform((param:Param):string => param.value.toUpperCase())
        university: string = "";
      }

      const plainStudent:Student = {
        name: 'Johny Cage',
        university: 'mit',
        birthDate: new Date(1967, 2, 1).toDateString(),
        id: 100,
        email: 'johnny.cage@gmail.com',
      };
      console.log("bbb---1")

      const classedStudent:Student = plainToInstance(Student, plainStudent);
      expect(classedStudent.name).toEqual('JOHNY CAGE');
      console.log("bbb---2")

      expect(classedStudent.university).toEqual('MIT');
      console.log("bbb---3")

      expect(classedStudent.id).toEqual(plainStudent.id);
      console.log("bbb---4")

      expect(classedStudent.email).toEqual(plainStudent.email);
    });
  })
}